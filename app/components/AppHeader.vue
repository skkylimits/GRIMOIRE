<script setup lang="ts">
// import type { NavItem } from '@nuxt/content'

// const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()

const links = [
  {
    label: 'The Lab',
    icon: 'i-heroicons-book-open',
    to: '/the-lab',
    description: 'A space for experimentation and hands-on learning with various technologies.'
  },
  {
    label: 'Syntax',
    icon: 'i-heroicons-code-bracket',
    description: 'Explore and master different scripting languages for automation and development.',
    children: [
      {
        label: 'Terminal',
        to: '/syntax/bash',
        icon: 'i-heroicons-command-line',
        description: 'Master Bash scripting for automating tasks in UNIX-based systems.'
      },
      {
        label: 'JavaScript',
        to: '/syntax/javascript',
        icon: 'i-simple-icons-javascript',
        description: 'Learn JavaScript to build dynamic web applications and automate web tasks.'
      },
      {
        label: 'Python',
        to: '/syntax/python',
        icon: 'i-simple-icons-python',
        description: 'Dive into Python scripting for a wide variety of applications, from automation to AI.'
      },
      {
        label: 'SQL',
        to: '/syntax/sql',
        icon: 'i-simple-icons-postgresql',
        description: 'Understand SQL to query and manage relational databases effectively.'
      }
    ]
  },
  {
    label: 'KITT', // Key Interface and Technical Tools
    icon: 'i-heroicons-wrench',
    description: 'Tools and utilities for development, networking, and system administration.',
    children: [
      {
        label: 'Git',
        to: '/kitt/git',
        icon: 'i-simple-icons-git',
        description: 'A version control system to track changes in source code during software development.'
      },
      {
        label: 'Nmap',
        to: '/kitt/nmap',
        icon: 'file-icons:nmap',
        description: 'A network scanning tool used to discover hosts, services, and vulnerabilities in a network.'
      },
      {
        label: 'ZeroTier',
        to: '/kitt/zerotier',
        icon: 'i-simple-icons-zerotier',
        description: 'Weave your own invisible, encrypted network through the digital chaos—connect anything, anywhere, in a world beyond firewalls.'
      }
    ]
  },
  {
    label: 'VulN',
    icon: 'i-heroicons-shield-exclamation',
    description: 'Identify and understand common vulnerabilities in software and systems.',
    children: [
      {
        label: 'XSS',
        to: '/vuln/xss',
        icon: 'i-heroicons-exclamation-circle',
        description: 'Learn about Cross-Site Scripting (XSS) vulnerabilities and how to prevent them.'
      },
      {
        label: 'XRSF',
        to: '/vuln/xrsf',
        icon: 'i-heroicons-exclamation-circle',
        description: 'Understand Cross-Site Request Forgery (XSRF) attacks and mitigation strategies.'
      },
      {
        label: 'CVE',
        to: '/vuln/cve',
        icon: 'i-heroicons-exclamation-triangle',
        description: 'Explore Common Vulnerabilities and Exposures (CVE) to stay informed about security threats.'
      }
    ]
  },
  {
    label: 'Xpl01ts',
    icon: 'i-heroicons-bug-ant',
    description: 'Dive into the world of exploits and understand how vulnerabilities are leveraged in attacks.',
    children: [
      {
        label: 'DoS',
        to: '/xpl01ts/dos',
        icon: 'mdi:cloud',
        description: 'There are many types of DoS (Denial of Service) attacks.'
      },
      {
        label: 'Zero-Day',
        to: '/xpl01ts/zero-day',
        icon: 'game-icons:skull-bolt',
        description: 'Explore zero-day vulnerabilities and their exploitation before patches are available.'
      }
    ]
  },
  {
    label: 'Knowledge Base',
    description: 'A comprehensive resource for learning about various technologies and concepts.',
    children: [
      {
        label: 'Digital Fortress',
        to: '/knowledge-base/digital-fortress',
        icon: 'i-game-icons-tower-fall',
        description: 'Rise as the ultimate stronghold in the digital battlefield, where cutting-edge warfare tactics are honed to perfection'
      },
      {
        label: 'Certifize',
        to: '/knowledge-base/proving-grounds',
        icon: 'i-heroicons-academic-cap',
        description: 'Gain recognition and prove your worth, it\'s not about the cert but about so much more.'
      },
      {
        label: 'System Engineering',
        to: '/knowledge-base/system-engineering',
        icon: 'i-heroicons-cog',
        description: 'Learn about system design, architecture, and integration.'
      },
      {
        label: 'Networking',
        to: '/knowledge-base/networking',
        icon: 'i-heroicons-globe-alt',
        description: 'Understand the principles of networking and communication.'
      },
      {
        label: 'Virtualization',
        to: '/knowledge-base/virtualization',
        icon: 'i-heroicons-server',
        description: 'Explore the concepts and technologies behind virtual environments.'
      },
      {
        label: 'Operating Systems',
        to: '/knowledge-base/operating-systems',
        icon: 'i-heroicons-computer-desktop',
        description: 'Delve into the fundamentals and inner workings of operating systems.'
      },
      {
        label: 'System Administration',
        to: '/knowledge-base/system-administration',
        icon: 'i-heroicons-command-line',
        description: 'Master the management and maintenance of computer systems and networks.'
      },
      {
        label: 'Cyber Crusades',
        icon: 'i-heroicons-bug-ant',
        to: '/knowledge-base/cyber-crusades',
        description: 'The Cybercrusades represent a new era of digital warfare.'
      },
      {
        label: 'The Pentest 101',
        to: '/knowledge-base/the-pentest-101',
        icon: 'i-heroicons-cube',
        description: 'A guide to penetration testing, vulnerability analysis, and security strategies.'
      }
    ]
  }
]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <template v-if="header?.logo?.dark || header?.logo?.light">
        <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      </template>
      <template v-else>
        Nameless
        <UBadge label="Docs" variant="subtle" class="mb-0.5" />
      </template>
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" :label="null" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton v-for="(link, index) of header.links" :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }" />
      </template>
    </template>

    <template #panel>
      <!-- <UAsideLinks :links="links" /> -->
      <UNavigationAccordion :links="links" />
      <!-- <UNavigationTree :links="mapContentNavigation(navigation)" /> -->
    </template>
  </UHeader>
</template>
