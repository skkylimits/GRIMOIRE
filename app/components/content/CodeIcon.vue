<script setup lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/ui-pro/prose/code-icon'
import { useAppConfig } from '#imports'
import { defu } from 'defu'
import { computed } from 'vue'

const props = defineProps<{
	icon?: string
	filename?: string
}>()

const appConfig = useAppConfig() as AppConfig & { uiPro: { prose: { codeIcon: Partial<typeof theme> } } }

const icons = computed<any>(() => defu(appConfig.uiPro?.prose?.codeIcon || {}, theme))

const icon = computed(() => {
	if (props.icon) {
		return props.icon
	}

	if (!props.filename) {
		return
	}

	const cleanFilename = props.filename.replace(/\s*\(.*\)\s*$/, '')

	const extension = cleanFilename.includes('.') && cleanFilename.split('.').pop()
	const name = cleanFilename.split('/').pop()

	return (name && icons.value[name.toLowerCase()]) ?? (extension && (icons.value[extension] ?? `i-vscode-icons-file-type-${extension}`))
})
</script>

<template>
	<UIcon v-if="icon" :name="icon" />
</template>
