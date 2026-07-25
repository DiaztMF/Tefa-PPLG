# Next.js, SEO, and shadcn/ui Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance Next.js SEO compliance, add robots.txt and dynamic sitemap.xml, optimize Root Layout metadata/viewport, and enforce shadcn flex gap spacing best practices across components.

**Architecture:** Create `app/robots.ts` and `app/sitemap.ts`, update `app/layout.tsx` with full OpenGraph/Twitter/Viewport/metadataBase exports, and refactor `space-y-*` to `flex flex-col gap-*` in `components/landing/`.

**Tech Stack:** Next.js 15 (App Router), Metadata API, MetadataRoute, Tailwind CSS v4, shadcn/ui.

---

### Task 1: Create `app/robots.ts` and `app/sitemap.ts` for SEO Compliance

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

**Interfaces:**
- Consumes: `MetadataRoute.Robots` and `MetadataRoute.Sitemap` from `next`
- Produces: Dynamic `robots.txt` and `sitemap.xml` endpoints for search engine indexing.

- [ ] **Step 1: Create `app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tefa.smk.sch.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { mockProjects, mockStudents } from "@/lib/data/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tefa.smk.sch.id";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/students`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const showcaseRoutes: MetadataRoute.Sitemap = mockProjects.map((project) => ({
    url: `${baseUrl}/showcase/${project.id}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const studentRoutes: MetadataRoute.Sitemap = mockStudents.map((student) => ({
    url: `${baseUrl}/students/${student.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...showcaseRoutes, ...studentRoutes];
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run `npx tsc --noEmit`.

---

### Task 2: Enhance Root Layout Metadata & Viewport (`app/layout.tsx`)

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Viewport` and `Metadata` from `next`
- Produces: Complete OpenGraph, Twitter card, canonical URL, and separate Viewport export.

- [ ] **Step 1: Update `app/layout.tsx`**

```tsx
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
```

---

### Task 3: Refactor Spacing & shadcn Rules in Landing Components

**Files:**
- Modify: `components/landing/hero-section.tsx`
- Modify: `components/landing/bento-services.tsx`
- Modify: `components/landing/showcase-highlight.tsx`
- Modify: `components/landing/brief-modal.tsx`
- Modify: `components/landing/footer.tsx`

**Interfaces:**
- Consumes: Flex gap utilities (`flex flex-col gap-*`) instead of legacy `space-y-*`
- Produces: 100% compliant shadcn/ui layout code.

- [ ] **Step 1: Refactor `components/landing/hero-section.tsx`**
- [ ] **Step 2: Refactor `components/landing/bento-services.tsx`**
- [ ] **Step 3: Refactor `components/landing/showcase-highlight.tsx`**
- [ ] **Step 4: Refactor `components/landing/brief-modal.tsx`**
- [ ] **Step 5: Refactor `components/landing/footer.tsx`**

---

### Task 4: Final Verification & Test Execution

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `npx tsc --noEmit`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Commit changes to Git**
