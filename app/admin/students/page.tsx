"use client";

import { useState } from "react";
import { mockStudents, StudentMock } from "@/lib/data/mock-data";
import { calculateStudentClass } from "@/lib/utils/student-class";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users, Sparkles, GraduationCap } from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentMock[]>(mockStudents);
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    entryYear: 2024,
    bio: "",
    skillsStr: "",
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = newStudent.skillsStr.split(",").map((s) => s.trim()).filter(Boolean);
    const item: StudentMock = {
      id: `std-${Date.now()}`,
      name: newStudent.name,
      avatar: "",
      bio: newStudent.bio || "Siswa PPLG SMK",
      entryYear: Number(newStudent.entryYear),
      skills: skills.length > 0 ? skills : ["HTML", "CSS", "JavaScript"],
    };

    setStudents([item, ...students]);
    setIsAdding(false);
    setNewStudent({ name: "", entryYear: 2024, bio: "", skillsStr: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Manajemen Data Siswa & Logika Kelas
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tingkat kelas dan status alumni dihitung otomatis per 1 Juli berdasarkan Tahun Masuk (Angkatan).
          </p>
        </div>

        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-1.5" />
          {isAdding ? "Batal Tambah" : "Tambah Siswa Baru"}
        </Button>
      </div>

      {/* Class Automation Rule Banner */}
      <div className="p-4 rounded-xl bg-secondary border border-primary/20 text-xs text-foreground flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <div>
          <strong>Otomatisasi Kenaikan Kelas Aktif:</strong> Admin cukup memasukkan <code>Tahun Masuk (Angkatan)</code>. Sistem secara otomatis menghitung status kelas (Kelas X, XI, XII, atau Alumni) per tanggal 1 Juli tiap tahun ajaran baru.
        </div>
      </div>

      {/* Form Add Student */}
      {isAdding && (
        <form onSubmit={handleAddStudent} className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
          <h3 className="font-heading font-semibold text-base text-foreground">Tambah Data Siswa PPLG</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Nama Lengkap Siswa *</Label>
              <Input
                required
                placeholder="Contoh: Rian Hidayat"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Tahun Masuk (Angkatan) *</Label>
              <Input
                type="number"
                required
                placeholder="2024"
                value={newStudent.entryYear}
                onChange={(e) => setNewStudent({ ...newStudent, entryYear: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Keahlian / Skills (Pisahkan dengan Koma)</Label>
            <Input
              placeholder="Next.js, Figma, React Native, TypeScript"
              value={newStudent.skillsStr}
              onChange={(e) => setNewStudent({ ...newStudent, skillsStr: e.target.value })}
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Simpan Data Siswa
            </Button>
          </div>
        </form>
      )}

      {/* Students List */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">Daftar Talenta Siswa ({students.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((std) => {
            const classInfo = calculateStudentClass(std.entryYear);
            return (
              <div key={std.id} className="p-4 rounded-lg bg-background border border-border flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="font-heading font-semibold text-sm text-foreground">{std.name}</div>
                  <div className="text-muted-foreground">Tahun Masuk: {std.entryYear}</div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {std.skills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-secondary text-primary font-medium text-[10px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-medium inline-block ${
                    classInfo.isAlumni ? "bg-secondary text-muted-foreground border-border" : "bg-primary-soft text-primary border-primary-border"
                  }`}>
                    {classInfo.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
