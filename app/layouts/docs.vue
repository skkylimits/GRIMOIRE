<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

/**
 * Extract the correct object from /content
 */

// Compute the matching route navigation item
const matchedRouteNavivation = computed((): ContentNavigationItem[] => {
	if (!navigation?.value) return []

	// Find the top-level matching item (e.g., `/syntax`)
	const parentMatch = navigation.value.find(item => route.path.startsWith(item.path))

	if (!parentMatch) return []

	// If we're on a parent page (e.g., `/syntax`), return just the parent
	if (route.path === parentMatch.path) return [parentMatch]

	// Find the child that matches the current route
	const childMatch = parentMatch.children?.find(child => route.path.startsWith(child.path))

	// If a child is found, return only that
	return childMatch ? [childMatch] : [parentMatch]
})

/**
 * Filter the correct Navigation Data in left menu from matchedRouteNavivation
 */

// Function to filter navigation items
function filterNavigation(navItems: ContentNavigationItem[]) {
	return navItems.flatMap((item) => {
		if (item?.standalone) {
			return [item]
		}
		else if (item?.stripped) {
			return item.children || []
		}
		return []
	})
}

// Use matchedRouteNavivation instead of navigation.value
const filteredNavigation = computed(() => filterNavigation(matchedRouteNavivation.value))

// Render only the object === to the route path
watchEffect(() => {
	if (navigation?.value) {
		console.log('Route path:', route.path)
		console.log('Navigation Data:', navigation.value)
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
