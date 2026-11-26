"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoServices } from "@/components/landing/bento-services";
import { ShowcaseHighlight } from "@/components/landing/showcase-highlight";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";

export default function Home() {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "layanan") {
      document.querySelector("#layanan")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar />
      <main className="flex-1">
        <HeroSection onOpenBriefModal={() => setIsBriefModalOpen(true)} />
        <BentoServices />
        <ShowcaseHighlight />
      </main>
      <Footer />
      <BriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />
    </div>
  );
}
