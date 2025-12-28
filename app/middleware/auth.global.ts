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
	const { status, data: session } = useAuth()
	const user = session.value?.user || null

	console.log('🔧 [MIDDLEWARE] Auth status:', status.value, '| Route:', to.path)

	// 🔍 Debug logging (alleen server-side)
	if (process.server) {
		console.log('🔧 [MIDDLEWARE] Route:', to.path)
		console.log('🔧 [MIDDLEWARE] NODE_ENV:', process.env.NODE_ENV)
		console.log('🔧 [MIDDLEWARE] Public Auth:', useRuntimeConfig().public.auth)
		console.log('🔧 [MIDDLEWARE] authOrigin:', useRuntimeConfig().authOrigin)
		console.log('🔧 [MIDDLEWARE] authSecret length:', useRuntimeConfig().authSecret?.length)
		console.log('🔧 [MIDDLEWARE] Auth status:', status.value)
	}

	// ⏳ Wacht tot auth status bekend is
	if (status.value === 'loading') {
		console.log('🔧 [MIDDLEWARE] Status is loading, waiting...')
		return
	}

	const publicPaths = ['/signin', '/debug-auth']
	if (publicPaths.includes(to.path))
		return

	if (status.value === 'unauthenticated') {
		return navigateTo('/signin', { replace: true })
	}

	if (status.value === 'authenticated' && user?.name !== 'skkylimits') {
		return navigateTo('/signin', { replace: true })
	}

	// 🔑 Skkylimits naar /signin → redirect naar /the-lab
	if (status.value === 'authenticated' && user?.name === 'skkylimits' && to.path === '/signin') {
		return navigateTo('/the-lab', { replace: true })
	}
	// ✅ Ingelogd → alles toestaan
})
