<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

definePageMeta({
	layout: 'docs',
})

const route = useRoute()
const { toc, seo } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data } = await useAsyncData(route.path, () => Promise.all([
	queryCollection('docs').path(route.path).first(),
	queryCollectionItemSurroundings('docs', route.path, {
		fields: ['title', 'description'],
	}),
]), {
	transform: ([page, surround]) => ({ page, surround }),
})

if (!data.value || !data.value.page) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)

useSeoMeta({
	title: page.value?.seo?.title,
	ogTitle: `${page.value?.seo?.title} - ${seo?.siteName}`,
	description: page.value?.seo?.description,
	ogDescription: page.value?.seo?.description,
})

defineOgImageComponent('Docs')

// Optional chaining for navigation
const headline = computed(() => findPageHeadline(navigation?.value, page.value))

// Build the GitHub edit URL using the current route
const editOnGithub = 'edit/main/content'

const links = computed(() => [toc?.bottom?.edit && {
	icon: 'i-heroicons-pencil-square',
	label: 'Edit this page',
	to: `${toc.bottom.edit}/${editOnGithub}/${page?.value?.stem}.${page?.value?.extension}`,
	target: '_blank',
}, ...(toc?.bottom?.links || [])].filter(Boolean))

// Filter TOC data to exclude items with the 'no-toc' class
console.log('page', page.value);

type TocLink = {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

function filterToc(links: TocLink[]): TocLink[] {
  return links
    .filter(link => !link.text.includes('{#no-toc}'))
    .map(link => ({
      ...link,
      children: link.children ? filterToc(link.children) : [],
    }))
}

const filteredTocLinks = computed(() => {
  const links = page.value?.body?.toc?.links || []
  return filterToc(links)
})

</script>

<template>
	<UPage v-if="page">
		<UPageHeader
			:title="page.title"
			:description="page.description"
			:links="page.links"
			:headline="headline"
		/>

		<UPageBody>
			<ContentRenderer
				v-if="page"
				:value="page"
			/>

			<USeparator v-if="surround?.length" />

			<UContentSurround :surround="surround" />
		</UPageBody>

		<template
			v-if="page?.body?.toc?.links?.length"
			#right
		>
			<UContentToc
				:title="toc?.title"
				:links="filteredTocLinks"
			>
				<template
					v-if="toc?.bottom"
					#bottom
				>
					<div
						class="hidden lg:block space-y-6"
						:class="{ '!mt-6': page.body?.toc?.links?.length }"
					>
						<USeparator
							v-if="filteredTocLinks.length"
							type="dashed"
						/>

						<UPageLinks
							:title="toc.bottom.title"
							:links="links"
						/>
					</div>
				</template>
			</UContentToc>
		</template>
	</UPage>
</template>
