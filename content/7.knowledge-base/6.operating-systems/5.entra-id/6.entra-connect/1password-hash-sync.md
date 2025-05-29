---
title: Password Hash Sync
---

::card
---
title: PHS
icon: ic:sharp-password
to: https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-password-hash-synchronization
target: _blank
---
Implement PHS
::

## PHS

Password Hash Synchronization is a hybrid identity sign-in method where Microsoft Entra Connect syncs users’ password hashes from on-premises Active Directory to Microsoft Entra ID in the cloud.

**This allows users to sign in to cloud services like Microsoft 365 using the same password as on-premises.**

::tip
Use PHS if you want a simpler, highly available cloud authentication with fewer infrastructure needs.
::

![arch1](/content/7.knowledge-base/6.operating-systems/5.entra-id/6.entra-connect/1password-hash-sync/arch1.png)

## Benefits

* **Simplifies sign-in** by reducing passwords to just one.
* **Improves user productivity** and reduces helpdesk support costs.
* **Enables [leaked](https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks#leaked-credentials) credential detection**, helping protect accounts from compromised credentials.

::note
Leaked credential detection works only for credentials found after enabling PHS.*
::

## Setup Requirements

* Install and configure **Microsoft Entra Connect**.
* Enable **directory synchronization** between on-premises AD and Microsoft Entra ID.
* Turn on **password hash synchronization**.

## Features

* **Low effort:** Easy to deploy and maintain, syncing every two minutes as part of Entra Connect.
* **User experience:** Works best with Entra-joined or hybrid-joined devices; seamless Single Sign-On (SSO) can reduce sign-in prompts.
* **Advanced scenarios:** Required for Microsoft Entra Domain Services; supports Microsoft Entra ID Protection (leaked credentials report); supports Windows Hello for Business.
* **Multifactor Authentication (MFA):** Use Microsoft Entra MFA or Conditional Access; third-party or on-premises MFA requires federation.
* **Business continuity:** Cloud-based, highly available, and scalable. Use a second Entra Connect server in staging mode for redundancy.

## Considerations

* Changes to on-premises account states (like disabling accounts) **may not reflect immediately** in the cloud.
* To speed up updates, **manually trigger sync cycles** after bulk changes.

## Failover

* PHS can be set up as a backup for federated sign-in methods (e.g., AD FS).
