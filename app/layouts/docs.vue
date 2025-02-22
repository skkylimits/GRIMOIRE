<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// Log the full navigation object
// watchEffect(() => {
// 	if (navigation?.value) {
// 		console.log('Navigation Data:', navigation.value)
// 	}
// })

// Helper function to determine if we should strip the top-level folder
function filterNavigation(navItems: ContentNavigationItem[]) {
	return navItems.flatMap((item) => {
		if (item?.standalone) {
			// If standalone, return it with all children
			return [item]
		}
		else if (item?.stripped) {
			// If stripped, return only its children without the parent
			console.log('Navigation stripped:', item)
			return item.children || []
		}
		return []
	})
}

// Compute the processed navigation
const filteredNavigation = computed(() => navigation?.value ? filterNavigation(navigation.value) : [])
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
