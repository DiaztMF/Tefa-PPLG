"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";
import { mockStudents } from "@/lib/data/mock-data";
import { calculateStudentClass } from "@/lib/utils/student-class";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, ArrowLeft, ExternalLink, GraduationCap, Globe, Share2 } from "lucide-react";

export default function StudentsDirectoryPage() {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("Semua");

  const classFilters = ["Semua", "Kelas X", "Kelas XI", "Kelas XII", "Alumni"];

  const filteredStudents = mockStudents.filter((std) => {
    const classInfo = calculateStudentClass(std.entryYear);
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass =
      selectedClass === "Semua" ||
      (selectedClass === "Kelas X" && classInfo.level === "X") ||
      (selectedClass === "Kelas XI" && classInfo.level === "XI") ||
      (selectedClass === "Kelas XII" && classInfo.level === "XII") ||
      (selectedClass === "Alumni" && classInfo.isAlumni);

    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar onOpenBriefModal={() => setIsBriefModalOpen(true)} />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
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
                Direktori Talenta Siswa & Alumni TeFa PPLG
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl">
                Rekam jejak, portofolio, dan spesialisasi keahlian siswa PPLG SMK yang ter-update otomatis berbasis angkatan.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari nama siswa atau keahlian (skills)..."
                  className="pl-9 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Class Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
                {classFilters.map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setSelectedClass(flt)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedClass === flt
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {flt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Students Grid */}
          {filteredStudents.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground font-medium">Tidak ada data siswa yang sesuai filter.</p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedClass("Semua"); }}>
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStudents.map((student) => {
                const classInfo = calculateStudentClass(student.entryYear);
                return (
                  <div
                    key={student.id}
                    className="bg-card rounded-xl border border-border p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group space-y-5"
                  >
                    <div className="space-y-4">
                      {/* Avatar & Class Badge */}
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden border border-border flex items-center justify-center font-heading font-bold text-lg text-primary">
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                            classInfo.isAlumni
                              ? "bg-secondary text-muted-foreground border-border"
                              : "bg-primary-soft text-primary border-primary-border"
                          }`}
                        >
                          {classInfo.label}
                        </span>
                      </div>

                      {/* Name & Bio */}
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {student.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {student.bio}
                        </p>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {student.skills.slice(0, 3).map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                          >
                            {sk}
                          </span>
                        ))}
                        {student.skills.length > 3 && (
                          <span className="text-[11px] text-muted-foreground">
                            +{student.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                      <Link
                        href={`/students/${student.id}`}
                        className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
                      >
                        Lihat Profil Digital
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </Link>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        {student.github && <Globe className="w-3.5 h-3.5 hover:text-foreground" />}
                        {student.linkedin && <Share2 className="w-3.5 h-3.5 hover:text-foreground" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <BriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />
    </div>
  );
}
