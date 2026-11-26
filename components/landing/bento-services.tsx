"use client";

import { Code2, Smartphone, Palette, Box, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function BentoServices() {
  const services = [
    {
      id: "web-dev",
      title: "Web Application Development",
      category: "Custom Software",
      description: "Pengembangan aplikasi web modern, responsif, dan scalable menggunakan React, Next.js, dan cloud backend.",
      icon: Code2,
      features: ["Full-Stack SaaS", "Portal Perusahaan", "Dashboard Internal"],
      cols: 2,
      bgVariant: "blue-tint",
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      category: "Mobile Native & Cross-Platform",
      description: "Aplikasi Android & iOS performa tinggi berbasis Flutter atau React Native.",
      icon: Smartphone,
      features: ["Android & iOS", "API Integration", "Offline-first Storage"],
      cols: 1,
      bgVariant: "green-tint",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design & Prototyping",
      category: "Product Design",
      description: "Rancangan antarmuka pengguna intuitive dengan Figma design system dan prototype interaktif.",
      icon: Palette,
      features: ["Figma Design System", "User Flow & Wireframing", "Interactive Prototype"],
      cols: 1,
      bgVariant: "purple-tint",
    },
    {
      id: "digital-products",
      title: "Digital Products & Templates",
      category: "Ready-to-Use Solutions",
      description: "Templat aplikasi web, starter kit, dan aset digital siap pakai untuk mempercepat proyek bisnis Anda.",
      icon: Box,
      features: ["Starter Kits", "Customizable Templates", "Technical Documentation"],
      cols: 2,
      bgVariant: "orange-tint",
    },
  ];

  const bgStyles = {
    "blue-tint": "bg-gradient-to-br from-blue-50/60 to-blue-100/40",
    "green-tint": "bg-gradient-to-br from-green-50/60 to-green-100/40",
    "purple-tint": "bg-gradient-to-br from-purple-50/60 to-purple-100/40",
    "orange-tint": "bg-gradient-to-br from-orange-50/60 to-orange-100/40",
  } as const;

  type BgVariant = keyof typeof bgStyles;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <section id="layanan" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Section Header - No eyebrow label per EYEBROW rule */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            Solusi Digital Terpadu Siap Pakai & Custom
          </h2>
          <p className="text-muted-foreground text-base">
            Kami melayani berbagai kebutuhan transformasi digital usaha Anda dengan standar kualitas industri.
          </p>
        </div>

        {/* Asymmetrical Bento Grid: 4 items → 2 wide (col-span-2) + 2 narrow (col-span-1) = perfect 4-col grid */}
        <motion.div
          className="grid grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ gridAutoFlow: "dense" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isWide = service.cols === 2;
            const colSpan = isWide ? "col-span-2" : "col-span-1";
            const rowSpan = isWide ? "row-span-2" : "row-span-1";

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`${colSpan} ${rowSpan}`}
              >
                <div className="relative h-full">
                  {/* Outer bezel - subtle border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-primary/10 bg-[var(--card)]/50 backdrop-blur-sm pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Inner card with background diversity */}
                  <motion.div
                    className={`relative h-full rounded-xl p-8 flex flex-col justify-between group ${bgStyles[service.bgVariant as BgVariant]} border border-border/60 transition-all duration-300 hover:shadow-xl hover:border-primary/20`}
                    whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(19, 106, 213, 0.15)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm border border-border/30">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {service.category}
                        </span>
                        <h3 className="font-heading font-semibold text-xl text-foreground leading-tight">
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
                          className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1 text-primary group-hover:text-primary-foreground transition-colors" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
