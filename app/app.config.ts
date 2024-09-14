export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'zinc'
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
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/skkylimits/Zettelkasten',
      'target': '_blank',
      'aria-label': 'Nameless on GitHub'
    }]
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
