<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'

// Huidige route ophalen
const route = useRoute()

// Injecteer navigation object
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
console.log('navigation', navigation)

// Zoek een nav item op basis van path
function findNavItemByPath(path: string, navItems: ContentNavigationItem[]): ContentNavigationItem | undefined {
	for (const item of navItems) {
		if (item.path === path) {
			return item
		}
		if (item.children) {
			const found = findNavItemByPath(path, item.children)
			if (found) {
				return found
			}
		}
	}
	return undefined
}

function findTabsNavNode(currentPath: string, navItems: ContentNavigationItem[]): ContentNavigationItem | null {
	let searchPath = currentPath
	let currentNav = findNavItemByPath(searchPath, navItems)

	while (currentNav) {
		if (currentNav.tabs) {
			return currentNav
		}
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath)
			break
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}
	return null
}

// Vind de valide navigatie node met fallback omhoog in de route
function findValidNavPath(currentPath: string, navItems: ContentNavigationItem[]) {
	let currentNav = findNavItemByPath(currentPath, navItems)
	let searchPath = currentPath

	while (currentNav) {
		if (currentNav.standalone) {
			return { node: currentNav, type: 'standalone', path: searchPath }
		}
		if (currentNav.stripped) {
			return { node: currentNav, type: 'stripped', path: searchPath }
		}
		if (currentNav.tabs) {
			return { node: currentNav, type: 'tabs', path: searchPath }
		}
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath)
			break
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}
	return null
}

// Computed property om geldig node te vinden
const validNode = computed(() => {
	return findValidNavPath(route.path, navigation.value)
})

const items = computed<NavigationMenuItem[][]>(() => {
	const tabNode = findTabsNavNode(route.path, navigation.value)
	console.log('tabNode', tabNode)
	if (!tabNode || !tabNode.children)
		return [[]]

	const mappedItems = tabNode.children.map(item => ({
		label: item.title || '',
		icon: item.icon || '',
		to: item.path || '',
		active: route.path === item.path || route.path.startsWith(`${item.path}/`),
	}))
	console.log('mappedItems', mappedItems)
	return [mappedItems]
})

// const items = computed<NavigationMenuItem[][]>(() => {
// 	const node = validNode.value?.node

// 	// Als er geen geldige node is of tabs staat niet aan, return lege array
// 	if (!node || node.tabs !== true || !node.children)
// 		return [[]]

// 	// Alleen de children van de node met `tabs: true` tonen
// 	const mappedItems = node.children.map(item => ({
// 		label: item.title || '',
// 		icon: item.icon || '',
// 		to: item.path || '',
// 		active: route.path === item.path || route.path.startsWith(item.path),
// 	}))

// 	return [mappedItems]
// })

// const items = computed<NavigationMenuItem[][]>(() => {
// 	if (!validNode.value || !validNode.value.node)
// 		return [[]] // fallback empty array of nested array

// 	const node = validNode.value.node

// 	// Kies children als die er zijn, anders node zelf in array
// 	const toRender = (node.children && node.children.length > 0) ? node.children : [node]

// 	// Mappen naar het formaat dat jouw menu verwacht
// 	const mappedItems = toRender.map(item => ({
// 		label: item.title || '',
// 		icon: item.icon || '', // neem mee als aanwezig
// 		to: item.path || '', // link
// 		// je kunt hier nog meer properties toevoegen zoals active, defaultOpen, etc
// 	}))

// 	// Return 2D array want je menu verwacht dat (één "groep" met items)
// 	return [mappedItems]
// })
// Computed boolean of er tabs zijn
// const hasTabs = computed(() => {
// 	return validNode.value?.node?.tabs === true
// })

// Children van de navigation node (indien tabs)
// const navigationChildren = computed(() => {
// 	if (!hasTabs.value)
// 		return []
// 	return validNode.value?.node?.children || []
// })
// Huidige items voor het navigatiemenu
// const items = ref<NavigationMenuItem[][]>([
// 	[
// 		{
// 			label: 'Guide',
// 			icon: 'i-lucide-book-open',
// 		},
// 		{
// 			label: 'Composables',
// 			icon: 'i-lucide-database',
// 			active: route.path.startsWith('/syntax'),
// 			defaultOpen: true,
// 		},
// 		{
// 			label: 'Components',
// 			icon: 'i-lucide-box',
// 			to: '/docs/components',
// 		},
// 	],
// ])

onMounted(() => {
	console.log('📍 Huidig pad:', route.path)
	console.log('🧩 Gevonden navigation node:', validNode)
	// console.log('🧭 Children voor navigatie:', navigationChildren)
	// console.log('📑 Tabs enabled?', hasTabs.value)
})
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
