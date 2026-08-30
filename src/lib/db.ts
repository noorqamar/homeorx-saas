import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { SEED_DB_BASE64 } from "./db-seed-binary";

function resolveDatabaseUrl(): string {
  if (process.env.VERCEL) {
    try {
      const tmpDbPath = path.join("/tmp", "dev.db");

      // Check if /tmp/dev.db is already present and valid
      let needsInit = true;
      if (fs.existsSync(tmpDbPath)) {
        const stats = fs.statSync(tmpDbPath);
        if (stats.size > 100000) {
          needsInit = false;
        }
      }

      if (needsInit) {
        // Try copying from workspace if present
        const localDbPath = path.join(process.cwd(), "prisma", "dev.db");
        if (fs.existsSync(localDbPath)) {
          fs.copyFileSync(localDbPath, tmpDbPath);
        } else if (SEED_DB_BASE64) {
          // Write directly from embedded binary bundle
          const buffer = Buffer.from(SEED_DB_BASE64, "base64");
          fs.writeFileSync(tmpDbPath, buffer);
          console.log(`[HomeoRx DB] Initialized /tmp/dev.db from embedded binary (${buffer.length} bytes)`);
        }
      }

      if (fs.existsSync(tmpDbPath)) {
        process.env.DATABASE_URL = `file:${tmpDbPath}`;
        return `file:${tmpDbPath}`;
      }
    } catch (err) {
      console.error("[HomeoRx DB] Vercel SQLite init notice:", err);
    }
  }
  return process.env.DATABASE_URL || "file:./prisma/dev.db";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDatabaseUrl(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
