"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenBriefModal: () => void;
}

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/showcase", label: "Showcase Proyek" },
  { href: "/students", label: "Direktori Siswa" },
  { href: "/news", label: "Berita" },
];

export function Navbar({ onOpenBriefModal }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full h-[72px] bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Logo href="/" size={40} showText subtitle="SMK Showcase" priority />

        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : !link.href.startsWith("/#") &&
                  pathname.startsWith(link.href);

            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (link.href === "/#layanan") {
                e.preventDefault();
                router.push("/");
                setTimeout(() => {
                  document.querySelector("#layanan")?.scrollIntoView({ behavior: "smooth" });
                }, 0);
              }
            };

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className={cn(
                  "hover:text-primary transition-colors",
                  isActive && "text-primary font-semibold"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={onOpenBriefModal}
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-lg text-sm transition-all shadow-sm hover:shadow"
          >
            Mulai Proyek
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card">
              <SheetHeader>
                <SheetTitle>Navigasi TeFa PPLG</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 pt-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    onClick={onOpenBriefModal}
                    className="mt-4 w-full bg-primary text-primary-foreground"
                  >
                    Mulai Proyek
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}