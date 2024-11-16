# TODO

## Linting

- [ ] Markdown lint -> Integrate antufu/eslint for css & markdown
- [ ] Make sure lint doesnt make nuxt unreadable

## Bug

- [ ] Title in slug is error. Disabled for now. Deep dive into OG & SEO.
- [x] Open PDF in Nuxt. ABN AMRO

## UI

- [ ] Breadcrumb (we already have a working one)
- [ ] Collapsed & Multiple feature (work in progress -> created branch)
- [x] Turn circles to square
- [x] Specify if you want TOC depth 1 or 2 per markdown page. Make it configurable
- [x] Can't render the TOC in the Nuxt file
- [ ] Fix clickable header. Currently, you can't use a link in a header, which can be frustrating (what-is-web.md <https://chatgpt.com/share/67c92a28-dec0-4f6e-8374-16ddf11507d4>)
  - [ ] [Nuxt] [NuxtLink] You can't nest one <a> inside another <a>. This will cause a hydration error on client-side. You can pass the custom prop to take full control of the markup.
- [x] Text between `` needs to get colored like the theme
- [x] Add a line (hr) under headings
- [x] add a line above hr if it's not the first element below h1
  - [ ] feat: Add conditional rendering logic for <hr> above <h2> elements
- [x] Customize from desktop to mobile switch in Tailwind config -> https://tailwindcss.com/docs/screens
- [x] RGB 32 33 36 // New black background? #202124 -> we're staying with zinc for now
- [x] make header active based on wheter or not we're in that directory active: true in app header links is a good first step
- [x] mobile menu fix links with no children direct link
  - [ ] now customize the according to handle the logic instead of usink navLink & accordion. this is not modifyable how it is now

- [ ] Make own Shiki theme. Same theme for light and dark uses
- [ ] make copy code from codeblock scrollable. Meaning when you scroll down and code block hasnt ended the copy code scrolls with you. like chatgpt
- [ ] make changelog page with tag that scroll when in view. https://volta.net/changelog


## Prose Components

- [x] Make a list of all UI components you use in markdown like:
  - [x] # ## ### ####
  - [x] >
  - [x] ```terminal [terminal]
    echo "Nameless"
    ```
  - [x] ::callout [used for linking websites or articles etc]
    ---
    icon: i-heroicons-light-bulb
    target: _blank
    to: https://learn.microsoft.com/en-us/training/modules/describe-basic-cybersecurity-threats-attacks-mitigations/5-mitigation-strategies
    ---
    Learn more on [Microsoft Learn](https://learn.microsoft.com/)
    ::
  - [x] ![Propagation Mechanism](/core-principles/propagation-mechanisms.png)
  - [x] <video controls>
      <source src="/core-principles/encryption.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    - [x] pdf ::callout
      ---
      icon: i-heroicons-light-bulb
      target: _blank
      to: digital-fortress/blue-team/cyber-response-plan.pdf
      ---
      Cyber Reponse Plan PDF by ABN AMRO
      ::

      <!-- <embed src="/digital-fortress/blue-team/cyber-response-plan.pdf" width="600" height="800" type="application/pdf"> -->
  - [x] foldable
    - [ ] change colors  black and white of foldable
  - [ ] GIT Alerts (give it variaty of border and background int he spectrum of red color insteaf of diffrerent colors to adhere to the websitye theme)
  - [ ] Try it for a list with steps that connect to each other from number 1 to 2 with a line. On work laptop, we have a photo of this
  - [ ] Make a clear differentiator of when to use the alert, the blockquote, or the link
  - [ ] Replace current table with old table from VitePress
- [ ] make a list of all used icons like i-ph:app-window and show it in a library
- [ ] make a config so when we use _## or ## h2 .{exclude}, that specific h2 doesnt render in the toc.

## Config

- [ ] try to add a settings/config option. That certain behaviour can be enabled/disabled, like the hr below the h2. Catch my drift? - kinda like discord has
- [ ] Make it so you can adjust the way certain prose types behave, like the h2 with standard --- hr at the end of the block


## DOC

- [ ] Make a `instructions.nameless` where you explain how your app and files work
- [ ] Explain how your functions work (jsdoc)
- [ ] One line scalar/openAPI docs https://www.youtube.com/shorts/BKmnBXsGwkM
- [ ] And so on, make a list like <https://content.nuxt.com/components/prose>

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


## Special

- [ ] Make a [extension] in VS Code that lists all prose styling options?
- [ ] Create a ChatGPT [app] mode for IT, Doc Writing, & Email Writing
- [ ] Make a browser extension that captures important comments(and lets you organize them) Kinda like pocket
- [ ] create a nuxt module(dont know what to code yet tho)


## When finished

- [ ] create auto lessen website combi van theorie toppers mikey en altijdgeslaagd
- [ ] create baby webshop
- [ ] create cube site 
- [ ] continue  own website
- [ ] create ai automation website for AI solutions like (lead automation and such)[like theaiclubhouse on IG]


- [ ] https://learn.microsoft.com/en-us/azure/architecture/solution-ideas/articles/azure-security-build-first-layer-defense zoom in on image like this website