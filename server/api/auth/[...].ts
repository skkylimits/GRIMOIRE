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

// import GithubProvider from 'next-auth/providers/github'
// import { NuxtAuthHandler } from '#auth'

// export default NuxtAuthHandler({
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     // 🚨 BELANGRIJK: .default() toevoegen voor SSR
//     // @ts-expect-error – type issue tussen next-auth & nuxt-auth
//     GithubProvider.default({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   ],
// })
