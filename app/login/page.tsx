"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Lock, Loader2, AlertCircle } from "lucide-react";

const loginRateLimit = new Map<string, number[]>();
const LOGIN_RATE_LIMIT_WINDOW = 60 * 1000; // 1 menit
const LOGIN_RATE_LIMIT_MAX = 5; // maksimal 5 percobaan per menit per IP

function getClientIp(): string {
  // Client-side tidak dapat membaca IP langsung; gunakan placeholder unik per sesi
  // Rate limit aktual harus dilakukan di sisi server (middleware atau API route)
  return "client";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = loginRateLimit.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < LOGIN_RATE_LIMIT_WINDOW);
  loginRateLimit.set(ip, recent);
  return recent.length >= LOGIN_RATE_LIMIT_MAX;
}

function recordLoginAttempt(ip: string): void {
  const now = Date.now();
  const timestamps = loginRateLimit.get(ip) || [];
  timestamps.push(now);
  loginRateLimit.set(ip, timestamps);
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitMsg, setRateLimitMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setRateLimitMsg("");
    setIsLoading(true);

    const ip = getClientIp();
    if (isRateLimited(ip)) {
      setRateLimitMsg(
        "Terlalu banyak percobaan login. Coba lagi dalam 1 menit."
      );
      setIsLoading(false);
      return;
    }
    recordLoginAttempt(ip);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        setErrorMessage(error.message || "Email atau kata sandi tidak valid.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorMessage(
        "Gagal menghubungi server autentikasi. Pastikan database sudah terhubung."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 bg-subtle-grid">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <Logo href="/" size={44} showText subtitle="Admin CMS Portal" />
          <div className="space-y-1">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              Masuk ke Studio Admin
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Gunakan akun instruktur atau admin TeFa PPLG untuk mengelola portofolio dan inbound brief.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-5"
        >
          {errorMessage && (
            <Alert variant="destructive" className="border-destructive bg-destructive/10 text-destructive">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <AlertDescription className="text-xs font-medium text-destructive">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          {rateLimitMsg && (
            <Alert variant="destructive" className="border-destructive bg-destructive/10 text-destructive">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <AlertDescription className="text-xs font-medium text-destructive">
                {rateLimitMsg}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-medium">
              Email Admin / Instruktur
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
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Masuk ke Dashboard
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Portal Publik
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted-foreground">
          Memuat halaman login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
