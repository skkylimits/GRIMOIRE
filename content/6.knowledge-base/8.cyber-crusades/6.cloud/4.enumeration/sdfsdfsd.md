### **Apps & Service Principals**

Microsoft uses confusing naming conventions when it comes to **App Registrations** and **Enterprise Applications**:

| **Portal Name**        | **Command Line Name**  | **Graph API Name**   |
|------------------------|------------------------|----------------------|
| App Registrations      | Applications           | Application Objects  |
| Enterprise Applications| Service Principals     | Service Principals   |

**What’s the Difference?**

- **App Registrations** → These are **configurations** of an application (like redirect URIs, permissions, etc.).
- **Enterprise Applications (Service Principals)** → These are **instances** of applications where **roles & permissions** are assigned.

#### **Apps (Application Registrations)**

- **List all registered applications** (in App Registrations):
    ```powershell
    Get-MgApplication -All
    ```

- **Get details of a specific application** by AppId:
    ```powershell
    Get-MgApplicationByAppId -AppId f072c4a6-b440-40de-983f-a7f3bd317d8f | fl *
    ```

- **Find an application by display name**:
    ```powershell
    Get-MgApplication -All | Where-Object {$_.DisplayName -match "app"}
    ```

- **List applications with a password**:
    ```powershell
    Get-MgApplication -All | Where-Object {$_.PasswordCredentials -ne $null}
    ```

- **Get owner(s) of an application**:
    ```powershell
    (Get-MgApplicationOwner -ApplicationId 35589758-714e-43a9-be9e-94d22fdd34f6).AdditionalProperties.userPrincipalName
    ```

- **Get applications where a user has a role**:
    ```powershell
    Get-MgUserAppRoleAssignment -UserId roygcain@defcorphq.onmicrosoft.com | fl *
    ```

- **Get applications where a group has a role**:
    ```powershell
    Get-MgGroupAppRoleAssignment -GroupId 57ada729-a581-4d6f-9f16-3fe0961ada82 | fl *
    ```

#### **Abusing Application Ownership for Privilege Escalation**

- **If a user owns an application**, they can **add a Client Secret**, which acts like a **password** for the application.
- If the application has **Global Admin permissions**, adding a Client Secret would give the user **Global Admin access**.

#### **How Attackers Use This:**
1. Find an **application** with **high privileges** (e.g., Global Admin).
2. If the user owns it, they can **add a Client Secret**.
3. The attacker can then use the **Client Secret** to access the **Graph API** as that application.

**Logs**:
- This action is **logged**. Logs will show **who added the secret**, when, and to which application.

**Why Assign High Privileges to an Application?**
- To **automate tasks** like managing identities, provisioning resources, or backing up VMs.
- It’s **easier** to grant broad permissions than to manage security in detail.

**Persistence**:
- Adding a **Client Secret** is a common technique to **maintain access**.
- If security teams miss it, the attacker could retain access for **months**.

#### **Service Principals (Enterprise Applications)**

- **List all service principals** (in Enterprise Applications):
    ```powershell
    Get-MgServicePrincipal -All
    ```

- **Get details of a specific service principal** by ID:
    ```powershell
    Get-MgServicePrincipal -ServicePrincipalId fd518680-b290-4db2-b92a-5dbd025c6791 | fl *
    ```

- **Find a service principal by display name**:
    ```powershell
    Get-MgServicePrincipal -All | Where-Object {$_.DisplayName -match "app"}
    ```

- **List service principals with an application password**:
    ```powershell
    Get-MgServicePrincipal -All | Where-Object {$_.KeyCredentials -ne $null}
    ```

- **Get owner(s) of a service principal**:
    ```powershell
    (Get-MgServicePrincipalOwner -ServicePrincipalId fd518680-b290-4db2-b92a-5dbd025c6791).AdditionalProperties.userPrincipalName
    ```

- **List objects owned by a service principal**:
    ```powershell
    Get-MgServicePrincipalOwnedObject -ServicePrincipalId fd518680-b290-4db2-b92a-5dbd025c6791
    ```

- **List objects created by a service principal**:
    ```powershell
    Get-MgServicePrincipalCreatedObject -ServicePrincipalId fd518680-b290-4db2-b92a-5dbd025c6791
    ```

- **Get group and role memberships of a service principal**:
    ```powershell
    Get-MgServicePrincipalMemberOf -ServicePrincipalId fd518680-b290-4db2-b92a-5dbd025c6791 | fl *
    ```
