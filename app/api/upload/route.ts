import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File gambar tidak ditemukan." }, { status: 400 });
    }

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME || "tefa-showcase";
    const publicUrlBase = process.env.R2_PUBLIC_URL || "https://pub-r2.dev";

    // Fallback if Cloudflare R2 credentials are not configured yet
    if (!accountId || !accessKeyId || !secretAccessKey) {
      const mockFilename = `preview-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      return NextResponse.json({
        success: true,
        url: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80`,
        message: "Cloudflare R2 belum dikonfigurasi. Menggunakan URL gambar sampel.",
        filename: mockFilename,
      });
    }

    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop() || "jpg";
    const key = `uploads/projects/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: file.type || "image/jpeg",
      })
    );

    const publicUrl = `${publicUrlBase.replace(/\/$/, "")}/${key}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key,
      message: "Gambar berhasil diunggah ke Cloudflare R2!",
    });
  } catch (error) {
    console.error("Cloudflare R2 Upload Error:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar ke Cloudflare R2." },
      { status: 500 }
    );
  }
}
