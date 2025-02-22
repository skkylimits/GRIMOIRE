<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
console.log(navigation)
</script>

<template>
	<UContainer>
		<UPage>
			<template #left>
				<UPageAside>
					<UContentNavigation
						type="single"
						highlight
						:navigation="navigation"
					/>
				</UPageAside>
			</template>

			<slot />
		</UPage>
	</UContainer>
</template>
