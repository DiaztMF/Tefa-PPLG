export interface ClassStatusInfo {
  level: "X" | "XI" | "XII" | "Alumni";
  label: string;
  isAlumni: boolean;
}

/**
 * Calculates student class level based on entry year and July 1 cutoff date.
 * - Year 1 (July 1 entry_year to June 30 entry_year+1): Kelas X
 * - Year 2 (July 1 entry_year+1 to June 30 entry_year+2): Kelas XI
 * - Year 3 (July 1 entry_year+2 to June 30 entry_year+3): Kelas XII
 * - >3 Years (after July 1 entry_year+3): Alumni (Angkatan YYYY)
 */
export function calculateStudentClass(entryYear: number, referenceDate: Date = new Date()): ClassStatusInfo {
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth(); // 0-indexed (6 = July)

  let academicYearIndex = currentYear - entryYear;
  if (currentMonth < 6) {
    academicYearIndex -= 1;
  }

  if (academicYearIndex <= 0) {
    return { level: "X", label: "Kelas X PPLG", isAlumni: false };
  } else if (academicYearIndex === 1) {
    return { level: "XI", label: "Kelas XI PPLG", isAlumni: false };
  } else if (academicYearIndex === 2) {
    return { level: "XII", label: "Kelas XII PPLG", isAlumni: false };
  } else {
    return { level: "Alumni", label: `Alumni (Angkatan ${entryYear})`, isAlumni: true };
  }
}
