"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, GraduationCap, Briefcase } from "lucide-react";

interface HeroSectionProps {
  onOpenBriefModal: () => void;
}

interface Stats {
  projectsCount: number;
  studentsCount: number;
  alumniCount: number;
}

const easing = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.08, ease: easing },
  }),
};

export function HeroSection({ onOpenBriefModal }: HeroSectionProps) {
  const [stats, setStats] = useState<Stats>({
    projectsCount: 0,
    studentsCount: 0,
    alumniCount: 0,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  const statItems = [
    {
      label: "Proyek Selesai",
      value: stats.projectsCount,
      icon: Briefcase,
    },
    {
      label: "Talenta Aktif",
      value: stats.studentsCount,
      icon: Users,
    },
    {
      label: "Alumni Lulus",
      value: stats.alumniCount,
      icon: GraduationCap,
    },
  ];

  return (
    <section
      id="beranda"
      className="relative min-h-[calc(100vh-72px)] flex items-center justify-center bg-subtle-grid py-20 overflow-hidden"
    >
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Display Headline */}
        <motion.h1
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.1]"
          variants={itemVariants}
        >
          Solusi Perangkat Lunak Industri Karya{" "}
          <span className="text-primary">Talenta SMKN 2 Surakarta</span>
        </motion.h1>

        {/* Lead Subtext */}
        <motion.p
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Platform showcase portofolio dan pemesanan jasa pengembangan software resmi TeFa PPLG SMKN 2 Surakarta. Dikerjakan oleh siswa berbakat dalam pengawasan profesional instruktur industri.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          variants={itemVariants}
        >
          <Button
            onClick={onOpenBriefModal}
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all group"
          >
            Mulai Proyek
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-border text-foreground hover:bg-secondary px-8 py-4 text-base font-medium rounded-lg"
          >
            <Link href="#showcase">Jelajahi Showcase</Link>
          </Button>
        </motion.div>

        {/* Real Stat Strip */}
        <motion.div
          className="pt-12 w-full max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary border border-primary/20 p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {statItems.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                  variants={statVariants}
                  custom={i}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3 shrink-0">
                    <stat.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="font-heading font-bold text-3xl sm:text-4xl text-foreground tabular-nums">
                    {stat.value.toLocaleString("id-ID")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            {/* Subtle divider lines between stats */}
            <div className="hidden sm:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-primary/20 -translate-x-1/2" aria-hidden="true" />
            <div className="hidden sm:block absolute left-1/4 top-1/4 bottom-1/4 w-px bg-primary/20" aria-hidden="true" />
            <div className="hidden sm:block absolute left-3/4 top-1/4 bottom-1/4 w-px bg-primary/20" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}