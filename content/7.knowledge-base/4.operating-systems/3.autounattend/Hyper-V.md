---
Title: Hyper-V
toc:
   depth: 1
---

## 🧠 1. BIOS-instellingen op de **host machine**

Ga naar je BIOS/UEFI (meestal via `DEL` of `F2` tijdens opstarten):

- ✅ **SVM Mode**: Enable
    
- ✅ **SR-IOV**: Enable (optioneel, goed voor networking/virtualisatie)    
    
- ✅ **DOCP/XMP**: Enable om je RAM op 3600MHz te zetten
    
- ❌ **Secure Boot**: Uitschakelen in de **VM** (later stap)
    

## 🖥️ 2. Instellingen op de **host machine** (Hyper-V host)

### 📌 Zet Windows features aan via PowerShell (als admin):

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
```

### 🔎 Check of alles aan staat:

```powershell
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```


### 🧬 3. Hyper-V VM voorbereiden voor nested virtualization

#### 🧩 Zet nested virtualization aan op de VM:

```powershell
Set-VMProcessor -VMName "VM-NAME" -ExposeVirtualizationExtensions $true
```

#### ✅ Check of het aan staat:

```powershell
Get-VMProcessor -VMName "VM-NAME" | Select-Object ExposeVirtualizationExtensions
```

#### 🛑 Schakel **Secure Boot** uit op de VM (optioneel maar aanbevolen):

```powershell
Set-VMFirmware -VMName "VM-NAME" -EnableSecureBoot Off
```


## 💻 3. In de VM zelf (Windows 11)

Open PowerShell als administrator:

### 🧱 WSL & Virtualization features inschakelen:

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

🔁 **Herstart de VM**

### 🔄 Update WSL:

```powershell
wsl --update
```

### 🧪 Check of virtualisatie aanstaat:

```powershell
systeminfo | Select-String -Pattern "Hyper-V", "Virtualization"
```


## 🐧 4. Installeer Ubuntu WSL2 binnen de VM

### 🚀 Installeer Ubuntu:

```powershell
wsl --install -d ubuntu
```

🔁 Wacht tot provisioning klaar is.

### 🧪 Check WSL versie:

```powershell
wsl --status
```


Waar vind ik de Welcome to windows subsystem for linux welcome scherm?
