// export default defineNuxtRouteMiddleware(async (to) => {
//   const { status } = useAuth()

//   // Wacht tot auth geladen is
//   if (status.value === 'loading') return

//   // Toestaan: loginpagina zelf
//   if (to.path.startsWith('/signin')) return

//   // Redirect als niet ingelogd
//   if (status.value === 'unauthenticated') {
//     return navigateTo('/signin')
//   }

//   // Als al ingelogd en naar signin → stuur terug naar /
//   if (to.path.startsWith('/signin') && status.value === 'authenticated') {
//     return navigateTo('/')
//   }
// })
