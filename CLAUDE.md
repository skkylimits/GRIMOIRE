# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview & Purpose

**Grimoire** is een Nuxt.js-gebaseerde documentatiewebsite en persoonlijk kennismanagementsysteem ("second brain") gericht op cybersecurity, offensive security-technieken en defensive security research. De repository bevat educatief materiaal over malware development, Windows internals, penetration testing en security engineering.

### Context & Ambitie

Deze repo is mijn leerpad naar APT-level cybersecurity expertise. Overdag werk ik als Security Engineer/Sysadmin (blue team) in Microsoft-centric enterprise-omgevingen (on-prem & cloud: M365, Intune, Entra ID). 's Avonds train ik offensive skills via TryHackMe en HackTheBox.

**Missie**: Bedrijven beschermen door op extreem diep technisch niveau te begrijpen hoe aanvallers en malware werken, zodat ik betere detecties en verdedigingen kan ontwerpen.

**Waarom malware development & Windows internals**:
- Betere detection rules schrijven voor XDR/EDR-oplossingen
- Red team engagements effectiever uitvoeren
- Bewijzen welke technieken security-oplossingen kunnen omzeilen (voor verbetering)

**Focus-gebieden**: PowerShell automatisering, forensics & incident response, netwerk-analyse (Wireshark), Windows API/internals, C# tooling (o.a. Intune-automatisering), SQL, en deze webdev repo.

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3, TypeScript)
- **UI Library**: Nuxt UI v4
- **Content**: Nuxt Content (Markdown-based documentation)
- **Package Manager**: pnpm 10.18.0
- **Testing**: Vitest with coverage (v8)
- **Linting**: ESLint with @antfu/eslint-config
- **Authentication**: @sidebase/nuxt-auth with NextAuth.js

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm lint          # Check for issues
pnpm lint:fix      # Auto-fix issues

# Testing
pnpm test                # Run tests
pnpm test:watch          # Watch mode
pnpm test:coverage       # Generate coverage report
pnpm test:ui             # Visual test UI
pnpm test:verbose        # Detailed output

# Setup & maintenance
pnpm setup               # Run setup script (bash scripts/cli/setup.sh)
pnpm reset               # Reset project state

# Performance metrics
pnpm measure:dev         # Measure dev server startup time
pnpm measure:build       # Measure build time
pnpm measure:preview     # Measure preview startup time
pnpm measure:reset       # Reset metrics
```

## Architecture & Structure

### Content Organization

All documentation lives in `/content/` organized as educational modules:

- **0.instructions/** - Repository setup and configuration guides
- **1.the-lab/** - Lab environment setup and infrastructure
- **2.syntax/** - Programming language syntax references
- **3.kitt/** - Key Interface and Technical Tools
- **4.gadgets/** - Security tools and utilities
- **5.vuln/** - Vulnerability research and analysis
- **6.xpl01ts/** - Exploit development and techniques
- **7.knowledge-base/** - Primary knowledge repository including:
  - **6.malware/1.develop/** - Progressive malware development modules (see dedicated CLAUDE.md in that directory for malware-specific guidance)

**Module Structure**:
- Each module directory contains a `.navigation.yml` file (module metadata: title, icon)
- `0.index.md` - Module overview
- Numbered topic files (e.g., `1.topic.md`, `2.topic.md`)

### Application Structure

```
app/
├── components/         # Vue components (auto-imported)
├── composables/        # Vue composables (auto-imported)
├── layouts/           # Page layouts
│   └── docs.vue       # Main docs layout
├── middleware/        # Route middleware
├── pages/             # File-based routing
│   ├── index.vue      # Landing page
│   ├── [...slug].vue  # Dynamic content pages
│   └── debug-auth.vue # Auth debugging
└── app.config.ts      # App configuration

server/
├── api/               # API routes
│   └── auth/          # NextAuth handlers
└── routes/            # Server routes
    └── raw/           # Raw content endpoints

