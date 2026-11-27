"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ArrowLeft } from "lucide-react";

interface StudentProjectFormData {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStackStr: string;
  liveUrl: string;
  repoUrl: string;
  teamMemberIds: string[];
  teamMemberRoles: Record<string, string>;
}

const CATEGORIES = [
  "Web Application",
  "Mobile Application",
  "UI/UX Design",
  "Digital Products & Templates",
];

export default function StudentSubmitProjectPage() {
  const [formData, setFormData] = useState<StudentProjectFormData>({
    title: "",
    category: CATEGORIES[0],
    description: "",
    longDescription: "",
    techStackStr: "",
    liveUrl: "",
    repoUrl: "",
    teamMemberIds: [],
    teamMemberRoles: {},
  });

  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/students/public", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data siswa.");
        return res.json();
      })
      .then((data: { students?: { id: string; name: string }[] }) => {
        if (!controller.signal.aborted) setStudents(data.students || []);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setErrorMsg("Gagal menghubungi server.");
        }
      });

    return () => controller.abort();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSaving(true);

    try {
      const team = formData.teamMemberIds.map((sId) => ({
        studentId: sId,
        studentName:
          students.find((s) => s.id === sId)?.name || "Siswa",
        role: formData.teamMemberRoles[sId] || "Developer",
      }));

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          longDescription: formData.longDescription,
          techStack: formData.techStackStr
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          liveUrl: formData.liveUrl || undefined,
          repoUrl: formData.repoUrl || undefined,
          imageUrl: undefined,
          team,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Gagal menyimpan proyek.");
        setIsSaving(false);
        return;
      }

      setSuccessMsg("Proyek berhasil diajukan! Akan ditinjau oleh admin.");
      setSubmitted(true);
    } catch {
      setErrorMsg("Gagal menghubungi server.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStudent = (sId: string) => {
    if (formData.teamMemberIds.includes(sId)) {
      setFormData({
        ...formData,
        teamMemberIds: formData.teamMemberIds.filter((id) => id !== sId),
        teamMemberRoles: Object.fromEntries(
          Object.entries(formData.teamMemberRoles).filter(([id]) => id !== sId)
        ),
      });
    } else {
      setFormData({
        ...formData,
        teamMemberIds: [...formData.teamMemberIds, sId],
        teamMemberRoles: { ...formData.teamMemberRoles, [sId]: "Developer" },
      });
    }
  };

  const toggleStudentRole = (sId: string) => {
    const currentRole = formData.teamMemberRoles[sId] || "Developer";
    const roles = [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Fullstack Developer",
      "Project Leader",
    ];
    const currentIndex = roles.indexOf(currentRole);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    setFormData({
      ...formData,
      teamMemberRoles: { ...formData.teamMemberRoles, [sId]: nextRole },
    });
  };

  const submittedContent = (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Plus className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Proyek Berhasil Diajukan
          </h1>
          <p className="text-sm text-muted-foreground">
            Proyek Anda telah dikirim dan akan ditinjau oleh admin. Anda akan mendapatkan pemberitahuan ketika proyek disetujui atau ditolak.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => window.location.href = "/students"}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Direktori
          </Button>
          <Button
            onClick={() => window.location.href = "/students/submit"}
            className="flex-1"
          >
            Ajukan Proyek Lainnya
          </Button>
        </div>
        <Button asChild variant="link" className="w-full">
          <Link href="/students/projects">Lihat Status Pengajuan Saya</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {submitted ? submittedContent : null}
      {!submitted && (
        <>
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
            <div className="max-w-3xl mx-auto">
              <div className="space-y-1">
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                  Ajukan Proyek Baru
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Isi formulir berikut untuk mengajukan proyek Anda. Proyek akan ditinjau oleh admin sebelum ditampilkan di showcase publik.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-lg bg-green-100 border border-green-200 text-green-700 text-xs">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Judul Proyek *</Label>
                    <Input
                      required
                      placeholder="Contoh: Portal E-Commerce UMKM Surakarta"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Kategori Layanan</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) =>
                        setFormData({ ...formData, category: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Deskripsi Singkat *</Label>
                  <Textarea
                    required
                    rows={2}
                    placeholder="Jelaskan gambaran umum proyek..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Deskripsi Lengkap</Label>
                  <Textarea
                    rows={3}
                    placeholder="Detail teknis, arsitektur, dan fitur utama..."
                    value={formData.longDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, longDescription: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Tech Stack (Pisahkan dengan Koma)</Label>
                  <Input
                    placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                    value={formData.techStackStr}
                    onChange={(e) =>
                      setFormData({ ...formData, techStackStr: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Link Deployment (Opsional)</Label>
                  <Input
                    type="url"
                    placeholder="https://proyek-umkm.vercel.app"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Jika tidak diisi, sistem akan otomatis men-capture link deployment Anda.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Link Repositori (GitHub) (Opsional)</Label>
                  <Input
                    type="url"
                    placeholder="https://github.com/user/repo"
                    value={formData.repoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, repoUrl: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Tim Proyek & Role</Label>
                  <p className="text-[10px] text-muted-foreground">
                    Pilih siswa yang terlibat dan tentukan role masing-masing.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {students.map((std) => {
                      const isSelected =
                        formData.teamMemberIds.includes(std.id);
                      return (
                        <div
                          key={std.id}
                          className={`p-3 rounded-lg border text-xs flex flex-col gap-2 transition-all ${isSelected ? "bg-secondary border-primary/40" : "bg-background border-border"}`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleStudent(std.id)}
                            className="font-heading font-medium text-foreground hover:text-primary flex items-center gap-2"
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-primary border-primary text-white" : "border-muted-foreground"}`}
                            >
                              {isSelected && <Plus className="w-3 h-3" />}
                            </div>
                            {std.name}
                          </button>

                          {isSelected && (
                            <div className="pl-6 space-y-1">
                              <Label className="text-[10px] text-muted-foreground">
                                Role Siswa:
                              </Label>
                              <Select
                                value={
                                  formData.teamMemberRoles[std.id] ||
                                  "Developer"
                                }
                                onValueChange={() => toggleStudentRole(std.id)}
                              >
                                <SelectTrigger className="h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Frontend Developer">
                                    Frontend Developer
                                  </SelectItem>
                                  <SelectItem value="Backend Developer">
                                    Backend Developer
                                  </SelectItem>
                                  <SelectItem value="UI/UX Designer">
                                    UI/UX Designer
                                  </SelectItem>
                                  <SelectItem value="Fullstack Developer">
                                    Fullstack Developer
                                  </SelectItem>
                                  <SelectItem value="Project Leader">
                                    Project Leader
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        title: "",
                        category: CATEGORIES[0],
                        description: "",
                        longDescription: "",
                        techStackStr: "",
                        liveUrl: "",
                        repoUrl: "",
                        teamMemberIds: [],
                        teamMemberRoles: {},
                      });
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving || formData.teamMemberIds.length === 0}
                    className="bg-primary text-primary-foreground"
                  >
                    {isSaving ? "Mengajukan..." : "Ajukan Proyek"}
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </>
      )}
    </div>
  );
}