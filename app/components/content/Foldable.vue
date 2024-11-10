<template>
  <div
    class="collapsible p-3 border mt-2 mb-2 bg-zinc-100 text-zinc-700 dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded">
    <!-- Add aria-expanded to indicate the open/closed state -->
    <div
      @click="toggle"
      class="collapsible-title"
      :aria-expanded="isOpen.toString()"
      role="button"
      tabindex="0"
      @keydown.enter="toggle"
      @keydown.space.prevent="toggle"
    >
    <slot name="title"/>
    </div>
    <!-- Only show the content when expanded -->
    <div v-if="isOpen" class="collapsible-content m-0">
      <slot name="content"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.collapsible-title {
  /* Remove this line to prevent the hand cursor */
  cursor: default; /* or simply remove this line */
}
</style>
