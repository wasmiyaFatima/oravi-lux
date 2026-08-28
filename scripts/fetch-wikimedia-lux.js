const https = require("https");
const fs = require("fs");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; LuxConciergeBot/1.0)",
            Accept: "application/json",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return get(res.headers.location).then(resolve, reject);
          }
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve({ status: res.statusCode, data }));
        }
      )
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
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error("HTTP " + res.statusCode + " " + url));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async () => {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=Luxembourg%20City%20filetype:video&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=640";
  const { data } = await get(api);
  const json = JSON.parse(data);
  const pages = Object.values(json.query?.pages || {});
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    console.log(
      JSON.stringify({
        title: p.title,
        mime: ii?.mime,
        size: ii?.size,
        url: ii?.url,
      })
    );
  }

  // Prefer mp4 under ~40MB
  const candidates = pages
    .map((p) => p.imageinfo?.[0])
    .filter((ii) => ii && /mp4|webm/i.test(ii.mime || "") && ii.size < 40_000_000)
    .sort((a, b) => a.size - b.size);

  console.log("candidates", candidates.length);
  if (candidates[0]) {
    console.log("downloading", candidates[0].url);
    await download(candidates[0].url, "public/video/hero-city.mp4");
    console.log("saved", fs.statSync("public/video/hero-city.mp4").size);
  }
})().catch((e) => console.error(e));
