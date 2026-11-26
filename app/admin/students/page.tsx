"use client";

import { useEffect, useState } from "react";
import type { StudentItem } from "@/lib/db/queries";
import { calculateStudentClass } from "@/lib/utils/student-class";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    entryYear: 2024,
    bio: "",
    skillsStr: "",
  });

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => setStudents(data.students || []))
      .catch(() => setErrorMsg("Gagal memuat data siswa."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCancel = () => {
    setEditingId(null);
    setNewStudent({ name: "", entryYear: 2024, bio: "", skillsStr: "" });
  };

  const handleEdit = (student: StudentItem) => {
    setEditingId(student.id);
    setNewStudent({
      name: student.name,
      entryYear: student.entryYear,
      bio: student.bio,
      skillsStr: student.skills.join(", "),
    });
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    const skills = newStudent.skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (editingId) {
        const res = await fetch(`/api/students/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newStudent.name,
            entryYear: Number(newStudent.entryYear),
            bio: newStudent.bio,
            skills,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMsg(data.error || "Gagal memperbarui data siswa.");
          return;
        }
        setStudents((prev) => prev.map((s) => (s.id === editingId ? data.student : s)));
        handleCancel();
        setIsAdding(false);
      } else {
        const res = await fetch("/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newStudent.name,
            entryYear: Number(newStudent.entryYear),
            bio: newStudent.bio,
            skills,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setErrorMsg(data.error || "Gagal menyimpan data siswa.");
          return;
        }
        setStudents((prev) => [data.student, ...prev]);
        handleCancel();
        setIsAdding(false);
      }
    } catch {
      setErrorMsg("Gagal menghubungi server.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;
    setIsDeletingId(id);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } else {
        setErrorMsg("Gagal menghapus data siswa.");
      }
    } catch {
      setErrorMsg("Gagal menghubungi server.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Manajemen Data Siswa
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tingkat kelas dan status alumni dihitung otomatis berdasarkan Tahun Masuk (Angkatan).
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
          {isAdding ? (editingId ? "Batal Edit" : "Batal Tambah") : "Tambah Siswa Baru"}
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
          {errorMsg}
        </div>
      )}

      {isAdding && (
        <form
          onSubmit={handleAddStudent}
          className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm"
        >
          <h3 className="font-heading font-semibold text-base text-foreground">
            {editingId ? "Edit Data Siswa" : "Tambah Data Siswa PPLG"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Nama Lengkap Siswa *
              </Label>
              <Input
                required
                placeholder="Contoh: Rian Hidayat"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Tahun Masuk (Angkatan) *
              </Label>
              <Input
                type="number"
                required
                placeholder="2024"
                value={newStudent.entryYear}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    entryYear: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Bio Singkat</Label>
            <Input
              placeholder="Contoh: Full-Stack Developer fokus Next.js dan PostgreSQL"
              value={newStudent.bio}
              onChange={(e) =>
                setNewStudent({ ...newStudent, bio: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">
              Keahlian / Skills (Pisahkan dengan Koma)
            </Label>
            <Input
              placeholder="Next.js, Figma, React Native, TypeScript"
              value={newStudent.skillsStr}
              onChange={(e) =>
                setNewStudent({ ...newStudent, skillsStr: e.target.value })
              }
            />
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
              disabled={isSaving}
            >
              {isSaving ? "Menyimpan..." : editingId ? "Update Data Siswa" : "Simpan Data Siswa"}
            </Button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Daftar Talenta Siswa ({students.length})
        </h3>

        {isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Memuat data siswa...
          </div>
        ) : students.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Belum ada data siswa. Klik “Tambah Siswa Baru” untuk membuat.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((std) => {
              const classInfo = calculateStudentClass(std.entryYear);
              return (
                <div
                  key={std.id}
                  className="p-4 rounded-lg bg-background border border-border flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-heading font-semibold text-sm text-foreground">
                      {std.name}
                    </div>
                    <div className="text-muted-foreground">
                      Tahun Masuk: {std.entryYear}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {std.skills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-secondary text-primary font-medium text-[10px]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-[11px] font-medium inline-block ${
                        classInfo.isAlumni
                          ? "bg-secondary text-muted-foreground border-border"
                          : "bg-secondary text-primary border-primary/20"
                      }`}
                    >
                      {classInfo.label}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(std)}
                        className="shrink-0"
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(std.id)}
                        disabled={isDeletingId === std.id}
                        className="shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        {isDeletingId === std.id ? "Menghapus..." : "Hapus"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
