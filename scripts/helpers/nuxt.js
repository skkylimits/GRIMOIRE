import fs from "node:fs";

export function getNuxtVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    return pkg.dependencies?.nuxt || pkg.devDependencies?.nuxt || "unknown";
  } catch {
    return "unknown";
  }
}
