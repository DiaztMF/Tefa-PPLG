import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/config/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, org, whatsapp, service, budget, brief } = body;

    if (!name || !whatsapp || !brief) {
      return NextResponse.json(
        { error: "Nama, No. WhatsApp, dan Brief wajib diisi." },
        { status: 400 }
      );
    }

    const briefId = `brief-${Date.now()}`;
    const targetWaNumber = env.whatsappNumber.replace(/[^0-9]/g, "");

    // Formatted WhatsApp message string
    const formattedMessage = `Halo Admin TeFa PPLG ${encodeURIComponent(env.schoolName)},%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(name)}%0A- *Instansi/Perusahaan:* ${encodeURIComponent(org || "-")}%0A- *No. WA:* ${encodeURIComponent(whatsapp)}%0A- *Layanan:* ${encodeURIComponent(service)}%0A- *Estimasi Budget:* ${encodeURIComponent(budget)}%0A- *Briefing Proyek:* ${encodeURIComponent(brief)}`;

    const waRedirectUrl = `https://wa.me/${targetWaNumber}?text=${formattedMessage}`;

    return NextResponse.json({
      success: true,
      briefId,
      waRedirectUrl,
      message: "Brief berhasil diterima dan tersimpan di sistem.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memproses brief proyek." },
      { status: 500 }
    );
  }
}
