<template>
  <div>
    <!-- Conditionally render the <hr> above, but not for the first h2 -->
    <hr v-if="!isFirstH2" class="my-4" />

    <h2 :id="id" :class="ui.wrapper" ref="h2Element">
      <NuxtLink :href="`#${id}`" class="group">
        <div :class="ui.icon.wrapper">
          <UIcon :name="ui.icon.name" :class="ui.icon.base" />
        </div>
        <slot />
      </NuxtLink>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
const appConfig = useAppConfig()

const config = computed(() => ({
  wrapper: 'scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]',
  icon: {
    wrapper: '-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute',
    base: 'w-4 h-4 text-primary',
    name: appConfig.ui.icons.hash
  }
}))

// Define props for 'id'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// Track if this is the first <h2> in the page
const isFirstH2 = ref(false)
const h2Element = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  const allH2Elements = document.querySelectorAll('h2')

  if (allH2Elements.length > 0) {
    isFirstH2.value = allH2Elements[0] === h2Element.value
  }
})

const { ui } = useUI('content.prose.h2', undefined, config, undefined, true)
</script>
