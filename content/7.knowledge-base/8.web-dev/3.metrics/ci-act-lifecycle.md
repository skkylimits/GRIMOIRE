---
title: GitHub Actions & act
description: Uitleg over de verschillende fasen van een GitHub Actions job en hoe act lokaal werkt.
---

# ⚙️ CI Runtime Lifecycle — GitHub Actions & act

> 🧠 GitHub Actions en `act` volgen **dezelfde structuur**:
> elke job draait in een verse Linux-container en doorloopt vaste fasen.


## 🏗️ Fase-overzicht

```
┌───────────────────────────────┐
│ ⚙️ Fase 1: Container aanmaken │
│ 🧰 Fase 2: Repo checkout       │
│ 🧱 Fase 3: Node & tools setup  │
│ 📦 Fase 4: Dependencies        │
│ 🧪 Fase 5: Script execution    │
│ 🚨 Fase 6: Validatie / Output  │
└───────────────────────────────┘
```

Elke `run:` in je workflow is één shell-commando binnen dezelfde container,
uitgevoerd in de context van `$GITHUB_WORKSPACE` (meestal je projectmap).


## ⚙️ **Fase 1 – Container aanmaken**

**Wat er gebeurt:**

* GitHub of `act` start een verse Docker-container.
* Het base image is meestal `ubuntu-latest` (of `catthehacker/ubuntu:act-latest` lokaal).
* Er is nog géén Node, geen pnpm, geen code — alleen een kaal systeem.

**Typische mapstructuur:**

```
/
├─ bin/
├─ usr/
├─ var/
└─ home/runner/
```

💡 *Elke nieuwe job start schoon — er is géén state tussen jobs.*

---

## 🧰 **Fase 2 – Repository checkout**

**Actie:**

```yaml
- uses: actions/checkout@v4
```

**Wat er gebeurt:**

* Jouw branch wordt gecloned naar:

  ```
  /home/runner/work/<repo-name>/<repo-name>/
  ```
* De env-var `GITHUB_WORKSPACE` verwijst naar die map.

**Voorbeeld:**

```bash
echo $GITHUB_WORKSPACE
# → /home/runner/work/Nameless/Nameless
```

**Debug-tip:**

```yaml
- name: 🔍 Debug workspace
  run: |
    echo "📂 $(pwd)"
    ls -la
```

## 🧱 **Fase 3 – Node & tools setup**

**Actie:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
```

**Wat er gebeurt:**

* Node wordt gedownload of uit cache gehaald:

  ```
  /opt/hostedtoolcache/node/22.20.0/x64/bin/
  ```
* Dit pad wordt toegevoegd aan `$PATH`.
* `node`, `npm` en `npx` zijn nu wereldwijd beschikbaar.

**Als je PNPM gebruikt:**

```bash
npm install -g pnpm@9
```

wordt geïnstalleerd in `/usr/local/bin/pnpm`
en ook toegevoegd aan `$PATH`.


## 📦 **Fase 4 – Dependencies installeren**

**Actie:**

```yaml
- run: pnpm install --frozen-lockfile
```

**Wat er gebeurt:**

* PNPM zoekt in de huidige directory naar een `package.json`.
* Als die ontbreekt (of als je in `/` zit), krijg je:

  ```
  ERROR  packages field missing or empty
  ```

✅ **Oplossing (altijd doen):**

```yaml
defaults:
  run:
    working-directory: ${{ github.workspace }}
```

📁 Je werkt dan gegarandeerd in:

```
/home/runner/work/<repo>/<repo>/
```

## 🧪 **Fase 5 – Script execution**

**Wat er gebeurt:**

* Je eigen scripts worden uitgevoerd binnen dezelfde container.
* Bijvoorbeeld:

  ```bash
  node scripts/metrics/measure-build-time.js
  ```
* Deze scripts kunnen bestanden schrijven naar `metrics/` of `.output/`.

💡 Alles wat in `$GITHUB_WORKSPACE` geschreven wordt, blijft bewaard voor artifact upload.

---

## 🚨 **Fase 6 – Validatie & output**

**Wat er gebeurt:**

* Laatste stap: thresholds, tests of metrics worden gecontroleerd.
* Als één check faalt:

  ```
  ❌ Job failed
  ```
* Anders:

  ```
  ✅ Job successful
  ```

**Artifacts uploaden:**

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: nuxt-performance-metrics
    path: metrics/
```

Alles in `/metrics` wordt dan als downloadbaar artifact bewaard in GitHub.

## 🧩 Mapstructuur in de container (visueel)

```
/home/runner/work/Nameless/
└── Nameless/
    ├── package.json
    ├── pnpm-lock.yaml
    ├── scripts/
    │   └── metrics/
    │       ├── measure-build-time.js
    │       ├── measure-dev-startup.js
    │       ├── measure-preview-startup.js
    │       └── check-performance-thresholds.js
    ├── metrics/
    │   ├── build-times.json
    │   ├── dev-startup-times.json
    │   └── preview-startup-times.json
    └── .github/
        └── workflows/
            └── metrics.yml
```

## 🧠 Samenvattende mental model

| Fase | Actie                | Map                             | Wat gebeurt er               |
| ---- | -------------------- | ------------------------------- | ---------------------------- |
| ⚙️ 1 | Container aanmaken   | `/`                             | Nieuwe Ubuntu container      |
| 🧰 2 | Checkout repo        | `/home/runner/work/...`         | Code wordt gecloned          |
| 🧱 3 | Setup Node + PNPM    | `/opt/hostedtoolcache/`         | Tools geïnstalleerd          |
| 📦 4 | Install dependencies | `$GITHUB_WORKSPACE`             | node_modules geïnstalleerd   |
| 🧪 5 | Run scripts          | `$GITHUB_WORKSPACE/scripts/...` | Build / test / metrics       |
| 🚨 6 | Upload / Validate    | `$GITHUB_WORKSPACE/metrics`     | Artifacts & thresholds check |

## 💡 Debug tips (altijd handig)

```yaml
- name: 🧠 Debug info
  run: |
    echo "📂 Working dir: $(pwd)"
    echo "🧱 Node path: $(which node)"
    echo "📦 pnpm path: $(which pnpm)"
    echo "👤 User: $(whoami)"
    echo "💾 Workspace: $GITHUB_WORKSPACE"
    ls -la
```

## 🎯 TL;DR

> `act` = GitHub Actions in je eigen Docker
> Container start schoon → repo wordt gecloned → Node/tools geïnstalleerd → scripts draaien → artifacts geüpload.
>
> Als PNPM klaagt over `packages field missing`, zit je in `/` in plaats van `$GITHUB_WORKSPACE`.
