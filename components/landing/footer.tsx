"use client";

import Link from "next/link";
import { Code2, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm shadow-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground tracking-tight">
                TeFa PPLG <span className="text-primary">SMK</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Teaching Factory Pengembangan Perangkat Lunak & Gim. Platform showcase karya portofolio siswa dan pusat layanan jasa pembuatan perangkat lunak terpercaya.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-sm text-foreground">Navigasi Portal</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/showcase" className="hover:text-primary transition-colors">Katalog Showcase</Link></li>
              <li><Link href="/students" className="hover:text-primary transition-colors">Direktori Talenta Siswa</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Studio CMS</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-sm text-foreground">Kontak & Studio</h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Gedung Lab PPLG SMK Negeri — Studio Teaching Factory</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>tefa.pplg@smk.sch.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Teaching Factory PPLG SMK. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
