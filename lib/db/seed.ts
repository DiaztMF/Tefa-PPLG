import "dotenv/config"
import { db, isDatabaseConfigured } from "./index"
import { students, projects, projectStudents, briefs, news } from "./schema"
import { mockProjects, mockStudents } from "@/lib/data/mock-data"

async function seed() {
  if (!isDatabaseConfigured()) {
    console.error(
      "DATABASE_URL belum dikonfigurasi (masih menggunakan template placeholder). Isi .env terlebih dahulu sebelum menjalankan seed."
    )
    process.exit(1)
  }

  console.log("Seeding database TeFa PPLG...")

  for (const std of mockStudents) {
    await db
      .insert(students)
      .values({
        id: std.id,
        name: std.name,
        avatar: std.avatar,
        bio: std.bio,
        entryYear: std.entryYear,
        email: std.email,
        skills: JSON.stringify(std.skills),
        github: std.github ?? null,
        linkedin: std.linkedin ?? null,
      })
      .onConflictDoNothing()
  }

  for (const proj of mockProjects) {
    await db
      .insert(projects)
      .values({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription,
        category: proj.category,
        coverImage: proj.imageUrl ?? proj.coverImage ?? null,
        liveUrl: proj.liveUrl ?? null,
        repoUrl: proj.repoUrl ?? null,
        techStack: JSON.stringify(proj.techStack),
        createdAt: new Date(proj.createdAt),
      })
      .onConflictDoNothing()

    for (const member of proj.team) {
      await db
        .insert(projectStudents)
        .values({
          projectId: proj.id,
          studentId: member.studentId,
          role: member.role,
        })
        .onConflictDoNothing()
    }
  }

  await db
    .insert(briefs)
    .values([
      {
        id: "brief-01",
        name: "Budi Santoso",
        org: "PT Akses Karya Digital",
        whatsapp: "081234567890",
        service: "Web Development",
        budget: "5 - 15 Juta",
        briefText:
          "Pengembangan portal perusahaan responsif dengan integrasi CMS berita dan galeri produk.",
        status: "Baru",
        trackingToken: "track-01",
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
        status: "Diskusi",
        trackingToken: "track-02",
      },
    ])
    .onConflictDoNothing()

  await db
    .insert(news)
    .values([
      {
        id: "news-01",
        title: "Peluncuran Portal Showcase & Lead Generator TeFa PPLG",
        slug: "peluncuran-portal-showcase-tefa-pplg",
        content:
          "Teaching Factory PPLG SMK Negeri 2 Surakarta resmi meluncurkan portal portofolio siswa dan layanan pemesanan perangkat lunak industri untuk UMKM serta mitra DUDI.",
        author: "Tim Studio TeFa PPLG",
      },
      {
        id: "news-02",
        title: "Kolaborasi Proyek Digitalisasi UMKM Bersama Siswa Kelas XI",
        slug: "kolaborasi-proyek-digitalisasi-umkm",
        content:
          "Siswa PPLG angkatan 2024 berhasil menyelesaikan implementasi sistem manajemen stok dan e-commerce berbasis Next.js untuk mitra UMKM lokal.",
        author: "Instruktur Industri PPLG",
      },
    ])
    .onConflictDoNothing()

  console.log("Seed selesai!")
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Gagal menjalankan seed:", err)
    process.exit(1)
  })
