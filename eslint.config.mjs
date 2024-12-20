// eslint.config.mjs
import antfu from '@antfu/eslint-config'

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
		// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
		ignores: [
			'**/fixtures',
			// ...globs
		],
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
