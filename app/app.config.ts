export default defineAppConfig({
	ui: {
		colors: {
			primary: 'red',
			secondary: 'amber',
			tertiary: 'emerald',
			neutral: 'zinc',
			info: 'orange',
			important: 'pink',
			success: 'purple',
			warning: 'yellow',
			error: 'red',
		},
		icons: {
			info: 'i-lucide:info',
			success: 'i-ri:folder-info-line',
			important: 'i-ri:folder-info-line',
			warning: 'i-lucide:triangle-alert',
			caution: 'i-lucide:circle-alert',

		},
		header: {
			slots: {
				root: 'bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50',
				container: 'flex items-center justify-between gap-3 h-full',
				left: 'lg:flex-1 flex items-center gap-1.5',
				center: 'hidden lg:flex',
				right: 'flex items-center justify-end lg:flex-1 gap-1.5',
				title: 'shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5',
				toggle: 'lg:hidden',
				content: 'lg:hidden',
				overlay: 'lg:hidden',
				header: 'px-14 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
				body: 'p-4 sm:p-6 overflow-y-auto',
			},
			variants: {
				toggleSide: {
					left: {
						toggle: '-ms-1.5',
					},
					right: {
						toggle: '-me-1.5',
					},
				},
			},
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
				variants: {
					color: {
						info: { // note
							base: 'border border-info/25 bg-info/10 text-info-600 dark:text-info-300 [&_a]:text-note [&_a]:hover:border-info [&_code]:text-info-600 dark:[&_code]:text-info-300 [&_code]:border-info/25 [&_a]:hover:[&>code]:border-info [&_a]:hover:[&>code]:text-info [&>ul]:marker:text-info/50',
							icon: 'text-info',
							externalIcon: 'text-note-600 dark:text-note-300',
						},
						// important: { // important
						// 	base: 'border border-important-600/25 bg-important-100/10 text-important-600 dark:text-important-300 [&_a]:text-important-600 [&_a]:hover:border-important-600 [&_code]:text-important-600 dark:[&_code]:text-important-300 [&_code]:border-important-600/25 [&_a]:hover:[&>code]:border-important-600 [&_a]:hover:[&>code]:text-important-600 [&>ul]:marker:text-important-600/50',
						// 	icon: 'text-important',
						// 	externalIcon: 'text-important-600 dark:text-important-300',
						// },
						success: { // tip
							base: 'border border-success/25 bg-success/10 text-success-600 dark:text-success-300 [&_a]:text-success [&_a]:hover:border-success [&_code]:text-success-600 dark:[&_code]:text-success-300 [&_code]:border-success/25 [&_a]:hover:[&>code]:border-success [&_a]:hover:[&>code]:text-success [&>ul]:marker:text-success/50',
							icon: 'text-success',
							externalIcon: 'text-success-600 dark:text-success-300',
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
			},
		},
	},
	seo: {
		siteName: 'Grimore',
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
