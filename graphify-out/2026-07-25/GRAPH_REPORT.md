# Graph Report - .  (2026-07-25)

## Corpus Check
- Corpus is ~1,413 words - fits in a single context window. You may not need a graph.

## Summary
- 141 nodes · 137 edges · 16 communities (9 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 8 edges
3. `scripts` - 7 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `cn()` - 5 edges
7. `Button()` - 4 edges
8. `lib` - 4 edges
9. `react` - 3 edges
10. `RootLayout()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `Next.js Template Overview` --conceptually_related_to--> `Next.js Agent Rules`  [INFERRED]
  README.md → AGENTS.md
- `ThemeHotkey()` --references--> `react`  [EXTRACTED]
  components/theme-provider.tsx → package.json
- `Button()` --calls--> `cn()`  [EXTRACTED]
  components/ui/button.tsx → lib/utils.ts
- `Graphify Knowledge Graph Rule` --conceptually_related_to--> `Agents Graphify Integration Rules`  [EXTRACTED]
  .agents/rules/graphify.md → AGENTS.md

## Import Cycles
- None detected.

## Communities (16 total, 7 thin omitted)

### Community 0 - "Core Runtime Dependencies"
Cohesion: 0.08
Nodes (24): class-variance-authority, clsx, ThemeHotkey(), lucide-react, next, next-themes, dependencies, class-variance-authority (+16 more)

### Community 1 - "Development Tooling & Types"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, tailwindcss (+13 more)

### Community 2 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Shadcn UI Configuration"
Cohesion: 0.12
Nodes (15): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+7 more)

### Community 4 - "Next.js App Components"
Cohesion: 0.20
Nodes (8): fontMono, geistHeading, inter, RootLayout(), ThemeProvider(), Button(), buttonVariants, cn()

### Community 5 - "Package Manager Configuration"
Cohesion: 0.15
Nodes (12): name, packageManager, private, scripts, build, dev, format, lint (+4 more)

### Community 6 - "TypeScript Inclusions & Exclusions"
Cohesion: 0.18
Nodes (10): **/*.mts, next.config.ts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+2 more)

### Community 7 - "Tailwind CSS Styling Rules"
Cohesion: 0.33
Nodes (6): tailwind, baseColor, config, css, cssVariables, prefix

### Community 8 - "Graphify Rule System"
Cohesion: 0.67
Nodes (3): Graphify Knowledge Graph Rule, Graphify Workflow Definition, Agents Graphify Integration Rules

## Knowledge Gaps
- **88 isolated node(s):** `geistHeading`, `inter`, `fontMono`, `$schema`, `style` (+83 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Core Runtime Dependencies` to `Package Manager Configuration`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Tooling & Types` to `Package Manager Configuration`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `geistHeading`, `inter`, `fontMono` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Development Tooling & Types` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Shadcn UI Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._