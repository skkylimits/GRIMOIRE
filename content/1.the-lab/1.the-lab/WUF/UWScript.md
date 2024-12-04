---
title: UWScript.ps1
description: A sleek, unattended Windows installation script, automating system setups with precision and style.
---

The provided script is a PowerShell function named `All-Unattended-Settings` that performs a series of modifications to optimize Windows power settings for specific requirements. Here's a detailed explanation of what each part does:

## Registry

This function is designed to:
- Apply a wide range of system-wide optimizations.
- Disable or customize certain features.
- Improve system performance (especially for gaming and multimedia).
- Enhance privacy by disabling telemetry-like features.
- Customize the user experience by modifying the Start menu and context menus.

It achieves this by generating and importing a `.reg` file with detailed registry configurations.

This PowerShell function, `Set-RecommendedHKLMRegistry`, performs several actions, primarily targeting system-wide registry settings in a Windows environment to optimize performance, disable certain features, and apply customizations. Here’s a detailed breakdown of each part of the function:

### **1. Define the Function:**
The function `Set-RecommendedHKLMRegistry` is defined to modify registry keys by creating and applying a `.reg` file.

### **2. Multi-line Comment Creation:**
- A block of text (stored in `$MultilineComment`) contains registry modifications written in the syntax of a `.reg` file.

### **3. Purpose of Registry Modifications:**
The registry modifications include a wide range of optimizations and customizations, divided into categories:

#### **Context Menu Customization:**
- Adds a "Take Ownership" option to the right-click context menu for files, directories, and drives.
  - Configures `takeown` and `icacls` commands to update ownership and permissions for the selected file or folder.
  - Excludes critical directories like `C:\Windows`, `C:\Program Files`, and `C:\Users` to avoid accidental ownership changes.

#### **Application and Feature Restrictions:**
- Disables features like:
  - Windows Copilot.
  - Automatic installation of Dev Home, New Outlook, and Chat applications.
  - BitLocker auto-encryption on Windows 11 (24H2 and onward).
  - Cortana assistant.
  - Wi-Fi Sense features like auto-connect to hotspots.
  - Tablet mode.

#### **Start Menu Customization:**
- Clears all pinned apps from the Start menu for a cleaner experience.

#### **File System Settings:**
- Enables long file paths (up to 32,767 characters).

#### **Multimedia and Gaming Optimizations:**
- Configures higher priorities for multimedia applications and gaming tasks (e.g., CPU and GPU prioritization).

#### **System Customizations:**
- Disables startup sound.
- Blocks "Allow my organization to manage my device" pop-ups.
- Turns on hardware-accelerated GPU scheduling.
- Disables OneDrive auto-backups and Windows Consumer Features.
- Removes 3D Objects and Home folders from File Explorer.

#### **Network and Internet:**
- Disables certain networking features, such as allowing other users to control shared connections.

#### **Security and Maintenance:**
- Disables:
  - Remote Assistance.
  - Automatic maintenance.
  - Problem reporting.

#### **Privacy and Apps:**
- Prevents background apps from running.
- Disables archive apps and automatic app updates from the Microsoft Store.

#### **NVIDIA-Specific Configuration:**
- Enables the old NVIDIA sharpening setting (`EnableGR535`).

### **4. Save `.reg` File:**
- The `$MultilineComment` content is written to a temporary `.reg` file at `$env:TEMP\Optimize_LocalMachine_Registry.reg` using `Set-Content`.

### **5. Edit the `.reg` File:**
- The function performs a string replacement operation to replace any instances of `?` with `$` in the `.reg` file. The updated file is saved back.

### **6. Import Registry File:**
- The `.reg` file is imported into the system using the `Regedit.exe /S` command. This applies all the specified registry changes.

### **7. Display Messages:**
- Displays a confirmation message (`Recommended Local Machine Registry Settings Applied`) in green text after successful application.

### **8. Call Supporting Functions:**
- Calls two undefined functions, `Show-Header` and `Wait-IfNotSpecialize`, presumably to display a header and perform a wait operation, respectively.

## Tasks & Services

This function adjusts the startup behavior of Windows services for optimized system performance and resource management.

- **Optimized Boot Time:** Reduces the number of services starting automatically.
- **Improved Performance:** Frees up system resources for user applications.
- **Secure Environment:** Disables potentially risky services like **RemoteRegistry**.
- **Privacy**: Some services, like telemetry, send data to Microsoft.

