// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxt/content',
		'nuxt-og-image',
		'nuxt-llms',
		'@nuxt/scripts',
		'@nuxt/test-utils',
		'@sidebase/nuxt-auth',
	],

	devtools: {
		enabled: true,
	},

	css: ['~/assets/css/main.css'],

	ui: {
		// prefix: 'Nuxt', // i.p.v. <UButton>, kun je iets zoals <NuxtButton> krijgen.
		// fonts: false, // Schakelt de fonts-module uit
		colorMode: true, // Zet het in, zet het op false om het uit te schakelen
		theme: {
			colors: [
				'primary',
				'secondary',
				'tertiary',
				'neutral',
				'info',
				'important',
				'success',
				'warning',
				'error',
			], // Specificeer kleuren voor je thema
			transitions: true, // Overgangen inschakelen
			defaultVariants: {
				color: 'primary',
				// size: 'md',
			},
		},
	},

	mdc: {
		components: {
			prose: true,
		},
	},
	// components: [
	// 	{
	// 		path: '~/components',
	// 	},
	// 	{
	// 		path: 'node_modules/@nuxt/ui/dist/runtime/components/prose',
	// 		prefix: 'Prose',
	// 	},
	// ],

	content: {
		build: {
			markdown: {
				toc: {
					searchDepth: 1,
				},
			},
		},
	},

	runtimeConfig: {
		authSecret: process.env.AUTH_SECRET, // secret voor het signeren/versleutelen van tokens
		authOrigin: process.env.NUXT_AUTH_ORIGIN || 'http://localhost:3000', // fallback site-URL voor SSR
	},

	compatibilityDate: '2024-07-11',

	nitro: {
		prerender: {
			routes: [
				'/',
			],
			crawlLinks: false,
			autoSubfolderIndex: false,
		},
	},

	// https://auth.sidebase.io/guide/getting-started/introduction
	auth: {
		originEnvKey: 'NUXT_AUTH_ORIGIN', // welke env-var de auth module gebruikt voor je site-URL
		baseURL: '/api/auth',
		globalAppMiddleware: false, // ⛔️ NIET door NuxtAuth laten doen
		provider: {
			type: 'authjs',
			defaultProvider: 'github',
			trustHost: true,
			addDefaultCallbackUrl: true,
		},
	},

	eslint: {
		config: {
			stylistic: {
				commaDangle: 'never',
				braceStyle: '1tbs',
			},
		},
	},

	icon: {
		provider: 'iconify',
	},

	llms: {
		domain: 'https://docs-template.nuxt.dev/',
		title: 'Nuxt Docs Template',
		description: 'A template for building documentation with Nuxt UI and Nuxt Content.',
		full: {
			title: 'Nuxt Docs Template - Full Documentation',
			description: 'This is the full documentation for the Nuxt Docs Template.',
		},
		sections: [
			{
				title: 'Getting Started',
				contentCollection: 'docs',
				contentFilters: [
					{ field: 'path', operator: 'LIKE', value: '/getting-started%' },
				],
			},
			{
				title: 'Essentials',
				contentCollection: 'docs',
				contentFilters: [
					{ field: 'path', operator: 'LIKE', value: '/essentials%' },
				],
			},
		],
	},
})
