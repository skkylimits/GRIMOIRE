// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { status } = useAuth()

  // ⏳ Wacht tot de auth-status bekend is
  if (status.value === 'loading') return

  // 🧭 Als user al ingelogd is en naar /signin wil, stuur naar home
  if (to.path.startsWith('/signin') && status.value === 'authenticated') {
    return navigateTo('/')
  }

  // 🔓 Loginpagina is altijd toegankelijk
  if (to.path.startsWith('/signin')) return

  // 🔒 Als user niet is ingelogd → redirect naar signin
  if (status.value === 'unauthenticated') {
    return navigateTo('/signin')
  }
})
