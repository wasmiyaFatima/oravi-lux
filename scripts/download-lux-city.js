const fs = require("fs");
const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try {
            fs.unlinkSync(dest);
          } catch {}
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error("HTTP " + res.statusCode + " for " + url));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

const ids = [
  "Flickr-14170613729",
  "LuxembourgCityCitiesInTen",
  "Luxembrg",
  "youtube-Vxcre_ud0mw",
];

(async () => {
  for (const id of ids) {
    const meta = JSON.parse(await get(`https://archive.org/metadata/${id}`));
    const files = (meta.files || [])
      .filter((f) => /\.(mp4|webm)$/i.test(f.name))
      .map((f) => ({
        name: f.name,
        size: Number(f.size || 0),
        format: f.format,
      }))
      .filter((f) => f.size > 300_000 && f.size < 60_000_000)
      .sort((a, b) => a.size - b.size);
    console.log("\n===", id, meta.metadata?.title);
    console.log(files.slice(0, 8));
    const pick =
      files.find((f) => /\.mp4$/i.test(f.name) && f.size > 1_000_000) || files[0];
    if (pick) {
      const url = `https://archive.org/download/${id}/${encodeURIComponent(pick.name)}`;
      console.log("downloading", url);
      await download(url, "public/video/hero-city.mp4");
      console.log("saved bytes", fs.statSync("public/video/hero-city.mp4").size);
      return;
    }
  }
  console.log("no suitable video");
})().catch((e) => console.error(e));
