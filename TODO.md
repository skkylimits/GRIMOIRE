# TODO

## Bug

- [ ] **Title in Slug Error**: Currently disabled. Requires further investigation.
    - Deep dive into **OG** & **SEO** settings.
- [ ] **Advanced Markdown Rendering Issues**:
    - [ ] **GeoJSON**: Ensure GeoJSON support is working correctly.
    - [ ] **STL**: Investigate if STL files render properly.
    - [ ] **Mermaid**: Review issue discussed in [GitHub thread](https://github.com/nuxt/content/issues/1866#issuecomment-1442360997) to resolve Mermaid rendering problems.
- [ ] **Linting Issues**:
    - [ ] **Tailwind CSS Linting Conflict**:
        - `.css` files are being linted, but Tailwind CSS or CSS within `.vue` files is not.
        - Solution: Fix this through the Antfu ESLint repo instead of manually configuring a Prettier file. [Watch the tutorial here](https://www.youtube.com/watch?v=jlZzzpE-D0s).
    - [ ] **MDC Linting**: Ensure **MDC** files are **NOT** linted.
    - [ ] **Console Log Line Numbers**: Adjust configuration to make sure line numbers in `console.log` point to the exact line in **VSCode**.
- [ ] **Normalize Markdown Image Syntax**: Fix inconsistencies in image syntax for better rendering in markdown files.

## UI

- [ ] **Breadcrumb**: Already have a working implementation.
- [ ] **Collapsed & Multiple Feature**: Work in progress. A branch has been created for this.
- [ ] **Fix Clickable Header**: Currently, you can't use a link in a header, which can be frustrating. Example: [What is Web](https://chatgpt.com/share/67c92a28-dec0-4f6e-8374-16ddf11507d4)
    - [ ] **[Nuxt] [NuxtLink]**: You can't nest one `<a>` inside another `<a>`. This causes a hydration error on the client-side. You can pass a custom prop to take full control of the markup.
    - [ ] Customize the logic to handle this issue, instead of using `navLink` & `accordion`. This part is not modifiable as it stands now.
- [ ] **Create Custom Shiki Theme**: Design and implement a custom Shiki theme, ensuring it works for both light and dark modes.
- [ ] **Make Code Block Scrollable with Copy Code**: Implement functionality where the "copy code" button scrolls with the code block, similar to the behavior in ChatGPT, ensuring the button remains in view as you scroll down.
- [ ] **Changelog Page**: Create a changelog page with a tag that scrolls when in view, similar to the one on [Volta Changelog](https://volta.net/changelog).

## Prose Components

- [ ] **Git Highlights**: Decide on a spectrum of red with or without a unique border.
    - [ ] Ensure **correct box-shadow colors** are applied.
    - [ ] Update the colors inside the highlight to reflect the correct context (currently using standard red).
    - [ ] Look at **Doc v1 colors** for inspiration on color combinations.
- [ ] **List with Steps Connected**: Create a list with steps that visually connect from number 1 to 2 using a line. (Reference image available on work laptop).
    - [ ] Replace the current table with the old table from **VitePress**.
- [ ] **Icon Library**: Make a list of all used icons (e.g., `i-ph:app-window`) and display them in a library format.
- [ ] **Combination of Cookie Declaration and FAQ**: Combine elements of the [Cookie Declaration](https://www.juridischloket.nl/cookieverklaring/) and Vue FAQ for a new feature.
- [ ] **Image Zoom**: Implement an image zoom feature like the one on this page: [Azure Security - First Layer Defense](https://learn.microsoft.com/en-us/azure/architecture/solution-ideas/articles/azure-security-build-first-layer-defense).
    - Focus on zooming in on the image as done on the website.

## Config

- [ ] **Add Settings/Config Option**: Implement a setting that allows enabling or disabling certain behaviors, such as the horizontal rule (`hr`) below the `h2` header. Think of it like how Discord has toggleable features.
- [ ] **Adjust Prose Behavior**: Make it configurable to adjust how certain prose elements behave, such as the `h2` headers with a standard `---` horizontal rule at the end.
- [ ] **Exclude Specific H2 from TOC**: Create a configuration so that when using `_##` or `## h2 .{exclude}`, that specific `h2` will not render in the Table of Contents (TOC).

## DOC

- [ ] find out how to incorporate subdomains. instructions.nameless.com / prose.nameless.com etc
- [ ] Explain how your functions work (jsdoc)
- [ ] One line scalar/openAPI docs https://www.youtube.com/shorts/BKmnBXsGwkM

## Automation

- [ ] Renovate https://github.com/renovatebot/tutorial
- [ ] CI pipeline
- [ ] automated changelog
- [ ] git hooks -> pre commits (npm run test)

## Nameless

- [ ] https://destcert.com/cissp-mindmaps/
- [ ] Update the threat landscape with security breaches. Add more types
- [ ] Rework methodologies like you had before.

## Features

- [ ] Integrate ChatGPT -> https://www.kapa.ai/
- [ ] Translate language or i18?
- [ ] Setup ZeroTier [with login and such]
- [ ] Setup database like you did with Nameless HTTP server
- [x] Setup Volta and backlog/github
- [ ] Setup Nuxt Studio
- [ ] flashcard creation and question
- [ ] add community option for discussions
- [ ] cookieverklaring - https://www.juridischloket.nl/cookieverklaring/
- [ ] download to pdf - https://michaelnthiessen.com/create-beautiful-pdfs-with-html-css-and-markdown

## Production

- [ ] **Decide Between Cloud or CDN**: Choose whether to use cloud storage or a CDN, and make the appropriate adjustments in `runtimeConfig` and `.env`. Ensure assets like `![alt text](url)` are served from the correct path:
    - In development: `/images/img.png`
    - In production: `{cdn}/images/img.png`
    - Explore options such as [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) or [Backblaze B2 Cloud Storage](https://www.backblaze.com/cloud-storage).
- [ ] **Evaluate the Necessity of Nuxt Image Module for Markdown**: Assess whether the Nuxt Image module is really necessary for serving images in markdown content, or if another solution could be more efficient.

## Your Main Branch Is Not Protected

https://github.com/skkylimits/Nameless/settings/rules/new?target=branch&enforcement=disabled

## Special

- [ ] Make a [vsode extension]
	- [ ] that lists all prose styling options?
	- [ ] eslint/markdown schrijf je eigen versie in eslint/markdown met de regels van markdownlint
	- [ ] keyboard overlay? een extensie van ctrl + space?
- [ ] Make a [browser extension]
	- [ ] that captures important comments(and lets you organize them) Kinda like pocket
- [ ] Create a [nuxt module]
- [ ] Create a [GPT]
	- [ ] Focused on writing:mode for IT, Doc Writing, & Email Writing

## When finished

- [ ] **MIKEYROJAS**: Continue development of personal website.
    - [ ] **Design/Development Site**: Work on the design and development of the site.
    - [ ] **Security Site**: Implement necessary security features for the website.
- [ ] **AIHOUSE**: Create an automation website for AI solutions (e.g., lead automation), inspired by [The AI Clubhouse on Instagram](https://www.instagram.com/theaiclubhouse).
- [ ] **ALTIJDGESLAAGD**: Develop an auto driving lessons website combining features from **Theorie Toppers Mikey** and **Altijd Geslaagd**.
- [ ] **STEM**: Build a blockchain-based referendum platform where users can submit and vote on ideas that will be implemented (users vote using a "niek" account).
- [ ] **VERHUISLIFT**: Develop a website for a moving lift service.
- [ ] **DROPSHIP**: Create a baby product webshop using dropshipping.
- [ ] **3D GAMES**: Develop 3D games.

## Research

- [ ] Customize windows search(search NAS + user files) en de rest voor Everything. Everytihg  indexeert op basis van files, windows op basis van content

## Certificates

- [ ] **SC-900**: Prepare for and pass the Microsoft Security, Compliance, and Identity Fundamentals exam.
- [ ] **MD-102**: Prepare for and pass the Microsoft Windows 10 exam.
- [ ] **RIJBWIJS**: Focus on the "Rijbewijs" (driver’s license) exam preparation.
- [ ] **TCM & AD/AZURE ACADEMY**: Study and complete the TCM & Azure Academy courses.
- [ ] **CBK CISSP**: Study for the Certified Information Systems Security Professional (CISSP) certification.
    - [ ] **Study Guide for CISSP**: Follow a structured study guide to prepare for the CISSP exam.

## Windows PC storage

Primary System (Windows PC)
- 3 NVMe SSDs for top-tier performance:
	- Main OS: Fast boot and responsive system.
	- Games/VM: High-speed storage for games and virtual machines.
	- Kali/Ubuntu: Dedicated drives for Linux distributions (Kali and Ubuntu).

TerraMaster NAS F8 SSD Plus
- 4x 4TB/8TB NVMe SSDs configured for high-speed storage and efficient access.

NAS Storage
- 4x 16TB Offline Storage: For secure, cold storage of essential data.

Backup Solution
    SyncBack Pro: Automated backup and synchronization to keep your data safe and up to date

## Automate Windows Unattended

Automate the Windows installation process to detect virtualization environments and physical machines, and apply the appropriate settings (UEFI/Bios) without manually creating ISO files from scratch.
Features:

- Detect Virtualization Environments:
	- VMware: Detect VMware and apply relevant configuration.
	- VirtualBox: Detect VirtualBox and apply relevant configuration.
	- Hyper-V: Detect Hyper-V and apply UEFI settings if needed.

- Detect Physical Machines:
	- Automatically detect whether the installation is on a physical machine or a virtual machine and adjust installation settings accordingly (e.g., BIOS/UEFI mode).

- Automate the Process:
	- Use an unattended installation to automatically detect the environment and apply the necessary settings during the Windows setup.
	- Eliminate the need to manually create or modify ISO files for different setups.

## Career

<https://bluecapesecurity.com/faq/>

## snippets

- svg
- footnotes
- convert markdowndefault to custom snippets <https://danielabaron.me/blog/vscode-markdown-basics-custom-fenced-languages/>
- add vue snippets from nuxtpro

## Paste red border around media automatically

## Firefox

Find a way to use policies.json in `C:\Program Files\Mozilla Firefox\distribution`

If you can't create a file in that dir. Open a notepad with admin priv. Then open file. Navigate to `C:\Program Files\Mozilla Firefox\distribution` and right click in the windows the create file. Than set file type to all files.

```json
{
	"policies": {
		"PinnedTabs": [
			"https://google.com",
			"https://facebook.com"
		]
	}
}
```

This is just ofr reference if you go to.

Go to `about:policies` in the browser and make sure your polcies.json is properly formatted. Because PinnedTabs doesnt work.

## nuxt img

ipx doesnt work properly in wsl. might have to spin up a docker container to test it.

## https://content.nuxt.com/docs/utils/query-collection-navigation

See if we can use this to create a custom navigation system. And list it based on number of gfile insted of ABC

## Default open

Menu defaults open to the first item. This is not the desired behavior. It should be closed by default.
