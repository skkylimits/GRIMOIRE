// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    'nuxt-og-image'
  ],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  typescript: {
    strict: false
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  colorMode: {
    disableTransition: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never', // No trailing commas
        braceStyle: '1tbs' // One true brace style (brace on same line)
      }
    }
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton', 'UIcon'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
    '/api/search.json': { prerender: true }
  },

  content: {
    navigation: {
      fields: ['standalone', 'stripped', 'collapsed']
    },
    markdown: {
      toc: {
        depth: 2 // Adjust to your liking
        // searchDepth: 4,
      }
    },
    // https://shiki.style/
    highlight: {
      // https://content.nuxt.com/get-started/configuration#highlight
      theme: {
        // Force 'github-dark' for both light and dark modes
        default: 'github-dark', // Theme for dark mode or by default
        dark: 'github-dark', // Ensure that dark mode uses the same theme
        light: 'github-light' // Force light mode to use the same theme as well
      },
      langs: [
        // other languages you might be using
        'powershell',
        'http'
      ]
    }
  }
})
