# TeFa PPLG Guidelines

The TeFa PPLG guidelines are specifically curated for this Next.js web portal project. These guidelines should be followed closely to ensure the best experience when building the teaching-factory showcase and lead-generation platform.

## Foundational Context

This application is a Next.js 16 App Router portal for SMK PPLG's teaching-factory student showcase and software-booking platform and its main packages & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- next@16.2.6
- react@19.2.4
- react-dom@19.2.4
- typescript@5.9.3
- tailwindcss@4.3.3
- @tailwindcss/postcss@4.3.3
- shadcn@4.14.1 (radix-nova style)
- radix-ui@1.6.7
- @shadcn/react@0.2.1
- drizzle-orm@0.45.2
- drizzle-kit@0.31.10
- @neondatabase/serverless@1.1.0
- better-auth@1.6.25
- lucide-react@1.26.0
- class-variance-authority@0.7.1
- clsx@2.1.1
- tailwind-merge@3.6.0
- tw-animate-css@1.4.0
- next-themes@0.4.6
- @base-ui/react@1.6.0
- date-fns@4.4.0
- sonner@2.0.7
- vaul@1.1.2
- cmdk@1.1.1
- embla-carousel-react@8.6.0
- input-otp@1.4.2
- react-day-picker@10.0.1
- react-resizable-panels@4.12.2
- recharts@3.8.0
- eslint@9.39.5
- eslint-config-next@16.2.6
- prettier@3.9.6
- prettier-plugin-tailwindcss@0.8.1

## Skills Activation

This project has domain-specific skills available in `**/skills/**`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `onOpenBriefModal`, not `onOpen`; `setIsBriefModalOpen`, not `setOpen`; `handleSubmit`, not `onSub`.
- Check for existing components in `components/ui/` (60+ shadcn components) and `components/` before writing a new one. Reuse `cn()` from `@/lib/utils` for class merging and `cva()` from `class-variance-authority` for variant-based styling.
- Landing-page sections live in `components/landing/` and MUST be named with a `Section` suffix pattern (e.g., `HeroSection`, `BentoServices`). All landing pages use the `"use client"` directive, import from `@/components/ui/*`, and accept props via a typed `Props` interface per file.
- This project is strictly light-mode only per the design spec — `.dark` variables are not defined, and no dark-mode class logic should be added.
- Code formatting follows `.prettierrc`: no semicolons, double quotes, trailing commas where valid (ES5), 80-char print width, and `lf` line endings. The `prettier-plugin-tailwindcss` plugin auto-sorts classes using `app/globals.css` as the stylesheet reference; `cn()` and `cva()` are registered as tailwind functions.
- shadcn UI components follow the radix-nova style and use `data-slot` attributes for targetting — do not override these with Tailwind classes unless via the `className` prop. Component functions use `function ComponentName()` (not arrow-function components), destructure `className` as the first prop, and call `cn(...)` last.
- ESLint uses the Next.js core-web-vitals + TypeScript configs. Run `eslint` before committing. Run `tsc --noEmit` for type checking.

## Verification Scripts

- Do not create verification scripts when existing manual checks or build processes cover that functionality and prove they work.

## Application Structure & Architecture

- Stick to the existing directory structure; don't create new base folders without approval.
  - `app/` — Next.js App Router pages and layouts.
  - `components/ui/` — shadcn UI primitives (60 files). Do not edit these unless upgrading shadcn itself.
  - `components/landing/` — landing-page section components (each is one full section).
  - `lib/` — shared utilities (`utils.ts` exports `cn()`).
  - `hooks/` — shared React hooks (`useIsMobile()` from `use-mobile.ts`).
  - `docs/` — design system spec (`design.md`) and PRD (`prd.md`).
- The `@/` path alias maps to the project root. All imports MUST use `@/` — no relative imports like `../../components/`.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to restart the development server or rebuild. Ask them to run `pnpm dev` or `pnpm build`.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations—focus on what's important rather than explaining obvious details.

=== next.js rules ===

# Next.js 16

## Tools

- Run the dev server via command line: `pnpm dev` (utilizes `next dev` with Turbopack).
- Production build: `pnpm build` (must pass with zero errors before deployment).
- Type-checking: `pnpm typecheck` (runs `tsc --noEmit`).
- Linting: `pnpm lint` (runs ESLint 9 flat config via `eslint.config.mjs`).

## Searching Documentation (IMPORTANT)

- Always refer to `node_modules/next/dist/docs/` for version-specific guidance before writing any Next.js code — this version of Next.js (16.2.6) has breaking changes from prior versions, including potentially altered APIs, conventions, and file structure. Heed all deprecation notices.
- Read the relevant guide file in `node_modules/next/dist/docs/` — do not rely on training-data knowledge for this framework version.

## Component & Data Patterns

