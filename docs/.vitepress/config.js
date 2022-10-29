export default {
    base: '/',
    lang: 'en-US',
    title: 'Shadow Lab',
    description: 'Just playing around.',
    themeConfig: {
        nav: [
            { text: 'The Lab', link: '/lab/' },
            {
                text: 'Knowledge Base',
                items: [
                    { text: 'ISTQB', link: '/istqb/' },
                    { text: 'CISSP', link: '/cisp/' },
                    { text: 'CNWPP', link: '/cnwp/' },
                    { text: 'Networking', link: '/networking/' },
                    { text: 'System Administration', link: '/sysadmin/' },
                    { text: 'Operating Systems', link: '/os/' },
                    { text: 'The Pentest 101', link: '/thepentest101/' },
                ]
            }
        ],
        sidebar: {
            '/lab/': [
                {
                    text: 'The Lab',
                    collapsible: true,
                    items: [
                        { text: 'Bare Metal', link: '/lab/bare-metal' },
                        { text: 'Virtual Machine', link: '/lab/virtual-machine' },
                        { text: 'Hyperviser', link: '/lab/hypervisor' },
                        { text: 'Docker', link: '/lab/docker' },
                    ]
                },
                {
                    text: 'Security',
                    collapsible: true,
                    items: [
                        { text: 'CIA triad', link: '/lab/security/cia-triad' },
                        { text: 'Cyber kill chain', link: '/lab/security/cyber-kill-chain' },
                        { text: 'Hacking modus operandi', link: '/lab/security/hacking-modus-operandi' },
                        { text: 'PTES', link: '/lab/security/ptes' },
                    ]
                }
            ],
            // This sidebar gets displayed when user is
            // under `istqb` directory.
            '/istqb/': [
                {
                    text: 'ISTQB',
                    items: [
                        // This shows `/istqb/index.md` page.
                        { text: 'Index', link: '/istqb/' }, // /istqb/index.md
                        { text: 'One', link: '/istqb/One' } // /istqb/four.md
                    ]
                }
            ],
            '/cisp/': [
                {
                    text: 'CISP',
                    items: [
                        { text: 'Index', link: '/cisp/' },
                    ]
                }
            ],
            '/cnwp/': [
                {
                    text: 'CNWP',
                    items: [
                        { text: 'Index', link: '/cnwp/' },
                    ]
                }
            ],
            '/sysadmin/': [
                {
                    text: 'System Administration',
                    items: [
                        { text: 'Index', link: '/sysadmin/' },
                    ]
                }
            ],
            '/networking/': [
                {
                    text: 'Networking',
                    items: [
                        { text: 'Index', link: '/networking/' },
                    ]
                }
            ],
            '/os/': [
                {
                    text: 'Operating Systems',
                    items: [
                        { text: 'Index', link: '/os/' },
                    ]
                }
            ],
            '/thepentest101/': [
                {
                    text: '1. What a pentest is',
                    collapsible: true,
                    items: [
                        { text: 'Defining what a pentest is', link: '/thepentest101/what-is-a-pentest/defining-what-a-pentest-is.md' },
                        { text: 'Defining the types of pentest', link: '/thepentest101/what-is-a-pentest/defining-the-types-of-pentest' },
                        { text: 'Defining the deliverables', link: '/thepentest101/what-is-a-pentest/defining-the-deliverables' },
                    ]
                },
                {
                    text: '2. The deliverables of pentesting',
                    collapsible: true,
                    items: [
                        { text: 'CIA triad', link: '/lab/security/cia-triad' },
                        { text: 'Cyber kill chain', link: '/lab/security/cyber-kill-chain' },
                        { text: 'Hacking modus operandi', link: '/lab/security/hacking-modus-operandi' },
                        { text: 'PTES', link: '/lab/security/ptes' },
                    ]
                },
                {
                    text: '3. Test plan',
                    collapsible: true,
                    items: [
                        { text: 'CIA triad', link: '/lab/security/cia-triad' },
                        { text: 'Cyber kill chain', link: '/lab/security/cyber-kill-chain' },
                        { text: 'Hacking modus operandi', link: '/lab/security/hacking-modus-operandi' },
                        { text: 'PTES', link: '/lab/security/ptes' },
                    ]
                },
                {
                    text: '4. Test Report',
                    collapsible: true,
                    items: [
                        { text: 'CIA triad', link: '/lab/security/cia-triad' },
                        { text: 'Cyber kill chain', link: '/lab/security/cyber-kill-chain' },
                        { text: 'Hacking modus operandi', link: '/lab/security/hacking-modus-operandi' },
                        { text: 'PTES', link: '/lab/security/ptes' },
                    ]
                },
                {
                    text: '5. Extra',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        { text: 'CIA triad', link: '/lab/security/cia-triad' },
                        { text: 'Cyber kill chain', link: '/lab/security/cyber-kill-chain' },
                        { text: 'Hacking modus operandi', link: '/lab/security/hacking-modus-operandi' },
                        { text: 'PTES', link: '/lab/security/ptes' },
                    ]
                },
            ]
        }
    },
    markdown: {
        theme: 'material-palenight',
        lineNumbers: true
    }
}
