<!-- eslint-disable no-console -->
<script setup lang="ts">
const { status, data: session } = useAuth()

// 🔍 Logt telkens als auth-status verandert
watchEffect(() => {
	console.warn('[Auth Debug] Status:', status.value)
	console.warn('[Auth Debug] Session:', session.value)
})

console.warn(useRuntimeConfig().public.auth)
onMounted(() => {
	console.warn('Runtime auth config:', useRuntimeConfig().public.auth)
})
</script>

<template>
	<AuthStatusCard />
</template>
