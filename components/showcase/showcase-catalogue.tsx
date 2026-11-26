"use client";
 
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";
import type { ProjectItem } from "@/lib/db/queries";
import { ProjectCard } from "@/components/showcase/project-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowLeft } from "lucide-react";
 
interface ShowcaseCatalogueProps {
  projects: ProjectItem[];
}
 
export function ShowcaseCatalogue({ projects }: ShowcaseCatalogueProps) {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
 
  const categories = [
    "Semua",
    "Web Application",
    "Mobile Application",
    "UI/UX Design",
    "Digital Products & Templates",
  ];
 
  const allTechStack = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  );
 
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
 
    const matchesCategory =
      selectedCategory === "Semua" || project.category === selectedCategory;
 
    const matchesTech =
      !selectedTech || project.techStack.includes(selectedTech);
 
    return matchesSearch && matchesCategory && matchesTech;
  });
 
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar onOpenBriefModal={() => setIsBriefModalOpen(true)} />
 
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </Link>
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
                Katalog Portofolio & Showcase Karya Siswa
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl">
                Arsip lengkap proyek perangkat lunak industri buatan talenta siswa TeFa PPLG SMK Negeri 2 Surakarta dengan fitur preview otomatis.
              </p>
            </div>
          </div>
 
          <div className="p-6 rounded-xl bg-card border border-border space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari proyek atau teknologi..."
                  className="pl-9 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
 
              {selectedTech && (
                <div className="flex items-center gap-2 text-xs bg-secondary text-primary px-3 py-1.5 rounded-full border border-primary/20">
                  <span>
                    Filter Tech: <strong>{selectedTech}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedTech(null)}
                    className="hover:text-destructive font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
 
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
 
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mr-2">
                <Filter className="w-3 h-3" /> Tech Tag:
              </span>
              {allTechStack.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() =>
                    setSelectedTech(selectedTech === tech ? null : tech)
                  }
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
 
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground font-medium">
                Tidak ada proyek yang sesuai dengan kriteria pencarian.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
                  setSelectedTech(null);
                }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
 
      <Footer />
      <BriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />
    </div>
  );
}

