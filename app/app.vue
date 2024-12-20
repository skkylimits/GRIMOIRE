<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
	default: () => [],
	server: false,
})

useHead({
	meta: [
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
	],
	link: [
		{ rel: 'icon', href: '/favicon.ico' },
	],
	htmlAttrs: {
		lang: 'en',
	},
})

useSeoMeta({
	titleTemplate: `%s - ${seo?.siteName}`,
	ogSiteName: seo?.siteName,
	ogImage: 'https://docs-template.nuxt.dev/social-card.png',
	twitterImage: 'https://docs-template.nuxt.dev/social-card.png',
	twitterCard: 'summary_large_image',
})

provide('navigation', navigation)
</script>

<template>
	<div>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,#FFCCCB 0%,#FF5859 60%,#FF0000 100%)"
			error-color="repeating-linear-gradient(to right,#FF0000 0%,#FF0000 100%)"
		/>

		<AppHeader />

		<UMain>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UMain>

		<ClientOnly>
			<LazyUContentSearch
				:files="files"
				:navigation="navigation"
			/>
		</ClientOnly>

		<UNotifications />
	</div>
</template>
