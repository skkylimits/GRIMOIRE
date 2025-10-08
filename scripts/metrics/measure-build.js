// scripts/measure-build-time.js
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

console.log("⏱️ Measuring Nuxt build time (with nested phase JSON)...");

const start = Date.now();
const proc = spawn("pnpm", ["run", "build"]);

const phases = {
  nuxtInitStart: start,
  viteClientStart: null,
  viteClientEnd: null,
  viteServerStart: null,
  viteServerEnd: null,
  nitroStart: null,
  nitroEnd: null,
  prerenderStart: null,
  prerenderEnd: null,
  outputEnd: null,
};

proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // --- Nuxt & Vite fases ---
  if (text.includes("Building client...")) phases.viteClientStart = Date.now();
  if (text.match(/Client built in ([\d.]+)m?s/)) phases.viteClientEnd = Date.now();

  if (text.includes("Building server...")) phases.viteServerStart = Date.now();
  if (text.match(/Server built in ([\d.]+)m?s/)) phases.viteServerEnd = Date.now();

  // --- Nitro fase ---
  if (text.includes("Building Nuxt Nitro server")) phases.nitroStart = Date.now();
  if (text.includes("Nuxt Nitro server built")) phases.nitroEnd = Date.now();

  // --- Prerender fase ---
  if (text.includes("Initializing prerenderer")) phases.prerenderStart = Date.now();
  if (text.includes("Prerendered")) phases.prerenderEnd = Date.now();

  // --- Output finalize ---
  if (
    text.includes("Generated public") ||
    text.includes("Output directory:") ||
    text.match(/Built in [\d.]+s$/)
  ) {
    phases.outputEnd = Date.now();
  }
});

proc.stderr.on("data", (data) => process.stderr.write(data));

proc.on("close", (code) => {
  const total = (Date.now() - start) / 1000;

  if (code !== 0) {
    console.error("❌ Build failed.");
    process.exit(code);
  }

  // --- Berekeningen ---
  const flatMetrics = {
    nuxtInit: (phases.viteClientStart - phases.nuxtInitStart) / 1000,
    viteClient: (phases.viteClientEnd - phases.viteClientStart) / 1000,
    viteServer: (phases.viteServerEnd - phases.viteServerStart) / 1000,
    nitro: (phases.nitroEnd - phases.viteServerEnd) / 1000,
    prerender:
      phases.prerenderStart && phases.prerenderEnd
        ? (phases.prerenderEnd - phases.prerenderStart) / 1000
        : 0,
    finalize:
      phases.outputEnd && phases.prerenderEnd
        ? (phases.outputEnd - phases.prerenderEnd) / 1000
        : 0,
  };

  // --- Console output (blijft exact gelijk) ---
  console.log("\n─────────────────────────────────────────────");
  console.log("🏗️ Build voltooid!");
  console.log("─────────────────────────────────────────────");
  console.log(`🧱 Fase 1: Nuxt init        – ${flatMetrics.nuxtInit.toFixed(2)}s`);
  console.log(`⚙️ Fase 2: Vite client      – ${flatMetrics.viteClient.toFixed(2)}s`);
  console.log(`🧩 Fase 3: Vite server      – ${flatMetrics.viteServer.toFixed(2)}s`);
  console.log(`🔥 Fase 4: Nitro build      – ${flatMetrics.nitro.toFixed(2)}s`);
  if (flatMetrics.prerender > 0)
    console.log(`🌐 Fase 5: Prerender routes  – ${flatMetrics.prerender.toFixed(2)}s`);
  if (flatMetrics.finalize > 0)
    console.log(`📦 Fase 6: Output finalize   – ${flatMetrics.finalize.toFixed(2)}s`);
  console.log("─────────────────────────────────────────────");
  console.log(`✅ Totale buildtijd          – ${total.toFixed(2)}s`);
  console.log("─────────────────────────────────────────────\n");

  // --- Save metric in nieuwe JSON structuur ---
  saveMetric(total, flatMetrics);
});

function saveMetric(total, flatMetrics) {
  const logFile = "metrics/build-times.json";
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

  // 👉 Geneste structuur voor JSON
  const entry = {
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    buildSeconds: total,
    phases: {
      nuxtInit: flatMetrics.nuxtInit,
      vite: {
        client: flatMetrics.viteClient,
        server: flatMetrics.viteServer,
      },
      nitro: {
        build: flatMetrics.nitro,
        prerender: flatMetrics.prerender,
        finalize: flatMetrics.finalize,
      },
    },
  };

  metrics.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(metrics, null, 2));
  console.log(`💾 Metrics opgeslagen → ${logFile}`);
}

function getGitCommit() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}
