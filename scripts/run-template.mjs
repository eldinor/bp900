import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");

const [, , command = "dev", templateName = "default"] = process.argv;
const templateRoot =
  templateName === "default" ? repoRoot : resolve(repoRoot, "templates", templateName);

if (!existsSync(templateRoot)) {
  console.error(`Template "${templateName}" was not found at ${templateRoot}.`);
  process.exit(1);
}

const localViteBin = resolve(templateRoot, "node_modules", "vite", "bin", "vite.js");
const rootViteBin = resolve(repoRoot, "node_modules", "vite", "bin", "vite.js");
const binPath = existsSync(localViteBin) ? localViteBin : rootViteBin;

const child = spawn(process.execPath, [binPath, command], {
  cwd: templateRoot,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
