const fs = require("fs");
const pdf = require("pdf-parse");

const buf = fs.readFileSync(
  "public/content/Luxembourg_Concierge_Presentation-french.pdf"
);

pdf(buf).then((data) => {
  fs.writeFileSync("docs/french-deck-extract.txt", data.text, "utf8");
  console.log("pages", data.numpages, "chars", data.text.length);
  console.log(data.text.slice(0, 2500));
});
