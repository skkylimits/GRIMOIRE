export default {
  base: '/',
  lang: 'en-US',
  title: 'Nameless',
  description: 'Just playing around.',
  themeConfig: {
    nav: [
      { text: 'The Lab', link: '/the-lab/' },
      { text: 'Methodologies ', link: '/methodologies/' },
      {
        text: 'Scripting',
        items: [
          { text: 'bash', link: '/scripting/bash/' },
          { text: 'JavaScript', link: '/scripting/javascript/' },
          { text: 'python', link: '/scripting/python/' },
          { text: 'SQL', link: '/scripting/sql/' },
        ],
      },
      {
        text: 'Instruments',
        items: [
          { text: 'git', link: '/instruments/git/' },
          { text: 'nmap', link: '/instruments/nmap/' },
        ],
      },
      {
        text: 'Vulnerabilities',
        items: [
          { text: 'XSS', link: '/vulnerabilities/xss/' },
          { text: 'CRSF', link: '/vulnerabilities/csrf/' },
        ],
      },
      {
        text: 'Exploits',
        items: [
          { text: 'DDoS', link: '/exploits/ddos/' },
        ],
      },
      {
        text: 'Knowledge Base',
        items: [
          { text: 'ISTQB', link: '/knowledge-base/istqb/' },
          { text: 'CISSP', link: '/knowledge-base/cissp/' },
          { text: 'CNWPP', link: '/knowledge-base/cnwpp/' },
          { text: 'Networking', link: '/knowledge-base/networking/' },
          { text: 'System Administration', link: '/knowledge-base/sysadmin/' },
          { text: 'Operating Systems', link: '/knowledge-base/os/' },
          { text: 'Cyber Crusades', link: '/knowledge-base/cyber-crusades/' },
          { text: 'The Pentest 101', link: '/knowledge-base/thepentest101/' },
        ],
      },
    ],
    sidebar: {
      // the lab
      '/the-lab/': [
        {
          text: 'The Lab',
          collapsible: true,
          items: [
            { text: 'Bare Metal', link: '/the-lab/the-lab/bare-metal' },
            { text: 'Virtual Machines', link: '/the-lab/the-lab/virtual-machines' },
            { text: 'Hypervisor', link: '/the-lab/the-lab/hypervisor' },
            { text: 'Docker', link: '/the-lab/the-lab/docker' },
            { text: 'Terminal', link: '/the-lab/the-lab/terminal' },
            { text: 'GUI', link: '/the-lab/the-lab/gui' },

          ],
        },
        {
          text: 'Security',
          collapsible: true,
          items: [
            { text: 'CIA triad', link: '/the-lab/security/cia-triad' },
            { text: 'Hacking modus operandi', link: '/the-lab/security/hacking-modus-operandi' },
          ],
        },
      ],

      // methodologies
      '/methodologies/': [
        {
          text: 'PTES',
          collapsible: true,
          items: [
            { text: 'PTES', link: '/methodologies/ptes/ptes' },
          ],
        },
        {
          text: 'Cyber Kill Chain®',
          collapsible: true,
          items: [
            { text: 'Cyber kill chain', link: '/methodologies/cyber-kill-chain/cyber-kill-chain' },

          ],
        },
        {
          text: 'OWASP',
          collapsible: true,
          items: [
            { text: 'OWASP Risk Rating Methodology', link: '/methodologies/owasp/owasp-risk-rating-methodology' },

          ],
        },
      ],

      // scripting
      '/scripting/': [
        {
          text: 'bash',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Start', link: '/' },
          ],
        },
        {
          text: 'JavaScript',
          collapsible: true,
          items: [
            { text: 'Start', link: '/' },
          ],
        },
        {
          text: 'Python',
          collapsible: true,
          items: [
            { text: 'Start', link: '/' },

          ],
        },
        {
          text: 'SQL',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Start', link: '/' },

          ],
        },
      ],

      // instruments
      '/instruments/nmap': [
        {
          text: 'nmap',
          collapsible: true,
          items: [
            { text: 'nmap', link: '/instruments/nmap/intro/nmap' },
          ],
        },
      ],

      '/instruments/git': [
        {
          text: 'git',
          items: [
            { text: 'Git Started', link: '/instruments/git/git-and-github/1-git-started' },
            { text: 'Remote', link: '/instruments/git/git-and-github/2-remote' },
            { text: 'Collaboration', link: '/instruments/git/git-and-github/3-collaboration' },
            { text: 'Advanced', link: '/instruments/git/git-and-github/4-advanced' },
          ],
        },
      ],

      // vulnerabilities
      '/vulnerabilities/xss/': [
        {
          text: 'XSS Intro',
          items: [
            { text: 'Zine', link: '/vulnerabilities/xss/intro/zine' },
            { text: 'XSS 101', link: '/vulnerabilities/xss/intro/cross-site-scripting' },
            { text: 'Types of XSS', link: '/vulnerabilities/xss/intro/types-of-xss' },
            { text: 'XSS context', link: '/vulnerabilities/xss/intro/xss-context' },
            { text: 'How to test', link: '/vulnerabilities/xss/intro/how-to-test' },
            { text: 'RXSS labs', link: '/vulnerabilities/xss/intro/rxss-labs' },
            { text: 'Brute\'s labs', link: '/vulnerabilities/xss/intro/brutes-labs' },
          ],
        },
        {
          text: 'XSS Context',
          items: [
            { text: 'html-comment-context', link: '/vulnerabilities/xss/xss-context/html-comment' },
            { text: 'XSS', link: '/vulnerabilities/xss/advanced/xss' },
          ],
        },
      ],
      '/vulnerabilities/csrf/': [
        {
          text: 'CSRF',
          items: [
            { text: 'CSRF', link: '/vulnerabilities/csrf/intro/csrf' },
          ],
        },
      ],

      // exploits
      '/exploits/': [
        {
          text: 'Distributed Denial of Service',
          items: [
            { text: 'DDoS', link: '/exploits/ddos/DDoS' },
          ],
        },
      ],

      // Knowledge Base
      // This sidebar gets displayed when user is
      // under `istqb` directory.
      '/knowledge-base/istqb/': [
        {
          text: 'ISTQB',
          items: [
            // This shows `/istqb/index.md` page.
            { text: 'Index', link: '/istqb/' }, // /istqb/index.md
          ],
        },
      ],
      '/knowledge-base/cissp/': [
        {
          text: 'CISSP',
          items: [
            { text: 'Index', link: '/cissp/' },
          ],
        },
      ],
      '/knowledge-base/cnwpp/': [
        {
          text: 'CNWP',
          items: [
            { text: 'Index', link: '/cnwpp/' },
          ],
        },
      ],
      '/knowledge-base/networking/': [
        {
          text: 'MIW',
          items: [
            { text: 'Netwerk Architektuur', link: '/knowledge-base/networking/miw/1-netwerk-architektuur.md' },
            { text: 'Protocol Stack', link: '/knowledge-base/networking/miw/2-protocol-stack.md' },
            { text: 'Intro Beveiliging', link: '/knowledge-base/networking/miw/3-intro-beveiliging.md' },
            { text: 'Applicatielaag', link: '/knowledge-base/networking/miw/4-applicatie-laag.md' },
            { text: 'Applicatieprotocollen', link: '/knowledge-base/networking/miw/5-applicatieprotocollen.md' },
            { text: 'DNS', link: '/knowledge-base/networking/miw/6-dns.md' },
            { text: 'Transportlaag', link: '/knowledge-base/networking/miw/7-transportlaag.md' },
            { text: 'Netwerklaag', link: '/knowledge-base/networking/miw/8-netwerklaag.md' },
            { text: 'Routing & Forwarding', link: '/knowledge-base/networking/miw/9-routing-en-forwarding.md' },
            { text: 'Netwerklaagprotocollen', link: '/knowledge-base/networking/miw/10-netwerklaagprotocollen.md' },
            { text: 'Subnetting', link: '/knowledge-base/networking/miw/11-subnetting.md' },
            { text: 'Linklaag', link: '/knowledge-base/networking/miw/12-linklaag.md' },
            { text: 'Beveiliging', link: '/knowledge-base/networking/miw/13-beveiliging.md' },
            { text: 'Beveiligingsmaatregelen', link: '/knowledge-base/networking/miw/14-beveiligingsmaatregelen.md' },
          ],
        },
        {
          text: 'The Internet',
          items: [
            { text: 'What Is The Internet?', link: '/knowledge-base/networking/0-the-internet/the-internet.md' },
          ],
        },
        {
          text: 'Introduction',
          items: [
            { text: 'Networking Overview', link: '/knowledge-base/networking/1-introduction/networking-overview' },
          ],
        },
        {
          text: 'Networking Structure',
          items: [
            { text: 'Network Types', link: '/knowledge-base/networking/2-networking-structure/1-network-types' },
            { text: 'Networking Topologies', link: '/knowledge-base/networking/2-networking-structure/2-networking-topologies' },
            { text: 'Proxies', link: '/knowledge-base/networking/2-networking-structure/3-proxies' },
          ],
        },
        {
          text: 'Networking Workflow',
          items: [
            { text: 'Networking Models', link: '/knowledge-base/networking/3-networking-workflow/1-networking-models' },
            { text: 'The OSI Model', link: '/knowledge-base/networking/3-networking-workflow/2-the-osi-model' },
            { text: 'The TCP/IP Model', link: '/knowledge-base/networking/3-networking-workflow/3-the-tcp-ip-model' },
          ],
        },
        {
          text: 'Addressing',
          items: [
            { text: 'Networking Layer', link: '/knowledge-base/networking/4-networking-addressing/1-network-layer' },
            { text: 'IPv4 Addresses', link: '/knowledge-base/networking/4-networking-addressing/2-ipv4-addresses' },
            { text: 'Subnetting', link: '/knowledge-base/networking/4-networking-addressing/3-subnetting' },
            { text: 'MAC Addresses', link: '/knowledge-base/networking/4-networking-addressing/4-mac-addresses' },
            { text: 'IPv6 Addresses', link: '/knowledge-base/networking/4-networking-addressing/5-ipv6-addresses' },
          ],
        },
        {
          text: 'Protocols & Terminology',
          items: [
            { text: 'Networking Key Terminology', link: '/knowledge-base/networking/5-protocols-and-terminology/1-protocols-and-terminology' },
            { text: 'Common Protocols', link: '/knowledge-base/networking/5-protocols-and-terminology/2-common-protocols' },
            { text: 'Wireless Networks', link: '/knowledge-base/networking/5-protocols-and-terminology/3-wireless-networks' },
            { text: 'Virtual Private Networks', link: '/knowledge-base/networking/5-protocols-and-terminology/4-virtual-private-networks' },
            { text: 'Vendor Specific Information', link: '/knowledge-base/networking/5-protocols-and-terminology/5-vendor-specific-information' },
          ],
        },
        {
          text: 'Connection Establishment',
          items: [
            { text: 'Key Exchange Mechanisms', link: '/knowledge-base/networking/6-connection-establishment/1-key-exchange-mechanisms' },
            { text: 'Authentication Protocols', link: '/knowledge-base/networking/6-connection-establishment/2-authentication-protocols' },
            { text: 'TCP/UDP Connections', link: '/knowledge-base/networking/6-connection-establishment/3-tcp-udp-connections' },
            { text: 'Cryptograhy', link: '/knowledge-base/networking/6-connection-establishment/4-cryptography' },
          ],
        },
      ],
      '/knowledge-base/sysadmin/': [
        {
          text: 'System Administration',
          items: [
            { text: 'Index', link: '/sysadmin/' },
          ],
        },
      ],
      '/knowledge-base/os/': [
        {
          text: 'Operating Systems',
          items: [
            { text: 'Index', link: '/os/' },
          ],
        },
      ],
      '/knowledge-base/thepentest101/': [
        {
          text: '1. The pentest',
          collapsible: true,
          items: [
            { text: 'The penetration test', link: '/knowledge-base/thepentest101/the-pentest/the-penetration-test' },
            { text: 'Types of pentest', link: '/knowledge-base/thepentest101/the-pentest/types-of-pentest' },
            { text: 'The deliverables', link: '/knowledge-base/thepentest101/the-pentest/the-deliverables' },
            { text: 'The pitch', link: '/knowledge-base/thepentest101/the-pentest/the-pitch' },
          ],
        },
        {
          text: '2. The deliverables',
          collapsible: true,
          items: [
            { text: 'Defining the deliverables', link: '/knowledge-base/thepentest101/the-deliverables/defining-the-deliverables' },
            { text: 'NDA', link: '/knowledge-base/thepentest101/the-deliverables/NDA' },
            { text: 'Contract template', link: '/knowledge-base/thepentest101/the-deliverables/contract-template' },
            { text: 'Letter-of-engagement', link: '/knowledge-base/thepentest101/the-deliverables/letter-of-engagement' },
            { text: 'Bug template', link: '/knowledge-base/thepentest101/the-deliverables/bug-template' },
          ],
        },
        {
          text: '3. The test plan',
          collapsible: true,
          items: [
            { text: 'The testing plan', link: '/knowledge-base/thepentest101/the-test-plan/the-testing-plan' },
            { text: 'Test plan template', link: '/knowledge-base/thepentest101/the-test-plan/test-plan-template' },
          ],
        },
        {
          text: '4. The test Report',
          collapsible: true,
          items: [
            { text: 'The test report', link: '/knowledge-base/thepentest101/the-test-report/the-test-report' },
            { text: 'Test report template', link: '/knowledge-base/thepentest101/the-test-report/test-report-template' },
          ],
        },
      ],
      '/knowledge-base/cyber-crusades/': [
        {
          text: 'Web 1',
          collapsible: true,
          items: [
            { text: 'What Is Web?', link: '/knowledge-base/cyber-crusades/web-1/1-what-is-web' },
          ],
        },
        {
          text: 'Web 2',
          collapsible: true,
          items: [
            { text: 'Intro', link: '/' },
          ],
        },
        {
          text: 'Networking',
          collapsible: true,
          items: [
            { text: 'Intro', link: '/' },
          ],
        },
      ],
    },
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: false,
  },
}
