<template>
    <div>
      <details v-for="(item, index) in items" :key="index">
        <summary>{{ item.question }}</summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </template>
  
  <script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  });
  </script>
  