import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const argsPath = path.join(__dirname, '..', '.vercel-deploy-call.json');
const args = JSON.parse(fs.readFileSync(argsPath, 'utf8'));

// Output args for MCP CallDynamicTool consumption
process.stdout.write(JSON.stringify(args));
