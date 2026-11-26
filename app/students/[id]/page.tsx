import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getStudentById } from "@/lib/db/queries";
import { StudentProfileView } from "@/components/students/student-profile-view";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    return { title: "Profil Siswa Tidak Ditemukan" };
  }

  return {
    title: student.name,
    description: student.bio || `Portofolio digital ${student.name} — TeFa PPLG.`,
  };
}

export default async function StudentProfilePage({ params }: PageProps) {
  const { id } = await params;
  const [student, allProjects] = await Promise.all([
    getStudentById(id),
    getProjects(),
  ]);

  if (!student) {
    notFound();
  }

  const studentProjects = allProjects.filter((p) =>
    p.team.some((t) => t.studentId === student.id)
  );

  return (
    <StudentProfileView student={student} studentProjects={studentProjects} />
  );
}
