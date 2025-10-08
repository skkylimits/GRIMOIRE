// scripts/measure-preview-startup.js
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

console.log("⏱️ Measuring Nuxt preview startup (phase breakdown)...");

const start = Date.now();
const proc = spawn("pnpm", ["run", "preview"]);

const phases = {
  startCmd: start,
  loadServer: null,
  bindPort: null,
  ready: null,
};

proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // 🧱 Fase 1: Server init begint
  if (text.includes("Starting preview command") && phases.loadServer === null) {
    phases.loadServer = Date.now();
  }

  // 🌐 Fase 2: Server bind op poort (klaar om te luisteren)
  if (text.includes("Listening on") && phases.bindPort === null) {
    phases.bindPort = Date.now();

    const total = (phases.bindPort - start) / 1000;
    const initTime = (phases.loadServer - start) / 1000;
    const bindTime = (phases.bindPort - phases.loadServer) / 1000;

    console.log("\n─────────────────────────────────────────────");
    console.log("🚀 Preview server volledig operationeel!");
    console.log("─────────────────────────────────────────────");
    console.log(`🧱 Fase 1: Server laden     – ${initTime.toFixed(2)}s`);
    console.log(`🌐 Fase 2: Poort binding     – ${bindTime.toFixed(2)}s`);
    console.log(`✅ Totale opstarttijd        – ${total.toFixed(2)}s`);
    console.log("─────────────────────────────────────────────\n");

    saveMetric(total, { loadServer: initTime, bindPort: bindTime });
    gracefulShutdown(proc);
  }
});

proc.stderr.on("data", (data) => process.stderr.write(data));

// 👂 Luister naar afsluitstatus om ELIFECYCLE te voorkomen
proc.on("close", (code, signal) => {
  if (["SIGINT", "SIGTERM", "SIGKILL"].includes(signal)) {
    // Verwachte afsluiting → geen waarschuwing
    return;
  }
  if (code !== 0) {
    console.warn(`⚠️ Preview eindigde met code ${code || signal}`);
  }
});

function saveMetric(total, phases) {
  const logFile = "metrics/preview-startup-times.json";
  let metrics = [];

  if (fs.existsSync(logFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(logFile, "utf-8"));
      if (Array.isArray(parsed)) metrics = parsed;
    } catch {
      console.warn(`⚠️ ${logFile} is ongeldig of leeg, reset bestand.`);
      metrics = [];
    }
  }

  const entry = {
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    previewStartupSeconds: total,
    phases,
  };

  metrics.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(metrics, null, 2));
  console.log(`💾 Metrics opgeslagen → ${logFile}`);
}

/**
 * 🧩 Signaalgedrag bij procesafsluiting
 * -------------------------------------
 * SIGINT   →  Gebruiker drukt op Ctrl+C (meestal netjes)
 * SIGTERM  →  "Stop nu" signaal (CI of cleanup)
 * SIGKILL  →  Hard afsluiten, kan niet genegeerd worden
 *
 * 🔧 Aanpak:
 *   1️⃣ Probeer eerst SIGINT (graceful)
 *   2️⃣ Na 1,5s forceer SIGKILL
 */
function gracefulShutdown(proc) {
  try {
    proc.kill("SIGINT"); // Probeer netjes af te sluiten
  } catch {}

  setTimeout(() => {
    console.log("🧹 Sluit preview-server af...");
    try {
      proc.kill("SIGKILL"); // Forceer na timeout
    } catch {}
    process.exit(0);
  }, 1500);
}

function getGitCommit() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}
