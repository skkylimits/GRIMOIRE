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
						info: { // note
							base: 'border border-note/25 bg-note/10 text-note-600 dark:text-note-300 [&_a]:text-note [&_a]:hover:border-note [&_code]:text-note-600 dark:[&_code]:text-note-300 [&_code]:border-note/25 [&_a]:hover:[&>code]:border-note [&_a]:hover:[&>code]:text-note [&>ul]:marker:text-note/50',
							icon: 'text-note',
							externalIcon: 'text-note-600 dark:text-note-300',
						},
						success: { // tip
							base: 'border border-success/25 bg-success/10 text-success-600 dark:text-success-300 [&_a]:text-success [&_a]:hover:border-success [&_code]:text-success-600 dark:[&_code]:text-success-300 [&_code]:border-success/25 [&_a]:hover:[&>code]:border-success [&_a]:hover:[&>code]:text-success [&>ul]:marker:text-success/50',
							icon: 'text-succes',
							externalIcon: 'text-success-600 dark:text-success-300',
						},
						important: { // important
							base: 'border border-note/25 bg-note/10 text-note-600 dark:text-note-300 [&_a]:text-note [&_a]:hover:border-note [&_code]:text-note-600 dark:[&_code]:text-note-300 [&_code]:border-note/25 [&_a]:hover:[&>code]:border-note [&_a]:hover:[&>code]:text-note [&>ul]:marker:text-note/50',
							icon: 'text-note',
							externalIcon: 'text-note-600 dark:text-note-300',
						},
						warning: { // warning
							base: 'border border-warning/25 bg-warning/10 text-warning-600 dark:text-warning-300 [&_a]:text-warning [&_a]:hover:border-warning [&_code]:text-warning-600 dark:[&_code]:text-warning-300 [&_code]:border-warning/25 [&_a]:hover:[&>code]:border-warning [&_a]:hover:[&>code]:text-warning [&>ul]:marker:text-warning/50',
							icon: 'text-warning',
							externalIcon: 'text-warning-600 dark:text-warning-300',
						},
						error: { // caution
							base: 'border border-error/25 bg-error/10 text-error-600 dark:text-error-300 [&_a]:text-error [&_a]:hover:border-error [&_code]:text-error-600 dark:[&_code]:text-error-300 [&_code]:border-error/25 [&_a]:hover:[&>code]:border-error [&_a]:hover:[&>code]:text-error [&>ul]:marker:text-error/50',
							icon: 'text-error',
							externalIcon: 'text-error-600 dark:text-error-300',
						},
					},
					to: {
						true: 'border-dashed',
					},
				},
				compoundVariants: [
					{
						color: 'primary',
						to: true,
						class: {
							base: 'hover:border-primary',
							externalIcon: 'group-hover:text-primary',
						},
					},
					{
						color: 'neutral',
						to: true,
						class: {
							base: 'hover:border-inverted',
							externalIcon: 'group-hover:text-highlighted',
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
