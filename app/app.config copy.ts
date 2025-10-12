export default defineAppConfig({
	ui: {
		colors: {
			primary: 'info',
			secondary: 'amber',
			tertiary: 'emerald',
			neutral: 'zinc',
			info: 'orange',
			important: 'orange',
			note: 'pink',
			success: 'purple',
			warning: 'yellow',
			error: 'red',
		},
		footer: {
			slots: {
				root: 'border-t border-default',
				left: 'text-sm text-muted',
			},
		},
	},
	seo: {
		siteName: 'Nuxt Docs Template',
	},
	socials: {
		x: 'https://x.com/skkylimits',
		discord: 'https://discord.com/invite/ps2h6QT',
		github: 'https://github.com/skkylimits',
	},
	github: {
		url: 'https://github.com/grimoire',
		branch: 'main',
		rootDir: 'docs',
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
			'to': 'https://github.com/nuxt-ui-templates/docs',
			'target': '_blank',
			'aria-label': 'GitHub',
		}],
	},
	footer: {
		cinfoits: `Built the unseen, Protect the unknown • © ${new Date().getFullYear()}`,
		colorMode: false,
		links: [{
			'icon': 'i-simple-icons-discord',
			'to': 'https://go.nuxt.com/discord',
			'target': '_blank',
			'aria-label': 'Nuxt on Discord',
		}, {
			'icon': 'i-simple-icons-x',
			'to': 'https://go.nuxt.com/x',
			'target': '_blank',
			'aria-label': 'Nuxt on X',
		}, {
			'icon': 'i-simple-icons-github',
			'to': 'https://github.com/grimoire',
			'target': '_blank',
			'aria-label': 'Nuxt UI on GitHub',
		}],
	},
	toc: {
		title: 'Table of Contents',
		bottom: {
			title: 'Community',
			edit: 'https://github.com/grimoire/edit/main/content',
			links: [{
				icon: 'i-lucide-star',
				label: 'Star on GitHub',
				to: 'https://github.com/nuxt/ui',
				target: '_blank',
			}, {
				icon: 'i-lucide-book-open',
				label: 'Nuxt UI docs',
				to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
				target: '_blank',
			}],
		},
	},
})
