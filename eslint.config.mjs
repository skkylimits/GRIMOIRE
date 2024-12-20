// eslint.config.mjs
import antfu from '@antfu/eslint-config'

const mdcIgnoreProcessor = {
	preprocess: (text) => {
		// Preprocessing: Split text into lines and replace nested MDC blocks with placeholders
		const ignoredSections = []
		const processedText = text.replace(
			/(::[a-z-]+)([\s\S]*?)(::)/gi,
			(match, start, content, end) => {
				ignoredSections.push(match)
				return '' // Replace ignored sections with an empty string
			},
		)
		return [processedText]
	},
	postprocess: (messages) => {
		// Postprocessing: Ignore lint messages for ignored sections
		return messages[0].filter(message => !message.ruleId)
	},
}

export default antfu(

	{
		// Configures for antfu's config
		stylistic: {
			indent: 'tab', // 4, or 'tab'
			quotes: 'single', // or 'double'
		},
		//
		vue: {
			// We also provided the overrides options in each integration to make it easier:
			overrides: {
				'vue/operator-linebreak': ['error', 'before'],
			},
		},
		typescript: {
			overrides: {
				'ts/consistent-type-definitions': ['error', 'interface'],
			},
		},
		markdown: {
			overrides: {
				plugins: ['markdown'],
				overrides: [
					{
						files: ['**/*.md'],
						processor: mdcIgnoreProcessor,
						rules: {
							// Ignore specific blocks of content within markdown
							'no-console': 'off',
							// You can add more rules here to disable or customize as needed
						},
					},
				],
				ignorePatterns: [
					// Ignore MDC blocks starting and ending with ::, including multiline
					'^::.*::$', // Single-line MDC blocks (e.g., ::note::)
					'^::.*\\n[\\s\\S]*?::$', // Multiline MDC blocks
					'::[\\s\\S]*?::', // General match for any MDC block
				],
			},
		},
		// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
		ignores: [
			'**/fixtures',
			// ...globs
		],
		formatters: {
			/**
			 * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
			 * By default uses Prettier
			 */
			css: true,
			/**
			 * Format HTML files
			 * By default uses Prettier
			 */
			html: true,
			/**
			 * Format Markdown files
			 * Supports Prettier and dprint
			 * By default uses Prettier
			 */
			// markdown: 'prettier',
		},
	},

	// From the second arguments they are ESLint Flat Configs
	// you can have multiple configs
	{
		// Doesnt work just yet. Switching to external formatter for markdown for now
		files: ['**/*.md'],
		rules: {
		},
	},
	{
		files: ['**/*.js'],
		rules: {},
	},
	{
		files: ['**/*.ts'],
		rules: {},
	},
	{
		// Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
		files: ['**/*.vue'],
		rules: {
			'vue/operator-linebreak': ['error', 'before'],
		},
	},
	{
		// Without `files`, they are general rules for all files
		rules: {
			// 'style/semi': ['error', 'never'],
		},
	},
)
