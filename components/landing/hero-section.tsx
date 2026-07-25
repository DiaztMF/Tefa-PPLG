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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col gap-8 items-center">
        
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
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
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full border-t border-border/60">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-semibold text-lg text-foreground">100% Guaranteed</div>
              <div className="text-xs text-muted-foreground">Standardized Quality</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-semibold text-lg text-foreground">Modern Tech Stack</div>
              <div className="text-xs text-muted-foreground">Next.js, React, Mobile</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
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
