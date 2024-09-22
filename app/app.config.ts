export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'zinc',
    container: {
      // full-width: max-w-8xl
      // constrained: 'max-w-7xl' // default
    },
    // page: {
    //   grid: {
    //     wrapper: 'lg:grid-cols-12 lg:gap-8',
    //     left: 'lg:col-span-3', // Adjusted width for left column
    //     center: {
    //       narrow: 'lg:col-span-6',
    //       base: 'lg:col-span-9', // Adjusted width for center column
    //       full: 'lg:col-span-10'
    //     },
    //     right: 'lg:col-span-3' // Adjusted width for right column
    //   }
    // }
  },
  seo: {
    siteName: 'Nameless'
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
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
        'aria-label': 'Changelog'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/skkylimits/Nameless',
        'target': '_blank',
        'aria-label': 'Nameless on GitHub'
      }
    ]
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
          target: '_blank'
        }
      ]
    }
  }
})
