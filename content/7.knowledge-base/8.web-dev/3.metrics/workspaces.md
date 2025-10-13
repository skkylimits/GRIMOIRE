---
title: pnpm-workspaces.yaml;
description: Uitleg over de pnpm-workspace.yaml foutmelding en hoe je die oplost.
---

## 🧩 Wat er aan de hand is

Je hebt een map met jouw project in, bijvoorbeeld:

```
Heaven/Nameless/
```

en daar zit een bestand in dat heet **pnpm-workspace.yaml**
met dit erin:

```yaml
packages:
  - .
  - scripts/*
  - server/*
  - app/*
  - content/*
```

## 🧠 Wat dat betekent

Dat zegt tegen **pnpm**:

> “Hé, dit is geen gewoon project.
> Dit is een **grote doos (workspace)** met meerdere kleine projectjes erin!”

Dus:

* `.` = jouw hoofddoos (root)
* `scripts/*`, `server/*`, `app/*`, `content/*` = allemaal kleine doosjes (subprojecten)

---

## 🧱 Stel je voor

Je hebt één grote doos met Lego (dat is de *workspace*).
Daarin zitten allemaal kleine doosjes met hun eigen bouwsteentjes.

Als je dan zegt:

```
pnpm add @sidebase/nuxt-auth
```

dan vraagt pnpm:

> “Wil je dit in **de grote doos** doen (de root)?
> Of bedoel je één van de kleine doosjes?”

Omdat het niet zeker weet wat jij bedoelt, waarschuwt het je:

```
ERR_PNPM_ADDING_TO_ROOT
```

## 💡 Hoe je het oplost

Als je **zeker weet** dat je het pakket in de *grote doos* (de root) wilt zetten
(dus gewoon in `Nameless/package.json`), gebruik je:

```bash
pnpm add @sidebase/nuxt-auth -w
```

De `-w` betekent **workspace-root**.

Dan zegt pnpm:

> “Oké, ik weet het zeker — ik doe het in de hoofdmap.”


## 🔧 Samenvatting van wat je kunt doen

| Wat je wilt doen                                      | Commando                                           |
| ----------------------------------------------------- | -------------------------------------------------- |
| pakket in de hoofdmap installeren                     | `pnpm add <pakket> -w`                             |
| pakket in een submap (bijv. `server/api`) installeren | `cd server/api && pnpm add <pakket>`               |
| waarschuwing altijd negeren                           | `pnpm config set ignore-workspace-root-check true` |


## ✅ In jouw geval

Je Nuxt-app draait gewoon in de root (`Nameless/`),
dus je wilt dit:

```bash
pnpm add @sidebase/nuxt-auth -w
```

Daarna ben je klaar, en komt die foutmelding nooit meer.

## pnpm exec nuxi module add sidebase-atuh -w

Geeft nog steeds een waarschuwing

```bash
❤️  ~/Heaven/Nameless  >> pnpm exec nuxi module add sidebase-auth -w
ℹ Resolved @sidebase/nuxt-auth, adding module...                                                                                                                          nuxi 7:22:28 PM
ℹ Installing @sidebase/nuxt-auth@1.1.0 as a dependency                                                                                                                    nuxi 7:22:28 PM
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```
Goede vraag — en dit is **precies de verwarrende kant** van pnpm workspaces 😅

Laten we even stap voor stap ontrafelen wat er gebeurt.

## 🧠 1️⃣ Wat je commando écht doet

Je draait:

```bash
pnpm exec nuxi module add sidebase-auth -w
```

Wat dat eigenlijk betekent:

* `pnpm exec` → voer een tool (nuxi) uit die in je node_modules staat
* `nuxi module add sidebase-auth` → laat Nuxt het modulepakket toevoegen
* `-w` → zeg tegen **pnpm**, niet tegen **nuxi**, dat het in de root moet installeren

👉 probleem: de `-w` vlag hoort bij `pnpm add`, **niet** bij `nuxi`.

Dus pnpm leest `-w` niet als een eigen vlag, maar probeert het door te geven aan nuxi →
en die weet niks van `-w`. Daarom krijg je alsnog die waarschuwing.

## 💡 2️⃣ De juiste manier om dit te doen

Je moet het in twee losse stappen doen:

### ✅ stap 1: installeer het pakket met pnpm zelf

```bash
pnpm add @sidebase/nuxt-auth -w
```

> Dit voegt het pakket toe aan je `package.json` in de root.

### ✅ stap 2: voeg de module toe in je Nuxt-config

```bash
npx nuxi module add sidebase-auth
```

> Dit commando voegt automatisch `@sidebase/nuxt-auth` toe aan `modules:` in `nuxt.config.ts`.

(of je kunt dat zelf doen, wat jij al hebt)


## ⚙️ Waarom pnpm klaagt

Omdat je een **workspace** gebruikt, ziet pnpm dat je op root-niveau zit.
Het wil voorkomen dat je per ongeluk een dependency toevoegt aan alle projecten tegelijk.
De `-w` vlag zegt dan expliciet:

> "Ja, ik bedoel de root, geen subproject."


## ✅ TL;DR

| Wat je nu deed                               | Waarom fout                            | Wat je moet doen                                                                   |
| -------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| `pnpm exec nuxi module add sidebase-auth -w` | `-w` hoort bij `pnpm`, niet bij `nuxi` | 1️⃣ `pnpm add @sidebase/nuxt-auth -w` <br> 2️⃣ `npx nuxi module add sidebase-auth` |
