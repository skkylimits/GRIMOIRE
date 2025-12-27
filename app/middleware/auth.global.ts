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

	// ⏳ 1️⃣ Wacht tot auth-status bekend is
	if (status.value === 'loading') {
		return
	}

	// ✅ 2️⃣ NOOIT redirecten als je al op /signin zit
	if (to.path === '/signin') {
		// extra veiligheid: als al ingelogd → naar home
		if (status.value === 'authenticated') {
			return navigateTo('/')
		}
		return
	}

	// 🔒 3️⃣ Niet ingelogd → redirect naar signin
	if (status.value === 'unauthenticated') {
		return navigateTo('/signin')
	}

	// ✅ 4️⃣ Ingelogd en niet op /signin → gewoon doorlaten
})
