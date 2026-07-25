"use client";

import { useState } from "react";
import { mockProjects, mockStudents, ProjectMock } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit3, Users, CheckCircle2 } from "lucide-react";

export default function AdminProjectsPage() {
  const [projectList, setProjectList] = useState<ProjectMock[]>(mockProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Application",
    description: "",
    techStackStr: "",
  });

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [studentRoles, setStudentRoles] = useState<Record<string, string>>({});

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const createdId = `proj-${Date.now()}`;
    const techStack = newProject.techStackStr.split(",").map((s) => s.trim()).filter(Boolean);

    const team = selectedStudentIds.map((sId) => {
      const studentObj = mockStudents.find((s) => s.id === sId);
      return {
        studentId: sId,
        studentName: studentObj?.name || "Student",
        role: studentRoles[sId] || "Developer",
      };
    });

    const item: ProjectMock = {
      id: createdId,
      title: newProject.title,
      category: newProject.category as any,
      description: newProject.description,
      longDescription: newProject.description,
      techStack: techStack.length > 0 ? techStack : ["Next.js", "TypeScript"],
      team: team.length > 0 ? team : [{ studentId: "std-01", studentName: "Aditya Pratama", role: "Developer" }],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjectList([item, ...projectList]);
    setIsAdding(false);
    setNewProject({ title: "", category: "Web Application", description: "", techStackStr: "" });
    setSelectedStudentIds([]);
    setStudentRoles({});
  };

  const handleDelete = (id: string) => {
    setProjectList(projectList.filter((p) => p.id !== id));
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Manajemen Proyek Showcase
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tambah proyek baru, atur deskripsi, dan petakan multi-role siswa pengembang.
          </p>
        </div>

        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-1.5" />
          {isAdding ? "Batal Tambah" : "Tambah Proyek Baru"}
        </Button>
      </div>

      {/* Add Project Form */}
      {isAdding && (
        <form onSubmit={handleAddProject} className="p-6 rounded-xl bg-card border border-border space-y-6 shadow-sm">
          <h3 className="font-heading font-semibold text-lg text-foreground">Form Tambah Proyek TeFa</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Judul Proyek *</Label>
              <Input
                required
                placeholder="Contoh: Portal E-Commerce UMKM"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Kategori Layanan</Label>
              <Select
                value={newProject.category}
                onValueChange={(val) => setNewProject({ ...newProject, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Application">Web Application</SelectItem>
                  <SelectItem value="Mobile Application">Mobile Application</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Digital Products & Templates">Digital Products & Templates</SelectItem>
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
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Tech Stack (Pisahkan dengan Koma)</Label>
            <Input
              placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              value={newProject.techStackStr}
              onChange={(e) => setNewProject({ ...newProject, techStackStr: e.target.value })}
            />
          </div>

          {/* Student Multi-Select & Role Tagging */}
          <div className="space-y-3 pt-2 border-t border-border">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" /> Multi-Select Tagging Siswa & Penetapan Role
            </Label>
            <p className="text-xs text-muted-foreground">Pilih siswa yang terlibat dan tentukan peran spesifiknya dalam proyek ini.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {mockStudents.map((std) => {
                const isSelected = selectedStudentIds.includes(std.id);
                return (
                  <div
                    key={std.id}
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-2 transition-all ${
                      isSelected ? "bg-secondary border-primary/40" : "bg-background border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleStudentSelection(std.id)}
                        className="font-heading font-medium text-foreground hover:text-primary flex items-center gap-2"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-primary border-primary text-white" : "border-muted-foreground"}`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        {std.name}
                      </button>
                    </div>

                    {isSelected && (
                      <div className="pl-6 space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Role Siswa:</Label>
                        <Input
                          className="h-7 text-xs"
                          placeholder="misal: Frontend Lead"
                          value={studentRoles[std.id] || ""}
                          onChange={(e) => setStudentRoles({ ...studentRoles, [std.id]: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Simpan Proyek Baru
            </Button>
          </div>
        </form>
      )}

      {/* Projects List Table */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">Daftar Proyek Terdaftar ({projectList.length})</h3>

        <div className="space-y-3">
          {projectList.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-lg bg-background border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-sm text-foreground">{proj.title}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-soft text-primary font-medium text-[11px]">
                    {proj.category}
                  </span>
                </div>
                <p className="text-muted-foreground">{proj.description}</p>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1 pt-1">
                  <Users className="w-3 h-3 text-primary" /> Tim Siswa: {proj.team.map((t) => `${t.studentName} (${t.role})`).join(", ")}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(proj.id)}>
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
