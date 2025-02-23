<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import type { LinkProps, PartialString } from '@nuxt/ui'
import { computed } from 'vue'
import { tv } from '#ui/utils/tv'
import _appConfig from '#build/app.config'
import theme from '#build/ui-pro/prose/callout'
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports'

const appConfigProseCallout = _appConfig as AppConfig & { uiPro: { prose: { callout: Partial<typeof theme> } } }

const callout = tv({ extend: tv(theme), ...(appConfigProseCallout.uiPro?.prose?.callout || {}) })

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
	default(props?: unknown): unknown // ✅ Fixed
}

defineOptions({ inheritAttrs: false })

const props = defineProps<CalloutProps>()
defineSlots<CalloutSlots>()

const appConfig = useAppConfig()

const ui = computed(() => callout({
	color: props.color,
	to: !!props.to
}))

const target = computed(() =>
	props.target
	|| (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined)
	|| ''
) // ✅ Ensure the computed value is always a string.

const externalIcon = computed(() =>
	appConfig.ui?.icons?.external ?? 'i-heroicons:external-link'
) // ✅ Provide a default icon if undefined.
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
