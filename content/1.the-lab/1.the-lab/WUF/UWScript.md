---
title: UWScript.ps1
description: A sleek, unattended Windows installation script, automating system setups with precision and style.
---

The provided script is a PowerShell function named `All-Unattended-Settings` that performs a series of modifications to optimize Windows power settings for specific requirements. Here's a detailed explanation of what each part does:

## Software & Apps

test

## Privacy & Security

The PowerShell script `Set-RecommendedPrivacySettings` is designed to apply a set of recommended privacy settings to a Windows system by modifying the Windows Registry. Here's a detailed explanation of what the script does, line by line, grouped into phases:

```sql
+-------------------------------+
|   Check if Not in Specialize Phase |
+-------------------------------+
           |
           v
+---------------------------+
| Is $isSpecializePhase False? |
+---------------------------+
        |      |
       Yes     No
        |       |
+---------------------------+     +------------------------+
| Show Header & Display     |     | Skip Display Message   |
| "Applying Recommended      |     |                        |
| Privacy Settings"          |     +------------------------+
+---------------------------+
           |
           v
+----------------------------------+
| Create Registry Changes         |
| (Activity Feed, Telemetry, etc.) |
+----------------------------------+
           |
           v
+------------------------------------+
| Write Registry Changes to File    |
| ($env:TEMP\Recommended_Privacy_Settings.reg) |
+------------------------------------+
           |
           v
+------------------------------------+
| Import the .reg File Using regedit |
| (Silent Mode, Wait for Completion) |
+------------------------------------+
           |
           v
+---------------------------+
| Check if Not in Specialize Phase |
+---------------------------+
        |      |
       Yes     No
        |       |
+----------------------------+     +-----------------------------+
| Show Header & Display      |     | Skip Display Message        |
| "Recommended Privacy       |     |                             |
| Settings Applied."          |     +-----------------------------+
+----------------------------+
           |
           v
+-----------------------------+
| End of Function              |
| (Privacy settings applied)   |
+-----------------------------+
```

### 1. Display a Header (if not in the specialize phase)
```powershell
if (-not $isSpecializePhase) {
    Show-Header
    Write-Host "Applying Recommended Privacy Settings . . ."
}
```
- **Purpose**: This section checks if the `$isSpecializePhase` variable is not set to `$true`. If it's not in the "specialize" phase, it displays a header message to indicate that the script is applying the recommended privacy settings.
    - `Show-Header`: Likely a function defined elsewhere in the script to display a header (not shown in the provided code).
    - `Write-Host`: Prints the message `"Applying Recommended Privacy Settings . . ."` to the console.

### 2. Create a Multi-Line String Containing Registry Changes
```powershell
$MultilineComment = @"
    Windows Registry Editor Version 5.00

    ; --Privacy and Security Settings--

    ; Disables Activity History
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\System]
    "EnableActivityFeed"=dword:00000000
    "PublishUserActivities"=dword:00000000
    "UploadUserActivities"=dword:00000000

    ; Disables Location Tracking
    [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location]
    "Value"="Deny"

    [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Sensor\Overrides\{BFA794E4-F964-4FDB-90F6-51056BFE4B44}]
    "SensorPermissionState"=dword:00000000

    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\lfsvc\Service\Configuration]
    "Status"=dword:00000000

    [HKEY_LOCAL_MACHINE\SYSTEM\Maps]
    "AutoUpdateEnabled"=dword:00000000

    ; Disables Telemetry
    [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection]
    "AllowTelemetry"=dword:00000000

    ; Disables Telemetry and Feedback Notifications
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DataCollection]
    "AllowTelemetry"=dword:00000000
    "DoNotShowFeedbackNotifications"=dword:00000001

    ; Disables Windows Ink Workspace
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsInkWorkspace]
    "AllowWindowsInkWorkspace"=dword:00000000

    ; Disables the Advertising ID for All Users
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\AdvertisingInfo]
    "DisabledByGroupPolicy"=dword:00000001

    ; Disable Account Info
    [HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\userAccountInformation]
    "Value"="Deny"
"@
```
- **Purpose**: This block creates a multi-line string `$MultilineComment` containing the Registry modifications to apply the privacy settings. These changes are grouped into different categories:
    - **Disabling Activity History**: Prevents Windows from collecting activity data, which includes features like activity history and publishing/uploading user activities.
    - **Disabling Location Tracking**: Prevents Windows from tracking the device's location and prevents location-based features from being used.
    - **Disabling Telemetry**: Prevents Windows from sending diagnostic and telemetry data to Microsoft. It also disables feedback notifications to the user.
    - **Disabling Windows Ink Workspace**: Disables the Windows Ink Workspace feature that allows users to draw and annotate with a pen or stylus.
    - **Disabling Advertising ID**: Disables the advertising ID, which is used by Microsoft to show personalized ads.
    - **Disabling Account Information**: Prevents access to user account information for apps that request it.

### 3. Write the Registry Modifications to a `.reg` File
```powershell
Set-Content -Path "$env:TEMP\Recommended_Privacy_Settings.reg" -Value $MultilineComment -Force
```
- **Purpose**: This line writes the registry changes (stored in `$MultilineComment`) to a `.reg` file located in the system's temporary folder (`$env:TEMP`). The file is named `Recommended_Privacy_Settings.reg`.
    - The `-Force` parameter ensures that the file is written, even if it already exists.

### 4. Import the `.reg` File Using `regedit`
```powershell
Start-Process -FilePath "regedit.exe" -ArgumentList "/S `"$env:TEMP\Recommended_Privacy_Settings.reg`"" -NoNewWindow -Wait
```
- **Purpose**: This command silently imports the `.reg` file into the Windows Registry using the `regedit.exe` utility. The `/S` flag ensures the import is silent (no user prompts or notifications).
    - `-NoNewWindow`: Ensures that `regedit` is not opened in a new window.
    - `-Wait`: Makes the script wait for `regedit` to complete before moving on.

### 5. Display Success Message (if not in the specialize phase)
```powershell
if (-not $isSpecializePhase) {
    Show-Header
    Write-Host "Recommended Privacy Settings Applied." -ForegroundColor Green
    Wait-IfNotSpecialize
}
```
- **Purpose**: This block checks again if the `$isSpecializePhase` variable is not set to `$true`. If not in the specialize phase, it:
    - Displays a header again using `Show-Header` (likely defined elsewhere in the script).
    - Prints `"Recommended Privacy Settings Applied."` in green to indicate that the privacy settings were successfully applied.
    - `Wait-IfNotSpecialize` is called, which is presumably another function that either waits for certain conditions or performs additional tasks, but the exact behavior is not defined in the provided code.

This script helps enforce privacy by disabling activity tracking, telemetry, location tracking, and other privacy-invasive features within Windows, ensuring better user privacy and control over data collection.

::foldable
#title
regedit descriptions

#content
| **Registry Key** | **Location in Windows Settings** | **Description** |
|------------------|----------------------------------|-----------------|
| **Activity History** | `Settings` > `Privacy` > `Activity History` | Controls the recording of user activities. |
| **Location Tracking** | `Settings` > `Privacy` > `Location` | Manages access to location services by apps. |
| **Sensor Permissions** | `Settings` > `Privacy` > `Sensors` | Controls which apps can use sensors. |
| **Location Services** | No direct UI | Affects location and geofencing services. |
| **Maps Auto Update** | `Settings` > `Privacy` > `Location` > `Location History` | Controls whether maps data auto-updates. |
| **Telemetry** | `Settings` > `Privacy` > `Diagnostics & Feedback` | Manages data sent to Microsoft. |
| **Telemetry Notifications** | `Settings` > `Privacy` > `Diagnostics & Feedback` | Controls telemetry feedback notifications. |
| **Windows Ink Workspace** | `Settings` > `Devices` > `Pen & Windows Ink` | Controls whether the Windows Ink Workspace is available. |
| **Advertising ID** | `Settings` > `Privacy` > `General` | Manages whether apps can use your advertising ID. |
| **Account Info** | `Settings` > `Privacy` > `App Permissions` > `Account info` | Controls whether apps can access account information. |

By checking these settings in the **Windows Settings** menu, you can verify whether the registry changes are successfully applied.
::

## Windows Updates 

Let me explain what the `Set-RecommendedUpdateSettings` function does, breaking it down into key phases and actions. This function modifies Windows Update settings through the registry to enforce specific update behaviors.

```sql
+-------------------------------+
|   Check if Not in Specialize Phase |
+-------------------------------+
           |
           v
+---------------------------+
| Is $isSpecializePhase False? |
+---------------------------+
        |      |
       Yes     No
        |       |
+---------------------------+     +------------------------+
| Show Header & Display     |     | Skip Display Message   |
| "Applying Recommended      |     |                        |
| Windows Update Settings"   |     +------------------------+
+---------------------------+
           |
           v
+----------------------------------+
| Create Registry Changes         |
| (Disable Auto Updates, Defer,  |
| Prevent Upgrade, etc.)          |
+----------------------------------+
           |
           v
+------------------------------------+
| Write Registry Changes to File    |
| ($env:TEMP\Recommended_Windows_Update_Settings.reg) |
+------------------------------------+
           |
           v
+------------------------------------+
| Import the .reg File Using regedit |
| (Silent Mode, Wait for Completion) |
+------------------------------------+
           |
           v
+---------------------------+
| Check if Not in Specialize Phase |
+---------------------------+
        |      |
       Yes     No
        |       |
+----------------------------+     +-----------------------------+
| Show Header & Display      |     | Skip Display Message        |
| "Recommended Windows Update|     |                             |
| Settings Applied."          |     +-----------------------------+
+----------------------------+
           |
           v
