"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BriefModal({ isOpen, onClose }: BriefModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    whatsapp: "",
    service: "Web Development",
    budget: "5 - 15 Juta",
    brief: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.waRedirectUrl) {
        setIsSubmitted(true);
        // Dual Action: redirect to WhatsApp
        setTimeout(() => {
          window.open(data.waRedirectUrl, "_blank");
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      org: "",
      whatsapp: "",
      service: "Web Development",
      budget: "5 - 15 Juta",
      brief: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-xl p-6 sm:p-8 bg-card border border-border">
        <DialogHeader className="flex flex-col gap-2 text-left">
          <DialogTitle className="font-heading font-bold text-2xl text-foreground">
            Formulir Brief & Konsultasi Proyek
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Kirimkan rincian kebutuhan perangkat lunak Anda. Tim TeFa PPLG akan segera menghubungi untuk diskusi teknis & penawaran.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 flex flex-col gap-4 text-center items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading font-semibold text-xl text-foreground">Brief Berhasil Terkirim!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Sistem kami sedang mengalihkan Anda ke WhatsApp Web/App untuk tersambung ke instruktur TeFa...
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="mt-2">
              Tutup Modal
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs font-medium text-foreground">
                  Nama Lengkap *
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="org" className="text-xs font-medium text-foreground">
                  Instansi / Perusahaan
                </Label>
                <Input
                  id="org"
                  placeholder="Contoh: PT Karya Digital"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="whatsapp" className="text-xs font-medium text-foreground">
                  No. WhatsApp Aktif *
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="service" className="text-xs font-medium text-foreground">
                  Jenis Layanan *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(val) => setFormData({ ...formData, service: val })}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Pilih Layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Application Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile App Development</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design & Prototyping</SelectItem>
                    <SelectItem value="Digital Products">Digital Products & Templates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="budget" className="text-xs font-medium text-foreground">
                Estimasi Anggaran (Budget)
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(val) => setFormData({ ...formData, budget: val })}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Pilih Kisaran Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 5 Juta">&lt; 5 Juta (Mini Project / Template)</SelectItem>
                  <SelectItem value="5 - 15 Juta">5 - 15 Juta (Standard SaaS/Web)</SelectItem>
                  <SelectItem value="15 - 30 Juta">15 - 30 Juta (Complex Web/Mobile App)</SelectItem>
                  <SelectItem value="> 30 Juta">&gt; 30 Juta (Enterprise Solution)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="brief" className="text-xs font-medium text-foreground">
                Deskripsi Briefing Proyek *
              </Label>
              <Textarea
                id="brief"
                required
                rows={3}
                placeholder="Jelaskan kebutuhan fitur utama, tujuan aplikasi, atau referensi desain..."
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Batal
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground" disabled={isLoading}>
                {isLoading ? "Mengirim..." : "Kirim Brief & Chat WA"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
