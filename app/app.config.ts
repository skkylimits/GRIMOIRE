export default defineAppConfig({
	ui: {
		primary: 'red',
		gray: 'zinc',
		container: {
			// full-width: max-w-8xl
			constrained: 'max-w-7xl',
		},
		// to be continued
		// page: {
		//   wrapper: 'flex flex-col lg:grid lg:grid-cols-12 lg:gap-8',
		//   left: 'lg:col-span-3',
		//   center: {
		//     narrow: 'lg:col-span-6',
		//     base: 'lg:col-span-8',
		//     full: 'lg:col-span-12'
		//   },
		//   right: 'lg:col-span-3 order-first lg:order-last'
		// },
		// proseCode: {
		//   wrapper: '[&>pre]:!rounded-t-none [&>pre]:!my-0 my-5',
		//   header: 'flex items-center gap-1.5 border dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose',
		//   icon: {
		//     base: ''
		//   },
		//   button: {
		//     base: 'absolute top-2.5 right-2.5'
		//   },
		//   filename: 'dark:text-gray-200 text-sm/6'
		// },
	},
	seo: {
		siteName: 'Nameless',
	},
	header: {
		logo: {
			alt: '',
			light: '',
			dark: '',
		},
		search: true,
		colorMode: true,
		links: [
			// Uncomment volta-board & make git repo public to enable functionality

			// {
			//   'icon': 'i-bi-activity',
			//   'to': '/volta-board',
			//   'aria-label': 'Volta board'
			// },
			{
				'icon': 'i-mdi-tag',
				'to': '/the-lab',
				'target': '_blank',
				'aria-label': 'Changelog',
			},
			{
				'icon': 'i-simple-icons-github',
				'to': 'https://github.com/skkylimits/Nameless',
				'target': '_blank',
				'aria-label': 'Nameless on GitHub',
			},
		],
	},
	toc: {
		title: 'Table of Contents',
		bottom: {
			title: 'Community',
			edit: 'https://github.com/skkylimits/Zettelkasten',
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
