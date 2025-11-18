# Bug: Navigation + Tabs Redirect Issue

**Datum**: 2025-11-09
**Status**: Onopgelost
**Locatie**: `app/pages/[...slug].vue`, navigatie flow

---

## Probleem Beschrijving

### Het Gewenste Gedrag
Wanneer je via het menu navigeert naar een pagina met `tabs: true` (zoals `/syntax/javascript`), zou de app moeten redirecten naar de eerste markdown pagina binnen de eerste tab (bijv. `/syntax/javascript/junior/prerequisites`).

### Wat Er Gebeurt

#### Scenario 1: Direct navigeren via menu
1. Start op `/the-lab`
2. Klik op "JavaScript" in het menu
3. URL verandert naar `/syntax/javascript`
4. **BUG**: De content van `/the-lab` blijft zichtbaar (oude gecachte content)
5. De redirect naar `/syntax/javascript/junior/prerequisites` gebeurt NIET
6. De AppTabHeader (tabs) wordt WEL getoond

#### Scenario 2: Direct URL invoeren of page reload
1. Type `/syntax/javascript` in de URL bar en druk op Enter
2. **BUG**: Na onze laatste poging werkt de redirect niet meer bij page reload

---

## Huidige Architectuur

### Data Flow: `.navigation.yml` → `AppTabHeader`

```
1. app/app.vue:4
   └─ queryCollectionNavigation('docs') leest alle .navigation.yml bestanden

2. app/app.vue:27
   └─ provide('navigation', navigation) maakt data beschikbaar

3. app/components/AppTabHeader.vue:8
   └─ inject('navigation') haalt data op

4. app/components/AppTabHeader.vue:11
   └─ findTabsNavNode(route.path, navigation.value)

5. app/composables/useRouteHelpers.ts:58-73
   └─ Loopt door nav tree omhoog tot tabs: true gevonden wordt

6. app/components/AppTabHeader.vue:10-22
   └─ Render children van tabs node als menu items
```

### `findTabsNavNode()` Logica
```typescript
export function findTabsNavNode(currentPath: string, navItems: ContentNavigationItem[]): ContentNavigationItem | null {
	let searchPath = currentPath
	let currentNav = findNavItemByPath(searchPath, navItems)

	// Loop omhoog door directory structuur
	while (currentNav) {
		if (currentNav.tabs) {          // ⭐ Check tabs: true
			return currentNav
		}
		// Ga één directory level omhoog
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath) break
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}
	return null
}
```

---

## Geprobeerde Oplossingen

### Poging 1: `watch` toevoegen aan `useAsyncData`
**Bestand**: `app/pages/[...slug].vue`

```typescript
const { data: page } = await useAsyncData(
	route.path,
	() => queryCollection('docs').path(route.path).first(),
	{ watch: [() => route.path] },  // ⭐ Toegevoegd
)
```

**Resultaat**: Partial success - data werd opnieuw gefetcht, maar redirect logica werkte niet

---

### Poging 2: Reactive redirect met `watch`
**Bestand**: `app/pages/[...slug].vue`

```typescript
// Functie om redirect uit te voeren
function handleRedirect() {
	if (!page.value) {
		const navItem = findNavItemByPath(route.path, navigation.value)

		if (navItem?.children?.length) {
			let redirectTarget = null

			// Als node tabs heeft, zoek in eerste tab's children
			if (navItem.tabs && navItem.children[0]?.children?.length) {
				redirectTarget = findFirstValidMdNode(navItem.children[0].children)
			}
			else {
				redirectTarget = findFirstValidMdNode(navItem.children)
			}

			if (redirectTarget) {
				navigateTo(redirectTarget.path)  // Client-side redirect
				return
			}
		}

		throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
	}
}

// Initiële check
handleRedirect()

// Watch route changes
watch(() => route.path, () => {
	handleRedirect()
})
```

**Resultaat**: Werkte voor client-side navigatie, maar brak page reloads (404 in plaats van redirect)

---

### Poging 3: Middleware (door user geprobeerd)
**Bestand**: `app/middleware/docs-redirect.global.ts` (vermoedelijk)

**Resultaat**: Onbekend, werd ge-reset

---

## Root Cause Analyse

