import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default <Partial<Config>>{
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				red: {
					50: '#FFF0F0',
					100: '#FFDDDD',
					200: '#FFC0C1',
					300: '#FF9596',
					400: '#FF5859',
					500: '#FF2426',
					600: '#FE080A',
					700: '#D60002',
					800: '#B10304',
					900: '#910b0C',
					950: '#500001',
				},
				prose: {
					// Add your custom prose colors here
					pre: {
						bg: '#1e1e1e', // Background for <pre>
						color: '#ffffff', // Text color for <pre>
					},
					// You can define more prose styles here as needed
				},
			},
			maxWidth: {
				'7xl': '90rem', // overwriting the default for a wider <main>
				// '8xl': default // default width for 8xl; without specifying, makes app full-width
			},

			screens: {
				// Override the default breakpoints or add custom ones
				// 'xs': '475px',   // Extra small devices
				// 'sm': '640px',   // Small devices (mobile)
				// 'md': '768px',   // Medium devices (tablet)
				lg: '1080px', // Large devices (laptop)
				// 'xl': '1280px',  // Extra large devices (desktop)
				// '2xl': '1536px', // Ultra large screens
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.box-shadow': {
					'@apply transition-shadow duration-300 ease-in-out hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_15px_rgba(255,255,255,0.15)]': {},
				},
				'.edge': {
					'@apply border rounded-md border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)]': {},
				},
			})
		}),
	],
	content: [
		'./app/**/*.vue',
		'./app/**/*.js',
		'./app/**/*.ts',
		'./app/components/**/*.{js,vue,ts}',
		'./app/layouts/**/*.vue',
		'./app/pages/**/*.vue',
		// Exclude problematic files
		'!./node_modules',
		'!./.nuxt/content-cache/parsed/**/*.md',
	],
}
