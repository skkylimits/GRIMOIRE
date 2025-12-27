/* eslint-disable no-console */
export default defineNuxtRouteMiddleware((to) => {
	const { status } = useAuth()
	const runtimeConfig = useRuntimeConfig()

	const isServer = process.server
	const phase = isServer ? 'SSR' : 'CLIENT'

	// ╭──────────────────────────────────────────────────────────╮
	// 📦 TOP-LEVEL AUTH MIDDLEWARE GROUP
	// ╰──────────────────────────────────────────────────────────╯
	console.groupCollapsed(
		`%c🔐 auth.global.ts → ${to.fullPath} [${phase}]`,
		'color:#7aa2f7;font-weight:bold',
	)

	// ╭───────────────── STEP 1 — REQUEST CONTEXT ─────────────────╮
	console.groupCollapsed('🔍 STEP 1 — Request context')
	console.log('Route path:', to.path)
	console.log('Full path:', to.fullPath)
	console.log('Execution phase:', phase)
	console.log('NODE_ENV:', process.env.NODE_ENV)
	console.log('import.meta.dev:', import.meta.dev)
	console.groupEnd()

	// ╭───────────────── STEP 2 — AUTH CONFIG SOURCE ─────────────╮
	console.groupCollapsed('🔐 STEP 2 — Auth configuration')
	console.log('runtimeConfig.authOrigin:', runtimeConfig.authOrigin)
	console.log('runtimeConfig.authSecret length:', runtimeConfig.authSecret?.length)
	console.log('process.env.AUTH_ORIGIN:', process.env.AUTH_ORIGIN)
	console.log('process.env.NUXT_AUTH_ORIGIN:', process.env.NUXT_AUTH_ORIGIN)
	console.log('process.env.NUXT_PUBLIC_AUTH_ORIGIN:', process.env.NUXT_PUBLIC_AUTH_ORIGIN)
	console.log('process.env.NUXT_AUTH_DISABLED:', process.env.NUXT_AUTH_DISABLED)
	console.groupEnd()

	// ╭───────────────── STEP 3 — AUTH STATE ──────────────────────╮
	console.groupCollapsed('🍪 STEP 3 — Auth state')
	console.log('Auth status:', status.value)
	console.groupEnd()

	// ╭───────────────── STEP 4 — WAIT FOR RESOLUTION ─────────────╮
	if (status.value === 'loading') {
		console.log('⏳ STEP 4 — Auth status is loading → wait')
		console.groupEnd()
		return
	}

	// ╭───────────────── STEP 5 — SIGNIN ROUTE GUARD ──────────────╮
	if (to.path === '/signin') {
		console.log('🚪 STEP 5 — On /signin route')

		if (status.value === 'authenticated') {
			console.log('✅ Already authenticated → redirect to /')
			console.groupEnd()
			return navigateTo('/')
		}

		console.log('ℹ️ Unauthenticated on /signin → allow')
		console.groupEnd()
		return
	}

	// ╭───────────────── STEP 6 — ENFORCE AUTH ────────────────────╮
	const excludedPaths = [
		'/session', // session endpoint
		'/api/auth', // algemene auth route
		'/api/auth/providers', // ophalen van providers
		'/providers', // ophalen van providers
		'/signin', // login pagina zelf
	]

	console.log('🔍 STEP 6 — Excluded paths check:', excludedPaths, 'Current path:', to.path)

	if (!excludedPaths.some(p => to.path.startsWith(p))) {
		if (status.value === 'unauthenticated') {
			console.warn('🔒 STEP 6 — Not authenticated → redirect to /signin')
			const callbackUrl = encodeURIComponent(to.fullPath)
			console.log('🔎 redirecting to:', `/signin?callbackUrl=${callbackUrl}`)
			console.groupEnd()
			return navigateTo(`/signin?callbackUrl=${callbackUrl}`)
		}
	}

	// ╭───────────────── STEP 7 — ACCESS GRANTED ──────────────────╮
	console.log('✅ STEP 7 — Authenticated → access granted')
	console.groupEnd()
})
