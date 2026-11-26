export async function PUT(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, entryYear, bio, skills, github, linkedin, avatar } = body;

    if (!name || !entryYear) {
      return NextResponse.json(
        { error: "Nama dan Tahun Masuk wajib diisi." },
        { status: 400 }
      );
    }

    const skillList: string[] = Array.isArray(skills)
      ? skills
      : String(skills || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const finalSkills =
      skillList.length > 0 ? skillList : ["HTML", "CSS", "JavaScript"];

    if (isDatabaseConfigured()) {
      await db
        .update(students)
        .set({
          name: String(name).trim(),
          entryYear: Number(entryYear),
          bio: bio ? String(bio).trim() : "Siswa PPLG SMK",
          avatar: avatar ? String(avatar).trim() : null,
          skills: JSON.stringify(finalSkills),
          github: github ? String(github).trim() : null,
          linkedin: linkedin ? String(linkedin).trim() : null,
        })
        .where(eq(students.id, id));
    }

    return NextResponse.json({
      success: true,
      id,
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
    console.error("PUT /api/students/[id] error:", err);
    return NextResponse.json(
      { error: "Gagal memperbarui data siswa." },
      { status: 500 }
    );
  }
}
