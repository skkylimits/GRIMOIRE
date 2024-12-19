<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
// import type { NavItem } from '@nuxt/content'

// const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
// const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)))

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { toc, seo } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent()
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)),
)

useSeoMeta({
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

defineOgImage({
  component: 'Docs',
  // title: page.value.title,
  // description: page.value.description
})

const headline = computed(() => findPageHeadline(page.value))
const editOnGithub = 'edit/main/content'

const links = computed(() => [toc?.bottom?.edit && {
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this page',
  to: `${toc.bottom.edit}/${editOnGithub}/${page?.value?._file}`,
  target: '_blank',
}, ...(toc?.bottom?.links || [])].filter(Boolean))

const layout = {
  wrapper: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-8',
  left: 'lg:col-span-2',
  center: {
    narrow: 'lg:col-span-6',
    base: 'lg:col-span-7', // Set both narrow and base to 3
    full: 'lg:col-span-10',
  },
  right: 'lg:col-span-2 order-first lg:order-last', // Right column is optional or hidden
}
console.log(layout)
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :headline="headline"
      class="max-w-prose mx-auto"
    />

    <UPageBody
      prose
      class="max-w-prose mx-auto"
    >
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <hr v-if="surround?.length">

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page.toc !== false"
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
            <UDivider
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
