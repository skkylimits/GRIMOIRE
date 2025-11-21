<script setup lang="ts">
/* eslint-disable no-console */

import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

console.log('⚡ COMPONENT LOADED')

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const navRoot = ref<HTMLElement | null>(null)
const measureRoot = ref<HTMLElement | null>(null)

const compactMode = ref(false)
const measuring = ref(true)

let resizeObs: ResizeObserver | null = null

const SAFE_MARGIN = 48

// ╭───────────────── STEP 2 — WAIT FOR UL ─────────────────╮
async function waitForUL() {
	console.log('STEP 2 — WAIT FOR UL')

	let attempts = 0

	while (attempts < 50) {
		await new Promise(resolve => setTimeout(resolve, 20))

		if (!measureRoot.value) {
			attempts++
			continue
		}

		const ul = measureRoot.value.querySelector('ul')
		if (ul) {
			console.log('STEP 2 — UL FOUND ✔️')
			console.log(`STEP 2 — attempt ${attempts} — ul =`, ul)
			return ul
		}

		attempts++
	}

	console.warn('STEP 2 — UL NOT FOUND ❌')
	return null
}

// ╭───────────────── STEP 3 — MEASURE WIDTH ─────────────────╮
async function measure(source: string) {
	await nextTick()

	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container)
		return

	const ul = measureRoot.value?.querySelector('ul') as HTMLUListElement | null
	if (!ul)
		return

	const fullWidth = ul.scrollWidth
	const containerWidth = container.clientWidth

	console.log(`STEP 3 — MEASURE [${source}] full=${fullWidth} container=${containerWidth} mode=${compactMode.value}`)

	// ╭───────────────── STEP 4 — APPLY MODE ─────────────────╮
	if (!compactMode.value && fullWidth > containerWidth) {
		console.log('STEP 4 — MODE → COMPACT')
		compactMode.value = true
	}
	else if (compactMode.value && fullWidth < containerWidth - SAFE_MARGIN) {
		console.log('STEP 4 — MODE → FULL')
		compactMode.value = false
	}

	measuring.value = false
}

// ╭───────────────── RESIZE OBSERVER SETUP ─────────────────╮
function setupResizeObserver() {
	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container)
		return

	resizeObs = new ResizeObserver(() => {
		console.log('RESIZE — TRIGGERED')
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				measure('RESIZE')
			})
		})
	})

	resizeObs.observe(container)
}

// ╭───────────────── STEP 1 — MOUNT ─────────────────╮
onMounted(async () => {
	console.log('STEP 1 — INITIAL MOUNT')

	const ul = await waitForUL()
	if (!ul)
		return

	await measure('MOUNT')
	setupResizeObserver()

	console.log('STEP 1 — MOUNT COMPLETED ✔️')
})

onBeforeUnmount(() => {
	resizeObs?.disconnect()
})

// ╭───────────────── STEP 5 — ITEMS BUILD ─────────────────╮
const items = computed<NavigationMenuItem[][]>(() => {
	const node = findTabsNavNode(route.path, navigation.value)
	if (!node?.children)
		return [[]]

	console.log(`ITEMS — RECOMPUTE (MODE = ${compactMode.value ? 'COMPACT' : 'FULL'})`)

	return [
		node.children.map((item) => {
			const isActive
				= route.path === item.path
					|| route.path.startsWith(`${item.path}/`)

			return {
				label: compactMode.value && !isActive ? '' : item.title,
				icon: item.icon as string | undefined,
				to: item.path,
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
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-20" />
			</div>

			<!-- hidden full layout -->
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

			<!-- actual menu -->
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
