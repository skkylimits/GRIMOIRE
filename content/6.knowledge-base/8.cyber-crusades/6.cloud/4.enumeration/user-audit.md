---
title: User Audit
description: You can use PowerShell to enumerate user attributes in Microsoft Entra ID (Azure AD) and identify sensitive information related to passwords. Learn how to perform security auditing, policy enforcement, and troubleshooting.
---

## **Scenario: Security Auditing**

You want to perform a security audit to ensure that no sensitive information related to passwords, such as password policies or password expiration data, is exposed in user attributes.

### **1. Retrieve All Users:**
Start by retrieving all users in the Entra ID using the `Get-MgUser` command:

```powershell
Get-MgUser -All
```

**Simulated Output:**

```text
UserPrincipalName         DisplayName       OnPremisesSecurityIdentifier
----------------         ---------------    ----------------------------
john.doe@domain.com      John Doe          null
jane.smith@domain.com    Jane Smith        S-1-5-21-1234567890-9876543210-1122334455
alice.jones@domain.com   Alice Jones       null
bob.miller@domain.com    Bob Miller        S-1-5-21-1234567890-9876543210-9988776655
```

This returns a list of all users, including both cloud-based (no `OnPremisesSecurityIdentifier`) and on-premises synced (with `OnPremisesSecurityIdentifier`).

### **2. Search for Attributes Related to Password:**

To search through all user attributes to find any properties related to passwords, use this script:

```powershell
Get-MgUser -All | ForEach-Object {
    $Properties = $_
    $Properties.PSObject.Properties.Name | ForEach-Object {
        if ($Properties.$_ -match 'password') {
            "$($Properties.UserPrincipalName) - $_ - $($Properties.$_)"
        }
    }
}
```

**Simulated Output:**

```text
john.doe@domain.com - PasswordPolicies - {DisablePasswordExpiration, ReversibleEncryption}
alice.jones@domain.com - PasswordPolicies - {DisablePasswordExpiration}
```

In this output, we see that `john.doe@domain.com` and `alice.jones@domain.com` have the `PasswordPolicies` property, which indicates that password expiration or reversible encryption settings are applied.

**Security Audit Conclusion:**
- **john.doe@domain.com** has a password policy allowing **reversible encryption** and disabling password expiration, which could be a potential risk if not enforced properly.
- **alice.jones@domain.com** has a password policy with **no expiration**, which may not align with security best practices.

---

## **Scenario: Policy Enforcement**

You want to enforce a policy where users' passwords must have expiration and reversible encryption should be disabled.

### **1. Review All Users' Password Policies:**

Running the same script above, you might want to check if any users' attributes indicate improper password policies that need enforcement:

```powershell
Get-MgUser -All | ForEach-Object {
    $Properties = $_
    $Properties.PSObject.Properties.Name | ForEach-Object {
        if ($Properties.$_ -match 'password') {
            "$($Properties.UserPrincipalName) - $_ - $($Properties.$_)"
        }
    }
}
```

**Simulated Output (Again):**

```text
john.doe@domain.com - PasswordPolicies - {DisablePasswordExpiration, ReversibleEncryption}
alice.jones@domain.com - PasswordPolicies - {DisablePasswordExpiration}
```

### **2. Policy Enforcement Action:**

From the output, you can take action, like notifying admins or users with improper settings. If you have a script to reset the password policies, you can use `Set-MgUser` to enforce the correct policies.

Example to set proper password policies:
```powershell
Set-MgUser -UserId john.doe@domain.com -PasswordPolicies "DisablePasswordExpiration"
```

**Simulated Output:**
```text
Password policies updated for john.doe@domain.com.
```

Now, you can be sure that users like **john.doe@domain.com** will follow the correct password policies.

---

## **Scenario: Troubleshooting or Investigation**

If you suspect there might be an issue with user data, for example, if users are not able to authenticate or there are password-related issues, you can perform an investigation.

### **1. Retrieve User Attributes:**

Let's retrieve a user's full attributes to see if there are any unusual properties related to passwords:

```powershell
Get-MgUser -UserId john.doe@domain.com | fl *
```

**Simulated Output:**

```text
Id                             : 12345
UserPrincipalName               : john.doe@domain.com
DisplayName                     : John Doe
PasswordPolicies                : {DisablePasswordExpiration, ReversibleEncryption}
OnPremisesSecurityIdentifier    : null
OtherMails                      : {john.doe@domain.com}
...
```

### **2. Investigate Specific Attributes:**

Check for any suspicious attributes or issues like weak password policies, or a user who is having trouble with MFA or conditional access policies.

```powershell
Get-MgUser -UserId john.doe@domain.com | Select-Object UserPrincipalName, PasswordPolicies, SignInActivity
```

**Simulated Output:**

```text
UserPrincipalName  : john.doe@domain.com
PasswordPolicies   : {DisablePasswordExpiration, ReversibleEncryption}
SignInActivity     : {LastSignInDateTime: 2023-05-10T12:34:56Z, LastSignInStatus: Success}
```

### **3. Troubleshooting Outcome:**
- You identify that **john.doe@domain.com** has a **reversible encryption** policy enabled, which is less secure. It might have been the root cause for some authentication problems or security concerns.
- You may also notice that the user hasn't had an issue with sign-ins, but it's crucial to follow up and ensure the password policy is updated.

---

## **Conclusion**

In all three scenarios — **Security Auditing**, **Policy Enforcement**, and **Troubleshooting** — you're using PowerShell to enumerate user attributes in Microsoft Entra ID (Azure AD) and identify sensitive information related to passwords. Here's a summary:

- **Security Auditing:** Used to detect any weaknesses or risks in user attributes, like weak password policies or improperly configured settings.
- **Policy Enforcement:** After identifying users with improper configurations, you can enforce policies, such as setting password expiration rules or disabling reversible encryption.
- **Troubleshooting:** When reviewing user data for authentication issues, you may identify misconfigurations in password policies or missing required attributes.

By leveraging PowerShell commands such as `Get-MgUser` and checking for relevant attributes, you can ensure compliance, troubleshoot issues, and mitigate security risks related to password management in your Microsoft Entra ID environment.
