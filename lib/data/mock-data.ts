export interface StudentMock {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  entryYear: number;
  email: string;
  github?: string;
  linkedin?: string;
  skills: string[];
}

export interface ProjectMock {
  id: string;
  title: string;
  category: "Web Application" | "Mobile Application" | "UI/UX Design" | "Digital Products & Templates";
  description: string;
  longDescription: string;
  coverImage?: string;
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  team: {
    studentId: string;
    studentName: string;
    role: string;
  }[];
  createdAt: string;
}

export const mockStudents: StudentMock[] = [
  {
    id: "std-01",
    name: "Aditya Pratama",
    avatar: "",
    email: "aditya@example.com",
    entryYear: 2024, // Year 2 -> Kelas XI
    github: "https://github.com/adityapratama",
    linkedin: "https://linkedin.com/in/adityapratama",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "std-02",
    name: "Siti Rahmawati",
    email: "siti@example.com",
    bio: "UI/UX Designer and Mobile Developer specializing in clean iOS/Android component systems and Figma prototyping.",
    entryYear: 2023, // Year 3 -> Kelas XII
    github: "https://github.com/sitirahma",
    linkedin: "https://linkedin.com/in/sitirahma",
    skills: ["Figma", "React Native", "Tailwind CSS", "UI/UX Design"],
  },
  {
    id: "std-03",
    name: "Fikri Ardiansyah",
    avatar: "",
    bio: "Backend Engineer with expertise in Node.js, Express, Drizzle ORM, and RESTful API architecture.",
    entryYear: 2025, // Year 1 -> Kelas X
    github: "https://github.com/fikriardiansyah",
    email: "fikri@example.com",
    skills: ["Node.js", "Express", "Drizzle ORM", "Docker", "PostgreSQL"],
  },
  {
    id: "std-04",
    name: "Bagas Setiawan",
    avatar: "",
    bio: "Alumni TeFa PPLG currently working as Junior Frontend Developer at a tech startup in Jakarta.",
    entryYear: 2022, // Alumni
    email: "bagas@example.com",
    linkedin: "https://linkedin.com/in/bagassetiawan",
    skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript"],
  },
];

export const mockProjects: ProjectMock[] = [
  {
    id: "portal-umkm",
    title: "E-Commerce & Inventory Management Portal",
    category: "Web Application",
    description: "Platform portal e-commerce dan manajemen stok barang terintegrasi untuk UMKM lokal.",
    longDescription: "Aplikasi ini mempermudah pelaku UMKM dalam mengelola katalog produk, mencatat inventaris barang secara real-time, dan menerima pesanan daring melalui antarmuka yang modern dan responsif.",
    liveUrl: "https://nextjs.org",
    repoUrl: "https://github.com/tefa-pplg/portal-umkm",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "PostgreSQL"],
    team: [
      { studentId: "std-01", studentName: "Aditya Pratama", role: "Frontend Lead" },
      { studentId: "std-03", studentName: "Fikri Ardiansyah", role: "Backend Developer" },
      { studentId: "std-02", studentName: "Siti Rahmawati", role: "UI/UX Designer" },
    ],
    createdAt: "2026-05-10",
  },
  {
    id: "smart-school",
    title: "Smart Presensi & Academic Mobile App",
    category: "Mobile Application",
    description: "Aplikasi mobile presensi berbasis lokasi dan portal informasi akademik siswa.",
    longDescription: "Solusi aplikasi mobile berbasis React Native dan Expo untuk mempermudah presensi siswa berbasis geofencing GPS, pengisian jurnal harian, dan notifikasi ke akun orang tua secara otomatis.",
    liveUrl: "https://reactnative.dev",
    repoUrl: "https://github.com/tefa-pplg/smart-school-mobile",
    techStack: ["React Native", "Expo", "Express API", "Tailwind CSS"],
    team: [
      { studentId: "std-02", studentName: "Siti Rahmawati", role: "Mobile Developer & UI Lead" },
      { studentId: "std-01", studentName: "Aditya Pratama", role: "API Integration" },
      { studentId: "std-03", studentName: "Fikri Ardiansyah", role: "Database Engineer" },
      { studentId: "std-04", studentName: "Bagas Setiawan", role: "QA Engineer" },
    ],
    createdAt: "2026-06-01",
  },
  {
    id: "clinic-saas",
    title: "Sistem Informasi Rekam Medis Klinis",
    category: "Web Application",
    description: "SaaS rekam medis dan antrean pasien klinik kesehatan berbasis web.",
    longDescription: "Aplikasi SaaS pengelolaan data pasien, rekam medis digital, resep obat, dan antrean otomatis klinik terpadu dengan standar keamanan tinggi dan aksesibilitas ramah pengguna.",
    liveUrl: "https://tailwind-merge.com",
    repoUrl: "https://github.com/tefa-pplg/clinic-saas",
    techStack: ["TypeScript", "Next.js 15", "Drizzle ORM", "shadcn/ui"],
    team: [
      { studentId: "std-01", studentName: "Aditya Pratama", role: "Full-Stack Developer" },
      { studentId: "std-03", studentName: "Fikri Ardiansyah", role: "Database Architect" },
    ],
    createdAt: "2026-04-15",
  },
  {
    id: "design-system-kit",
    title: "TeFa Nova Design System & UI Boilerplate",
    category: "Digital Products & Templates",
    description: "Koleksi komponen UI modern dan boilerplate Next.js siap pakai karya riset TeFa.",
    longDescription: "Digital product buatan studio TeFa yang memuat 40+ komponen UI terstandardisasi, panduan token warna, serta template landing page responsif berbasis Tailwind CSS v4.",
    liveUrl: "https://ui.shadcn.com",
    repoUrl: "https://github.com/tefa-pplg/nova-design-system",
    techStack: ["React", "Tailwind CSS v4", "shadcn/ui", "Figma Tokens"],
    team: [
      { studentId: "std-02", studentName: "Siti Rahmawati", role: "Design System Lead" },
      { studentId: "std-04", studentName: "Bagas Setiawan", role: "Component Developer" },
    ],
    createdAt: "2026-03-20",
  },
];
