import { NextResponse } from "next/server";
import { getStudents } from "@/lib/db/queries";

export async function GET() {
  const students = await getStudents();
  return NextResponse.json({
    students: students.map(({ id, name }) => ({ id, name })),
  });
}
