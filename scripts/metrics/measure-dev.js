// scripts/measure-dev-startup-times.js
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

console.log("⏱️ Measuring Nuxt dev startup time (nested phase JSON)...");

const start = Date.now();
const proc = spawn("pnpm", ["run", "dev"]);

const phases = {
  nuxtInit: null,
  viteClient: null,
  viteServer: null,
  nitroServer: null,
  background: null,
};

let totalDuration = null;
let latestEntry = null;

// --- Log parsing ---
proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // 1️⃣ Detect Nuxt init
  if (text.includes("Nuxt ") && phases.nuxtInit === null) {
    phases.nuxtInit = Date.now();
  }

  // 2️⃣ Detect Vite client build
  if (text.includes("✔ Vite client built") && phases.viteClient === null) {
    phases.viteClient = Date.now();
  }

  // 3️⃣ Detect Vite server build
  if (text.includes("✔ Vite server built") && phases.viteServer === null) {
    phases.viteServer = Date.now();
  }

  // 4️⃣ Detect Nitro server setup
  if (text.includes("Nuxt Nitro server built") && phases.nitroServer === null) {
    phases.nitroServer = Date.now();

    const total = (Date.now() - start) / 1000;
    totalDuration = total;

    const nuxtInitTime = (phases.nuxtInit - start) / 1000;
    const viteClientTime = (phases.viteClient - phases.nuxtInit) / 1000;
    const viteServerTime = (phases.viteServer - phases.viteClient) / 1000;
    const nitroServerTime = (phases.nitroServer - phases.viteServer) / 1000;

    console.log("\n─────────────────────────────────────────────");
    console.log("🚀 Dev server is volledig operationeel!");
    console.log("─────────────────────────────────────────────");
    console.log(`🧱 Fase 1: Nuxt initialisatie  – ${nuxtInitTime.toFixed(2)}s`);
    console.log(`⚙️ Fase 2: Vite client build    – ${viteClientTime.toFixed(2)}s`);
    console.log(`🧩 Fase 3: Vite server build    – ${viteServerTime.toFixed(2)}s`);
    console.log(`🔥 Fase 4: Nitro setup          – ${nitroServerTime.toFixed(2)}s`);
    console.log("─────────────────────────────────────────────");
    console.log("🌐 Server luistert op: http://localhost:3000");
    console.log(`✅ Totale opstarttijd           – ${total.toFixed(2)}s`);
    console.log("─────────────────────────────────────────────\n");

    // Maak log-entry (zonder backgroundfase)
    latestEntry = {
      timestamp: new Date().toISOString(),
      gitCommit: getGitCommit(),
      devStartupSeconds: total,
      phases: {
        nuxtInit: nuxtInitTime,
        vite: {
          client: viteClientTime,
          server: viteServerTime,
        },
        nitro: {
          server: nitroServerTime,
        },
        background: {
          warmup: 0,
        },
      },
    };
    
    saveMetric(latestEntry, true); // nieuwe entry toevoegen
    console.log("─────────────────────────────────────────────\n");
  }

  // 5️⃣ Detect background warm-up
  if (text.includes("Vite server warmed up")) {
    phases.background = Date.now();
    const backgroundTime = (phases.background - phases.nitroServer) / 1000;

    console.log(`🕓 Fase 5: Achtergrondfase (warm-up) – ${backgroundTime.toFixed(2)}s`);
    console.log("─────────────────────────────────────────────\n");

    if (latestEntry) {
      latestEntry.phases.background.warmup = backgroundTime;
      saveMetric(latestEntry, true, true); // laatste entry updaten
    }

    proc.kill("SIGINT");
    // ✅ CI-safe afsluiting
    setTimeout(() => {
    proc.kill("SIGKILL");
    process.exit(0);
    }, 1500);

    // SIGINT	Gebruiker drukt op Ctrl+C	Soms genegeerd — server blijft hangen
    // SIGTERM	Netjes “stop nu”	Sluit watchers & server meestal correct
    // SIGKILL	Hard afsluiten (kan niet genegeerd worden)	Forceert exit (zeker in CI)
  }
});

proc.stderr.on("data", (data) => process.stderr.write(data));

// --- Metrics opslaan ---
function saveMetric(entry, append = false, replaceLast = false) {
  const logFile = "metrics/dev-startup-times.json";
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

  if (replaceLast && metrics.length > 0) {
    metrics[metrics.length - 1] = entry; // update laatste
  } else if (append || metrics.length === 0) {
    metrics.push(entry); // voeg toe
  }

  fs.writeFileSync(logFile, JSON.stringify(metrics, null, 2));
  console.log(
    `💾 Metric ${replaceLast ? "bijgewerkt" : "opgeslagen"} → ${logFile}`
  );
}

function getGitCommit() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}
