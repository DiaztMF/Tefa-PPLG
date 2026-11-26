"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { mockProjects } from "@/lib/data/mock-data";
import { ProjectCard } from "@/components/showcase/project-card";

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
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
