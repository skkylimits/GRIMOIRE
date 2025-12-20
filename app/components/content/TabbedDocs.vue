<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { queryCollection } from '#content/server'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
	tabs: {
		label: string
		path: string
		icon?: string
	}[]
	defaultPath?: string
}>()

const model = ref(props.defaultPath ?? props.tabs[0]?.path ?? '')
const fetchKey = computed(() => `tabbed-docs-${props.tabs.map(tab => tab.path).join('|')}`)

const { data: resolvedDocs, pending, error } = await useAsyncData(fetchKey.value, async () => {
	if (!props.tabs.length)
		return []

	const docs = await Promise.all(props.tabs.map(async (tab) => {
		const doc = await queryCollection('docs').path(tab.path).first()
		return { ...tab, doc: doc as ParsedContent | null }
	}))

	return docs
})

const tabs = computed(() => resolvedDocs.value ?? props.tabs.map(tab => ({ ...tab, doc: null })))
const items = computed(() => tabs.value.map(tab => ({ ...tab, value: tab.path || tab.label })))

watchEffect(() => {
	if (!model.value && items.value[0]?.value)
		model.value = items.value[0].value
})
</script>

<template>
	<div class="space-y-4">
		<UTabs
			v-if="items.length"
			v-model="model"
			:items="items"
			class="w-full"
		>
			<template #content="{ item }">
				<div class="space-y-3">
					<USkeleton
						v-if="pending"
						class="h-24"
					/>

					<UAlert
						v-else-if="error || !item.doc"
						color="error"
						icon="i-lucide-alert-triangle"
						title="Content niet gevonden"
						description="Controleer het pad in de tab-config."
					/>

					<ContentRendererMarkdown
						v-else
						:value="item.doc"
					/>
				</div>
			</template>
		</UTabs>

		<UAlert
			v-else
			color="amber"
			icon="i-lucide-info"
			title="Geen tabs geconfigureerd"
			description="Voeg ten minste één tab toe met label en path."
		/>
	</div>
</template>
