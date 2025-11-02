# Grimoire

**Educational Malware Development Knowledge Base & Cybersecurity Second Brain**

Een Nuxt.js-gebaseerde documentatiewebsite en persoonlijk kennismanagementsysteem gericht op cybersecurity, offensive security-technieken en defensive security research.

## =Ú Missie

Dit project is mijn leerpad naar APT-level cybersecurity expertise. Het doel: **Bedrijven beter beschermen door op extreem diep technisch niveau te begrijpen hoe aanvallers en malware werken**, zodat ik betere detecties en verdedigingen kan ontwerpen.

### Context

- **Overdag**: Security Engineer/Sysadmin (blue team) in Microsoft-centric enterprise omgevingen (on-prem & cloud: M365, Intune, Entra ID)
- **'s Avonds**: Offensive skills training via TryHackMe en HackTheBox
- **Focus**: PowerShell automatisering, forensics & incident response, netwerk-analyse, Windows API/internals, C# tooling

## <¯ Waarom Malware Development & Windows Internals?

1. **Betere detection rules** schrijven voor XDR/EDR-oplossingen
2. **Red team engagements** effectiever uitvoeren
3. **Bewijzen** welke technieken security-oplossingen kunnen omzeilen (voor verbetering)

## =Ö Content Structuur

De kennisbank is georganiseerd in 10 progressieve modules:

### Malware Development Life Cycle (MDLC)

1.  **Bouwstenen** - Fundamentals
2.  **Windows Internals** - PE format, processes, threads, memory
3.  **Payload Placement and Encryption** - Storage and protection
4.  **Payload Execution and Injection** - Code injection techniques
5.  **Obfuscation and IAT Manipulation** - Stealth and evasion
6.  **Process and Argumentation Manipulation** - Advanced process control
7. ø **API Hooking** - Function interception
8. ø **Syscalls** - Direct system calls
9. = **Anti-Analysis and Evasion** - *Currently documenting*
10. ø **Advanced EDR Bypass** - Evasion strategies

### Recent Updates (2025-11-03)

**Module 9: Anti-Analysis and Evasion** - 6 nieuwe documenten toegevoegd:
- Anti-analysis fundamentals
- Anti-debugging multiple techniques
- Self-deletion mechanisms
- AVE (AV/EDR Evasion) multiple techniques
- Delayed execution techniques
- API hammering

**Infrastructure**:
- AI workflow setup met session-closer agent
- Context files voor Claude, Agents, en Gemini
- Notes directory voor project planning

## =à Tech Stack

- **Framework**: Nuxt 4 (Vue 3, TypeScript)
- **UI Library**: Nuxt UI v4
- **Content**: Nuxt Content (Markdown-based)
- **Package Manager**: pnpm 10.18.0
- **Testing**: Vitest with coverage (v8)

## – Educatieve Context & Ethische Grenzen

**Dit project bevat educatief materiaal** over malware development en offensive security technieken. Alle content is **uitsluitend** bedoeld voor:

 **Toegestaan**:
- Geautoriseerde security testing en penetration testing
- CTF (Capture The Flag) challenges
- Security research en defensive analyse
- Educatieve en leerdoeleinden
- Documentatie van detectiesignaturen en IoCs
- Defensive countermeasures ontwerpen

L **Niet toegestaan**:
- Nieuwe evasion technieken ontwikkelen voor kwaadwillige doeleinden
- Malware effectiveness verbeteren
- Security controls omzeilen voor non-educational purposes
- Schadelijke payloads ontwikkelen

**Defensive Application**: Het doel is betere detection rules te schrijven, attacker methodologies te begrijpen, en robuustere security architectures te ontwerpen.

## =€ Development

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

## =Ý Git Workflow

- **Current branch**: v4
- **Main branch**: main (voor PRs)
- Focus: Systematische documentatie van malware development technieken met defensive research context

---

**  Educational Use Only** - All techniques documented here are for authorized security testing, CTF challenges, security research, and defensive purposes only.
