# Graph Report - Tefa  (2026-07-25)

## Corpus Check
- 111 files · ~35,466 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 747 nodes · 1289 edges · 76 communities (46 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3844076e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Core Runtime Dependencies
- Development Tooling & Types
- TypeScript Compiler Configuration
- Shadcn UI Configuration
- Next.js App Components
- Package Manager Configuration
- TypeScript Inclusions & Exclusions
- Tailwind CSS Styling Rules
- Graphify Rule System
- OpenCode Graphify Plugin
- Agent Rules & Next.js Overview
- ESLint Linting Configuration
- Next.js Build Configuration
- PostCSS Processing Setup
- pnpm Workspace Settings
- Shadcn Documentation Guide
- cn
- TeFa PPLG Design System Specification
- menubar.tsx
- context-menu.tsx
- dropdown-menu.tsx
- page.tsx
- alert-dialog.tsx
- Product Requirement Document (PRD)
- attachment.tsx
- drawer.tsx
- navigation-menu.tsx
- Global Constraints
- pagination.tsx
- button.tsx
- empty.tsx
- dependencies
- avatar.tsx
- bubble.tsx
- message.tsx
- message-scroller.tsx
- alert.tsx
- tabs.tsx
- RTK - Rust Token Killer (Google Antigravity)
- marker.tsx
- Global Constraints
- opencode.json
- kbd.tsx
- radio-group.tsx
- @base-ui/react
- class-variance-authority
- clsx
- date-fns
- dotenv
- drizzle-orm
- embla-carousel-react
- input-otp
- lucide-react
- @neondatabase/serverless
- next
- next-themes
- react-day-picker
- react-dom
- react-resizable-panels
- recharts
- shadcn
- @shadcn/react
- sonner
- tailwind-merge
- vaul
- popover.tsx
- resizable.tsx
- Global Constraints
- Next.js, SEO, and shadcn/ui Optimization Implementation Plan
- cmdk

## God Nodes (most connected - your core abstractions)
1. `cn()` - 330 edges
2. `Button()` - 26 edges
3. `react` - 17 edges
4. `compilerOptions` - 16 edges
5. `Input()` - 9 edges
6. `mockProjects` - 9 edges
7. `mockStudents` - 8 edges
8. `calculateStudentClass()` - 8 edges
9. `scripts` - 8 edges
10. `include` - 8 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `AlertDescription()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `AlertAction()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `AttachmentContent()` --calls--> `cn()`  [EXTRACTED]
  components/ui/attachment.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (76 total, 30 thin omitted)

### Community 0 - "Core Runtime Dependencies"
Cohesion: 0.06
Nodes (32): ThemeHotkey(), Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+24 more)

### Community 1 - "Development Tooling & Types"
Cohesion: 0.05
Nodes (38): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, prettier (+30 more)

### Community 2 - "TypeScript Compiler Configuration"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, **/*.mts, next.config.ts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+21 more)

### Community 3 - "Shadcn UI Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Next.js App Components"
Cohesion: 0.08
Nodes (15): Badge(), badgeVariants, Checkbox(), HoverCardContent(), NativeSelect(), NativeSelectOptGroup(), NativeSelectOption(), NativeSelectProps (+7 more)

### Community 5 - "Package Manager Configuration"
Cohesion: 0.06
Nodes (39): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+31 more)

### Community 6 - "TypeScript Inclusions & Exclusions"
Cohesion: 0.07
Nodes (39): BriefItem, mockBriefs, AdminStudentsPage(), PageProps, PageProps, StudentProfilePage(), StudentsDirectoryPage(), BentoServices() (+31 more)

### Community 7 - "Tailwind CSS Styling Rules"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 8 - "Graphify Rule System"
Cohesion: 0.67
Nodes (3): Graphify Knowledge Graph Rule, Graphify Workflow Definition, Agents Graphify Integration Rules

### Community 17 - "TeFa PPLG Design System Specification"
Cohesion: 0.10
Nodes (19): 1. Document Overview & Metadata, 2. Core Design Philosophy, 3.1 Color Palette Table, 3.2 CSS Variables Mapping (`app/globals.css`), 3. Color Tokens & Theme Mapping, 4.1 Font Families, 4.2 Type Scale System, 4. Typography Scale & Specifications (+11 more)

### Community 18 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 19 - "context-menu.tsx"
Cohesion: 0.12
Nodes (10): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+2 more)

### Community 20 - "dropdown-menu.tsx"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 21 - "page.tsx"
Cohesion: 0.25
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 22 - "alert-dialog.tsx"
Cohesion: 0.08
Nodes (37): Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription() (+29 more)

### Community 23 - "Product Requirement Document (PRD)"
Cohesion: 0.15
Nodes (12): 1. Document Overview & Metadata, 2.1 Problem Statement, 2.2 Goals & Key Performance Indicators (KPIs), 2.3 Target Personas, 2. Executive Summary & Core Strategy, 3.1 In-Scope (V1 Launch Release), 3.2 Out-of-Scope (V2 Roadmap), 3. Scope & Feature Specifications (+4 more)

### Community 24 - "attachment.tsx"
Cohesion: 0.20
Nodes (11): Attachment(), AttachmentAction(), AttachmentActions(), AttachmentContent(), AttachmentDescription(), AttachmentGroup(), AttachmentMedia(), attachmentMediaVariants (+3 more)

### Community 25 - "drawer.tsx"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 26 - "navigation-menu.tsx"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 27 - "Global Constraints"
Cohesion: 0.20
Nodes (9): Global Constraints, Task 1: Build `BriefModal` Component, Task 2: Build `Navbar` Component, Task 3: Build `HeroSection` Component, Task 4: Build `BentoServices` Component, Task 5: Build `ShowcaseHighlight` Component, Task 6: Build `Footer` Component, Task 7: Assemble Landing Page in `app/page.tsx` & Verify Build (+1 more)

