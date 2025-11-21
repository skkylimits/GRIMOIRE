<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

// echte render root
const navRoot = ref<HTMLElement | null>(null)

// hidden measurement root
const measureRoot = ref<HTMLElement | null>(null)

const compactMode = ref(false)
const measuring = ref(true)

let resizeObserver: ResizeObserver | null = null

// hysteresis margin
const SAFE_MARGIN = 48

async function recompute() {
	await nextTick()

	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container)
		return

	const fullUL = measureRoot.value?.querySelector('ul') as HTMLUListElement | null
	if (!fullUL)
		return

	const fullWidth = fullUL.scrollWidth
	const containerWidth = container.clientWidth

	// 👉 hysteresis logic
	if (!compactMode.value && fullWidth > containerWidth) {
		compactMode.value = true
	}
	else if (compactMode.value && fullWidth < containerWidth - SAFE_MARGIN) {
		compactMode.value = false
	}

	measuring.value = false
}

function setupResizeObserver() {
	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container)
		return

	resizeObserver = new ResizeObserver(() => {
		// debounce layout changes
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				recompute()
			})
		})
	})

	resizeObserver.observe(container)
}

onMounted(async () => {
	await recompute()
	setupResizeObserver()
})

onBeforeUnmount(() => {
	resizeObserver?.disconnect()
})

// tabs
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
		:ui="{
			center: 'flex-1',
			toggle: 'hidden',
			content: 'hidden',
			overlay: 'hidden',
		}"
		class="h-auto z-66"
	>
		<template #left>
			<!-- 1️⃣ skeleton -->
			<div v-if="measuring" class="flex items-center gap-3 py-2">
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-24" />
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-20" />
			</div>

			<!-- 2️⃣ hidden FULL layout for measuring -->
			<div
				ref="measureRoot"
				class="absolute opacity-0 pointer-events-none h-0 overflow-hidden"
			>
				<UNavigationMenu
					highlight
					highlight-color="primary"
					orientation="horizontal"
					:items="[
						findTabsNavNode(route.path, navigation)?.children?.map(i => ({
							label: i.title,
							icon: i.icon,
							to: i.path,
						})) ?? [],
					]"
				/>
			</div>

			<!-- 3️⃣ actual menu -->
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
