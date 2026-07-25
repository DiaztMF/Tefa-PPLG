"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Code2, Users, Eye } from "lucide-react";
import { mockProjects } from "@/lib/data/mock-data";
import { getProjectPreviewImage } from "@/lib/utils/preview-image";

export function ShowcaseHighlight() {
  const featuredProjects = mockProjects.slice(0, 3);

  return (
    <section id="showcase" className="py-24 bg-secondary/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Portofolio & Showcase Terkini
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
              Karya Inovasi Siswa TeFa PPLG
            </h2>
            <p className="text-muted-foreground text-base">
              Setiap proyek dikembangkan menggunakan alur standar industri software house nyata dengan fitur preview otomatis.
            </p>
          </div>

          <Button asChild variant="outline" className="hidden md:inline-flex shrink-0">
            <Link href="/showcase">
              Lihat Katalog Lengkap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => {
            const previewImage = getProjectPreviewImage(project.imageUrl, project.liveUrl);

            return (
              <div
                key={project.id}
                className="bg-card rounded-xl border border-border overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Mac Browser Frame Header */}
                  <div className="bg-muted px-4 py-2.5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
                      <div className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
                      <span className="text-[11px] font-mono text-muted-foreground ml-2 truncate">
                        {project.liveUrl || `https://tefa.smkn2surakarta.sch.id/${project.id}`}
                      </span>
                    </div>
                    {project.liveUrl && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium shrink-0 ml-2">
                        Live Preview
                      </span>
                    )}
                  </div>

                  {/* Screenshot / Deployment Preview Area */}
                  <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    {previewImage ? (
                      /* Auto Live Screenshot or Custom Upload */
                      <img
                        src={previewImage}
                        alt={`Preview ${project.title}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      /* Fallback Gradient Card */
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 p-6 flex flex-col items-center justify-center text-white text-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center font-bold">
                          💻
                        </div>
                        <div className="font-heading font-semibold text-sm opacity-90 line-clamp-1">
                          {project.title}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center text-xs text-muted-foreground gap-1 bg-secondary px-2.5 py-1 rounded-full border border-border">
                        <Users className="w-3 h-3 text-primary" />
                        By {project.team.length} Student Devs
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

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

                {/* Direct Action Link */}
                <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                  <Link
                    href={`/showcase/${project.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1 pt-4"
                  >
                    Lihat Detail Proyek
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-blue-700 text-primary-foreground flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl">
              Tertarik Melihat Lebih Banyak Karya Siswa Kami?
            </h3>
            <p className="text-primary-foreground/90 text-sm sm:text-base max-w-xl">
              Jelajahi seluruh koleksi aplikasi web, aplikasi mobile, serta produk & templat digital di katalog lengkap.
            </p>
          </div>

          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-medium text-base shrink-0 shadow-md">
            <Link href="/showcase">
              Buka Katalog Showcase
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
