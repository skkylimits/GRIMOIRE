---
title: Nuxt Preview Lifecycle
description: Uitleg over de verschillende fasen van de Nuxt preview start en wat de console logs betekenen.
---

```bash
╭──────────────────────────────────Preview Mode────────────────────────────────────╮
│  You are running Nuxt production build in preview mode.                          │
│  For production deployments, please directly use node server/index.mjs command.  │
│                                                                                  │
│  Node.js:           v22.17.1                                                     │
│  Nitro Preset:      node-server                                                  │
│  Working directory: .output                                                      │
╰──────────────────────────────────────────────────────────────────────────────────╯

ℹ Starting preview command: node server/index.mjs
Listening on http://[::]:3000
```

## 1️⃣ **Preview start & server laden**

```
ℹ Starting preview command: node server/index.mjs
```

➡️ **Wat het is:**
De preview start de **productie-server** uit je `.output` map.
Hij draait `node server/index.mjs`, wat de *Nitro runtime* laadt.

Tijdens deze fase:

* wordt de Node-server geïnitialiseerd
* worden environment-variabelen ingeladen
* wordt de Nitro-renderer opgestart
* en wordt de SSR-entry (`server/index.mjs`) geïnterpreteerd

📦 **Valt onder:**

> 🧱 *Fase 1: Server laden*

💡 Deze fase meet je in je script vanaf het moment dat
`pnpm run preview` start tot de eerste logregel van Nitro verschijnt.

## 2️⃣ **Poortbinding en luisterfase**

```
Listening on http://[::]:3000
```

➡️ **Wat het is:**
De server heeft nu succesvol een poort gebonden (meestal 3000)
en luistert op HTTP-verkeer.

* Express (of interne Nitro HTTP-server) roept `server.listen()`
* OS bevestigt dat de poort vrij is
* HTTP-server is bereikbaar voor requests

📦 **Valt onder:**

> 🌐 *Fase 2: Poort binding*

💡 Vanaf dit moment is de app **volledig operationeel**.
Dit is het punt waarop jouw script `✅ Preview server volledig operationeel!` logt.

## 3️⃣ **Optionele runtime initialisatie**

Sommige modules doen nog wat *lazy loads* net ná het binden van de poort,
zoals:

* Fonts of iconpacks initialiseren
* Cache-warming van Nitro (bij veel prerendered routes)
* Runtime feature registraties (bijv. WebSocket handlers)

📦 **Valt onder:**

> 🔁 *Post-startup backgroundfase (optioneel)*

💡 Dit zijn korte achtergrondtaken; ze beïnvloeden de responstijd niet.

## 🧠 Samengevatte tijdlijn (zoals gemeten)

| Tijdlijn | Logregel                                            | Betekenis                          | In jouw fasen    |
| -------- | --------------------------------------------------- | ---------------------------------- | ---------------- |
| 0.00s    | `ℹ Starting preview command: node server/index.mjs` | Nitro-runtime laadt                | 🧱 Server laden  |
| 2.68s    | `Listening on http://[::]:3000`                     | HTTP-poort actief                  | 🌐 Poort binding |
| 2.92s    | `✅ Preview server volledig operationeel!`           | App klaar om requests te verwerken | ✅ Server ready   |

## 💬 Kort gezegd

> `pnpm run preview` draait de **gecompileerde productieversie** van je app.
> Het meetmoment `Listening on ...` betekent dat:
>
> * de Nitro-server geladen is,
> * alle SSR-logica actief is,
> * en de app klaarstaat om echte HTTP-verzoeken af te handelen.

## 📦 Waar het draait

De preview-server leest uit de `./output` directory die door `nuxt build` werd aangemaakt:

```
.output/
 ├─ server/   ← Node/Nitro SSR server
 ├─ public/   ← Statische bestanden
 └─ nitro.json
```

## 🧾 Wat jouw script meet

| Meetpunt                | Beschrijving                                                       | Bron in logs                               |
| ----------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| `loadServer`            | Tijd tussen `pnpm run preview` start en `Starting preview command` | “ℹ Starting preview command”               |
| `bindPort`              | Tijd vanaf `Starting preview command` tot `Listening on`           | “Listening on [http://...”](http://...”)   |
| `previewStartupSeconds` | Totale tijd (totaal van beide fasen)                               | berekend door `measure-preview-startup.js` |

💡 **Gebruik:**

```bash
pnpm run measure:preview
```

...om de exacte tijd te loggen die de productie-server nodig heeft om volledig online te komen.
De resultaten worden opgeslagen in:

```
metrics/preview-startup-times.json
```
