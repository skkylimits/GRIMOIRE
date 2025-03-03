<script setup lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui-pro/prose/pre'
// import { useAppConfig } from '#imports'
import { tv } from '#ui/utils/tv'
import { useClipboard } from '@vueuse/core'
// import { computed, toRef } from 'vue'
import { nextTick, ref } from 'vue'
import CodeIcon from './CodeIcon.vue'

// Props
const props = defineProps<{
	icon?: string
	code?: string
	language?: string
	filename?: string
	highlights?: number[]
	hideHeader?: boolean
	meta?: string
	class?: any
	ui?: Partial<typeof prosePre.slots>
}>()

// Get app config and wrap safely
// const appConfig = useAppConfig()
// const safeAppConfig = toRef(appConfig)

// Extend app config theme
const appConfigProsePre = _appConfig as AppConfig & { uiPro: { prose: { pre: Partial<typeof theme> } } }
const prosePre = tv({ extend: tv(theme), ...(appConfigProsePre.uiPro?.prose?.pre || {}) })
const ui = prosePre()

// Clipboard & Toast logic
const clipboard = useClipboard()
const copied = ref(false)
const toast = useToast()

function copyCode() {
	clipboard.copy(props.code || '')
	copied.value = true

	toast.add({
		title: 'Copied to clipboard',
		description: 'The text has been successfully copied.',
		icon: 'i-lsicon:copy-one-outline',
		color: 'primary',
		close: {
			color: 'primary',
			// variant: 'outline',
			class: 'i-bitcoin-icons:cross-outline',
		},
	})

	// Reset copied state
	nextTick(() => {
		setTimeout(() => {
			copied.value = false
		}, 2000)
	})
}

// // Computed icons with fallback
// const icons = computed(() => ({
// 	copy: safeAppConfig.value.ui?.icons?.copy ?? 'i-mdi:content-copy',
// 	copyCheck: safeAppConfig.value.ui?.icons?.copyCheck ?? 'i-mdi:clipboard-check',
// }))

// watchEffect(() => {
// 	console.log('Updated safeAppConfig:', safeAppConfig.value)
// })
</script>

<template>
	<div :class="ui.root({ class: [props.ui?.root], filename: !!filename })">
		<!-- Header with filename -->
		<div v-if="filename && !hideHeader" :class="ui.header({ class: props.ui?.header })">
			<CodeIcon :icon="icon" :filename="filename" :class="ui.icon({ class: props.ui?.icon })" />
			<span :class="ui.filename({ class: props.ui?.filename })">{{ filename }}</span>
		</div>

		<!-- Copy Button -->
		<UButton
			:icon="copied ? 'i-mdi:clipboard-check' : 'i-mdi:content-copy'"
			color="neutral"
			variant="outline"
			size="sm"
			aria-label="Copy code to clipboard"
			:class="ui.copy({ class: props.ui?.copy })"
			tabindex="-1"
			@click="copyCode"
		/>

		<!-- Code Block -->
		<pre :class="ui.base({ class: [props.class, props.ui?.base] })" v-bind="$attrs"><slot /></pre>
	</div>
</template>

<style>
.shiki span.line {
	display: block;
}

.shiki span.line.highlight {
	margin: 0 -16px;
	padding: 0 16px;
	background-color: rgba(var(--ui-bg-accented), 0.5);
}
</style>
