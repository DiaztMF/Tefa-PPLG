"use client";

import Link from "next/link";
import { ArrowRight, Users, ExternalLink } from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  studentCount: number;
  techStack: string[];
  imageBg: string;
}

const highlightProjects: ShowcaseProject[] = [
  {
    id: "portal-umkm",
    title: "E-Commerce & Inventory Management Portal",
    category: "Web Application",
    studentCount: 3,
    techStack: ["Next.js 15", "Tailwind CSS", "PostgreSQL"],
    imageBg: "from-blue-600 to-indigo-700",
  },
  {
    id: "smart-school",
    title: "Smart Presensi & Academic Mobile App",
    category: "Mobile Application",
    studentCount: 4,
    techStack: ["React Native", "Expo", "Express API"],
    imageBg: "from-slate-800 to-slate-950",
  },
  {
    id: "clinic-saas",
    title: "Sistem Informasi Rekam Medis Klinis",
    category: "Full-Stack SaaS",
    studentCount: 2,
    techStack: ["TypeScript", "Drizzle ORM", "shadcn/ui"],
    imageBg: "from-blue-500 to-cyan-600",
  },
];

export function ShowcaseHighlight() {
  return (
    <section id="showcase" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Portofolio Siswa
            </span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-foreground tracking-tight">
              Showcase Proyek Unggulan
            </h2>
            <p className="text-muted-foreground text-sm">
              Rekam jejak pengerjaan perangkat lunak industri buatan siswa TeFa PPLG.
            </p>
          </div>

          <Link
            href="/showcase"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
          >
            Lihat Semua Katalog Proyek
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-xl border border-border overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Mac Browser Frame Header */}
                <div className="bg-muted px-4 py-2.5 border-b border-border flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-muted-foreground ml-2 truncate">
                    https://tefa.smk/{project.id}
                  </span>
                </div>

                {/* Image Placeholder Frame */}
                <div className={`h-48 bg-gradient-to-br ${project.imageBg} p-6 flex items-center justify-center text-white text-center relative overflow-hidden`}>
                  <div className="text-sm font-heading font-semibold opacity-90">
                    {project.title}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Category Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    {/* Student Dev Tag */}
                    <span className="inline-flex items-center text-xs text-muted-foreground gap-1 bg-secondary px-2.5 py-1 rounded-full border border-border">
                      <Users className="w-3 h-3 text-primary" />
                      By {project.studentCount} Student Devs
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                <Link
                  href={`/showcase/${project.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1 pt-4"
                >
                  Lihat Detail Proyek
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge Banner to Full Showcase Catalogue */}
        <div className="p-8 rounded-2xl bg-secondary border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading font-semibold text-xl text-foreground">
              Ingin melihat puluhan proyek karya siswa lainnya?
            </h3>
            <p className="text-sm text-muted-foreground">
              Jelajahi seluruh direktori portofolio siswa TeFa PPLG dengan filter kategori dan pencarian tech stack.
            </p>
          </div>
          <Link
            href="/showcase"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3.5 text-sm font-medium rounded-lg shrink-0 transition-colors shadow-sm"
          >
            Buka Katalog Lengkap (/showcase)
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
