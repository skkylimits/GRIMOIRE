<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { queryCollection } from '#content/server'
import { computed, ref } from 'vue'

const props = defineProps<{
	items: {
		label: string
		file: string
	}[]
}>()

const active = ref(0)

const tabs = await Promise.all(
	props.items.map(async (item) => {
		const doc = await queryCollection('docs').path(item.file).first()
		return {
			label: item.label,
			content: doc as ParsedContent,
		}
	}),
)

const activeContent = computed(() => tabs[active.value])
</script>

<template>
	<div class="space-y-4">
		<!-- Tabs header -->
		<div class="flex gap-2 border-b border-gray-300 dark:border-gray-700">
			<button
				v-for="(t, i) in tabs"
				:key="i"
				class="px-3 py-2 text-sm"
				:class="{
					'border-b-2 border-primary font-medium': active === i,
					'text-gray-500': active !== i,
				}"
				@click="active = i"
			>
				{{ t.label }}
			</button>
		</div>

		<!-- Markdown body -->
		<ContentRenderer :value="activeContent.content" />
	</div>
</template>
