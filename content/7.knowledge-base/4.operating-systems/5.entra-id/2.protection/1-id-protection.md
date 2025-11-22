---
title: ID Protection
description:
---

Microsoft Entra ID Protection detects and helps remediate identity risks for users and workloads, **feeding this info into Conditional Access and SIEM tools for improved security**.

![identity-protection-overview](/content/1.the-lab/2.core-principles/11.identity/identity-protection-overview.png)

After investigation, admins can remediate risks automatically using risk-based policies that require actions like MFA or password resets. If automation isn’t enabled, admins must manually review risks and take actions like dismissing or confirming compromises via the portal, API, or Microsoft Defender XDR.

::important
Identity Protection data can be exported via Microsoft Graph APIs for archiving, investigation, or correlation in tools like SIEM. It can also be sent to Log Analytics, storage accounts, Event Hubs, or other solutions.
::

::card
---
title: Microsoft Entra ID Protection
icon: custom-id-protection
to: https://learn.microsoft.com/en-us/entra/id-protection/
target: _blank
---
Documentation
::

## Detect Risks

Microsoft Entra ID Protection analyzes trillions of signals daily to detect suspicious activity and risks in your tenant. It identifies two types of risks:

* **Sign-in risk:** Suspicious login attempts, like from anonymous IPs or unusual locations.
* **User risk:** Likelihood that an account is compromised, such as leaked credentials or unusual behavior.

::warning
Risk detections trigger actions like MFA prompts, password resets, or access blocks to protect your organization.

If a user uses incorrect credentials, it will not be flagged by Identity Protection since there isn't a risk of credential compromise unless a bad actor uses the correct credentials.
::

## Investigate Risks

Microsoft Entra ID Protection offers three key reports to help investigate risks:

* **Risk detections:** Details of each detected risk.
* **Risky sign-ins:** Sign-ins with one or more risk detections.
* **Risky users:** Users with risky sign-ins or detected risks.

::note
For businesses using Microsoft Security Copilot, risky user reports include AI-powered insights and recommendations to speed up risk mitigation. These reports help identify and fix security weaknesses.
::

## Remediation

**Automatic remediation:** Risk-based Conditional Access can require actions like strong authentication, MFA, or password reset to reduce risk automatically once completed.

**Manual remediation:** If automatic remediation isn’t enabled, admins must review risks via portal, API, or Microsoft 365 Defender and manually dismiss or confirm them.

## Data

**Using Identity Protection Data (Shortened):**

Organizations can export Identity Protection data for archiving, analysis, or integration with other tools:

- **APIs**: Use Microsoft Graph APIs to collect and process data in SIEM tools.
- **Microsoft Sentinel**: Integrate directly for security monitoring.
- **Data Export Options**:
	- Log Analytics workspace
	- Storage account (archiving)
	- Event Hubs (streaming)
	- Other custom solutions

See official docs for setup:

* *[Get started with Microsoft Entra ID Protection and Microsoft Graph](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-graph-api)*
* *[Connect data from Microsoft Entra ID Protection with Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/data-connectors-reference#microsoft)*
* *[How To: Export risk data](https://learn.microsoft.com/en-us/entra/id-protection/howto-export-risk-data)*

## Requirements

### Role

| Role                   | Can Do                                            | Can’t Do                                                   |
| ---------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| Security Administrator | Full access to Identity Protection                | Reset user passwords                                       |
| Security Operator      | View reports, dismiss user risk, confirm sign-ins | Configure policies, reset passwords, alerts                |
| Security Reader        | View reports                                      | Configure policies, reset passwords, alerts, give feedback |
| Global Reader          | Read-only access to Identity Protection           | None                                                       |
| User Administrator     | Reset user passwords                              | None                                                       |

### Licence

| Capability                  | Free / M365 Apps | Entra ID P1  | Entra ID P2 (Required) |
| --------------------------- | ---------------- | ------------ | ---------------------- |
| Risk policies               | No               | No           | Yes                    |
| Security reports (Overview) | No               | No           | Yes                    |
| Risky users report          | Limited info     | Limited info | Full access            |
| Risky sign-ins report       | Limited info     | Limited info | Full access            |
| Risk detections             | No               | Limited info | Full access            |
| User risk alerts            | No               | No           | Yes                    |
| Weekly digest               | No               | No           | Yes                    |
| MFA registration policy     | No               | No           | Yes                    |
