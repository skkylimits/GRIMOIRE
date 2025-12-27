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

	// 🚫 Signin is altijd toegestaan
	if (to.path === '/signin') {
		// Als al ingelogd → naar home
		if (status.value === 'authenticated') {
			return navigateTo('/')
		}
		return
	}

	// 🔒 Niet ingelogd → FORCE redirect
	if (status.value === 'unauthenticated') {
		return navigateTo('/signin', {
			replace: true,
		})
	}

	// ✅ Ingelogd → alles toestaan
})
