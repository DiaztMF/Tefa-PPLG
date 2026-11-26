"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
                  document.querySelector(`#${linkHash}`)?.scrollIntoView({ behavior: "smooth" });
                } else {
                  router.push("/");
                  router.push("/#layanan");
                  setTimeout(() => {
                    document.querySelector(`#${linkHash}`)?.scrollIntoView({ behavior: "smooth" });
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
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Masuk Admin
          </Button>
        </div>
      </div>
    </header>
  );
}
