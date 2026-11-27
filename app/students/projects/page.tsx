import Link from "next/link"
import { headers } from "next/headers"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"
import { getProjects, getStudentByUser } from "@/lib/db/queries"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

const STATUS_LABELS: Record<string, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
}

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
}

function ProjectStatusBadge({ status }: { status?: string }) {
  const value = status ?? "approved"
  return (
    <Badge variant={STATUS_VARIANTS[value] ?? "outline"}>
      {STATUS_LABELS[value] ?? value}
    </Badge>
  )
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function StudentProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-sm text-center space-y-4">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Proyek Saya
          </h1>
          <p className="text-sm text-muted-foreground">
            Silakan login terlebih dahulu untuk melihat status proyek Anda.
          </p>
          <Button asChild className="w-full">
            <Link href="/login?callbackUrl=/students/projects">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const student = await getStudentByUser(
    session.user.id,
    session.user.email
  )
  const projects = await getProjects()
  const myProjects = student
    ? projects.filter(
        (project) =>
          project.submittedBy === student.id ||
          project.team.some((member) => member.studentId === student.id)
      )
    : []

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <nav className="w-full bg-card border-b border-border px-4 sm:px-6 py-3">
        <Link
          href="/students"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Direktori Siswa
        </Link>
      </nav>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                Proyek Saya
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pantau status pengajuan proyek yang Anda kirim.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/students/submit">Ajukan Proyek Baru</Link>
            </Button>
          </div>

          {myProjects.length === 0 ? (
            <div className="p-8 rounded-xl bg-card border border-border text-center text-sm text-muted-foreground">
              Belum ada proyek yang diajukan.
            </div>
          ) : (
            <ul className="space-y-3">
              {myProjects.map((project) => (
                <li
                  key={project.id}
                  className="p-5 rounded-xl bg-card border border-border shadow-sm space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="font-heading font-semibold text-base text-foreground">
                      {project.title}
                    </h2>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Diajukan pada {formatDate(project.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
