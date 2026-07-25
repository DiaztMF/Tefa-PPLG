export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "TeFa PPLG SMKN 2 Surakarta",
  schoolName: process.env.NEXT_PUBLIC_SCHOOL_NAME ?? "SMK Negeri 2 Surakarta",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://tefa.smkn2surakarta.sch.id",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890",
  databaseUrl: process.env.DATABASE_URL ?? "",
  betterAuthSecret: process.env.BETTER_AUTH_SECRET ?? "",
  betterAuthUrl: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
} as const;
