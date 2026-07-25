"use client";

import { MessageSquare, PhoneCall, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BriefItem {
  id: string;
  name: string;
  org: string;
  whatsapp: string;
  service: string;
  budget: string;
  briefText: string;
  createdAt: string;
  status: "Baru" | "Diskusi" | "Selesai";
}

const mockBriefs: BriefItem[] = [
  {
    id: "brief-01",
    name: "Budi Santoso",
    org: "PT Akses Karya Digital",
    whatsapp: "081234567890",
    service: "Web Development",
    budget: "5 - 15 Juta",
    briefText: "Pengembangan portal perusahaan responsif dengan integrasi CMS berita dan galeri produk.",
    createdAt: "2026-07-24",
    status: "Baru",
  },
  {
    id: "brief-02",
    name: "Dr. Lina Herlina",
    org: "Klinik Sehat Bersama",
    whatsapp: "081987654321",
    service: "Full-Stack SaaS",
    budget: "15 - 30 Juta",
    briefText: "Sistem rekam medis digital pasien klinik dan pendaftaran antrean online.",
    createdAt: "2026-07-22",
    status: "Diskusi",
  },
];

export default function AdminBriefsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Inbound Briefs & Lead Generation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Daftar formulir brief masuk dari calon klien/UMKM/DUDI yang tersimpan di database.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Daftar Inbound Brief ({mockBriefs.length})
        </h3>

        <div className="space-y-4">
          {mockBriefs.map((brief) => (
            <div
              key={brief.id}
              className="p-5 rounded-xl bg-background border border-border space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-sm text-foreground">
                    {brief.name}
                  </span>
                  <span className="text-muted-foreground">({brief.org})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {brief.createdAt}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-soft text-primary font-medium text-[11px]">
                    Status: {brief.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                <div><strong>Layanan:</strong> {brief.service}</div>
                <div><strong>Estimasi Budget:</strong> {brief.budget}</div>
                <div><strong>WhatsApp:</strong> {brief.whatsapp}</div>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border text-foreground leading-relaxed">
                <strong>Briefing:</strong> {brief.briefText}
              </div>

              <div className="pt-2 flex justify-end">
                <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                  <a
                    href={`https://wa.me/${brief.whatsapp.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(brief.name)},%20kami%20dari%20Tim%20TeFa%20PPLG...`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> Hubungi via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
