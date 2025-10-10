export default defineNuxtRouteMiddleware((to) => {
	// 🧪 Skip auth logic entirely when testing
	if (import.meta.env.NUXT_AUTH_DISABLED === 'true') {
		console.warn('[Auth Middleware] Skipping middleware because NUXT_AUTH_DISABLED=true')
		return // ⛔️ middleware stopt hier in test
	}

	// ⚙️ Dev mode: disable auth for local development
	if (import.meta.dev) {
		console.warn('[Auth Middleware] ⚙️ DEV mode active — auth disabled', import.meta.dev)
		return // ⛔️ middleware stopt hier in dev
	}

	// 🔒 Normal auth flow
	const { status } = useAuth()

	// console.log('✅ Middleware geladen op', import.meta.server ? 'server' : 'client', 'voor route:', to.path)

	if (status.value === 'loading')
		return

	// Niet ingelogd → redirect naar loginpagina
	if (status.value === 'authenticated' && to.path === '/signin') {
		return navigateTo('/')
	}

	// Al ingelogd maar naar signin → stuur naar home
	if (status.value === 'unauthenticated' && to.path !== '/signin') {
		return navigateTo('/signin')
	}
})
