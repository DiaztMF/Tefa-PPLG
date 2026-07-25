import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#136AD5",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tefa.smk.sch.id"),
  title: {
    default: "TeFa PPLG — Web Portal & Showcase Platform",
    template: "%s | TeFa PPLG SMK",
  },
  description: "Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak TeFa PPLG SMK.",
  keywords: ["TeFa PPLG", "Software House SMK", "Portofolio Siswa", "Showcase Software", "Web Development"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "TeFa PPLG SMK Showcase",
    title: "TeFa PPLG — Web Portal & Showcase Platform",
    description: "Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak TeFa PPLG SMK.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeFa PPLG — Web Portal & Showcase Platform",
    description: "Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak TeFa PPLG SMK.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, geist.variable)}
    >
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
