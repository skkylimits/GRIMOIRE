// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(

	{
		// Configures for antfu's config
		stylistic: {
			indent: 'tab', // 4, or 'tab'
			quotes: 'single' // or 'double'
		},
		//
		vue: {
			// We also provided the overrides options in each integration to make it easier:
			overrides: {
				'vue/operator-linebreak': ['error', 'before']
			}
		},
		typescript: {
			overrides: {
				'ts/consistent-type-definitions': ['error', 'interface']
			}
		},
		// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
		ignores: [
			'**/fixtures'
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
			html: true
			/**
			 * Format Markdown files
			 * Supports Prettier and dprint
			 * By default uses Prettier
			 * MDC not supported yet so disabling for now
			 */
			// markdown: 'prettier',
		}
	},

	// From the second arguments they are ESLint Flat Configs
	// you can have multiple configs
	{
		// Doesnt work just yet. Switching to prettier for md files now
		files: ['**/*.md'],
		rules: {
		}
	},
	{
		files: ['**/*.js'],
		rules: {}
	},
	{
		files: ['**/*.ts'],
		rules: {}
	},
	{
		// Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
		files: ['**/*.vue'],
		rules: {
			'vue/operator-linebreak': ['error', 'before']
		}
	},
	{
		// Without `files`, they are general rules for all files
		rules: {
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }]

			// 'style/semi': ['error', 'never'],
		}
	}
)

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
