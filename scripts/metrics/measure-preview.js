import { spawn } from "node:child_process";
import { performance } from "node:perf_hooks";
import {
  getGitCommit,
  getGitBranch,
  getNuxtVersion,
  readJsonSafe,
  writeJson,
  diff,
  shutdown,
} from "../helpers/index.js";

console.log("⏱️ Measuring Nuxt preview startup (detailed phase breakdown)...");

// 🕒 Start overall timer
const start = performance.now();
const proc = spawn("pnpm", ["run", "preview"]);
const metricsFile = "metrics/preview-startup-times.json";

// ─────────────────────────────────────────────────────────────
// 🧩 Fases
// ─────────────────────────────────────────────────────────────
const phases = {
  bootstrap: null,
  runtimeInit: null,
  contentLoad: null,
  bindPort: null,
};

// ─────────────────────────────────────────────────────────────
// 📡 Analyseer stdout
// ─────────────────────────────────────────────────────────────
proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // 🧱 Fase 1: CLI bootstrap → "Starting preview command"
  if (text.includes("Starting preview command") && !phases.bootstrap) {
    phases.bootstrap = diff(performance.now(), start);
  }

  // 📚 Fase 3: @nuxt/content processing
  const matchContent = text.match(
    /Processed (\d+) collections and (\d+) files in ([\d.]+)ms/
  );
  if (matchContent && !phases.contentLoad) {
    phases.contentLoad = parseFloat(matchContent[3]) / 1000;
  }

  // 🌐 Fase 4: Port binding → "Listening on"
  if (text.includes("Listening on") && !phases.bindPort) {
    const now = performance.now();
    const totalStartup = diff(now, start);
    const runtimeInit = diff(now, start) - (phases.bootstrap || 0);

    // Fase 2 = runtime init (van preview command tot listening)
    phases.runtimeInit = Math.max(runtimeInit - (phases.contentLoad || 0), 0);
    phases.bindPort = diff(now, start);

    printPhases(totalStartup, phases);
    saveMetric(totalStartup, phases);
    shutdown(proc);
  }
});

proc.stderr.on("data", (data) => process.stderr.write(data));

// ─────────────────────────────────────────────────────────────
// 📊 Logging
// ─────────────────────────────────────────────────────────────
function printPhases(total, phases) {
  console.log("\n─────────────────────────────────────────────");
  console.log("🚀 Preview server volledig operationeel!");
  console.log("─────────────────────────────────────────────");
  console.log(`🧱 Fase 1: CLI bootstrap        – ${(phases.bootstrap || 0).toFixed(3)}s`);
  console.log(`⚙️ Fase 2: Runtime init         – ${(phases.runtimeInit || 0).toFixed(3)}s`);
  if (phases.contentLoad !== null) {
    console.log(`📚 Fase 3: Content load         – ${phases.contentLoad.toFixed(3)}s`);
  }
  console.log(`🌐 Fase 4: Poort binding        – ${(phases.bindPort || 0).toFixed(3)}s`);
  console.log("─────────────────────────────────────────────");
  console.log(`✅ Totale opstarttijd           – ${total.toFixed(3)}s`);
  console.log("─────────────────────────────────────────────\n");
}

// ─────────────────────────────────────────────────────────────
// 💾 Save metrics (gestandaardiseerde JSON)
// ─────────────────────────────────────────────────────────────
function saveMetric(total, phases) {
  const data = readJsonSafe(metricsFile, []);

  const entry = {
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    branch: getGitBranch(),
    nodeVersion: process.version,
    nuxtVersion: getNuxtVersion(),
    previewStartupSeconds: total,
    phases: {
      bootstrap: phases.bootstrap || 0,
      runtimeInit: phases.runtimeInit || 0,
      contentLoad: phases.contentLoad || 0,
      bindPort: phases.bindPort || 0,
    },
  };

  data.push(entry);
  writeJson(metricsFile, data);
}

