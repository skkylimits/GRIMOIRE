<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

function findNavItemByPath(path: string, navItems: ContentNavigationItem[]): ContentNavigationItem | undefined {
	console.log('Searching for path:', path)

	for (const item of navItems) {
		console.log('Checking item:', item.path)

		if (item.path === path) {
			console.log('✅ Found match:', item)
			return item
		}

		if (item.children) {
			console.log('🔄 Searching children of:', item.path)
			const found = findNavItemByPath(path, item.children)
			if (found) {
				console.log('✅ Found match in children:', found)
				return found
			}
		}
	}

	console.log('❌ No match found for:', path)
	return undefined
}

function findValidNavPath(currentPath: string, navItems: ContentNavigationItem[]) {
	console.log('🔍 Finding valid navigation path for:', currentPath)

	let currentNav = findNavItemByPath(currentPath, navItems)
	let searchPath = currentPath

	while (currentNav) {
		// Check if currentNav is a valid standalone or stripped node
		if (currentNav.standalone) {
			console.log('✅ Found standalone node:', currentNav)
			return { node: currentNav, type: 'standalone', path: searchPath }
		}

		if (currentNav.stripped) {
			console.log('✅ Found stripped node:', currentNav)
			return { node: currentNav, type: 'stripped', path: searchPath }
		}

		// Move up one level in the path
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath) break // Stop if there's no more parent path

		console.log('⬆️ No standalone/stripped found, checking parent path:', parentPath)
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}

	console.log('❌ No valid standalone/stripped navigation node found.')
	return null
}

const filteredNavigation = computed(() => {
	if (!navigation?.value) return []

	const validNav = findValidNavPath(route.path, navigation.value)

	if (validNav) {
		if (validNav.type === 'standalone') {
			// Only return the standalone node itself
			return [validNav.node]
		}
		else if (validNav.type === 'stripped') {
			// Return the children of the stripped node as top-level items
			return validNav.node.children || []
		}
	}

	return []
})

// Render only the object === to the route path
watchEffect(() => {
	if (navigation?.value) {
		// console.log('Route path:', route.path)
		console.log('Navigation Data:', navigation.value)

		// const matchedItem = findNavItemByPath(route.path, navigation.value)
		// console.log('🛠 Matched Item for Route:', route.path, matchedItem)

		const validNav = findValidNavPath(route.path, navigation.value)
		console.log('🔍 Valid Navigation Path for:', route.path, validNav)
	}
})
</script>

<template>
	<UContainer>
		<UPage>
			<template #left>
				<UPageAside>
					<UContentNavigation
						type="single"
						highlight
						:navigation="filteredNavigation"
					/>
				</UPageAside>
			</template>

			<slot />
		</UPage>
	</UContainer>
</template>
