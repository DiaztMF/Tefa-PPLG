"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoServices } from "@/components/landing/bento-services";
import { ShowcaseHighlight } from "@/components/landing/showcase-highlight";
import { Footer } from "@/components/landing/footer";
import { BriefModal } from "@/components/landing/brief-modal";

export default function Home() {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <Navbar onOpenBriefModal={() => setIsBriefModalOpen(true)} />
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