// ┌─────────────────────────────────────────────────────────────┐
// │               🧠 NUXT PREVIEW STARTUP TIMELINE              │
// └─────────────────────────────────────────────────────────────┘
//
// Time →
// │
// │   0.000s ────────► Script start (performance.now())
// │                    ↓
// │                    [SPAWN pnpm run preview]
// │                    └── Fases worden geïnitialiseerd
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 1 – CLI bootstrap                                     │
// │   └─────────────────────────────────────────────────────────────┘
// │        Tijd tussen scriptstart en de eerste log:
// │        → "Starting preview command: node server/index.mjs"
// │
// │        🔹 Wat gebeurt hier?
// │           - De preview CLI (`nuxi preview`) start het Node-proces.
// │           - Node laadt `.output/server/index.mjs` en de Nitro-runtime.
// │           - Eventuele environment-variabelen worden klaargezet.
// │
// │        💬 Console toont nog bijna niets behalve setupinformatie.
// │
// │
// │   0.3s ────────► "[nuxi] ℹ Starting preview command" verschijnt
// │                   ↓
// │                   phases.bootstrap = diff(now, start)
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 2 – Runtime init (Nitro + modules)                    │
// │   └─────────────────────────────────────────────────────────────┘
// │        Tijd van het starten van de preview runtime
// │        tot aan de log "Listening on http://..."
// │
// │        🔹 Wat gebeurt hier?
// │           - Nitro initialiseert routes en middleware.
// │           - Plugins en modules worden geïnitialiseerd.
// │           - Config wordt ingeladen vanuit `.output`.
// │
// │        💬 Hier verschijnen logs zoals:
// │           [@nuxt/content] ✔ Processed 3 collections and 14 files...
// │           Nuxt Icon server bundle mode is set to local
// │
// │
// │   1.7s ────────► "[nuxt/content] Processed ..." verschijnt
// │                   ↓
// │                   phases.contentLoad = 0.166s (optioneel)
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 3 – (Optioneel) Content load                          │
// │   └─────────────────────────────────────────────────────────────┘
// │        Herkend via logregel van @nuxt/content of vergelijkbare modules.
// │        → Regex: /Processed (\d+) collections and (\d+) files in ([\d.]+)ms/
// │
// │        🔹 Wat gebeurt hier?
// │           - De contentmodule laadt markdown/JSON uit `.content`.
// │           - Cache wordt hersteld of vernieuwd.
// │           - Meestal duurt dit < 0.3s bij caching.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 4 – Poort binding                                     │
// │   └─────────────────────────────────────────────────────────────┘
// │        Zodra de server klaar is om requests te ontvangen:
// │        → "Listening on http://[::]:3000"
// │
// │        🔹 Wat gebeurt hier?
// │           - De HTTP-server start op.
// │           - Socket binding op de poort (meestal 3000).
// │           - Runtime klaar voor verkeer (SSR & API).
// │
// │
// │   2.6s ────────► "Listening on http://..." verschijnt
// │                   ↓
// │                   totalStartupTime = diff(now, start)
// │                   phases.runtimeInit = totalStartupTime - bootstrap
// │                   ✅ Resultaten gelogd en opgeslagen
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ JSON METRICS STRUCTUUR                                     │
// │   └─────────────────────────────────────────────────────────────┘
// │        {
// │          "timestamp": "2025-10-08T22:13:45.312Z",
// │          "gitCommit": "451b475",
// │          "branch": "v4",
// │          "nodeVersion": "v22.17.1",
// │          "nuxtVersion": "^4.1.2",
// │          "previewStartupSeconds": 2.609,
// │          "phases": {
// │            "bootstrap": 0.321,
// │            "runtimeInit": 1.879,
// │            "contentLoad": 0.166,
// │            "bindPort": 0.243
// │          }
// │        }
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ AFSLUITING (graceful shutdown)                             │
// │   └─────────────────────────────────────────────────────────────┘
// │        🔧 Signaalgedrag:
// │           SIGINT  → Netjes afsluiten (Ctrl+C / handmatig)
// │           SIGKILL → Hard afsluiten na timeout (fallback in CI)
// │
// │        Script flow:
// │           try proc.kill("SIGINT")
// │           ⏳ wacht 1.5s
// │           try proc.kill("SIGKILL")
// │           process.exit(0)
// │
// │        💬 Hiermee voorkomen we ELIFECYCLE errors in CI/CD.
// │
// └─────────────────────────────────────────────────────────────┘
