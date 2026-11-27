"use client";

import { useEffect, useState } from "react";
import type { ProjectItem, StudentItem } from "@/lib/db/queries";
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
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  CheckCircle2,
  UploadCloud,
  Loader2,
  XCircle,
} from "lucide-react";

function getStatusBadgeClass(status: string) {
  if (status === "pending") {
    return "bg-amber-500/10 text-amber-700 border-amber-500/30";
  }
  if (status === "approved") {
    return "bg-emerald-500/10 text-emerald-700 border-emerald-500/30";
  }
  return "bg-muted text-muted-foreground border-border";
}

export default function AdminProjectsPage() {
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusMsg, setUploadStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingOnly, setPendingOnly] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Application",
    description: "",
    longDescription: "",
    techStackStr: "",
    liveUrl: "",
    repoUrl: "",
    imageUrl: "",
  });

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [studentRoles, setStudentRoles] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/students").then((r) => r.json()),
    ])
      .then(([projData, stdData]) => {
        setProjectList(projData.projects || []);
        setStudents(stdData.students || []);
      })
      .catch(() => setErrorMsg("Gagal memuat data proyek dan siswa."))
      .finally(() => setIsLoadingData(false));
  }, []);

  const handleCancel = () => {
    setEditingId(null);
    setNewProject({
      title: "",
      category: "Web Application",
      description: "",
      longDescription: "",
      techStackStr: "",
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
    });
    setSelectedStudentIds([]);
    setStudentRoles({});
    setUploadStatusMsg("");
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setNewProject({
      title: project.title,
      category: project.category,
      description: project.description,
      longDescription: project.longDescription || "",
      techStackStr: project.techStack.join(", "),
      liveUrl: project.liveUrl || "",
      repoUrl: project.repoUrl || "",
      imageUrl: project.imageUrl || "",
    });
    setSelectedStudentIds(project.team.map((t) => t.studentId));
    setStudentRoles(
      project.team.reduce(
        (acc, t) => ({ ...acc, [t.studentId]: t.role }),
        {} as Record<string, string>
      )
    );
    setIsAdding(true);
  };

  const handleFileUploadToR2 = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatusMsg("Mengunggah ke Object Storage...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        setNewProject((prev) => ({ ...prev, imageUrl: data.url }));
        setUploadStatusMsg(data.message || "Gambar berhasil diunggah!");
      } else {
        setUploadStatusMsg(data.error || "Gagal mengunggah gambar.");
      }
    } catch {
      setUploadStatusMsg("Terjadi kesalahan koneksi saat upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    const techStack = newProject.techStackStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const team = selectedStudentIds.map((sId) => {
      const studentObj = students.find((s) => s.id === sId);
      return {
        studentId: sId,
        studentName: studentObj?.name || "Student",
        role: studentRoles[sId] || "Developer",
      };
    });

    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newProject.title,
            category: newProject.category,
            description: newProject.description,
            longDescription: newProject.longDescription,
            techStack:
              techStack.length > 0 ? techStack : ["Next.js", "TypeScript"],
            liveUrl: newProject.liveUrl || undefined,
            repoUrl: newProject.repoUrl || undefined,
            imageUrl: newProject.imageUrl || undefined,
            team,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMsg(data.error || "Gagal memperbarui proyek.");
          return;
        }
        setProjectList((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...data.project } : p))
        );
        handleCancel();
        setIsAdding(false);
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newProject.title,
            category: newProject.category,
            description: newProject.description,
            longDescription: newProject.longDescription,
            techStack:
              techStack.length > 0 ? techStack : ["Next.js", "TypeScript"],
            liveUrl: newProject.liveUrl || undefined,
            repoUrl: newProject.repoUrl || undefined,
            imageUrl: newProject.imageUrl || undefined,
            team,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMsg(data.error || "Gagal menyimpan proyek baru.");
          return;
        }
        setProjectList((prev) => [data.project, ...prev]);
        handleCancel();
        setIsAdding(false);
      }
    } catch {
      setErrorMsg("Gagal menghubungi server saat menyimpan proyek.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus proyek ini?")) return;
    setIsDeletingId(id);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjectList((prev) => prev.filter((p) => p.id !== id));
      } else {
        setErrorMsg("Gagal menghapus proyek.");
      }
    } catch {
      setErrorMsg("Gagal menghubungi server.");
    } finally {
      setIsDeletingId(null);
    }
  };
  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setErrorMsg("");
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Gagal memperbarui status proyek.");
        return;
      }
      setProjectList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch {
      setErrorMsg("Gagal menghubungi server saat memperbarui status.");
    }
  };

  const toggleStudentSelection = (sId: string) => {
    if (selectedStudentIds.includes(sId)) {
      setSelectedStudentIds(selectedStudentIds.filter((id) => id !== sId));
    } else {
      setSelectedStudentIds([...selectedStudentIds, sId]);
      if (!studentRoles[sId]) {
        setStudentRoles({ ...studentRoles, [sId]: "Frontend Developer" });
      }
    }
  };

  const visibleProjects = pendingOnly
    ? projectList.filter((p) => (p.status ?? "approved") === "pending")
    : projectList;
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Manajemen Proyek Showcase
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tambah proyek baru, upload screenshot ke R2/S3 atau isi link deployment preview.
          </p>
        </div>

        <Button
          onClick={() => {
            if (isAdding) {
              handleCancel();
              setIsAdding(false);
            } else {
              setIsAdding(true);
            }
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          {isAdding ? (editingId ? "Batal Edit" : "Batal") : "Tambah Proyek Baru"}
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
          {errorMsg}
        </div>
      )}

      {isAdding && (
        <form
          onSubmit={handleAddProject}
          className="p-6 rounded-xl bg-card border border-border space-y-6 shadow-sm"
        >
          <h3 className="font-heading font-semibold text-base text-foreground">
            {editingId ? "Edit Proyek TeFa" : "Form Tambah Proyek TeFa"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Judul Proyek *</Label>
              <Input
                required
                placeholder="Contoh: Portal E-Commerce UMKM Surakarta"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Kategori Layanan</Label>
              <Select
                value={newProject.category}
                onValueChange={(val) =>
                  setNewProject({ ...newProject, category: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Application">
                    Web Application
                  </SelectItem>
                  <SelectItem value="Mobile Application">
                    Mobile Application
                  </SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Digital Products & Templates">
                    Digital Products & Templates
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/60 border border-border space-y-4">
            <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-primary" /> Upload Screenshot
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Upload File Gambar (Maks. 5 MB)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    disabled={isUploading}
                    onChange={handleFileUploadToR2}
                    className="bg-background text-xs cursor-pointer"
                  />
                  {isUploading && (
                    <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                  )}
                </div>
                {uploadStatusMsg && (
                  <p className="text-[11px] text-primary font-medium">
                    {uploadStatusMsg}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Link Deployment Website (Fallback Auto Screenshot)
                </Label>
                <Input
                  type="url"
                  placeholder="https://proyek-umkm.vercel.app"
                  value={newProject.liveUrl}
                  onChange={(e) =>
                    setNewProject({ ...newProject, liveUrl: e.target.value })
                  }
                />
                <p className="text-[11px] text-muted-foreground">
                  Jika file gambar tidak diupload, sistem akan otomatis men-capture link deployment ini.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Link Repositori (GitHub)</Label>
                <Input
                  type="url"
                  placeholder="https://github.com/user/repo"
                  value={newProject.repoUrl}
                  onChange={(e) =>
                    setNewProject({ ...newProject, repoUrl: e.target.value })
                  }
                />
              </div>

              {newProject.imageUrl && (
                <div className="p-3 rounded bg-background border border-border text-xs flex items-center justify-between gap-3">
                  <div className="truncate text-muted-foreground">
                    <strong>Uploaded URL:</strong> {newProject.imageUrl}
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium shrink-0">
                    Ready
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Deskripsi Singkat *</Label>
            <Textarea
              required
              rows={2}
              placeholder="Jelaskan gambaran umum proyek..."
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">
              Deskripsi Lengkap
            </Label>
            <Textarea
              rows={3}
              placeholder="Detail teknis, arsitektur, dan fitur utama..."
              value={newProject.longDescription}
              onChange={(e) =>
                setNewProject({ ...newProject, longDescription: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Tech Stack (Pisahkan dengan Koma)</Label>
            <Input
              placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              value={newProject.techStackStr}
              onChange={(e) =>
                setNewProject({ ...newProject, techStackStr: e.target.value })
              }
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" /> Multi-Select Tagging
              Siswa & Penetapan Role
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {students.map((std) => {
                const isSelected = selectedStudentIds.includes(std.id);
                return (
                  <div
                    key={std.id}
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-2 transition-all ${
                      isSelected
                        ? "bg-secondary border-primary/40"
                        : "bg-background border-border"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleStudentSelection(std.id)}
                      className="font-heading font-medium text-foreground hover:text-primary flex items-center gap-2"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected
                            ? "bg-primary border-primary text-white"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      {std.name}
                    </button>

                    {isSelected && (
                      <div className="pl-6 space-y-1">
                        <Label className="text-[10px] text-muted-foreground">
                          Role Siswa:
                        </Label>
                        <Input
                          className="h-7 text-xs"
                          placeholder="misal: Frontend Lead"
                          value={studentRoles[std.id] || ""}
                          onChange={(e) =>
                            setStudentRoles({
                              ...studentRoles,
                              [std.id]: e.target.value,
                            })
                          }
                        />
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
                handleCancel();
                setIsAdding(false);
              }}
            >
              {editingId ? "Batal Edit" : "Batal"}
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
              disabled={isUploading || isSaving}
            >
              {isSaving ? "Menyimpan..." : editingId ? "Update Proyek" : "Simpan Proyek Baru"}
            </Button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Daftar Proyek ({visibleProjects.length})
          </h3>
          <Button
            variant={pendingOnly ? "default" : "outline"}
            size="sm"
            aria-pressed={pendingOnly}
            onClick={() => setPendingOnly(!pendingOnly)}
            className="shrink-0"
          >
            Pending
          </Button>
        </div>

        {isLoadingData ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Memuat proyek...
          </div>
        ) : visibleProjects.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Belum ada proyek. Klik “Tambah Proyek Baru” untuk membuat.
          </div>
        ) : (
          <div className="space-y-3">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg bg-background border border-border flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="font-heading font-semibold text-sm text-foreground">
                    {project.title}
                  </div>
                  <span
                    className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] ${getStatusBadgeClass(project.status ?? "approved")}`}
                  >
                    {project.status ?? "approved"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3" /> {project.team.length} Siswa
                  </span>
                  <p className="text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(project.id, "approved")}
                    className="shrink-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Setujui
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(project.id, "rejected")}
                    className="shrink-0"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Tolak
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                    className="shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    disabled={isDeletingId === project.id}
                    className="shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    {isDeletingId === project.id ? "Menghapus..." : "Hapus"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
