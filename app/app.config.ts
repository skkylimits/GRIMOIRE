export default defineAppConfig({
	ui: {
		colors: {
			primary: 'red',
			neutral: 'zinc',
		},
	},
	uiPro: {
		prose: {
			pre: {
				slots: {
					root: 'hover:shadow-lg hover:shadow-red-500/50 hover:dark:shadow-lg hover:dark:shadow-red-400/50 ',
					header: 'bg-black dark:bg-(--ui-color-neutral-900)',
					icon: 'text-white',
					filename: 'text-white',
				},
			},
			ul: {
				base: 'list-square !important',
			},
		},
		footer: {
			slots: {
				root: 'border-t border-(--ui-border)',
				left: 'text-sm text-(--ui-text-muted)',
			},
		},
	},
	icons: {
		important: 'i-f7:exclamationmark-bubble', // The icon you want to use
		// Add other icons if needed
	},
	seo: {
		siteName: 'Nameless',
	},
	header: {
		title: '',
		to: '/',
		logo: {
			alt: '',
			light: '',
			dark: '',
		},
		search: true,
		colorMode: true,
		links: [{
			'icon': 'i-simple-icons-github',
			'to': 'https://github.com/skkylimits/Nameless',
			'target': '_blank',
			'aria-label': 'GitHub',
		}],
	},
	footer: {
		credits: `Copyright © ${new Date().getFullYear()}`,
		colorMode: false,
		links: [{
			'icon': 'i-simple-icons-discord',
			'to': 'https://discord.com/invite/ps2h6QT',
			'target': '_blank',
			'aria-label': 'Nuxt UI on Discord',
		}, {
			'icon': 'i-simple-icons-x',
			'to': 'https://x.com/nuxt_js',
			'target': '_blank',
			'aria-label': 'Nuxt on X',
		}, {
			'icon': 'i-simple-icons-github',
			'to': 'https://github.com/nuxt/ui',
			'target': '_blank',
			'aria-label': 'Nuxt UI on GitHub',
		}],
	},
	toc: {
		title: 'Table of Contents',
		bottom: {
			title: 'Community',
			edit: 'https://github.com/skkylimits/Nameless',
			links: [
				{
					icon: 'i-heroicons-star',
					label: 'Star on GitHub',
					to: 'https://github.com/skkylimits/Nameless',
					target: '_blank',
				},
			],
		},
	},
})
