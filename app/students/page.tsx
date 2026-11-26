import type { Metadata } from "next";
import { getStudents } from "@/lib/db/queries";
import { StudentsDirectory } from "@/components/students/students-directory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Direktori Talenta Siswa & Alumni",
  description:
    "Rekam jejak, portofolio, dan spesialisasi keahlian siswa dan alumni TeFa PPLG SMK Negeri 2 Surakarta.",
};

export default async function StudentsDirectoryPage() {
  const students = await getStudents();
  return <StudentsDirectory students={students} />;
}
