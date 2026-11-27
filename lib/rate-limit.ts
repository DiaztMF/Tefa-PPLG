import { sql } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { rateLimit } from "@/lib/db/schema"

/**
 * Shared, fixed-window rate limit backed by the `rateLimit` table.
 * Returns true when the caller has used up the window budget.
 */
export async function isRateLimited(
  key: string,
  max: number,
  windowMs: number
): Promise<boolean> {
  if (!isDatabaseConfigured()) return false

  const now = Date.now()
  const cutoff = now - windowMs

  try {
    const [updated] = await db
      .insert(rateLimit)
      .values({ key, count: 1, lastRequest: now })
      .onConflictDoUpdate({
        target: rateLimit.key,
        set: {
          count: sql`case when ${rateLimit.lastRequest} < ${cutoff} then 1 else ${rateLimit.count} + 1 end`,
          lastRequest: sql`case when ${rateLimit.lastRequest} < ${cutoff} then ${now} else ${rateLimit.lastRequest} end`,
        },
        where: sql`${rateLimit.lastRequest} < ${cutoff} or ${rateLimit.count} < ${max}`,
      })
      .returning({ count: rateLimit.count })

    return updated === undefined
  } catch (err) {
    console.warn("Rate limit DB error, allowing request:", err)
    return false
  }
}
