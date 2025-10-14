<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

/* eslint-disable no-console */

/**
 * Functie om de tabs voor een bepaald pad op te halen
 */
function findTabsForPath(path: string, navItems: any[]): string[] | null {
	const item = findNavItemByPath(path, navItems)
	if (item && item.tabs) {
		return Array.isArray(item.tabs) ? item.tabs : null // Zorg ervoor dat het altijd een string array is
	}
	return null
}

/**
 * Functie om een item te vinden op basis van het pad
 */
function findNavItemByPath(path: string, navItems: any[]): any | undefined {
	console.log('Finding nav item for path:', path)

	for (const item of navItems) {
		if (item.path === path) {
			console.log('Found item:', item)
			return item
		}
		if (item.children) {
			const found = findNavItemByPath(path, item.children)
			if (found) {
				return found
			}
		}
	}

	console.log('No item found for path:', path)
	return undefined
}

/**
 * Simulatie van de navigatie-items (dit zou je uit een echte bron kunnen halen)
 */
const navigationItems = [
	{
		path: '/syntax/javascript',
		tabs: ['junior', 'midlevel'],
		stripped: true, // Dit is de stripped eigenschap die je wilt checken
		children: [],
	},
	{
		path: '/syntax/python',
		tabs: ['beginner', 'advanced'],
		stripped: false,
		children: [],
	},
]

// De huidige route ophalen
const route = useRoute()

// Functie om te kijken of er tabs zijn voor de huidige route
const tabs = computed(() => {
	const validNav = findNavItemByPath(route.path, navigationItems)

	if (validNav) {
		const tabs = findTabsForPath(route.path, navigationItems)
		if (tabs) {
			return tabs
		}
	}
	return [] // Lege array als er geen tabs zijn
})

// Functie om te kijken of het item stripped is
const isStripped = computed(() => {
	const validNav = findNavItemByPath(route.path, navigationItems)
	return validNav?.stripped || false
})

// Huidige items voor het navigatiemenu
const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: 'Guide',
			icon: 'i-lucide-book-open',
		},
		{
			label: 'Composables',
			icon: 'i-lucide-database',
			active: route.path.startsWith('/syntax'),
			defaultOpen: true,
		},
		{
			label: 'Components',
			icon: 'i-lucide-box',
			to: '/docs/components',
		},
	],
])

// Debugging: log de tabs zodra de component is geladen
onMounted(() => {
	console.log('Tabs for current path:', tabs.value)
	console.log('Is stripped:', isStripped.value)
})

// onMounted(async () => {
// 	let path = route.path
// 	let nav = []
// 	let found = false

// 	while (path && !found) {
// 		nav = await queryContentNavigation(path).find()

// 		if (nav.length > 0) {
// 			found = true
// 		}
// 		else {
// 			path = path.split('/').slice(0, -1).join('/')
// 		}
// 	}

// 	console.log('📂 Gevonden navigation voor:', path, nav)
// })

// onMounted(() => {
// 	console.log('🌲 Content navigation:', JSON.stringify(navigation?.value, null, 2))
// })

// Debugging: log de tabs zodra de component is geladen
// onMounted(() => {
// 	console.log('Tabs for current path:', tabs.value)
// 	console.log('Is stripped:', isStripped.value)
// })
</script>

<template>
	<UHeader :ui="{ center: 'flex-1' }" class="h-auto z-66">
		<template #left>
			<!-- Dynamisch de tabs toevoegen aan het menu als ze bestaan -->
			<UNavigationMenu
				highlight
				highlight-color="primary"
				orientation="horizontal"
				:items="items"
			/>
		</template>
	</UHeader>
</template>
