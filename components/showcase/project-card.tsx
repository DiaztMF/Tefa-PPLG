import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/lib/db/queries";
import { getProjectPreviewImage } from "@/lib/utils/preview-image";
import { ArrowRight, Users } from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const previewImage = getProjectPreviewImage(
    project.imageUrl,
    project.liveUrl
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="bg-card rounded-xl border border-border overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
    >
      <div>
        {/* Frame bar: domain + live status */}
        <div className="bg-muted px-4 py-2.5 border-b border-border flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-muted-foreground truncate">
            {project.liveUrl ||
              `https://tefa.smkn2surakarta.sch.id/${project.id}`}
          </span>
          {project.liveUrl && (
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium shrink-0">
              Live Preview
            </span>
          )}
        </div>

        {/* Screenshot / Deployment Preview Area */}
        <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`Preview ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            /* Fallback: clean typographic frame instead of emoji + gradient */
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 p-6 flex flex-col items-center justify-center text-white text-center gap-2">
              <span className="font-heading font-semibold text-sm opacity-90 line-clamp-1">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {project.category}
            </span>
            <span className="inline-flex items-center text-xs text-muted-foreground gap-1 bg-secondary px-2.5 py-1 rounded-full border border-border">
              <Users className="w-3 h-3 text-primary" />
              {project.team.length} Siswa
            </span>
          </div>

          <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Action Link */}
      <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
        <Link
          href={`/showcase/${project.id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1 pt-4"
        >
          Lihat Detail Proyek
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
