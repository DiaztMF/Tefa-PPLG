import test from "node:test";
import assert from "node:assert/strict";
import { calculateStudentClass } from "../lib/utils/student-class";

test("calculateStudentClass - Year 1 Student in October (Kelas X)", () => {
  const testDate = new Date(2025, 9, 15); // Oct 15, 2025
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "X");
  assert.equal(result.label, "Kelas X PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 1 Student in May (Before July 1 cutoff)", () => {
  const testDate = new Date(2026, 4, 20); // May 20, 2026
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "X");
  assert.equal(result.label, "Kelas X PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 2 Student after July 1 cutoff (Kelas XI)", () => {
  const testDate = new Date(2026, 6, 15); // July 15, 2026
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "XI");
  assert.equal(result.label, "Kelas XI PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 3 Student (Kelas XII)", () => {
  const testDate = new Date(2025, 7, 10); // Aug 10, 2025
  const result = calculateStudentClass(2023, testDate);
  assert.equal(result.level, "XII");
  assert.equal(result.label, "Kelas XII PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - >3 Years Student (Alumni)", () => {
  const testDate = new Date(2026, 6, 1); // July 1, 2026
  const result = calculateStudentClass(2022, testDate);
  assert.equal(result.level, "Alumni");
  assert.equal(result.label, "Alumni (Angkatan 2022)");
  assert.equal(result.isAlumni, true);
});
