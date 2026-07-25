# Product Requirement Document (PRD)

## 1. Document Overview & Metadata

* **Title:** TeFa PPLG Web Portal & Showcase Platform
* **Version:** 1.0.0 (Release Candidate)
* **Last Updated:** 25 Juli 2026
* **Status:** `Approved`
* **Stakeholders:**
  * **Product Manager & Tech Lead:** Diazt Muhammad Firmansyah
  * **Lead Designer:** Tim UI/UX TeFa PPLG
  * **Engineering Team:** Tim Software Development TeFa PPLG

---

## 2. Executive Summary & Core Strategy

### 2.1 Problem Statement

1. **Sisi Sekolah & Siswa:** Siswa PPLG (Pengembangan Perangkat Lunak & GIM) menghasilkan banyak produk dan perangkat lunak berkualitas tinggi melalui pembelajaran berbasis proyek (*Project-Based Learning* / PBL). Namun, portofolio karya ini tersebar, tidak terarsip secara profesional, dan sulit diakses oleh calon mitra industri.
2. **Sisi Klien / UMKM / DUDI:** Klien lokal dan mitra DUDI sering kesulitan mencari penyedia jasa pembuatan software lokal yang tepercaya, transparan, dan memiliki estimasi anggaran yang fleksibel.
3. **Urgensi Peluncuran (Lead Generator):** TeFa PPLG membutuhkan saluran resmi (*lead generator*) yang sah dan profesional untuk menerima pesanan proyek industri nyata, yang berfungsi sebagai sarana belajar langsung bagi siswa dalam skala studio produksi.

### 2.2 Goals & Key Performance Indicators (KPIs)

* **Inbound Lead Generation:** Minimal 5–10 *inbound brief* proyek berkualitas masuk setiap bulan melalui Form Brief.
* **100% Portfolio Archival:** Seluruh proyek unggulan siswa terarsip lengkap dengan tangkapan layar bersih, *tech stack*, dan pemetaan kontribusi siswa.
* **Automated Student Class Status:** 100% otomatisasi perhitungan kenaikan tingkat kelas siswa dan penetapan status alumni berjalan akurat setiap tanggal 1 Juli tanpa intervensi manual.
* **Performance & SEO Excellence:** Skor Google Lighthouse > 90 pada indikator *Performance*, *Accessibility*, dan *SEO*.

### 2.3 Target Personas

1. **Calon Klien / UMKM / Mitra DUDI (Primary):** Pihak eksternal yang mencari solusi pembuatan website, aplikasi mobile, atau UI/UX design.
2. **Siswa PPLG (Secondary):** Pengguna internal yang memamerkan portofolio, *skill tag*, dan rekam jejak peran proyek sebagai CV digital.
3. **Admin / Instruktur TeFa (Internal):** Guru dan pengelola yang meng-upload proyek, mengelola rilis berita, serta menugaskan siswa ke dalam proyek.

---

## 3. Scope & Feature Specifications

### 3.1 In-Scope (V1 Launch Release)

* **Interactive Landing Page:** 
  * Hero Section dengan *Subtle Grid Background Pattern* dan headline Geist bold.
  * *Bento Grid Services* yang menampilkan bidang keahlian TeFa (Web Dev, Mobile App, UI/UX Design, IoT/Game).
  * Showcase Highlight Carousel / Grid.
  * Stat Counter & Testimonial Section.
* **Interactive Showcase Catalogue:**
  * Katalag portofolio dengan pencarian teks real-time, filter kategori layanan, dan tag *tech stack*.
  * Detail Halaman Portofolio (`/showcase/[id]`) menampilkan screenshot mockup browser, deskripsi proyek, arsitektur teknis, serta daftar siswa yang terlibat beserta *role*-nya.
* **Form Brief & Lead Generation (Dual-Action Flow):**
  * Modal Form Brief interaktif yang menerima input: Nama, Perusahaan/Instansi, WhatsApp, Jenis Layanan, Estimasi Budget, Detail Brief, dan Deadline.
  * **Dual-Action Engine:** 
    1. Menyimpan data brief secara aman ke Database PostgreSQL (Neon DB) via Next.js Server Action / API Route.
    2. Otomatis mengarahkan client ke WhatsApp Web/App (`wa.me`) dengan teks pesan yang sudah terformat rapi untuk interaksi instan.
* **Automated Student Directory:**
  * Halaman Direktori Siswa (`/students`) dan Profil Portofolio Siswa (`/students/[id]`).
  * **Logika Otomatisasi Kelas:** Perhitungan otomatis tingkat kelas berdasarkan `Tahun Masuk` (Year of Entry) per tanggal 1 Juli (Tahun ke-1 = Kelas X, Tahun ke-2 = Kelas XI, Tahun ke-3 = Kelas XII, > 3 Tahun = Alumni/Angkatan YYYY).
* **Admin CMS Dashboard (`/admin`):**
  * Otentikasi aman berbasis Better-Auth.
  * CRUD Manajemen Proyek Showcase dengan *multi-select student tagging* dan spesifikasi role siswa.
  * CRUD Data Siswa & Manajemen Berita/Artikel TeFa.

### 3.2 Out-of-Scope (V2 Roadmap)

* Payment gateway terintegrasi untuk DP/pembayaran proyek di dalam portal web.
* Portal login khusus untuk klien (*Client Progress Tracking Portal*).
* Sistem penerimaan magang otomatis.

---

## 4. Technical Architecture & Stack

* **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
* **Language:** TypeScript 5.x
* **Styling & UI:** Tailwind CSS v4, shadcn/ui, Geist & Inter Fonts (`next/font/google`), Light Mode Only System.
* **Database & ORM:** Serverless PostgreSQL (Neon DB), Drizzle ORM
* **Authentication:** Better-Auth (Role-based access control: Admin / Instructor)
* **Deployment & Containerization:** Docker Containerization & Vercel / Cloud Infrastructure.

---

## 5. Non-Functional Requirements & Performance Budgets

* **Accessibility (a11y):** Memenuhi standar WCAG 2.2 Level AA (kontras warna rasio minimal 4.5:1, navigasi keyboard penuh, ARIA labels pada modal & tombol).
* **SEO Optimization:** 
  * Metadata dinamis dan tag OpenGraph di setiap halaman (`generateMetadata`).
  * Semantik HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, satu `<h1>` per halaman).
  * Sitemap XML otomatis dan `robots.txt`.
* **Performance:** High Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 6. Project Milestones & Delivery Schedule

* **Phase 1: Design & Spec Standardization (Week 1)** — Finalisasi `design.md` & `prd.md` (Selesai).
* **Phase 2: Core Architecture & DB Setup (Week 2)** — Integrasi Drizzle ORM, Neon PostgreSQL, dan Better-Auth.
* **Phase 3: Public Portal UI Slicing (Week 3–4)** — Pengerjaan Landing Page, Showcase Catalogue, dan Student Profile dengan Light Mode Design System.
* **Phase 4: Lead Generator & Admin CMS (Week 5)** — Implementasi Form Brief Dual-Action Engine, Admin Dashboard, & Logika Otomatisasi Kelas Siswa.
* **Phase 5: Testing, QA & Accessibility Audit (Week 6)** — End-to-end testing, audit performa Lighthouse, & bug fixing.
* **Phase 6: Production Launch (Week 7)** — Deployment dan aktivasi domain resmi TeFa PPLG.