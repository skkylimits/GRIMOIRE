/* eslint-disable no-console */

import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

const runtimeConfig = useRuntimeConfig()

console.log('🔧 [AUTH DEBUG] Secret length:', runtimeConfig.authSecret?.length)
console.log('🔧 [AUTH DEBUG] Server authOrigin:', runtimeConfig.authOrigin)
console.log('🔧 [AUTH DEBUG] Public authOrigin:', runtimeConfig.public.authOrigin)

export default NuxtAuthHandler({
	secret: useRuntimeConfig().authSecret, // ✅ runtime veiliger
	// origin: useRuntimeConfig().authOrigin, // ← heel belangrijk!

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
			console.log('🔐 [Session callback] session object:', session)
			console.log('🔐 [Session callback] token object:', token)

			// @ts-expect-error – session.user.id exist when logged in
			session.user.id = token.sub
			return session
		},

		/**
		 * 🧠 Wordt elke keer aangeroepen als JWT wordt gemaakt of vernieuwd
		 */
		async jwt({ token, account }) {
			console.log('🧠 [JWT callback] token object:', token)
			console.log('🧠 [JWT callback] account object:', account)

			if (account?.access_token) {
				console.log('🧠 Adding access token to JWT:', account.access_token)
				token.accessToken = account.access_token
			}
			return token
		},
	},
})
