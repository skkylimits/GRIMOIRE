---
title: Nuxt Dev Lifecycle
description: Uitleg over de verschillende fasen van de Nuxt build en wat de console logs betekenen.
---

```bash
✔ Processed 3 collections and 10 files in 159.85ms (10 cached, 0 parsed)  @nuxt/content  9:06:38 AM
ℹ Nuxt Icon server bundle mode is set to local                             		  9:06:38 AM
✔ Vite client built in 30ms                                                		  9:06:39 AM
✔ Vite server built in 31ms                                               		  9:06:39 AM
✔ Nuxt Nitro server built in 2015ms                                       nitro          9:06:42 AM
ℹ Vite client warmed up in 1ms                                            		  9:06:42 AM
ℹ Vite server warmed up in 30ms
```

## 1️⃣ **Nuxt’s eigen init + module logs**

```
[@nuxt/content] ✔ Processed 3 collections and 10 files in 141.03ms (10 cached, 0 parsed)
ℹ Nuxt Icon server bundle mode is set to local
```

➡️ **Wat het is:**
Modules die in je `nuxt.config.ts` zijn ingeladen (`@nuxt/content`, `@nuxt/icon`, etc.) draaien tijdens **de Nuxt-initialisatie**.
Ze doen hun eigen setup:

* content indexeren
* iconpacks laden
* images preprocessen
* enz.

📦 **Valt onder:**

> 🧱 *Fase 1: Nuxt initialisatie*

---

## 2️⃣ **De Vite-bundles**

```
✔ Vite client built in 26ms
✔ Vite server built in 28ms
```

➡️ **Wat het is:**
Vite bouwt **twee aparte bundels**:

* **Client bundle:** de code die in de browser draait (Vue, JS, CSS, icons).
* **Server bundle:** de SSR-render code voor Node/Nitro.

Die samen vormen **de Vite build-fase**.

📦 **Valt onder:**

> ⚙️ *Fase 2: Vite bundling*

---

## 3️⃣ **De Nitro build en server start**

```
[nitro] ✔ Nuxt Nitro server built in 2017ms
```

➡️ **Wat het is:**
Nitro (de backendlaag van Nuxt) genereert:

* de SSR-render pipeline,
* runtime middlewares (`server/api`, `server/middleware`),
* en start daarna een interne HTTP-server.

📦 **Valt onder:**

> 🔥 *Fase 3: Nitro setup*

---

### 💡 En dan zie je daarna:

```
ℹ Vite client warmed up in 2ms
ℹ Vite server warmed up in 33ms
```

➡️ **Wat het is:**
Die “warmed up” logs komen **nadat** de devserver al draait.
Vite heeft op dat moment zijn interne module graph en cache opgebouwd en laat weten dat alles klaarstaat voor HMR (Hot Module Reloading).

📦 **Valt onder:**

> 🔁 *Na Fase 3 — post-startup-optimalisatie (achtergrond)*
> (dus *na* de “✅ Dev server fully ready” melding)

---

## 🧠 Samengevatte tijdlijn (jouw output)

| Tijdlijn | Logregel                                         | Betekenis                   | In jouw fasen      |
| -------- | ------------------------------------------------ | --------------------------- | ------------------ |
| 0.00s    | `[@nuxt/content] ✔ Processed ...`                | Modules laden / init        | 🧱 Nuxt init       |
| 0.32s    | `ℹ Nuxt Icon server bundle mode is set to local` | Module runtime config klaar | 🧱 Nuxt init       |
| 2.23s    | `✔ Vite client/server built`                     | Bundels gereed              | ⚙️ Vite bundling   |
| 4.33s    | `[nitro] ✔ Nuxt Nitro server built`              | Servercode + SSR gereed     | 🔥 Nitro setup     |
| 4.65s    | `✅ Dev server fully ready in ...`                | HTTP-server luistert        | 🌐 Server ready    |
| 4.70s+   | `ℹ Vite client/server warmed up ...`             | Cache en HMR actief         | 🕓 Achtergrondfase |


💬 **Kort gezegd:**

> Alles vóór jouw `✅` hoort bij de opstart —
> alles erna (zoals “warmed up”) is optimalisatie.
> Je server luistert al; jij kunt dus al werken.
