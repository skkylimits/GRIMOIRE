<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: 'Guide',
			icon: 'i-lucide-book-open',
		},
		{
			label: 'Composables',
			icon: 'i-lucide-database',
		},
		{
			label: 'Components',
			icon: 'i-lucide-box',
			to: '/docs/components',
			active: true,
			defaultOpen: true,
		},
	],

])
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1' }"
		class="h-auto"
	>
		<template #left>
			<UNavigationMenu
				highlight
				highlight-color="primary"
				orientation="horizontal"
				:items="items"
			/>
		</template>
	</UHeader>
</template>
