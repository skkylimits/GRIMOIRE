<script setup lang="ts">
const items = [
  {
    label: 'Do you have a free trial?',
    content: 'Ea est ex aliqua exercitation quis et cillum adipisicing sit tempor veniam incididunt labore.',
  },
  {
    label: 'Can I use Nuxt UI Pro for Open Source projects?',
    content: 'Et adipisicing do do do sunt irure proident consequat fugiat tempor occaecat commodo fugiat in proident.',
  },
]
</script>

<template>
  <ULandingFAQ :items="items" />
</template>

<style>
button[data-headlessui-state="open"] span {
  color: rgb(var(--color-primary-DEFAULT) / var(--tw-text-opacity)) !important;
}
</style>
