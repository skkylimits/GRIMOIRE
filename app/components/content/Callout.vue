<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import type { LinkProps, PartialString } from '@nuxt/ui'
import { computed, toRef } from 'vue'
import { tv } from '#ui/utils/tv'
import _appConfig from '#build/app.config'
import theme from '#build/ui-pro/prose/callout'
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
const safeAppConfig = toRef(appConfig) // ✅ Prevents function serialization issues

const appConfigProseCallout = _appConfig as AppConfig & { uiPro: { prose: { callout: Partial<typeof theme> } } }

const callout = tv({
	extend: tv(theme),
	...(appConfigProseCallout.uiPro?.prose?.callout || {}),
	variants: {
		color: {
			important: 'bg-blue-100 border-l-4 border-blue-500 text-blue-900 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-100', // Add the `important` variant
			...theme.variants.color // Preserve existing variants
		}
	}
})

type CalloutVariants = VariantProps<typeof callout>

interface CalloutProps {
	to?: LinkProps['to']
	target?: LinkProps['target']
	icon?: string
	color?: CalloutVariants['color']
	class?: string
	ui?: PartialString<typeof callout.slots>
}

interface CalloutSlots {
	default?: () => unknown // ✅ Fix slot typing
}

defineOptions({ inheritAttrs: false })

const props = defineProps<CalloutProps>()
defineSlots<CalloutSlots>()

const ui = computed(() => callout({
	color: props.color,
	to: !!props.to
}))
console.log(props.color)
const target = computed(() => props.target ?? '') // ✅ Ensure string return

const externalIcon = computed(() => {
	return safeAppConfig.value.ui?.icons?.external ?? 'i-heroicons:external-link'
}) // ✅ Safe handling of external icon
</script>

<template>
	<div :class="ui.base({ class: props.class })">
		<NuxtLink
			v-if="to"
			v-bind="{ to, target, ...$attrs }"
			class="focus:outline-none"
			tabindex="-1"
		>
			<span
				class="absolute inset-0"
				aria-hidden="true"
			/>
		</NuxtLink>

		<UIcon
			v-if="icon"
			:name="icon"
			:class="ui.icon({ class: props.ui?.icon })"
		/>
		<UIcon
			v-if="!!to && target === '_blank'"
			:name="externalIcon"
			:class="ui.externalIcon({ class: props.ui?.externalIcon })"
		/>

		<slot mdc-unwrap="p" />
	</div>
</template>
