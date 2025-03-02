<script setup lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui-pro/prose/h2'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { tv } from '#ui/utils/tv'
import { computed, nextTick, onMounted, ref } from 'vue'

// Define props
const props = defineProps<{
	id?: string
	class?: string
	ui?: Partial<typeof proseH2.slots>
}>()

// Extend app config types
const appConfigProseH2 = _appConfig as AppConfig & {
	uiPro: { prose: { h2: Partial<typeof theme> } }
}

// Generate prose styles
const proseH2 = tv({ extend: tv(theme), ...(appConfigProseH2.uiPro?.prose?.h2 || {}) })

// Apply UI styles
const proseH2Styles = proseH2()

// Fetch configs
const appConfig = useAppConfig()
const { headings } = useRuntimeConfig().public.mdc || {}

// Compute anchor link generation
const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)

// Track first <h2> appearance
const isFirstH2 = ref<boolean | null>(null)
const h2Element = ref<HTMLElement | null>(null)

onMounted(async () => {
	await nextTick()

	// Find all <h2> elements on the page
	const allH2s = Array.from(document.querySelectorAll('h2'))

	// Check if the current component is the first one in the document
	if (h2Element.value) {
		isFirstH2.value = allH2s.length > 0 && allH2s[0] === h2Element.value
	}
})
</script>

<template>
	<div>
		<!-- Insert <hr> before all but the first <h2> -->
		<hr
			v-if="isFirstH2 !== null && !isFirstH2"
		>

		<h2
			:id="id"
			ref="h2Element"
			:class="proseH2Styles.base({ class: props.class })"
		>
			<a
				v-if="id && generate"
				:href="`#${id}`"
				:class="proseH2Styles.link({ class: props.ui?.link })"
			>
				<span :class="proseH2Styles.leading({ class: props.ui?.leading })">
					<UIcon
						:name="appConfig.ui?.icons?.hash || ''"
						:class="proseH2Styles.leadingIcon({ class: props.ui?.leadingIcon })"
					/>
				</span>
				<slot />
			</a>
			<slot v-else />
		</h2>
	</div>
</template>
