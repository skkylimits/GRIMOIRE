# Nuxt Docs Template

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Use this template to build your own documentation with [Nuxt UI](https://ui.nuxt.com) quickly.

- [Live demo](https://docs-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation)

<a href="https://docs-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/docs-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/docs-light.png">
    <img alt="Nuxt Docs Template" src="https://ui.nuxt.com/assets/templates/nuxt/docs-light.png">
  </picture>
</a>

## Quick Start

```bash [Terminal]
npm create nuxt@latest -- -t github:nuxt-ui-templates/docs
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=docs&repository-url=https%3A%2F%2Fgithub.com%2Fnuxt-ui-templates%2Fdocs&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Fdocs-dark.png&demo-url=https%3A%2F%2Fdocs-template.nuxt.dev%2F&demo-title=Nuxt%20Docs%20Template&demo-description=A%20documentation%20template%20powered%20by%20Nuxt%20Content.)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

## Kill port 3000

```bash
sudo lsof -ti:3000 | xargs kill -9
```

## Act

Install

```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash -s -- -b /usr/local/bin latest
```

Controleer of je workflow wordt herkend en list job names

```bash
act -l
```

Run je workflow

```bash
act push -j [JOB ID]
```

```bash
act push -j [JOB ID] -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

`exec bash `→ "ik trek een nieuw jasje aan, maar ik heb nog steeds dezelfde ID-kaart"
`newgrp docker` → "ik krijg een nieuwe ID-kaart waarop de nieuwe groepsrechten staan"

## Purge repo

pnpm store prune
rm -rf .nuxt .output .data dist

## CI/Staging/Preview/Performance

💾 **Prompt om later dit gesprek of deze setup terug te halen**

> 🧠 “Ik had eerder met je gewerkt aan een Nuxt project waar we een performance CI workflow hadden met GitHub Actions, Vercel en build-time metrics (dev/build/preview). Kun je me opnieuw uitleggen hoe professionele teams dat meestal aanpakken — inclusief:
>
> - hoe ze feature branches zoals `v4` gebruiken voor performance experiments,
> - wanneer ze mergen naar `main` of `dev`,
> - hoe performance thresholds in CI werken,
> - en hoe staging / preview omgevingen worden ingericht?
>
> Geef me daarbij ook de best practices voor het taggen, labelen en automatisch deployen als een PR de checks haalt.”

---

## AUTH_SECRET genereren

openssl rand -hex 32

## Dashboarding (post optimilization)

- build metrics
- RBAC control

## Yahki

https://www.youtube.com/shorts/ntoa3D8hDLg

## Metasploit

sudo apt update
sudo apt install -y metasploit-framework

# start postgres

sudo service postgresql start
sudo msfdb init
msfconsole

## Snowboarding

https://www.alibaba.com/product-detail/SNOW-MONKEY-Trampoline-Training-Board-Snowboard_1600424003408.html?mark=google_shopping&src=sem_ggl&field=UG&from=sem_ggl&cmpgn=22672003673&adgrp=&fditm=&tgt=&locintrst=&locphyscl=9196872&mtchtyp=&ntwrk=x&device=c&dvcmdl=&creative=&plcmnt=&plcmntcat=&aceid=&position=&gad_source=1&gad_campaignid=22672002413&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mYJgK5-rGwKkD0l3zQTSnZZLNRtyHiKm0Wd3qqMYib3yi3LBAhtxxxoCjRkQAvD_BwE