+-----------------------------+
| End of Function              |
| (Windows Update settings applied) |
+-----------------------------+
```

### **1. Check if Not in Specialize Phase**
```powershell
if (-not $isSpecializePhase) {
    Show-Header
    Write-Host "Applying Recommended Windows Update Settings . . ."
}
```
- **Purpose**: The function first checks if it's not in the "specialize" phase by evaluating the `$isSpecializePhase` variable. 
  - **If true** (it's not in the specialize phase), it:
    - Calls `Show-Header` (presumably a function that displays a header or title).
    - Prints `"Applying Recommended Windows Update Settings . . ."` to the console.
  - **If false**, it skips this step and doesn't display the header or message.


### **2. Create Registry Changes (Multiline String)**
```powershell
$MultilineComment = @"
    Windows Registry Editor Version 5.00

    ; --Windows Update Settings--

    ; Disable Automatic Updates (Only Check for Updates Manually)
    ; Notify Before Downloading and Installing Updates
    ; Enable Notifications for Security Updates Only (Do Not Auto-Download)
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU]
    "NoAutoUpdate"=dword:00000001
    "AUOptions"=dword:00000002
    "AutoInstallMinorUpdates"=dword:00000000

    ; Prevent Automatic Upgrade from Windows 10 22H2 to Windows 11 (Manual Upgrade Still Allowed)
    ; Delay Feature and Quality updates for 1 year from install.
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate]
    "TargetReleaseVersion"=dword:00000001
    "TargetReleaseVersionInfo"="22H2"
    "ProductVersion"="Windows 10"
    "DeferFeatureUpdates"=dword:00000001
    "DeferFeatureUpdatesPeriodInDays"=dword:0000016d
    "DeferQualityUpdates"=dword:00000001
    "DeferQualityUpdatesPeriodInDays"=dword:00000007

    ; Disables allowing downloads from other PCs (Delivery Optimization)
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization]
    "DODownloadMode"=dword:00000000
"@
```
- **Purpose**: Here, the function prepares a multiline string `$MultilineComment` containing the registry changes needed to apply the recommended Windows Update settings.
    - **Disable Automatic Updates**: It disables automatic updates and sets Windows Update to only check for updates manually.
    - **Upgrade Settings**: Prevents an automatic upgrade from Windows 10 22H2 to Windows 11. It also delays feature and quality updates for 1 year.
    - **Delivery Optimization**: Disables downloading updates from other PCs, which is part of Windows' Delivery Optimization feature.


### **3. Write Registry Changes to a `.reg` File**
```powershell
Set-Content -Path "$env:TEMP\Recommended_Windows_Update_Settings.reg" -Value $MultilineComment -Force
```
- **Purpose**: The function writes the registry changes (stored in `$MultilineComment`) to a `.reg` file located in the temporary folder (`$env:TEMP`).
  - **Path**: `$env:TEMP\Recommended_Windows_Update_Settings.reg`
  - The `-Force` flag ensures that the file is written even if it already exists.


### **4. Import the `.reg` File Using `regedit`**
```powershell
Regedit.exe /S "$env:TEMP\Recommended_Windows_Update_Settings.reg"
```
- **Purpose**: This line runs the `regedit.exe` utility to import the `.reg` file created in the previous step.
  - The `/S` flag ensures that the import happens silently, without requiring user confirmation.
  - The settings are applied to the Windows registry.


### **5. Check if Not in Specialize Phase Again**
```powershell
if (-not $isSpecializePhase) {
    Show-Header
    Write-Host "Recommended Windows Update Settings Applied." -ForegroundColor Green
    Wait-IfNotSpecialize
}
```

- **Purpose**: The function checks again if it's not in the specialize phase.
  - **If true**:
    - Calls `Show-Header` (likely displaying a header indicating the settings have been applied).
    - Prints `"Recommended Windows Update Settings Applied."` in green to inform the user that the settings were successfully applied.
    - Calls the `Wait-IfNotSpecialize` function, which is presumably a custom function to either pause the script or handle certain tasks, but the exact behavior is not provided.

### **6. End of Function**
- **Purpose**: The function ends, having successfully applied the Windows Update settings based on the registry modifications.

## Registry

Let's break down the `Set-RecommendedHKLMRegistry` function and explain each part of it, grouping it into logical phases where needed. This function is responsible for modifying the Windows registry to apply a series of recommended settings, typically for system optimization, privacy, and security improvements.

```sql
+-------------------------------------+
|        Create Registry Keys        |
| (Take Ownership, Windows Features, |
| Security, etc.)                    |
+-------------------------------------+
               |
               v
+-------------------------------------------+
| Write Registry Changes to File           |
| ($env:TEMP\Optimize_LocalMachine_Registry.reg) |
+-------------------------------------------+
               |
               v
+------------------------------------------+
| Modify Registry File Content            |
| (Replace `?` with `$` for proper parsing)|
+------------------------------------------+
               |
               v
+------------------------------------------+
| Import the .reg File Using regedit      |
| (Silent Mode, Wait for Completion)      |
+------------------------------------------+
               |
               v
+-------------------------------------+
| Show Success Message               |
| "Recommended Local Machine Registry|
| Settings Applied"                   |
+-------------------------------------+
               |
               v
+-------------------------------------+
| Wait If Not in Specialize Phase     |
+-------------------------------------+
               |
               v
+-------------------------------------+
| End of Function                    |
| (Local machine registry settings   |
| applied successfully)               |
+-------------------------------------+
```

### **1. Preparing the Registry Changes**
```powershell
$MultilineComment = @"
    $MultilineComment = @"
        Windows Registry Editor Version 5.00

        ; Adds "Take Ownership" to the Right Click Context Menu for All Users
                        
        [-HKEY_CLASSES_ROOT\*\shell\TakeOwnership]
        [-HKEY_CLASSES_ROOT\*\shell\runas]
                
        [HKEY_CLASSES_ROOT\*\shell\TakeOwnership]
        @="Take Ownership"
        "Extended"=-
        "HasLUAShield"=""
        "NoWorkingDirectory"=""
        "NeverDefault"=""
                
        [HKEY_CLASSES_ROOT\*\shell\TakeOwnership\command]
        @="powershell -windowstyle hidden -command \"Start-Process cmd -ArgumentList '/c takeown /f \\\"%1\\\" && icacls \\\"%1\\\" /grant *S-1-3-4:F /t /c /l & pause' -Verb runAs\""
        "IsolatedCommand"= "powershell -windowstyle hidden -command \"Start-Process cmd -ArgumentList '/c takeown /f \\\"%1\\\" && icacls \\\"%1\\\" /grant *S-1-3-4:F /t /c /l & pause' -Verb runAs\""
                    
        [HKEY_CLASSES_ROOT\Directory\shell\TakeOwnership]
        @="Take Ownership"
        "AppliesTo"="NOT (System.ItemPathDisplay:=\"C:\\Users\" OR System.ItemPathDisplay:=\"C:\\ProgramData\" OR System.ItemPathDisplay:=\"C:\\Windows\" OR System.ItemPathDisplay:=\"C:\\Windows\\System32\" OR System.ItemPathDisplay:=\"C:\\Program Files\" OR System.ItemPathDisplay:=\"C:\\Program Files (x86)\")"
        "Extended"=-
        "HasLUAShield"=""
        "NoWorkingDirectory"=""
        "Position"="middle"
                
        [HKEY_CLASSES_ROOT\Directory\shell\TakeOwnership\command]
        @="powershell -windowstyle hidden -command \"$Y = ($null | choice).Substring(1,1); Start-Process cmd -ArgumentList ('/c takeown /f \\\"%1\\\" /r /d ' + $Y + ' && icacls \\\"%1\\\" /grant *S-1-3-4:F /t /c /l /q & pause') -Verb runAs\""
        "IsolatedCommand"="powershell -windowstyle hidden -command \"$Y = ($null | choice).Substring(1,1); Start-Process cmd -ArgumentList ('/c takeown /f \\\"%1\\\" /r /d ' + $Y + ' && icacls \\\"%1\\\" /grant *S-1-3-4:F /t /c /l /q & pause') -Verb runAs\""
                        
        [HKEY_CLASSES_ROOT\Drive\shell\runas]
        @="Take Ownership"
        "Extended"=-
        "HasLUAShield"=""
        "NoWorkingDirectory"=""
        "Position"="middle"
        "AppliesTo"="NOT (System.ItemPathDisplay:=\"C:\\\")"
                
        [HKEY_CLASSES_ROOT\Drive\shell\runas\command]
        @="cmd.exe /c takeown /f \"%1\\\" /r /d y && icacls \"%1\\\" /grant *S-1-3-4:F /t /c & Pause"
        "IsolatedCommand"="cmd.exe /c takeown /f \"%1\\\" /r /d y && icacls \"%1\\\" /grant *S-1-3-4:F /t /c & Pause"

        ; --Application and Feature Restrictions--

        ; Disable Windows Copilot system-wide
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsCopilot]
        "TurnOffWindowsCopilot"=dword:00000001

        ; Prevents Dev Home Installation
        [-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\Orchestrator\UScheduler_Oobe\DevHomeUpdate]

        ; Prevents New Outlook for Windows Installation
        [-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\Orchestrator\UScheduler_Oobe\OutlookUpdate]

        ; Prevents Chat Auto Installation and Removes Chat Icon
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Communications]
        "ConfigureChatAutoInstall"=dword:00000000

        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Windows Chat]
        "ChatIcon"=dword:00000003

        ; Disables Bitlocker Auto Encryption on Windows 11 24H2 and Onwards
        [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\BitLocker]
        "PreventDeviceEncryption"=dword:00000001

        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\EnhancedStorageDevices]
        "TCGSecurityActivationDisabled"=dword:00000001

        ; Disables Cortana
        [HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\Windows Search]
        "AllowCortana"=dword:00000000

        ; Set Registry Keys to Disable Wifi-Sense
        [HKEY_LOCAL_MACHINE\Software\Microsoft\PolicyManager\default\WiFi\AllowWiFiHotSpotReporting]
        "Value"=dword:00000000

        [HKEY_LOCAL_MACHINE\Software\Microsoft\PolicyManager\default\WiFi\AllowAutoConnectToWiFiSenseHotspots]
        "Value"=dword:00000000

        ; Disable Tablet Mode
        ; Always go to desktop mode on sign-in
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\ImmersiveShell]
        "TabletMode"=dword:00000000
        "SignInMode"=dword:00000001

        ; Disable Xbox GameDVR
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\GameDVR]
        "AllowGameDVR"=dword:00000000

        ; Disables OneDrive Automatic Backups of Important Folders (Documents, Pictures etc.)
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\OneDrive]
        "KFMBlockOptIn"=dword:00000001

        ; Disables the "Push To Install" feature in Windows
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\PushToInstall]
        "DisablePushToInstall"=dword:00000001

        ; Disables Windows Consumer Features Like App Promotions etc.
        ; Disables Consumer Account State Content
        ; Disables Cloud Optimized Content
        [HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\CloudContent]
        "DisableWindowsConsumerFeatures"=dword:00000000
        "DisableConsumerAccountStateContent"=dword:00000001
        "DisableCloudOptimizedContent"=dword:00000001

        ; Blocks the "Allow my organization to manage my device" and "No, sign in to this app only" pop-up message
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin]
        "BlockAADWorkplaceJoin"=dword:00000001

        ; --Start Menu Customization--
        ; Removes All Pinned Apps from the Start Menu to Clean it Up
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\current\device\Start]
        "ConfigureStartPins"="{ \"pinnedList\": [] }"
        "ConfigureStartPins_ProviderSet"=dword:00000001
        "ConfigureStartPins_WinningProvider"="B5292708-1619-419B-9923-E5D9F3925E71"

        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\providers\B5292708-1619-419B-9923-E5D9F3925E71\default\Device\Start]
        "ConfigureStartPins"="{ \"pinnedList\": [] }"
        "ConfigureStartPins_LastWrite"=dword:00000001

        ; --File System Settings--
        ; Enable Long File Paths with Up to 32,767 Characters
        [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem]
        "LongPathsEnabled"=dword:00000001

        ; --Multimedia and Gaming Performance--
        ; Gives Multimedia Applications like Games and Video Editing a Higher Priority
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile]
        "SystemResponsiveness"=dword:00000000
        "NetworkThrottlingIndex"=dword:0000000a

        ; Gives Graphics Cards a Higher Priority for Gaming
        ; Gives the CPU a Higher Priority for Gaming
        ; Gives Games a higher priority in the system's scheduling
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games]
        "GPU Priority"=dword:00000008
        "Priority"=dword:00000006
        "Scheduling Category"="High"

        ; disable startup sound
        ; [HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\BootAnimation]
        ; "DisableStartupSound"=dword:00000001

        ; [HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\EditionOverrides]
        ; "UserSetting_DisableStartupSound"=dword:00000001

        ; disable device installation settings
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Device Metadata]
        "PreventDeviceMetadataFromNetwork"=dword:00000001

        ; NETWORK AND INTERNET
        ; disable allow other network users to control or disable the shared internet connection
        [HKEY_LOCAL_MACHINE\System\ControlSet001\Control\Network\SharedAccessConnection]
        "EnableControl"=dword:00000000

        ; SYSTEM AND SECURITY
        ; adjust for best performance of programs
        [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\PriorityControl]
        "Win32PrioritySeparation"=dword:00000026

        ; disable remote assistance
        [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Remote Assistance]
        "fAllowToGetHelp"=dword:00000000

        ; TROUBLESHOOTING
        ; disable automatic maintenance
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\Maintenance]
        "MaintenanceDisabled"=dword:00000001

        ; SECURITY AND MAINTENANCE
        ; disable report problems
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Windows Error Reporting]
        "Disabled"=dword:00000001

        ; ACCOUNTS
        ; disable use my sign in info after restart
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
        "DisableAutomaticRestartSignOn"=dword:00000001

        ; APPS
        ; disable archive apps 
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Appx]
        "AllowAutomaticAppArchiving"=dword:00000000

        ; PERSONALIZATION
        ; Hides the Meet Now Button on the Taskbar
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer]
        "HideSCAMeetNow"=dword:00000001
        "NoStartMenuMFUprogramsList"=-
        "NoInstrumentation"=-

        ; remove windows widgets from taskbar
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Dsh] 
        "AllowNewsAndInterests"=dword:00000000

        ; remove news and interests from Taskbar
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Windows Feeds]
        "EnableFeeds"=dword:00000000

        ; SYSTEM
        ; turn on hardware accelerated gpu scheduling
        [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers]
        "HwSchMode"=dword:00000002

        ; disable storage sense
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\StorageSense]
        "AllowStorageSenseGlobal"=dword:00000000

        ; --OTHER--
        ; Disable update Microsoft Store apps automatically
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsStore]
        "AutoDownload"=dword:00000002

        ; UWP APPS
        ; disable background apps
        [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\AppPrivacy]
        "LetAppsRunInBackground"=dword:00000002

        ; disable widgets
        [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\NewsAndInterests\AllowNewsAndInterests]
        "value"=dword:00000000

        ; NVIDIA
        ; enable old nvidia sharpening
        ; [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\nvlddmkm\FTS]
        "EnableGR535"=dword:00000000

        ; OTHER
        ; remove 3d objects
        ; [-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}]
        ; [-HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}]

        ; Remove Home Folder
        [-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}]

        [HKEY_USERS\.DEFAULT\Control Panel\Mouse]
        "MouseSpeed"="0"
        "MouseThreshold1"="0"
        "MouseThreshold2"="0"
