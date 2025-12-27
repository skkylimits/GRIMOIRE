<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
	path: '/signin',
	// auth: {
	// 	unauthenticatedOnly: true,
	// 	navigateAuthenticatedTo: '/the-lab',
	// },
})

const { signIn } = useAuth()
const toast = useToast()
const showError = ref(false) // 👈 error-flag voor validatieblok

const fields: AuthFormField[] = [
	{ name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
	{ name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
	{ name: 'remember', label: 'Remember me', type: 'checkbox' },
]

// Alleen GitHub-provider
const providers = [
	{
		label: 'GitHub',
		icon: 'i-simple-icons-github',
		class: 'cursor-pointer',
		onClick: async () => {
			try {
				// SSR-safe: gebruik de route query parameter of fallback naar /
				const route = useRoute()
				const callbackUrl = (route.query.callbackUrl as string) || '/'

				// eslint-disable-next-line no-console
				console.log('🚀 Starting GitHub sign-in with callback:', callbackUrl)
				await signIn('github', { callbackUrl, redirect: true })
			}
			catch (err) {
				console.error('❌ GitHub sign-in failed:', err)
				toast.add({
					title: 'Sign-in failed',
					description: 'Something went wrong. Please try again.',
					color: 'error',
				})
			}
		},
	},
]

const schema = z.object({
	email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
	password: z.string({ required_error: 'Password is required' }),
})

type Schema = z.output<typeof schema>

function onSubmit(_payload: FormSubmitEvent<Schema>) {
	showError.value = true
}
</script>

<template>
	<div class="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
		<UPageCard class="w-full max-w-md">
			<UAuthForm
				:schema="schema"
				title="Login"
				description="Enter your credentials to access your account."
				icon="i-lucide-user"
				:fields="fields"
				:providers="providers"
				@submit="onSubmit"
			>
				<template #validation>
					<UAlert
						v-if="showError"
						color="error"
						icon="i-lucide-info"
						title="Error signing in"
						description="Access denied — authentication codes do not match."
					/>
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
