export default defineNuxtRouteMiddleware(async (to) => {
	// Skip voor niet-docs routes of routes die al een bestand zijn
	if (!to.path.startsWith('/') || to.path.endsWith('.md')) {
		return
	}

	try {
		// Check of de pagina bestaat
		const page = await queryCollection('docs').path(to.path).first()

		// Als de pagina niet bestaat, check voor redirect
		if (!page) {
			// Haal navigation op
			const navigation = await queryCollection('docs').all()

			// Zoek het nav item voor dit path
			const navItem = findNavItemByPath(to.path, navigation)

			if (navItem?.children?.length) {
				let redirectTarget = null

				// Als deze node tabs heeft, redirect naar eerste tab's eerste child
				if (navItem.tabs && navItem.children[0]?.children?.length) {
					redirectTarget = findFirstValidMdNode(navItem.children[0].children)
				}
				else {
					// Anders, zoek gewoon de eerste markdown node
					redirectTarget = findFirstValidMdNode(navItem.children)
				}

				if (redirectTarget?.path) {
					// Gebruik navigateTo voor client-side redirect
					return navigateTo(redirectTarget.path, {
						redirectCode: 301,
						replace: true,
					})
				}
			}
		}
	}
	catch (error) {
		// Log error maar laat de pagina normaal laden
		// De [...slug].vue zal de 404 afhandelen
		console.error('Redirect middleware error:', error)
	}
})
