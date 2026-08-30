import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function resolveDatabaseUrl(): string {
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
        return `file:${tmpDbPath}`;
      }
    } catch (err) {
      console.error("Vercel SQLite init notice:", err);
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
