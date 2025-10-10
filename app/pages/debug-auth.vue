<!-- eslint-disable -->
<!-- @ts-nocheck -->

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
	<div class="p-6 space-y-4">
		<h1 class="text-2xl font-bold">
			Auth Debug
		</h1>

		<p>Status: <strong>{{ status }}</strong></p>

		<pre class="bg-gray-900 text-white p-3 rounded">
      {{ JSON.stringify(session, null, 2) }}
    </pre>

		<UButton
			v-if="status === 'authenticated'"
			label="Sign out"
			@click="signOut()"
		/>
		<UButton
			v-else
			label="Sign in with GitHub"
			icon="i-simple-icons-github"
			@click="signIn('github')"
		/>
	</div>
</template>
