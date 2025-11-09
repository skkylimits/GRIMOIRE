---
navigation: false
---

# Session Summary - Grimoire Malware Development Knowledge Base

## Sessie 2025-11-09

### Module(s) Bewerkt
- Module 8: Syscalls
- Module 3: Payload Placement and Encryption
- Module 9: Anti-Analysis and Evasion
- Application Page Infrastructure

### Wat is Bereikt

#### Module 8: Syscalls - Uitgebreide documentatie toegevoegd
1. **1.syscalls.md** - Update: Fundamentele syscall concepten, SSN structuur, Nt vs Zw syscalls
2. **2.userland-hooking.md** - Nieuw: EDR userland hooking, direct/indirect syscalls, unhooking
3. **3.SysWhispers.md** - Nieuw: SysWhispers v1/v2/v3 evolution en implementatie
4. **4.hells-gate.md** - Nieuw: Hell's Gate techniek voor dynamische SSN resolving

#### Module 3: Payload Placement and Encryption - Content updates
- **3.text.md** - Update: .text sectie payload placement met pragma directives
- **5.encryption.md** - Update: Encryption technieken (inhoud niet gespecificeerd)
- **8.AES.md** - Update: AES encryption implementatie (inhoud niet gespecificeerd)

#### Module 9: Anti-Analysis and Evasion
- **9.bypassing-AVs.md** - Update: Comprehensive payload loader met alle technieken combined

#### Application Infrastructure
- **app/pages/[...slug].vue** - Applicatie page modifications (specifieke wijzigingen onbekend)

#### Public Assets
- Nieuwe directory: `public/content/7.knowledge-base/6.malware/1.develop/8-syscalls/`
- Syscall module screenshots en afbeeldingen toegevoegd

### Nieuwe Concepten Gedocumenteerd

#### Syscalls Fundamentals
- **System Service Numbers (SSN)** - Unieke nummers per syscall, variërend per OS versie
- **SSN relaties in memory** - Sequentiële nummering (vorige SSN + 1)
- **Syscall structure** - `mov r10, rcx; mov eax, SSN; syscall` pattern
- **Nt vs Zw syscalls** - User-mode (Nt) vs kernel-mode (Zw) interfaces
- **WoW64 compatibility** - test/jne instructies voor 32-bit op 64-bit

#### Userland Hooking & Bypass
- **API hooking** - EDR monitoring via userland syscall hooks
- **Hook placement** - Voor syscall instructie, na user-mode transition
- **Direct syscalls** - Assembly implementation om hooks te omzeilen
- **Indirect syscalls** - Jump naar syscall instructie in ntdll.dll address space
- **Unhooking** - Vervangen van gehookte NTDLL met clean versie van disk

#### SysWhispers Evolution
- **SysWhispers v1** - Hardcoded SSNs per Windows versie via PEB checking
- **SysWhispers v2** - Sorting by System Call Address voor dynamische SSN resolving
- **SysWhispers v3** - Indirect syscalls met randomized jumper voor stealthier execution

#### Hell's Gate Technique
- **Opcode scanning** - Lezen van `0x4c 0x8b 0xd1 0xb8` bytes voor syscall identificatie
- **Hook traversal** - Incrementeel zoeken door gehookte bytes heen
- **SSN extraction** - Bitwise operations `(high << 8) | low` voor SSN berekening
- **Boundary checking** - Detectie van `syscall` (0x0f 0x05) en `ret` (0xc3) instructies
- **VX_TABLE structure** - Syscall organizatie met address, hash en SSN

#### Comprehensive Payload Loader
- **Hell's Gate integration** - Direct syscalls voor all injection operations
- **Mapping injection** - NtCreateSection, NtMapViewOfSection voor payload placement
- **RC4 encryption** - SystemFunction032 voor payload encryption/decryption
- **Brute force decryption** - Key recovery via hint byte mechanism
- **API hashing** - GetProcAddressH en GetModuleHandleH voor IAT obfuscation
- **Anti-analysis features** - Self-deletion, mouse monitoring, execution delays
- **CRT removal** - Custom memcpy, memset, toupper implementations
- **IAT camouflage** - Benign-looking import table

### Tools/Technieken Toegevoegd

