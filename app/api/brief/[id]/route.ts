import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import { briefs } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/auth-guard";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    if (isDatabaseConfigured()) {
      await db.delete(briefs).where(eq(briefs.id, id));
    }
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("DELETE /api/brief/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal menghapus brief." },
      { status: 500 }
    );
  }
}
