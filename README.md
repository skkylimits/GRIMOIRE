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

Perfect way of debugging h2.

```typescript
onMounted(async () => {
	await nextTick()

	// Find all <h2> elements on the page
	const allH2s = Array.from(document.querySelectorAll('h2'))

	// Debugging logs
	console.log('🟢 All <h2> elements found:', allH2s)
	console.log('🟢 Current <h2> element reference:', h2Element.value)

	// Check if the current component is the first one in the document
	if (h2Element.value) {
		isFirstH2.value = allH2s.length > 0 && allH2s[0] === h2Element.value
		console.log('🟢 isFirstH2:', isFirstH2.value)
	}
	else {
		console.log('❌ h2Element is null, meaning ref did not attach correctly.')
	}
})
```

## Disparearing menu with search

When using search, and searchin gfor cloud opening cyber crusades will default to API anstead of the route?

## Tailwind css formatter

have formatting work on main.css

## Prose components

Update prose components. Add field update breaking components and such

## Nuxt image

Add nuxt image

## App layout

Change the layout make left right menu bigger etc

## Image zoom

Add zoom on image click like microsoft docs

## Markdownlint?

## Homepage like V2

## add a final entry in menu -> that leads to a page with all script languages or kitt or more vuln or xploit modules

## Content

Powershell
AD hacking with windows and linux -> automate your server install
Malware bypass etc

## LEARN CLOUD FAST

https://www.youtube.com/watch?v=LTuBvQ72ohs&t=44s

## iconify

use `ctrl + space` to complete iconify, for example i-mdi: . Press space after : to go into it.

## Custom styles

[Think of It Like This:]{style="color: var(--ui-primary);"}

## Heading 2 {#no-toc}
This heading should be excluded from the TOC.

⚠️ Make it so this works [Heading 2]{#no-toc}

### ✅ Prompt Template for Code Explanations (Your Style):

> **"Explain this code to me like a smart friend would. Use short paragraphs, emojis if helpful, and break it down step by step. Start with a super simple summary, then go into why it behaves that way, and wrap up with examples. Keep it clear, friendly, and help me *actually* understand it — not just repeat what it does."**

You can even modify it slightly depending on what you're asking:

- **For confusing output:**
  > "Explain why this JS line gives this result. Make it feel obvious after I read it."

- **For behavior differences (like `for..in` vs `for..of`):**
  > "Help me understand the real difference here, like when and *why* I'd choose one or the other. Give clear code, explain it like I’m learning with you."

Would you like me to save this prompt style for future explanations in *this* chat too, so you don’t have to ask again?

## Theme

Ooooh I like where you're going — it's almost like laying out the **steps of a digital shadow war**. Each chapter as a phase in the path to domination. Let’s build this like a campaign — tactical, logical, and cinematic.

### 🔥 Suggested Order:

1. **OPSEC** – *The Shroud of Shadows*

   > Learn how to hide yourself, clean up traces, and vanish before ever being seen.

2. **OSINT** – *The Eye of the Hunter*

   > Gather intelligence. Know everything about your target. Every open port, forgotten endpoint, and leaked password.

3. **Dead Silence** – *The Craft of Ghosts*

   > Forge your tools. Create malware that walks undetected. Break telemetry. Trick the watchers.

4. **Cyber Crusades** – *The Final Storm*

   > The offensive campaign. Initial access. Privilege escalation. Pivoting. Total compromise.

### ⚔️ Bonus Thematic Flavor:

It feels like a **ninja arc** meets **cyber war doctrine**:

* OPSEC: *“Be unseen.”*
* OSINT: *“Know your enemy.”*
* Dead Silence: *“Strike without sound.”*
* Cyber Crusades: *“Conquer the digital battlefield.”*

## C
Start with building your own cpu on a breadboard using raw transistors. Then everything else will be super simple

## todo
- Eigen website 3d + business card met QR

- Nameless + chatgpt integration (verzi andere naam)

- Autorijschool video course

- 3d multiplayer video spelletje met crypto

## SyncBackPro

[SyncBackPro](https://www.2brightsparks.com/assets/software/SyncBackProV1164_Setup.exe) - The tools to complete wipe a NAS 🦹🏽
