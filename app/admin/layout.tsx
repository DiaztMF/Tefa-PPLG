"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, LayoutDashboard, Briefcase, Users, MessageSquare, Newspaper, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Kelola Proyek", icon: Briefcase },
    { href: "/admin/students", label: "Data Siswa", icon: Users },
    { href: "/admin/briefs", label: "Inbound Briefs", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-base shadow-sm">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-bold text-foreground text-sm">TeFa Admin</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">CMS Portal</div>
            </div>
          </Link>

          <nav className="space-y-1">
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

        <div className="pt-6 border-t border-border/60">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar ke Portal Publik
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
          <div className="font-heading font-semibold text-base text-foreground">
            Admin CMS Studio Dashboard
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Admin TeFa PPLG</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-heading font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
