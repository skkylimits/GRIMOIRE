export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  //console.log('✅ Middleware geladen op', import.meta.server ? 'server' : 'client', 'voor route:', to.path)

  if (status.value === 'loading') return

  // Signin mag altijd
  if (to.path === '/signin') return

  // Niet ingelogd → redirect naar loginpagina
  if (status.value === 'unauthenticated') {
    return navigateTo('/signin')
  }

  // Al ingelogd maar naar signin → stuur naar home
  if (status.value === 'authenticated' && to.path === '/signin') {
    return navigateTo('/')
  }
})