"@
```
::foldable
#title
regedit description

#content
**1. System and Application Restrictions**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Disable Windows Copilot** | Disables Windows Copilot system-wide. | **Disable**: Prevents the use of Windows Copilot for assistance or guidance. |
| **Prevent Dev Home Installation** | Prevents the installation of Dev Home. | **Disable**: Stops the automatic installation of Dev Home, useful for avoiding unnecessary bloat. |
| **Prevent New Outlook for Windows Installation** | Prevents the installation of the new Outlook app. | **Disable**: Prevents the installation of the new Outlook, ensuring users continue to use the classic app. |
| **Prevent Chat Auto Installation and Removes Chat Icon** | Disables automatic installation of Chat (Microsoft Teams) and removes the Chat icon. | **Disable**: Removes Microsoft Teams and the Chat icon, reducing system clutter. |
| **Disable Bitlocker Auto Encryption** | Disables Bitlocker auto-encryption on Windows 11 24H2 and onwards. | **Disable**: Prevents automatic encryption of devices, leaving encryption management in the hands of the user. |
| **Disable Cortana** | Disables Cortana completely. | **Disable**: Turns off Cortana, improving privacy and system performance by eliminating unnecessary background services. |
| **Disable Widgets** | Disables the News and Interests feature and removes widgets. | **Disable**: Removes the News and Interests feature, decluttering the taskbar and enhancing focus. |
| **Disable Wi-Fi Sense** | Disables Wi-Fi hotspot reporting and auto-connect to Wi-Fi Sense hotspots. | **Disable**: Prevents automatic connections to open networks and sharing hotspot data with others. |
| **Disable Tablet Mode** | Forces Windows to stay in Desktop Mode, even on touch devices. | **Disable**: Ensures that Windows always operates in Desktop Mode for users who don't require Tablet Mode. |
| **Disable Xbox GameDVR** | Disables the GameDVR feature for gaming recording. | **Disable**: Stops Xbox GameDVR to free up system resources, beneficial for users not needing game recording features. |
| **Disable OneDrive Automatic Backups** | Prevents OneDrive from automatically backing up important folders. | **Disable**: Disables OneDrive’s automatic backup to prevent unwanted syncing of important files. |
| **Disable Push To Install** | Stops the automatic installation of apps via the "Push to Install" feature. | **Disable**: Prevents the automatic installation of apps, providing the user with more control. |
| **Disable Windows Consumer Features** | Disables consumer features like app promotions, cloud content, and consumer account content. | **Disable**: Removes consumer-centric features such as advertisements and unnecessary cloud-based content. |
| **Block "Allow My Organization to Manage My Device" Pop-Up** | Stops the "Allow my organization to manage my device" pop-up during setup. | **Disable**: Prevents unwanted prompts during device setup, making it less intrusive for personal or non-managed devices. |

**2. UI and Desktop Customization**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Remove Pinned Apps from Start Menu** | Removes all pinned apps from the Start Menu for a clean look. | **Enable**: Cleans up the Start Menu, making it more minimalistic and easier to navigate. |
| **Hide Meet Now Button on Taskbar** | Hides the Meet Now button from the taskbar. | **Enable**: Removes the Meet Now button, streamlining the taskbar for essential tools. |
| **Remove Windows Widgets from Taskbar** | Disables the News and Interests feature on the taskbar. | **Enable**: Simplifies the taskbar by removing unnecessary widgets, reducing distractions. |
| **Remove News and Interests from Taskbar** | Stops news and weather updates from appearing on the taskbar. | **Enable**: Disables the News and Interests feature, making the taskbar more focused on essential features. |
| **Remove 3D Objects** | Removes the 3D Objects folder from File Explorer. | **Enable**: Cleans up File Explorer by removing unnecessary folders that are rarely used. |
| **Remove Home Folder** | Removes the Home folder from the desktop and File Explorer. | **Enable**: Cleans up the desktop and File Explorer, improving the user interface. |
| **Remove Gallery Folder** | Removes the Gallery folder from the desktop and File Explorer. | **Enable**: Removes an unused folder, streamlining File Explorer and the desktop. |
| **Mouse Speed Settings** | Changes mouse speed and sensitivity settings. | **Enable**: Adjusts the mouse settings for better control and sensitivity, improving user experience. |

**3. Context Menu Customization**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Take Ownership** | Adds "Take Ownership" to the right-click context menu for files, directories, and drives. | **Enable**: Provides an easy way to take ownership of files, directories, and drives for administrative purposes. |


**4. File and System Settings**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Enable Long File Paths** | Enables support for long file paths, up to 32,767 characters. | **Enable**: Ensures compatibility with applications that require longer file paths. |
| `**Disable Startup Sound**` | Disables the startup sound that plays during system boot. | **Disable**: Prevents any sound from playing at startup, making the boot process quieter. |
| **Disable Device Installation Settings** | Prevents device metadata from being downloaded from the network. | **Disable**: Reduces unnecessary network traffic by stopping the download of device metadata. |

**5. Multimedia, Gaming, and Advanced Performance**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Multimedia and Gaming Performance** | Prioritizes multimedia applications and games for better performance. | **Enable**: Improves performance for multimedia apps, games, and video editing by giving them higher priority. |
| **Adjust for Best Performance of Programs** | Improves system performance for programs by adjusting system priorities. | **Enable**: Boosts the responsiveness of system programs, ensuring better performance. |
| **Enable Hardware Accelerated GPU Scheduling** | Enables hardware-accelerated GPU scheduling for better gaming performance. | **Enable**: Offloads certain tasks to the GPU, improving gaming and graphic-intensive applications' performance. |
| **Give Graphics Cards a Higher Priority for Gaming** | Improves gaming performance by prioritizing graphics cards. | **Enable**: Optimizes the system to use the GPU more efficiently for gaming. |
| **Give CPU a Higher Priority for Gaming** | Improves gaming performance by prioritizing the CPU. | **Enable**: Ensures that the CPU gets more system resources to improve gaming performance. |

**6. Privacy and Security**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Disable Remote Assistance** | Disables the ability for others to remotely assist your system. | **Disable**: Stops remote assistance, improving security by not allowing others to access your system remotely. |
| **Disable Use My Sign In Info After Restart** | Prevents automatic sign-in after restart for improved security. | **Disable**: Enhances security by requiring manual sign-in after a system restart. |
| **Disable Allow Other Network Users to Control Internet Connection** | Stops other users from controlling or disabling shared internet connections. | **Disable**: Ensures that users have complete control over their internet connection without interference. |
| **Disable Archive Apps** | Stops automatic archiving of apps. | **Disable**: Prevents the system from archiving apps in the background, giving the user control over app management. |
| **Disable Background Apps** | Prevents UWP apps from running in the background unless explicitly needed. | **Disable**: Frees up system resources by stopping apps from running when they are not actively being used. |

**7. System Maintenance and Troubleshooting**
| **Name** | **Description** | **Reason** |
|----------|-----------------|-----------|
| **Disable Automatic Maintenance** | Prevents automatic maintenance tasks like disk cleanup or updates. | **Disable**: Gives the user control over when maintenance tasks are performed, improving system stability. |
| **Disable Storage Sense** | Disables Storage Sense, preventing automatic cleanup of disk space. | **Disable**: Stops the automatic cleanup of files by Storage Sense, giving users manual control over storage management. |
| **Enable Update Microsoft Store Apps Automatically** | Enables automatic updates for apps in the Microsoft Store. | **Enable**: Keeps Microsoft Store apps up-to-date automatically, ensuring the latest features and security updates. |
| **Disable Windows Error Reporting** | Stops sending error reports to Microsoft. |
::


### **2. Writing Registry Changes to a `.reg` File**
```powershell
Set-Content -Path "$env:TEMP\Optimize_LocalMachine_Registry.reg" -Value $MultilineComment -Force
```
- **Purpose**: This line writes the registry changes (stored in `$MultilineComment`) to a `.reg` file, specifically located in the **temporary folder** (`$env:TEMP`), with the name `Optimize_LocalMachine_Registry.reg`.
  - The `-Force` flag ensures that the file is created even if it already exists.

### **3. Modify the Registry File Content**
```powershell
$path = "$env:TEMP\Optimize_LocalMachine_Registry.reg"
(Get-Content $path) -replace "\?", "$" | Out-File $path
```
- **Purpose**: This block modifies the `.reg` file content:
  - It reads the content of the registry file using `Get-Content`.
  - It performs a **replacement** on the content: every occurrence of the `?` character is replaced with `$` (likely intended to escape or alter certain characters for proper registry parsing).
  - The modified content is then written back to the same `.reg` file using `Out-File`.

### **.4 Import the `.reg` File Using `regedit`**
```powershell
Regedit.exe /S "$env:TEMP\Optimize_LocalMachine_Registry.reg"
```
- **Purpose**: This line invokes the **`regedit.exe`** tool to import the `.reg` file silently using the `/S` flag.
  - The `/S` flag ensures that the registry import is **silent**, meaning no prompts will appear for the user during the process.
  - The `.reg` file will be applied to the system's registry, making the necessary changes.

### **5. Display Success Message**
```powershell
Show-Header
Write-Host "Recommended Local Machine Registry Settings Applied." -ForegroundColor Green
```
- **Purpose**: After the registry changes have been successfully applied, this block:
  - Calls the `Show-Header` function (presumably defined elsewhere in the script) to display a header (likely to indicate the task is complete).
  - Uses `Write-Host` to print the message **"Recommended Local Machine Registry Settings Applied."** in green, confirming that the changes were successfully applied.

### **6. Wait Until Not in Specialize Phase**
```powershell
Wait-IfNotSpecialize
```
- **Purpose**: This line calls the `Wait-IfNotSpecialize` function (which is presumably defined elsewhere in the script). The exact behavior of this function is unknown, but it likely:
  - Waits for a specific condition or event to occur (possibly ensuring that the system is not in the "specialize" phase before proceeding or finishing).
  - Ensures that the settings are applied after a particular stage of system configuration, like during imaging or customization in deployment.


This function is aimed at configuring various system settings, optimizing them for specific use cases (like system performance, security, privacy, and personalization), and providing a cleaner, more controlled Windows environment.

## Tasks & Services

This function adjusts the startup behavior of Windows services for optimized system performance and resource management.

- **Optimized Boot Time:** Reduces the number of services starting automatically.
- **Improved Performance:** Frees up system resources for user applications.
- **Secure Environment:** Disables potentially risky services like **RemoteRegistry**.
- **Privacy**: Some services, like telemetry, send data to Microsoft.

```sql
+---------------------------------------------+
|        Initialize Lists of Services        |
| ($disabledServices and $manualServices)    |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Set Services in Disabled List to Disabled  |
| (Iterate over $disabledServices)           |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Set Services in Manual List to Manual      |
| (Iterate over $manualServices)             |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Show Success Message                      |
| "Service startup types updated successfully"|
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Wait If Not in Specialize Phase            |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| End of Function                           |
| (Service startup types applied successfully)|
+---------------------------------------------+
```


### **1. Disabled Task**

```powershell
# Define the list of scheduled tasks to disable
    $scheduledTasks = @(
        "Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser",
        "Microsoft\Windows\Application Experience\ProgramDataUpdater",
        "Microsoft\Windows\Autochk\Proxy",
        "Microsoft\Windows\Customer Experience Improvement Program\Consolidator",
        "Microsoft\Windows\Customer Experience Improvement Program\UsbCeip",
        "Microsoft\Windows\DiskDiagnostic\Microsoft-Windows-DiskDiagnosticDataCollector",
        "Microsoft\Windows\Feedback\Siuf\DmClient",
        "Microsoft\Windows\Feedback\Siuf\DmClientOnScenarioDownload",
        "Microsoft\Windows\Windows Error Reporting\QueueReporting",
        "Microsoft\Windows\Application Experience\MareBackup",
        "Microsoft\Windows\Application Experience\StartupAppTask",
        "Microsoft\Windows\Application Experience\PcaPatchDbTask",
        "Microsoft\Windows\Maps\MapsUpdateTask"
    )

    $successCount = 0
    foreach ($task in $scheduledTasks) {
        try {
            # Disable the task without wildcards
            schtasks /Change /TN $task /Disable 2>&1 | Out-Null
            $successCount++
        }
        catch {
            # Silently continue if a task fails
            continue
        }
    }
    
    Show-Header
    Write-Host "Successfully disabled unneeded scheduled tasks." -ForegroundColor Green
    Wait-IfNotSpecialize
