"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/showcase", label: "Showcase Proyek" },
  { href: "/students", label: "Direktori Siswa" },
  { href: "/news", label: "Berita" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hash] = useState<string>(
    () => (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "")
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-[72px] bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Logo href="/" size={40} showText subtitle="SMK Showcase" priority />

        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground"
        >
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith("/#");
            const [, linkHash] = link.href.split("#");
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : isHashLink
                ? pathname === "/" && linkHash === hash
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isHashLink) {
                e.preventDefault();
                if (pathname === "/") {
                  document.querySelector(`#${linkHash}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  router.push("/");
                  router.push("/#layanan");
                  setTimeout(() => {
                    document.querySelector(`#${linkHash}`)?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }
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
            size="icon"
            variant="outline"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden"
            aria-label="Menu Admin"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg"
          >
            <Menu className="w-4 h-4 mr-2" />
            Masuk Admin
          </Button>
        </div>
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 bg-card">
          <SheetHeader>
            <SheetTitle>Menu Admin</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-3 pt-2">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("/#");
              const [, linkHash] = link.href.split("#");
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : isHashLink
                  ? pathname === "/" && linkHash === hash
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}