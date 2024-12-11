<script setup lang="ts">
const props = defineProps<{
  items: Array<{ label: string; content: string }>;
}>();
</script>

<template>
  <div>
    <!-- Render your FAQ items here -->
    <ul>
      <li v-for="item in props.items" :key="item.label">
        <strong>{{ item.label }}</strong>
        <p>{{ item.content }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
