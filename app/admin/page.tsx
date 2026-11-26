import Link from "next/link";
import { getBriefs, getProjects, getStudents } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import {
  Briefcase,
  Users,
  MessageSquare,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [projects, students, briefs] = await Promise.all([
    getProjects(),
    getStudents(),
    getBriefs(),
  ]);
  const dbReady = isDatabaseConfigured();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Ringkasan Dashboard Admin
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Kelola portofolio karya siswa, direktori talenta, dan prospek pesanan proyek industri (lead briefs).
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            dbReady
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          {dbReady ? "PostgreSQL Terhubung" : "Mode Mock (DB belum diisi)"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Proyek Showcase</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-foreground">
            {projects.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Proyek industri terarsip
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Talenta Siswa</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-foreground">
            {students.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Otomatisasi kelas per 1 Juli aktif
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Inbound Brief</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-bold text-3xl text-foreground">
            {briefs.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Prospek pesanan proyek klien
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-lg bg-background border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-heading font-medium text-foreground">
                    {p.title}
                  </div>
                  <div className="text-muted-foreground">
                    {p.category} — {p.team.length} Siswa
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary text-primary font-medium text-[11px]">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>

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
            {briefs.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-lg bg-background border border-border space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-medium text-foreground">
                    {b.org !== "-" ? b.org : b.name}
                  </span>
                  <span className="text-muted-foreground">
                    Budget: {b.budget}
                  </span>
                </div>
                <p className="text-muted-foreground line-clamp-1">
                  {b.briefText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