scripts/
├── cli/               # CLI utilities (setup.sh, reset.js)
├── helpers/           # Helper functions
├── markdown/          # Markdown processing
├── metrics/           # Performance metrics
└── shellcode/         # Shellcode utilities

tests/
├── unit/              # Unit tests (Vitest)
├── e2e/               # End-to-end tests
└── setup.ts           # Test configuration
```

## Content Format & Style

**Language**: Primary content is in **Dutch** with technical terms in English. Translation requests should preserve formatting and only translate text.

Try to use simple language where possible without losing detail.

**Markdown Conventions**:

**Frontmatter**:
- Required fields: `title`, `description`, `navigation`
- Use `toc: depth: 1` **only** if TOC becomes scrollable

**Callout Blocks**:
- `::note` - General information
- `::tip` - Helpful hints and best practices
- `::important` - Critical information
- `::warning` - Potential issues or gotchas
- `::caution` - Dangerous operations or security concerns

**Emoji Usage**:
- All-or-nothing per heading level (for visual alignment in TOC)
- Use consistently across same heading level or not at all

**Code Blocks**:
- Use syntax highlighting (supported languages in nuxt.config.ts)
- Dutch comments in code examples (with English technical terms preserved)
- Always include language identifier

**Navigation**:

- Each module has `.navigation.yml` defining title and icon
- Auto-generated TOC from markdown headings
- Search powered by Nuxt Content

## Configuration Files

**Key Configuration Files**:

- **nuxt.config.ts** - Nuxt modules, UI theme, content settings, auth config
- **app.config.ts** - UI customization (colors, icons, header, footer, callout styles)
- **content.config.ts** - Content collections schema (landing, docs)
- **eslint.config.mjs** - ESLint with tabs, single quotes, no semicolons
- **vitest.config.ts** - Test configuration (unit tests only, coverage with v8)
- **tsconfig.json** + **tsconfig.test.json** - TypeScript configurations

**Important Settings**:

**ESLint**: Tab indentation, single quotes, no semicolons, content markdown files excluded from linting

**Auth Configuration**:
- globalAppMiddleware is disabled (manual middleware usage)
- NextAuth.js with GitHub provider
- Auth routes at `/api/auth`

**Icons**:
- Iconify provider for standard icons
- Custom local icon collection in `assets/icons/` with prefix `custom:`

**Theme**:
- Custom color palette (primary: red, secondary: amber, tertiary: emerald, etc.)
- Custom callout styling for each type
- Dark mode support enabled

**Content Rendering**:
- GitHub Dark theme for code highlighting
- TOC search depth: 1
- Prose components enabled

## Special Considerations

### Educational Security Content

This repository contains **educational materials** on malware development and offensive security techniques. All content is intended exclusively for:

- Authorized security testing and penetration testing
- CTF (Capture The Flag) challenges
- Security research and defensive analysis
- Educational and learning purposes

**When working with this codebase:**

✅ **Allowed Activities**:
- Analyze and document existing techniques
- Explain how code works and what it does
- Provide code review and educational explanations
- Document detection signatures and Indicators of Compromise (IoCs)
- Suggest defensive countermeasures and mitigations
- Help understand security concepts for defensive purposes

❌ **Not Allowed Activities**:
- Improve, extend, or create new evasion techniques
- Develop new malicious capabilities or payloads
- Help bypass security controls for non-educational purposes
- Enhance malware effectiveness or stealth
- Provide guidance on using techniques for malicious purposes

**Context for Defensive Work**: Understanding offensive techniques deeply enables better defensive strategies. The goal is to build better detection rules, understand attacker methodologies, and design more robust security architectures.

The malware development section (`content/7.knowledge-base/6.malware/1.develop/`) has its own detailed CLAUDE.md with specific guidance on Windows internals, PE file format, injection techniques, EDR/AV evasion methods, and the MDLC (Malware Development Life Cycle) framework.

### Git Workflow

- **Current branch**: v4
- **Main branch**: main (use for PRs)
- Recent work focused on malware module reorganization and naming conventions

## Nuxt-Specific Patterns

**Auto-imports**: Components, composables, and Nuxt utilities are auto-imported (no manual imports needed)

**Content queries**: Use `queryContent()` composable for programmatic content access

**Pages**: File-based routing with `[...slug].vue` for dynamic content rendering

**Layouts**: `docs.vue` layout provides standard documentation structure

**Server routes**: Auth handlers in `server/api/auth/`, raw content in `server/routes/raw/`

## Testing Strategy

Tests located in `tests/unit/` only (e2e tests exist but unit tests are primary focus)

**Test commands**:

- `pnpm test` - Run all unit tests
- `pnpm test:watch` - Watch mode for TDD
- `pnpm test:coverage` - Generate coverage reports
- `pnpm test:ui` - Visual test interface

**Coverage**: Uses v8 provider with text, JSON, and HTML reporters

## Build & Deployment

**Build**: `pnpm build` generates static site in `.output/`

**Preview**: `pnpm preview` serves production build locally

**Prerendering**:
- Homepage (`/`) is prerendered
- Other pages generated on-demand
- No automatic link crawling

**Performance Monitoring**:
- Custom metrics scripts track dev/build/preview startup times
- Metrics stored in `metrics/` directory as JSON

## Projectstatus

**Current Module**: Module reorganization & documentation quality improvements

**Progress Through 10-Module Structure**:
1. ✅ Bouwstenen (fundamentals) - Complete (restructure proposed)
2. ✅ Windows Internals - Complete
3. ✅ Payload Placement and Encryption - **Recently reorganized: Binary Signing, Brute Force, CRT**
4. ✅ Payload Execution and Injection - Complete
5. 🔄 Obfuscation and IAT Manipulation - **Documentation updates in progress**
6. ✅ Process and Argumentation Manipulation - Complete
7. 🔄 API Hooking - **Documentation updates in progress**
8. 🔄 Syscalls - **Documentation updates in progress**
9. ✅ Anti-Analysis and Evasion - Substantial progress
10. ⏸️ Advanced EDR Bypass - Planned

**Recent Completed Sections**:
- Module 3 restructuring: Binary Signing moved from Module 4, HellShell/MiniShell renumbered
- Module 6 (Runtime/IAT): 7 documentation files updated
- Module 7 (API Hooking): 4 documentation files updated
- Module 8 (Syscalls): SysWhispers and Hell's Gate documentation updated
- Notes directory: TOC planning, chapter ideas, philosophy documentation

## Sessielog

### Sessie 2025-11-19
- **Module:** Modules 3, 6, 7, 8 - Reorganization & Documentation Updates
- **Bereikt:**
  - Module 3 restructuring: Binary Signing verplaatst van Module 4, HellShell/MiniShell renumbered (14/15 → 17/18)
  - Brute Force Decryption documentation toegevoegd aan Module 3
  - Module 6 (Runtime/IAT): 7 documenten bijgewerkt met formatting improvements
  - Module 7 (API Hooking): 4 documenten bijgewerkt
  - Module 8 (Syscalls): SysWhispers en Hell's Gate documenten bijgewerkt
  - Notes directory: TOC.md, chapter-ideas.md, offense-best-defense.md toegevoegd
  - Public assets directories aangemaakt voor modules 3, 6, 7, 8
- **Belangrijke beslissingen:**
  - Binary signing placement: Module 4 → Module 3 (logical: preparation vs execution)
  - CRT removal duplication identified: needs resolution (appears in Module 3 and 6)
  - Notes directory als dedicated planning/philosophy space
  - Proposed Module 1 restructure documented (6.proposed-restructure.md)
- **Volgende stappen:**
  - Resolve CRT removal file duplication
  - Complete Module 7 (API Hooking) remaining sections
  - Continue Module 8 (Syscalls) met Halo's Gate en TartarusGate
  - Format notes directory files properly
  - Verify all cross-references after reorganization

### Sessie 2025-11-18
- **Module:** 3. Payload Placement and Encryption
- **Bereikt:**
  - Vertaald en geformatteerd 13.binary-entropy-reduction.md van Engels naar Nederlands
  - Shannon's Entropy documentatie (0-8 schaal, malware vs benigne detection)
  - 4 entropy reduction technieken: algorithm selection, English strings, padding, CRT removal
  - EntropyCalc.py Python script documentatie
  - Defensive perspective met YARA rule voorbeelden
  - Best practices vergelijkingstabel
  - Header structuur gecorrigeerd (alleen ## met emoji's, ### zonder)
- **Belangrijke beslissingen:**
  - CRT removal blijft in Module 3 (entropy context), cross-reference naar Module 5 (IAT)
  - Style guide enforcement: strikte header emoji consistency
  - Padding technique als meest effectieve entropy reduction (5.88 → 3.77)
  - Educational balance: offensive technieken + defensive YARA rules
- **Volgende stappen:**
  - Verify overige Module 3 documents formatting
  - Continue Module 8 (Syscalls) met Halo's Gate en TartarusGate
  - Add entropy analysis in payload loader examples
  - Cross-module referencing tussen encryption en entropy

### Sessie 2025-11-09
- **Module:** 8. Syscalls
- **Bereikt:**
  - 3 nieuwe syscalls documenten: Userland Hooking, SysWhispers, Hell's Gate
  - Update syscalls fundamentals document
  - Comprehensive payload loader documentatie (bypassing AVs)
  - Payload placement updates (.text sectie)
  - Public assets toegevoegd voor syscalls module
- **Belangrijke beslissingen:**
  - Hell's Gate gekozen als primary SSN resolution method
  - Indirect syscalls als evolution voor stealthier execution
  - Comprehensive loader als culmination van alle technieken
  - Forwarded functions handling (SystemFunction032 in Cryptsp.dll)
- **Volgende stappen:**
  - Halo's Gate en TartarusGate documenteren
  - Syscall flow diagrams toevoegen
  - Detection signatures voor syscall patterns
  - Module cross-referencing verbeteren

### Sessie 2025-11-03
- **Module:** 9. Anti-Analysis and Evasion
- **Bereikt:**
  - Toegevoegd 6 nieuwe documenten over anti-analysis technieken
  - Project AI workflow infrastructure opgezet (.claude/agents/)
  - AI context files gemaakt (CLAUDE.md, AGENTS.md, GEMINI.md)
  - Notes directory aangemaakt voor project-planning en research links
  - Module structuur georganiseerd en genormaliseerd
- **Belangrijke beslissingen:**
  - Gekozen voor gestructureerde agent-based workflow met session-closer agent
  - Notes directory als centrale plek voor TODOs en research materiaal
  - Systematische documentatie van anti-debugging en AVE technieken
- **Volgende stappen:**
  - EDR bypass module verder uitwerken
  - API hooking en syscalls modules documenteren
  - MCP server integratie onderzoeken
  - OSINT workflows met n8n exploreren

## Werk-instructies

**Current FOCUS**: Module Quality & Organization - Documentation formatting, file reorganization, cross-referencing

**Workflow Priorities**:
1. Resolve CRT removal duplication issue (Module 3 vs Module 6)
2. Format notes directory files (TOC.md, chapter-ideas.md, offense-best-defense.md)
3. Review and implement Module 1 (bouwstenen) restructure proposal
4. Complete Module 7 (API Hooking) remaining sections
5. Continue Module 8 (Syscalls) with Halo's Gate and TartarusGate
6. Improve cross-module referencing after recent reorganization
7. Maintain defensive research context throughout all offensive technique documentation
