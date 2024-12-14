# TODO

## Linting

- [ ] Markdown lint -> Integrate antufu/eslint for css & markdown
- [ ] Make sure lint doesnt make nuxt unreadable
- [ ] https://github.com/funkhaus/fuxt/pull/121

## Bug

- [ ] Title in slug is error. Disabled for now. Deep dive into OG & SEO.
- [ ] Why advanced markdown such aas mermad etc not working?

## UI

- [ ] Breadcrumb (we already have a working one)
- [ ] Collapsed & Multiple feature (work in progress -> created branch)
- [ ] Fix clickable header. Currently, you can't use a link in a header, which can be frustrating (what-is-web.md <https://chatgpt.com/share/67c92a28-dec0-4f6e-8374-16ddf11507d4>)
  - [ ] [Nuxt] [NuxtLink] You can't nest one <a> inside another <a>. This will cause a hydration error on client-side. You can pass the custom prop to take full control of the markup.
  - [ ] now customize the according to handle the logic instead of usink navLink & accordion. this is not modifyable how it is now
- [ ] Make own Shiki theme. Same theme for light and dark uses
- [ ] make copy code from codeblock scrollable. Meaning when you scroll down and code block hasnt ended the copy code scrolls with you. like chatgpt
- [ ] make changelog page with tag that scroll when in view. https://volta.net/changelog


## Prose Components


- git highlgights, give spectrum of red with unique border or not?
  - give them correct box-shadow colors
  - update te colors inside it correctly according the the highlight were in, now it's standard red.
  - look at doc v1 colors for color combination inspirration
- [ ] Try it for a list with steps that connect to each other from number 1 to 2 with a line. On work laptop, we have a photo of this
  - [ ] Replace current table with old table from VitePress
- [ ] make a list of all used icons like i-ph:app-window and show it in a librar
- [ ] make mermaid.js work --> https://github.com/nuxt/content/issues/1866
- [ ] combi of https://www.juridischloket.nl/cookieverklaring/ and vue faq


## Config

- [ ] try to add a settings/config option. That certain behaviour can be enabled/disabled, like the hr below the h2. Catch my drift? - kinda like discord has
- [ ] Make it so you can adjust the way certain prose types behave, like the h2 with standard --- hr at the end of the - [ ] 
- [ ] make a config so when we use _## or ## h2 .{exclude}, that specific h2 doesnt render in the toc.

- [ ] Zoekn in winowds customizen, zodat everything weg kan? everytihg  indexeert o basis van files, windows o basis van content


## DOC

- [ ] Make a `instructions.nameless` where you explain how your app and files work
- [ ] Explain how your functions work (jsdoc)
- [ ] One line scalar/openAPI docs https://www.youtube.com/shorts/BKmnBXsGwkM
- [ ] add to thhe list by specifying when and why to use certai prose components <https://content.nuxt.com/components/prose>

## Automation

- [ ] Renovate https://github.com/renovatebot/tutorial
- [ ] CI pipeline
- [ ] automated changelog

## Nameless

- [ ] https://destcert.com/cissp-mindmaps/
- [ ] Update the threat landscape with security breaches. Add more types
- [ ] Rework methodologies like you had before.

## Features

- [ ] Integrate ChatGPT or create own gpt? free
- [ ] Translate language or i18?
- [ ] Setup ZeroTier [with login and such]
- [ ] Setup database like you did with Nameless HTTP server
- [x] Setup Volta and backlog/github
- [ ] Setup Nuxt Studio
- [ ] flashcard creation and question
- [ ] add community option for discussions
- [ ] cookieverklaring - https://www.juridischloket.nl/cookieverklaring/


## Special

- [ ] Make a [extension] in VS Code that lists all prose styling options?
- [ ] Create a ChatGPT [app] mode for IT, Doc Writing, & Email Writing
- [ ] Make a browser extension that captures important comments(and lets you organize them) Kinda like pocket
- [ ] create a nuxt module(dont know what to code yet tho)


## When finished

- [ ] create auto lessen website combi van theorie toppers mikey en altijdgeslaagd
- [ ] create baby webshop
- [ ] continue  own website
- [ ] create ai automation website for AI solutions like (lead automation and such)[like theaiclubhouse on IG]
- [ ] site idee: blockchain referendum waarin je met een niek account kan temmen op iddeen die wortden doorgevoerd. referendum
  
- [ ] create cube site -> questionable


- [ ] https://learn.microsoft.com/en-us/azure/architecture/solution-ideas/articles/azure-security-build-first-layer-defense zoom in on image like this website

## Finito

When finished turn thi

## malware
https://lolbas-project.github.io/#


## TODOTODO

SC-900
MD-102
RIJBWIJS
TCM & AD/AZURE ACADEMY

## te plaatsen

https://go.recordedfuture.com/the-intelligence-handbook-fourth-edition

## Windows PC storage

3 NVME's for top performance.

- Main OS
- Main Games
- Kali/Ubuntu

TerraMaster NAS F8 SSD Plus

- 4x 4TB NVME disks

QUBE NAS

-4 x 1TB Offline Storage

then run syncback pro for backup

## Pyenv

https://www.liquidweb.com/blog/how-to-install-pyenv-on-ubuntu-18-04/

## CISSP

- CBK CISSP
- Study guide CISSP
  
## Kubernetes

 Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

## Your Main Branch Is Not Protected

https://github.com/skkylimits/Nameless/settings/rules/new?target=branch&enforcement=disabled