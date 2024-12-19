// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ['@nuxt/ui-pro'],

	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxthq/studio',
		'nuxt-og-image',
		'@nuxtjs/eslint-module',
	],

	// https://nuxt.com/docs/api/nuxt-config#devtools
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	// https://color-mode.nuxtjs.org/
	colorMode: {
		disableTransition: true,
	},

	content: {
		// https://content.nuxt.com/usage/navigation#custom-keys
		navigation: {
			fields: ['standalone', 'stripped', 'collapsed'],
		},
		// https://content.nuxt.com/get-started/configuration#markdown
		markdown: {
			// https://github.com/nuxt/content/blob/17ab4785205ae9eec94580734b602eb29c6c52da/src/types/module.ts#L73
			toc: {
				depth: 2, // Adjust to your liking
				// searchDepth: 4,
			},
		},
		// https://shiki.style/
		highlight: {
			// https://content.nuxt.com/get-started/configuration#highlight
			theme: {
				// Force 'github-dark' for both light and dark modes
				default: 'github-dark', // Theme for dark mode or by default
				dark: 'github-dark', // Ensure that dark mode uses the same theme
				light: 'github-light', // Force light mode to use the same theme as well
			},
			langs: [
				// other languages you might be using
				'powershell',
				'http',
			],
		},
	},

	routeRules: {
		// Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
		'/': { prerender: true },
		'/api/search.json': { prerender: true },
	},

	// https://nuxt.com/docs/getting-started/upgrade#opting-in-to-nuxt-4
	future: {
		compatibilityVersion: 4,
	},

	// https://nuxt.com/docs/api/nuxt-config#compatibilitydate
	compatibilityDate: '2024-07-11',

	// https://nuxt.com/docs/api/nuxt-config#strict
	typescript: {
		strict: false,
	},

	hooks: {
		// Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
		'components:extend': (components) => {
			const globals = components.filter(c => ['UButton', 'UIcon'].includes(c.pascalName))

			globals.forEach(c => c.global = true)
		},
	},

	// https://eslint.nuxt.com/packages/module
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: false,
				// ...
			},
		},
	},
})
