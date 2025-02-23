<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// const route = useRoute()
const { header } = useAppConfig()

const truncateDescription = (text: string, wordLimit = 6) => {
	if (!text) return ''
	const words = text.split(' ')
	return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text
}

const links = ref([
	{
		label: 'The Lab',
		// icon: 'i-mdi-test-tube',
		to: '/the-lab'
	},
	{
		label: 'Syntax',
		// icon: 'i-heroicons-code-bracket',
		active: false,
		description: truncateDescription('Explore and master different scripting languages for automation and development.'),
		children: [
			{ label: 'Morse', to: '/syntax/morse', icon: 'i-arcticons-morse', description: truncateDescription('For times when it\'s needed') },
			{ label: 'Terminal', to: '/syntax/bash', icon: 'i-heroicons-command-line', description: truncateDescription('Master Bash scripting for automating tasks in UNIX-based systems.') },
			{ label: 'JavaScript', to: '/syntax/javascript', icon: 'i-simple-icons-javascript', description: truncateDescription('Learn JavaScript to build dynamic web applications and automate web tasks.') },
			{ label: 'Python', to: '/syntax/python', icon: 'i-simple-icons-python', description: truncateDescription('Dive into Python scripting for a wide variety of applications.') },
			{ label: 'PHP', to: '/syntax/php', icon: 'i-devicon:php', description: truncateDescription('A popular general-purpose scripting language.') },
			{ label: 'SQL', to: '/syntax/sql', icon: 'i-simple-icons-postgresql', description: truncateDescription('Understand SQL to query and manage relational databases effectively.') },
			{ label: 'YAML', to: '/syntax/yaml', icon: 'i-file-icons:yaml-alt4', description: truncateDescription('A YAML header contains YAML arguments, such as “title”...') }
		]
	},
	{
		label: 'KITT',
		// icon: 'i-heroicons-wrench',
		description: truncateDescription('Tools and utilities for development, networking, and system administration.'),
		children: [
			{ label: 'AI', to: '/kitt/ai', icon: 'ix:ai', description: truncateDescription('Stay ahead of the curve and don\'t get left out.') },
			{ label: 'Git', to: '/kitt/git', icon: 'i-simple-icons-git', description: truncateDescription('A version control system to track changes in source code.') },
			{ label: 'proxychains4', to: '/kitt/proxychains4', icon: 'i-eos-icons:proxy-outlined', description: truncateDescription('A tool for routing traffic through multiple proxies for anonymity.') },
			{ label: 'Nmap', to: '/kitt/nmap', icon: 'file-icons:nmap', description: truncateDescription('A network scanning tool used to discover hosts, services.') },
			{ label: 'ZeroTier', to: '/kitt/zerotier', icon: 'i-simple-icons-zerotier', description: truncateDescription('Weave your own invisible, encrypted network through the digital chaos.') }
		]
	},
	{
		label: 'VulN',
		// icon: 'i-heroicons-shield-exclamation',
		description: truncateDescription('Identify and understand common vulnerabilities in software and systems.'),
		children: [
			{ label: 'XSS', to: '/vuln/xss', icon: 'i-heroicons-exclamation-circle', description: truncateDescription('Learn about Cross-Site Scripting (XSS) vulnerabilities and prevention.') },
			{ label: 'XRSF', to: '/vuln/xrsf', icon: 'i-heroicons-exclamation-circle', description: truncateDescription('Understand Cross-Site Request Forgery (XSRF) attacks and mitigation.') },
			{ label: 'CVE', to: '/vuln/cve', icon: 'i-heroicons-exclamation-triangle', description: truncateDescription('Explore Common Vulnerabilities and Exposures (CVE) to stay informed.') }
		]
	},
	{
		label: 'Xpl01ts',
		// icon: 'i-heroicons-bug-ant',
		description: truncateDescription('Dive into the world of exploits and understand how vulnerabilities are leveraged.'),
		children: [
			{ label: 'DoS', to: '/xpl01ts/dos', icon: 'mdi:cloud', description: truncateDescription('There are many types of DoS (Denial of Service) attacks.') },
			{ label: 'Zero-Day', to: '/xpl01ts/zero-day', icon: 'game-icons:skull-bolt', description: truncateDescription('Explore zero-day vulnerabilities and their exploitation before patches.') },
			{ label: 'Techniques', to: '/xpl01ts/techniques', icon: 'mingcute:vector-group-line', description: truncateDescription('Learn about common techniques used in penetration testing and cyber attacks.') }
		]
	},
	{
		label: 'Knowledge Base',
		// icon: 'i-raphael-book',
		description: truncateDescription('A comprehensive resource for learning about various technologies and concepts.'),
		children: [
			{ label: 'Digital Fortress', to: '/knowledge-base/digital-fortress', icon: 'i-game-icons-tower-fall', description: truncateDescription('Rise as the ultimate stronghold in the digital battlefield.') },
			{ label: 'Certifize', to: '/knowledge-base/proving-grounds', icon: 'i-heroicons-academic-cap', description: truncateDescription('Gain recognition and prove your worth.') },
			{ label: 'System Engineering', to: '/knowledge-base/system-engineering', icon: 'i-heroicons-cog', description: truncateDescription('Learn about system design, architecture, and integration.') },
			{ label: 'Networking', to: '/knowledge-base/networking', icon: 'i-heroicons-globe-alt', description: truncateDescription('Understand the principles of networking and communication.') },
			{ label: 'Virtualization', to: '/knowledge-base/virtualization', icon: 'i-heroicons-server', description: truncateDescription('Explore the concepts and technologies behind virtual environments.') },
			{ label: 'Operating Systems', to: '/knowledge-base/operating-systems', icon: 'i-heroicons-computer-desktop', description: truncateDescription('Delve into the fundamentals and inner workings of operating systems.') },
			{ label: 'System Administration', to: '/knowledge-base/system-administration', icon: 'i-heroicons-command-line', description: truncateDescription('Master the management and maintenance of computer systems and networks.') },
			{ label: 'Web Dev', icon: 'i-game-icons-spider-web', to: '/knowledge-base/web-dev', description: truncateDescription('The art and grit of web development—an endless race.') },
			{ label: 'OSINT', icon: 'i-el:opensource', to: '/knowledge-base/osint', description: truncateDescription('OSINT refers to the process of collecting and analyzing publicly available information.') },
			{ label: 'Cyber Crusades', icon: 'i-heroicons-bug-ant', to: '/knowledge-base/cyber-crusades', description: truncateDescription('The Cybercrusades represent a new era of digital warfare.') },
			{ label: 'The Pentest 101', to: '/knowledge-base/the-pentest-101', icon: 'i-heroicons-cube', description: truncateDescription('A guide to penetration testing, vulnerability analysis, and security strategies.') }
		]
	}
])

