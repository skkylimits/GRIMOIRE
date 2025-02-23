<script setup lang="ts">
import Callout from '../Callout.vue'
// import { useAppConfig } from '#imports'

// const appConfig = useAppConfig()

// Fallback icon in case 'warning' does not exist
// const importantIcon = appConfig.ui?.icons?.important ?? 'default-warning-icon' // Replace with a default icon if necessary
</script>

<template>
	<Callout
		color="important"
		icon="i-f7:exclamationmark-bubble"
	>
		<slot mdc-unwrap="p" />
	</Callout>
</template>
