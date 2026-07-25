# TeFa PPLG Design System Specification

## 1. Document Overview & Metadata

* **System Name:** TeFa PPLG Web Portal & Showcase Platform Design System
* **Version:** 1.0.0 (Release Candidate)
* **Last Updated:** 25 Juli 2026
* **Status:** `Approved`
* **Theme Policy:** **Light Mode Only** (Dark mode styling is deactivated for V1 launch to enforce a clean, high-contrast, professional corporate SaaS aesthetic).

---

## 2. Core Design Philosophy

1. **Modern SaaS Aesthetic:** Combines crisp borders (*hairline borders*), high typographic contrast, and ample whitespace to mirror industry-grade software house platforms.
2. **Typographic Pairings:** Uses **Geist** for crisp, sharp display headers paired with **Inter** for optimized paragraph and UI readability.
3. **Subtle Grid Depth:** Utilizes a lightweight, semi-transparent background grid pattern with a radial fade mask to create modern spatial depth without clutter.
4. **Focused Color Hierarchy:** Anchored by Primary Blue (`#136AD5`), representing trust, technology, and professionalism.

---

## 3. Color Tokens & Theme Mapping

### 3.1 Color Palette Table

| Token Name | Hex Code | HSL / OKLCH Reference | Description & Usage |
| :--- | :--- | :--- | :--- |
| `primary` | `#136AD5` | `hsl(214, 84%, 45%)` | Brand primary, main CTA buttons, active states |
| `primary-hover` | `#0E52A7` | `hsl(214, 84%, 35%)` | Hover state for primary interactive elements |
| `primary-press` | `#0A3D7D` | `hsl(214, 84%, 26%)` | Active/Pressed state for primary buttons |
| `primary-soft` | `#EFF6FF` | `hsl(214, 100%, 97%)` | Tech stack badges, active nav pills, highlight fills |
| `primary-border` | `#BFDBFE` | `hsl(214, 95%, 87%)` | Soft blue border for active or highlighted cards |
| `ink` | `#0F172A` | `hsl(222, 47%, 11%)` | Primary text, main headings, high-emphasis text |
| `ink-secondary` | `#475569` | `hsl(215, 25%, 35%)` | Secondary text, subtitles, meta descriptions |
| `ink-mute` | `#94A3B8` | `hsl(215, 20%, 65%)` | Disabled text, placeholders, icon mutes |
| `on-primary` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Text rendered on top of primary background |
| `canvas` | `#FAFAFA` | `hsl(0, 0%, 98%)` | Main page background canvas |
| `surface` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Card surface, modal surface, navbar background |
| `hairline` | `#E2E8F0` | `hsl(214, 32%, 91%)` | Default border for cards, dividers, and headers |
| `hairline-input`| `#CBD5E1` | `hsl(213, 27%, 84%)` | Input field default border |

### 3.2 CSS Variables Mapping (`app/globals.css`)

```css
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
}
```

---

## 4. Typography Scale & Specifications

### 4.1 Font Families

* **Heading Font:** `Geist, system-ui, -apple-system, sans-serif`
* **Body Font:** `Inter, system-ui, -apple-system, sans-serif`

### 4.2 Type Scale System

| Style Token | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xxl` | Geist | `52px` | 700 (Bold) | `1.1` | `-0.02em` | Hero main heading |
| `display-xl` | Geist | `40px` | 600 (SemiBold) | `1.15` | `-0.02em` | Section primary headers |
| `heading-md` | Geist | `20px` | 600 (SemiBold) | `1.4` | `-0.01em` | Card titles, modal headers |
| `body-lg` | Inter | `16px` | 400 (Regular) | `1.6` | `0em` | Hero lead paragraph, main text |
| `body-md` | Inter | `15px` | 400 (Regular) | `1.5` | `0em` | Standard card text, form labels |
| `caption` | Inter | `13px` | 400 (Regular) | `1.4` | `0em` | Meta information, helper text |
| `badge-tag` | Inter | `12px` | 500 (Medium) | `1.0` | `0.01em` | Tech stack tags, status pills |

---

## 5. Background Patterns & Elevation

### 5.1 Subtle Grid Background Pattern

Hero sections and major callout blocks feature a subtle grid overlay:

```css
.bg-subtle-grid {
  background-size: 32px 32px;
  background-image: 
    linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
}
```

### 5.2 Elevation & Shadows

* **Flat Hairline Border:** `border: 1px solid #E2E8F0`
* **Card Rest Shadow:** `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05)`
* **Card Hover Elevation:** `box-shadow: 0 10px 25px -5px rgba(19, 106, 213, 0.10)`
* **Modal Overlay Elevation:** `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`

---

## 6. Component Specifications & Design Rules

### 6.1 Navbar Component

* **Position:** Top Static (non-sticky for clean reading, optional sticky blur on scroll).
* **Height:** `72px`
* **Background:** Surface White (`#FFFFFF`) with bottom border Hairline (`#E2E8F0`).
* **Anatomy:** Left Logo TeFa PPLG, Center Navigation Links (Beranda, Showcase, Siswa, Layanan, Tentang), Right Action CTA ("Kirim Brief").

### 6.2 Primary Button

* **Background:** `#136AD5` (Hover: `#0E52A7`, Active: `#0A3D7D`)
* **Text Color:** `#FFFFFF`
* **Font:** Inter Medium (`15px`)
* **Padding:** `10px 20px`
* **Border Radius:** `0.5rem` (`rounded-lg`)
* **Transition:** `all 150ms ease-in-out`

### 6.3 Showcase Portfolio Card

* **Container:** Surface White (`#FFFFFF`) with 1px Hairline (`#E2E8F0`) border.
* **Header Frame:** Clean Mac-style browser frame header (3 window dots: Red/Yellow/Green) with preview image.
* **Body Content:** Title (Geist 20px), brief description (Inter 15px), Tech Stack Badges array, and "Lihat Detail" link.
* **Hover State:** Smooth scale shift (`scale-[1.01]`) + Soft blue shadow glow (`0 10px 25px -5px rgba(19, 106, 213, 0.10)`).

### 6.4 Tech Stack Badge

* **Background:** Primary Soft (`#EFF6FF`)
* **Text Color:** Primary (`#136AD5`)
* **Border:** 1px Solid Primary Border (`#BFDBFE`)
* **Border Radius:** `9999px` (`rounded-full`)
* **Padding:** `4px 10px`
* **Font:** Inter Medium 12px

### 6.5 Form Brief (Modal Lead Generator)

* **Layout:** Clean 2-column or step-by-step modal.
* **Fields:** Nama Lengkap, Instansi/Perusahaan, Nomor WhatsApp, Jenis Layanan (Dropdown/Radio), Estimasi Budget, Deskripsi Kebutuhan.
* **Action Flow:** Trigger Server Action to save record in PostgreSQL -> Trigger Client Redirection to WhatsApp (`wa.me`) with pre-formatted message text.

---

## 7. Implementation Checklist for Developers

* [ ] Verify `.dark` mode block is completely disabled in `app/globals.css`.
* [ ] Configure `@theme inline` in Tailwind CSS v4 to map Geist and Inter fonts.
* [ ] Implement `.bg-subtle-grid` utility class in `globals.css`.
* [ ] Ensure all buttons and card components consume `--primary` and `--hairline` CSS variables.