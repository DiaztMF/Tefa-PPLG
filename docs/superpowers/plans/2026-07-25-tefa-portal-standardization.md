# TeFa Portal Foundation & Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up Next.js 15 styling tokens, enforce Light Mode Only, integrate Geist and Inter fonts, and prepare the core layout foundation matching `docs/design.md` and `docs/prd.md`.

**Architecture:** Update `app/globals.css` to remove dark mode and define strict design tokens. Integrate Google Fonts (Geist & Inter) in `app/layout.tsx` with proper CSS variable mappings. Ensure clean build and TypeScript compliance.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, `next/font/google`, TypeScript.

## Global Constraints

* Light Mode Only: No dark mode styles or `.dark` class selectors.
* Primary Brand Blue: `#136AD5` (`--primary`).
* Heading Font: Geist (`--font-heading`).
* Body Font: Inter (`--font-sans`).

---

### Task 1: CSS Design Tokens & Light Mode Clean-Up

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Design tokens from `docs/design.md`
- Produces: Tailwind v4 theme variables and `.bg-subtle-grid` background utility class.

- [ ] **Step 1: Inspect current `app/globals.css`**

View `app/globals.css` to verify `.dark` blocks and existing root variables.

- [ ] **Step 2: Update `app/globals.css` with Light Mode Tokens**

Replace `.dark` block and update `:root` variables to match `docs/design.md`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #FAFAFA;
  --foreground: #0F172A;
  --card: #FFFFFF;
  --card-foreground: #0F172A;
  --popover: #FFFFFF;
  --popover-foreground: #0F172A;
  --primary: #136AD5;
  --primary-foreground: #FFFFFF;
  --secondary: #EFF6FF;
  --secondary-foreground: #0F172A;
  --muted: #FAFAFA;
  --muted-foreground: #475569;
  --accent: #EFF6FF;
  --accent-foreground: #136AD5;
  --destructive: #EF4444;
  --border: #E2E8F0;
  --input: #CBD5E1;
  --ring: #136AD5;
  --radius: 0.5rem;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-heading: var(--font-geist), system-ui, sans-serif;
}

@theme inline {
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
  button:not(:disabled), [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

.bg-subtle-grid {
  background-size: 32px 32px;
  background-image: 
    linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
}
```

- [ ] **Step 3: Verify CSS syntax**

Check syntax and save changes to `app/globals.css`.

- [ ] **Step 4: Commit CSS changes**

```bash
git add app/globals.css
git commit -m "style: enforce light mode only and integrate design tokens in globals.css"
```

---

### Task 2: Font Integration & Root Layout Setup

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Geist` and `Inter` from `next/font/google`
- Produces: Root HTML structure with injected font CSS variables and metadata per PRD.

- [ ] **Step 1: Inspect current `app/layout.tsx`**

View `app/layout.tsx`.

- [ ] **Step 2: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "TeFa PPLG — Web Portal & Showcase Platform",
  description: "Saluran resmi portofolio karya siswa dan pemesanan layanan perangkat lunak TeFa PPLG SMK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${geist.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run build check to verify TypeScript and Font loading**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit Root Layout changes**

```bash
git add app/layout.tsx
git commit -m "feat: integrate Geist and Inter fonts and update root layout metadata"
```
