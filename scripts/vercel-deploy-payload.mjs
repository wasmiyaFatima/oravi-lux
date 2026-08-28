import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const excludeDirs = [
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  ".cursor",
  ".agents",
  "docs",
  "scripts",
  "public/video",
  "public/content",
];
const excludeFiles = new Set(["next-env.d.ts", ".vercel-deploy-payload.json"]);
const binaryExt = new Set([
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".pdf",
  ".mp4",
]);

function shouldInclude(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");
  if (excludeFiles.has(path.basename(normalized))) return false;
  if (normalized.startsWith(".env")) return false;
  if (normalized.endsWith(".tsbuildinfo") || normalized.endsWith(".log")) return false;
  return !excludeDirs.some(
    (dir) => normalized === dir || normalized.startsWith(`${dir}/`),
  );
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(root, fullPath).replace(/\\/g, "/");
    if (!shouldInclude(relativePath)) continue;
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(relativePath);
  }
  return files;
}

export function buildDeployPayload() {
  const files = walk(root).map((file) => {
    const fullPath = path.join(root, file);
    const ext = path.extname(file).toLowerCase();
    if (binaryExt.has(ext)) {
      return {
        file,
        data: fs.readFileSync(fullPath).toString("base64"),
        encoding: "base64",
      };
    }
    return { file, data: fs.readFileSync(fullPath, "utf8") };
  });

  return {
    target: "production",
    name: "lami",
    teamId: "team_hkzJQst0DP8b1HqA3fxipPJh",
    projectSettings: { framework: "nextjs" },
    files,
  };
}

const isMain = process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]));
if (isMain) {
  const payload = buildDeployPayload();
  const outPath = path.join(root, ".vercel-deploy-payload.json");
  fs.writeFileSync(outPath, JSON.stringify(payload));
  const sizeMb = (fs.statSync(outPath).size / (1024 * 1024)).toFixed(2);
  console.log(`Wrote ${payload.files.length} files (${sizeMb} MB)`);
}
