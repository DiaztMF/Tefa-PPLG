"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Logo href="/" size={36} showText subtitle="SMKN 2 Surakarta" />
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Teaching Factory Pengembangan Perangkat Lunak & Gim SMK Negeri 2 Surakarta. Platform showcase karya portofolio siswa dan pusat layanan jasa pembuatan perangkat lunak terpercaya.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-sm text-foreground">Navigasi Portal</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/showcase" className="hover:text-primary transition-colors">Katalog Showcase</Link></li>
              <li><Link href="/students" className="hover:text-primary transition-colors">Direktori Talenta Siswa</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">Berita & Rilis</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Studio CMS</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-semibold text-sm text-foreground">Kontak & Studio</h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Gedung Lab PPLG SMK Negeri 2 Surakarta — Studio Teaching Factory</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>tefa.pplg@smkn2surakarta.sch.id</span>
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
            © {new Date().getFullYear()} Teaching Factory PPLG SMK Negeri 2 Surakarta. Hak Cipta Dilindungi Undang-Undang.
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
