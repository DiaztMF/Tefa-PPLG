"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react"

interface BriefModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BriefModal({ isOpen, onClose }: BriefModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    whatsapp: "",
    service: "Web Development",
    budget: "5 - 15 Juta",
    brief: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [waRedirectUrl, setWaRedirectUrl] = useState("")
  const [trackingUrl, setTrackingUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success || !data.waRedirectUrl) {
        setErrorMessage(
          data.error ||
            "Gagal mengirim brief. Silakan periksa kembali isian Anda."
        )
        return
      }

      setWaRedirectUrl(data.waRedirectUrl)
      setTrackingUrl(data.trackingUrl || "")
      setIsSubmitted(true)
      window.open(data.waRedirectUrl, "_blank", "noopener,noreferrer")
    } catch {
      setErrorMessage(
        "Terjadi kesalahan koneksi saat mengirim brief. Silakan coba lagi."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setWaRedirectUrl("")
    setTrackingUrl("")
    setErrorMessage("")
    setFormData({
      name: "",
      org: "",
      whatsapp: "",
      service: "Web Development",
      budget: "5 - 15 Juta",
      brief: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="border border-border bg-card p-6 sm:max-w-xl sm:p-8">
        <DialogHeader className="flex flex-col gap-2 text-left">
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            Formulir Brief & Konsultasi Proyek
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Kirimkan rincian kebutuhan perangkat lunak Anda. Tim TeFa PPLG akan
            segera menghubungi untuk diskusi teknis & penawaran.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                Brief Berhasil Terkirim!
              </h3>
              <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                Jika jendela WhatsApp tidak terbuka otomatis, klik tombol di
                bawah untuk tersambung ke instruktur TeFa.
              </p>
            </div>
            {trackingUrl && (
              <p className="text-xs text-muted-foreground">
                Lacak status brief di{" "}
                <Link href={trackingUrl} className="text-primary underline">
                  halaman tracking
                </Link>
                . Simpan tautan ini.
              </p>
            )}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              {waRedirectUrl && (
                <Button
                  asChild
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <a href={waRedirectUrl} target="_blank" rel="noreferrer">
                    Buka WhatsApp Sekarang
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button onClick={handleReset} variant="outline">
                Tutup Modal
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-medium text-foreground"
                >
                  Nama Lengkap *
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="org"
                  className="text-xs font-medium text-foreground"
                >
                  Instansi / Perusahaan
                </Label>
                <Input
                  id="org"
                  placeholder="Contoh: PT Karya Digital"
                  value={formData.org}
                  onChange={(e) =>
                    setFormData({ ...formData, org: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="whatsapp"
                  className="text-xs font-medium text-foreground"
                >
                  No. WhatsApp Aktif *
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="service"
                  className="text-xs font-medium text-foreground"
                >
                  Jenis Layanan *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(val) =>
                    setFormData({ ...formData, service: val })
                  }
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Pilih Layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">
                      Web Application Development
                    </SelectItem>
                    <SelectItem value="Mobile Development">
                      Mobile App Development
                    </SelectItem>
                    <SelectItem value="UI/UX Design">
                      UI/UX Design & Prototyping
                    </SelectItem>
                    <SelectItem value="Digital Products">
                      Digital Products & Templates
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="budget"
                className="text-xs font-medium text-foreground"
              >
                Estimasi Anggaran (Budget)
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(val) =>
                  setFormData({ ...formData, budget: val })
                }
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Pilih Kisaran Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 5 Juta">
                    &lt; 5 Juta (Mini Project / Template)
                  </SelectItem>
                  <SelectItem value="5 - 15 Juta">
                    5 - 15 Juta (Standard SaaS/Web)
                  </SelectItem>
                  <SelectItem value="15 - 30 Juta">
                    15 - 30 Juta (Complex Web/Mobile App)
                  </SelectItem>
                  <SelectItem value="> 30 Juta">
                    &gt; 30 Juta (Enterprise Solution)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="brief"
                className="text-xs font-medium text-foreground"
              >
                Deskripsi Briefing Proyek *
              </Label>
              <Textarea
                id="brief"
                required
                rows={3}
                placeholder="Jelaskan kebutuhan fitur utama, tujuan aplikasi, atau referensi desain..."
                value={formData.brief}
                onChange={(e) =>
                  setFormData({ ...formData, brief: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Kirim Brief & Chat WA"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
