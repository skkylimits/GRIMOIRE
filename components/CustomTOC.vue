<!-- components/CustomTOC.vue -->
<template>
  <nav class="custom-toc">
    <ul>
      <li v-for="heading in headings">
        <a :href="`#${heading.id}`">{{ heading.text }}</a>
        <ul v-if="heading.children.length">
          <li v-for="child in heading.children">
            <a :href="`#${child.id}`">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    headings: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
/* Add custom styling for the TOC */
</style>