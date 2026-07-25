import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { env } from "@/lib/config/env";

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
  metadataBase: new URL(env.appUrl),
  title: {
    default: `TeFa PPLG — ${env.schoolName}`,
    template: `%s | TeFa PPLG ${env.schoolName}`,
  },
  description: `Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak Teaching Factory PPLG ${env.schoolName}.`,
  keywords: [
    "TeFa PPLG",
    env.schoolName,
    "Software House SMK",
    "Portofolio Siswa",
    "Showcase Software",
    "Web Development",
    "SMK Negeri 2 Surakarta",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: `TeFa PPLG ${env.schoolName}`,
    title: `TeFa PPLG — ${env.schoolName}`,
    description: `Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak Teaching Factory PPLG ${env.schoolName}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `TeFa PPLG — ${env.schoolName}`,
    description: `Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak Teaching Factory PPLG ${env.schoolName}.`,
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