### Community 28 - "pagination.tsx"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 30 - "button.tsx"
Cohesion: 0.13
Nodes (16): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Field(), FieldContent(), FieldDescription(), FieldError() (+8 more)

### Community 32 - "empty.tsx"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 33 - "dependencies"
Cohesion: 0.29
Nodes (7): better-auth, dependencies, better-auth, radix-ui, tw-animate-css, radix-ui, tw-animate-css

### Community 34 - "avatar.tsx"
Cohesion: 0.29
Nodes (6): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage()

### Community 35 - "bubble.tsx"
Cohesion: 0.38
Nodes (6): Bubble(), BubbleContent(), BubbleGroup(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 36 - "message.tsx"
Cohesion: 0.06
Nodes (37): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+29 more)

### Community 37 - "message-scroller.tsx"
Cohesion: 0.29
Nodes (5): MessageScroller(), MessageScrollerButton(), MessageScrollerContent(), MessageScrollerItem(), MessageScrollerViewport()

### Community 38 - "alert.tsx"
Cohesion: 0.40
Nodes (5): Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants

### Community 39 - "tabs.tsx"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 40 - "RTK - Rust Token Killer (Google Antigravity)"
Cohesion: 0.40
Nodes (4): Meta Commands, RTK - Rust Token Killer (Google Antigravity), Rule, Why

### Community 42 - "marker.tsx"
Cohesion: 0.50
Nodes (4): Marker(), MarkerContent(), MarkerIcon(), markerVariants

### Community 44 - "Global Constraints"
Cohesion: 0.40
Nodes (4): Global Constraints, Task 1: CSS Design Tokens & Light Mode Clean-Up, Task 2: Font Integration & Root Layout Setup, TeFa Portal Foundation & Design System Implementation Plan

### Community 46 - "opencode.json"
Cohesion: 0.50
Nodes (3): plugin, $schema, .opencode/plugins/graphify.js

### Community 47 - "kbd.tsx"
Cohesion: 0.22
Nodes (8): Global Constraints, Master TeFa Portal V1 Implementation Plan, Task 1: Database Schema & Utilities (`lib/db/schema.ts` & `lib/utils/student-class.ts`), Task 2: Build Showcase Catalogue Page (`/showcase`) & Detail Page (`/showcase/[id]`), Task 3: Build Student Directory Page (`/students`) & Profile Page (`/students/[id]`), Task 4: Build Server Action / API Route for Form Brief Lead Generator, Task 5: Build Admin CMS Dashboard (`/admin`), Task 6: Final Verification & Build Check

### Community 48 - "radio-group.tsx"
Cohesion: 0.11
Nodes (13): geist, inter, metadata, RootLayout(), viewport, env, db, sql (+5 more)

### Community 49 - "@base-ui/react"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 74 - "popover.tsx"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 82 - "Global Constraints"
Cohesion: 0.29
Nodes (6): Detailed Verification & Testing Plan for TeFa Portal V1, Global Constraints, Task 1: Unit Test Suite for Class Automation Logic (`tests/student-class.test.ts`), Task 2: Data Integrity Test Suite (`tests/data-integrity.test.ts`), Task 3: Form Brief API Test Suite (`tests/api-brief.test.ts`), Task 4: Complete Automated Test Execution & Production Verification

### Community 83 - "Next.js, SEO, and shadcn/ui Optimization Implementation Plan"
Cohesion: 0.33
Nodes (5): Next.js, SEO, and shadcn/ui Optimization Implementation Plan, Task 1: Create `app/robots.ts` and `app/sitemap.ts` for SEO Compliance, Task 2: Enhance Root Layout Metadata & Viewport (`app/layout.tsx`), Task 3: Refactor Spacing & shadcn Rules in Landing Components, Task 4: Final Verification & Test Execution

## Knowledge Gaps
- **190 isolated node(s):** `$schema`, `.opencode/plugins/graphify.js`, `BriefItem`, `mockBriefs`, `inter` (+185 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `alert-dialog.tsx` to `Core Runtime Dependencies`, `Next.js App Components`, `Package Manager Configuration`, `TypeScript Inclusions & Exclusions`, `Tailwind CSS Styling Rules`, `menubar.tsx`, `context-menu.tsx`, `dropdown-menu.tsx`, `page.tsx`, `attachment.tsx`, `drawer.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `button.tsx`, `empty.tsx`, `avatar.tsx`, `bubble.tsx`, `message.tsx`, `message-scroller.tsx`, `alert.tsx`, `tabs.tsx`, `marker.tsx`, `radio-group.tsx`, `@base-ui/react`, `popover.tsx`, `resizable.tsx`?**
  _High betweenness centrality (0.503) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `Core Runtime Dependencies`, `Development Tooling & Types`, `cn`, `class-variance-authority`, `clsx`, `date-fns`, `dotenv`, `drizzle-orm`, `embla-carousel-react`, `input-otp`, `lucide-react`, `@neondatabase/serverless`, `next`, `next-themes`, `react-day-picker`, `react-dom`, `react-resizable-panels`, `recharts`, `shadcn`, `@shadcn/react`, `sonner`, `tailwind-merge`, `vaul`, `cmdk`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `react` connect `Core Runtime Dependencies` to `@base-ui/react`, `Package Manager Configuration`, `TypeScript Inclusions & Exclusions`, `dependencies`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **What connects `$schema`, `.opencode/plugins/graphify.js`, `BriefItem` to the rest of the system?**
  _190 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06341463414634146 - nodes in this community are weakly interconnected._
- **Should `Development Tooling & Types` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._