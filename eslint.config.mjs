import markdown from '@eslint/markdown'
import json from '@eslint/json'
import withNuxt from './.nuxt/eslint.config.mjs'

console.log(markdown)

export default withNuxt([
	{
		plugins: {
			markdown,
			json,
		},
	},
	// Enable stylistic formatting rules for JavaScript, TypeScript, and Vue
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
		rules: {
			'@stylistic/indent': ['error', 'tab'], // Example: enforce 2-space indentation
			'@stylistic/semi': ['error', 'always'], // Example: enforce semicolons
		},
	},

	// Enable stylistic formatting rules

	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
		rules: {
			// Add general ESLint rules that are not part of @stylistic

			// 'no-console': 'off' // allow console.log in TypeScript files
		},
	},

	// lint JSON files
	{
		files: ['**/*.json'],
		language: 'json/json',
		rules: {
			'json/no-duplicate-keys': 'error',
			'json/no-empty-keys': 'error',
			'json/no-unsafe-values': 'error',
			'json/no-unnormalized-keys': 'error',
			'json/top-level-interop': 'error',

			// Disable the problematic rule for json files
			'no-irregular-whitespace': 'off',

			// Disable indent rule for json files
			'@stylistic/indent': 'off', // Disable indentation rule for Markdown
		},
	},
	// lint Markdown files
	{
		files: ['**/*.md'],
		language: 'markdown/gfm',
		rules: {
			'markdown/fenced-code-language': 'error',
			'markdown/heading-increment': 'error',
			'markdown/no-duplicate-headings': 'error',
			'markdown/no-empty-links': 'error',
			// 'markdown/no-html': 'error',
			'markdown/no-invalid-label-refs': 'error',

			// Disable the problematic rule for Markdown files
			'no-irregular-whitespace': 'off',

			// Disable indent rule for markdown files
			'@stylistic/indent': 'off', // Disable indentation rule for Markdown
		},
	},
])

// https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html

/**
 * Why Have ESLint Config in Both Files?
 *
 * Global ESLint Configuration (eslint.config.ts): This file is used to define general linting rules
 * that apply to the whole project. It is where you'd typically define all your linting rules for the
 * entire codebase, including customizations.
 *
 * Nuxt-Specific Configuration (nuxt.config.ts): Here, you can define specific configurations that are
 * directly tied to how Nuxt's modules or tools (like ESLint or the development server) interact with
 * your project. For example, Nuxt might apply certain stylistic rules when running the development server,
 * or it might automatically lint specific files. You might also use this to configure linting behavior
 * for code that is generated or handled by Nuxt modules.
 *
 * This setup gives you flexibility. You can keep project-wide linting configurations in eslint.config.ts
 * while handling Nuxt-specific linting needs within the nuxt.config.ts.
 *
 * When to Use Each:
 *
 * eslint.config.ts: Use this for the bulk of your ESLint configuration. This is where you'll define most
 * of your rules, plugins, and configurations that apply to all JavaScript/TypeScript files in your project.
 *
 * nuxt.config.ts: Use this for Nuxt-specific customizations and stylistic rules that only affect your Nuxt
 * application during development. This is typically not where you'd define core linting rules, but rather
 * where you'd make adjustments that are more closely related to the Nuxt environment.
 */
