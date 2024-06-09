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
        text: 'Certifize',
        items: [
          { text: 'CCNA', link: '/certifize/ccna/' },
          { text: 'ISTQB', link: '/certifize/istqb/' },
          { text: 'CISSP', link: '/certifize/cissp/' },
          { text: 'CNWPP', link: '/certifize/cnwpp/' },
        ],
      },
      {
        text: 'Knowledge Base',
        items: [
          { text: 'System Engineering', link: '/knowledge-base/system-engineering/' },
          { text: 'Networking', link: '/knowledge-base/networking/' },
          { text: 'Operating Systems', link: '/knowledge-base/os/' },
          { text: 'Virtualization', link: '/knowledge-base/virtualization/' },
          { text: 'System Administration', link: '/knowledge-base/sysadmin/' },
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
            { text: 'WSL', link: '/the-lab/the-lab/wsl' },
            { text: 'Win-Kex', link: '/the-lab/the-lab/win-kex' },
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
            { text: 'Lockheed Martin\'s CBK', link: '/methodologies/cyber-kill-chain/lockheed-martins-cbk' },

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
            { text: 'Design A DB', link: '/scripting/sql/db/design-a-sql-database' },

          ],
        },
      ],

      // instruments
      '/instruments/nmap': [
        {
          text: 'nmap',
          collapsible: true,
          items: [
            { text: 'nmap', link: '/instruments/nmap/scan/nmap' },
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

      // Certifize
      '/certifize/ccna': [
        {
          text: 'CCNA',
          collapsible: true,
          items: [
            { text: 'CCNA', link: '/certifize/ccna' },
          ],
        },
      ],

      '/certifize/istqb/': [
        {
          text: 'ISTQB',
          items: [
            { text: 'Index', link: '/istqb/' },
          ],
        },
      ],

      '/certifize/cissp/': [
        {
          text: 'CISSP',
          items: [
            { text: 'Index', link: '/cissp/' },
          ],
        },
      ],
      '/certifize/cnwpp/': [
        {
          text: 'CNWP',
          items: [
            { text: 'Index', link: '/cnwpp/' },
          ],
        },
      ],

      // Knowledge Base
      // This sidebar gets displayed when user is
      // under `istqb` directory.
      '/knowledge-base/system-engineering/': [
        {
          text: 'System Engineering',
          items: [
            { text: '', link: '/system-engineering/' },
          ],
        },
      ],
      '/knowledge-base/networking/': [
        {
          text: 'The Internet',
          items: [
            { text: 'What Is The Internet?', link: '/knowledge-base/networking/0-the-internet/the-internet.md' },
          ],
        },
        {
          text: 'Fundamentals',
          items: [
            { text: 'Networking Overview', link: '/knowledge-base/networking/1-fundamentals/0-networking-overview' },
            { text: 'Network Types', link: '/knowledge-base/networking/1-fundamentals/1-network-types' },
            { text: 'Networking Topologies', link: '/knowledge-base/networking/1-fundamentals/2-networking-topologies' },
            { text: 'Proxies', link: '/knowledge-base/networking/1-fundamentals/3-proxies' },
            { text: 'Thuisnetwerk', link: '/knowledge-base/networking/1-fundamentals/4-thuisnetwerk' },
            { text: 'Recources', link: '/knowledge-base/networking/1-fundamentals/5-recources' },
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
          text: 'Wireshark',
          collapsed: true,
          collapsible: true,
          items: [
            { text: 'HTTP', link: '/knowledge-base/networking/miw/wireshark/1-http-wireshark' },
            { text: 'DNS', link: '/knowledge-base/networking/miw/wireshark/2-dns-wireshark' },
          ],
        },

      ],
      '/knowledge-base/os/': [
        {
          text: 'Windows',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: 'Introduction',
              items: [
                { text: 'Cheatsheet', link: '/knowledge-base/os/windows/1-introduction/cheatsheet' },
                { text: 'Introduction to Windows', link: '/knowledge-base/os/windows/1-introduction/introduction-to-windows' },
              ],
            },
            {
              text: 'Core of the Operating System',
              items: [
                { text: 'OS Structure', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/operating-system-structure' },
                { text: 'File System', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/file-system' },
                { text: 'NTFS vs. Share Permissions', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/ntfs-vs-share-permissions' },
              ],
            },
            {
              text: 'Services & Processes',
              items: [
                { text: 'Windows Services & Processes', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Service Permissions', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/service-permissions' },
              ],
            },
            {
              text: 'Interacting with Windows',
              items: [
                { text: 'Widow Sessions', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-sessions' },
                { text: 'Interacting the Windows OS', link: '/knowledge-base/os/windows/4-interacting-with-windows/interacting-with-the-windows-operating-system.md' },
                { text: 'WMI', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
              ],
            },
            {
              text: 'Further Windows Usage',
              items: [
                { text: 'MMC', link: '/knowledge-base/os/windows/5-further-windows-usage/microsoft-management-console' },
                { text: 'WSL', link: '/knowledge-base/os/windows/5-further-windows-usage/windows-linux-subsystem' },
              ],
            },
            {
              text: 'Diving Deeper & Close Out',
              items: [
                { text: 'DE vs. SC', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/desktop-experience-vs-server-core' },
                { text: 'Windows Security', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/windows-security' },
                { text: 'Skills Assesment', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/skill-assesment' },
              ],
            },
          ],
        },
        {
          text: 'Linux',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'Introduction',
              items: [
                { text: 'Linux Structure', link: '/knowledge-base/os/linux/1-introduction/linux-structure' },
                { text: 'Linux Distributions', link: '/knowledge-base/os/linux/1-introduction/linux-distributions' },
                { text: 'Solaris vs. Linux', link: '/knowledge-base/os/linux/1-introduction/solaris-vs-linux' },
                { text: 'Introduction To The Shell', link: '/knowledge-base/os/linux/1-introduction/introduction-to-shell' },
                { text: 'Shortcuts', link: '/knowledge-base/os/linux/1-introduction/shortcuts' },
                { text: 'Cheatsheet', link: '/knowledge-base/os/linux/1-introduction/cheatsheet' },
              ],
            },
            {
              text: 'The Shell',
              items: [
                { text: 'Prompt Description', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/operating-system-structure' },
                { text: 'Getting Help', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/file-system' },
                { text: 'System Information', link: '/knowledge-base/os/windows/2-core-of-the-operating-system/ntfs-vs-share-permissions' },
              ],
            },
            {
              text: 'Workflow',
              items: [
                { text: 'Navigation', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Working with Files and Directories', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/service-permissions' },
                { text: 'Editing Files', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Find Files and Directories', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'File Descriptors and Redirections', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Filter Contents', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Regular Expressions', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
                { text: 'Permission Management', link: '/knowledge-base/os/windows/3-working-with-services-and-processes/windows-services-and-processes' },
              ],
            },
            {
              text: 'System Management',
              items: [
                { text: 'User Management', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-sessions' },
                { text: 'Package Management', link: '/knowledge-base/os/windows/4-interacting-with-windows/interacting-with-the-windows-operating-system.md' },
                { text: 'Service and Process Management', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'Task Scheduling', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'Network Services', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'Working with Web Services', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'Backup and Restore', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'File System Management', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
                { text: 'Containerization', link: '/knowledge-base/os/windows/4-interacting-with-windows/windows-management-instrumentation' },
              ],
            },
            {
              text: 'Linux Networking',
              items: [
                { text: 'Network Configuration', link: '/knowledge-base/os/windows/5-further-windows-usage/microsoft-management-console' },
                { text: 'Remote Desktop Protocols in Linux', link: '/knowledge-base/os/windows/5-further-windows-usage/windows-linux-subsystem' },
              ],
            },
            {
              text: 'Linux Hardening',
              items: [
                { text: 'Linux Security', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/desktop-experience-vs-server-core' },
                { text: 'Firewall Setup', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/windows-security' },
                { text: 'System Logs and Monitoring', link: '/knowledge-base/os/windows/6-diving-deeper-and-close-out/skill-assesment' },
              ],
            },
          ],
        },
        {
          text: 'macOS',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'MacOS Basic Usage',
              items: [
                { text: 'What is macOS', link: '/knowledge-base/os/macos/1-macos-basic-usage/what-is-macos' },
                { text: 'Grahpical Around The OS', link: '/knowledge-base/os/macos/1-macos-basic-usage/graphical-user-interface' },
                { text: 'Navigating Around The OS', link: '/knowledge-base/os/macos/1-macos-basic-usage/navigating-around-the-os' },
                { text: 'System Hierarchy', link: '/knowledge-base/os/macos/1-macos-basic-usage/networking' },
                { text: 'File and Directory Permissions', link: '/knowledge-base/os/macos/1-macos-basic-usage/system-hierarchy' },
                { text: 'Networking', link: '/knowledge-base/os/macos/1-macos-basic-usage/what-is-macos' },
              ],
            },
            {
              text: 'Extending macOS',
              items: [
                { text: 'Application Management', link: '/knowledge-base/os/macos/2-extending-macos/operating-system-structure' },
                { text: 'Security Tips', link: '/knowledge-base/os/macos/2-extending-macos/file-system' },
                { text: 'MacOS Terminal', link: '/knowledge-base/os/macos/2-extending-macos/ntfs-vs-share-permissions' },
                { text: 'Productivity Tips', link: '/knowledge-base/os/macos/2-extending-macos/ntfs-vs-share-permissions' },
                { text: 'MacOS Automation', link: '/knowledge-base/os/macos/2-extending-macos/ntfs-vs-share-permissions' },
              ],
            },
          ],
        },
      ],
      '/knowledge-base/virtualization/': [
        {
          text: 'Virtualization',
          items: [
            { text: '', link: '/virtualization/' },
          ],
        },
      ],
      '/knowledge-base/sysadmin/': [
        {
          text: 'System Administration',
          items: [
            { text: '', link: '/sysadmin/' },
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
    },
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: false,
  },
}
