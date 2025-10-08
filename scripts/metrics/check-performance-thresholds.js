// scripts/metrics/check-performance-thresholds.js
import fs from "node:fs";

console.log("🔍 Checking performance thresholds...");

const THRESHOLDS = {
  devStartupSeconds: 8,
  buildSeconds: 60,
  previewStartupSeconds: 6,
  // Optional per-phase thresholds (add as needed)
  phases: {
    vite: 10,
    nitro: 35,
  },
};

function checkFile(path, type) {
  if (!fs.existsSync(path)) {
    console.warn(`⚠️ ${path} not found, skipping.`);
    return false;
  }

  const data = JSON.parse(fs.readFileSync(path, "utf-8"));
  const last = data[data.length - 1];

  if (!last) return false;

  let failed = false;

  // Top-level check
  if (THRESHOLDS[`${type}Seconds`] && last[`${type}Seconds`] > THRESHOLDS[`${type}Seconds`]) {
    console.error(`❌ ${type} time too long: ${last[`${type}Seconds`].toFixed(2)}s (limit ${THRESHOLDS[`${type}Seconds`]}s)`);
    failed = true;
  }

  // Per-phase checks
  if (last.phases && THRESHOLDS.phases) {
    for (const [phase, limit] of Object.entries(THRESHOLDS.phases)) {
      const value = findPhaseTime(last.phases, phase);
      if (value && value > limit) {
        console.error(`❌ Phase ${phase} too slow: ${value.toFixed(2)}s (limit ${limit}s)`);
        failed = true;
      }
    }
  }

  if (!failed) {
    console.log(`✅ ${type} within limits (${last[`${type}Seconds`].toFixed(2)}s)`);
  }

  return failed;
}

function findPhaseTime(phases, key) {
  if (phases[key]) {
    if (typeof phases[key] === "number") return phases[key];
    if (typeof phases[key] === "object")
      return Object.values(phases[key]).reduce((a, b) => a + b, 0);
  }
  return 0;
}

const results = [
  checkFile("metrics/dev-startup-times.json", "devStartup"),
  checkFile("metrics/build-times.json", "build"),
  checkFile("metrics/preview-startup-times.json", "previewStartup"),
];

if (results.some(Boolean)) {
  console.error("🚨 Performance thresholds exceeded. Failing CI run.");
  process.exit(1);
} else {
  console.log("🎯 All metrics within limits.");
}
