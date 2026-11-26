import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://placeholder:placeholder@localhost:5432/db";

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  if (
    url.includes("ep-sample-123456") ||
    url.includes("user:password@") ||
    url.includes("placeholder:placeholder")
  ) {
    return false;
  }
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

// postgres-js: TCP driver, works with any Postgres (Coolify, Neon, RDS, …)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });