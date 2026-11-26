import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

/**
 * Ensures the request has a valid admin session when a database is configured.
 * Returns null if authorized, or a 401 NextResponse if unauthorized.
 */
export async function requireAdminSession(
  request: NextRequest
): Promise<NextResponse | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Silakan login sebagai admin terlebih dahulu." },
      { status: 401 }
    );
  }

  return null;
}
