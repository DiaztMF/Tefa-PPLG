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
    avatar: "",
    name: "Aditya Pratama",
    bio: "Full-Stack Developer passionate about Next.js, TypeScript, and high-performance serverless web apps.",
    email: "aditya@example.com",
    entryYear: 2024,
    github: "https://github.com/adityapratama",
    linkedin: "https://linkedin.com/in/adityapratama",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "std-02",
    avatar: "",
    name: "Siti Rahmawati",
    email: "siti@example.com",
    bio: "UI/UX Designer and Mobile Developer specializing in clean iOS/Android component systems and Figma prototyping.",
    entryYear: 2023,
    github: "https://github.com/sitirahma",
    linkedin: "https://linkedin.com/in/sitirahma",
    skills: ["Figma", "React Native", "Tailwind CSS", "UI/UX Design"],
  },
  {
    id: "std-03",
    avatar: "",
    name: "Fikri Ardiansyah",
    bio: "Backend Engineer with expertise in Node.js, Express, Drizzle ORM, and RESTful API architecture.",
    email: "fikri@example.com",
    entryYear: 2025,
    github: "https://github.com/fikriardiansyah",
    linkedin: "https://linkedin.com/in/fikriardiansyah",
    skills: ["Node.js", "Express", "Drizzle ORM", "Docker", "PostgreSQL"],
  },
  {
    id: "std-04",
    avatar: "",
    name: "Bagas Setiawan",
    bio: "Alumni TeFa PPLG currently working as Junior Frontend Developer at a tech startup in Jakarta.",
    email: "bagas@example.com",
    entryYear: 2022,
    github: "https://github.com/bagassetiawan",
    linkedin: "https://linkedin.com/in/bagassetiawan",
    skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript"],
  },
];

export const mockProjects: ProjectMock[] = [
  {
    id: "proj-01",
    title: "Sistem Antrean Rumah Sakit",
    category: "Web Application",
    description: "Aplikasi manajemen antrean pasien untuk Rumah Sakit Umum Daerah.",
    longDescription:
      "Sistem antrean digital yang memungkinkan pasien mengambil nomor antrean secara online, melihat status antrean secara real-time, dan mendapatkan notifikasi saat giliran hampir tiba. Sistem ini juga mencakup dashboard untuk petugas bal dan dokter untuk mengelola daftar pasien.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    liveUrl: "https://antrean-rs.tefa-pplg.id",
    repoUrl: "https://github.com/tefa-pplg/sistem-antrean-rs",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    team: [
      {
        studentId: "std-01",
        studentName: "Aditya Pratama",
        role: "Frontend Lead",
      },
      {
        studentId: "std-02",
        studentName: "Siti Rahmawati",
        role: "UI/UX Designer",
      },
    ],
    createdAt: "2025-01-15",
  },
  {
    id: "proj-02",
    title: "Aplikasi E-Commerce UMKM",
    category: "Web Application",
    description: "Platform e-commerce untuk UMKM lokal dengan fitur katalog produk, keranjang belanja, dan pembayaran.",
    longDescription:
      "Platform e-commerce yang dirancang khusus untuk UMKM. Memungkinkan pemilik UMKM untuk mengunggah produk, mengelola stok, memproses pesanan, dan berkomunikasi dengan pelanggan. Dilengkapi dengan fitur pembayaran melalui transfer bank dan e-wallet.",
    coverImage: "https://images.unsplash.com/photo-1556742044-3c72d6b75685?w=800",
    liveUrl: "https://ecommerce-umkm.tefa-pplg.id",
    repoUrl: "https://github.com/tefa-pplg/ecommerce-umkm",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    team: [
      {
        studentId: "std-01",
        studentName: "Aditya Pratama",
        role: "Backend Developer",
      },
      {
        studentId: "std-03",
        studentName: "Fikri Ardiansyah",
        role: "Database Administrator",
      },
    ],
    createdAt: "2025-02-20",
  },
  {
    id: "proj-03",
    title: "Aplikasi Manajemen Inventori Toko",
    category: "Mobile Application",
    description: "Aplikasi mobile untuk pengelolaan inventori toko kecil dengan fitur scan barcode dan laporan stok.",
    longDescription:
      "Aplikasi mobile yang membantu pemilik toko kecil mengelola inventori barang. Fitur utama meliputi scan barcode untuk menambahkan barang, tracking stok masuk dan keluar, serta generate laporan harian dan bulanan.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    liveUrl: "https://inventori-toko.tefa-pplg.id",
    repoUrl: "https://github.com/tefa-pplg/inventori-toko",
    techStack: ["React Native", "Firebase", "TypeScript"],
    team: [
      {
        studentId: "std-02",
        studentName: "Siti Rahmawati",
        role: "Mobile Developer",
      },
      {
        studentId: "std-03",
        studentName: "Fikri Ardiansyah",
        role: "Database Administrator",
      },
    ],
    createdAt: "2025-03-10",
  },
  {
    id: "proj-04",
    title: "Template Website Portofolio",
    category: "Digital Products & Templates",
    description: "Template website portofolio modern dan responsif untuk freelancer dan profesional kreatif.",
    longDescription:
      "Template website portofolio yang siap pakai untuk freelancer dan profesional kreatif. Dilengkapi dengan halaman tentang, galeri karya, testimoni, dan kontak. Dibangun dengan Next.js dan Tailwind CSS.",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab77b7072e?w=800",
    liveUrl: "https://template-portfolio.tefa-pplg.id",
    repoUrl: "https://github.com/tefa-pplg/template-portfolio",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    team: [
      {
        studentId: "std-04",
        studentName: "Bagas Setiawan",
        role: "Frontend Developer",
      },
    ],
    createdAt: "2025-04-05",
  },
];
