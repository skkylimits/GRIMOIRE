import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import { performance } from "node:perf_hooks";

console.log("⏱️Measuring Nuxt dev startup...");

// ⏱️ Start overall timer
const start = performance.now();
const proc = spawn("pnpm", ["run", "dev"]);

const phases = {
  nuxtInit: { preload: null, visible: null },
  vite: { client: null, server: null },
  nitro: { server: null },
  background: { client: null, server: null },
};

let latestEntry = null;

// Helper voor veilige tijdsverschillen
const diff = (a, b) => (a && b ? Math.max((a - b) / 1000, 0) : 0);

// --- Analyseer stdout ---
proc.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);

  // 1️⃣ Eerste Nuxt-log → einde preload
  if (text.includes("Nuxt ") && phases.nuxtInit.preload === null) {
    phases.nuxtInit.preload = diff(performance.now(), start);
  }

  // 2️⃣ Eerste Vite-log → begin zichtbare initfase
  if (text.includes("Vite ") && phases.nuxtInit.visible === null) {
    phases.nuxtInit.visible = diff(performance.now(), start) - phases.nuxtInit.preload;
  }

  // 3️⃣ Parse Vite client buildtijd
  const matchClient = text.match(/✔ Vite client built in (\d+(?:\.\d+)?)ms/);
  if (matchClient && !phases.vite.client) {
    phases.vite.client = parseFloat(matchClient[1]) / 1000;
  }

  // 4️⃣ Parse Vite server buildtijd
  const matchServer = text.match(/✔ Vite server built in (\d+(?:\.\d+)?)ms/);
  if (matchServer && !phases.vite.server) {
    phases.vite.server = parseFloat(matchServer[1]) / 1000;
  }

  // 5️⃣ Parse Nitro buildtijd
  const matchNitro = text.match(/Nuxt Nitro server built in (\d+(?:\.\d+)?)ms/);
  if (matchNitro && !phases.nitro.server) {
    phases.nitro.server = parseFloat(matchNitro[1]) / 1000;

    // Zodra Nitro klaar is → berekeningen
    const totalDevStartupTime = diff(performance.now(), start);
    latestEntry = buildMetric({ totalDevStartupTime, phases });

    printPhases(latestEntry);
    saveMetric(latestEntry);
  }

  // 6️⃣ Parse warm-up tijden (client/server)
  const matchClientWarm = text.match(/Vite client warmed up in (\d+(?:\.\d+)?)ms/);
  if (matchClientWarm && !phases.background.client) {
    phases.background.client = parseFloat(matchClientWarm[1]) / 1000;
  }

  const matchServerWarm = text.match(/Vite server warmed up in (\d+(?:\.\d+)?)ms/);
  if (matchServerWarm && !phases.background.server) {
    phases.background.server = parseFloat(matchServerWarm[1]) / 1000;
  }

  // Wanneer beide bekend zijn → log achtergrondfase
  if (phases.background.client && phases.background.server && latestEntry) {
    const warmupTotal = phases.background.client + phases.background.server;

    console.log(
      `🕓Fase 5: Achtergrondfase (warm-up) – ${warmupTotal.toFixed(3)}s`
    );
    console.log("─────────────────────────────────────────────\n");

    latestEntry.phases.background = { ...phases.background };
    saveMetric(latestEntry, true);
    shutdown(proc);
  }
});

// --- Error output ---
proc.stderr.on("data", (data) => process.stderr.write(data));

/* ------------------------------------------------------------------
 🧱 BUILD METRIC OBJECT
-------------------------------------------------------------------*/
function buildMetric({ totalDevStartupTime, phases }) {
  return {
    timestamp: new Date().toISOString(),
    gitCommit: getGitCommit(),
    branch: getGitBranch(),
    nodeVersion: process.version,
    nuxtVersion: getNuxtVersion(),
    devStartupSeconds: totalDevStartupTime,
    phases: {
      nuxtInit: {
        preload: phases.nuxtInit.preload || 0,
        visible: phases.nuxtInit.visible || 0,
      },
      vite: {
        client: phases.vite.client || 0,
        server: phases.vite.server || 0,
      },
      nitro: {
        server: phases.nitro.server || 0,
      },
      background: {
        client: null,
        server: null,
      },
    },
  };
}

/* ------------------------------------------------------------------
 📊 PRINT PHASE RESULTS
-------------------------------------------------------------------*/
function printPhases(metric) {
  const { nuxtInit, vite, nitro } = metric.phases;
  const total = metric.devStartupSeconds;

  console.log("\n─────────────────────────────────────────────");
  console.log("🚀Dev server is volledig operationeel!");
  console.log("─────────────────────────────────────────────");
  console.log(`🧱Fase 1a: Nuxt preload (stil)     – ${nuxtInit.preload.toFixed(3)}s`);
  console.log(`🧱Fase 1b: Nuxt init zichtbaar     – ${nuxtInit.visible.toFixed(3)}s`);
  console.log(`⚙️Fase 2: Vite client build        – ${vite.client.toFixed(3)}s`);
  console.log(`🧩Fase 3: Vite server build        – ${vite.server.toFixed(3)}s`);
  console.log(`🔥Fase 4: Nitro setup              – ${nitro.server.toFixed(3)}s`);
  console.log("─────────────────────────────────────────────");
  console.log("🌐Server luistert op: http://localhost:3000");
  console.log(`✅Totale opstarttijd               – ${total.toFixed(3)}s`);
  console.log("─────────────────────────────────────────────\n");
}

