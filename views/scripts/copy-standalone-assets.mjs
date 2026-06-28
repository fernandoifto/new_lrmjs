import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");

if (!existsSync(join(standaloneDir, "server.js"))) {
  console.warn("[postbuild] .next/standalone/server.js não encontrado — ignorando cópia de assets.");
  process.exit(0);
}

const publicSrc = join(root, "public");
const publicDest = join(standaloneDir, "public");
if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log("[postbuild] public/ → .next/standalone/public/");
}

const staticSrc = join(root, ".next", "static");
const staticDest = join(standaloneDir, ".next", "static");
if (existsSync(staticSrc)) {
  mkdirSync(join(standaloneDir, ".next"), { recursive: true });
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log("[postbuild] .next/static/ → .next/standalone/.next/static/");
}