```

| Task Name                                                                                      | Reason to Disable                                                                                              |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser                      | Collects system compatibility data with new Windows versions. Not needed for users who do not upgrade frequently. |
| Microsoft\Windows\Application Experience\ProgramDataUpdater                                      | Updates program data related to application compatibility. Disabling can reduce background tasks.               |
| Microsoft\Windows\Autochk\Proxy                                                                  | Used for disk error checking during startup. Disabling might reduce unnecessary startup checks if disk issues are not frequent. |
| Microsoft\Windows\Customer Experience Improvement Program\Consolidator                          | Collects user data for the Customer Experience Improvement Program (CEIP). Disabling helps to reduce background telemetry. |
| Microsoft\Windows\Customer Experience Improvement Program\UsbCeip                               | Collects data on USB device usage for CEIP. Reducing telemetry data and background processes.                   |
| Microsoft\Windows\DiskDiagnostic\Microsoft-Windows-DiskDiagnosticDataCollector                 | Collects disk diagnostic data, which is not useful for users who do not encounter disk problems.                |
| Microsoft\Windows\Feedback\Siuf\DmClient                                                        | Client for gathering feedback about Windows experience. Disabling reduces participation in CEIP.                |
| Microsoft\Windows\Feedback\Siuf\DmClientOnScenarioDownload                                       | Collects data when downloading new scenarios for feedback. Reducing unnecessary background activity.            |
| Microsoft\Windows\Windows Error Reporting\QueueReporting                                         | Queues error reporting data to be sent to Microsoft. Disabling can protect user privacy and reduce network activity. |
| Microsoft\Windows\Application Experience\MareBackup                                             | Creates backups related to application experience. Disabling can reduce unnecessary backup tasks for users not using this feature. |
| Microsoft\Windows\Application Experience\StartupAppTask                                         | Runs a task at startup related to application experience. Not essential for most users and adds unnecessary startup delay. |
| Microsoft\Windows\Application Experience\PcaPatchDbTask                                         | Runs a task related to system diagnostics. Disabling can reduce background processes without affecting system performance. |
| Microsoft\Windows\Maps\MapsUpdateTask                                                           | Handles maps updates in the background. Disabling may reduce unnecessary background activity for users not using maps. |


### **2. Identify Services**

#### **Disabled Services**
- Includes services that are either not required for most users or pose potential performance or security issues.
  
  **List:**
  ```powershell
  $disabledServices = @(
    'AJRouter', 'AppVClient', 'AssignedAccessManagerSvc', 
    'DiagTrack', 'DialogBlockingService', 'NetTcpPortSharing',
    'RemoteAccess', 'RemoteRegistry', 'shpamsvc', 
    'ssh-agent', 'tzautoupdate', 'uhssvc',
    'UevAgentService'
	)
  ```
  
::foldable
#title 
Service Description

#content
#### **Service Descriptions and Recommendations**

| **Service**                  | **Description**                                                                                                     | **Recommendation**                     |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **AJRouter**                 | AllJoyn Router Service, used for communication between IoT devices.                                                | Disable unless using IoT features.     |
| **AppVClient**               | Application Virtualization Client, supports virtualized applications.                                               | Disable unless using App-V applications. |
| **AssignedAccessManagerSvc** | Enables "Assigned Access" mode for user accounts.                                                                  | Disable unless using kiosk mode.       |
| **DiagTrack**                | Connected User Experiences and Telemetry, collects diagnostics and usage data.                                      | Disable for privacy concerns.          |
| **DialogBlockingService**    | Manages blocking of dialog popups during certain system operations.                                                 | Disable unless troubleshooting.        |
| **NetTcpPortSharing**        | Allows multiple applications to share TCP ports.                                                                   | Disable unless required by applications. |
| **RemoteAccess**             | Provides support for remote network connections.                                                                   | Disable unless using remote networks or VPN. |
| **RemoteRegistry**           | Allows remote registry access for management.                                                                      | Disable for security reasons.          |
| **shpamsvc**                 | Shell Hardware Detection, handles media change notifications (e.g., for removable drives).                         | Leave Automatic for drive notifications. |
| **ssh-agent**                | Manages SSH keys for remote access.                                                                                 | Disable unless using SSH features.     |
| **tzautoupdate**             | Updates the system time zone automatically.                                                                        | Leave Automatic for time accuracy.     |
| **uhssvc**                   | Universal Home Shell, related to home automation.                                                                  | Disable unless using home automation.  |
| **UevAgentService**          | Manages User Experience Virtualization (UE-V) for settings synchronization.                                         | Disable unless using UE-V.             |
::



#### **Manual Services**
- Services that may occasionally be needed but don’t require automatic startup.

  **List:**
  ```powershell
  $manualServices = @(
    'ALG', 'AppIDSvc', 'AppMgmt', 'AppReadiness', 'AppXSvc', 'Appinfo',
    'AxInstSV', 'BDESVC', 'BITS', 'BTAGService', 'BcastDVRUserService_*',
    'Browser', 'CDPSvc', 'CDPUserSvc_*', 'COMSysApp', 'CaptureService_*',
    'CertPropSvc', 'ClipSVC', 'ConsentUxUserSvc_*', 'CscService', 'DcpSvc',
    'DevQueryBroker', 'DevicePickerUserSvc_*', 'DevicesFlowUserSvc_*', 
    'DisplayEnhancementService', 'DmEnrollmentSvc', 'DoSvc', 'DsSvc', 'DsmSvc',
    'EFS', 'EapHost', 'EntAppSvc', 'FDResPub', 'Fax', 'FrameServer',
    'FrameServerMonitor', 'GraphicsPerfSvc', 'HomeGroupListener', 
    'HomeGroupProvider', 'HvHost', 'IEEtwCollectorService', 'IKEEXT',
    'InstallService', 'InventorySvc', 'IpxlatCfgSvc', 'KtmRm', 'LicenseManager',
    'LxpSvc', 'MSDTC', 'MSiSCSI', 'MapsBroker', 'McpManagementService', 
    'MessagingService_*', 'MicrosoftEdgeElevationService', 
    'MixedRealityOpenXRSvc', 'MsKeyboardFilter', 'NPSMSvc_*', 'NaturalAuthentication',
    'NcaSvc', 'NcbService', 'NcdAutoSetup', 'Netman', 'NgcCtnrSvc', 'NgcSvc',
    'NlaSvc', 'P9RdrService_*', 'PNRPAutoReg', 'PNRPsvc', 'PcaSvc', 'PeerDistSvc',
    'PenService_*', 'PerfHost', 'PhoneSvc', 'PimIndexMaintenanceSvc_*',
    'PolicyAgent', 'PrintNotify', 'PrintWorkflowUserSvc_*', 'PushToInstall',
    'RasAuto', 'RasMan', 'RetailDemo', 'RmSvc', 'RpcLocator', 'SCPolicySvc',
    'SCardSvr', 'SDRSVC', 'SEMgrSvc', 'SecurityHealthService', 
    'SensorDataService', 'SensorService', 'SensrSvc', 'SessionEnv', 
    'SharedAccess', 'SharedRealitySvc', 'SmsRouter', 'SstpSvc', 
    'StateRepository', 'StiSvc', 'StorSvc', 'TabletInputService', 'TapiSrv',
    'TextInputManagementService', 'TieringEngineService', 'TimeBroker',
    'TimeBrokerSvc', 'TokenBroker', 'TroubleshootingSvc', 'TrustedInstaller',
    'UI0Detect', 'UdkUserSvc_*', 'UmRdpService', 'UnistoreSvc_*', 
    'UserDataSvc_*', 'UsoSvc', 'VSS', 'VacSvc', 'W32Time', 'WEPHOSTSVC',
    'WFDSConMgrSvc', 'WMPNetworkSvc', 'WManSvc', 'WPDBusEnum', 'WSService',
    'WSearch', 'WaaSMedicSvc', 'WalletService', 'WarpJITSvc', 'WbioSrvc',
    'WcsPlugInService', 'WdiServiceHost', 'WdiSystemHost', 'WebClient', 'Wecsvc',
    'WerSvc', 'WiaRpc', 'WinHttpAutoProxySvc', 'WinRM', 'WpcMonSvc', 
    'WpnService', 'WwanSvc', 'autotimesvc', 'bthserv', 'camsvc', 'cbdhsvc_*',
    'cloudidsvc', 'dcsvc', 'defragsvc', 'diagnosticshub.standardcollector.service',
    'diagsvc', 'dmwappushservice', 'dot3svc', 'edgeupdate', 'edgeupdatem', 
    'embeddedmode', 'fdPHost', 'fhsvc', 'hidserv', 'icssvc', 'lfsvc', 
    'lltdsvc', 'lmhosts', 'netprofm', 'p2pimsvc', 'p2psvc', 
    'perceptionsimulation', 'pla', 'seclogon', 'smphost', 'spectrum', 
    'sppsvc', 'svsvc', 'swprv', 'upnphost', 'vm3dservice', 
    'vmicguestinterface', 'vmicheartbeat', 'vmickvpexchange', 'vmicrdv', 
    'vmicshutdown', 'vmictimesync', 'vmicvmsession', 'vmicvss', 'wbengine', 
    'wcncsvc', 'webthreatdefsvc', 'wercplsupport', 'wisvc', 'wlidsvc', 
    'wlpasvc', 'wmiApSrv', 'workfolderssvc', 'wuauserv', 'wudfsvc'
    )
  ```

::foldable
#title 
Service Description

#content
#### **Network and Internet Services**

| **Service**         | **Description**                                                                                                     | **Recommendation**                                    |
|---------------------|---------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| ALG                 | Application Layer Gateway service for Internet Connection Sharing.                                                  | Disable unless using legacy ICS tasks.                |
| Netman              | Manages network connections.                                                                                        | Leave Manual for flexibility.                         |
| NlaSvc              | Determines network location profiles.                                                                               | Leave Automatic for network stability.                |
| `QWAVE`               | Improves audio/video streaming quality.                                                                             | Disable unless using streaming services.              |
| RasAuto             | Creates connections for remote networks when requested by programs.                                                 | Disable unless using VPN.                             |
| RasMan              | Manages dial-up and VPN connections.                                                                                | Disable unless using VPN/dial-up connections.         |
| PeerDistSvc         | Enables Peer-to-Peer content transfers in a network.                                                                | Disable unless required for a specific app.           |
| PNRPAutoReg         | Handles Peer Name Resolution Protocol registration.                                                                 | Disable unless required for peer-to-peer tasks.       |
| PNRPsvc             | Supports Peer Name Resolution Protocol.                                                                             | Disable unless required.                              |
| SharedAccess        | Provides Internet Connection Sharing.                                                                               | Disable unless sharing an internet connection.        |
| SstpSvc             | Supports Secure Socket Tunneling Protocol VPN connections.                                                          | Disable unless using SSTP VPN.                        |
| WFDSConMgrSvc       | Manages Wi-Fi Direct connections.                                                                                   | Disable unless using Wi-Fi Direct.                    |
| WinHttpAutoProxySvc | Detects and configures HTTP proxy settings.                                                                         | Disable unless using proxy settings.                  |
| WinRM               | Windows Remote Management for remote system connections.                                                            | Disable unless needed for remote management.          |
| WwanSvc             | Manages mobile broadband connections.                                                                               | Disable unless using mobile broadband.                |
| fdPHost             | Hosts Function Discovery services.                                                                                  | Disable unless required for device discovery.         |
| wcncsvc             | Wireless configuration for peer-to-peer device connections.                                                         | Disable unless needed for sharing.                    |
| netprofm            | Identifies and manages network profiles.                                                                            | Leave Automatic for network-based tasks.              |
| p2pimsvc            | Manages Peer-to-Peer Identity Manager services.                                                                     | Disable unless required for a specific app.           |
| p2psvc              | Manages Peer-to-Peer Grouping tasks.                                                                                | Disable unless using peer-to-peer services.           |
| upnphost            | Supports Universal Plug and Play device hosting.                                                                    | Disable unless needed for device discovery.           |

#### **Application and System Services**

| **Service**                   | **Description**                                                                                                    | **Recommendation**                                  |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| AppIDSvc                      | Application Identity service for Group Policy AppLocker.                                                           | Disable unless using AppLocker policies.            |
| AppMgmt                       | Manages software deployment via Group Policy.                                                                      | Leave Manual unless using Group Policy.             |
| AppReadiness                  | Prepares apps for first use.                                                                                       | Disable to improve login times.                     |
| AppXSvc                       | Supports apps from the Microsoft Store.                                                                            | Disable unless using Store apps.                    |
| Appinfo                       | Provides app information for software elevation tasks.                                                             | Leave Manual for security purposes.                 |
| AxInstSV                      | Facilitates ActiveX control installation.                                                                          | Disable unless required by legacy software.         |
| MessagingService_*            | Handles messaging tasks for apps.                                                                                  | Disable unless required by specific apps.           |
| MicrosoftEdgeElevationService | Supports privilege elevation for Edge.                                                                             | Disable unless Edge is heavily used.                |
| PolicyAgent                   | Manages IPsec policies.                                                                                            | Leave Manual unless using IPsec policies.           |
| PrintNotify                   | Provides notifications for print jobs.                                                                             | Disable unless managing multiple printers.          |
| RetailDemo                    | Powers retail demo mode.                                                                                           | Disable for non-retail systems.                     |
| RpcLocator                    | Supports RPC endpoint mapping.                                                                                     | Disable unless troubleshooting remote calls.        |
| SCPolicySvc                   | Configures smart card policies.                                                                                    | Disable unless using smart cards.                   |
| StateRepository               | Handles app states and repositories.                                                                               | Disable unless using modern apps.                   |
| TextInputManagementService    | Manages advanced text input methods.                                                                               | Disable unless required by the user.                |
| TimeBroker                    | Manages process time synchronization.                                                                              | Leave Manual for system stability.                  |
| TroubleshootingSvc            | Powers Windows troubleshooting tools.                                                                              | Disable unless troubleshooting.                     |
| TrustedInstaller              | Handles system updates and installs.                                                                               | Leave Automatic for system stability.               |
| UI0Detect                     | Detects and interacts with interactive services.                                                                   | Disable unless troubleshooting legacy apps.         |
| UsoSvc                        | Manages Windows Update services.                                                                                   | Leave Automatic to ensure updates are applied.      |

#### **Security Services**

| **Service**                  | **Description**                                                                                                    | **Recommendation**                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| BDESVC                       | BitLocker Drive Encryption Service.                                                                                | Disable unless using BitLocker for drive encryption.          |
| SecurityHealthService        | Provides notifications about system health and security.                                                           | Leave Automatic to ensure updates and health notifications.   |
| SCardSvr                     | Manages smart card access.                                                                                         | Disable unless using smart cards.                             |
| NaturalAuthentication        | Supports advanced biometric authentication.                                                                        | Leave Manual unless using biometrics.                         |
| NgcCtnrSvc                   | Handles Next Generation Credentials for enhanced security.                                                         | Leave Manual for secure logins.                               |
| NgcSvc                       | Manages PIN and biometric authentication methods.                                                                  | Leave Manual to ensure login stability.                       |
| SEMgrSvc                     | Manages secure elements for security purposes.                                                                     | Disable unless using smart cards or secure elements.          |
| SensrSvc                     | Adjusts desktop brightness using ambient light sensors.                                                            | Disable unless using light sensors.                           |
| SensorService                | Manages sensor devices like accelerometers.                                                                        | Disable unless required by hardware.                          |
| SensorDataService            | Collects and processes data from system sensors.                                                                   | Disable unless using sensor-reliant apps.                     |
| sppsvc                       | Manages activation of Windows and Microsoft products.                                                              | Leave Automatic for activation stability.                     |
| smphost                      | Hosts system processes for compatibility and management.                                                           | Leave Manual unless troubleshooting.                          |
| seclogon                     | Enables applications to run as a different user.                                                                   | Leave Manual for flexibility when switching accounts.         |

#### **File and Data Services**

| **Service**                  | **Description**                                                                                                     | **Recommendation**                              |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| CscService                   | Manages offline file synchronization.                                                                               | Disable unless using offline file sync.         |
| FDResPub                     | Publishes network resources for device discovery.                                                                   | Disable unless required for sharing.            |
| PimIndexMaintenanceSvc_*     | Maintains data like contacts, calendar, and emails for apps.                                                        | Disable unless using related apps.              |
| UnistoreSvc_*                | Manages storage for app-related data.                                                                               | Disable unless required by apps.                |
| UserDataSvc_*                | Handles synchronization of user data for apps.                                                                      | Disable unless using apps that rely on it.      |
| VSS                          | Volume Shadow Copy Service for creating backups.                                                                    | Leave Manual for backup operations.             |
| wbengine                     | Provides backup and recovery features.                                                                              | Leave Manual for recovery functionality.        |
| storSvc                      | Manages storage services and policies for the system.                                                               | Leave Automatic for stable storage performance. |
| pla                          | Performance Logs and Alerts for monitoring.                                                                         | Disable unless analyzing system performance.    |

#### **Media and Graphics Services**

| **Service**                  | **Description**                                                                                                    | **Recommendation**                                    |
|------------------------------|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| BcastDVRUserService_*        | Supports game recording and streaming features.                                                                    | Disable unless required for game streaming.           |
| GraphicsPerfSvc              | Optimizes and monitors graphics performance.                                                                       | Disable unless troubleshooting GPU performance.       |
| MixedRealityOpenXRSvc        | Provides services for Mixed Reality and VR devices.                                                                | Disable unless using VR or AR systems.                |
| PenService_*                 | Manages stylus and pen input devices.                                                                              | Disable unless using a pen input device.              |
| PerfHost                     | Hosts performance counters for processes.                                                                          | Disable unless required for diagnostics.              |
| TabletInputService           | Manages touch and handwriting input devices.                                                                       | Disable unless using touch-enabled devices.           |
| WMPNetworkSvc                | Windows Media Player sharing service for media libraries.                                                          | Disable unless sharing media over a network.          |
| WarpJITSvc                   | Provides just-in-time GPU rendering for apps.                                                                      | Disable unless using apps requiring GPU acceleration. |

#### **Diagnostic and Monitoring Services**

| **Service**                              | **Description**                                                                                         | **Recommendation**                                |
|------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| WdiServiceHost                           | Hosts diagnostic services for performance and reliability monitoring.                                   | Disable unless troubleshooting system issues.     |
| WdiSystemHost                            | Manages system diagnostics for troubleshooting.                                                         | Disable unless actively monitoring system issues. |
| WaaSMedicSvc                             | Windows Update Medic Service, ensures proper functioning of Windows Update.                             | Leave Automatic for system updates.               |
| WerSvc                                   | Windows Error Reporting, collects crash data for analysis.                                              | Leave enabled unless privacy concerns arise.      |
| diagsvc                                  | Diagnostic Service Host, manages diagnostic tasks for the system.                                       | Disable unless required for troubleshooting.      |
| diagnosticshub.standardcollector.service | Collects diagnostic information for applications and the system.                                        | Disable unless debugging or troubleshooting.      |
| wercplsupport                            | Provides support for error reporting in the Control Panel.                                              | Leave enabled for crash report functionality.     |
| wlpasvc                                  | Windows Licensing Monitoring service for validating activation and licensing.                           | Leave Manual for licensing validation.            |

#### **Device and Peripheral Management Services**

| **Service**                  | **Description**                                                                                                    | **Recommendation**                                 |
|------------------------------|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `DeviceAssociationBrokerSvc_*` | Manages connections between the system and external devices.                                                       | Disable unless frequently connecting devices.      |
| `DeviceAssociationService`     | Provides support for pairing and connecting external devices.                                                      | Disable unless required for peripherals.           |
| `DeviceInstall`                | Handles driver installation for newly connected devices.                                                           | Leave Automatic for hardware compatibility.        |
| DevicePickerUserSvc_*        | Provides a user interface for selecting devices.                                                                   | Disable unless regularly selecting peripherals.    |
| DevicesFlowUserSvc_*         | Manages workflows for connected devices.                                                                           | Disable unless required for specific peripherals.  |
| `PlugPlay`                     | Detects and manages hardware connections.                                                                          | Leave Automatic to ensure hardware stability.      |
| PhoneSvc                     | Manages phone device interactions.                                                                                 | Disable unless syncing or managing mobile devices. |
| WPDBusEnum                   | Handles communication with portable devices like smartphones.                                                      | Disable unless using portable devices.             |
| WiaRpc                       | Provides support for imaging devices like scanners and cameras.                                                    | Disable unless using such devices.                 |
| WbioSrvc                     | Manages biometric devices such as fingerprint readers.                                                             | Leave Manual unless using biometric authentication.|
| MsKeyboardFilter             | Handles tasks related to specialized keyboards.                                                                    | Disable unless using a specialized keyboard.       |
| camsvc                       | Provides support for webcam services.                                                                              | Disable unless using a webcam.                     |

#### **Miscellaneous Services**

| **Service**                  | **Description**                                                                                                     | **Recommendation**                     |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| ClipSVC                      | Supports Microsoft Store infrastructure for app updates and licensing.                                             | Disable if not using Store apps.       |
| ConsentUxUserSvc_*           | Manages consent and UAC prompts for apps.                                                                          | Leave Manual for app functionality.    |
| AppReadiness                 | Prepares apps for first-time use.                                                                                   | Disable unless using Store apps.       |
| Autotimesvc                  | Synchronizes time automatically.                                                                                   | Leave Automatic for time accuracy.     |
| BITS                         | Background Intelligent Transfer Service, manages background downloads like updates.                                 | Leave Automatic for updates.           |
| BTAGService                  | Provides Bluetooth audio gateway support.                                                                          | Disable unless using Bluetooth audio devices. |
| Browser                      | Maintains a list of network computers for legacy domains.                                                          | Disable unless on legacy networks.     |
| CDPSvc                       | Handles Connected Devices Platform services.                                                                       | Disable unless using connected devices.|
| CDPUserSvc_*                 | Supports connected device experiences.                                                                             | Disable unless using devices like smartphones. |
| COMSysApp                    | Manages COM+ applications.                                                                                         | Leave Manual for system functionality. |
| CaptureService_*             | Provides screen and audio capture for apps.                                                                        | Disable unless required by apps.       |
| CertPropSvc                  | Manages certificate propagation for smart cards.                                                                   | Disable unless using smart cards.      |
| DcpSvc                       | Data Collection and Publishing service for telemetry.                                                              | Disable for privacy concerns.          |
| DevQueryBroker               | Queries device metadata and pairing information.                                                                   | Disable unless managing devices.       |
| HomeGroupListener            | Enables HomeGroup connections for sharing files and printers.                                                      | Disable unless using HomeGroups.       |
| HomeGroupProvider            | Provides support for creating and managing HomeGroups.                                                             | Disable unless using HomeGroups.       |
| HvHost                       | Hypervisor service for virtualized environments.                                                                   | Leave Manual unless using Hyper-V.     |
| IEEtwCollectorService        | Collects Internet Explorer diagnostics.                                                                            | Disable unless troubleshooting IE.     |
| IKEEXT                       | Manages IPsec key exchange and security associations.                                                              | Leave Manual unless using IPsec.       |
| InstallService               | Supports installation operations for Windows updates.                                                              | Leave Automatic for update stability.  |
| InventorySvc                 | Collects inventory for diagnostic purposes.                                                                        | Disable for privacy concerns.          |
| IpxlatCfgSvc                 | Configures IP Translation for IPv6.                                                                                | Disable unless required.               |
| LicenseManager               | Manages licensing for Microsoft products.                                                                          | Leave Automatic for licensing stability.|
| LxpSvc                       | Language Experience Service, enables additional language features.                                                 | Disable unless using additional languages. |
| MSDTC                        | Distributed Transaction Coordinator, supports transactions across resources.                                        | Disable unless using distributed apps. |
| MSiSCSI                      | Manages iSCSI sessions for network storage.                                                                        | Disable unless using iSCSI storage.    |
| MapsBroker                   | Supports map and location services.                                                                                | Disable unless using map apps.         |
| McpManagementService         | Manages mobile device configuration.                                                                               | Disable unless managing mobile devices.|
| NcaSvc                       | Handles notifications for Universal Windows Platform apps.                                                         | Disable unless using UWP apps.         |
| NcbService                   | Manages notifications for Cortana and other apps.                                                                  | Disable unless using notifications.    |
| NcdAutoSetup                 | Enables automatic setup of network-connected devices.                                                              | Disable unless frequently adding devices.|
| PcaSvc                       | Program Compatibility Assistant, helps run older apps.                                                             | Disable unless troubleshooting old software. |
| PrintNotify                  | Manages notifications for print jobs.                                                                              | Disable unless managing multiple printers. |
| PrintWorkflowUserSvc_*       | Provides workflows for advanced printing tasks.                                                                    | Disable unless required by printers.   |
| PushToInstall                | Installs apps pushed from other devices.                                                                           | Disable unless using this feature.     |
| RpcLocator                   | Supports RPC endpoint mapping for remote communications.                                                           | Disable unless troubleshooting.        |
| SCPolicySvc                  | Manages smart card policies.                                                                                       | Disable unless using smart cards.      |
| SDRSVC                       | Manages recovery tasks for system disasters.                                                                       | Leave Manual for recovery functionality.|
| SensrSvc                     | Adjusts brightness based on ambient light sensors.                                                                 | Disable unless using light sensors.    |
| StiSvc                       | Provides support for still image devices like scanners.                                                            | Disable unless using imaging devices.  |
| TapiSrv                      | Manages Telephony API for legacy apps.                                                                             | Disable unless using TAPI apps.        |
| TieringEngineService         | Manages storage tier optimization.                                                                                 | Leave Automatic for storage performance.|
| WManSvc                      | Wireless LAN configuration service.                                                                                | Leave Automatic for wireless stability.|
| WalletService                | Manages wallet and payment features for apps.                                                                      | Disable unless using wallet apps.      |
| WebClient                    | Enables WebDAV connections for accessing remote files.                                                             | Disable unless required by apps.       |
| Wecsvc                       | Collects events from remote computers.                                                                             | Disable unless using event logging.    |
| WpcMonSvc                    | Monitors Windows Parental Controls.                                                                                | Disable unless using parental controls.|
| WpnService                   | Manages push notifications for apps.                                                                               | Disable unless using notifications.    |
| `XblAuthManager`               | Manages Xbox Live authentication.                                                                                  | Disable unless using Xbox Live.        |
| `XblGameSave`                  | Handles game saves for Xbox-enabled apps.                                                                          | Disable unless using Xbox features.    |
| `XboxGipSvc`                   | Supports Xbox game input.                                                                                          | Disable unless using Xbox controllers. |
| `XboxNetApiSvc`                | Manages Xbox networking for multiplayer gaming.                                                                    | Disable unless using Xbox features.    |
| bthserv                      | Bluetooth Support Service, manages Bluetooth devices.                                                              | Disable unless using Bluetooth.        |
| cbdhsvc_*                    | Clipboard service for cloud synchronization of clipboard content.                                                  | Disable unless using clipboard sync.   |
| cloudidsvc                   | Manages Microsoft account sign-ins.                                                                                | Leave Automatic for account functionality. |
| dcsvc                        | Device Setup Manager, enables device configuration.                                                                | Leave Automatic for device stability.  |
| defragsvc                    | Disk Defragmenter service, manages drive optimization.                                                             | Leave Manual for disk performance.     |
| dot3svc                      | Wired AutoConfig, manages wired network connections.                                                               | Disable unless using wired 802.1X authentication. |
| edgeupdate                   | Updates Microsoft Edge browser.                                                                                    | Leave Automatic to keep Edge updated.  |
| edgeupdatem                  | Auxiliary service for Edge updates.                                                                                | Leave Automatic to support Edge.       |
| embeddedmode                 | Provides support for embedded systems.                                                                             | Disable unless using embedded mode.    |
| fhsvc                        | File History service, manages backups of user files.                                                              | Disable unless using File History.     |
| hidserv                      | Human Interface Device Service, manages keyboards, mice, and other devices.                                        | Leave Automatic for input device stability. |
| icssvc                       | Internet Connection Sharing service.                                                                               | Disable unless using ICS.              |
| lfsvc                        | Location Framework service, provides geolocation data.                                                             | Disable unless using location-based apps. |
| lltdsvc                      | Link Layer Topology Discovery, helps discover network devices.                                                     | Disable unless required for network mapping. |
| lmhosts                      | Manages legacy NetBIOS names.                                                                                      | Disable unless using NetBIOS.          |
| `msiserver`                    | Windows Installer service, manages installations.                                                                  | Leave Manual for installation support. |
| perceptionsimulation         | Manages virtual reality or simulation input.                                                                       | Disable unless using VR apps.          |
| spectrum                     | Manages spectrum analysis for wireless devices.                                                                    | Disable unless troubleshooting Wi-Fi.  |
| svsvc                        | Spot Verifier, checks file system integrity.                                                                       | Leave Manual for file system health.   |
| swprv                        | Software Shadow Copy Provider, supports backups.                                                                   | Leave Manual for backup functionality. |
| `vds`                          | Virtual Disk Service, manages disk volumes.                                                                       | Leave Manual for advanced storage configurations. |
| vm3dservice                  | VMware 3D service, supports virtual machine graphics.                                                              | Leave Automatic if using VMware.       |
| vmicguestinterface           | Provides interface for guest-to-host communication in Hyper-V.                                                     | Leave Automatic for Hyper-V stability. |
| vmicheartbeat                | Monitors heartbeat between guest and host in virtual environments.                                                 | Leave Automatic for virtual environments. |
| vmickvpexchange              | Facilitates data exchange between guest and host in Hyper-V.                                                       | Leave Automatic for Hyper-V stability. |
| `vmicrdv`                      | Manages Remote Desktop Virtualization Host.                                                                       | Leave Manual unless using RDP in Hyper-V. |
| `vmicshutdown`                 | Handles shutdown requests from host to guest in Hyper-V.                                                          | Leave Automatic for Hyper-V environments. |
| `vmictimesync`                 | Synchronizes guest time with host in Hyper-V.                                                                     | Leave Automatic for Hyper-V stability. |
| `vmicvmsession`                | Manages virtual session state in Hyper-V.                                                                         | Leave Automatic for Hyper-V stability. |
| `vmicvss`                      | Manages Volume Shadow Copy service for virtual machines.                                                          | Leave Automatic for backups in Hyper-V. |
| webthreatdefsvc              | Web Threat Defender, provides advanced security.                                                                  | Disable unless required by security tools. |
| wisvc                        | Windows Image Acquisition, supports imaging devices like scanners.                                                | Disable unless using imaging devices.  |
| wlidsvc                      | Windows Live ID Sign-in Assistant, enables sign-ins to Microsoft accounts.                                         | Leave Automatic for account functionality. |
| wmiApSrv                     | WMI Performance Adapter, provides performance counters to WMI clients.                                            | Leave Manual for performance monitoring. |
| workfolderssvc               | Enables syncing of files for Work Folders.                                                                        | Disable unless using Work Folders.     |
| wudfsvc                      | Windows Driver Foundation, supports user-mode drivers.                                                            | Leave Automatic for driver stability.  |
| SmsRouter                    | Routes SMS for apps and devices.                                                                                   | Disable unless using SMS features.     |
| FrameServer                  | Provides video input stream for processing.                                                                       | Disable unless required by apps.       |
| FrameServerMonitor           | Monitors frame server activities.                                                                                  | Disable unless required.               |
| DoSvc                        | Delivery Optimization, manages P2P updates for Windows Update.                                                    | Disable for privacy concerns.          |
| DsSvc                        | Data Sharing Service, manages data sharing between apps.                                                          | Disable unless required.               |
| DsmSvc                       | Device Setup Manager, handles new device setup.                                                                   | Leave Automatic for hardware compatibility. |
| EFS                          | Encrypting File System, manages encrypted files.                                                                  | Disable unless using EFS.              |
| EapHost                      | Manages EAP authentication for network connections.                                                               | Leave Automatic unless using advanced authentication. |
| EntAppSvc                    | Enterprise App Management Service, supports enterprise app deployment.                                                          | Disable unless using enterprise apps.   |
| Fax                          | Manages fax operations for connected devices.                                                                                   | Disable unless using fax machines.      |
| PhoneSvc                     | Provides phone services for calls and messaging.                                                                                | Disable unless using phone integration. |
| PolicyAgent                  | Manages IPsec policies and security associations.                                                                               | Leave Manual unless using IPsec.        |
| TextInputManagementService   | Manages advanced text input devices and IMEs.                                                                     | Disable unless using specialized input.|
| Autotimesvc                  | Synchronizes system time automatically.                                                                           | Leave Automatic for time accuracy.     |
| wuauserv                     | Manages Windows Update downloads and installations.                                                               | Leave Automatic for system updates.    |
::

```powershell
# To start a service again
Start-Service -Name MixedRealityOpenXRSvc
```

### **3. Disables Unnecessary Services**

1. **Disables Unnecessary Services**
   - Identifies and disables services that are rarely needed or can impact performance negatively. Set the services in the disabledServices list to Disabled

   **Implementation:**
   ```powershell
   foreach ($service in $disabledServices) {
       try {
           Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue | Out-Null
       }
       catch {
           Write-Host "Failed to set $service to Disabled: $_" -ForegroundColor Yellow
       }
   }
   ```

2. **Sets Services to Manual Startup**
   - Configures non-critical services to start only when needed, reducing system resource usage during boot. Set the services in the manualServices list to Manual

   **Implementation:**
   ```powershell
   foreach ($service in $manualServices) {
       try {
           Set-Service -Name $service -StartupType Manual -ErrorAction SilentlyContinue | Out-Null
       }
       catch {
           Write-Host "Failed to set $service to Manual: $_" -ForegroundColor Yellow
       }
   }
   ```

## Powerplan

This script applies an **aggressive performance-optimization strategy** to Windows power settings, ensuring:
1. **Maximum Performance**:
   - Enables the Ultimate Performance power plan.
   - Prevents power-saving features like throttling or disk/USB suspensions.
2. **System Simplification**:
   - Deletes all other power plans to standardize the setup.
3. **Customization for Use Cases**:
   - Hides specific power menu options (e.g., Sleep, Lock).
   - Allows for extended hardware configurations like USB and PCI Express settings.


**When to Use It**
- Ideal for gaming PCs, high-performance workstations, or virtual machines requiring consistent high performance.
- Avoid on laptops or battery-powered devices, as these settings will reduce battery life.

```sql
+---------------------------------------------+
|        Initialize Lists of Services        |
| ($disabledServices and $manualServices)    |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Set Services in Disabled List to Disabled  |
| (Iterate over $disabledServices)           |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Set Services in Manual List to Manual      |
| (Iterate over $manualServices)             |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Show Success Message                      |
| "Service startup types updated successfully"|
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| Wait If Not in Specialize Phase            |
+---------------------------------------------+
               |
               v
