<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
// @ts-nocheck
/* eslint-disable no-console */

definePageMeta({
	layout: 'docs',
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
console.log(navigation)

function findNavItemByPath(path: string, navItems: ContentNavigationItem[]): ContentNavigationItem | undefined {
	for (const item of navItems) {
		if (item.path === path)
			return item
		if (item.children) {
			const found = findNavItemByPath(path, item.children)
			if (found)
				return found
		}
	}
	return undefined
}

function findTabsNavNode(currentPath: string, navItems: ContentNavigationItem[]): ContentNavigationItem | null {
	let searchPath = currentPath
	let currentNav = findNavItemByPath(searchPath, navItems)

	while (currentNav) {
		if (currentNav.tabs)
			return currentNav

		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath)
			break

		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}

	return null
}

function findFirstValidMdNode(items: ContentNavigationItem[]): ContentNavigationItem | null {
	for (const item of items) {
		if (item.children?.length) {
			const found = findFirstValidMdNode(item.children)
			if (found)
				return found
		}
		else if (item.stem) {
			// Alleen teruggeven als stem aanwezig is (wijst op een content item)
			return item
		}
	}
	return null
}

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())

if (!page.value) {
	const navItem = findNavItemByPath(route.path, navigation.value)

	if (navItem?.children?.length) {
		const redirectTarget = findFirstValidMdNode(navItem.children)
		if (redirectTarget) {
			navigateTo(redirectTarget.path) // await is optioneel, maar explicieter
		}
	}

	throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
	return queryCollectionItemSurroundings('docs', route.path, {
		fields: ['description'],
	})
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
	title,
	ogTitle: title,
	description,
	ogDescription: description,
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImageComponent('Docs', {
	headline: headline.value,
})

const links = computed(() => {
	const links = []
	if (toc?.bottom?.edit) {
		links.push({
			icon: 'i-lucide-external-link',
			label: 'Edit this page',
			to: `${toc.bottom.edit}/${page?.value?.stem}.${page?.value?.extension}`,
			target: '_blank',
		})
	}

	return [...links, ...(toc?.bottom?.links || [])].filter(Boolean)
})
</script>

<template>
	<UPage v-if="page">
		<UPageHeader
			:title="page.title"
			:description="page.description"
			:headline="headline"
		>
			<template #links>
				<UButton
					v-for="(link, index) in page.links"
					:key="index"
					v-bind="link"
				/>

				<PageHeaderLinks />
			</template>
		</UPageHeader>

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
				:links="page.body?.toc?.links"
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
							v-if="page.body?.toc?.links?.length"
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
