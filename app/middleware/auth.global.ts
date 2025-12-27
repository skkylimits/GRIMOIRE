/* eslint-disable no-console */
export default defineNuxtRouteMiddleware((to) => {
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
		return
	}

	// 🛠️ /debug-auth altijd toegankelijk
	if (to.path === '/debug-auth') {
		return
	}

	// 🚫 Signin is altijd toegestaan
	if (status.value === 'unauthenticated' && to.path !== '/signin') {
		return navigateTo('/signin', { replace: true }) // altijd naar /signin
	}

	// 🔒 Auth check
	if (status.value === 'authenticated' && to.path === '/signin') {
		return navigateTo('/', { replace: true }) // redirect naar home als al ingelogd
	}

	// ✅ Ingelogd → alles toestaan
})
