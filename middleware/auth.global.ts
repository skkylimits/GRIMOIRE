export default defineNuxtRouteMiddleware(async (to) => {
  const { status } = useAuth()

  // 🧭 Debug-logging — laat je zien wat er gebeurt
  console.log('[auth.global] middleware loaded for:', to.path)
  console.log('[auth.global] current status:', status.value)

  // 🕐 Wacht tot auth klaar is
  if (status.value === 'loading') return

  // 🛑 Laat /signin altijd door
  if (to.path.startsWith('/signin')) return

  // 🚨 Redirect als niet ingelogd (client-side)
  if (process.client && status.value === 'unauthenticated') {
    console.warn('[auth.global] Client redirect → /signin')
    return navigateTo('/signin')
  }

  // 🚨 Redirect als niet ingelogd (server-side, voor SEO / SSR beveiliging)
  if (process.server && status.value === 'unauthenticated') {
    console.warn('[auth.global] Server redirect → /signin')
    return sendRedirect(event, '/signin')
  }

  // ✅ Al ingelogd maar probeert /signin te bezoeken
  if (process.client && to.path.startsWith('/signin') && status.value === 'authenticated') {
    console.info('[auth.global] Already authenticated → redirect /')
    return navigateTo('/')
  }
})
