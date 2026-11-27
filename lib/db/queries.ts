import { and, desc, eq, lte, or } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import {
  briefs,
  news,
  projectStudents,
  projects,
  students,
} from "@/lib/db/schema";
import { mockProjects, mockStudents } from "@/lib/data/mock-data";


export interface StudentItem {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  entryYear: number;
  github?: string;
  linkedin?: string;
  skills: string[];
}

export interface ProjectTeamMember {
  studentId: string;
  studentName: string;
  role: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  team: ProjectTeamMember[];
  createdAt: string;
  status?: string;
  submittedBy?: string;
}

export interface BriefItem {
  id: string;
  name: string;
  org: string;
  whatsapp: string;
  service: string;
  budget: string;
  briefText: string;
  status: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
}

export const mockBriefsFallback: BriefItem[] = [
  {
    id: "brief-01",
    name: "Budi Santoso",
    org: "PT Akses Karya Digital",
    whatsapp: "081234567890",
    service: "Web Development",
    budget: "5 - 15 Juta",
    briefText:
      "Pengembangan portal perusahaan responsif dengan integrasi CMS berita dan galeri produk.",
    createdAt: "2026-07-24",
    status: "Baru",
  },
  {
    id: "brief-02",
    name: "Dr. Lina Herlina",
    org: "Klinik Sehat Bersama",
    whatsapp: "081987654321",
    service: "Web Development",
    budget: "15 - 30 Juta",
    briefText:
      "Sistem rekam medis digital pasien klinik dan pendaftaran antrean online.",
    createdAt: "2026-07-22",
    status: "Diskusi",
  },
];

export const mockNewsFallback: NewsItem[] = [
  {
    id: "news-01",
    title: "Peluncuran Portal Showcase & Lead Generator TeFa PPLG",
    slug: "peluncuran-portal-showcase-tefa-pplg",
    content:
      "Teaching Factory PPLG SMK Negeri 2 Surakarta resmi meluncurkan portal portofolio siswa dan layanan pemesanan perangkat lunak industri untuk UMKM serta mitra DUDI.",
    author: "Tim Studio TeFa PPLG",
    createdAt: "2026-07-25",
  },
  {
    id: "news-02",
    title: "Kolaborasi Proyek Digitalisasi UMKM Bersama Siswa Kelas XI",
    slug: "kolaborasi-proyek-digitalisasi-umkm",
    content:
      "Siswa PPLG angkatan 2024 berhasil menyelesaikan implementasi sistem manajemen stok dan e-commerce berbasis Next.js untuk mitra UMKM lokal.",
    author: "Instruktur Industri PPLG",
    createdAt: "2026-07-18",
  },
];

function parseStringArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fallback to comma-separated parsing
    }
  }
  return trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getStudents(): Promise<StudentItem[]> {
  if (!isDatabaseConfigured()) {
    return mockStudents;
  }

  try {
    const rows = await db
      .select()
      .from(students)
      .orderBy(desc(students.createdAt));

    if (rows.length === 0) return [];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      avatar: row.avatar || "",
      bio: row.bio || "",
      entryYear: row.entryYear,
      github: row.github ?? undefined,
      linkedin: row.linkedin ?? undefined,
      skills: parseStringArray(row.skills),
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getStudents ke mock data:", err);
    return mockStudents;
  }
}

export async function getStudentById(
  id: string
): Promise<StudentItem | null> {
  if (!isDatabaseConfigured()) {
    return mockStudents.find((s) => s.id === id) ?? null;
  }

  try {
    const [row] = await db
      .select()
      .from(students)
      .where(eq(students.id, id))
      .limit(1);

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      avatar: row.avatar || "",
      bio: row.bio || "",
      entryYear: row.entryYear,
      github: row.github ?? undefined,
      linkedin: row.linkedin ?? undefined,
      skills: parseStringArray(row.skills),
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getStudentById ke mock data:", err);
    return mockStudents.find((s) => s.id === id) ?? null;
  }
}

export async function getStudentByUser(
  userId: string,
  email: string
): Promise<StudentItem | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const [row] = await db
      .select()
      .from(students)
      .where(or(eq(students.userId, userId), eq(students.email, email)))
      .limit(1);

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      avatar: row.avatar || "",
      bio: row.bio || "",
      entryYear: row.entryYear,
      github: row.github ?? undefined,
      linkedin: row.linkedin ?? undefined,
      skills: parseStringArray(row.skills),
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getStudentByUser ke mock data:", err);
    return null;
  }
}

function findApprovedMockProject(id: string): ProjectItem | null {
  const project = mockProjects.find((p) => p.id === id) as
    | ProjectItem
    | undefined;
  if (!project || (project.status ?? "approved") !== "approved") return null;
  return project;
}

