---
title: Prepare Your Target System
description: Calibrate your neural implants and prime the firewalls—your system's about to pierce the grid.
icon: i-mdi:target
---

Preparing your target system is the first step in a forensic investigation.

## Create Virtual Machine
We will simulate an attack on a Windows 10 VM.

### Download the Windows 10 ISO 

By running the installation media creation tool.

### Create Virtual Machine

In VirtualBox, create a new Windows 10 VM:

#### Name and Operating System

- Name: HUMAN
- Folder: your\vm\directory
- ISO Image: path\to\your\dowloaded\iso
- Type: Microsoft Windows
- Version: Windows 10 (64-bit)
- Skip Unattended Installation: ✅

#### Unattended Install

Skipped

#### Hardware(Minumum)

- Base Memory: 2024 MB
- Processors: 2 CPU

#### Hard Disk

- Create Virtual Hard Disk: 40,00 GB

###  Add VirtualBox Guest Additions:

Once Windows is installed and started up, install VirtualBox Guest additions:

- VirtualBox menu bar -> Devices -> Insert Guest additions image
- Open the optical drive, run the "VBoxWindowsAdditions" executable and follow the installation process including reboot

### Change Security Settings

#### Change the following Windows settings:

- optional*** Enable network discovery (if using shared folders) Control Panel\Network and Internet\Network and Sharing Center\Advanced sharing settings
- Open developer settings -> apply the checkbox to change execution policy to allow scripts to run 

#### Turn off Windows Defender:

- Update & Security -> Windows Security -> Virus & Threat Protection -> Manage Settings
- Turn off all protections. Warning: these will turn on again when you restart your computer. Refer to [BlueCapeSecurity](https://bluecapesecurity.com/prepare-your-target-system/) to turn off Windows Defender permanently.

## Compromise Machine

Open PowerShell as admin and run the following command:

```powershell [PowerShell]
Invoke-WebRequest -Uri "https://github.com/bluecapesecurity/PWF/archive/master.zip" -OutFile "PWF.zip"
```

Extract it.

```powershell [PowerShell]
Expand-Archive -Path "PWF.zip" -DestinationPath "C:\Path\To\Extract\Folder"
```

and navigate to the PWF Sysmon directory.

```powershell [PowerShell]
powershell.exe -ExecutionPolicy bypass -File .\Install-Sysmon.ps1
```

If Sysmon is running and the script executed with no errors, proceed with running the attack script with PowerShell as admin:

```powershell [PowerShell]
powershell.exe -ExecutionPolicy bypass -File .\ART-attack.ps1
```

During the script, Notepad should open with "BOOM: Locked & loaded". Click OK, but don't close the Notepad window!

If you see:

```powershell
Executing test: T1070.004-6 Delete a single file - Windows PowerShell
Done executing test: T1070.004-6 Delete a single file - Windows PowerShell
```

Then you've successfully completed the attack. This is now a compromised machine. Also, a good point to take a snapshot.
