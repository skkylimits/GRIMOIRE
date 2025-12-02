---
title: Run Commands
description: Lists all ways to run commands
---

---

# **Alle manieren om commands uit te voeren in Windows (gegroepeerd, 40 methods)**

---

# ## 1. Klassieke manieren

### **1. Via Win + R (Run-box)**

Win + R → typ command → Enter
→ Direct uitvoeren.

### **2. Via Startmenu zoeken**

Win → typ command → Enter
→ Start direct.

### **3. Via Command Prompt (cmd.exe)**

Win + R → `cmd`
→ Klassieke shell.

### **4. Via PowerShell**

Win + R → `powershell`
→ Moderne shell.

### **5. Via Windows Terminal**

Open Terminal → kies CMD/PowerShell/WSL
→ Multi-shell execution.

---

# ## 2. Systeemtools die commands uitvoeren

### **6. Via Task Manager → Nieuwe taak**

Ctrl + Shift + Esc → Bestand → Nieuwe taak → typ command
→ Launch als user/admin.

### **7. Via File Explorer adresbalk**

Adresbalk → typ command → Enter
→ Direct uitvoeren.

### **8. Via Win + X menu**

Win + X → Terminal (Admin)
→ Elevated execution.

### **9. Via Task Scheduler**

`taskschd.msc` → nieuwe taak → “Start a program”
→ Automatische executie.

### **10. Via Services (services.msc)**

Starting a service → voert gekoppelde executable uit.

---

# ## 3. Sysinternals & Dev Tools

### **11. PsExec**

```
psexec.exe \\target cmd
```

→ Remote/elevated execution.

### **12. Windows Script Host**

```
wscript.exe vbs
cscript.exe vbs
```

→ Script execution.

### **13. Visual Studio Developer Command Prompt**

Developer CMD → build/execution tools.

### **14. Python/Node/etc.**

Python:

```
os.system("cmd.exe")
```

Node:

```
child_process.exec(...)
```

### **15. VSCode Terminal**

VSCode → Terminal → command uitvoeren.

---

# ## 4. DLL- en Windows-component executors

### **16. rundll32.exe**

```
rundll32 file.dll,EntryPoint
```

### **17. regsvr32.exe**

```
regsvr32 file.dll
```

### **18. mshta.exe**

```
mshta file.hta
```

### **19. msiexec.exe**

```
msiexec /i package.msi
```

### **20. MMC (msc-files)**

`eventvwr.msc`, `compmgmt.msc`, `services.msc`
→ Indirect executie via snap-ins.

### **21. *.cpl bestanden**

`timedate.cpl`
`appwiz.cpl`
→ Control Panel executors.

### **22. control.exe**

```
control printers
control userpasswords2
```

---

# ## 5. WMI & systeeminterfaces

### **23. WMIC**

```
wmic process call create "cmd.exe"
```

### **24. PowerShell WMI/CIM**

`Invoke-WmiMethod`
`Invoke-CimMethod`

### **25. schtasks.exe**

```
schtasks /create ...
schtasks /run ...
```

### **26. at.exe (legacy)**

```
at 12:00 cmd.exe
```

---

# ## 6. Remote execution & scripting

### **27. SSH (Windows-native)**

```
ssh user@host
```

### **28. PowerShell Remoting (WinRM)**

```
Enter-PSSession
Invoke-Command
```

### **29. Batch scripts (.bat/.cmd)**

Dubbelklik of run → sequence execution.

### **30. PowerShell scripts (.ps1)**

```
powershell -File script.ps1
```

### **31. WSH scripts (.vbs/.js)**

```
wscript script.vbs
```

### **32. Snelkoppelingen (.lnk)**

lnk → target: `cmd /c ...`

---

# ## 7. Debuggers & low-level executors

### **33. WinDbg / CDB**

```
windbg -c "command"
```

### **34. PowerShell Add-Type**

```
Add-Type "C# code"
```

→ Compile + run .NET.

### **35. CLR via rundll32**

```
rundll32.exe clr.dll
```

→ Indirect .NET execution.

---

# ## 8. Indirect, startup & boot-level executors

### **36. Registry Run Keys**

```
HKCU\...\Run
```

→ Executie bij login.

### **37. Scheduled tasks (indirect)**

Task → run program bij startup/logon.

### **38. Boot commands (BCDedit)**

```
bcdedit /set testsigning on
```

---

# ## 9. GUI misbruik / alternate entrypoints

### **39. Open/Save dialoog**

Open dialoog → typ `cmd` → Enter
→ Start shell vanuit elke app.

### **40. Explorer zelf (GUI executie)**

Dubbelklik `.exe`, `.bat`, `.cmd`, `.ps1`, `.vbs`
→ Directe uitvoer via GUI.

---
