"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2 } from "lucide-react";

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BriefModal({ isOpen, onClose }: BriefModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    whatsapp: "",
    service: "Web Development",
    budget: "< 5 Juta",
    brief: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const message = `Halo Admin TeFa PPLG,%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(formData.name)}%0A- *Instansi/Perusahaan:* ${encodeURIComponent(formData.org || "-")}%0A- *No. WA:* ${encodeURIComponent(formData.whatsapp)}%0A- *Layanan:* ${encodeURIComponent(formData.service)}%0A- *Estimasi Budget:* ${encodeURIComponent(formData.budget)}%0A- *Briefing Proyek:* ${encodeURIComponent(formData.brief)}`;
      
      const waUrl = `https://wa.me/6281234567890?text=${message}`;
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] bg-card border-border p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground font-semibold">
            Mulai Proyek Bersama TeFa PPLG
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Isi formulir brief di bawah ini. Tim TeFa akan segera menghubungi Anda untuk diskusi teknis.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h3 className="font-heading text-xl font-semibold">Brief Berhasil Dikirim!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Terima kasih! Anda juga telah diarahkan ke WhatsApp Admin TeFa untuk komunikasi langsung.
            </p>
            <Button onClick={() => { setSubmitted(false); onClose(); }} className="bg-primary text-primary-foreground mt-4">
              Tutup Modal
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">Nama Lengkap *</Label>
                <Input
                  id="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-xs font-medium">No. WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  required
                  placeholder="081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="org" className="text-xs font-medium">Nama Instansi / UMKM / Perusahaan</Label>
              <Input
                id="org"
                placeholder="Contoh: Toko Kopi Sejahtera"
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Kategori Layanan</Label>
                <Select value={formData.service} onValueChange={(val) => setFormData({ ...formData, service: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Applications">Mobile Applications</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Digital Products & Templates">Digital Products & Templates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Estimasi Budget</Label>
                <Select value={formData.budget} onValueChange={(val) => setFormData({ ...formData, budget: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 5 Juta">&lt; Rp 5 Juta</SelectItem>
                    <SelectItem value="5 - 15 Juta">Rp 5 - 15 Juta</SelectItem>
                    <SelectItem value="15 - 30 Juta">Rp 15 - 30 Juta</SelectItem>
                    <SelectItem value="> 30 Juta">&gt; Rp 30 Juta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief" className="text-xs font-medium">Ringkasan Kebutuhan Proyek *</Label>
              <Textarea
                id="brief"
                required
                rows={3}
                placeholder="Jelaskan secara singkat fitur utama atau gambaran proyek yang ingin dibuat..."
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Memproses..." : <>Kirim & Buka WA <Send className="w-4 h-4 ml-1.5" /></>}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