+---------------------------------------------+
| End of Function                           |
| (Service startup types applied successfully)|
+---------------------------------------------+
```


### **1. Clears the Console**
```powershell
Clear-Host
```
- Clears the PowerShell console for better readability before running the rest of the function.


### **2. Configures the "Ultimate Performance" Power Plan**
```powershell
cmd /c "powercfg /duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 99999999-9999-9999-9999-999999999999 >nul 2>&1 & powercfg /SETACTIVE 99999999-9999-9999-9999-999999999999 >nul 2>&1"
```
- Creates a duplicate of the **Ultimate Performance** power plan (GUID: `e9a42b02-d5df-448d-aa00-03f14749eb61`) with a new GUID (`99999999-9999-9999-9999-999999999999`) and sets it as the active power plan.


### **3. Deletes All Other Power Plans**
```powershell
powercfg /L | ForEach-Object {
    if ($_ -match "^\s*Power Scheme GUID: (\S+)") {
        $guid = $matches[1]
        if ($guid -ne "99999999-9999-9999-9999-999999999999") {
            cmd /c "powercfg /delete $guid" | Out-Null
        }
    }
}
```
- Lists all power plans using `powercfg /L`.
- Deletes any power plan whose GUID is not the one created in the previous step.


### **4. Registry Modifications**
```powershell
# Registry modifications
$regChanges = @(
    'HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowLockOption /t REG_DWORD /d 0', # Hides the Lock option from the Power menu
    'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowSleepOption /t REG_DWORD /d 0', # Hides the Sleep option from the Power menu
    'HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power /v HiberbootEnabled /t REG_DWORD /d 0', # Disables Fast Startup (Hiberboot)
    'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabled /t REG_DWORD /d 0', # Disables hibernate
    'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabledDefault /t REG_DWORD /d 0', # Disables default hibernate settings
    'HKLM\SYSTEM\CCurrentControlSet\Control\Power\PowerSettings\54533251-82be-4824-96c1-47b60b740d00\0cc5b647-c1df-4637-891a-dec35c318583 /v ValueMax /t REG_DWORD /d 0', # Unparks CPU cores by setting the maximum processor state: 100%
    'HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\d4e98f31-5ffe-4ce1-be31-1b38b384c009 /v Attributes /t REG_DWORD /d 2' # Unhides "USB 3 Link Power Management"
    'HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\0853a681-27c8-4100-a2fd-82013e970683 /v Attributes /t REG_DWORD /d 2' # Unhides "Hub Selective Suspend Timeout"
)

