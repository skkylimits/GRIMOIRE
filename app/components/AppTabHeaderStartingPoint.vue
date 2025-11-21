<script setup lang="ts">
/* eslint-disable no-console */
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const navRoot = ref<HTMLElement | null>(null)
const compactMode = ref(false)

onMounted(() => {
	// 1️⃣ navRoot check
	console.log('1️⃣ navRoot =', navRoot.value)

	if (!navRoot.value)
		return

	// 2️⃣ container zoeken
	const container = navRoot.value.closest('div[class*="max-w-"]')
	console.log('2️⃣ container =', container)

	// 3️⃣ ul zoeken
	const ul = navRoot.value.querySelector('ul') as HTMLUListElement | null
	console.log('3️⃣ ul =', ul)

	if (!ul) {
		console.log('❌ UL niet gevonden — STOP')
		return
	}

	// 4️⃣ widths meten
	const containerWidth = (container as HTMLElement).clientWidth
	const tabsWidth = ul.scrollWidth

	console.log('4️⃣ containerWidth =', containerWidth)
	console.log('4️⃣ tabsWidth =', tabsWidth)

	// 5️⃣ overflow
	const overflow = tabsWidth > containerWidth
	console.log('5️⃣ OVERFLOW =', overflow)

	compactMode.value = overflow
})

// ⭐ Items met render logica ⭐
const items = computed<NavigationMenuItem[][]>(() => {
	const tabNode = findTabsNavNode(route.path, navigation.value)
	if (!tabNode || !tabNode.children)
		return [[]]

	return [
		tabNode.children.map((item) => {
			const isActive = route.path === item.path || route.path.startsWith(`${item.path}/`)
			return {
				label: compactMode.value
					? (isActive ? item.title as string : undefined)
					: (item.title as string),
				icon: item.icon as string | undefined,
				to: item.path!,
				active: isActive,
			}
		}),
	]
})

// ⭐ Items met render logica ⭐
// const items = computed<NavigationMenuItem[][]>(() => {
// 	if (!ready.value) {
// 		// Tot het klaar is → alleen icons tonen → veilig
// 		const tabNode = findTabsNavNode(route.path, navigation.value)
// 		if (!tabNode || !tabNode.children)
// 			return [[]]

// 		return [
// 			tabNode.children.map(item => ({
// 				label: undefined,
// 				icon: item.icon as string | undefined,
// 				to: item.path!,
// 				active: false,
// 			})),
// 		]
// 	}

// 	// Normale render
// 	const tabNode = findTabsNavNode(route.path, navigation.value)
// 	if (!tabNode || !tabNode.children)
// 		return [[]]

// 	return [
// 		tabNode.children.map((item) => {
// 			const isActive
// 				= route.path === item.path
// 					|| route.path.startsWith(`${item.path}/`)

// 			return {
// 				label: compactMode.value
// 					? (isActive ? item.title as string : undefined)
// 					: item.title as string,
// 				icon: item.icon as string | undefined,
// 				to: item.path!,
// 				active: isActive,
// 			}
// 		}),
// 	]
// })
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1' }"
		class="h-auto z-66"
	>
		<template #left>
			<div ref="navRoot">
				<UNavigationMenu
					highlight
					highlight-color="primary"
					orientation="horizontal"
					:items="items"
				/>
			</div>
		</template>
	</UHeader>
</template>

<!--
<script setup lang="ts">
/* eslint-disable no-console */
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const navRoot = ref<HTMLElement | null>(null)
const compactMode = ref(false)
const ready = ref(false)
console.log('STEP READY — ready =', ready.value)

async function waitForUL() {
	console.log('STEP 2 — start waiting for <ul>')

	let tries = 0

	while (tries < 50) {
		await new Promise(resolve => setTimeout(resolve, 15))

		if (!navRoot.value) {
			console.log(`STEP 2 — try ${tries} — navRoot = null`)
			tries++
			continue
		}

		const ul = navRoot.value.querySelector('ul')

		console.log(`STEP 2 — try ${tries} — ul =`, ul)

		if (ul) {
			console.log('STEP 2 — UL FOUND!', ul)
			return ul
		}

		tries++
	}

	console.warn('STEP 2 — UL NOT FOUND AFTER 50 TRIES')
	return null
}

onMounted(async () => {
	console.log('STEP 1 — MOUNTED')

	const ul = await waitForUL()

	if (!ul) {
		console.log('❌ UL not found — can\'t continue')
		return
	}

	// Nu pas overflow meten
	const container = navRoot.value!.closest('div[class*="max-w-"]') as HTMLElement
	const containerWidth = container.clientWidth
	const tabsWidth = ul.scrollWidth

	console.log('STEP 3 — containerWidth =', containerWidth)
	console.log('STEP 3 — tabsWidth =', tabsWidth)

	const overflow = tabsWidth > containerWidth
	console.log('STEP 3 — OVERFLOW =', overflow)

	compactMode.value = overflow

	// UI mag nu pas renderen
	ready.value = true

	// NU pas resizes observeren
	const resizeObs = new ResizeObserver(() => {
		const overflow = ul.scrollWidth > container.clientWidth
		compactMode.value = overflow
	})
	resizeObs.observe(container)
})

// ⭐ Items met render logica ⭐
const items = computed<NavigationMenuItem[][]>(() => {
	if (!ready.value) {
		// Tot het klaar is → alleen icons tonen → veilig
		const tabNode = findTabsNavNode(route.path, navigation.value)
		if (!tabNode || !tabNode.children)
			return [[]]

		return [
			tabNode.children.map(item => ({
				label: undefined,
				icon: item.icon as string | undefined,
				to: item.path!,
				active: false,
			})),
		]
	}

	// Normale render
	const tabNode = findTabsNavNode(route.path, navigation.value)
	if (!tabNode || !tabNode.children)
		return [[]]

	return [
		tabNode.children.map((item) => {
			const isActive
				= route.path === item.path
					|| route.path.startsWith(`${item.path}/`)

			return {
				label: compactMode.value
					? (isActive ? item.title as string : undefined)
					: item.title as string,
				icon: item.icon as string | undefined,
				to: item.path!,
				active: isActive,
			}
		}),
	]
})
</script> -->
