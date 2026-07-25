# TeFa Portal Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modular, high-end, anti-slop Landing Page for TeFa PPLG matching `docs/design.md` and `docs/prd.md` specifications and user requirements.

**Architecture:** Create modular components in `components/landing/` (`BriefModal`, `Navbar`, `HeroSection`, `BentoServices`, `ShowcaseHighlight`, `Footer`), assemble in `app/page.tsx`, and verify TypeScript compilation.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide React icons, shadcn/ui components.

## Global Constraints

* Light Mode Only: Strictly consume `--primary` (#136AD5), `--background` (#FAFAFA), `--card` (#FFFFFF), and `--border` (#E2E8F0).
* Headings: Geist font (`font-heading`), Body: Inter font (`font-sans`).
* CTA Labels: "Mulai Proyek" for primary brief actions, "Jelajahi Showcase" for portfolio exploration.
* Services Bento Grid: Web Development, Mobile Apps, UI/UX Design, and Digital Products & Templates.
* Showcase Cards: Mac Browser frame header, Category label above Geist heading, Student Dev tag ("By 3 Student Devs"), "Lihat Detail Proyek ➔" link, and bottom catalogue bridge banner to `/showcase`.

---

### Task 1: Build `BriefModal` Component

**Files:**
- Create: `components/landing/brief-modal.tsx`

**Interfaces:**
- Consumes: Dialog from `@/components/ui/dialog` or custom Radix modal state
- Produces: `BriefModal` component with Form Brief fields (Nama, Instansi/WA, Jenis Layanan, Budget, Brief) and Dual-Action submit flow.

- [ ] **Step 1: Create `components/landing/brief-modal.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2 } from "lucide-react";

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BriefModal({ isOpen, onClose }: BriefModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    whatsapp: "",
    service: "Web Development",
    budget: "< 5 Juta",
    brief: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate saving to DB, then format WhatsApp message redirect
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const message = `Halo Admin TeFa PPLG,%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(formData.name)}%0A- *Instansi/Perusahaan:* ${encodeURIComponent(formData.org || "-")}%0A- *No. WA:* ${encodeURIComponent(formData.whatsapp)}%0A- *Layanan:* ${encodeURIComponent(formData.service)}%0A- *Estimasi Budget:* ${encodeURIComponent(formData.budget)}%0A- *Brief Briefing:* ${encodeURIComponent(formData.brief)}`;
      
      const waUrl = `https://wa.me/6281234567890?text=${message}`;
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] bg-card border-border p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground font-semibold">
            Mulai Proyek Bersama TeFa PPLG
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Isi formulir brief di bawah ini. Tim TeFa akan segera menghubungi Anda untuk diskusi teknis.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h3 className="font-heading text-xl font-semibold">Brief Berhasil Dikirim!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Terima kasih! Anda juga telah diarahkan ke WhatsApp Admin TeFa untuk komunikasi langsung.
            </p>
            <Button onClick={() => { setSubmitted(false); onClose(); }} className="bg-primary text-primary-foreground mt-4">
              Tutup Modal
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">Nama Lengkap *</Label>
                <Input
                  id="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-xs font-medium">No. WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  required
                  placeholder="081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="org" className="text-xs font-medium">Nama Instansi / UMKM / Perusahaan</Label>
              <Input
                id="org"
                placeholder="Contoh: Toko Kopi Sejahtera"
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Kategori Layanan</Label>
                <Select value={formData.service} onValueChange={(val) => setFormData({ ...formData, service: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Applications">Mobile Applications</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Digital Products & Templates">Digital Products & Templates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Estimasi Budget</Label>
                <Select value={formData.budget} onValueChange={(val) => setFormData({ ...formData, budget: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 5 Juta">&lt; Rp 5 Juta</SelectItem>
                    <SelectItem value="5 - 15 Juta">Rp 5 - 15 Juta</SelectItem>
                    <SelectItem value="15 - 30 Juta">Rp 15 - 30 Juta</SelectItem>
                    <SelectItem value="> 30 Juta">&gt; Rp 30 Juta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief" className="text-xs font-medium">Ringkasan Kebutuhan Proyek *</Label>
              <Textarea
                id="brief"
                required
                rows={3}
                placeholder="Jelaskan secara singkat fitur utama atau gambaran proyek yang ingin dibuat..."
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Memproses..." : <>Kirim & Buka WA <Send className="w-4 h-4 ml-1.5" /></>}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Check TypeScript compliance**

Run `npx tsc --noEmit`.

---

### Task 2: Build `Navbar` Component

**Files:**
- Create: `components/landing/navbar.tsx`

**Interfaces:**
- Consumes: `onOpenBriefModal` callback
- Produces: Top navigation bar with "Mulai Proyek" CTA.

- [ ] **Step 1: Create `components/landing/navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenBriefModal: () => void;
}

export function Navbar({ onOpenBriefModal }: NavbarProps) {
  return (
    <header className="w-full h-[72px] bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base leading-none text-foreground tracking-tight">
              TeFa PPLG
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight tracking-wider uppercase">
              SMK Showcase
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#beranda" className="hover:text-primary transition-colors">
            Beranda
          </Link>
          <Link href="#layanan" className="hover:text-primary transition-colors">
            Layanan
          </Link>
          <Link href="#showcase" className="hover:text-primary transition-colors">
            Showcase Proyek
          </Link>
          <Link href="#siswa" className="hover:text-primary transition-colors">
            Direktori Siswa
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenBriefModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-5 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow"
          >
            Mulai Proyek
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

---

### Task 3: Build `HeroSection` Component

**Files:**
- Create: `components/landing/hero-section.tsx`

**Interfaces:**
- Consumes: `onOpenBriefModal` callback
- Produces: Hero section with subtle grid background, Geist heading, Inter subtext, and dual CTAs ("Mulai Proyek" & "Jelajahi Showcase").

- [ ] **Step 1: Create `components/landing/hero-section.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Code, Users } from "lucide-react";

interface HeroSectionProps {
  onOpenBriefModal: () => void;
}

export function HeroSection({ onOpenBriefModal }: HeroSectionProps) {
  return (
    <section id="beranda" className="relative min-h-[calc(100vh-72px)] flex items-center justify-center bg-subtle-grid py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-primary/20 text-primary text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Teaching Factory PPLG SMK — Production Studio</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.1]">
          Solusi Perangkat Lunak Industri Karya <span className="text-primary">Talenta Muda PPLG</span>
        </h1>

        {/* Lead Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Platform showcase portofolio dan pemesanan jasa pengembangan software resmi. Dikerjakan oleh siswa berbakat dalam pengawasan profesional instruktur industri.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            onClick={onOpenBriefModal}
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Mulai Proyek
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-border text-foreground hover:bg-secondary px-8 py-6 text-base font-medium rounded-lg"
          >
            <Link href="#showcase">
              Jelajahi Showcase
            </Link>
          </Button>
        </div>

        {/* Trust Metric Badges */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-border/60">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-semibold text-lg text-foreground">100% Guaranteed</div>
              <div className="text-xs text-muted-foreground">Standardized Quality</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Code className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-semibold text-lg text-foreground">Modern Tech Stack</div>
              <div className="text-xs text-muted-foreground">Next.js, React, Mobile</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-semibold text-lg text-foreground">PBL Studio</div>
              <div className="text-xs text-muted-foreground">Mentored by Industry Lead</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
```

---

### Task 4: Build `BentoServices` Component

**Files:**
- Create: `components/landing/bento-services.tsx`

**Interfaces:**
- Consumes: None
- Produces: 4 Bento Grid Tiles (Web Development, Mobile Apps, UI/UX Design, Digital Products & Templates).

- [ ] **Step 1: Create `components/landing/bento-services.tsx`**

```tsx
"use client";

import { Globe, Smartphone, Palette, Package } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Pembuatan landing page, portal perusahaan, dan aplikasi web kompleks berbasis Next.js & React dengan performa tinggi.",
    tag: "Full-Stack Web",
    colSpan: "sm:col-span-2 lg:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Pengembangan aplikasi iOS & Android modern responsif dengan performa native dan UI bersih.",
    tag: "iOS & Android",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Perancangan antarmuka pengguna interaktif, design system, dan prototipe aplikasi kelas dunia di Figma.",
    tag: "Design System",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    icon: Package,
    title: "Digital Products & Templates",
    desc: "Koleksi komponen UI, boilerplate Next.js, dan template siap pakai hasil inovasi tim riset siswa TeFa.",
    tag: "Ready Assets",
    colSpan: "sm:col-span-2 lg:col-span-2",
  },
];

export function BentoServices() {
  return (
    <section id="layanan" className="py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-foreground tracking-tight">
            Layanan Unggulan Studio TeFa
          </h2>
          <p className="text-muted-foreground text-base">
            Kami menghadirkan berbagai produk digital berkualitas tinggi untuk membantu akselerasi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className={`${svc.colSpan} p-8 rounded-xl bg-background border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/40 flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 5: Build `ShowcaseHighlight` Component

**Files:**
- Create: `components/landing/showcase-highlight.tsx`

**Interfaces:**
- Consumes: Showcase item array
- Produces: Showcase cards with Mac browser frames, Category labels, Geist titles, Student dev indicators ("By 3 Student Devs"), "Lihat Detail Proyek ➔" links, and bottom bridge banner to `/showcase`.

- [ ] **Step 1: Create `components/landing/showcase-highlight.tsx`**

```tsx
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
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 text-sm font-medium shrink-0">
            <Link href="/showcase">
              Buka Katalog Lengkap (/showcase)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
```

---

### Task 6: Build `Footer` Component

**Files:**
- Create: `components/landing/footer.tsx`

**Interfaces:**
- Consumes: None
- Produces: Clean footer section.

- [ ] **Step 1: Create `components/landing/footer.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border py-12 text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-base shadow-sm">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-semibold text-foreground text-base">
                TeFa PPLG SMK
              </div>
              <div className="text-xs text-muted-foreground">
                Teaching Factory Software Development & Showcase Portal
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="#beranda" className="hover:text-primary transition-colors">Beranda</Link>
            <Link href="#layanan" className="hover:text-primary transition-colors">Layanan</Link>
            <Link href="#showcase" className="hover:text-primary transition-colors">Showcase</Link>
            <Link href="/students" className="hover:text-primary transition-colors">Direktori Siswa</Link>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} TeFa PPLG SMK. All rights reserved.</p>
          <p>Built with Next.js 15, Tailwind CSS v4 & Geist Font.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 7: Assemble Landing Page in `app/page.tsx` & Verify Build

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: All components built in Tasks 1-6
- Produces: Assembled interactive landing page.

- [ ] **Step 1: Update `app/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoServices } from "@/components/landing/bento-services";
import { ShowcaseHighlight } from "@/components/landing/showcase-highlight";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";

export default function Home() {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar onOpenBriefModal={() => setIsBriefModalOpen(true)} />
      <main className="flex-1">
        <HeroSection onOpenBriefModal={() => setIsBriefModalOpen(true)} />
        <BentoServices />
        <ShowcaseHighlight />
      </main>
      <Footer />
      <BriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />
    </div>
  );
}
```

- [ ] **Step 2: Run TypeScript build check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.
