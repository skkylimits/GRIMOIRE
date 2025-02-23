<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

/**
 *
 *
 * Filter the correct Navigation Data in left menu
 *
 *
 */

// Log the full navigation object
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

// Filter the processed navigation
const filteredNavigation = computed(() => navigation?.value ? filterNavigation(navigation.value) : [])

/**
 *
 *
 * Ensure the correct menu section expands automatically based on the current route on reload
 *
 *
 */

// We need to find the parent title of the current route in the object to activate the correct menu section
const findParentTitle = (data: ContentNavigationItem[], targetPath: string): string | null => {
	for (const section of data) {
		if (section.children) {
			const foundChild = section.children.find(child => child.path === targetPath)
			if (foundChild) return section.title // Return the parent's title
			const deeperSearch = findParentTitle(section.children, targetPath)
			if (deeperSearch) return deeperSearch
		}
	}
	return null
}

// Function to match & click the right menu button
const activateMenu = () => {
	if (!navigation?.value) {
		console.warn('Navigation data is not available yet.')
		return
	}

	const targetPath = route.path
	const parentTitle = findParentTitle(navigation.value, targetPath)

	console.log('Parent Title:', parentTitle) // Should output "Core Principles"

	if (parentTitle) {
		setTimeout(() => {
			const button = Array.from(document.querySelectorAll('button span.truncate'))
				.find(span => span.textContent?.includes(parentTitle))
				?.closest('button')

			if (button) button.click()
		}, 100) // Small delay to ensure elements are rendered
	}
	else {
		console.warn('No parent title found for the current route.')
	}
}

// Run after DOM is mounted
onMounted(() => {
	activateMenu()
})

watchEffect(() => {
	if (navigation?.value) {
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
