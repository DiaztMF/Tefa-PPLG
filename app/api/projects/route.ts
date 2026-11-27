import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { projectStudents, projects } from "@/lib/db/schema";
import { getProjects } from "@/lib/db/queries";
import { auth } from "@/lib/auth";

const projectRateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (projectRateLimit.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );
  projectRateLimit.set(ip, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordAttempt(ip: string): void {
  const now = Date.now();
  projectRateLimit.set(ip, [...(projectRateLimit.get(ip) || []), now]);
}

export async function GET() {
  const data = await getProjects();
  return NextResponse.json({ projects: data });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." },
      { status: 429 }
    );
  }
  recordAttempt(ip);

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
  const studentId =
    user && typeof user === "object" && "id" in user ? user.id : null;
  const userRole =
    user && typeof user === "object" && "role" in user ? user.role : null;
  const isAdmin = userRole === "admin";
  const isStudent = userRole === "student" || userRole === "siswa";

  if (!isAdmin && !isStudent) {
    return NextResponse.json(
      { error: "Forbidden. Hanya siswa atau admin yang dapat mengajukan proyek." },
      { status: 403 }
    );
  }

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
        { error: "Judul, deskripsi, dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    const id = `proj-${crypto.randomUUID()}`;
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
        status: isAdmin ? "approved" : "pending",
        submittedBy: studentId || null,
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
        status: isAdmin ? "approved" : "pending",
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
