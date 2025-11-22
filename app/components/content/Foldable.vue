<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<details class="foldable my-5 p-4 box-shadow bg-[var(--tw-prose-pre-bg)] dark:bg-[var(--tw-prose-pre-bg)] border rounded-md border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)]">
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
