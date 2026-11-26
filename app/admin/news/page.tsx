"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/db/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Calendar, User } from "lucide-react";

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => setArticles(data.news || []))
      .catch(() => setErrorMsg("Gagal memuat berita."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", author: "", content: "" });
  };

  const handleEdit = (article: NewsItem) => {
    setEditingId(article.id);
    setForm({ title: article.title, author: article.author, content: article.content });
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");
    try {
      if (editingId) {
        const res = await fetch(`/api/news/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setArticles((prev) => prev.map((a) => (a.id === editingId ? data.article : a)));
          handleCancel();
          setIsAdding(false);
        } else {
          setErrorMsg(data.error || "Gagal memperbarui berita.");
        }
      } else {
        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setArticles([data.article, ...articles]);
          handleCancel();
          setIsAdding(false);
        } else {
          setErrorMsg(data.error || "Gagal menyimpan berita.");
        }
      }
    } catch {
      setErrorMsg("Gagal menghubungi server.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    setIsDeletingId(id);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        setErrorMsg("Gagal menghapus berita.");
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
            Manajemen Berita & Artikel TeFa
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Publikasikan rilis proyek, kegiatan Teaching Factory, dan kolaborasi mitra DUDI.
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
          {isAdding ? (editingId ? "Batal Edit" : "Batal") : "Tulis Berita Baru"}
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
          {errorMsg}
        </div>
      )}

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm"
        >
          <h3 className="font-heading font-semibold text-base text-foreground">
            {editingId ? "Edit Berita & Artikel" : "Form Tulis Berita Baru"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Judul Artikel *</Label>
              <Input
                required
                placeholder="Contoh: Rilis Sistem Antrean Klinik Mitra"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Penulis</Label>
              <Input
                placeholder="Tim Studio TeFa PPLG"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Isi Berita *</Label>
            <Textarea
              required
              rows={5}
              placeholder="Tulis isi berita atau ringkasan rilis..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3">
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
              disabled={isSaving}
              className="bg-primary text-primary-foreground"
            >
              {isSaving ? "Menyimpan..." : editingId ? "Update Berita" : "Terbitkan Berita"}
            </Button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Daftar Artikel ({articles.length})
        </h3>

        {isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Memuat berita...
          </div>
        ) : articles.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Belum ada artikel. Klik “Tulis Berita Baru” untuk membuat.
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded-lg bg-background border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="font-heading font-semibold text-sm text-foreground">
                    {article.title}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3 h-3" /> {article.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.createdAt}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                    className="shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                    disabled={isDeletingId === article.id}
                    className="shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    {isDeletingId === article.id ? "Menghapus..." : "Hapus"}
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
