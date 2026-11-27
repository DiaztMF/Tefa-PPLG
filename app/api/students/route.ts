import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { students } from "@/lib/db/schema";
import { getStudents } from "@/lib/db/queries";
import { requireAdminSession } from "@/lib/auth-guard";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;
  const data = await getStudents();
  return NextResponse.json({ students: data });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { name, entryYear, bio, skills, github, linkedin, avatar, email } = body;

    if (!name || !entryYear) {
      return NextResponse.json(
        { error: "Nama dan Tahun Masuk wajib diisi." },
        { status: 400 }
      );
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi. Tidak dapat menyimpan data." },
        { status: 503 }
      );
    }

    const id = `std-${Date.now()}`;
    const skillList: string[] = Array.isArray(skills)
      ? skills
      : String(skills || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const finalSkills =
      skillList.length > 0 ? skillList : ["HTML", "CSS", "JavaScript"];

    await db.insert(students).values({
      id,
      name: String(name).trim(),
      entryYear: Number(entryYear),
      bio: bio ? String(bio).trim() : "Siswa PPLG SMK",
      avatar: avatar ? String(avatar).trim() : null,
      email: email ? String(email).trim() : "",
      skills: JSON.stringify(finalSkills),
      github: github ? String(github).trim() : null,
      linkedin: linkedin ? String(linkedin).trim() : null,
    });

    return NextResponse.json({
      success: true,
      student: {
        id,
        name: String(name).trim(),
        entryYear: Number(entryYear),
        bio: bio ? String(bio).trim() : "Siswa PPLG SMK",
        avatar: avatar || "",
        skills: finalSkills,
        github: github || undefined,
        linkedin: linkedin || undefined,
      },
    });
  } catch (err) {
    console.error("POST /api/students error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan data siswa." },
      { status: 500 }
    );
  }
}