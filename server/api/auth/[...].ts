// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore  -- type mismatch between @auth/core and nuxt-auth, runtime OK
// import GitHub from '@auth/core/providers/github'
// import { NuxtAuthHandler } from '#auth'

// export default NuxtAuthHandler({
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     // @ts-ignore type mismatch between @auth/core and nuxt-auth
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID ?? '',
//       clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
//     })
//   ]
// })

import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

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

//   pages: {
//     signIn: '/signin', // 👈 jouw eigen pagina
//   },
})
