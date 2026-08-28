import fs from "node:fs";

const payload = JSON.parse(
  fs.readFileSync(new URL("../.vercel-deploy-medium.json", import.meta.url), "utf8"),
);

// Emit deploy arguments as JSON for MCP deploy_to_vercel
process.stdout.write(JSON.stringify(payload));
