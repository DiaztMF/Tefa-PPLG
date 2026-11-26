"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";
import type { ProjectItem, StudentItem } from "@/lib/db/queries";
import { calculateStudentClass } from "@/lib/utils/student-class";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Share2,
  Briefcase,
  Code,
} from "lucide-react";

interface StudentProfileViewProps {
  student: StudentItem;
  studentProjects: ProjectItem[];
}

export function StudentProfileView({
  student,
  studentProjects,
}: StudentProfileViewProps) {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const classInfo = calculateStudentClass(student.entryYear);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Link
            href="/students"
            className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Direktori Siswa
          </Link>

          <div className="p-8 rounded-2xl bg-card border border-border space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-secondary overflow-hidden border-2 border-primary/20 flex items-center justify-center text-2xl font-bold font-heading text-primary shrink-0 relative">
                  {student.avatar ? (
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    student.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                      {student.name}
                    </h1>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                      {classInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tahun Masuk: {student.entryYear} — Angkatan {student.entryYear}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {student.github && (
                  <Button asChild size="sm" variant="outline">
                    <a href={student.github} target="_blank" rel="noreferrer">
                      <Globe className="w-4 h-4 mr-1.5" /> GitHub
                    </a>
                  </Button>
                )}
                {student.linkedin && (
                  <Button asChild size="sm" variant="outline">
                    <a href={student.linkedin} target="_blank" rel="noreferrer">
                      <Share2 className="w-4 h-4 mr-1.5" /> LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground">
                Bio / Ringkasan Profile
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {student.bio}
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" /> Keahlian & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-semibold text-2xl text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Rekam Jejak Proyek TeFa ({studentProjects.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Proyek industri yang pernah dikerjakan oleh siswa ini beserta peran spesifiknya.
              </p>
            </div>

            {studentProjects.length === 0 ? (
              <div className="p-8 text-center bg-card rounded-xl border border-border text-sm text-muted-foreground">
                Siswa ini belum memiliki proyek terdaftar.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {studentProjects.map((proj) => {
                  const roleInProject =
                    proj.team.find((t) => t.studentId === student.id)?.role ||
                    "Contributor";
                  return (
                    <div
                      key={proj.id}
                      className="p-6 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {proj.category}
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-foreground border border-border">
                            Role: {roleInProject}
                          </span>
                        </div>

                        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-xl">
                          {proj.description}
                        </p>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="shrink-0"
                      >
                        <Link href={`/showcase/${proj.id}`}>
                          Lihat Detail Proyek{" "}
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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