#### Syscall Implementation Tools
- **SysWhispers** (v1/v2/v3) - Python script voor syscall stub generation
- **Hell's Gate** - Dynamic SSN resolution library
- **HellShell.exe** - RC4 payload encryption tool
- **KeyGuard2** - Key encryption tool voor brute force demo

#### WinAPI Functions (Hashing Implementation)
- `GetTickCount64` - Timing verification voor delays
- `OpenProcess` - Process handle acquisition
- `CallNextHookEx` - Hook chain management
- `SetWindowsHookExW` - Mouse click monitoring setup
- `GetMessageW` - Message loop voor hooks
- `DefWindowProcW` - Default window procedure
- `UnhookWindowsHookEx` - Hook cleanup
- `GetModuleFileNameW` - Binary path retrieval
- `CreateFileW` - File handle operations
- `SetFileInformationByHandle` - File renaming/deletion
- `CloseHandle` - Handle cleanup

#### Native API / Syscalls (via Hell's Gate)
- `NtCreateSection` - Section object creation voor mapping
- `NtMapViewOfSection` - Local en remote memory mapping
- `NtUnmapViewOfSection` - Memory cleanup
- `NtClose` - Handle closure
- `NtCreateThreadEx` - Thread creation voor payload execution
- `NtWaitForSingleObject` - Thread synchronization
- `NtQuerySystemInformation` - Process enumeration
- `NtDelayExecution` - Native execution delay
- `SystemFunction032` - RC4 encryption/decryption (Advapi32/Cryptsp)

#### Structures & Types
- `VX_TABLE_ENTRY` - Individual syscall entry (address, hash, SSN)
- `VX_TABLE` - Complete syscall table structure
- `API_HASHING` - Function pointer table voor gehashte APIs
- `USTRING` - Native API string structure voor SystemFunction032
- `FILE_RENAME_INFO` - File stream renaming
- `FILE_DISPOSITION_INFO` - File deletion marking
- `LARGE_INTEGER` - High-precision timing voor NtDelayExecution

### Code Voorbeelden

#### Hell's Gate Implementation (C & ASM)
- `HellsGate.c` - SSN resolution via opcode scanning
- `HellAsm.asm` - Assembly stubs met HellsGate en HellDescent
- `GetVxTableEntry()` - Syscall table entry population
- `GetImageExportDirectory()` - NTDLL export directory parsing
- `RtlGetThreadEnvironmentBlock()` - TEB retrieval voor PEB access

#### SysWhispers Generated Code (ASM)
- SysWhispers v1: PEB-based version checking met hardcoded SSNs
- SysWhispers v2: WhisperMain stub met SW2_GetSyscallNumber
- SysWhispers v3: Randomized jumper met SW3_GetRandomSyscallAddress

#### Payload Injection (C)
- `InitializeSyscalls()` - VX_TABLE en API_HASHING initialization
- `RemoteMappingInjectionViaSyscalls()` - Local/remote mapping injection
- `GetRemoteProcessHandle()` - Process enumeration via NtQuerySystemInformation
- `Rc4EncryptionViSystemFunc032()` - Brute force decryption implementation

#### API Hashing (C)
- `HashStringJenkinsOneAtATime32BitA/W()` - String hashing functions
- `GetProcAddressH()` - Hash-based API resolution
- `GetModuleHandleH()` - Hash-based module handle retrieval
- `HASHA()` en `HASHW()` macros voor inline hashing

#### Anti-Analysis Integration (C)
- `AntiAnalysis()` - Combined self-deletion, mouse monitoring, delays
- `DeleteSelf()` - NTFS stream manipulation voor self-deletion
- `MouseClicksLogger()` - Hook-based user interaction monitoring
- `DelayExecutionVia_NtDE()` - NtDelayExecution wrapper met verification

#### CRT Replacement (C)
- Custom `memcpy()` - Byte-by-byte copy implementation
- Custom `memset()` - Memory initialization
- Custom `_toUpper()` - Character case conversion
- `_fltused` symbol definition voor floating-point support

#### Debug Helpers (C)
- `PRINTA()` macro - printf replacement met WriteConsoleA
- `PRINTW()` macro - wprintf replacement met WriteConsoleW
- Conditional compilation via DEBUG define

### Belangrijke Beslissingen

#### Syscall Implementation Strategy
- **Hell's Gate gekozen** als primary method voor SSN resolution
  - Voordeel: Werkt zelfs met gehookte syscalls via opcode scanning
  - Nadeel: Complexer dan SysWhispers, maar flexibeler
