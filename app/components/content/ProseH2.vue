<template>
  <div>
    <!-- Conditionally render the <hr> above, but not for the first h2 -->
    <hr
      v-if="isFirstH2 !== null && !isFirstH2"
      class="my-4"
    >

    <h2
      :id="id"
      ref="h2Element"
      :class="ui.wrapper"
    >
      <NuxtLink
        :href="`#${id}`"
        class="group"
      >
        <div :class="ui.icon.wrapper">
          <UIcon
            :name="ui.icon.name"
            :class="ui.icon.base"
          />
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
    name: appConfig.ui.icons.hash,
  },
}))

// Define props for 'id'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { id } = props

// Track if this is the first <h2> in the page
const isFirstH2 = ref(null)
const h2Element = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()

  // Find H2 grandparent & childNodes
  const grandparentElementH2 = document.querySelector('h2').parentElement?.parentElement
  const childNodes = grandparentElementH2?.childNodes

  if (childNodes) {
    const firstChild = childNodes[0] // Get the first child node

    // Check if the first child is an Element node
    if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
      const h2InsideFirstChild = (firstChild as Element).querySelector('h2') // Cast to Element

      if (h2InsideFirstChild) {
      // Check if the current <h2> is the first <h2> in the grandparent's child nodes.
      // If it is, set isFirstH2 to true; otherwise, set it to false.
        isFirstH2.value = (h2InsideFirstChild === h2Element.value)
      }
      else {
        isFirstH2.value = false
      }
    }
  }
})

const { ui } = useUI('content.prose.h2', undefined, config, undefined, true)
</script>

<style scoped>
hr {
  margin: 45px 0;
}
</style>
