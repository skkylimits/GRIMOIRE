<script setup lang="ts">
const { status, data: session, signIn, signOut } = useAuth()

// ✅ SSR-veilige callback-URL
const callbackUrl = typeof window !== 'undefined' ? window.location.origin : '/'
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-6">
		<UCard variant="subtle" class="w-full max-w-2xl p-8 space-y-6 shadow-lg rounded-2xl">
			<!-- Titel + status -->
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
					<UIcon name="i-lucide-shield" class="text-primary" />
					Auth Status
				</h2>

				<UBadge
					:color="status === 'authenticated' ? 'primary' : 'secondary'"
					variant="soft"
					size="sm"
				>
					{{ status }}
				</UBadge>
			</div>

			<!-- Session data -->
			<div>
				<p class="text-sm mb-2 font-medium">
					Session data
				</p>
				<div class="bg-gray-100 text-gray-800 dark:bg-gray-100 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">
					{{ JSON.stringify(session, null, 2) }}
				</div>
			</div>

			<!-- Actieknoppen -->
			<div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
				<UButton
					v-if="status === 'authenticated'"
					color="primary"
					variant="solid"
					icon="i-lucide-log-out"
					label="Sign out"
					@click="signOut()"
				/>
				<UButton
					v-else
					color="primary"
					variant="solid"
					icon="i-simple-icons-github"
					label="Sign in with GitHub"
					@click="signIn('github', { callbackUrl })"
				/>
			</div>
		</UCard>
	</div>
</template>
