import type { ContentNavigationItem } from '@nuxt/content'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
/* eslint-disable no-console */

/**
 * Functie om de tabs voor een bepaald pad op te halen
 */
function findTabsForPath(path: string, navItems: ContentNavigationItem[]): string[] | null {
	const item = findNavItemByPath(path, navItems)
	if (item && item.tabs) {
		return Array.isArray(item.tabs) ? item.tabs : null // Zorg ervoor dat het altijd een string array is
	}
	return null
}

/**
 * Functie om een item te vinden op basis van het pad
 */
function findNavItemByPath(path: string, navItems: ContentNavigationItem[]): ContentNavigationItem | undefined {
	console.log('Finding nav item for path:', path) // Debug: Log welk pad we aan het zoeken zijn

	for (const item of navItems) {
		if (item.path === path) {
			console.log('Found item:', item) // Debug: Log als we het item vinden
			return item
		}
		if (item.children) {
			const found = findNavItemByPath(path, item.children)
			if (found) {
				return found
			}
		}
	}

	console.log('No item found for path:', path) // Debug: Log als geen item wordt gevonden
	return undefined
}

/**
 * Composable die de tabs ophaalt en de status van de tabnavigatie weergeeft
 */
export function useTabNavigation(navigation: ContentNavigationItem[]) {
	const route = useRoute()

	const tabs = computed(() => {
		const validNav = findNavItemByPath(route.path, navigation)

		if (validNav) {
			console.log('Found validNav:', validNav) // Debug: Log het gevonden item

			const tabs = findTabsForPath(route.path, navigation)
			if (tabs) {
				console.log('Tabs found for path:', tabs) // Debug: Log de tabs die we gevonden hebben
				return tabs // Return de tabs als deze gedefinieerd zijn
			}
		}

		console.log('No tabs found or validNav is undefined.') // Debug: Log als er geen tabs zijn of validNav undefined is
		return [] // Zorg ervoor dat je altijd een lege array retourneert in plaats van null
	})

	return {
		tabs,
	}
}
