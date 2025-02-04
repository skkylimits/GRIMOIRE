Sure! Here's a cleaned-up and simplified version of the caption:

---

### Microsoft Graph API and Mg Module Overview:

**Microsoft Mg Module**:
- It's an API wrapper around Microsoft Graph API.
- Helps manage Microsoft 365 services and is more suited for security tasks.
- Used for enumerating users, roles, groups, and applications.

**Graph API**:
- A unified API endpoint that gives access to various Microsoft services like Outlook, OneDrive, Exchange, etc.
- In the past, separate APIs existed for each service (like Exchange API for emails), but now everything is under the **Graph API**.

**Security Features of Microsoft Graph**:
- Logging: Microsoft introduced Graph Activity Logs last year, making it easier to detect and track enumeration activities.
- Previously, with Azure AD Graph API, there were no logs, and enumeration could happen without being detected.
- **Graph API** now requires special roles (like **Security Reader**) to access sensitive information like conditional access policies.

**Azure AD Graph**:
- Azure AD Graph (the older API) allows enumeration of sensitive information, like conditional access policies, without any special roles or logging.
- This makes it easier for attackers, but it's being phased out and will soon stop working.

**Microsoft Mg Module**:
- This module is a replacement for older tools and works with the new **Graph API**.
- To connect, use the command `Connect-MgGraph`, which opens a credential prompt or allows access through a token.

**How Enumeration Works with Mg Module**:
- You can use the Mg Module to retrieve information like users, roles, groups, and devices from Azure Active Directory.
- For example, you can get:
  - A list of all users.
  - Which users are synced from on-premises AD.
  - Users' roles and group memberships.

**Token-based Access**:
- To interact with the Graph API, you need an access token. This can be obtained using a command like `Get-AzureAccessToken`.
- The token is valid for 1 hour by default and grants access to data based on the permissions you have.

**Applications in Azure**:
- There are two types of applications:
  1. **App Registrations**: Think of this as the configuration or settings for an app in Azure.
  2. **Enterprise Applications** (Service Principals): These are the running instances of the app in your Azure environment.

**Potential Risks**:
- A normal user owning an application with **Global Admin** rights is a huge security concern. This is an example of an attack vector, as applications can be granted high privileges, allowing attackers to escalate their access.
- **Client Secrets** can be added to applications, and if a user has "Owner" permissions on the application, they can generate these secrets. This can potentially give global admin access without MFA or other security checks, making it easier for attackers to maintain persistence within an environment.

**Applications and Service Principals**:
- **App Registrations** define the app's configuration, but **Enterprise Applications** (Service Principals) are the running instances of the apps, and they can have roles assigned to them (like **Global Admin**).
- If a user has **Owner** permissions on an application, they can add a **client secret**, which could be used to access the environment with elevated privileges.

---

This breakdown covers the key points in a more simplified manner while maintaining all essential details. Let me know if you'd like to dive deeper into any specific section!

---
sometimes it feels like at microsoft they are all laughing at us, who can make us more confused today then tomorrow

we need a token for the graph API

https://learn.microsoft.com/en-us/powershell/microsoftgraph/installation?view=graph-powershell-1.0

 Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force
PS C:\Kitt\MFASweep> Get-InstalledModule Microsoft.Graph

Import-Module Microsoft.Graph

$passwd ConvertTo-SecureString "Inloggen01!" -AsP1ainText -Force
$creds = New-Object System.Management.Automation.PSCredentia1 ("test@QHPS.NL" ,$passwd)
Connect-AzAccount -Credential $creds

$Token -(Get-AzAccessToken -ResourceTypeName MSGraph).Token

Import-Module Az

To get the **Az** module working, follow these steps:

### 1. **Uninstall Old Azure Modules (if any)**

If you have older versions of the Azure modules (like **AzureRM**), it's a good idea to uninstall them first to avoid conflicts.

Run this command to uninstall old modules (if they exist):
```powershell
Uninstall-Module -Name AzureRM -AllVersions -Force
```

### 2. **Install the Az Module**

Run the following command to install the **Az** module:

```powershell
Install-Module -Name Az -AllowClobber -Force -Scope CurrentUser
```

- **AllowClobber** is used to allow the installation of the module even if there are other conflicting modules.
- **Force** ensures that the module is installed even if some warnings appear.
- **Scope CurrentUser** ensures that it installs just for your user and not system-wide, which can avoid permission issues.

### 3. **Import the Az Module**

After installation, import the module into your session:

```powershell
Import-Module Az
```

This should load the Az module for you to use.

### 4. **Verify the Installation**

To verify that the module has been installed correctly, run:

```powershell
Get-Module -Name Az -ListAvailable
```

This should show the Az module and its details.

### 5. **Authenticate with Azure**

To log into your Azure account using the **Az** module, run:

```powershell
Connect-AzAccount
```

This will open a prompt for you to sign in with your Azure credentials. Once authenticated, you'll be able to run commands to manage your Azure resources.

### Troubleshooting

- If the command `Connect-AzAccount` still doesn't work, check the following:
  - Ensure you have **PowerShell 5.1** or later installed.
  - Verify that you're running PowerShell as an Administrator (sometimes required for installing modules).
  - If you're using **PowerShell Core** (v7+), the **Az** module should be compatible, but you may need to use **Install-Module -Force -AllowClobber** to ensure the installation goes through.

Let me know if you need any more help with this!

guest can not enumerate any of this by default

graph moule and api different things

interestingly this small env is wel managed and in top 1% of security. if env grows it becomes harder to manage and less secure

![image](/content/6.knowledge-base/8.cyber-crusades/6.cloud/4.enumeration/werweme/image.png)

owner of a device would be a member of the locl admin group of the device help us in chucking an attack path

$RoleId = (Get-MgDirectoryRole -Filter "DisplayName eq 'Global Administrator'").Id
(Get-MgDirectoryRoleMember -DirectoryRoleId $RoleId).AdditionalProperties
