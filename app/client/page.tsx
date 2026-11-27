"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClientPage() {
  const router = useRouter()
  const [trackingToken, setTrackingToken] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = trackingToken.trim()
    if (!token) return
    router.push(`/client/briefs/${token}`)
  }

  return (
    <div className="bg-subtle-grid flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Ruang Klien
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan kode tracking untuk melihat status dan detail pengajuan
            Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trackingToken" className="text-xs font-medium">
              Kode Tracking
            </Label>
            <Input
              id="trackingToken"
              required
              placeholder="Masukkan kode tracking dari email/WA"
              value={trackingToken}
              onChange={(event) => setTrackingToken(event.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Lihat Brief
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ajukan Brief Baru
          </Link>
        </div>
      </div>
    </div>
  )
}