/* ------------------------------------------------------------------
 💾 SAVE METRIC FILE
-------------------------------------------------------------------*/
function saveMetric(entry, replaceLast = false) {
  const file = "metrics/dev-startup-times.json";
  let data = [];

  if (fs.existsSync(file)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
      if (Array.isArray(parsed)) data = parsed;
    } catch {
      console.warn("⚠️ Ongeldig JSON-bestand, reset.");
    }
  }

  if (replaceLast && data.length > 0) data[data.length - 1] = entry;
  else data.push(entry);

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`💾Metrics opgeslagen → ${file}`);
}

/* ------------------------------------------------------------------
 🧹 CLEAN SHUTDOWN
-------------------------------------------------------------------*/
function shutdown(proc) {
  console.log("🧹Sluit dev-server af...");

  try {
    // 🟢 Eerst proberen: vriendelijk afsluiten
    proc.kill("SIGINT");
  } catch {}

  // ⏳ Wacht even, forceer daarna volledige exit
  setTimeout(() => {
    try {
      proc.kill("SIGKILL");
    } catch {}
    // ✅ Forceer succesvolle exit — voorkomt ELIFECYCLE
    process.exitCode = 0;
    process.exit(0);
  }, 1500);
}

// SIGINT Gebruiker drukt op Ctrl+C Soms genegeerd — server blijft hangen 
// // SIGTERM Netjes “stop nu” Sluit watchers & server meestal correct 
// // SIGKILL Hard afsluiten (kan niet genegeerd worden) Forceert exit (zeker in CI)

/* ------------------------------------------------------------------
 🧭 HELPER FUNCTIES
-------------------------------------------------------------------*/
function getGitCommit() {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

function getGitBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

function getNuxtVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    return pkg.dependencies?.nuxt || pkg.devDependencies?.nuxt || "unknown";
  } catch {
    return "unknown";
  }
}

// ┌─────────────────────────────────────────────────────────────┐
// │                 🧠 NUXT DEV STARTUP TIMELINE                │
// └─────────────────────────────────────────────────────────────┘
//
// Time →
// │
// │   0.000s ────────► Script start (performance.now())
// │                    ↓
// │                    [SPAWN pnpm run dev]
// │                    └── Fases worden geïnitialiseerd
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 1a – Nuxt preload (stil)                               │
// │   └─────────────────────────────────────────────────────────────┘
// │        Tijd tussen scriptstart en eerste zichtbare Nuxt-log.
// │        → measured as: diff(nuxtInit.visible, nuxtInit.start)
// │
// │        🔹 Wat gebeurt hier?
// │           - Nuxt bereidt de dev-server in stilte voor.
// │           - fs-watchers, module scanning, config parsing, enz.
// │
// │        💬 Console toont nog niets.
// │
// │
// │   0.4s ────────► "ℹ Nuxt ..." verschijnt
// │                   ↓
// │                   phases.nuxtInit.preload = diff(now, start)
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 1b – Nuxt init zichtbaar                              │
// │   └─────────────────────────────────────────────────────────────┘
// │        Tijd vanaf eerste Nuxt-log tot start van Vite clientfase.
// │        → diff(Vite-start, nuxtInit.visible)
// │
// │        🔹 Wat gebeurt hier?
// │           - Nuxt initialiseert modules.
// │           - SSR-engine setup.
// │           - build-pipeline klaarmaken.
// │
// │
// │   3.2s ────────► "Vite ..." verschijnt
// │                   ↓
// │                   phases.nuxtInit.visible = diff(now, start) − preload
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 2 – Vite client build                                 │
// │   └─────────────────────────────────────────────────────────────┘
// │        Geparseerd direct uit logregel:
// │        ✔ Vite client built in 34ms
// │
// │        → phases.vite.client = 0.034s
// │
// │        🔹 Wat gebeurt hier?
// │           - Client-side bundling via Vite.
// │           - CSS, Vue componenten, JS entry bundels.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 3 – Vite server build                                 │
// │   └─────────────────────────────────────────────────────────────┘
// │        Geparseerd direct uit logregel:
// │        ✔ Vite server built in 33ms
// │
// │        → phases.vite.server = 0.033s
// │
// │        🔹 Wat gebeurt hier?
// │           - SSR-build van de server-bundel.
// │           - Pre-render templates en module graph setup.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 4 – Nitro setup                                       │
// │   └─────────────────────────────────────────────────────────────┘
// │        Geparseerd direct uit logregel:
// │        [nitro] ✔ Nuxt Nitro server built in 2049ms
// │
// │        → phases.nitro.server = 2.049s
// │
// │        🔹 Wat gebeurt hier?
// │           - De Nitro-backend (Node-server) wordt gebouwd.
// │           - Middleware, API-routes, file-handlers, caching.
// │
// │
// │   5.8s ────────► Dev-server draait volledig
// │                   ↓
// │                   totalDevStartupTime = diff(now, start)
// │                   ✅ Resultaten gelogd en opgeslagen
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 5 – Achtergrond warm-up                               │
// │   └─────────────────────────────────────────────────────────────┘
// │        Gebaseerd op logs:
// │        ℹ Vite client warmed up in 2ms
// │        ℹ Vite server warmed up in 35ms
// │
// │        → phases.background.client = 0.002s
// │        → phases.background.server = 0.035s
// │        (Totaal enkel berekend in log)
// │
// │        🔹 Wat gebeurt hier?
// │           - Vite cache warmt op.
// │           - Module graph en HMR-optimizer worden geladen.
// │           - Alles gereed voor snelle rebuilds.
// │
// │        Script slaat laatste metrics op en sluit netjes af.
// │
// │
// │   🧹 Sluit dev-server af...
// │   proc.kill("SIGINT");
// │   ⏳ wacht 1.5s
// │   proc.kill("SIGKILL");
// │   process.exit(0);
// │
// └─────────────────────────────────────────────────────────────┘

