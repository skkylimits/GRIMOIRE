<script setup>
const { data: doc } = await useAsyncData('identity-content', () =>
	queryContent('/1.the-lab/2.core-principles/identity').findOne())
</script>

<template>
	<ContentRenderer :value="doc" />
</template>
