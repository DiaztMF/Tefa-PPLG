import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 bg-subtle-grid">
      <div className="max-w-md w-full p-8 rounded-2xl bg-card border border-border shadow-sm text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-secondary text-primary flex items-center justify-center mx-auto">
          <FileQuestion className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-muted-foreground">
            Data atau halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild variant="outline">
            <Link href="/showcase">Lihat Showcase</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
