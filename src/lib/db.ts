import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// In Vercel serverless functions, the container root is read-only.
// We auto-copy the bundled SQLite database to /tmp/dev.db where write operations are permitted.
if (process.env.VERCEL) {
  try {
    const tmpDbPath = path.join("/tmp", "dev.db");
    const localDbPath = path.join(process.cwd(), "prisma", "dev.db");
    const rootDbPath = path.join(process.cwd(), "dev.db");

    if (!fs.existsSync(tmpDbPath)) {
      const srcPath = fs.existsSync(localDbPath)
        ? localDbPath
        : fs.existsSync(rootDbPath)
        ? rootDbPath
        : null;

      if (srcPath) {
        fs.copyFileSync(srcPath, tmpDbPath);
      }
    }

    if (fs.existsSync(tmpDbPath)) {
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    }
  } catch (err) {
    console.error("Vercel SQLite init notice:", err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
