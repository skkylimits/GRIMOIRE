// scripts/measure-build-time.js
import { spawn } from "node:child_process";
import { performance } from "node:perf_hooks";
import {
  getGitCommit,
  getGitBranch,
  getNuxtVersion,
  readJsonSafe,
  writeJson,
} from "../helpers/index.js";

console.log("⏱️ Measuring Nuxt build time...");

// 🕒 Start timer
const start = performance.now();
const proc = spawn("pnpm", ["run", "build"]);

const metricsFile = "metrics/build-times.json";

// Fases met duidelijke structuur
const phases = {
  nuxtInit: { start: start, end: null },
  vite: {
    client: { start: null, end: null },
    server: { start: null, end: null },
  },
  nitro: {
    build: { start: null, end: null },
    prerender: { start: null, end: null },
    finalize: { start: null, end: null },
  },
};

// --- STDOUT ANALYSE ---
proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // --- Vite fases ---
  if (text.includes("Building client...")) phases.vite.client.start = performance.now();
  if (text.match(/Client built in ([\d.]+)m?s/)) phases.vite.client.end = performance.now();

  if (text.includes("Building server...")) phases.vite.server.start = performance.now();
  if (text.match(/Server built in ([\d.]+)m?s/)) phases.vite.server.end = performance.now();

  // --- Nitro fases ---
  if (text.includes("Building Nuxt Nitro server")) phases.nitro.build.start = performance.now();
  if (text.includes("Nuxt Nitro server built")) phases.nitro.build.end = performance.now();

  // --- Prerender fase ---
  if (text.includes("Initializing prerenderer")) phases.nitro.prerender.start = performance.now();
  if (text.includes("Prerendered")) phases.nitro.prerender.end = performance.now();

  // --- Finalize fase ---
  if (
    text.includes("Generated public") ||
    text.includes("Output directory:") ||
    text.match(/Built in [\d.]+s$/)
  ) {
    phases.nitro.finalize.end = performance.now();
  }
});

proc.stderr.on("data", (data) => process.stderr.write(data));

// --- Als proces eindigt ---
proc.on("close", (code) => {
  const totalSeconds = diff(performance.now(), start);

  if (code !== 0) {
    console.error("❌ Build failed.");
    process.exit(code);
  }

  // --- Bereken tijden ---
  const flat = {
    nuxtInit: diff(phases.vite.client.start, phases.nuxtInit.start),
    viteClient: diff(phases.vite.client.end, phases.vite.client.start),
    viteServer: diff(phases.vite.server.end, phases.vite.server.start),
    nitroBuild: diff(phases.nitro.build.end, phases.vite.server.end),
    prerender: diff(phases.nitro.prerender.end, phases.nitro.prerender.start),
    finalize: diff(phases.nitro.finalize.end, phases.nitro.prerender.end),
  };

  // --- Console output ---
  printPhases(flat, totalSeconds);

  // --- Opslaan naar JSON ---
  saveMetric(flat, totalSeconds);
});

/* ------------------------------------------------------------------
 📊 PRINT PHASES
-------------------------------------------------------------------*/
function printPhases(flat, totalSeconds) {
  console.log("\n─────────────────────────────────────────────");
  console.log("🏗️ Build voltooid!");
  console.log("─────────────────────────────────────────────");
  console.log(`🧱 Fase 1: Nuxt init        – ${flat.nuxtInit.toFixed(2)}s`);
  console.log(`⚙️ Fase 2: Vite client      – ${flat.viteClient.toFixed(2)}s`);
  console.log(`🧩 Fase 3: Vite server      – ${flat.viteServer.toFixed(2)}s`);
  console.log(`🔥 Fase 4: Nitro build      – ${flat.nitroBuild.toFixed(2)}s`);
  if (flat.prerender > 0)
    console.log(`🌐 Fase 5: Prerender routes  – ${flat.prerender.toFixed(2)}s`);
  if (flat.finalize > 0)
    console.log(`📦 Fase 6: Output finalize   – ${flat.finalize.toFixed(2)}s`);
  console.log("─────────────────────────────────────────────");
  console.log(`✅ Totale buildtijd          – ${totalSeconds.toFixed(2)}s`);
  console.log("─────────────────────────────────────────────\n");
}

/* ------------------------------------------------------------------
 💾 SAVE METRICS (via helpers)
-------------------------------------------------------------------*/
function saveMetric(flat, totalSeconds) {
  const data = readJsonSafe(metricsFile, []);

  const entry = {
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    branch: getGitBranch(),
    nodeVersion: process.version,
    nuxtVersion: getNuxtVersion(),
    buildSeconds: totalSeconds,
    phases: {
      nuxtInit: flat.nuxtInit,
      vite: {
        client: flat.viteClient,
        server: flat.viteServer,
      },
      nitro: {
        build: flat.nitroBuild,
        prerender: flat.prerender,
        finalize: flat.finalize,
      },
    },
  };

  data.push(entry);
  writeJson(metricsFile, data);
}

/* ------------------------------------------------------------------
 🔧 UTILITIES
-------------------------------------------------------------------*/
function diff(a, b) {
  return a && b ? Math.max((a - b) / 1000, 0) : 0;
}
