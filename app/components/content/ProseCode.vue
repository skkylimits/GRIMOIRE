<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	code: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		default: undefined,
	},
	language: {
		type: String,
		default: undefined,
	},
	hideHeader: {
		type: Boolean,
		default: false,
	},
	filename: {
		type: String,
		default: undefined,
	},
	highlights: {
		type: Array as PropType<number[]>,
		default: undefined,
	},
	meta: {
		type: String,
		default: undefined,
	},
});

const config = {
	wrapper: '[&>pre]:!rounded-t-none [&>pre]:!my-0 my-5',
	header: 'flex items-center gap-1.5 border dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose text-white bg-black dark:bg-gray-900',
	icon: {
		base: '',
	},
	button: {
		base: 'absolute top-2.5 right-2.5 dark:border-gray-700',
	},
	filename: 'text-sm/6',
};

const { ui } = useUI('content.prose.code', undefined, config, undefined, true);
</script>

<template>
	<div
		class="relative box-shadow"
		:class="!!filename && ui.wrapper"
	>
		<div
			v-if="filename && !hideHeader"
			:class="ui.header"
		>
			<ProseCodeIcon
				:icon="icon"
				:filename="filename"
				:class="ui.icon.base"
			/>

			<span :class="ui.filename">{{ filename }}</span>
		</div>

		<ProseCodeButton
			:code="code"
			:class="ui.button.base"
		/>

		<slot />
	</div>
</template>

<style scoped>
/* research for a way to customize -tw-prose-pre-bg */
</style>