### Probleem 1: Cache vs Redirect Timing
- `useAsyncData` cacht met `route.path` als key
- Bij client-side navigatie wordt oude cache gebruikt voordat nieuwe data gefetcht is
- Redirect logica draait voordat nieuwe data beschikbaar is

### Probleem 2: Server vs Client Redirect
- `throw createError()` werkt alleen server-side (bij page reload)
- `navigateTo()` werkt alleen client-side (bij SPA navigatie)
- We hebben beide nodig maar ze werken niet samen in dezelfde flow

### Probleem 3: Async Timing
- De `<script setup>` met `await useAsyncData` draait asynchroon
- De redirect check gebeurt mogelijk te vroeg of te laat
- `watch` callback heeft mogelijk stale data

---

## Mogelijke Oplossingen om te Proberen

### Optie A: Nuxt Middleware
Maak een global middleware die redirects afhandelt VOOR page rendering:
```typescript
// app/middleware/tabs-redirect.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
	const { data: page } = await queryCollection('docs').path(to.path).first()

	if (!page) {
		const navigation = await queryCollectionNavigation('docs')
		const navItem = findNavItemByPath(to.path, navigation)

		if (navItem?.children?.length) {
			let redirectTarget = null
			if (navItem.tabs && navItem.children[0]?.children?.length) {
				redirectTarget = findFirstValidMdNode(navItem.children[0].children)
			} else {
				redirectTarget = findFirstValidMdNode(navItem.children)
			}

			if (redirectTarget) {
				return navigateTo(redirectTarget.path)
			}
		}
	}
})
```

**Voordeel**: Draait VOOR page render, werkt zowel server als client-side
**Nadeel**: Mogelijk extra query overhead

---

### Optie B: Server-side redirect met `navigateTo` fallback
```typescript
// In [slug].vue setup
const { data: page } = await useAsyncData(
	route.path,
	async () => {
		const data = await queryCollection('docs').path(route.path).first()

		// Als geen page, check redirect tijdens fetch
		if (!data && import.meta.server) {
			const navItem = findNavItemByPath(route.path, navigation.value)
			// ... redirect logica
			throw createError({ statusCode: 301, data: { redirectTo: target } })
		}

		return data
	},
	{ watch: [() => route.path] }
)

// Client-side redirect in watch
if (import.meta.client) {
	watch(() => route.path, () => {
		if (!page.value) {
			// redirect logica met navigateTo()
		}
	})
}
```

---

### Optie C: Index files aanmaken
In plaats van redirecten, maak `0.index.md` files aan in elke tabs directory:
```
content/2.syntax/7.javascript/
  ├── 0.index.md  ← Nieuwe file met overview content
  ├── .navigation.yml (tabs: true)
  ├── 1.junior/
  ├── 2.mid-level/
  └── 3.senior/
```

**Voordeel**: Simpelste oplossing, geen redirect magic nodig
**Nadeel**: Extra content nodig, mogelijk niet gewenst UX

---

## Tech Stack Context

- **Framework**: Nuxt 4 (Vue 3)
- **Content**: Nuxt Content (Markdown-based)
- **Routing**: File-based met `[...slug].vue` catch-all
- **Cache**: `useAsyncData` met automatic key management

---

## Relevante Files

- `app/pages/[...slug].vue` - Main content page met redirect logica
- `app/components/AppTabHeader.vue` - Tabs rendering component
- `app/composables/useRouteHelpers.ts` - Helper functies (findTabsNavNode, etc.)
- `app/app.vue` - Navigation data provider
- `content/2.syntax/7.javascript/.navigation.yml` - Voorbeeld tabs config

---

## Volgende Stappen

1. Test Optie A (Middleware approach) eerst - meest robuust
2. Als dat niet werkt, probeer Optie B (server/client split)
3. Als alles faalt, overweeg Optie C (index files) als pragmatische oplossing

---

## Notes

- De `tabs: true` property komt uit `.navigation.yml` en wordt automatisch geparst door Nuxt Content
- `AppTabHeader` wordt altijd gerenderd in `app.vue` (regel 38), dus tabs zijn altijd zichtbaar
- De redirect moet ALTIJD gebeuren (zowel SPA navigatie als page reload)
- Dit is een educatief project, dus perfecte UX is belangrijk maar niet kritiek
