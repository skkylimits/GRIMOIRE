<template>
  <details class="foldable">
    <summary class="foldable-summary">
      <slot name="title" />
    </summary>
    <div class="foldable-content">
      <slot name="content" />
    </div>
  </details>
</template>


<style>
/***** Tailwind Configuration Suggestion - Add to tailwind.config.ts *****/
/*
  module.exports = {
    theme: {
      extend: {
        colors: {
          'foldable-bg': '#f3f4f6', // Adjust this to match your website color palette
        },
      },
    },
  }
*/

.foldable {
  background-color: var(--tw-bg-opacity, red);
  border: 1px solid #d1d5db; /* Tailwind gray-300 */
  border-radius: 0.375rem; /* Tailwind rounded-md */
  padding: 1rem; /* Tailwind p-4 */
  margin-bottom: 1rem; /* Tailwind mb-4 */
  transition: box-shadow 0.3s ease;
}

.foldable-title p {
  display: inline;
  margin: 0; /* Ensure no extra margin around the title */
  padding: 0; /* Ensure no padding is added */
}

.foldable:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.foldable-summary p {
  display: inline; /* Make any <p> inline to prevent new lines */
  margin: 0; /* Remove any margin that might push it down */
  padding: 0; /* Remove any padding that could affect alignment */
}

.foldable-content {
  margin-top: 0.5rem; /* Tailwind mt-2 */
}
</style>