import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

const runtimeConfig = useRuntimeConfig()

console.log('🔧 [AUTH] Secret length:', runtimeConfig.authSecret?.length)
console.log('🔧 [AUTH] Origin:', runtimeConfig.authOrigin)

export default NuxtAuthHandler({
	secret: useRuntimeConfig().authSecret, // ✅ runtime veiliger

	providers: [
		// @ts-expect-error: .default is vereist voor SSR in Nuxt
		GithubProvider.default({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],

	callbacks: {
		/**
		 * 🔐 Wordt elke keer aangeroepen wanneer een sessie wordt opgehaald
		 */
		async session({ session, token }) {
			// Je kunt custom data toevoegen aan de session
			// @ts-expect-error – session.user.id exist when logged in
			session.user.id = token.sub
			return session
		},

		/**
		 * 🧠 Wordt elke keer aangeroepen als JWT wordt gemaakt of vernieuwd
		 */
		async jwt({ token, account }) {
			if (account?.access_token) {
				token.accessToken = account.access_token
			}
			return token
		},
	},
})
