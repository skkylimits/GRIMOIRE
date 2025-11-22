<script setup lang="ts">
/* eslint-disable no-console */

import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const isTabbed = computed(() => {
	const node = findTabsNavNode(route.path, navigation.value)
	return !!node?.tabs
})

const navRoot = ref<HTMLElement | null>(null)
const measureRoot = ref<HTMLElement | null>(null)

const compactMode = ref(false)
const measuring = ref(true)

let resizeObs: ResizeObserver | null = null
const SAFE_MARGIN = 48

// ╭──────────────────────────────────────────────────────────╮
// 📦 TOP-LEVEL COMPONENT GROUP
// ╰──────────────────────────────────────────────────────────╯
console.groupCollapsed(
	`%c📦 AppTabHeader → ${route.fullPath}`,
	'color:#f7768e;font-weight:bold',
)

// ╭───────────────── STEP 2 — WAIT FOR UL ─────────────────╮
async function waitForUL() {
	console.groupCollapsed('%c   STEP 2 — WAIT FOR UL', 'color:#cba6f7')

	let attempts = 0

	while (attempts < 50) {
		await new Promise(r => setTimeout(r, 20))

		if (!measureRoot.value) {
			attempts++
			continue
		}

		const ul = measureRoot.value.querySelector('ul')
		if (ul) {
			console.log('      ✔️ UL FOUND', ul)
			console.groupEnd()
			return ul
		}

		attempts++
	}

	console.warn('      ❌ UL NOT FOUND after 50 attempts')
	console.groupEnd()
	return null
}

// ╭───────────────── STEP 3 — MEASURE WIDTH ───────────────╮
async function measure(source: string) {
	console.groupCollapsed(`%c   STEP 3 — MEASURE WIDTH [${source}]`, 'color:#a6da95')

	await nextTick()

	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container) {
		console.warn('      ⚠️ no container found')
		console.groupEnd()
		return
	}

	const ul = measureRoot.value?.querySelector('ul') as HTMLUListElement | null
	if (!ul) {
		console.warn('      ⚠️ no UL found in measureRoot')
		console.groupEnd()
		return
	}

	const fullWidth = ul.scrollWidth
	const containerWidth = container.clientWidth

	console.log(`      fullWidth=${fullWidth} | container=${containerWidth} | mode=${compactMode.value}`)

	// ╭───────────────── STEP 4 — APPLY MODE ────────────────╮
	console.groupCollapsed('%c      STEP 4 — APPLY MODE', 'color:#f9e2af')

	if (!compactMode.value && fullWidth > containerWidth) {
		console.log('      → Switching to COMPACT')
		compactMode.value = true
	}
	else if (compactMode.value && fullWidth < containerWidth - SAFE_MARGIN) {
		console.log('      → Switching to FULL')
		compactMode.value = false
	}
	else {
		console.log('      (no change)')
	}

	console.groupEnd() // END APPLY MODE

	measuring.value = false
	console.groupEnd() // END MEASURE WIDTH
}

// ╭───────────────── RESIZE OBSERVER SETUP ───────────────╮
function setupResizeObserver() {
	console.groupCollapsed('%c   STEP 6 — RESIZE OBSERVER SETUP', 'color:#89dceb')

	const container = navRoot.value?.closest('div[class*="max-w-"]') as HTMLElement | null
	if (!container) {
		console.warn('      ⚠️ no container for resize observer')
		console.groupEnd()
		return
	}

	resizeObs = new ResizeObserver(() => {
		console.groupCollapsed('%c      RESIZE EVENT', 'color:#f38ba8')
		measure('RESIZE')
		console.groupEnd()
	})

	resizeObs.observe(container)
	console.log('      ✔️ Resize observer attached')
	console.groupEnd()
}

// ╭───────────────── STEP 1 — MOUNT ──────────────────────╮
console.groupCollapsed('%c   STEP 1 — INITIAL MOUNT', 'color:#94e2d5')
onMounted(async () => {
	if (!isTabbed.value) {
		console.log('   → No tabs on this page → skipping measurement & resize observer')
		measuring.value = false // ensure menu shows immediately
		console.groupEnd()
		return
	}

	const ul = await waitForUL()
	if (!ul) {
		console.warn('      ⚠️ cannot continue, UL missing')
		console.groupEnd()
		return
	}

	await measure('MOUNT')
	setupResizeObserver()

	console.log('      ✔️ MOUNT COMPLETE')
	console.groupEnd() // END step 1
})

// ╭───────────────── CLEANUP ─────────────────────────────╮
onBeforeUnmount(() => {
	resizeObs?.disconnect()
	console.groupEnd() // ← CLOSES MAIN COMPONENT GROUP
})

// ╭───────────────── STEP 5 — BUILD ITEMS ────────────────╮
const items = computed<NavigationMenuItem[][]>(() => {
	console.groupCollapsed('%c   STEP 5 — BUILD ITEMS', 'color:#f7768e')

	if (!isTabbed.value) {
		console.log('      no tabs → items empty')
		console.groupEnd()
		return [[]]
	}

	const node = findTabsNavNode(route.path, navigation.value)
	if (!node?.children) {
		console.log('      no tab children → empty[][]')
		console.groupEnd()
		return [[]]
	}

	console.log(`      mode = ${compactMode.value ? 'COMPACT' : 'FULL'}`)

	const built = [
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

	console.log('      ✔️ items built:', built)
	console.groupEnd()
	return built
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
			<!-- skeleton -->
			<div
				v-if="isTabbed && measuring"
				class="flex items-center gap-3 py-2"
			>
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-24" />
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-20" />
				<USkeleton class="h-6 w-6 rounded-md" />
				<USkeleton class="h-4 w-20" />
			</div>

			<!-- hidden full layout -->
			<div
				v-if="isTabbed"
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
				v-if="isTabbed"
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
