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
