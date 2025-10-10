// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
	// ⚙️ settings voor jouw project
	{
		// 🧩 projecttype
		type: 'app',

		// ✨ jouw voorkeursstijl
		stylistic: {
			indent: 'tab', // of 2 als je spaties wil
			quotes: 'single',
			semi: false,
		},

		// 🔍 taalondersteuning
		vue: true,
		typescript: true,

		// ❌ mappen negeren
		ignores: [
			'.nuxt',
			'.output',
			'node_modules',
			'dist',
			'coverage',
		],

		// 💅 optionele formatters (werkt als Prettier)
		formatters: {
			css: true,
			html: true,
			markdown: 'prettier',
		},
		rules: {
			// 🌍 Globale uitzonderingen
			'node/prefer-global/process': 'off',
			'no-restricted-globals': 'off',
		},

	},
)
