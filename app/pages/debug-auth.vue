<script setup lang="ts">
const { status, data: session } = useAuth()

// 🔍 Logt telkens als auth-status verandert
watchEffect(() => {
  console.log('[Auth Debug] Status:', status.value)
  console.log('[Auth Debug] Session:', session.value)
})

console.log(useRuntimeConfig().public.auth)
onMounted(() => {
  console.log('Runtime auth config:', useRuntimeConfig().public.auth)
})
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">Auth Debug</h1>

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
