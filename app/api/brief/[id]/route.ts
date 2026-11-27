import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { briefs } from "@/lib/db/schema"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: trackingToken } = await params

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database belum dikonfigurasi." },
      { status: 503 }
    )
  }

  try {
    const [brief] = await db
      .select()
      .from(briefs)
      .where(eq(briefs.trackingToken, trackingToken))
      .limit(1)

    if (!brief) {
      return NextResponse.json(
        { error: "Brief tidak ditemukan." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      brief: {
        id: brief.id,
        name: brief.name,
        org: brief.org,
        whatsapp: brief.whatsapp,
        service: brief.service,
        budget: brief.budget,
        briefText: brief.briefText,
        status: brief.status,
        createdAt: brief.createdAt.toISOString().split("T")[0],
      },
    })
  } catch (err) {
    console.error("GET /api/brief/[id] error:", err)
    return NextResponse.json(
      { error: "Gagal memuat detail brief." },
      { status: 500 }
    )
  }
}
