// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		// '@nuxt/image',
		'@nuxt/ui-pro',
		'@nuxt/content',
		'nuxt-og-image'
	],

	// components: [
	// 	{
	// 		path: '~/components',
	// 		pathPrefix: false // Disable prefix if you want to use it directly
	// 	}
	// ],

	// https://nuxt.com/docs/api/nuxt-config#devtools
	devtools: {
		enabled: true,

		timeline: {
			enabled: true
		}
	},

	css: ['~/assets/css/main.css'],

	vue: {
		compilerOptions: {
			isCustomElement: tag => ['Important'].includes(tag)
		}
	},

	// https://nuxt.com/docs/getting-started/upgrade#opting-in-to-nuxt-4
	future: {
		compatibilityVersion: 4
	},

	compatibilityDate: '2024-07-11',

	nitro: {
		prerender: {
			routes: [
				'/'
			],
			crawlLinks: true
		}
	},

	eslint: {
		config: {
			stylistic: {
				commaDangle: 'never',
				indent: 'tab',
				semi: false
			}
		}
	},

	icon: {
		provider: 'iconify'
	}
})
