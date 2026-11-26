import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

/**
 * Ensures the request has a valid session with one of the allowed roles.
 * Returns null if authorized, or a NextResponse error if unauthorized.
 */
export async function requireRole(
  allowedRoles: string[],
  request: NextRequest
): Promise<NextResponse | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  const user = session.user;
  if (
    typeof user !== "object" ||
    user === null ||
    typeof user.role !== "string" ||
    !allowedRoles.includes(user.role)
  ) {
    return NextResponse.json(
      { error: "Forbidden. Anda tidak memiliki akses ke halaman ini." },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Ensures the request has a valid admin session.
 * Kept for backward compatibility.
 */
export async function requireAdminSession(
  request: NextRequest
): Promise<NextResponse | null> {
  return requireRole(["admin"], request);
}
