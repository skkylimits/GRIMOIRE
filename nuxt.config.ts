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
		timeline: {
			enabled: true,
		},
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

	// https://ui.nuxt.com/getting-started/icons/nuxt#custom-local-collections
	icon: {
		provider: 'iconify',
		customCollections: [{
			prefix: 'custom',
			dir: './assets/icons',
		}],
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
				highlight: {
					// Theme used in all color schemes.
					theme: {
						// Force 'github-dark' for both light and dark modes
						default: 'github-dark', // Theme for dark mode or by default
						dark: 'github-dark', // Ensure that dark mode uses the same theme
						light: 'github-light', // Force light mode to use the same theme as well
					},
					langs: [
						// other languages you might be using
						'html',
						'css',
						'js',
						'javascript',
						'json',
						'yaml',
						'bash',
						'ini',
						'java',
						'php',
						'sql',
						'cmd',
						'powershell',
						'http',
						'mdc',
						'c',
					],
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