- Default to Server Components unless interactivity (state, effects, event handlers) or browser APIs are required. When client code is needed, place `"use client"` as the first line of the file.
- Server Actions live in server files or `"use server"` modules — do NOT put them in client components.
- Metadata MUST use the `generateMetadata` export (not `Head` or `next/head`). Use dynamic `generateMetadata({ params })` for routes with dynamic segments.
- Route handlers (API routes) use `export async function GET/POST/PUT/DELETE(request: NextRequest)` in `route.ts` files.
- Fonts use `next/font/google` with CSS variable binding (e.g., `variable: "--font-inter"`). Apply via `className={cn(inter.variable, geist.variable)}` on the `<html>` element.
- Link navigation uses `next/link`; never use `<a>` for internal routes.
- Lucide icons are imported individually (e.g., `import { ArrowRight } from "lucide-react"`) — never import the entire icon set.

=== typescript rules ===

# TypeScript 5.9

- `strict: true` is enabled in `tsconfig.json`. You must never disable strict mode or use `any`. Prefer `unknown` for truly dynamic values.
- Use explicit `interface` for component props with the naming pattern `{ComponentName}Props`. Example: `interface NavbarProps { onOpenBriefModal: () => void }`.
- Use `React.ComponentProps<"element">` for extending native HTML attributes (shadcn pattern). Avoid `React.HTMLAttributes<HTMLDivElement>`.
- `Readonly<{ children: React.ReactNode }>` is the standard for layout `children` typing.
- `asChild` prop pattern via `Slot.Root` from `radix-ui` is used for polymorphic components like `Button` and `Badge`.
- Functional components use `function ComponentName()` declaration — never `const ComponentName = () =>` arrow functions.

=== shadcn rules ===

# shadcn/ui (radix-nova)

- All 60+ UI primitives are already installed in `components/ui/`. Never install duplicates or redefine a component that already exists. Check `components/ui/` first for every primitive.
- Every shadcn component uses the `data-slot` attribute on its root element. Do not strip or override `data-slot`.
- Styling variants use `cva()` from `class-variance-authority` with a `base` string and a `variants` object. Default variants go in `defaultVariants`. Example: `buttonVariants` in `button.tsx`.
- Components use `"use client"` only when React hooks or interactive state are required; shadcn ui primitives in this project do NOT use `"use client"` (they import React via `import * as React from "react"`).
- The `cn()` utility from `@/lib/utils` merges classes with `tailwind-merge` and conditionals with `clsx`. Always use it last in the `className` spread order.
- Icons are always from `lucide-react`, imported individually. The icon library in `components.json` is set to `lucide`.

=== tailwind css rules ===

# Tailwind CSS v4

- This project uses Tailwind CSS v4 (`tailwindcss@4.3.3`) with the PostCSS plugin (`@tailwindcss/postcss`). Configuration is done via CSS — not a `tailwind.config.*` file.
- The entry stylesheet is `app/globals.css` using `@import "tailwindcss"`. Custom CSS variables are defined in `:root` and mapped to Tailwind theme tokens via `@theme inline {}` block.
- Font families are set via CSS variables: `--font-sans` (Inter) and `--font-heading` (Geist). Use `font-sans` for body text and `font-heading` for headlines — do NOT use hardcoded font-family values.
- Color tokens from the design system are accessed as Tailwind utility classes: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`, `bg-muted`, and `text-accent`.
- The `.bg-subtle-grid` class is defined in `globals.css` for hero sections. Use it instead of re-creating grid patterns.
- Responsive breakpoints follow the standard Tailwind v4 breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). This project consistently uses `sm:`, `md:`, and `lg:` prefixes — no custom breakpoints.
- Animations use `tw-animate-css@1.4.0` imported via `@import "tw-animate-css"` after the Tailwind import.
- The `@custom-variant dark` plugin is declared but dark mode is deactivated per design spec — no dark: variants should be used in component code.

=== drizzle rules ===

# Drizzle ORM & Neon Postgres

- Schema files use Drizzle ORM `0.45.2` with `@neondatabase/serverless@1.1.0` for serverless Postgres connections.
- Migrations are managed with `drizzle-kit@0.31.10`. Schema changes should be generated via `drizzle-kit generate` and applied with `drizzle-kit migrate`.
- Always use Drizzle's type-safe query builders over raw SQL. Use `drizzle-orm/neon-http` or `drizzle-orm/neon-serverless` for the Neon driver.
- Do not use `kysely` directly — it's only present as a peer dependency of Drizzle; the ORM layer is always Drizzle.

=== deployment rules ===

# Deployment

- Containerization uses Docker (Dockerfile expected but not yet committed). The `pnpm-workspace.yaml` has `sharp` and `unrs-resolver` builds allowed.
- The deployment target is Vercel or cloud infrastructure per the PRD. The production build output from `next build` is the artifact.
- Environment variables for Neon DB and Better Auth secrets must never be committed — they must be provided via the deployment platform's environment configuration.

=== tests rules ===

# Test Enforcement

- No test framework is currently configured. The project has no test scripts or test runner dependencies. Do not create tests without explicit user approval.
- Verify changes by running `pnpm lint` (ESLint), `pnpm typecheck` (tsc --noEmit), and `pnpm build` (production build). All three must pass before any change is considered complete.
