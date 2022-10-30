export default {
    base: '/',
    lang: 'en-US',
    title: 'Shadow Lab',
    description: 'Just playing around.',
    themeConfig: {
        nav: [
            { text: 'The Lab', link: '/lab/' },
            { text: 'Methodologies', link: '/methodologies/' },
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
            '/methodologies/': [
                {
                    text: 'PTES',
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
                    text: '1. The pentest',
                    collapsible: true,
                    items: [
                        { text: 'The penetration test', link: '/thepentest101/the-pentest/the-penetration-test' },
                        { text: 'Types of pentest', link: '/thepentest101/the-pentest/types-of-pentest' },
                        { text: 'The deliverables', link: '/thepentest101/the-pentest/the-deliverables' },
                    ]
                },
                {
                    text: '2. The deliverables',
                    collapsible: true,
                    items: [
                        { text: 'Defining the deliverables', link: '/thepentest101/the-deliverables/defining-the-deliverables' },
                        { text: 'NDA', link: '/thepentest101/the-deliverables/NDA' },
                        { text: 'Contract template', link: '/thepentest101/the-deliverables/contract-template' },
                        { text: 'Bug template', link: '/thepentest101/the-deliverables/bug-template' },
                    ]
                },
                {
                    text: '3. The test plan',
                    collapsible: true,
                    items: [
                        { text: 'The testing plan', link: '/thepentest101/the-test-plan/the-testing-plan' },
                        { text: 'Test plan template', link: '/thepentest101/the-test-plan/test-plan-template' },
                    ]
                },
                {
                    text: '4. The test Report',
                    collapsible: true,
                    items: [
                        { text: 'The test report', link: '/thepentest101/the-test-report/the-test-report' },
                        { text: 'Test report template', link: '/thepentest101/the-test-report/test-report-template' },
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