### **1. Identify Services**

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
    'DevQueryBroker', 'DeviceAssociationBrokerSvc_*', 'DeviceAssociationService', 
    'DeviceInstall', 'DevicePickerUserSvc_*', 'DevicesFlowUserSvc_*', 
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
    'PenService_*', 'PerfHost', 'PhoneSvc', 'PimIndexMaintenanceSvc_*', 'PlugPlay',
    'PolicyAgent', 'PrintNotify', 'PrintWorkflowUserSvc_*', 'PushToInstall', 'QWAVE',
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
    'WpnService', 'WwanSvc', 'XblAuthManager', 'XblGameSave', 'XboxGipSvc', 
    'XboxNetApiSvc', 'autotimesvc', 'bthserv', 'camsvc', 'cbdhsvc_*',
    'cloudidsvc', 'dcsvc', 'defragsvc', 'diagnosticshub.standardcollector.service',
    'diagsvc', 'dmwappushservice', 'dot3svc', 'edgeupdate', 'edgeupdatem', 
    'embeddedmode', 'fdPHost', 'fhsvc', 'hidserv', 'icssvc', 'lfsvc', 
    'lltdsvc', 'lmhosts', 'msiserver', 'netprofm', 'p2pimsvc', 'p2psvc', 
    'perceptionsimulation', 'pla', 'seclogon', 'smphost', 'spectrum', 
    'sppsvc', 'svsvc', 'swprv', 'upnphost', 'vds', 'vm3dservice', 
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
| QWAVE               | Improves audio/video streaming quality.                                                                             | Disable unless using streaming services.              |
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
| DeviceAssociationBrokerSvc_* | Manages connections between the system and external devices.                                                       | Disable unless frequently connecting devices.      |
| DeviceAssociationService     | Provides support for pairing and connecting external devices.                                                      | Disable unless required for peripherals.           |
| DeviceInstall                | Handles driver installation for newly connected devices.                                                           | Leave Automatic for hardware compatibility.        |
| DevicePickerUserSvc_*        | Provides a user interface for selecting devices.                                                                   | Disable unless regularly selecting peripherals.    |
| DevicesFlowUserSvc_*         | Manages workflows for connected devices.                                                                           | Disable unless required for specific peripherals.  |
| PlugPlay                     | Detects and manages hardware connections.                                                                          | Leave Automatic to ensure hardware stability.      |
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
| XblAuthManager               | Manages Xbox Live authentication.                                                                                  | Disable unless using Xbox Live.        |
| XblGameSave                  | Handles game saves for Xbox-enabled apps.                                                                          | Disable unless using Xbox features.    |
| XboxGipSvc                   | Supports Xbox game input.                                                                                          | Disable unless using Xbox controllers. |
| XboxNetApiSvc                | Manages Xbox networking for multiplayer gaming.                                                                    | Disable unless using Xbox features.    |
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
| msiserver                    | Windows Installer service, manages installations.                                                                  | Leave Manual for installation support. |
| perceptionsimulation         | Manages virtual reality or simulation input.                                                                       | Disable unless using VR apps.          |
| spectrum                     | Manages spectrum analysis for wireless devices.                                                                    | Disable unless troubleshooting Wi-Fi.  |
| svsvc                        | Spot Verifier, checks file system integrity.                                                                       | Leave Manual for file system health.   |
| swprv                        | Software Shadow Copy Provider, supports backups.                                                                   | Leave Manual for backup functionality. |
| vds                          | Virtual Disk Service, manages disk volumes.                                                                       | Leave Manual for advanced storage configurations. |
| vm3dservice                  | VMware 3D service, supports virtual machine graphics.                                                              | Leave Automatic if using VMware.       |
| vmicguestinterface           | Provides interface for guest-to-host communication in Hyper-V.                                                     | Leave Automatic for Hyper-V stability. |
| vmicheartbeat                | Monitors heartbeat between guest and host in virtual environments.                                                 | Leave Automatic for virtual environments. |
| vmickvpexchange              | Facilitates data exchange between guest and host in Hyper-V.                                                       | Leave Automatic for Hyper-V stability. |
| vmicrdv                      | Manages Remote Desktop Virtualization Host.                                                                       | Leave Manual unless using RDP in Hyper-V. |
| vmicshutdown                 | Handles shutdown requests from host to guest in Hyper-V.                                                          | Leave Automatic for Hyper-V environments. |
| vmictimesync                 | Synchronizes guest time with host in Hyper-V.                                                                     | Leave Automatic for Hyper-V stability. |
| vmicvmsession                | Manages virtual session state in Hyper-V.                                                                         | Leave Automatic for Hyper-V stability. |
| vmicvss                      | Manages Volume Shadow Copy service for virtual machines.                                                          | Leave Automatic for backups in Hyper-V. |
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


