# Tefa-PPLG

Teaching Factory (TeFa) project showcase and student software development workspace platform for PPLG SMKN 2 Surakarta.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-black)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-teal)](https://tailwindcss.com/)

## Installation

Clone the repository and install dependencies with pnpm:

```bash
git clone https://github.com/DiaztMF/Tefa-PPLG.git
cd Tefa-PPLG
pnpm install
```

## Quick Start

Start the local development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the Teaching Factory portal.

## What is Tefa-PPLG?

`Tefa-PPLG` is a web portal designed to showcase client projects, industry software products, and vocational work orders developed by students under the Teaching Factory curriculum at SMKN 2 Surakarta (PPLG department).

## Why Tefa-PPLG?

Vocational schools need industry-standard mechanisms to demonstrate student engineering capabilities and handle incoming software contracts. `Tefa-PPLG` establishes a formal, credible project showcase interface adhering to modern frontend best practices.

## API / Routes

### Core Pages
- `/`: Public project portfolio and vocational capabilities matrix.
- `/projects`: Detailed client deliverables, student team credits, and repository links.
- `/inquiry`: Contact and software order intake form for external industrial partners.

## Examples

Importing and composing accessible design primitives:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProjectCard({ title, client }: { title: string; client: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Client: {client}</p>
        <Button className="mt-4 w-full">View Case Study</Button>
      </CardContent>
    </Card>
  );
}
```

## Architecture & Development Guides

- Frontend Core: Next.js 15 App Router, React 19, and TypeScript.
- Design System: Radix UI primitives styled with Tailwind CSS via shadcn/ui.
- Code Standards: ESLint flat config with Next.js compiler optimizations.

## License

MIT License. See [LICENSE](LICENSE) for full details.