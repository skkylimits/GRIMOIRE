<script setup lang="ts">
import { computed } from 'vue'
import { useNavigationHelper } from '~/composables/useNavigationHelper'

const { sortedNavigation, open } = useNavigationHelper()

const items = computed(() => {
	return sortedNavigation.value // Gebruik de gesorteerde navigatie hier
})
</script>

<template>
	<UContainer>
		<UPage>
			<template #left>
				<UPageAside>
					<UContentNavigation
						v-if="items.length"
						:open="open"
						type="single"
						highlight
						:navigation="items"
					/>
				</UPageAside>
			</template>

			<slot />
		</UPage>
	</UContainer>
</template>
