import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "3d-logo", "src", "oravi-icon.png");
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

/** Bronze used by the previous AV mark — readable at favicon size. */
const GOLD = { r: 152, g: 112, b: 64 };
const ICO_SIZES = [16, 32, 48];

function icoFromPngs(pngs, dims) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = headerSize;
  pngs.forEach((png, i) => {
    const dim = dims[i];
    const entry = 6 + i * 16;
    header.writeUInt8(dim >= 256 ? 0 : dim, entry);
    header.writeUInt8(dim >= 256 ? 0 : dim, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...pngs]);
}

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let maxR = 1;
let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const i = (y * info.width + x) * info.channels;
    const lum = data[i] + data[i + 1] + data[i + 2];
    if (data[i + 3] > 8 && lum > 10) {
      maxR = Math.max(maxR, data[i]);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

for (let i = 0; i < data.length; i += info.channels) {
  const lum = data[i] + data[i + 1] + data[i + 2];
  if (data[i + 3] <= 8 || lum <= 10) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 255;
    continue;
  }
  const t = data[i] / maxR;
  data[i] = Math.min(255, Math.round(GOLD.r * t));
  data[i + 1] = Math.min(255, Math.round(GOLD.g * t));
  data[i + 2] = Math.min(255, Math.round(GOLD.b * t));
  data[i + 3] = 255;
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
const cropped = await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .extract({ left: minX, top: minY, width: cropW, height: cropH })
  .png()
  .toBuffer({ resolveWithObject: true });

const pad = 1.16;
const side = Math.ceil(Math.max(cropped.info.width, cropped.info.height) * pad);
const left = Math.round((side - cropped.info.width) / 2);
const top = Math.round((side - cropped.info.height) / 2);

const master = await sharp({
  create: {
    width: side,
    height: side,
    channels: 4,
    background: BLACK,
  },
})
  .composite([{ input: cropped.data, left, top }])
  .png({ compressionLevel: 9 })
  .toBuffer();

const masterMeta = await sharp(master).metadata();
console.log("bbox", cropW, cropH, "master", masterMeta.width);

async function writePng(rel, size) {
  const buf = await sharp(master)
    .resize(size, size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(root, rel), buf);
  console.log("wrote", rel, buf.length);
  return buf;
}

await writePng("public/oravi-icon.png", masterMeta.width);
await writePng("public/icon-512.png", 512);
await writePng("public/icon-192.png", 192);
await writePng("public/apple-icon.png", 180);
await writePng("public/favicon.png", 48);
await writePng("src/app/icon.png", 512);
await writePng("src/app/apple-icon.png", 180);

const icoPngs = [];
for (const size of ICO_SIZES) {
  icoPngs.push(
    await sharp(master)
      .resize(size, size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
      .png()
      .toBuffer(),
  );
}
const ico = icoFromPngs(icoPngs, ICO_SIZES);
await writeFile(join(root, "public/favicon.ico"), ico);
await writeFile(join(root, "src/app/favicon.ico"), ico);
console.log("wrote favicon.ico", ico.length);
