<script setup lang="ts">
// import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
// const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { header } = useAppConfig()

/**
 * Truncates a given description to a specified word limit and appends "..." if the text exceeds the limit.
 *
 * @param {string} text - The text description to truncate. If the text is empty or falsy, an empty string is returned.
 * @param {number} [wordLimit] - The maximum number of words to retain from the input text. Defaults to 6 if not provided.
 * @returns {string} A truncated version of the input text if the word limit is exceeded, otherwise the original text.
 */
function truncateDescription(text: string, wordLimit = 6) {
	if (!text)
		return ''
	const words = text.split(' ')
	return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : text
}

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: 'The Lab',
		// icon: 'i-mdi-test-tube',
		to: '/the-lab',
		active: route.path.startsWith('/the-lab'),
		defaultOpen: true,
	},
	{
		label: 'Syntax',
		// icon: 'i-heroicons-code-bracket',
		active: route.path.startsWith('/syntax'),
		defaultOpen: true,
		description: truncateDescription('Explore and master different scripting languages for automation and development.'),
		children: [
			{ label: 'Morse', to: '/syntax/morse', icon: 'i-arcticons-morse', description: truncateDescription('For times when it\'s needed') },
			{ label: 'Binary', to: '/syntax/binary', icon: 'i-vscode-icons:file-type-binary', description: truncateDescription('Explore raw binary data — the language of machines, where every bit and byte reveals how systems truly operate.') },
			{ label: 'Shellcode', to: '/syntax/shellcode', icon: 'i-game-icons:armoured-shell', description: truncateDescription('Small, position-independent machine-code snippets — intended for testing and reverse-engineering. Use safely and responsibly') },
			{ label: 'C', to: '/syntax/c', icon: 'i-material-symbols:memory-sharp', description: truncateDescription('Dive into C — the foundation of modern systems programming, offering direct memory control and unmatched performance.') },
			{ label: 'Terminal', to: '/syntax/terminal', icon: 'i-heroicons-command-line', description: truncateDescription('Master Bash scripting for automating tasks in UNIX-based systems.') },
			{ label: 'PowerShell', to: '/syntax/powershell', icon: 'i-vscode-icons:file-type-powershell-psd2', description: truncateDescription('Learn PowerShell to automate system tasks, manage configurations, and streamline administrative workflows.') },
			{ label: 'Python', to: '/syntax/python', icon: 'i-logos:python', description: truncateDescription('Dive into Python scripting for a wide variety of applications.') },
			{ label: 'JavaScript', to: '/syntax/javascript', icon: 'i-logos:javascript', description: truncateDescription('Learn JavaScript to build dynamic web applications and automate web tasks.') },
			{ label: 'PHP', to: '/syntax/php', icon: 'i-devicon:php', description: truncateDescription('A popular general-purpose scripting language.') },
			{ label: 'SQL', to: '/syntax/sql', icon: 'i-devicon:postgresql', description: truncateDescription('Understand SQL to query and manage relational databases effectively.') },
			{ label: 'YAML', to: '/syntax/yaml', icon: 'i-devicon:yaml', description: truncateDescription('A YAML header contains YAML arguments, such as “title”...') },
			// { label: 'Math', to: '/syntax/math', icon: 'tabler:math', description: truncateDescription('Common mathmathical concepts explained...') },
		],
	},
	{
		label: 'KITT',
		// icon: 'i-heroicons-wrench',
		active: route.path.startsWith('/kitt'),
		description: truncateDescription('Tools and utilities for development, networking, and system administration.'),
		children: [
			{ label: 'AI', to: '/kitt/ai', icon: 'ix:ai', description: truncateDescription('Stay ahead of the curve and don\'t get left out.') },
			{ label: 'Git', to: '/kitt/git', icon: 'i-simple-icons-git', description: truncateDescription('A version control system to track changes in source code.') },
			{ label: 'proxychains4', to: '/kitt/proxychains4', icon: 'i-eos-icons:proxy-outlined', description: truncateDescription('A tool for routing traffic through multiple proxies for anonymity.') },
			{ label: 'Nmap', to: '/kitt/nmap', icon: 'file-icons:nmap', description: truncateDescription('A network scanning tool used to discover hosts, services.') },
			{ label: 'Ncat', to: '/kitt/ncat', icon: 'system-uicons:reverse-alt', description: truncateDescription('Ncat is a feature-packed networking utility which reads and writes data across networks from the command line.') },
			{ label: 'Wireshark', to: '/kitt/wireshark', icon: 'simple-icons:wireshark', description: truncateDescription('Wireshark lets you dive deep into your network traffic') },
			{ label: 'Burpsuite', to: '/kitt/burpsuite', icon: 'simple-icons:burpsuite', description: truncateDescription('Bursuite: Unlock Every Door, Exploit Every Gap.') },
			{ label: 'Docker', to: '/kitt/docker', icon: 'i-vscode-icons-file-type-dockertest', description: truncateDescription('Dockerize your life...') },
			{ label: 'ZeroTier', to: '/kitt/zerotier', icon: 'i-simple-icons-zerotier', description: truncateDescription('Weave your own invisible, encrypted network through the digital chaos.') },
			{ label: 'RDP', to: '/kitt/rdp', icon: 'i-fluent:remote-16-filled', description: truncateDescription('Remote Desktop Protocol (RDP) allows users to remotely access and control another computer’s desktop over a network.') },
		],
	},
	{
		label: 'VulN',
		// icon: 'i-heroicons-shield-exclamation',
		active: route.path.startsWith('/vuln'),
		description: truncateDescription('Identify and understand common vulnerabilities in software and systems.'),
		children: [
			{ label: 'XSS', to: '/vuln/xss', icon: 'i-heroicons-exclamation-circle', description: truncateDescription('Learn about Cross-Site Scripting (XSS) vulnerabilities and prevention.') },
			{ label: 'XRSF', to: '/vuln/xrsf', icon: 'i-heroicons-exclamation-circle', description: truncateDescription('Understand Cross-Site Request Forgery (XSRF) attacks and mitigation.') },
			{ label: 'CVE', to: '/vuln/cve', icon: 'i-heroicons-exclamation-triangle', description: truncateDescription('Explore Common Vulnerabilities and Exposures (CVE) to stay informed.') },
		],
	},
	{
		label: 'Xpl01ts',
		// icon: 'i-heroicons-bug-ant',
		active: route.path.startsWith('/xpl01ts'),
		description: truncateDescription('Dive into the world of exploits and understand how vulnerabilities are leveraged.'),
		children: [
			{ label: 'DoS', to: '/xpl01ts/dos', icon: 'mdi:cloud', description: truncateDescription('There are many types of DoS (Denial of Service) attacks.') },
			{ label: 'Zero-Day', to: '/xpl01ts/zero-day', icon: 'game-icons:skull-bolt', description: truncateDescription('Explore zero-day vulnerabilities and their exploitation before patches.') },
			{ label: 'Techniques', to: '/xpl01ts/techniques', icon: 'mingcute:vector-group-line', description: truncateDescription('Learn about common techniques used in penetration testing and cyber attacks.') },
		],
	},
	{
		label: 'Knowledge Base',
		// icon: 'i-raphael-book',
		active: route.path.startsWith('/knowledge-base'),
		description: truncateDescription('A comprehensive resource for learning about various technologies and concepts.'),
		children: [
			{ label: 'System Engineering', to: '/knowledge-base/system-engineering', icon: 'i-heroicons-cog', description: truncateDescription('Learn about system design, architecture, and integration.') },
			{ label: 'Networking', to: '/knowledge-base/networking', icon: 'i-heroicons-globe-alt', description: truncateDescription('Understand the principles of networking and communication.') },
			{ label: 'Virtualization', to: '/knowledge-base/virtualization', icon: 'i-heroicons-server', description: truncateDescription('Explore the concepts and technologies behind virtual environments.') },
			{ label: 'Operating Systems', to: '/knowledge-base/operating-systems', icon: 'i-heroicons-computer-desktop', description: truncateDescription('Delve into the fundamentals and inner workings of operating systems.') },
			// { label: 'System Administration', to: '/knowledge-base/system-administration', icon: 'i-heroicons-command-line', description: truncateDescription('Master the management and maintenance of computer systems and networks.') },
			{ label: 'Web', icon: 'i-game-icons-spider-web', to: '/knowledge-base/web', description: truncateDescription('The art and grit of web development—an endless race.') },
			{ label: 'Malware', icon: 'i-oui:bug', to: '/knowledge-base/malware', description: truncateDescription('Forge your tools. Create malware that walks undetected. Break telemetry. Trick the watchers.') },
			// { label: 'NullByte', icon: 'simple-icons:malwarebytes', to: '/knowledge-base/nullbyte', description: truncateDescription('Unseen by firewalls, unheard by logs. A phantom in the machine.') },
			// { label: 'Dead Silence', icon: 'game-icons:virus', to: '/knowledge-base/dead-silence', description: truncateDescription('Forge your tools. Create malware that walks undetected. Break telemetry. Trick the watchers.') },
			{ label: 'OPSEC', icon: 'picon:ninja', to: '/knowledge-base/opsec', description: truncateDescription('Learn how to hide yourself, clean up traces, and vanish before ever being seen..') },
			{ label: 'OSINT', icon: 'i-el:opensource', to: '/knowledge-base/osint', description: truncateDescription('OSINT refers to the process of collecting and analyzing publicly available information.') },
			{ label: 'Cyber Crusades', icon: 'i-heroicons-bug-ant', to: '/knowledge-base/cyber-crusades', description: truncateDescription('The Cybercrusades represent a new era of digital warfare.') },
			// { label: 'The Pentest 101', to: '/knowledge-base/the-pentest-101', icon: 'i-heroicons-cube', description: truncateDescription('A guide to penetration testing, vulnerability analysis, and security strategies.') },
		],
	},
])

