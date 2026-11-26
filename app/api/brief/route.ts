import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/lib/db";
import { briefs } from "@/lib/db/schema";
import { getBriefs } from "@/lib/db/queries";
import { requireAdminSession } from "@/lib/auth-guard";

const briefRateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 menit
const RATE_LIMIT_MAX = 5; // maksimal 5 brief per menit per IP

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = briefRateLimit.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  briefRateLimit.set(ip, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordBriefAttempt(ip: string): void {
  const now = Date.now();
  const timestamps = briefRateLimit.get(ip) || [];
  timestamps.push(now);
  briefRateLimit.set(ip, timestamps);
}
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  const data = await getBriefs();
  return NextResponse.json({ briefs: data });
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }
    recordBriefAttempt(ip);
    const body = await request.json();
    const { name, org, whatsapp, service, budget, brief } = body;

    if (!name || !whatsapp || !brief) {
      return NextResponse.json(
        { error: "Nama, No. WhatsApp, dan Brief wajib diisi." },
        { status: 400 }
      );
    }

    const briefId = `brief-${crypto.randomUUID()}`;
    const targetNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";
    const schoolName =
      process.env.NEXT_PUBLIC_SCHOOL_NAME || "SMK Negeri 2 Surakarta";

    if (isDatabaseConfigured()) {
      await db.insert(briefs).values({
        id: briefId,
        name: String(name).trim(),
        org: org ? String(org).trim() : null,
        whatsapp: String(whatsapp).trim(),
        service: String(service || "Web Development"),
        budget: String(budget || "5 - 15 Juta"),
        briefText: String(brief).trim(),
        status: "Baru",
      });
    }

    const formattedMessage = `Halo Admin TeFa PPLG ${encodeURIComponent(schoolName)},%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(name)}%0A- *Instansi/Perusahaan:* ${encodeURIComponent(org || "-")}%0A- *No. WA:* ${encodeURIComponent(whatsapp)}%0A- *Layanan:* ${encodeURIComponent(service)}%0A- *Estimasi Budget:* ${encodeURIComponent(budget)}%0A- *Briefing Proyek:* ${encodeURIComponent(brief)}`;

    const waRedirectUrl = `https://wa.me/${targetNumber.replace(/[^0-9]/g, "")}?text=${formattedMessage}`;

    return NextResponse.json({
      success: true,
      briefId,
      waRedirectUrl,
      persisted: isDatabaseConfigured(),
      message: "Brief berhasil diterima dan tersimpan di sistem.",
    });
  } catch (err) {
    console.error("POST /api/brief error:", err);
    return NextResponse.json(
      { error: "Gagal memproses brief proyek." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdminSession(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status wajib diisi." },
        { status: 400 }
      );
    }

    if (isDatabaseConfigured()) {
      await db.update(briefs).set({ status }).where(eq(briefs.id, id));
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    console.error("PATCH /api/brief error:", err);
    return NextResponse.json(
      { error: "Gagal memperbarui status brief." },
      { status: 500 }
    );
  }
}
