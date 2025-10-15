<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const items = computed<NavigationMenuItem[][]>(() => {
	const tabNode = findTabsNavNode(route.path, navigation.value)
	if (!tabNode || !tabNode.children)
		return [[]]

	const mappedItems = tabNode.children.map(item => ({
		label: item.title || '',
		icon: item.icon || '',
		to: item.path || '',
		active: route.path === item.path || route.path.startsWith(`${item.path}/`),
	}))
	return [mappedItems]
})

// onMounted(() => {
// 	console.log('📍 Huidig pad:', route.path)
// 	console.log('🧩 Gevonden navigation node:', validNode)
// })
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1' }"
		class="h-auto z-66"
	>
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