const active = ref()
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1' }"
		:to="header?.to || '/'"
		class="z-99"
	>
		<UNavigationMenu
			v-model="active"
			:items="links"
			class="w-full justify-center text-black dark:text-white"
			highlight
			highlight-color="error"
			content-orientation="vertical"
		/>
		<template
			v-if="header?.logo?.dark || header?.logo?.light || header?.title"
			#title
		>
			<UColorModeImage
				v-if="header?.logo?.dark || header?.logo?.light"
				:light="header?.logo?.light!"
				:dark="header?.logo?.dark!"
				:alt="header?.logo?.alt"
				class="h-6 w-auto shrink-0"
			/>

			<span v-else-if="header?.title">
				{{ header.title }}
			</span>
		</template>

		<template
			v-else
			#left
		>
			<NuxtLink
				:to="header?.to || '/'"
				class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2"
				aria-label="Grimoire"
			>
				<img src="/logo.png" alt="Logo" class="h-12 w-auto border-0 !border-none">

				Grimoire
				<UBadge
					label="Docs"
					variant="subtle"
				/>
			</NuxtLink>

			<!-- <TemplateMenu /> -->
		</template>

		<template #right>
			<UContentSearchButton
				v-if="header?.search"
			/>

			<UColorModeButton v-if="header?.colorMode" />

			<template v-if="header?.links">
				<UButton
					v-for="(link, index) of header.links"
					:key="index"
					v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
				/>
			</template>
		</template>

		<template #body>
			<!-- <UContentNavigation
				default-open
				type="single"
				highlight
				:navigation="navigation"
			/> -->
		</template>
	</UHeader>
</template>