- **Indirect syscalls** (SysWhispers v3 approach) als evolution
  - Syscall instructie wordt uitgevoerd vanuit ntdll.dll address space
  - Moeilijker te detecteren dan direct syscalls van buiten NTDLL

#### Educational Documentation Focus
- **Comprehensive payload loader** als culmination van alle technieken
- Demonstreert integratie van:
  - Syscalls (Hell's Gate)
  - Encryption (RC4)
  - Anti-analysis (multiple techniques)
  - API hashing
  - CRT removal
- **Defensive context** maintained: Begrijpen om te detecteren

#### Code Organization
- Modulaire structuur: HellsGate.c, Inject.c, AntiAnalysis.c, ApiHashing.c, WinApi.c
- Header files: Common.h, Structs.h, typedef.h, Debug.h
- Assembly integration: HellAsm.asm voor syscall stubs
- Separation of concerns voor maintainability

#### Forwarded Functions Handling
- **SystemFunction032** found in Cryptsp.dll, not Advapi32.dll
- Forwarded function discovery: String pointer instead of code
- Requires LoadLibrary("Cryptsp") voor correct address resolution
- Demonstrates PE export directory complexity

#### String Hashing Algorithm
- **Jenkins One-At-A-Time** gekozen over Djb2
- INITIAL_SEED: 8 voor hash generation
- Gebruikt in zowel syscall hashing als API hashing
- Hasher project voor hash value generation

### Volgende Stappen

#### Syscalls Module Completion
- [ ] Add Halo's Gate technique documentation (neighbor syscall SSN inference)
- [ ] Document TartarusGate for runtime SSN sorting
- [ ] Add SysWhispers3 practical implementation example
- [ ] Create detection signatures voor direct/indirect syscall patterns

#### Module Cross-Integration
- [ ] Link syscalls module met injection modules (Module 4)
- [ ] Connect with API hooking module (Module 7)
- [ ] Reference from EDR bypass module (Module 10)
- [ ] Add syscall flow diagrams voor visual learning

#### Payload Loader Enhancement
- [ ] Document detection vectors voor comprehensive loader
- [ ] Add blue team countermeasures per technique
- [ ] Create IoC analysis section
- [ ] Test tegen modern EDR solutions (documentatie, niet improvement)

#### Documentation Quality
- [ ] Add more visual diagrams voor syscall flow
- [ ] Create comparison tables (Hell's Gate vs SysWhispers)
- [ ] Expand objectives sections met hands-on labs
- [ ] Add references naar original research papers

### Notities

#### Syscall Complexity
De syscall modules demonstreren een fascinerende evolutie van evasion techniques. Van simpele hardcoded SSNs (SysWhispers v1) naar dynamische resolution (v2) naar indirect execution (v3) en uiteindelijk runtime opcode scanning (Hell's Gate). Elke iteratie was een response op defensive improvements.

#### Hell's Gate Ingenuity
De Hell's Gate techniek is bijzonder slim omdat het de hook letterlijk "overslaat" door byte-per-byte door memory te lopen totdat het de originele syscall instructies vindt. Het gebruikt boundary checking (syscall en ret instructies) om te voorkomen dat het te ver zoekt. De bitwise operations voor SSN extraction zijn elegant.

#### Educational Integration
De "Bypassing AVs" module is een excellent voorbeeld van hoe alle voorgaande modules samenkomen. Het combineert:
- Windows internals (PEB, TEB, PE parsing)
- Payload encryption (RC4)
- Injection (mapping injection)
- Syscalls (Hell's Gate)
- Obfuscation (API hashing, IAT camouflage)
- Anti-analysis (self-deletion, delays, monitoring)
- Evasion (CRT removal)

Dit is precies wat een comprehensive malware loader in real-world scenarios zou gebruiken.

#### Forwarded Functions Discovery
Het ontdekken van forwarded functions (SystemFunction032 in Cryptsp.dll vs Advapi32.dll) is een belangrijke learning moment. Dit demonstreert waarom custom GetProcAddress implementaties complex zijn - je moet edge cases handlen die Microsoft's implementation automatisch afhandelt.

#### Defensive Application
Voor blue team purposes is deze knowledge cruciaal:
- **Behavioral detection**: Syscalls van buiten NTDLL address space
- **Hook integrity checking**: Periodiek NTDLL memory verification
- **Anomaly detection**: Processen zonder CRT imports
- **API call patterns**: Unusual combination van file operations (self-deletion)
- **Timing analysis**: Execution delays en API hammering patterns

#### SSN Volatility Challenge
Een groot probleem met direct syscalls is SSN volatility tussen Windows versies. SysWhispers v2's "sorting by address" en Hell's Gate's runtime resolution zijn beide elegante oplossingen. Dit verklaart waarom malware vaak multiple fallback mechanisms heeft.

#### Module Naming Consistency
Module 8 gebruikt "8-syscalls" (dash separator), consistent met andere advanced modules. De dash lijkt te indiceren "advanced/evasive" technieken vs. fundamentele modules die dot-notation gebruiken.

## Sessie 2025-11-02

### Module(s) Bewerkt
- Module 9: Anti-Analysis & Evasion
- Module 10: Advanced EDR Bypass
- Agent Infrastructure Setup
- Project Synchronization Tooling

### Wat is Bereikt

#### Module 9: Anti-Analysis & Evasion - 6 nieuwe educatieve documenten
1. **1.anti-analysis.md** - Introductie tot anti-analysis technieken en sandboxing
2. **2.anti-debugging-multiple-techniques.md** - Uitgebreide anti-debugging methoden
3. **3.anti-debugging-self-deletion.md** - NTFS-gebaseerde self-deletion techniek
4. **4.AVE-multiple-techniques.md** - Anti-Virtual Environment detectie via hardware specs
5. **5.AVE-multiple-delaying-execution-techniques.md** - Execution delay strategieen voor sandbox bypass
6. **6.AVE-API-hammering.md** - API hammering voor call stack obfuscation

#### Agent Infrastructure
- Claude Code agent definition (.claude/agents/grimoire-project-update/agent.yml)
- Agent prompt configuratie (.claude/agents/grimoire-project-update/prompt.md)
- Systematische Git workflow documentatie voor end-of-session protocol

#### Context File Synchronization
- Root-level AI context files: CLAUDE.md, AGENTS.md, GEMINI.md
- Module-specific context files in malware development directory
- Consistent project guidance voor verschillende AI assistants

#### Project Tooling
- sync.sh script voor context file synchronisatie
- npm script integratie (pnpm sync)
- Automated verification van context file consistency

#### Module Reorganization
- Correcte naamgeving: "9.anti-analysis-and-evasion" en "10-advanced-edr-bypass"
- Verwijdering oude incorrecte directories (10.anti-analysis-and-evasion, 9-advanced-edr-bypass)
- .navigation.yml bestanden met correcte icons en titels

### Nieuwe Concepten Gedocumenteerd

#### Anti-Debugging Technieken
- **IsDebuggerPresent** en custom replacements via PEB manipulation
- **BeingDebugged flag** in Process Environment Block
- **NtGlobalFlag** (0x70) voor debugger detection bij process creation
- **NtQueryInformationProcess** met ProcessDebugPort en ProcessDebugObjectHandle
- **Hardware breakpoints** detectie via Dr0-Dr3 registers en GetThreadContext
- **Blacklisted processes** array voor known debugger detection
- **Timing-based detection** via GetTickCount64 en QueryPerformanceCounter
- **DebugBreak exception handling** voor debugger presence
- **OutputDebugString** failure analysis voor debugger detection

#### Self-Deletion Techniek
- **NTFS file system** concepten en alternate data streams
- **:$DATA stream** renaming voor running binary deletion
- **SetFileInformationByHandle** met FileRenameInfo en FileDispositionInfo
- **FILE_RENAME_INFO** en **FILE_DISPOSITION_INFO** structures
- **Windows 11 update** met FileDispositionInfoEx en POSIX semantics

#### Anti-Virtual Environment Technieken
- **Hardware specs checking** (CPU count, RAM size, USB mount history)
- **Machine resolution** detectie via EnumDisplayMonitors en GetMonitorInfoW
- **File name analysis** voor sandbox classification patterns
- **Process enumeration** voor VM environment detection
- **User interaction monitoring** via mouse click tracking (SetWindowsHookExW)

#### Execution Delay Strategieen
- **Fast-forward detection** via GetTickCount64 verification
- **WaitForSingleObject** met empty event objects
- **MsgWaitForMultipleObjectsEx** voor alternative delays
- **NtWaitForSingleObject** native API approach
- **NtDelayExecution** syscall voor kernel-level delays
- **Ticks** concept (100-nanosecond negative intervals)

#### API Hammering
- **I/O-based hammering** met CreateFileW, WriteFile, ReadFile
- **Temporary file** operations in Windows temp folder
- **Call stack obfuscation** via background thread hammering
- **Time consumption** calculations en SECTOSTRESS macro
- **Resource exhaustion** als sandbox bypass strategie

### Tools/Technieken Toegevoegd

#### WinAPI Functions
- `IsDebuggerPresent`, `GetThreadContext`, `NtQueryInformationProcess`
- `SetFileInformationByHandle`, `CreateFileW`, `GetTempPathW`
- `GetSystemInfo`, `GlobalMemoryStatusEx`, `RegOpenKeyExA`, `RegQueryInfoKeyA`
- `EnumDisplayMonitors`, `GetMonitorInfoW`, `PathFindFileNameA`
- `EnumProcesses`, `SetWindowsHookExW`, `CallNextHookEx`
- `WaitForSingleObject`, `MsgWaitForMultipleObjectsEx`
- `GetTickCount64`, `QueryPerformanceCounter`

#### Native API / Syscalls
- `NtWaitForSingleObject` - Native wait implementation
- `NtDelayExecution` - Native execution delay
- `NtQueryInformationProcess` - Process information queries

#### Structures
- `PEB` (Process Environment Block) met BeingDebugged en NtGlobalFlag
- `SYSTEM_INFO` voor hardware information
- `MEMORYSTATUSEX` voor memory status
- `MONITORINFO` en `RECT` voor display resolution
- `CONTEXT` met debug registers (Dr0-Dr3)
- `FILE_RENAME_INFO` en `FILE_DISPOSITION_INFO(_EX)`
- `LARGE_INTEGER` voor high-precision timing

#### Reverse Engineering Tools
- **Ghidra** - NSA open-source reverse engineering tool
- **IDA** (Interactive Disassembler) - Industry standard
- **x64dbg** - Open-source Windows debugger
- **ScyllaHide** - Anti-anti-debugger plugin

### Code Voorbeelden

#### Anti-Debugging (C)
- 10 verschillende debugger detection methoden met complete implementaties
- IsDebuggerPresent2() en IsDebuggerPresent3() custom functions
- NtQIPDebuggerCheck() voor process information queries
- HardwareBpCheck() voor hardware breakpoint detection
- BlackListedProcessesCheck() met process enumeration
- TimeTickCheck1() en TimeTickCheck2() voor timing analysis
- DebugBreakCheck() met exception handling
- OutputDebugStringCheck() met error analysis

#### Self-Deletion (C)
- DeleteSelf() - Windows 10 versie met NTFS stream manipulation
- DeleteSelfFromDisk() - Windows 11 versie met POSIX semantics
- rdrand32() - Random number generator voor stream names
- Complete NTFS alternate data stream workflow

#### Anti-Virtual Environment (C)
- CPU/RAM/USB hardware checks met registry access
- ResolutionCallback() en CheckMachineResolution() voor display detection
- ExeDigitsInNameCheck() voor filename analysis
- CheckMachineProcesses() met EnumProcesses
- MouseClicksLogger() met Windows hook implementation

#### Execution Delay (C)
- DelayExecutionVia_WFSO() - WaitForSingleObject implementation
- DelayExecutionVia_MWFMOEx() - MsgWaitForMultipleObjectsEx variant
- DelayExecutionVia_NtWFSO() - Native API version
- DelayExecutionVia_NtDE() - NtDelayExecution syscall implementation

#### API Hammering (C)
- ApiHammering() - I/O-based hammering function
- SECTOSTRESS(i) macro voor seconds-to-cycles conversie
- Background thread implementation met CreateThread

### Belangrijke Beslissingen

#### Module Naming Convention
- Besloten om consistente nummering te gebruiken
- Module 9 krijgt dash-separator: "9.anti-analysis-and-evasion"
- Module 10 krijgt dash-separator: "10-advanced-edr-bypass"
- Old directories worden verwijderd om verwarring te voorkomen

#### Educational Context
- Alle technieken worden gedocumenteerd voor defensive research
- Focus op begrip van attacker methodologies voor betere detectie
- Objectives sections bevatten educational checkpoints, niet offensive tasks
- IoC analysis en detection rules zijn primaire use case

#### Content Structure
- TOC depth: 1 alleen waar nodig (bij scrollbare TOC)
- Emoji consistency per heading level voor visuele alignment
- Nederlandse content met Engelse technische termen
- Callout blocks voor verschillende severity levels

#### Agent Infrastructure
- Dedicated agent voor end-of-session Git workflow
- Systematische 6-phase update protocol
- Always push to v4 branch, never to main
- Session summary als required documentation artifact

### Volgende Stappen

#### Content Development
- [ ] Module 10 (Advanced EDR Bypass) verder uitwerken met EDR hooking techniques
- [ ] Syscall module (Module 8) content voltooien
- [ ] API Hooking module (Module 7) content reviewen en uitbreiden
- [ ] Cross-referenties tussen modules toevoegen voor beter leerpad

#### Testing & Validation
- [ ] Anti-debugging technieken testen tegen x64dbg en WinDbg
- [ ] Self-deletion testen op Windows 10 en Windows 11
- [ ] Anti-VM technieken valideren tegen VMware en VirtualBox
- [ ] API hammering performance metrics verzamelen

#### Documentation
- [ ] Detection rules documenteren voor elke evasion technique
- [ ] IoC analysis sections toevoegen per techniek
- [ ] Forensic artifacts beschrijven die achterblijven
- [ ] Blue team countermeasures documenteren

#### Tooling & Infrastructure
- [ ] Context file sync script verder automatiseren
- [ ] Pre-commit hooks toevoegen voor context file validation
- [ ] Automated tests voor module structure consistency
- [ ] CI/CD pipeline voor documentation builds

### Notities

#### NTFS Specifics
De self-deletion techniek is fascinerend omdat het gebruik maakt van een NTFS-specifieke feature (alternate data streams) die normaal gesproken gebruikt wordt voor metadata storage. Door :$DATA te hernoemen naar een random stream en daarna te verwijderen, kan een binary zichzelf wissen terwijl het nog draait. Dit is mogelijk omdat Windows de file handle in memory houdt ook al is de disk entry verwijderd.

#### Timing Analysis Complexity
De timing-based detection methoden (GetTickCount64, QueryPerformanceCounter) zijn interessant maar hebben inherente limitations door variabele processor speeds en system load. Hardcoded thresholds moeten conservatief gekozen worden om false positives te vermijden, maar dit maakt ze ook makkelijker te omzeilen voor geavanceerde sandboxes.

#### Native API Preference
Er is een duidelijke trend naar het gebruik van native API (Nt* functies) en directe syscalls in plaats van WinAPI functies. Dit komt omdat EDR/AV solutions typisch WinAPI functies hooken, maar native API minder of niet. Dit is een belangrijke escalatie in de cat-and-mouse game tussen offense en defense.

#### Educational Balance
Het is cruciaal om te benadrukken dat deze technieken gedocumenteerd worden voor defensive purposes. Elke techniek die een attacker kan gebruiken, moet een defender kunnen detecteren en counteren. Deze documentatie dient dat doel.

#### Module Progression Logic
De volgorde van modules volgt een logische progressie:
1. Fundamentals (bouwstenen, Windows internals)
2. Payload placement en encryption
3. Execution en injection
4. Obfuscation
5. Process manipulation
6. API hooking
7. Syscalls
8. **Anti-analysis (huidige module)** - Detectie omzeilen
9. **Advanced EDR bypass** - Geavanceerde defensive systems omzeilen

De laatste twee modules vormen de culmination van alle voorgaande kennis.

#### Agent Workflow Benefits
De grimoire-project-update agent zorgt voor:
- Consistente Git workflow zonder menselijke fouten
- Altijd push naar v4 branch
- Systematische context file updates
- Traceerbare session summaries
- Zero information loss tussen sessies

#### Context File Strategy
Drie identieke context files (CLAUDE.md, AGENTS.md, GEMINI.md) zorgen ervoor dat verschillende AI assistants dezelfde guidance krijgen. De sync.sh script verifieert consistency en voorkomt divergence over tijd.
