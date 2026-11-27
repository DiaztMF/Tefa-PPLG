import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/lib/auth";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5 MB." },
        { status: 400 }
      );
    }

    const s3Endpoint = process.env.S3_ENDPOINT;
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId =
      process.env.S3_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey =
      process.env.S3_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
    const bucketName =
      process.env.S3_BUCKET_NAME ||
      process.env.R2_BUCKET_NAME ||
      "tefa-showcase";
    const publicUrlBase =
      process.env.S3_PUBLIC_URL ||
      process.env.R2_PUBLIC_URL ||
      "https://pub-r2.dev";

    const hasS3Config = Boolean(
      (s3Endpoint || accountId) && accessKeyId && secretAccessKey
    );

    if (!hasS3Config) {
      const mockFilename = `preview-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      return NextResponse.json({
        success: true,
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
        message:
          "Object Storage (R2/S3) belum dikonfigurasi. Menggunakan URL gambar sampel.",
        filename: mockFilename,
      });
    }

    const endpoint = s3Endpoint
      ? s3Endpoint.replace(/\/$/, "")
      : `https://${accountId}.r2.cloudflarestorage.com`;

    const s3Client = new S3Client({
      region: process.env.S3_REGION || "us-east-1",
      endpoint,
      forcePathStyle: Boolean(s3Endpoint),
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
    });

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const key = `uploads/projects/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `${publicUrlBase.replace(/\/$/, "")}/${key}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key,
      message: "Gambar berhasil diunggah ke Object Storage!",
    });
  } catch (error) {
    console.error("Object Storage Upload Error:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar ke Object Storage." },
      { status: 500 }
    );
  }
}
