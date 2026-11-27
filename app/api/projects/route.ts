import { NextRequest, NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/lib/db"
import { projectStudents, projects, students } from "@/lib/db/schema"
import { getProjects, getStudentByUser } from "@/lib/db/queries"
import { requireAdminSession } from "@/lib/auth-guard"
import { isRateLimited } from "@/lib/rate-limit"

import { auth } from "@/lib/auth"
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession(request)
  if (unauthorized) return unauthorized

  const data = await getProjects()
  return NextResponse.json({ projects: data })
}

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database belum dikonfigurasi. Tidak dapat menyimpan data." },
      { status: 503 }
    )
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    )
  }

  const user = session.user
  const userRole =
    user && typeof user === "object" && "role" in user ? user.role : null
  const isAdmin = userRole === "admin"
  const isStudent = userRole === "student" || userRole === "siswa"

  if (!isAdmin && !isStudent) {
    return NextResponse.json(
      {
        error:
          "Forbidden. Hanya siswa atau admin yang dapat mengajukan proyek.",
      },
      { status: 403 }
    )
  }

  const ip = getClientIp(request)
  if (await isRateLimited(`project:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
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
    } = body

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Judul, deskripsi, dan kategori wajib diisi." },
        { status: 400 }
      )
    }

    let submittedBy: string | null = null
    if (!isAdmin) {
      const student = await getStudentByUser(
        String(user.id),
        String(user.email ?? "")
      )
      if (!student) {
        const [created] = await db
          .insert(students)
          .values({
            id: `std-${crypto.randomUUID()}`,
            name: String(user.name ?? user.email ?? "Siswa"),
            email: String(user.email ?? ""),
            userId: String(user.id),
            entryYear: new Date().getFullYear(),
            skills: "[]",
            bio: "Siswa PPLG SMK",
          })
          .returning({ id: students.id })
        submittedBy = created.id
      } else {
        submittedBy = student.id
      }
    }

    const id = `proj-${crypto.randomUUID()}`
    const techList: string[] = Array.isArray(techStack)
      ? techStack
      : String(techStack || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)

    const teamList: {
      studentId: string
      studentName?: string
      role: string
    }[] = Array.isArray(team) ? team : []

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
      submittedBy,
    })

    for (const member of teamList) {
      if (member.studentId) {
        await db
          .insert(projectStudents)
          .values({
            projectId: id,
            studentId: member.studentId,
            role: member.role || "Developer",
          })
          .onConflictDoNothing()
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
    })
  } catch (err) {
    console.error("POST /api/projects error:", err)
    return NextResponse.json(
      { error: "Gagal menyimpan proyek baru." },
      { status: 500 }
    )
  }
}
