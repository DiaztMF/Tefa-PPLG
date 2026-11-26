import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { projectStudents, projects } from "@/lib/db/schema";
import { getProjects } from "@/lib/db/queries";
import { requireAdminSession } from "@/lib/auth-guard";

export async function GET() {
  const data = await getProjects();
  return NextResponse.json({ projects: data });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
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
      team,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Judul, kategori, dan deskripsi proyek wajib diisi." },
        { status: 400 }
      );
    }

    const id = `proj-${Date.now()}`;
    const techList: string[] = Array.isArray(techStack)
      ? techStack
      : String(techStack || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const teamList: { studentId: string; studentName?: string; role: string }[] =
      Array.isArray(team) ? team : [];

    if (isDatabaseConfigured()) {
      await db.insert(projects).values({
        id,
        title: String(title).trim(),
        category: String(category).trim(),
        description: String(description).trim(),
        longDescription: longDescription
          ? String(longDescription).trim()
          : String(description).trim(),
        coverImage: imageUrl ? String(imageUrl).trim() : null,
        liveUrl: liveUrl ? String(liveUrl).trim() : null,
        repoUrl: repoUrl ? String(repoUrl).trim() : null,
        techStack: JSON.stringify(
          techList.length > 0 ? techList : ["Next.js", "TypeScript"]
        ),
      });

      for (const member of teamList) {
        if (member.studentId) {
          await db
            .insert(projectStudents)
            .values({
              projectId: id,
              studentId: member.studentId,
              role: member.role || "Developer",
            })
            .onConflictDoNothing();
        }
      }
    }

    return NextResponse.json({
      success: true,
      project: {
        id,
        title,
        category,
        description,
        longDescription: longDescription || description,
        imageUrl: imageUrl || undefined,
        liveUrl: liveUrl || undefined,
        repoUrl: repoUrl || undefined,
        techStack: techList.length > 0 ? techList : ["Next.js", "TypeScript"],
        team: teamList,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan proyek baru." },
      { status: 500 }
    );
  }
}