### **2. Disables Unnecessary Services**

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
$regChanges = @(
    'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabled /t REG_DWORD /d 0', # Disables hibernate
    'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabledDefault /t REG_DWORD /d 0', # Disables default hibernate settings
    'HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowLockOption /t REG_DWORD /d 0', # Hides the Lock option from the Power menu
    'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowSleepOption /t REG_DWORD /d 0', # Hides the Sleep option from the Power menu
    'HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power /v HiberbootEnabled /t REG_DWORD /d 0', # Disables Fast Startup (Hiberboot)
    'HKLM\SYSTEM\ControlSet001\Control\Power\PowerSettings\54533251-82be-4824-96c1-47b60b740d00\0cc5b647-c1df-4637-891a-dec35c318583 /v ValueMax /t REG_DWORD /d 0', # Unparks CPU cores by setting the maximum processor state
    'HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerThrottling /v PowerThrottlingOff /t REG_DWORD /d 1', # Disables power throttling
    'HKLM\System\ControlSet001\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\0853a681-27c8-4100-a2fd-82013e970683 /v Attributes /t REG_DWORD /d 2', # Unhides "Hub Selective Suspend Timeout"
    'HKLM\System\ControlSet001\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\d4e98f31-5ffe-4ce1-be31-1b38b384c009 /v Attributes /t REG_DWORD /d 2' # Unhides "USB 3 Link Power Management"
)


foreach ($reg in $regChanges) {
    cmd /c "reg add `$reg` /f >nul 2>&1"
}
```
- Modifies several registry settings for system power management:
  - **Disables hibernation** by setting `HibernateEnabled` and `HibernateEnabledDefault` to `0`.
  - **Hides "Lock" and "Sleep" options** in the power menu by modifying `FlyoutMenuSettings`.
  - **Disables Fast Startup** by setting `HiberbootEnabled` to `0`.
  - **Disables CPU power throttling** and **unparks CPU cores** to maximize performance.
  - **Unhides USB power settings** like "Selective Suspend Timeout."


### **5. Modifies Specific Power Plan Settings**
```powershell
$settings = @(
        @{
            SubgroupGUID = "0012ee47-9041-4b5d-9b77-535fba8b1442" # Hard Disk
            SettingGUIDs = @("6738e2c4-e8a5-4a42-b16a-e040e769756e") # Turn off hard disk after
        },
        @{
            SubgroupGUID = "0d7dbae2-4294-402a-ba8e-26777e8488cd" # Desktop Background Settings
            SettingGUIDs = @("309dce9b-bef4-4119-9921-a851fb12f0f4") # Slide show
        },
        @{
            SubgroupGUID = "19cbb8fa-5279-450e-9fac-8a3d5fedd0c1" # Wireless Adapter Settings
            SettingGUIDs = @("12bbebe6-58d6-4636-95bb-3217ef867c1a") # Power saving mode
        },
        @{
            SubgroupGUID = "238c9fa8-0aad-41ed-83f4-97be242c8f20" # Sleep
            SettingGUIDs = @(
                "29f6c1db-86da-48c5-9fdb-f2b67b1f44da", # Sleep after
                "94ac6d29-73ce-41a6-809f-6363ba21b47e", # Allow hybrid sleep
                "9d7815a6-7ee4-497e-8888-515a05f02364", # Hibernate after
                "bd3b718a-0680-4d9d-8ab2-e1d2b4ac806d"  # Allow wake timers
            )
        },
        @{
            SubgroupGUID = "2a737441-1930-4402-8d77-b2bebba308a3" # USB Settings
            SettingGUIDs = @(
                "0853a681-27c8-4100-a2fd-82013e970683", # USB selective suspend setting
                "48e6b7a6-50f5-4782-a5d4-53bb8f07e226", # USB 3 Link Power Management
                "d4e98f31-5ffe-4ce1-be31-1b38b384c009"  # USB Hub Selective Suspend Timeout
            )
        },
        @{
            SubgroupGUID = "501a4d13-42af-4429-9fd1-a8218c268e20" # PCI Express
            SettingGUIDs = @("ee12f906-d277-404b-b6da-e5fa1a576df5") # Link State Power Management
        },
        @{
            SubgroupGUID = "7516b95f-f776-4464-8c53-06167f40cc99" # Display settings
            SettingGUIDs = @("3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e") # Turn off Display After setting
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

#### Summarizing Table

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
