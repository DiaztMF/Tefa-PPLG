"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";
import { mockProjects, ProjectMock } from "@/lib/data/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users, ExternalLink, ArrowLeft } from "lucide-react";

export default function ShowcasePage() {
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

  // Extract all unique tech stack items
  const allTechStack = Array.from(
    new Set(mockProjects.flatMap((p) => p.techStack))
  );

  // Filter projects
  const filteredProjects = mockProjects.filter((project) => {
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
          
          {/* Back to Home Link & Header */}
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
                Arsip lengkap proyek perangkat lunak industri buatan talenta siswa TeFa PPLG SMK.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
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

              {/* Active Tech Tag Clearer */}
              {selectedTech && (
                <div className="flex items-center gap-2 text-xs bg-secondary text-primary px-3 py-1.5 rounded-full border border-primary/20">
                  <span>Filter Tech: <strong>{selectedTech}</strong></span>
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="hover:text-destructive font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
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

            {/* Tech Stack Chips Filter */}
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mr-2">
                <Filter className="w-3 h-3" /> Tech Tag:
              </span>
              {allTechStack.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
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

          {/* Projects Catalogue Grid */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground font-medium">Tidak ada proyek yang sesuai dengan kriteria pencarian.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); setSelectedTech(null); }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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

                    {/* Image Header Placeholder */}
                    <div className="h-44 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 flex items-center justify-center text-white text-center relative overflow-hidden">
                      <div className="text-sm font-heading font-semibold opacity-90">
                        {project.title}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
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
          )}

        </div>
      </main>

      <Footer />
      <BriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />
    </div>
  );
}
