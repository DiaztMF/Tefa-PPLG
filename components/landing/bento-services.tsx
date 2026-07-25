"use client";

import { Globe, Smartphone, Palette, Package } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Pembuatan landing page, portal perusahaan, dan aplikasi web kompleks berbasis Next.js & React dengan performa tinggi.",
    tag: "Full-Stack Web",
    colSpan: "sm:col-span-2 lg:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Pengembangan aplikasi iOS & Android modern responsif dengan performa native dan UI bersih.",
    tag: "iOS & Android",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Perancangan antarmuka pengguna interaktif, design system, dan prototipe aplikasi kelas dunia di Figma.",
    tag: "Design System",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    icon: Package,
    title: "Digital Products & Templates",
    desc: "Koleksi komponen UI, boilerplate Next.js, dan template siap pakai hasil inovasi tim riset siswa TeFa.",
    tag: "Ready Assets",
    colSpan: "sm:col-span-2 lg:col-span-2",
  },
];

export function BentoServices() {
  return (
    <section id="layanan" className="py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-foreground tracking-tight">
            Layanan Unggulan Studio TeFa
          </h2>
          <p className="text-muted-foreground text-base">
            Kami menghadirkan berbagai produk digital berkualitas tinggi untuk membantu akselerasi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className={`${svc.colSpan} p-8 rounded-xl bg-background border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/40 flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
