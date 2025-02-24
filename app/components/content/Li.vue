<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui-pro/prose/li'
import { tv } from '#ui/utils/tv'

const appConfigProseLi = _appConfig as AppConfig & { uiPro: { prose: { li: Partial<typeof theme> } } }

const proseLi = tv({ extend: tv(theme), ...(appConfigProseLi.uiPro?.prose?.li || {}) })

console.log(proseLi)
</script>

<script setup lang="ts">
const props = defineProps<{
	class?: string
}>()
</script>

<template>
	<li :class="proseLi({ class: props.class })">
		<slot />
	</li>
</template>
