"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Newspaper,
  LogOut,
  Menu,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Kelola Proyek", icon: Briefcase },
  { href: "/admin/students", label: "Data Siswa", icon: Users },
  { href: "/admin/briefs", label: "Inbound Briefs", icon: MessageSquare },
  { href: "/admin/news", label: "Berita & Artikel", icon: Newspaper },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased">
      <aside className="w-64 bg-card border-r border-border p-6 hidden md:flex flex-col shrink-0 h-screen">
        <div className="flex flex-col h-full">
          <div className="space-y-8 flex-1 flex flex-col">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Logo size={36} showText={true} subtitle="CMS Portal" />
            </Link>

            <nav className="space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-border/60 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Lihat Portal Publik
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-xs text-destructive hover:underline transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar Sesi Admin
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Menu Admin"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-card">
                <SheetHeader>
                  <SheetTitle>TeFa Admin CMS</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-3 pt-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
                <div className="mt-auto px-3 pt-6 border-t border-border/60 space-y-3">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat Portal Publik
                    </Link>
                  </SheetClose>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-xs text-destructive hover:underline transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar Sesi Admin
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="font-heading font-semibold text-base text-foreground">
              Admin CMS Studio Dashboard
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Admin TeFa PPLG
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-heading font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
