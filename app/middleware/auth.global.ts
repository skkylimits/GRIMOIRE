/* eslint-disable no-console */
export default defineNuxtRouteMiddleware((to) => {
	// 🧪 Skip auth logic entirely when testing
	// if (import.meta.env.NUXT_AUTH_DISABLED === 'true') {
	// 	console.warn('[Auth Middleware] Skipping middleware because NUXT_AUTH_DISABLED=true')
	// 	return // ⛔️ middleware stopt hier in test
	// }

	// // ⚙️ Dev mode: disable auth for local development
	// if (import.meta.dev) {
	// 	console.warn('[Auth Middleware] ⚙️ DEV mode active — auth disabled', import.meta.dev)
	// 	return // ⛔️ middleware stopt hier in dev
	// }

	// 🔒 Auth status ophalen
	const { status } = useAuth()

	// 🔍 Debug logging (alleen server-side)
	if (process.server) {
		console.log('🔧 [MIDDLEWARE] Route:', to.path)
		console.log('🔧 [MIDDLEWARE] NODE_ENV:', process.env.NODE_ENV)
		console.log('🔧 [MIDDLEWARE] authOrigin:', useRuntimeConfig().authOrigin)
		console.log('🔧 [MIDDLEWARE] authSecret length:', useRuntimeConfig().authSecret?.length)
		console.log('🔧 [MIDDLEWARE] Auth status:', status.value)
	}

	// ⏳ Wacht tot auth status bekend is
	if (status.value === 'loading') {
		console.log('🔧 [MIDDLEWARE] Status is loading, waiting...')
		return
	}

	// 🛠️ /debug-auth altijd toegestaan
	if (to.path === '/debug-auth') {
		console.log('🔧 [MIDDLEWARE] Debugging')
		return
	}

	// 🚫 Signin is altijd toegestaan
	if (status.value === 'unauthenticated' && to.path !== '/signin') {
		console.log('🔧 [MIDDLEWARE] Not authenticated, redirecting to /signin')
		return navigateTo('/signin', { replace: true }) // altijd naar /signin
	}

	// 🔒 Auth check
	if (status.value === 'authenticated' && to.path === '/signin') {
		console.log('🔧 [MIDDLEWARE] Already authenticated, redirecting to home')
		return navigateTo('/the-lab', { replace: true }) // redirect naar home als al ingelogd
	}

	// ✅ Ingelogd → alles toestaan
})
