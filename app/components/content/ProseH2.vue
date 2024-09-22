<template>
  <div>
    <!-- Conditionally render the <hr> above, but not for the first h2 -->
    <hr v-if="renderHr" class="my-4">

    <h2 :id="id" ref="h2Element" :class="ui.wrapper">
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

const { id } = props

// Track if this is the first <h2> in the page
const isFirstH2OfPage = ref(null);
const isFirstSpecialOfPage = ref(null);
const renderHr = ref(false);
const h2Element = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick();

  // Find H2 grandparent & childNodes
  const grandparentElementH2 = document.querySelector('h2').parentElement?.parentElement;
  const childNodes = grandparentElementH2?.childNodes;

  if (grandparentElementH2) {
    const firstChild = grandparentElementH2.childNodes[0];

    // Ensure firstChild is an Element before querying
    if (firstChild instanceof Element) {
      const specialFirstChild = firstChild.querySelector('.focus\\:outline-none[target="_blank"]');

      // Find the first <h2> within the grandparent
      const firstH2 = grandparentElementH2.querySelector('h2');

      // Check if the current <h2> is the first one
      const isCurrentH2First = h2Element.value === firstH2;

      // Check if the current <h2> is the first one and if specialFirstChild exists
      if (specialFirstChild && isCurrentH2First) {
        // Do not render <hr> above the first <h2>
        renderHr.value = false;
      } else {
        // Render <hr> above this <h2> if it's not the first one or if no special first child exists
        renderHr.value = true;
      }
    }
  }
});

const { ui } = useUI('content.prose.h2', undefined, config, undefined, true)
</script>

<style scoped>
hr {
  margin: 45px 0;
}
</style>
