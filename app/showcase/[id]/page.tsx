"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";
import { mockProjects } from "@/lib/data/mock-data";
import { getProjectPreviewImage } from "@/lib/utils/preview-image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Users, Code, Calendar, CheckCircle2, Monitor, Image as ImageIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"screenshot" | "iframe">("screenshot");

  const project = mockProjects.find((p) => p.id === resolvedParams.id) || mockProjects[0];
  const previewImage = getProjectPreviewImage(project.imageUrl, project.liveUrl);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar onOpenBriefModal={() => setIsBriefModalOpen(true)} />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Back Button */}
          <Link
            href="/showcase"
            className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Katalog Showcase
          </Link>

          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Rilis: {project.createdAt}
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl text-foreground tracking-tight leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Mac Browser Frame Preview Mockup */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg space-y-0">
            <div className="bg-muted px-4 py-3 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs font-mono text-muted-foreground ml-3 truncate max-w-xs sm:max-w-sm">
                  {project.liveUrl || `https://tefa.smkn2surakarta.sch.id/${project.id}`}
                </span>
              </div>

              {/* Mode Switcher & External Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {project.liveUrl && (
                  <div className="flex items-center bg-background rounded-lg border border-border p-0.5 text-xs mr-2">
                    <button
                      onClick={() => setPreviewMode("screenshot")}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
                        previewMode === "screenshot" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <ImageIcon className="w-3 h-3" /> Screenshot
                    </button>
                    <button
                      onClick={() => setPreviewMode("iframe")}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors ${
                        previewMode === "iframe" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Monitor className="w-3 h-3" /> Live iFrame
                    </button>
                  </div>
                )}

                {project.liveUrl && (
                  <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" /> Kunjungi Link Deployment
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Code className="w-3.5 h-3.5 mr-1" /> Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Preview Body */}
            <div className="h-[420px] sm:h-[500px] bg-slate-950 relative overflow-hidden flex items-center justify-center">
              {previewMode === "iframe" && project.liveUrl ? (
                <iframe
                  src={project.liveUrl}
                  title={`Live Preview ${project.title}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt={`Preview ${project.title}`}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-8 flex flex-col items-center justify-center text-white text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-bold text-2xl">
                    💻
                  </div>
                  <h2 className="font-heading text-2xl font-semibold">{project.title}</h2>
                  <p className="text-xs opacity-80 max-w-sm">
                    Tampilan antarmuka proyek software Teaching Factory SMKN 2 Surakarta.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Overview & Arsitektur Solusi
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Fitur Kunci & Keunggulan
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Performa Tinggi & Responsive</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Keamanan Data Terstandar</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>UI/UX Interaktif & Aksesibel</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Kode Terstruktur Clean Code</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Tech Stack */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                <h4 className="font-heading font-semibold text-base text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> Teknologi Digunakan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Student Dev Contributors */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                <h4 className="font-heading font-semibold text-base text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Siswa Pengembang ({project.team.length})
                </h4>
                <div className="space-y-3">
                  {project.team.map((member, mIdx) => (
                    <Link
                      key={mIdx}
                      href={`/students/${member.studentId}`}
                      className="p-3 rounded-lg bg-background border border-border flex items-center justify-between hover:border-primary/40 transition-colors group"
                    >
                      <div>
                        <div className="font-heading font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {member.studentName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.role}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Order Similar Project CTA */}
              <div className="p-6 rounded-xl bg-primary text-primary-foreground space-y-4 shadow-md">
                <h4 className="font-heading font-semibold text-lg">Tertarik Membuat Proyek Serupa?</h4>
                <p className="text-xs text-primary-foreground/90 leading-relaxed">
                  Konsultasikan kebutuhan software Anda bersama tim Teaching Factory PPLG SMKN 2 Surakarta.
                </p>
                <Button
                  onClick={() => setIsBriefModalOpen(true)}
                  className="w-full bg-white text-primary hover:bg-white/90 font-medium text-sm"
                >
                  Mulai Proyek Serupa
                </Button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
      <BriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />
    </div>
  );
}
