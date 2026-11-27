import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya lindungi route admin dan sub-route-nya
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!isDatabaseConfigured()) return NextResponse.next();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const user = session.user as { role?: unknown } | undefined;
    const role = typeof user?.role === "string" ? user.role : "";
    if (role !== "admin") {
      const destination =
        role === "siswa" || role === "student"
          ? "/students"
          : role === "klien" || role === "client"
            ? "/client"
            : "/";
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
