<script setup lang="ts">
/* eslint-disable no-console */
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const navRoot = ref<HTMLElement | null>(null)

// 👉 States
const compactMode = ref(false)
const measuring = ref(true) // ⭐ skeleton tonen zolang we meten

async function measure() {
	if (!navRoot.value)
		return

	// Wacht tot layout klaar is
	await nextTick()

	const ul = navRoot.value.querySelector('ul') as HTMLUListElement | null
	if (!ul)
		return

	const container = navRoot.value.closest('div[class*="max-w-"]') as HTMLElement
	if (!container)
		return

	const containerWidth = container.clientWidth
	const tabsWidth = ul.scrollWidth

	console.log('📏 container =', containerWidth)
	console.log('📏 tabs =', tabsWidth)

	compactMode.value = tabsWidth > containerWidth
	measuring.value = false // ⭐ klaar, skeleton weg
}

onMounted(async () => {
	await measure()
})

// watch(() => route.path, async () => {
// 	// Nieuwe route? → eerst skeleton tonen
// 	measuring.value = true

// 	// Wacht nova layout
// 	await nextTick()

// 	// Daarna opnieuw meten
// 	await measure()
// })

// Render logica
const items = computed<NavigationMenuItem[][]>(() => {
	const tabNode = findTabsNavNode(route.path, navigation.value)
	if (!tabNode?.children)
		return [[]]

	return [
		tabNode.children.map((item) => {
			const isActive
				= route.path === item.path
					|| route.path.startsWith(`${item.path}/`)

			let label = item.title as string

			// compact → alleen active krijgt titel
			if (compactMode.value && !isActive)
				label = ''

			return {
				label,
				icon: item.icon as string | undefined,
				to: item.path!,
				active: isActive,
			}
		}),
	]
})
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1',
			toggle: 'hidden',
			content: 'hidden',
			overlay: 'hidden',
		}" class="h-auto z-66"
	>
		<template #left>
			<!-- 1️⃣ Skeleton loader tijdens meten -->
			<div v-if="measuring" class="flex items-center gap-3 py-2">
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-24" />
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-20" />
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-32" />
			</div>

			<!-- 2️⃣ Echte menu (verborgen tijdens meten voor juiste breedte) -->
			<div
				ref="navRoot"
				:style="{
					visibility: measuring ? 'hidden' : 'visible',
					position: measuring ? 'absolute' : 'static',
					pointerEvents: measuring ? 'none' : 'auto',
				}"
			>
				<UNavigationMenu
					highlight
					highlight-color="primary"
					orientation="horizontal"
					:items="items"
				/>
			</div>
		</template>
		<template #toggle />
		<template #content />
	</UHeader>
</template>
