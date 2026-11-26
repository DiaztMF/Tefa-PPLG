import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/auth-guard";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Judul dan isi berita wajib diisi." },
        { status: 400 }
      );
    }

    const slug = `${toSlug(String(title))}-${Date.now().toString().slice(-4)}`;
    const authorName = author ? String(author).trim() : "Admin TeFa PPLG";

    if (isDatabaseConfigured()) {
      await db
        .update(news)
        .set({
          title: String(title).trim(),
          slug,
          content: String(content).trim(),
          author: authorName,
        })
        .where(eq(news.id, id));
    }

    return NextResponse.json({
      success: true,
      id,
      article: {
        id,
        title: String(title).trim(),
        slug,
        content: String(content).trim(),
        author: authorName,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
  } catch (err) {
    console.error("PUT /api/news/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal memperbarui berita." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    if (isDatabaseConfigured()) {
      await db.delete(news).where(eq(news.id, id));
    }
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("DELETE /api/news/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal menghapus berita." },
      { status: 500 }
    );
  }
}
