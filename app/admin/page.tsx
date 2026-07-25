"use client";

import Link from "next/link";
import { mockProjects, mockStudents } from "@/lib/data/mock-data";
import { Briefcase, Users, MessageSquare, ArrowUpRight, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Ringkasan Dashboard Admin
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kelola portofolio karya siswa, direktori talenta, dan prospek pesanan proyek industri (lead briefs).
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Proyek Showcase</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-foreground">
            {mockProjects.length}
          </div>
          <p className="text-xs text-muted-foreground">Proyek industri terarsip 100%</p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Talenta Siswa</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-foreground">
            {mockStudents.length}
          </div>
          <p className="text-xs text-muted-foreground">Otomatisasi kelas per 1 Juli aktif</p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Inbound Brief Bulan Ini</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-primary">
            8
          </div>
          <p className="text-xs text-muted-foreground">Target KPI 5-10 brief/bulan tercapai</p>
        </div>
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Projects Preview Table */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Proyek Baru Terdaftar
            </h3>
            <Button asChild size="sm" variant="outline" className="text-xs">
              <Link href="/admin/projects">
                Kelola Semua <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {mockProjects.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg bg-background border border-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-heading font-medium text-foreground">{p.title}</div>
                  <div className="text-muted-foreground">{p.category} — {p.team.length} Siswa</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-soft text-primary font-medium text-[11px]">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inbound Lead Briefs Preview */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Brief Prospek Terkini
            </h3>
            <Button asChild size="sm" variant="outline" className="text-xs">
              <Link href="/admin/briefs">
                Lihat Semua Brief <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg bg-background border border-border space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-medium text-foreground">PT Akses Karya Digital</span>
                <span className="text-muted-foreground">Budget: 5-15 Juta</span>
              </div>
              <p className="text-muted-foreground line-clamp-1">Kebutuhan landing page perusahaan dan integrasi portal berita...</p>
            </div>
            <div className="p-3.5 rounded-lg bg-background border border-border space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-medium text-foreground">Klinik Sehat Bersama</span>
                <span className="text-muted-foreground">Budget: 15-30 Juta</span>
              </div>
              <p className="text-muted-foreground line-clamp-1">Sistem informasi manajemen rekam medis pasien klinik...</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
