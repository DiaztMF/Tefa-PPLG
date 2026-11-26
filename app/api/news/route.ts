import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { getNews } from "@/lib/db/queries";
import { requireAdminSession } from "@/lib/auth-guard";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function GET() {
  const data = await getNews();
  return NextResponse.json({ news: data });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Judul dan isi berita wajib diisi." },
        { status: 400 }
      );
    }

    const id = `news-${crypto.randomUUID()}`;
    const slug = `${toSlug(String(title))}-${crypto.randomUUID().slice(0, 8)}`;
    const authorName = author ? String(author).trim() : "Admin TeFa PPLG";

    if (isDatabaseConfigured()) {
      await db.insert(news).values({
        id,
        title: String(title).trim(),
        slug,
        content: String(content).trim(),
        author: authorName,
      });
    }

    return NextResponse.json({
      success: true,
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
    console.error("POST /api/news error:", err);
    return NextResponse.json(
      { error: "Gagal menerbitkan berita." },
      { status: 500 }
    );
  }
}
