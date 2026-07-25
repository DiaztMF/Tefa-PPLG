# Master TeFa Portal V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 100% of V1 scope from `docs/prd.md` including Database Schema (Drizzle ORM), Showcase Catalogue & Detail Pages (`/showcase`, `/showcase/[id]`), Student Directory & Profile Pages (`/students`, `/students/[id]`), Class Automation Logic, Form Brief Server Action/API, and Admin CMS Dashboard (`/admin`).

**Architecture:** 
- Next.js 15 App Router pages and Server Components/Actions.
- Drizzle ORM schema for `students`, `projects`, `project_students` (multi-role mapping), `briefs`, and `news`.
- Tailwind CSS v4 + Light Mode Only design system + Geist/Inter fonts.
- Type-safe data providers & client components.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Drizzle ORM, `@neondatabase/serverless`, Better-Auth, Tailwind CSS v4, shadcn/ui.

## Global Constraints

* Light Mode Only: Strictly consume `--primary` (#136AD5), `--background` (#FAFAFA), `--card` (#FFFFFF), and `--border` (#E2E8F0).
* Typography: Geist font (`font-heading`) for titles, Inter font (`font-sans`) for body.
* Class Automation Rule: Grade level calculated as `July 1 cutoff`: 
  - Year 1 = Kelas X
  - Year 2 = Kelas XI
  - Year 3 = Kelas XII
  - >3 Years = Alumni (Angkatan YYYY)
* Form Brief Engine: Dual-Action (Save record to DB + Open formatted WhatsApp link).

---

### Task 1: Database Schema & Utilities (`lib/db/schema.ts` & `lib/utils/student-class.ts`)

**Files:**
- Create: `lib/db/schema.ts`
- Create: `lib/db/index.ts`
- Create: `lib/utils/student-class.ts`
- Create: `lib/data/mock-data.ts`

**Interfaces:**
- Consumes: `drizzle-orm/pg-core`
- Produces: `students`, `projects`, `projectStudents`, `briefs`, `news` tables, and `calculateStudentClass(entryYear, date)` utility function.

- [ ] **Step 1: Create `lib/utils/student-class.ts` for automated class calculation**

```typescript
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

  // Academic year start offset
  let academicYearIndex = currentYear - entryYear;
  if (currentMonth < 6) {
    // Before July 1 belongs to previous academic year
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
```

- [ ] **Step 2: Create `lib/db/schema.ts`**

```typescript
import { pgTable, text, varchar, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  entryYear: integer("entry_year").notNull(),
  github: text("github"),
  linkedin: text("linkedin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category").notNull(), // Web App, Mobile App, UI/UX, etc.
  coverImage: text("cover_image"),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  techStack: text("tech_stack").notNull(), // Comma-separated or JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectStudents = pgTable(
  "project_students",
  {
    projectId: varchar("project_id", { length: 64 })
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    studentId: varchar("student_id", { length: 64 })
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // e.g., "Frontend Developer", "UI Designer"
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.studentId] }),
  ]
);

export const briefs = pgTable("briefs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  org: text("org"),
  whatsapp: text("whatsapp").notNull(),
  service: text("service").notNull(),
  budget: text("budget").notNull(),
  briefText: text("brief_text").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const news = pgTable("news", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

- [ ] **Step 3: Create `lib/data/mock-data.ts`**

Create seed mock data for Showcase and Students to populate pages cleanly out-of-the-box.

- [ ] **Step 4: Verify TypeScript compilation**

Run `npx tsc --noEmit`.

---

### Task 2: Build Showcase Catalogue Page (`/showcase`) & Detail Page (`/showcase/[id]`)

**Files:**
- Create: `app/showcase/page.tsx`
- Create: `app/showcase/[id]/page.tsx`

**Interfaces:**
- Consumes: Projects data & Navbar/Footer components
- Produces: 
  - Interactive catalogue with real-time text search, category tabs (All, Web App, Mobile App, UI/UX, Digital Products), and tech stack filter tags.
  - Detail page with Mac browser frame mockup, full project overview, technical architecture details, and student contributor multi-role list.

- [ ] **Step 1: Create `app/showcase/page.tsx`**
- [ ] **Step 2: Create `app/showcase/[id]/page.tsx`**
- [ ] **Step 3: Verify TypeScript compilation**

---

### Task 3: Build Student Directory Page (`/students`) & Profile Page (`/students/[id]`)

**Files:**
- Create: `app/students/page.tsx`
- Create: `app/students/[id]/page.tsx`

**Interfaces:**
- Consumes: Students & Projects data, `calculateStudentClass()`
- Produces: 
  - Student Directory with class filters (All, Kelas X, Kelas XI, Kelas XII, Alumni).
  - Individual student profile displaying photo, name, bio, automated class status badge, skills tags, and list of TeFa projects worked on with specific student roles.

- [ ] **Step 1: Create `app/students/page.tsx`**
- [ ] **Step 2: Create `app/students/[id]/page.tsx`**
- [ ] **Step 3: Verify TypeScript compilation**

---

### Task 4: Build Server Action / API Route for Form Brief Lead Generator

**Files:**
- Create: `app/api/brief/route.ts`

**Interfaces:**
- Consumes: Brief submission payload
- Produces: POST endpoint returning saved brief record ID and pre-filled WhatsApp redirect URL.

- [ ] **Step 1: Create `app/api/brief/route.ts`**
- [ ] **Step 2: Verify API route type checking**

---

### Task 5: Build Admin CMS Dashboard (`/admin`)

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/projects/page.tsx`
- Create: `app/admin/students/page.tsx`
- Create: `app/admin/briefs/page.tsx`

**Interfaces:**
- Consumes: Project, Student, Brief CRUD APIs
- Produces: Admin CMS Dashboard with project multi-select student tagging, class automation overview, and lead briefs management table.

- [ ] **Step 1: Create Admin Layout & Navigation**
- [ ] **Step 2: Create Admin Dashboard overview & CRUD management pages**
- [ ] **Step 3: Verify TypeScript compilation**

---

### Task 6: Final Verification & Build Check

**Files:**
- Touch: `app/`

- [ ] **Step 1: Run `npx tsc --noEmit`**
- [ ] **Step 2: Run `pnpm build`**
- [ ] **Step 3: Commit all completed V1 files to Git**