foreach ($reg in $regChanges) {
    cmd /c "reg add $reg /f >nul 2>&1"
}

# Ensure Hibernate file is deleted
cmd /c "powercfg /h off >nul 2>&1"

```
- Modifies several registry settings for system power management:
  - **Disables hibernation** by setting `HibernateEnabled` and `HibernateEnabledDefault` to `0`.
  - **Hides "Lock" and "Sleep" options** in the power menu by modifying `FlyoutMenuSettings`.
  - **Disables Fast Startup** by setting `HiberbootEnabled` to `0`.
  - **Disables CPU power throttling** and **unparks CPU cores** to maximize performance.
  - **Unhides USB power settings** like "Selective Suspend Timeout."


### **5. Modifies Specific Advanced Power Plan Settings**
```powershell
 # Modify Advcaned Power Plan settings
$settings = @(
    @{
        SubgroupGUID = "0012ee47-9041-4b5d-9b77-535fba8b1442" # Hard Disk
        SettingGUIDs = @("6738e2c4-e8a5-4a42-b16a-e040e769756e") # Turn off hard disk after: Never
    },
    @{
        SubgroupGUID = "0d7dbae2-4294-402a-ba8e-26777e8488cd" # Desktop Background Settings
        SettingGUIDs = @("309dce9b-bef4-4119-9921-a851fb12f0f4") # Slide show: Available
    },
    @{
        SubgroupGUID = "19cbb8fa-5279-450e-9fac-8a3d5fedd0c1" # Wireless Adapter Settings
        SettingGUIDs = @("12bbebe6-58d6-4636-95bb-3217ef867c1a") # Power saving mode: Maximum Performance
    },
    @{
        SubgroupGUID = "238c9fa8-0aad-41ed-83f4-97be242c8f20" # Sleep
        SettingGUIDs = @(
            "29f6c1db-86da-48c5-9fdb-f2b67b1f44da", # Sleep after: Never
            "bd3b718a-0680-4d9d-8ab2-e1d2b4ac806d"  # Allow wake timers: Disable
        )
    },
    @{
        SubgroupGUID = "2a737441-1930-4402-8d77-b2bebba308a3" # USB Settings
        SettingGUIDs = @(
            "0853a681-27c8-4100-a2fd-82013e970683", # USB selective suspend setting: Disabled 
            "d4e98f31-5ffe-4ce1-be31-1b38b384c009",  # USB Hub Selective Suspend Timeout: Disabled (0 milliseconds)
            "48e6b7a6-50f5-4782-a5d4-53bb8f07e226" # USB 3 Link Power Management: Off
        )
    },
    @{
        SubgroupGUID = "501a4d13-42af-4429-9fd1-a8218c268e20" # PCI Express
        SettingGUIDs = @("ee12f906-d277-404b-b6da-e5fa1a576df5") # Link State Power Management: Off
    },
    @{
        SubgroupGUID = "7516b95f-f776-4464-8c53-06167f40cc99" # Display settings
        SettingGUIDs = @("3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e") # Turn off Display After setting: Never
    }
)

