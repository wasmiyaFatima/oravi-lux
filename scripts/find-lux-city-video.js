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
          reject(new Error("HTTP " + res.statusCode));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async () => {
  const html = await get("https://pixabay.com/videos/search/luxembourg/");
  fs.writeFileSync("scripts/pb.html", html);
  const cdn = [...html.matchAll(/https:\/\/cdn\.pixabay\.com\/video\/[^"'\s]+/g)].map(
    (m) => m[0]
  );
  const pages = [...html.matchAll(/\/videos\/([a-z0-9-]+)-(\d+)\//gi)].map((m) => ({
    slug: m[1],
    id: m[2],
    path: m[0],
  }));
  console.log("cdn sample", [...new Set(cdn)].slice(0, 20));
  console.log("pages", [...new Set(pages.map((p) => p.path))].slice(0, 15));

  // Archive.org search
  const ar = await get(
    "https://archive.org/advancedsearch.php?q=luxembourg+city+(drone+OR+aerial+OR+skyline)&fl[]=identifier&fl[]=title&fl[]=mediatype&rows=20&page=1&output=json"
  );
  const aj = JSON.parse(ar);
  const docs = aj.response?.docs || [];
  console.log(
    "archive",
    docs.map((d) => ({ id: d.identifier, title: d.title, type: d.mediatype })).slice(0, 10)
  );

  // Try archive item with movies
  for (const d of docs.filter((x) => x.mediatype === "movies").slice(0, 5)) {
    try {
      const meta = JSON.parse(
        await get(`https://archive.org/metadata/${d.identifier}`)
      );
      const files = (meta.files || []).filter(
        (f) =>
          /\.(mp4|webm)$/i.test(f.name) &&
          Number(f.size || 0) > 500_000 &&
          Number(f.size || 0) < 80_000_000
      );
      console.log(
        d.identifier,
        files.map((f) => ({ name: f.name, size: f.size, format: f.format }))
      );
      if (files[0]) {
        const url = `https://archive.org/download/${d.identifier}/${encodeURIComponent(files[0].name)}`;
        console.log("downloading", url);
        await download(url, "public/video/hero-city.mp4");
        console.log("ok", fs.statSync("public/video/hero-city.mp4").size);
        return;
      }
    } catch (e) {
      console.log("skip", d.identifier, e.message);
    }
  }
})().catch((e) => console.error(e));