const active = ref()

defineShortcuts({
	1: () => {
		active.value = '0'
	},
	2: () => {
		active.value = '1'
	},
	3: () => {
		active.value = '2'
	},
	4: () => {
		active.value = '3'
	},
	5: () => {
		active.value = '4'
	},
	6: () => {
		active.value = '5'
	}
})
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1' }"
		:to="header?.to || '/'"
	>
		<UNavigationMenu
			v-model="active"
			:items="links"
			class="w-full justify-center text-black dark:text-white"
			highlight
			highlight-color="primary"
			content-orientation="vertical"
		/>

		<template
			#left
		>
			<NuxtLink
				:to="header?.to || '/'"
				class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
				aria-label="Nameless"
			>
				Nameless
				<UBadge
					label="Docs"
					variant="subtle"
				/>
				<!-- <MainLogo class="w-auto h-6 shrink-0" /> -->
			</NuxtLink>

			<!-- <TemplateMenu /> -->
		</template>

		<template #right>
			<UContentSearchButton
				v-if="header?.search"
				:label="undefined"
			/>
			<UColorModeButton v-if="header?.colorMode" />
			<template v-if="header?.links">
				<UButton
					v-for="(link, index) of header.links"
					:key="index"
					v-bind="{ color: 'gray', variant: 'ghost', ...link }"
				/>
			</template>
		</template>

		<template #body>
			<UContentNavigation
				highlight
				:navigation="navigation"
			/>
		</template>
	</UHeader>
</template>
