<script setup lang="ts">
import Callout from '../Callout.vue'
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
</script>

<template>
	<Callout
		color="important"
		:icon="appConfig.ui.icons.warning"
	>
		<slot mdc-unwrap="p" />
	</Callout>
</template>
