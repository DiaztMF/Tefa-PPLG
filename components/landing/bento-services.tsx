"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Code2,
  Smartphone,
  Palette,
  Package,
  WifiOff,
  Check,
  MousePointer2,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Service = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  /** Lebar kartu pada grid 12 kolom (lg+) */
  span: "lg:col-span-7" | "lg:col-span-5";
  visual: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "web",
    icon: Code2,
    eyebrow: "Custom Software",
    title: "Web Application Development",
    description:
      "Aplikasi web modern, responsif, dan scalable dengan React, Next.js, dan cloud backend.",
    tags: ["Full-Stack SaaS", "Portal Perusahaan", "Dashboard Internal"],
    span: "lg:col-span-7",
    visual: <WebVisual />,
  },
  {
    id: "mobile",
    icon: Smartphone,
    eyebrow: "Mobile Native & Cross-Platform",
    title: "Mobile App Development",
    description:
      "Aplikasi Android & iOS berperforma tinggi berbasis Flutter atau React Native.",
    tags: ["Android & iOS", "API Integration", "Offline-first"],
    span: "lg:col-span-5",
    visual: <MobileVisual />,
  },
  {
    id: "design",
    icon: Palette,
    eyebrow: "Product Design",
    title: "UI/UX Design & Prototyping",
    description:
      "Antarmuka yang intuitif lewat Figma design system dan prototype interaktif.",
    tags: ["Design System", "User Flow", "Prototype"],
    span: "lg:col-span-5",
    visual: <DesignVisual />,
  },
  {
    id: "products",
    icon: Package,
    eyebrow: "Ready-to-Use Solutions",
    title: "Digital Products & Templates",
    description:
      "Templat aplikasi web, starter kit, dan aset digital siap pakai untuk mempercepat proyek bisnis Anda.",
    tags: ["Starter Kits", "Customizable Templates", "Technical Docs"],
    span: "lg:col-span-7",
    visual: <ProductsVisual />,
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function BentoServices() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="layanan"
      className="scroll-mt-24 bg-[#FAFAFA] px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium tracking-wide text-[#136AD5]">
            Layanan
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Solusi digital siap pakai &amp; custom
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            Kebutuhan transformasi digital usaha Anda, dikerjakan siswa SMK
            dengan standar kualitas industri.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-12 lg:gap-5"
        >
          {SERVICES.map((s) => (
            <motion.li
              key={s.id}
              variants={item}
              className={`${s.span} flex`}
            >
              <ServiceCard service={s} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group flex w-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-12px_rgba(19,106,213,0.22)]">
      {/* Visual */}
      <div
        aria-hidden
        className="relative h-64 overflow-hidden rounded-[20px] border border-slate-200/70 bg-slate-50 sm:h-72"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(148 163 184 / 0.35) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        {/* fade the dot grid toward the edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(248_250_252)_100%)]" />
        {service.visual}
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5">
        <div className="flex items-center gap-2 text-[#136AD5]">
          <Icon className="size-4" strokeWidth={2} aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.08em]">
            {service.eyebrow}
          </span>
        </div>
        <h3 className="font-heading mt-2.5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md text-pretty text-[15px] leading-relaxed text-slate-600">
          {service.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2 pt-1">
          {service.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared bits for the mini-UI illustrations                                 */
/* -------------------------------------------------------------------------- */

const surface =
  "rounded-xl border border-slate-200 bg-white shadow-[0_4px_16px_-6px_rgba(15,23,42,0.12)]";

function Bar({ className = "" }: { className?: string }) {
  return <div className={`h-2 rounded-full bg-slate-200/80 ${className}`} />;
}

/* -------------------------------------------------------------------------- */
/*  1. Web — browser window with a dashboard                                  */
/* -------------------------------------------------------------------------- */

function WebVisual() {
  const bars = [38, 56, 44, 72, 52, 86, 64];
  return (
    <>
      <div
        className={`${surface} absolute inset-x-5 top-6 bottom-[-12px] overflow-hidden rounded-b-none sm:inset-x-10 transition-transform duration-500 group-hover:-translate-y-1`}
      >
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-3.5 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-slate-200" />
            <span className="size-2 rounded-full bg-slate-200" />
            <span className="size-2 rounded-full bg-slate-200" />
          </div>
          <div className="mx-auto flex h-5 w-44 items-center justify-center rounded-md bg-slate-100 text-[10px] text-slate-500">
            app.tefa-pplg.id/dashboard
          </div>
          <div className="w-9" />
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden w-28 shrink-0 space-y-3 border-r border-slate-100 p-3.5 sm:block">
            <div className="h-2.5 w-14 rounded-full bg-[#136AD5]" />
            <Bar className="w-16" />
            <Bar className="w-12" />
            <Bar className="w-14" />
            <Bar className="w-10" />
          </div>

          {/* main */}
          <div className="flex-1 space-y-3 p-3.5">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                ["Proyek", "24"],
                ["Brief", "08"],
                ["Uptime", "99.9%"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5"
                >
                  <p className="text-[9px] text-slate-500">{k}</p>
                  <p className="font-heading mt-0.5 text-sm font-semibold text-slate-900">
                    {v}
                  </p>
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="flex h-20 items-end gap-2 rounded-lg border border-slate-100 p-2.5">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ height: `${h}%`, transformOrigin: "bottom" }}
                  className={`flex-1 rounded-sm ${
                    i === 5 ? "bg-[#136AD5]" : "bg-[#136AD5]/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* status chip */}
      <div
        className={`${surface} absolute bottom-5 right-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium text-slate-700 sm:right-6`}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        Deployed
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Mobile — phone + offline toast                                         */
/* -------------------------------------------------------------------------- */

function MobileVisual() {
  return (
    <>
      <div className="absolute left-1/2 top-7 h-72 w-40 -translate-x-1/2 rounded-[28px] border border-slate-300 bg-white p-1.5 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.25)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:w-44">
        <div className="h-full rounded-[22px] bg-slate-50 p-3">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-slate-200" />
          <div className="mt-4 flex items-center justify-between">
            <div className="h-2.5 w-16 rounded-full bg-slate-800/80" />
            <div className="size-5 rounded-full bg-[#136AD5]/15" />
          </div>
          <div className="mt-4 space-y-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-2"
              >
                <div
                  className={`size-7 shrink-0 rounded-lg ${
                    i === 0 ? "bg-[#136AD5]" : "bg-[#136AD5]/15"
                  }`}
                />
                <div className="flex-1 space-y-1.5">
                  <Bar className="w-3/4" />
                  <Bar className="w-1/2 !bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${surface} absolute left-4 top-[58%] flex items-center gap-2.5 px-3 py-2 sm:left-6`}
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <WifiOff className="size-3.5" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-slate-800">Mode offline</p>
          <p className="text-[10px] text-slate-500">3 perubahan tersimpan</p>
        </div>
      </div>

      <div
        className={`${surface} absolute right-4 top-[26%] flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-slate-700 sm:right-6`}
      >
        <Check className="size-3 text-emerald-600" strokeWidth={3} aria-hidden />
        Tersinkron
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Design — canvas with two frames, connector, cursor, swatches           */
/* -------------------------------------------------------------------------- */

function DesignVisual() {
  return (
    <>
      {/* connector (percent-based so it tracks the frames at any width) */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M42 40 C 49 40, 49 55, 56 55"
          stroke="#136AD5"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </svg>
      <span className="absolute left-[42%] top-[40%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#136AD5] bg-white" />
      <span className="absolute left-[56%] top-[55%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#136AD5]" />

      {/* frame A */}
      <div className="absolute left-[8%] top-[16%] w-[34%]">
        <p className="mb-1.5 text-[10px] font-medium text-slate-500">Login</p>
        <div className={`${surface} space-y-2 p-3 transition-transform duration-500 group-hover:-translate-y-1`}>
          <div className="h-2 w-8 rounded-full bg-slate-800/80" />
          <div className="h-5 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-5 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-5 rounded-md bg-[#136AD5]" />
        </div>
      </div>

      {/* frame B — selected */}
      <div className="absolute right-[8%] top-[30%] w-[36%]">
        <p className="mb-1.5 text-[10px] font-medium text-[#136AD5]">Dashboard</p>
        <div className="relative">
          <div
            className={`${surface} space-y-2 border-[#136AD5] p-3 ring-2 ring-[#136AD5]/15 transition-transform duration-500 group-hover:translate-y-1`}
          >
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-8 rounded-md bg-[#136AD5]/10" />
              <div className="h-8 rounded-md bg-slate-100" />
            </div>
            <Bar className="w-full" />
            <Bar className="w-2/3" />
          </div>
          {/* handles */}
          {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
            (p) => (
              <span
                key={p}
                className={`absolute ${p} size-2 rounded-[2px] border border-[#136AD5] bg-white`}
              />
            ),
          )}
        </div>
        <div className="absolute -bottom-9 -right-2 flex items-start">
          <MousePointer2 className="size-4 fill-[#136AD5] text-[#136AD5]" aria-hidden />
          <span className="-ml-0.5 mt-3 rounded-full bg-[#136AD5] px-2 py-0.5 text-[10px] font-medium text-white">
            Rani
          </span>
        </div>
      </div>

      {/* swatches */}
      <div className={`${surface} absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full p-1.5 sm:left-6`}>
        {["#136AD5", "#0B3F85", "#DCE9FB", "#0F172A"].map((c) => (
          <span
            key={c}
            className="size-4 rounded-full border border-black/5"
            style={{ background: c }}
          />
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Products — stacked template cards                                      */
/* -------------------------------------------------------------------------- */

function ProductsVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-40 w-[78%] max-w-sm">
        {/* back cards: only their top edge peeks out */}
        <div
          className={`${surface} absolute inset-x-6 top-0 h-16 opacity-60 transition-transform duration-500 group-hover:-translate-y-2`}
        />
        <div
          className={`${surface} absolute inset-x-3 top-3 h-16 opacity-85 transition-transform duration-500 group-hover:-translate-y-1`}
        />

        {/* front card */}
        <div
          className={`${surface} absolute inset-x-0 top-7 z-10 p-4 transition-transform duration-500 group-hover:translate-y-1`}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#136AD5] text-white">
              <Package className="size-5" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="font-heading text-sm font-semibold text-slate-900">
                Starter Kit Next.js
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Auth · Database · UI kit
              </p>
            </div>
            <span className="ml-auto hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 sm:inline">
              Siap pakai
            </span>
          </div>
          <div className="mt-3.5 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
            <BookOpen className="size-3.5" aria-hidden />
            Dokumentasi teknis disertakan
          </div>
        </div>
      </div>
    </div>
  );
}
