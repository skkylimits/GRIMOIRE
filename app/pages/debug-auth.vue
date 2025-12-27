<!-- eslint-disable no-console -->
<script setup lang="ts">
const { status, data: session } = useAuth()

// 🔍 Logt telkens als auth-status verandert
watchEffect(() => {
	console.warn('[Debug Auth] Status:', status.value)
	console.warn('[Debug Auth] Session:', session.value)
})

console.warn(useRuntimeConfig().public.auth)
onMounted(() => {
	console.warn('[Debug Auth] Public Auth:', useRuntimeConfig().public.auth)
	console.warn('[Debug Auth] authOrigin:', useRuntimeConfig().authOrigin)
})
</script>

<template>
	<AuthStatusCard />
</template>
