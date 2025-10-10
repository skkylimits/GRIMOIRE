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
			'content/**/*.md',
		],

		// 💅 optionele formatters (werkt als Prettier)
		formatters: {
			css: true,
			html: true,
			// markdown: 'prettier', ❌ uitgeschakeld
		},
		rules: {
			// 🌍 Globale uitzonderingen
			'node/prefer-global/process': 'off',
			'no-restricted-globals': 'off',
		},
	},
)

// .editorconfig = beïnvloedt hoe het eruitziet terwijl je typt
// .vscode/settings.json = bepaalt hoe VS Code omgaat met linting en auto-fixes
//  eslint.config.mjs = bepaalt hoe de code écht moet zijn ✅
//  Markdown All in One = “is het lekker om in te schrijven?”
