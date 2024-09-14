# Nameless

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)
[![Nuxt Studio](https://img.shields.io/badge/Open%20in%20Nuxt%20Studio-18181B?&logo=nuxt.js&logoColor=3BB5EC)](https://nuxt.studio/themes/docs)

- [Live demo](https://docs-template.nuxt.dev/)
- [Play on Stackblitz](https://stackblitz.com/github/nuxt-ui-pro/docs)
- [Documentation](https://ui.nuxt.com/pro/getting-started)
- [Clone on Nuxt Studio](https://nuxt.studio/themes/docs)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/docs
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

Add `@nuxthq/studio` dependency to your package.json:

```bash
# npm
npm install --save-dev @nuxthq/studio

# pnpm
pnpm add -D @nuxthq/studio

# yarn
yarn add -D @nuxthq/studio

# bun
bun add -d @nuxthq/studio
```

Add this module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  ...
  modules: [
    ...
    '@nuxthq/studio'
  ]
})
```

Read more on [Nuxt Studio docs](https://nuxt.studio/docs/get-started/setup).

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

## Nuxt Ecosystem

There are already many websites based on this template:

- [Nuxt](https://nuxt.com) - The Nuxt website
- [Nuxt UI](https://ui.nuxt.com) - The documentation of `@nuxt/ui` and `@nuxt/ui-pro`
- [Nuxt Image](https://image.nuxt.com) - The documentation of `@nuxt/image`
- [Nuxt Content](https://content.nuxt.com) - The documentation of `@nuxt/content`
- [Nuxt Devtools](https://devtools.nuxt.com) - The documentation of `@nuxt/devtools`
- [Nuxt Studio](https://nuxt.studio) - The pro version of Nuxt Content

## \_dir.yml

## Overview

The `_dir.yml` file is used to configure the rendering of navigation elements in your application. This file allows you to specify properties that influence how directories are displayed in the navigation tree. The configuration options include setting a `title`, defining whether the directory is `stripped`, and specifying if it is `standalone`.

Here are the prompts that made [this](https://chatgpt.com/share/95a60589-504a-497d-821d-ac974407d556) happen.

## Key Concepts

### Title

The `title` property specifies the display name of the directory or section in the navigation tree. This is the text that will be shown to users.

**Example configuration:**

```yaml
title: The Lab
```

In this example, the directory or section will be labeled as "The Lab" in the navigation menu.

### Stripped

The `stripped` property indicates that the directory should be removed from the navigation hierarchy. Its contents will be displayed as if they are at the root level.

**How It Works:**

- **Configuration:**

  ```yaml
  title: Tutorials
  stripped: true
  ```

- **Effect:** The "Tutorials" directory itself will not appear in the navigation tree. Instead, its sub-items will be shown directly at the top level.

### Standalone

The `standalone` property specifies that the directory should be treated as a separate item in the navigation tree, with its own sub-items listed underneath.

**How It Works:**

- **Configuration:**

  ```yaml
  title: The Lab
  standalone: true
  ```

- **Effect:** "The Lab" will appear as a distinct item in the navigation menu. Its children will be displayed underneath it.

### Example Use Cases

1. **Standalone Directory:**

   ```yaml
   title: The Lab
   standalone: true
   ```

   - "The Lab" will appear as a top-level item with its children listed below.

2. **Stripped Directory:**

   ```yaml
   title: Tutorials
   stripped: true
   ```

   - The "Tutorials" directory will not be visible. Its contents will be shown directly in the navigation.

3. **Standalone and Stripped Directory:**

   ```yaml
   title: Featured
   standalone: true
   stripped: true
   ```

   - "Featured" will not appear in the navigation tree. Its sub-items will be shown directly as top-level items.

## Icons [workaround]

- [Iconify](https://iconify.design/) - Freedom to choose icons

If you want to download a new icon, place it in: `icon: 'i-simple-icons-gitkraken`. After that it will render everywhere in your site.

// place this wherever between a <template></template> It might invoke a redownload
<UIcon name="i-heroicons-js" class="w-5 h-5" />

```appHeader.vue [javascript]
{
        label: 'Nmap',
        to: '/kitt/nmap',
        icon: 'i-simple-icons-gitkraken',
        description: 'A network scanning tool used to discover hosts, services, and vulnerabilities in a network.'
      }
```


## Icons

"@iconify-json/heroicons": "^1.1.21",
"@iconify-json/simple-icons": "^1.1.109",
"@iconify-json/file-icons": "^1.1.10",
"@iconify-json/game-icons": "^1.1.10",
"@iconify-json/mdi": "^1.1.68",

---