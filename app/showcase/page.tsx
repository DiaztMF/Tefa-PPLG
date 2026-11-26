import type { Metadata } from "next";
import { getProjects } from "@/lib/db/queries";
import { ShowcaseCatalogue } from "@/components/showcase/showcase-catalogue";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog Portofolio & Showcase",
  description:
    "Arsip lengkap proyek perangkat lunak industri karya siswa Teaching Factory PPLG SMK Negeri 2 Surakarta.",
};

export default async function ShowcasePage() {
  const projects = await getProjects();
  return <ShowcaseCatalogue projects={projects} />;
}
