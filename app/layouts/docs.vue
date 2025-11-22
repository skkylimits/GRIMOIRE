<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { computed } from 'vue'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const items = computed(() => {
	if (!navigation?.value)
		return []

	const validNav = findValidNavPath(route.path, navigation.value)

	if (validNav) {
		let items: ContentNavigationItem[] = []

		if (validNav.type === 'standalone') {
			items = [validNav.node]
		}
		else if (validNav.type === 'stripped') {
			items = validNav.node.children || []
		}

		// ✅ Apply Sorting
		const sortedItems = sortItems(items)

		return sortedItems
	}

	return []
})

const open = computed(() => {
	const validNav = findValidNavPath(route.path, navigation.value || [])
	return validNav ? [validNav.path] : []
})
</script>

<template>
	<UContainer>
		<UPage>
			<template #left>
				<UPageAside>
					<UContentNavigation
						v-if="items.length"
						:open="open"
						type="single"
						highlight
						:navigation="items"
					/>
				</UPageAside>
			</template>

			<slot />
		</UPage>
	</UContainer>
</template>
