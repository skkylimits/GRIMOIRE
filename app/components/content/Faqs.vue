<script setup lang="ts">
const faqCategories = [
  {
    category: 'General',
    items: [
      {
        label: 'Do you have a free trial?',
        content: 'Ea est ex aliqua exercitation quis et cillum adipisicing sit tempor veniam incididunt labore.',
      },
      {
        label: 'Can I use Nuxt UI Pro for Open Source projects?',
        content: 'Et adipisicing do do do sunt irure proident consequat fugiat tempor occaecat commodo fugiat in proident.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        label: 'What does “Unlimited minor & patch updates” include?',
        content: 'Dolor dolor consectetur tempor consectetur sint ut id ex quis voluptate dolore incididunt qui mollit.',
      },
      {
        label: 'How can I get an invoice for my purchase?',
        content: 'Ad eiusmod dolore ipsum incididunt velit amet aliqua pariatur ut aliqua consequat.',
      },
    ],
  },
  {
    category: 'Self Study',
    items: [
      {
        label: 'Do you offer technical support?',
        content: 'Sint id sint incididunt culpa.',
      },
      {
        label: 'Can I access the materials offline?',
        content: 'Officia veniam fugiat labore dolore pariatur labore exercitation tempor fugiat.',
      },
    ],
  },
]
</script>

<template>
  <div class="faq-section">
    <div
      v-for="category in faqCategories"
      :key="category.category"
      class="faq-category"
    >
      <h2 class="faq-category-title">
        {{ category.category }}
      </h2>
      <ULandingFAQ
        :items="category.items"
        multiple
      />
    </div>
  </div>
</template>

<style scoped>
.faq-category-title {
  --tw-text-opacity: 1;
  color: rgb(var(--color-primary-DEFAULT) / var(--tw-text-opacity));
}
</style>