foreach ($group in $settings) {
    $subgroup = $group.SubgroupGUID
    foreach ($setting in $group.SettingGUIDs) {
        powercfg /setacvalueindex 99999999-9999-9999-9999-999999999999 $subgroup $setting 0x00000000
        powercfg /setdcvalueindex 99999999-9999-9999-9999-999999999999 $subgroup $setting 0x00000000
    }
}
```
- Modifies specific settings within the active power plan:
  - **Hard Disk**: Prevents the disk from turning off during inactivity.
  - **Wireless Adapter**: Ensures wireless adapter remains in high-performance mode.
  - **Sleep Settings**: Disables sleep, hibernation, and wake timers.
  - **USB Settings**: Ensures USB devices are always active (no power-saving mode).
  - **PCI Express**: Disables Link State Power Management.
  - **Display**: Prevents the display from turning off.


### **6. Displays Success Message**
```powershell
if (-not $isSpecializePhase) {
    Show-Header
    Write-Host "Recommended Power Settings Applied." -ForegroundColor Green
    Wait-IfNotSpecialize
    return
}
```
- If the function is not running during the "specialize" phase of Windows setup, it:
  - Displays a header and success message.
  - Waits if needed for additional steps.

#### Changes

| **Setting**                           | **Ideal Value**       | **Reason**                                                                 |
|---------------------------------------|-----------------------|----------------------------------------------------------------------------|
| CPU Core Parking                      | 0 (Unparked)          | Ensures all cores are always active for maximum performance.               |
| Sleep                                 | Disable               | Keeps the system fully operational and avoids unexpected sleep states.     |
| Hibernate                             | Disable               | Avoids latency when waking up and eliminates the hibernation file.         |
| Fast Startup                          | Disable               | Ensures full system initialization for compatibility, updates, and troubleshooting. |
| Hard Disk Timeout                     | Never                 | Prevents hard disks from turning off, ensuring better system responsiveness. |
| Slide Show                            | Available             | Allows slide shows in the desktop background, useful for personalization.  |
| Wireless Adapter Power Saving         | Maximum Performance   | Maintains high-speed network connectivity at the cost of slightly more power. |
| Allow Wake Timers                     | Disable               | Prevents unexpected wake-ups due to scheduled tasks or timers.             |
| USB Hub Selective Suspend Timeout     | Disabled              | Ensures USB devices stay active and responsive.                            |
| USB 3 Link Power Management           | Off                   | Ensures USB 3.0 devices stay active for maximum performance.               |
| USB Selective Suspend                 | Disable               | Prevents device interruptions and maintains connectivity.                  |
| PCI Express Link State Power Management | Off                  | Prevents latency caused by PCI power-saving features, ensuring responsiveness. |
| Processor Power Management (Min/Max) | 100%                  | Ensures maximum performance by keeping all CPU cores active and avoiding throttling. |
| Display Timeout                       | Never                 | Keeps the screen on to avoid interruptions during active sessions.         |
