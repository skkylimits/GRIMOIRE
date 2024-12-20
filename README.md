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
Sure! Here’s the updated documentation that includes the initial directory structure:

## Features: Standalone and Stripped

We have implemented two powerful rendering features for our directory structure: **Standalone** and **Stripped**. These features enhance the way you can visualize and interact with your content.

### Initial Directory Structure

Here’s the initial directory structure for reference:

```plaintext
6.knowledge-base/
└── networking/
    ├── dhcp
    └── dns
```

### 1. Standalone

The **Standalone** feature renders the entire directory structure from the top-level root. This allows you to view all components and subcomponents under a specified category.

**Example:**

For the directory path `6.knowledge-base/networking/`, the Standalone feature will display:

```plaintext
networking
├── dhcp
└── dns
```

In this view, you can see the top-level category "networking" along with all its child components.

---

### 2. Stripped

The **Stripped** feature simplifies the view by removing the top-level folder. It only displays the subfolders and their contents, making it easier to focus on specific components without the hierarchy of the parent directory.

**Example:**

For the same directory path `6.knowledge-base/networking/`, the Stripped feature will render:

```plaintext
├── dhcp
└── dns
```

In this view, you can directly access "dhcp" and "dns" without the "networking" parent folder, providing a cleaner and more focused presentation.

### Nuxt Configuration

To enable these features, you need to add them to your nuxt.config.ts file:

export default {
  content: {
    navigation: {
      fields: ['standalone', 'stripped']
    },
    highlight: {
      theme: {
        default: 'github-dark'
      },
      langs: [
        // other languages you might be using
        'powershell',
        'http'
      ]
    }
  }
}

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

## Extending NavItem

```javascript
interface ExtendedNavItem extends NavItem {
  collapsed?: boolean; // Add collapsed here without changing NavItem globally
}

const navigationLinks = computed(() => {
  const path = route.path
  const validNav = findValidNavPath(path)

  if (validNav) {
    const children = validNav.node.children || []

    const mappedNav = mapContentNavigation(children).map(child => {
      const extendedChild = child as ExtendedNavItem; // Use the local interface
      return {
        ...child,
        defaultOpen: !extendedChild.collapsed // This will work
      }
    })

    return mappedNav
  }

  return [] // If no valid directory is found, return an empty array
})

```

## Windows Machine

Vergeet niet naar `Set-ExecutionPolicy Restricted` zodra je klaar bent

PS C:\Users\MBR\Desktop\Nameless> Get-ExecutionPolicy
>>
Restricted
PS C:\Users\MBR\Desktop\Nameless> Set-ExecutionPolicy RemoteSigned

## XXSrat

https://thexssrat.podia.com/full-house-bundle-all-of-our-current-and-future-courses-in-one?coupon=DDSFSDFSFS

kjk of je deze nodig hebt of niet
