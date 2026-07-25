"use client";

import { Code2, Smartphone, Palette, Box, CheckCircle2 } from "lucide-react";

export function BentoServices() {
  const services = [
    {
      id: "web-dev",
      title: "Web Application Development",
      category: "Custom Software",
      description: "Pengembangan aplikasi web modern, responsif, dan scalable menggunakan React, Next.js, dan cloud backend.",
      icon: Code2,
      features: ["Full-Stack SaaS", "Portal Perusahaan", "Dashboard Internal"],
      cols: "md:col-span-2",
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      category: "Mobile Native & Cross-Platform",
      description: "Aplikasi Android & iOS performa tinggi berbasis Flutter atau React Native.",
      icon: Smartphone,
      features: ["Android & iOS", "API Integration", "Offline-first Storage"],
      cols: "md:col-span-1",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design & Prototyping",
      category: "Product Design",
      description: "Rancangan antarmuka pengguna intuitive dengan Figma design system dan prototype interaktif.",
      icon: Palette,
      features: ["Figma Design System", "User Flow & Wireframing", "Interactive Prototype"],
      cols: "md:col-span-1",
    },
    {
      id: "digital-products",
      title: "Digital Products & Templates",
      category: "Ready-to-Use Solutions",
      description: "Templat aplikasi web, starter kit, dan aset digital siap pakai untuk mempercepat proyek bisnis Anda.",
      icon: Box,
      features: ["Starter Kits", "Customizable Templates", "Technical Documentation"],
      cols: "md:col-span-2",
    },
  ];

  return (
    <section id="layanan" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Layanan Unggulan Teaching Factory
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            Solusi Digital Terpadu Siap Pakai & Custom
          </h2>
          <p className="text-muted-foreground text-base">
            Kami melayani berbagai kebutuhan transformasi digital usaha Anda dengan standar kualitas industri.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`p-8 rounded-2xl bg-card border border-border flex flex-col justify-between hover:shadow-lg transition-all duration-300 group ${service.cols}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/40 mt-6 flex flex-wrap gap-2">
                  {service.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-primary border border-primary/20"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1 text-primary" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
