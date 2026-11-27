"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Lock, Loader2, AlertCircle } from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setIsLoading(true)

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message || "Email atau kata sandi tidak valid.")
        return
      }

      const signedInUser = data?.user as { role?: unknown } | undefined
      const signedInRole =
        typeof signedInUser?.role === "string" ? signedInUser.role : ""

      if (signedInRole === "siswa" || signedInRole === "student") {
        router.push("/students")
      } else if (signedInRole === "klien" || signedInRole === "client") {
        router.push("/client")
      } else {
        router.push(callbackUrl)
      }
      router.refresh()
    } catch {
      setErrorMessage(
        "Gagal menghubungi server autentikasi. Pastikan database sudah terhubung."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-subtle-grid flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo href="/" size={44} showText subtitle="Admin CMS Portal" />
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Masuk ke Studio Admin
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Gunakan akun instruktur atau admin TeFa PPLG untuk mengelola
              portofolio dan inbound brief.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@tefa.smkn2surakarta.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-medium">
              Kata Sandi
            </Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Masuk ke Dashboard
              </>
            )}
          </Button>
        </form>

        {errorMessage && (
          <Alert
            variant="destructive"
            className="border-destructive bg-destructive/10 text-destructive"
          >
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-xs font-medium text-destructive">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Portal Publik
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
          Memuat halaman login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
