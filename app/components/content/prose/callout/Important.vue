<script setup>
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()
</script>

<template>
	<ProseCallout color="important" :icon="appConfig.ui.icons.important">
		<slot mdc-unwrap="p" />
	</ProseCallout>
</template>
