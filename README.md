# Grimoire

**Educational Malware Development Knowledge Base & Cybersecurity Second Brain**

Een Nuxt.js-gebaseerde documentatiewebsite en persoonlijk kennismanagementsysteem gericht op cybersecurity, offensive security-technieken en defensive security research.

## Missie

Dit project is mijn leerpad naar APT-level cybersecurity expertise. Het doel: **Bedrijven beter beschermen door op extreem diep technisch niveau te begrijpen hoe aanvallers en malware werken**, zodat ik betere detecties en verdedigingen kan ontwerpen.

### Context

- **Overdag**: Security Engineer/Sysadmin (blue team) in Microsoft-centric enterprise omgevingen (on-prem & cloud: M365, Intune, Entra ID)
- **'s Avonds**: Offensive skills training via TryHackMe en HackTheBox
- **Focus**: PowerShell automatisering, forensics & incident response, netwerk-analyse, Windows API/internals, C# tooling

## Waarom Malware Development & Windows Internals?

1. **Betere detection rules** schrijven voor XDR/EDR-oplossingen
2. **Red team engagements** effectiever uitvoeren
3. **Bewijzen** welke technieken security-oplossingen kunnen omzeilen (voor verbetering)

## Content Structuur

De kennisbank is georganiseerd volgens een **tier-based architecture** voor betere schaalbaarheid en pedagogische flow:

### Tier-Based Malware Development Knowledge Base

**Migration Status**: Actively reorganizing from 10 sequential modules naar tier-based structure

**Nieuwe Tier Structure**:

- **Tier 1 (10-15)**: Fundamentals - Payload Engineering, Targeting & Staging
- **Tier 2 (40-60)**: Core Techniques - Injection, Static Bypass, Runtime Evasion
- **Tier 3 (70-80)**: Advanced Layer - API/Syscalls, Detection Bypass
- **Tier 4 (90-93)**: Specialized - Advanced Execution, Credentials, Persistence, C2
- **Tier 5 (99)**: Kernel - Kernel-level techniques

**Reorganization Progress**:

- ✅ Tier architecture designed (12 tier directories)
- ✅ 176 modules mapped to new structure
- ✅ Pedagogical dependencies validated
- ✅ Directory scaffolding created
- ⏸️ Content migration in progress (1.develop/ → tier directories)
- ⏸️ Navigation infrastructure pending
- ⏸️ Index documentation pending

**Benefits**:

- Numbered gaps allow future insertions without renumbering entire structure
- Thematic clustering instead of rigid linear progression
- MITRE ATT&CK-inspired categorization for better defensive mapping
- Scalable architecture for knowledge base growth

### Recent Updates

**2025-11-20** - **Major Tier-Based Architecture Reorganization**:

- Designed and implemented tier-based structure (12 tier directories)
- Mapped 176 modules from old structure to new tiers
- Created complete-module-mapping.md documentation with full module inventory
- Validated pedagogical dependencies (3 critical corrections: Thread Manipulation, Custom Implementations, NTDLL Unhooking)
- Created directory scaffolding for all tiers
- Backup created (0.develop/), source preserved (1.develop/)
- Tier numbering system: 10, 15, 40, 50, 60, 70, 80, 90-93, 99
- MITRE ATT&CK-inspired categorization approach
- Preservation approach ensures zero data loss during migration
- Next steps: Content migration, navigation files, index documentation

**2025-11-19** - **Module Reorganization & Documentation Quality**:

- Module 3 restructuring: Binary Signing moved from Module 4, HellShell/MiniShell renumbered (14/15 → 17/18)
- Brute Force Decryption documentation added to Module 3
- Module 6 (Runtime/IAT): 7 documentation files updated with formatting improvements
- Module 7 (API Hooking): 4 documentation files updated
- Module 8 (Syscalls): SysWhispers and Hell's Gate documentation updated
- Notes directory: TOC planning, chapter ideas, philosophy documentation
- Public assets directories created for modules 3, 6, 7, 8
- CRT removal duplication identified (requires resolution)

**2025-11-18** - **Module 3: Payload Placement and Encryption**:

- Binary Entropy Reduction documentatie (complete vertaling EN→NL + formatting)
- Shannon's Entropy fundamentals (0-8 schaal, malware detection thresholds)
- 4 entropy reduction technieken: algorithm selection, English strings, padding, CRT removal
- EntropyCalc.py Python script voor entropy measurement
- Defensive perspective: YARA rules voor suspicious entropy patterns
- Best practices vergelijkingstabel

**2025-11-09** - **Module 8: Syscalls** - 4 documenten toegevoegd/geüpdatet:

- Syscalls fundamentals (SSN, Nt vs Zw syscalls, syscall structure)
- Userland hooking en EDR bypass techniques
- SysWhispers v1/v2/v3 evolution
- Hell's Gate dynamic SSN resolution
- **Module 9**: Comprehensive payload loader documentatie (bypassing AVs)
- **Module 3**: .text sectie payload placement updates
- Infrastructure: Public assets voor syscalls module toegevoegd

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3, TypeScript)
- **UI Library**: Nuxt UI v4
- **Content**: Nuxt Content (Markdown-based)
- **Package Manager**: pnpm 10.18.0
- **Testing**: Vitest with coverage (v8)

## Educatieve Context & Ethische Grenzen

**Dit project bevat educatief materiaal** over malware development en offensive security technieken. Alle content is **uitsluitend** bedoeld voor:

✅ **Toegestaan**:

- Geautoriseerde security testing en penetration testing
- CTF (Capture The Flag) challenges
- Security research en defensive analyse
- Educatieve en leerdoeleinden
- Documentatie van detectiesignaturen en IoCs
- Defensive countermeasures ontwerpen

❌ **Niet toegestaan**:

- Nieuwe evasion technieken ontwikkelen voor kwaadwillige doeleinden
- Malware effectiveness verbeteren
- Security controls omzeilen voor non-educational purposes
- Schadelijke payloads ontwikkelen

**Defensive Application**: Het doel is betere detection rules te schrijven, attacker methodologies te begrijpen, en robuustere security architectures te ontwerpen.

## Development

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Linting
pnpm lint
```

Zie [CLAUDE.md](./CLAUDE.md) voor volledige development instructies en project context.

## Git Workflow

- **Current branch**: v4
- **Main branch**: main (voor PRs)
- Focus: Systematische documentatie van malware development technieken met defensive research context

---

**⚠️ Educational Use Only** - All techniques documented here are for authorized security testing, CTF challenges, security research, and defensive purposes only.
:) :) :)

## hardening

### 🧱 Optie A — Client‑only data (extreem veilig)

```ts
const page = ref(null)

onMounted(async () => {
	page.value = await queryCollection('docs')
		.path(route.path)
		.first()
})
```

⛔ Geen SSR data
⛔ Geen HTML exposure
⛔ Iets langzamer
✅ Maximaal veilig

⚠️ Alleen doen als threat‑model dit vereist.
