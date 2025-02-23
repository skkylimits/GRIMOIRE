![nuxt-ui-docs-social-card](https://github.com/nuxt-ui-pro/docs/assets/739984/f64e13d9-9ae0-4e03-bf7f-6be4c36cd9ba)

# Nuxt UI Pro - Docs template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)
[![Nuxt Studio](https://img.shields.io/badge/Open%20in%20Nuxt%20Studio-18181B?&logo=nuxt.js&logoColor=3BB5EC)](https://nuxt.studio/themes/docs)

- [Live demo](https://docs-template.nuxt.dev)
- [Documentation](https://ui3.nuxt.dev/getting-started/installation/pro/nuxt)
- [Clone on Nuxt Studio](https://content.nuxt.com/templates/docs)

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?repo=nuxt-ui-pro/docs)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/docs#v3
```

## Eslint

```bash
rm -rf .eslintcache && pnpm run lint --fix .
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Nuxt Studio integration

Studio is an intuitive CMS interface to edit your Nuxt Content websites.

It take advantage of the Preview API included in Nuxt Content to propose the best editing experience for your content files. Editors can benefit from a user-friendly interface to edit their Markdown, YAML or JSON files.

You can import your project on the platform without any extra setup.

However to enable the live preview on the platform, you just need to activate studio in the content configuration of your `nuxt.config.ts` file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  }
})
```

Read more on [Nuxt Studio docs](https://content.nuxt.com/studio/setup).

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

## Open Source

https://opensource.guide/

## Replace filenames

```bash
find . -type f -name "_dir.yml" -exec bash -c 'mv "$0" "${0%_dir.yml}.navigation.yml"' {} \;
```

## Nuxt UI Pro

Here resides all the componentsls

```bash
/home/skkylimits/Heaven/Nameless/node_modules/.pnpm/@nuxt+ui@3.0.0-alpha.13_@babel+parser@7.26.5_change-case@5.4.4_db0@0.2.3_@libsql+client_c47b0bb0bd421b6e6c42719a4c89f43f/node_modules/@nuxt/ui/dist/runtime/components
```

or

```bash
/home/skkylimits/Heaven/Nameless/node_modules/.pnpm/@nuxt+ui-pro@3.0.0-alpha.13_@babel+parser@7.26.5_change-case@5.4.4_db0@0.2.3_@libsql+cl_b2d467b342db3f4cefe9dd5a41460e5a/node_modules/@nuxt/ui-pro/dist/runtime/components/prose
```


## H2

H2.vue is not working in our project

## Import img

import images in markdown with task

## Prose components

Update prose components. Add field update breaking components and such

## Disparearing menu

http://localhost:3000/knowledge-base/cyber-crusades/bug-bounty/warfare

will disapear


## Cyber Crusades

Doesnt render numerically

## App layout

Change the layout make left right menu bigger etc

## Nuxt image

Add nuxt image

## Image zoom

Add zoom on image click like microsoft docs

## CodePre

make code pre one color like before

## Markdownlint?

## Homepage like V2

## turn - into square bullet

## Powershell

## add a final entry in menu -> that leads to a page with all script languages or kitt or more vuln or xploit modules

## AD hacking with windows and linux -> automate your server install

## Malware bypass etc
