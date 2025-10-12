<script setup>
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
</script>

<template>
	<ProseCallout color="error" :icon="appConfig.ui.icons.caution">
		<slot mdc-unwrap="p" />
	</ProseCallout>
</template>
