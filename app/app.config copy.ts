export default defineAppConfig({
	ui: {
		colors: {
			primary: 'red',
			secondary: 'amber',
			tertiary: 'emerald',
			neutral: 'zinc',
			info: 'orange',
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
		prose: {
			ul: {
				base: 'list-square', // of Tailwind classes naar wens
			},
			callout: {
				slots: {
					base: [
						'group relative block px-4 py-3 rounded-md text-sm/6 my-5 last:mb-0 [&_code]:text-xs/5 [&_code]:bg-default [&_pre]:bg-default [&>div]:my-2.5 [&_ul]:my-2.5 [&_ol]:my-2.5 [&>*]:last:!mb-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:my-0',
						'transition-colors',
					],
					icon: [
						'size-4 shrink-0 align-sub me-1.5',
						'transition-colors',
					],
					externalIcon: [
						'size-4 align-top absolute right-2 top-2 pointer-events-none',
						'transition-colors',
					],
				},
				variants: {
					color: {
						primary: {
							base: 'border border-primary/25 bg-primary/10 text-primary-600 dark:text-primary-300 [&_a]:text-primary [&_a]:hover:border-primary [&_code]:text-primary-600 dark:[&_code]:text-primary-300 [&_code]:border-primary/25 [&_a]:hover:[&>code]:border-primary [&_a]:hover:[&>code]:text-primary [&>ul]:marker:text-primary/50',
							icon: 'text-primary',
							externalIcon: 'text-primary-600 dark:text-primary-300',
						},
						secondary: {
							base: 'border border-secondary/25 bg-secondary/10 text-secondary-600 dark:text-secondary-300 [&_a]:text-secondary [&_a]:hover:border-secondary [&_code]:text-secondary-600 dark:[&_code]:text-secondary-300 [&_code]:border-secondary/25 [&_a]:hover:[&>code]:border-secondary [&_a]:hover:[&>code]:text-secondary [&>ul]:marker:text-secondary/50',
							icon: 'text-secondary',
							externalIcon: 'text-secondary-600 dark:text-secondary-300',
						},
						success: {
							base: 'border border-success/25 bg-success/10 text-success-600 dark:text-success-300 [&_a]:text-success [&_a]:hover:border-success [&_code]:text-success-600 dark:[&_code]:text-success-300 [&_code]:border-success/25 [&_a]:hover:[&>code]:border-success [&_a]:hover:[&>code]:text-success [&>ul]:marker:text-success/50',
							icon: 'text-success',
							externalIcon: 'text-success-600 dark:text-success-300',
						},
						important: { // Jouw nieuwe "important" variant
							base: 'border border-important/25 bg-important/10 text-important-600 dark:text-important-300 [&_a]:text-important [&_a]:hover:border-important [&_code]:text-important-600 dark:[&_code]:text-important-300 [&_code]:border-important/25 [&_a]:hover:[&>code]:border-important [&_a]:hover:[&>code]:text-important [&>ul]:marker:text-important/50',
							icon: 'text-important',
							externalIcon: 'text-important-600 dark:text-important-300',
						},
						// Bestaande kleurvarianten blijven zoals ze zijn
					},
				},
				compoundVariants: [
					{
						color: 'important', // Voeg 'important' toe als compound variant
						to: true,
						class: {
							base: 'hover:border-important',
							externalIcon: 'group-hover:text-important',
						},
					},
				],
				defaultVariants: {
					color: 'neutral',
				},
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
		credits: `Built the unseen, Protect the unknown • © ${new Date().getFullYear()}`,
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
