<template>
	<code class="red-highlight">
		<slot />
	</code>
</template>

<style>
.red-highlight {
  color: rgb(255 255 255 / var(--tw-text-opacity));
  background: rgb(var(--color-primary-400) / var(--tw-text-opacity));
}
</style>
