
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
export async function getStats(): Promise<{
  projectsCount: number;
  studentsCount: number;
  alumniCount: number;
}> {
  if (!isDatabaseConfigured()) {
    const currentYear = new Date().getFullYear();
    const alumniThreshold = currentYear - 3;
    return {
      projectsCount: mockProjects.length,
      studentsCount: mockStudents.length,
      alumniCount: mockStudents.filter((s) => s.entryYear <= alumniThreshold).length,
    };
  }
  try {
    const currentYear = new Date().getFullYear();
    const alumniThreshold = currentYear - 3;

    const [projectRows, studentRows] = await Promise.all([
      db.select({ count: projects.id }).from(projects),
      db.select({ id: students.id, entryYear: students.entryYear }).from(students),
    ]);

    return {
      projectsCount: projectRows.length,
      studentsCount: studentRows.length,
      alumniCount: studentRows.filter((s) => s.entryYear <= alumniThreshold).length,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getStats ke mock data:", err);
    const currentYear = new Date().getFullYear();
    const alumniThreshold = currentYear - 3;
    return {
      projectsCount: mockProjects.length,
      studentsCount: mockStudents.length,
      alumniCount: mockStudents.filter((s) => s.entryYear <= alumniThreshold).length,
    };
  }
}

    if (process.env.NODE_ENV === "production") {
      throw err;
    }