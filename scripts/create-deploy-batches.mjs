import fs from "node:fs";
import path from "node:path";

const payload = JSON.parse(
  fs.readFileSync(path.resolve("c:/projects/lami/.vercel-deploy-call.json"), "utf8"),
);
const maxBytes = 90000;
const batches = [];
let current = {
  target: "preview",
  name: payload.name,
  teamId: payload.teamId,
  projectSettings: payload.projectSettings,
  files: [],
};
let size = JSON.stringify({
  target: current.target,
  name: current.name,
  teamId: current.teamId,
  projectSettings: current.projectSettings,
  files: [],
}).length;

for (const file of payload.files) {
  const fileSize = JSON.stringify(file).length;
  if (current.files.length && size + fileSize > maxBytes) {
    batches.push(current);
    current = {
      target: "preview",
      name: payload.name,
      teamId: payload.teamId,
      projectSettings: payload.projectSettings,
      files: [...batches.at(-1).files],
    };
    size = JSON.stringify(current).length;
  }
  current.files.push(file);
  size += fileSize;
}
if (current.files.length) batches.push(current);

const dir = path.resolve("c:/projects/lami/.vercel-batches");
fs.mkdirSync(dir, { recursive: true });
batches.forEach((batch, index) => {
  const filePath = path.join(dir, `batch-${index + 1}.json`);
  fs.writeFileSync(filePath, JSON.stringify(batch));
  console.log(
    `${index + 1}: ${batch.files.length} files, ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`,
  );
});
console.log(`total batches: ${batches.length}`);
