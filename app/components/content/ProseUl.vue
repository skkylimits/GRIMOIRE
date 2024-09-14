<template>
  <ul class="square-list">
    <slot />
  </ul>
</template>

<style>
/* https://tailwindcss.com/docs/list-style-type to transfer this to tailwind.config.ts */
.square-list {
list-style-type: square; /* or any other desired style */
}
</style>
