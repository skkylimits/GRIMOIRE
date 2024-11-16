<template>
  <details class="foldable bg-[var(--tw-prose-pre-bg)] dark:bg-[var(--tw-prose-pre-bg)] border rounded-md border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)] p-4 my-5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-shadow duration-300 ease-in-out">
    <summary class="foldable-summary">
      <slot name="title" />
    </summary>
    <div class="foldable-content">
      <slot name="content" />
    </div>
  </details>
</template>


<style>
.foldable-summary p {
  display: inline; /* Make any <p> inline to prevent new lines caused by MDC syntax*/
  margin: 0; /* Remove any margin that might push it down */
  padding: 0; /* Remove any padding that could affect alignment */
}
</style>