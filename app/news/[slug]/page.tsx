import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/db/queries";
import { ArrowLeft, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Berita Tidak Ditemukan" };

  return {
    title: article.title,
    description: article.content.slice(0, 150),
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/news"
          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Daftar Berita
        </Link>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.createdAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author}
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground leading-tight">
            {article.title}
          </h1>
        </header>

        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
          {article.content}
        </div>
      </article>
    </div>
  );
}
