"use client";

import { useEffect, useState } from "react";
import type { BriefItem } from "@/lib/db/queries";
import { PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["Baru", "Diskusi", "Selesai"];

export default function AdminBriefsPage() {
  const [briefList, setBriefList] = useState<BriefItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/brief")
      .then((r) => r.json())
      .then((data) => setBriefList(data.briefs || []))
      .catch(() => setErrorMsg("Gagal memuat inbound brief."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const previous = briefList.find((item) => item.id === id)?.status;
    setErrorMsg("");
    setUpdatingId(id);
    setBriefList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    try {
      const res = await fetch("/api/brief", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("failed");
    } catch {
      if (previous) {
        setBriefList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: previous } : item))
        );
      }
      setErrorMsg("Gagal memperbarui status brief.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Manajemen Inbound Briefs &amp; Lead Generation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Daftar formulir brief masuk dari calon klien/UMKM/DUDI yang tersimpan di database.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
          {errorMsg}
        </div>
      )}

      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Daftar Inbound Brief ({briefList.length})
        </h3>

        {isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Memuat inbound brief...
          </div>
        ) : briefList.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Belum ada brief masuk dari calon klien.
          </div>
        ) : (
          <div className="space-y-4">
            {briefList.map((brief) => (
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
                    <Select
                      value={brief.status}
                      disabled={updatingId === brief.id}
                      onValueChange={(val) => handleStatusChange(brief.id, val)}
                    >
                      <SelectTrigger
                        className="h-7 w-28 text-xs"
                        aria-label={`Status brief ${brief.name}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <strong>Layanan:</strong> {brief.service}
                  </div>
                  <div>
                    <strong>Estimasi Budget:</strong> {brief.budget}
                  </div>
                  <div>
                    <strong>WhatsApp:</strong> {brief.whatsapp}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-card border border-border text-foreground leading-relaxed">
                  <strong>Briefing:</strong> {brief.briefText}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    asChild
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                  >
                    <a
                      href={`https://wa.me/${brief.whatsapp.replace(/^0/, "62")}?text=Halo%20${encodeURIComponent(brief.name)},%20kami%20dari%20Tim%20TeFa%20PPLG...`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> Hubungi via
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
