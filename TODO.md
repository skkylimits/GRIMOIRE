# TODO

## Linting

- [ ] Markdown lint -> Integrate Prettier for CSS and markdown
- [ ] Make sure lint doesnt make nuxt unreadable

## Bug

- [ ] Title in slug is error. Disabled for now. Deep dive into OG & SEO.
- [x] Open PDF in Nuxt. ABN AMRO

## UI

- [ ] Breadcrumb (we already have a working one)
- [ ] Collapsed & Multiple feature
- [x] Turn circles to square
- [ ] Specify if you want TOC depth 1 or 2 per markdown page. Make it configurable
- [ ] Can't render the TOC in the Nuxt file
- [ ] Make own Shiki theme. Same theme for light and dark uses
- [ ] Fix clickable header. Currently, you can't use a link in a header, which can be frustrating (what-is-web.md <https://chatgpt.com/share/67c92a28-dec0-4f6e-8374-16ddf11507d4>)
  - [ ] [Nuxt] [NuxtLink] You can't nest one <a> inside another <a>. This will cause a hydration error on client-side. You can pass the custom prop to take full control of the markup.
- [x] Text between `` needs to get colored like the theme
- [x] Add a line (hr) under headings
- [ ] add a line above hr if it's not the first element below h1
- [ ] Customize from desktop to mobile switch in Tailwind config -> https://tailwindcss.com/docs/screens
- [x] RGB 32 33 36 // New black background? #202124 -> we're staying with zinc for now
- [ ] make copy code from codeblock scrollable. Meaning when you scroll down and code block hasnt ended the copy code scrolls with you. like chatgpt
- [ ] make changelog page with tag that scroll when in view. https://volta.net/changelog


## Prose Components

- [ ] Make a list of all UI components you use in markdown like:
  - [ ] # ## ### ####
  - [ ] >
  - [ ] ```terminal [terminal]
    echo "Nameless"
    ```
  - [ ] ::callout
    ---
    icon: i-heroicons-light-bulb
    target: _blank
    to: https://learn.microsoft.com/en-us/training/modules/describe-basic-cybersecurity-threats-attacks-mitigations/5-mitigation-strategies
    ---
    Learn more on [Microsoft Learn](https://learn.microsoft.com/)
    ::
  - [ ] ![Propagation Mechanism](/core-principles/propagation-mechanisms.png)
  - [ ] <video controls>
      <source src="/core-principles/encryption.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  - [ ] Collapsible
  - [ ] Alerts
  - [ ] Find out more useful types
  - [ ] Try it for a list with steps that connect to each other from number 1 to 2 with a line. On work laptop, we have a photo of this
  - [ ] Make the list, make the alert, warning, tip components, etc.
  - [ ] Make a clear differentiator of when to use the alert, the blockquote, or the link
  - [ ] Note like GitHub <https://github.com/renovatebot/renovate>
  - [ ] Replace current table with old table from VitePress
  - [ ] pdf ::callout
        ---
        icon: i-heroicons-light-bulb
        target: _blank
        to: digital-fortress/blue-team/cyber-response-plan.pdf
        ---
        Cyber Reponse Plan PDF by ABN AMRO
        ::

        <!-- <embed src="/digital-fortress/blue-team/cyber-response-plan.pdf" width="600" height="800" type="application/pdf"> -->


## DOC

- [ ] Make a `doc.nameless` where you explain how your app and files work
- [ ] Explain how your functions work (jsdoc)
- [ ] One line scalar/openAPI docs https://www.youtube.com/shorts/BKmnBXsGwkM
- [ ] And so on, make a list like <https://content.nuxt.com/components/prose>

## Automation

- [ ] Renovate https://github.com/renovatebot/tutorial

## Features

- [ ] Integrate ChatGPT or create own gpt? free
- [ ] Translate language or i18?
- [ ] Setup ZeroTier [with login and such]
- [ ] Setup database like you did with Nameless HTTP server
- [ ] Setup Volta and backlog/github - https://www.conventionalcommits.org/en/v1.0.0/#specification / https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- [ ] Setup Nuxt Studio
- [ ] flashcard creation and question

## Special

- [ ] Make a [extension] in VS Code that lists all prose styling options?
- [ ] Create a ChatGPT [app] mode for IT, Doc Writing, & Email Writing

## Config

- [ ] try to add a settings/config option. That certain behaviour can be enabled/disabled, like the hr below the h2. Catch my drift?
- [ ] Make it so you can adjust the way certain prose types behave, like the h2 with standard --- hr at the end of the block

## Nameless

- [ ] https://destcert.com/cissp-mindmaps/
- [ ] Update the threat landscape with security breaches. Add more types
- [ ] Rework methodologies like you had before.

## When finished

- [ ] create autoless website
- [ ] create baby webshop
- [ ] create cube site + lead automation
- [ ] create own website
