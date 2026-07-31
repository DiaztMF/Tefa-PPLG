"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

interface NavbarProps {
  onOpenBriefModal: () => void;
}

export function Navbar({ onOpenBriefModal }: NavbarProps) {
  return (
    <header className="w-full h-[72px] bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo href="/" size={40} showText subtitle="SMK Showcase" priority />

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
            size="lg"
            onClick={onOpenBriefModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8  rounded-lg text-sm transition-all shadow-sm hover:shadow"
          >
            Mulai Proyek
          </Button>
        </div>
      </div>
    </header>
  );
}
