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
