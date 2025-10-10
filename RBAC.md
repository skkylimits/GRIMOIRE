# 🧱 Prompt: Nuxt Auth Foundation Expansion (RBAC + Admin)

## 🧠 Context
Je hebt al een werkende GitHub OAuth via `@sidebase/nuxt-auth` en `next-auth@4`.
`useAuth()` werkt, sessies laden correct, en via `/debug-auth` kun je user-data zien.

Nu wil je dit uitbreiden tot een **professionele auth foundation** die:
- ✅ veilig is
- ✅ testbaar is
- ✅ schaalbaar is
- ✅ klaar is voor RBAC en een admin dashboard

---

## 🎯 Doelen van deze sessie

1. Bouw een basis **RBAC** structuur met `roles` in de `session` en middleware (`auth` + `admin`)
2. Zet een klein **Admin Dashboard** op (`/admin`) met:
   - Huidige gebruiker tonen
   - Logout knop
   - Role check (“alleen admin mag dit zien”)
3. Voeg debug-tools toe:
   - `/admin/system` route die `runtimeConfig`, `env` en `session` laat zien
4. Ontwerp een **teststrategie**:
   - Vitest voor unit tests (middleware, useAuth)
   - Playwright voor e2e-flow (OAuth, redirect, session)
5. Maak het makkelijk uitbreidbaar voor toekomstige providers (bijv. Google, Credentials)
6. Geef best practices voor observability (logging, monitoring, Sentry)

---

## 🧩 Belangrijke context

```

Nuxt: v4.x
Module: @sidebase/nuxt-auth (authjs)
Provider: GitHub
UI: @nuxt/ui

```

---

## 💬 Prompt om opnieuw te gebruiken

> **ChatGPT Prompt**
>
> Bouw stap voor stap een uitbreidbare “Auth Foundation” voor mijn bestaande Nuxt project,
> met veilige middleware, role-based access control, admin dashboard en teststrategie.
>
> Zorg dat:
> - De code clean, modulair en productierijp is
> - Alle bestanden in de juiste mappen staan
> - Elke stap wordt uitgelegd (met best practices en motivatie)
> - Ik de flow kan testen met mijn huidige setup (`pnpm dev`)

---

## 🧭 Suggestie voor bestandslocatie

```

docs/
└── prompts/
└── nuxt-auth-foundation.md

```

---

## 💡 Tip

Je kunt dit bestand koppelen aan AI-tooling zoals:
- VSCode Copilot Chat (`@prompt`)
- Cursor IDE (`/prompt`)
- ChatGPT “Custom Knowledge”
Zodat je altijd deze volledige context kunt terugroepen en verder kunt bouwen.

---

_versie 1.0 – opgesteld door ChatGPT, 9 oktober 2025_
