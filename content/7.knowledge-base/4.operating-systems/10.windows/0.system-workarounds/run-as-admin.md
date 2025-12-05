---
title:  Run As Admin
description: Shortcut for the lazy.
---

## Windows + R

1. Press **Windows + R** to open the Run dialog.
2. Type `powershell` and **do not press Enter yet**.
3. Press :kbd{value="CTRL"} + :kbd{value="Shift"} + :kbd{value="Enter"} to launch PowerShell with administrator privileges.

## Search

1. Press the **Windows** key.
2. Type `PowerShell`.
3. Use the arrow keys to highlight **Windows PowerShell**.
4. Press :kbd{value="CTRL"} + :kbd{value="Shift"} + :kbd{value="Enter"}  to run it as administrator.

Hier is precies wat je zoekt:
**hoe je *vanuit een bestaande CMD of PowerShell sessie* kunt omschakelen naar een elevated (admin) shell, zonder eerst alles te sluiten of een nieuw venster te hoeven openen.**

Dit zijn de **betrouwbare**, **moderne**, en **stealthy** manieren.


## CMD → Administrator CMD

### **Methode 1 — via powershell elevation (snelste & cleanste)**

Voer dit uit in **CMD**:

```
powershell -Command "Start-Process cmd -Verb runAs"
```

→ Opent onmiddellijk een **elevated CMD**.


### **Methode 2 — rechtstreeks via Start-Process**

```
powershell Start-Process cmd -Verb runAs
```

(Doet hetzelfde, maar korter.)


### **Methode 3 — via runas (werkt alleen met admin user, niet UAC)**

```
runas /user:Administrator cmd
```

→ Vraagt admin-wachtwoord, **maar doet geen UAC elevation**.
Niet altijd bruikbaar.


## CMD → Administrator PowerShell

```
powershell -Command "Start-Process powershell -Verb runAs"
```

→ Start **PowerShell als admin** vanuit CMD.


## PowerShell → Administrator PowerShell

### **Methode 1 — de standaard manier**

Voer in gewone PowerShell uit:

```
Start-Process powershell -Verb runAs
```

→ Je krijgt direct een **elevated PowerShell**.


### **Methode 2 — naar elevated PowerShell 7 (pwsh)**

```
Start-Process pwsh -Verb runAs
```


## PowerShell → Administrator CMD

```
Start-Process cmd -Verb runAs
```

→ Start een elevated CMD vanuit PowerShell.


## Extra: herstart dezelfde shell als admin (handig!)

Voor zowel CMD als PowerShell kun je dezelfde shell opnieuw in admin-modus starten:

### **CMD → elevated CMD (self-elevate)**

```
powershell -Command "Start-Process cmd -Verb runAs"
```

### **PowerShell → elevated PowerShell (self-elevate)**

```
Start-Process powershell -Verb runAs
```
