import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/auth-guard";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      title,
      category,
      description,
      longDescription,
      techStack,
      liveUrl,
      repoUrl,
      imageUrl,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Judul, deskripsi, dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    if (isDatabaseConfigured()) {
      await db
        .update(projects)
        .set({
          title: String(title).trim(),
          category: String(category).trim(),
          description: String(description).trim(),
          longDescription: longDescription ? String(longDescription).trim() : null,
          techStack: Array.isArray(techStack)
            ? JSON.stringify(techStack)
            : JSON.stringify(
                String(techStack || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              ),
          liveUrl: liveUrl || null,
          repoUrl: repoUrl || null,
          coverImage: imageUrl || null,
        })
        .where(eq(projects.id, id));
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal memperbarui proyek." },
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
      await db.delete(projects).where(eq(projects.id, id));
    }
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal menghapus proyek." },
      { status: 500 }
    );
  }
}
