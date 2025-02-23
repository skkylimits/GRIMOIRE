<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

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

function findValidNavPath(currentPath: string, navItems: ContentNavigationItem[]) {
	let currentNav = findNavItemByPath(currentPath, navItems)
	let searchPath = currentPath

	while (currentNav) {
		// Check if currentNav is a valid standalone or stripped node
		if (currentNav.standalone) {
			return { node: currentNav, type: 'standalone', path: searchPath }
		}

		if (currentNav.stripped) {
			return { node: currentNav, type: 'stripped', path: searchPath }
		}

		// Move up one level in the path
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath) break // Stop if there's no more parent path

		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}

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
// watchEffect(() => {
// 	if (navigation?.value) {
// 		const validNav = findValidNavPath(route.path, navigation.value)
// 		console.log('🔍 Valid Navigation Path for:', route.path, validNav)
// 	}
// })
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
