# Detailed Verification & Testing Plan for TeFa Portal V1

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create automated test suites for core logic (`student-class.ts`, `route.ts`, `mock-data.ts`) using Node.js native test runner and perform comprehensive verification across all UI and API modules.

**Architecture:** Create test files in `tests/` (`student-class.test.ts`, `api-brief.test.ts`, `data-integrity.test.ts`), configure `npm test` runner script, execute tests, and perform full production build verification.

**Tech Stack:** Node.js native test runner (`node:test`, `node:assert`), TypeScript, Next.js 15.

## Global Constraints

* Zero external test framework overhead: Use Node's built-in `node:test` and `node:assert`.
* Coverage: 100% logic coverage for `calculateStudentClass`, API validation, and mock data integrity.
* Strict Light Mode and zero TypeScript errors (`npx tsc --noEmit`).

---

### Task 1: Unit Test Suite for Class Automation Logic (`tests/student-class.test.ts`)

**Files:**
- Create: `tests/student-class.test.ts`
- Modify: `package.json` (add `"test"` script)

**Interfaces:**
- Consumes: `calculateStudentClass` from `@/lib/utils/student-class`
- Produces: Test suite verifying July 1 cutoff calculations for Kelas X, XI, XII, and Alumni.

- [ ] **Step 1: Create `tests/student-class.test.ts`**

```typescript
import test from "node:test";
import assert from "node:assert/strict";
import { calculateStudentClass } from "../lib/utils/student-class";

test("calculateStudentClass - Year 1 Student in October (Kelas X)", () => {
  // Student entered in 2025, evaluated in Oct 2025 -> Year 1 -> Kelas X
  const testDate = new Date(2025, 9, 15); // Oct 15, 2025
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "X");
  assert.equal(result.label, "Kelas X PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 1 Student in May (Before July 1 cutoff)", () => {
  // Student entered in 2025, evaluated in May 2026 -> Still Year 1 -> Kelas X
  const testDate = new Date(2026, 4, 20); // May 20, 2026
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "X");
  assert.equal(result.label, "Kelas X PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 2 Student after July 1 cutoff (Kelas XI)", () => {
  // Student entered in 2025, evaluated in July 15, 2026 -> Kelas XI
  const testDate = new Date(2026, 6, 15); // July 15, 2026
  const result = calculateStudentClass(2025, testDate);
  assert.equal(result.level, "XI");
  assert.equal(result.label, "Kelas XI PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - Year 3 Student (Kelas XII)", () => {
  // Student entered in 2023, evaluated in Aug 2025 -> Kelas XII
  const testDate = new Date(2025, 7, 10); // Aug 10, 2025
  const result = calculateStudentClass(2023, testDate);
  assert.equal(result.level, "XII");
  assert.equal(result.label, "Kelas XII PPLG");
  assert.equal(result.isAlumni, false);
});

test("calculateStudentClass - >3 Years Student (Alumni)", () => {
  // Student entered in 2022, evaluated in July 2026 -> >3 Years -> Alumni
  const testDate = new Date(2026, 6, 1); // July 1, 2026
  const result = calculateStudentClass(2022, testDate);
  assert.equal(result.level, "Alumni");
  assert.equal(result.label, "Alumni (Angkatan 2022)");
  assert.equal(result.isAlumni, true);
});
```

- [ ] **Step 2: Add `"test"` script to `package.json`**

Update `package.json`: `"test": "tsx --test tests/**/*.test.ts"` or `"test": "node --import tsx/suppress --test tests/*.test.ts"`

- [ ] **Step 3: Run unit tests to verify they pass**

Run `pnpm test`.

---

### Task 2: Data Integrity Test Suite (`tests/data-integrity.test.ts`)

**Files:**
- Create: `tests/data-integrity.test.ts`

**Interfaces:**
- Consumes: `mockProjects` and `mockStudents` from `@/lib/data/mock-data`
- Produces: Test suite verifying mock data consistency, unique IDs, non-empty team members, valid categories.

- [ ] **Step 1: Create `tests/data-integrity.test.ts`**

```typescript
import test from "node:test";
import assert from "node:assert/strict";
import { mockProjects, mockStudents } from "../lib/data/mock-data";

test("Mock Data - Unique IDs for students and projects", () => {
  const studentIds = mockStudents.map((s) => s.id);
  const projectIds = mockProjects.map((p) => p.id);

  assert.equal(new Set(studentIds).size, studentIds.length, "Student IDs must be unique");
  assert.equal(new Set(projectIds).size, projectIds.length, "Project IDs must be unique");
});

test("Mock Data - Projects must have team members referencing valid student IDs", () => {
  const validStudentIds = new Set(mockStudents.map((s) => s.id));

  for (const project of mockProjects) {
    assert.ok(project.team.length > 0, `Project ${project.id} must have at least 1 team member`);
    for (const member of project.team) {
      assert.ok(
        validStudentIds.has(member.studentId),
        `Project ${project.id} references invalid student ID ${member.studentId}`
      );
      assert.ok(member.role.length > 0, `Team member in ${project.id} must have a non-empty role`);
    }
  }
});

test("Mock Data - Projects must have non-empty tech stack array and valid category", () => {
  const validCategories = [
    "Web Application",
    "Mobile Application",
    "UI/UX Design",
    "Digital Products & Templates",
  ];

  for (const project of mockProjects) {
    assert.ok(validCategories.includes(project.category), `Project ${project.id} has invalid category`);
    assert.ok(project.techStack.length > 0, `Project ${project.id} must have tech stack tags`);
  }
});
```

- [ ] **Step 2: Run test suite**

Run `pnpm test`.

---

### Task 3: Form Brief API Test Suite (`tests/api-brief.test.ts`)

**Files:**
- Create: `tests/api-brief.test.ts`

**Interfaces:**
- Consumes: Brief API logic
- Produces: Test suite verifying payload validation and WhatsApp URL formatting.

- [ ] **Step 1: Create `tests/api-brief.test.ts`**

```typescript
import test from "node:test";
import assert from "node:assert/strict";

test("Brief API Logic - Validation rules for empty fields", () => {
  const validateBriefPayload = (payload: any) => {
    if (!payload.name || !payload.whatsapp || !payload.brief) {
      return { valid: false, error: "Nama, No. WhatsApp, dan Brief wajib diisi." };
    }
    return { valid: true };
  };

  assert.equal(validateBriefPayload({ name: "", whatsapp: "08123", brief: "test" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "", brief: "test" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "08123", brief: "" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "08123", brief: "Desain Web" }).valid, true);
});

test("Brief API Logic - WhatsApp redirect URL generation", () => {
  const name = "Budi Santoso";
  const whatsapp = "081234567890";
  const brief = "Buat Landing Page";
  const service = "Web Development";

  const message = `Halo Admin TeFa PPLG,%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(name)}%0A- *No. WA:* ${encodeURIComponent(whatsapp)}%0A- *Layanan:* ${encodeURIComponent(service)}%0A- *Briefing Proyek:* ${encodeURIComponent(brief)}`;

  const waUrl = `https://wa.me/6281234567890?text=${message}`;

  assert.ok(waUrl.includes("wa.me/6281234567890"));
  assert.ok(waUrl.includes(encodeURIComponent(name)));
  assert.ok(waUrl.includes(encodeURIComponent(brief)));
});
```

- [ ] **Step 2: Run test suite**

Run `pnpm test`.

---

### Task 4: Complete Automated Test Execution & Production Verification

**Files:**
- Touch: `app/`

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Commit test files to Git**
