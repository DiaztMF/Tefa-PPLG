import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientBriefPage({
  params,
}: PageProps) {
  const { id } = await params;
  let brief = null;
  let error = "";

  try {
    const res = await fetch(`/api/brief/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      brief = data.brief;
    } else {
      error = "Brief tidak ditemukan.";
    }
  } catch {
    error = "Gagal memuat data brief.";
  }

  const statusColor: Record<string, string> = {
    Baru: "bg-emerald-100 text-emerald-700",
    Diskusi: "bg-amber-100 text-amber-700",
    Selesai: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <nav className="w-full bg-card border-b border-border px-4 sm:px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="w-3.5 h-3.5">←</span> Kembali ke Beranda
        </Link>
      </nav>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {error ? (
            <div className="p-6 rounded-xl bg-card border border-border text-center text-sm text-muted-foreground">
              {error}
            </div>
          ) : (
            <>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                      {brief?.name}
                    </h1>
                    {brief?.org && (
                      <p className="text-xs text-muted-foreground">
                        {brief.org}
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor[brief?.status ?? ""] ?? "bg-slate-100 text-slate-700"}`}
                  >
                    {brief?.status ?? "-"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="p-3 rounded-lg bg-secondary/50 border border-secondary/30">
                    <p className="text-xs text-muted-foreground">Layanan</p>
                    <p className="text-sm font-medium text-foreground">
                      {brief?.service}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border border-secondary/30">
                    <p className="text-xs text-muted-foreground">Estimasi Budget</p>
                    <p className="text-sm font-medium text-foreground">
                      {brief?.budget}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border border-secondary/30">
                    <p className="text-xs text-muted-foreground">No. WhatsApp</p>
                    <p className="text-sm font-medium text-foreground">
                      {brief?.whatsapp}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border border-secondary/30">
                    <p className="text-xs text-muted-foreground">Tanggal Kirim</p>
                    <p className="text-sm font-medium text-foreground">
                      {brief?.createdAt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground font-semibold">
                    Briefing Proyek
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {brief?.briefText}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <Link
                    href={`https://wa.me/${brief?.whatsapp.replace(/^0/, "62")}?text=Halo%20Admin%20TeFa%20PPLG,%20saya%20mau%20melihat%20status%20brief%20saya`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="w-4 h-4">📱</span> Hubungi Admin via WhatsApp
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
