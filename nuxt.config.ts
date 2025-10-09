// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ✅ Runtime-config — gebruikt bij runtime & SSR
//   runtimeConfig: {
//     authSecret: process.env.AUTH_SECRET,
//     public: {
//       auth: {
//         origin: process.env.AUTH_ORIGIN ?? 'http://localhost:3000',
//         baseURL: 'http://localhost:3000/api/auth', // 👈 absolute URL!
//         enableGlobalAppMiddleware: true
//       }
//     }
//   },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@sidebase/nuxt-auth'
  ],


   // ✅ Module-config — gebruikt bij setup
//   auth: {
//     provider: {
//       type: 'authjs',
//       defaultProvider: 'github',
//       trustHost: true,
//       addDefaultCallbackUrl: true
//     }
//   },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: false,
      autoSubfolderIndex: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://docs-template.nuxt.dev/',
    title: 'Nuxt Docs Template',
    description: 'A template for building documentation with Nuxt UI and Nuxt Content.',
    full: {
      title: 'Nuxt Docs Template - Full Documentation',
      description: 'This is the full documentation for the Nuxt Docs Template.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Essentials',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/essentials%' }
        ]
      }
    ]
  }
})