export async function getProjects(status?: string): Promise<ProjectItem[]> {
  const mockData =
    status !== undefined
      ? mockProjects.filter(
          (p) => ((p as ProjectItem).status ?? "approved") === status
        )
      : mockProjects;

  if (!isDatabaseConfigured()) {
    return mockData;
  }

  try {
    const projectQuery = db.select().from(projects);
    const filteredQuery =
      status !== undefined
        ? projectQuery.where(eq(projects.status, status))
        : projectQuery;
    const [projectRows, relationRows] = await Promise.all([
      filteredQuery.orderBy(desc(projects.createdAt)),
      db
        .select({
          projectId: projectStudents.projectId,
          studentId: projectStudents.studentId,
          role: projectStudents.role,
          studentName: students.name,
        })
        .from(projectStudents)
        .innerJoin(students, eq(projectStudents.studentId, students.id)),
    ]);

    const teamMap = new Map<string, ProjectTeamMember[]>();
    for (const rel of relationRows) {
      const list = teamMap.get(rel.projectId) ?? [];
      list.push({
        studentId: rel.studentId,
        studentName: rel.studentName,
        role: rel.role,
      });
      teamMap.set(rel.projectId, list);
    }

    return projectRows.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      description: row.description,
      longDescription: row.longDescription || row.description,
      imageUrl: row.coverImage ?? undefined,
      liveUrl: row.liveUrl ?? undefined,
      repoUrl: row.repoUrl ?? undefined,
      techStack: parseStringArray(row.techStack),
      team: teamMap.get(row.id) ?? [],
      createdAt: row.createdAt.toISOString().split("T")[0],
      status: row.status,
      submittedBy: row.submittedBy ?? undefined,
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getProjects ke mock data:", err);
    return mockData;
  }
}

export async function getProjectById(
  id: string
): Promise<ProjectItem | null> {
  if (!isDatabaseConfigured()) {
    return findApprovedMockProject(id);
  }

  try {
    const [row] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.status, "approved")))
      .limit(1);

    if (!row) return null;

    const relationRows = await db
      .select({
        studentId: projectStudents.studentId,
        role: projectStudents.role,
        studentName: students.name,
      })
      .from(projectStudents)
      .innerJoin(students, eq(projectStudents.studentId, students.id))
      .where(eq(projectStudents.projectId, id));

    return {
      id: row.id,
      title: row.title,
      category: row.category,
      description: row.description,
      longDescription: row.longDescription || row.description,
      imageUrl: row.coverImage ?? undefined,
      liveUrl: row.liveUrl ?? undefined,
      repoUrl: row.repoUrl ?? undefined,
      techStack: parseStringArray(row.techStack),
      team: relationRows,
      createdAt: row.createdAt.toISOString().split("T")[0],
      status: row.status,
      submittedBy: row.submittedBy ?? undefined,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getProjectById ke mock data:", err);
    return findApprovedMockProject(id);
  }
}

export async function getBriefs(): Promise<BriefItem[]> {
  if (!isDatabaseConfigured()) {
    return mockBriefsFallback;
  }

  try {
    const rows = await db
      .select()
      .from(briefs)
      .orderBy(desc(briefs.createdAt));

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      org: row.org || "-",
      whatsapp: row.whatsapp,
      service: row.service,
      budget: row.budget,
      briefText: row.briefText,
      status: row.status,
      createdAt: row.createdAt.toISOString().split("T")[0],
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getBriefs ke mock data:", err);
    return mockBriefsFallback;
  }
}

export async function getNews(): Promise<NewsItem[]> {
  if (!isDatabaseConfigured()) {
    return mockNewsFallback;
  }

  try {
    const rows = await db.select().from(news).orderBy(desc(news.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      createdAt: row.createdAt.toISOString().split("T")[0],
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getNews ke mock data:", err);
    return mockNewsFallback;
  }
}
export async function getStats(): Promise<{
  projectsCount: number;
  studentsCount: number;
  alumniCount: number;
}> {
  if (!isDatabaseConfigured()) {
    const now = new Date();
    const jakartaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const currentYear = jakartaNow.getFullYear();
    const currentMonth = jakartaNow.getMonth();
    let alumniThreshold = currentYear - 3;
    if (currentMonth < 6) {
      alumniThreshold -= 1;
    }
    return {
      projectsCount: mockProjects.length,
      studentsCount: mockStudents.length,
      alumniCount: mockStudents.filter((s) => s.entryYear <= alumniThreshold).length,
    };
  }

  try {
    const now = new Date();
    const jakartaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const currentYear = jakartaNow.getFullYear();
    const currentMonth = jakartaNow.getMonth();
    let alumniThreshold = currentYear - 3;
    if (currentMonth < 6) {
      alumniThreshold -= 1;
    }

    const [projectRows, studentRows] = await Promise.all([
      db.select({ count: projects.id }).from(projects),
      db
        .select({ id: students.id, entryYear: students.entryYear })
        .from(students)
        .where(lte(students.entryYear, alumniThreshold)),
    ]);

    return {
      projectsCount: projectRows.length,
      studentsCount: studentRows.length,
      alumniCount: studentRows.length,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getStats ke mock data:", err);
    const now = new Date();
    const jakartaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const currentYear = jakartaNow.getFullYear();
    const currentMonth = jakartaNow.getMonth();
    let alumniThreshold = currentYear - 3;
    if (currentMonth < 6) {
      alumniThreshold -= 1;
    }
    return {
      projectsCount: mockProjects.length,
      studentsCount: mockStudents.length,
      alumniCount: mockStudents.filter((s) => s.entryYear <= alumniThreshold).length,
    };
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (!isDatabaseConfigured()) {
    return mockNewsFallback.find((n) => n.slug === slug) ?? null;
  }

  try {
    const [row] = await db
      .select()
      .from(news)
      .where(eq(news.slug, slug))
      .limit(1);

    if (!row) return null;

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      author: row.author,
      createdAt: row.createdAt.toISOString().split("T")[0],
    };
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    console.warn("Fallback getNewsBySlug ke mock data:", err);
    return mockNewsFallback.find((n) => n.slug === slug) ?? null;
  }
}
