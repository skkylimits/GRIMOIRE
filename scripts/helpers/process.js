/**
 * 🧹 Sluit een child process netjes af.
 * Eerst probeert het met SIGINT, daarna forceert het SIGKILL.
 */
export function shutdown(proc, delay = 1500) {
  console.log("🧹 Sluit dev-server af...");

  try {
    // Eerst proberen: vriendelijk afsluiten
    proc.kill("SIGINT");
  } catch (err) {
    console.warn("⚠️ Kon SIGINT niet sturen:", err.message);
  }

  // ⏳ Forceer afsluiting na delay
  setTimeout(() => {
    try {
      proc.kill("SIGKILL");
    } catch (err) {
      console.warn("⚠️ Kon SIGKILL niet sturen:", err.message);
    }

    // ✅ Zorg dat het proces altijd met code 0 afsluit (geen ELIFECYCLE error)
    process.exitCode = 0;
    process.exit(0);
  }, delay);
}

// SIGINT	Gebruiker drukt op Ctrl+C	Soms genegeerd — server blijft hangen
// SIGTERM	Netjes “stop nu”	Sluit watchers & server meestal correct
// SIGKILL	Hard afsluiten (kan niet genegeerd worden)	Forceert exit (zeker in CI)
