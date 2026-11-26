import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/db/queries";
import { Navbar } from "@/components/landing/navbar";
import { ArrowLeft, Calendar, Newspaper, User, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita & Rilis Studio TeFa",
  description:
    "Kabar terbaru, rilis proyek, dan kegiatan Teaching Factory PPLG SMK Negeri 2 Surakarta.",
};

export default async function NewsListPage() {
  const articles = await getNews();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </Link>
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
                Berita & Rilis Studio TeFa PPLG
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl">
                Informasi terbaru seputar proyek industri, kolaborasi mitra DUDI, dan pencapaian siswa.
              </p>
            </div>
          </div>

          {articles.length === 0 ? (
            <div className="p-12 rounded-xl bg-card border border-border text-center text-sm text-muted-foreground">
              Belum ada berita atau artikel yang diterbitkan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="p-6 rounded-xl bg-card border border-border flex flex-col justify-between gap-4 hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        <Newspaper className="w-3.5 h-3.5" /> Rilis TeFa
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {article.createdAt}
                      </span>
                    </div>
                    <h2 className="font-heading font-semibold text-xl text-foreground">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <User className="w-3.5 h-3.5" /> {article.author}
                    </span>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center font-medium text-primary hover:underline gap-1"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
