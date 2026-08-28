const fs = require("fs");
const https = require("https");
const http = require("http");

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, data, headers: res.headers }));
      })
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error("status " + res.statusCode));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async () => {
  // Mixkit Luxembourg search page – find actual video page URLs
  const page = await get("https://mixkit.co/free-stock-video/luxembourg/");
  fs.writeFileSync("scripts/mixkit-lux-page.html", page.data);
  const slugs = [
    ...page.data.matchAll(/href="(\/free-stock-video\/[^"]+-\d+\/)"/g),
  ].map((m) => m[1]);
  console.log("slugs", [...new Set(slugs)].slice(0, 10));

  // Also try pixabay video search HTML
  const pb = await get("https://pixabay.com/videos/search/luxembourg%20city/");
  fs.writeFileSync("scripts/pixabay-lux.html", pb.data.slice(0, 200000));
  const vids = [...pb.data.matchAll(/\/videos\/[a-z0-9-]+-(\d+)\//gi)].map((m) => m[1]);
  console.log("pixabay ids", [...new Set(vids)].slice(0, 15));

  // Coverr search
  const coverr = await get("https://coverr.co/s?q=luxembourg");
  const coverrUrls = [...coverr.data.matchAll(/https:\/\/cdn\.coverr\.co\/videos\/[^"'\s]+/g)].map(
    (m) => m[0]
  );
  console.log("coverr", [...new Set(coverrUrls)].slice(0, 10));
})().catch((e) => console.error(e));
