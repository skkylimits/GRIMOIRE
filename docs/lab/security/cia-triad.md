# CIA Triad

The concept of the CIA triad formed over time and does not have a single creator. 

Confidentiality may have first been proposed as early as 1976 in a study by the U.S. Air Force. Likewise, the concept of integrity was explored in a 1987 paper titled "A Comparison of Commercial and Military Computer Security Policies" written by David Clark and David Wilson. 

The paper recognized that commercial computing had a need for accounting records and data correctness. Even though it is not as easy to find an initial source, the concept of availability became more widespread one year later in 1988.

By 1998, people saw the three concepts together as the CIA triad.

![](./cia-triad.png)

## The Central Intelligence Agency

When you hear CIA, the first thing you likely think is Central Intelligence Agency, which is an independent U.S. government agency that is responsible for providing national security intelligence to policymakers in the U.S. However, what many people don't realize is that the CIA Triad actually stands for something else.

What?

CIA - Confidentiality, Integrity and Availability.

The CIA Triad is actually a security model that has been developed to help people think about various parts of IT security.

## What is the CIA Triad?

The CIA triad has three components: Confidentiality, Integrity, and Availability.

It is a model designed to guide policies for information security within an organization.

### **Confidentiality**

Confidentiality is roughly equivalent to privacy. It's crucial in today's world for people to protect their sensitive, private information from unauthorized access.

### **Integrity**

Integrity means that data can be trusted.  It involves maintaining the consistency, accuracy and trustworthiness of data over its entire lifecycle. Designed to protect data from deletion or modification from any unauthorized party, and should be correct, authentic, and reliable.

### **Availability**

Just as it is important that unauthorized users are kept out of an organization's data, data should be available to authorized users whenever they require it. This means keeping systems, networks, and devices up and running.

## Why is the CIA triad important?

The CIA triad provides organizations with a clear and comprehensive checklist to evaluate their incident response plan in the event of a cyber breach. 

The CIA triad is especially important for navigating sources of vulnerabilities and helping discover what went wrong after a network has been compromised. 

From there, this information can be used to help inform weak points, address vulnerabilities, and identify areas of strength.

All of these concepts are important on their own to security professionals of all kinds. The reason these three concepts are grouped into a triad is so information security professionals can think of the relationship between them, how they overlap, and how they oppose one another. Looking at the tension between the three legs of the triad can help security professionals determine their infosec priorities and processes

## How can SecurityScorecard help?

The CIA triad alone is not enough to keep your data secure. You also need to be aware of where your risks are.

SecurityScorecard can help you monitor your information security across 10 groups of [risk factors](https://securityscorecard.com/blog/securityscorecard-10-risk-factors-explained) with our easy-to-understand security ratings. Our ratings continuously monitor every part of your security operation.

We monitor your information security by keeping an eye on your data and the systems and networks you have in place to protect it, and we also monitor your cybersecurity by making sure your organization's systems are patched when they need to be, and that there's no hacker chatter about your organization on the dark web. Once your [score drops](https://securityscorecard.com/platform/security-ratings), you'll know that something has changed, and our platform will then offer remediations to help you fix the problem before there's a breach.


## CIA Triad Use Cases

::: details  E-commerce example
What is an example of the CIA triad?

Think of logging into an e-commerce site to check your orders and make an additional purpose. The e-commerce site uses the three principles of the CIA triad in the following ways:

-   **Confidentiality**: When you log in, you're asked for a password. If it's been a while since your last log-in, you may be asked to input a code that's been sent to you or some other form of [two-factor authentication](https://securityscorecard.com/blog/whats-wrong-with-two-factor-authentication).
-   **Integrity:** Data integrity is provided by making sure your purchases are reflected in your account and allowing you to contact a representative if there's a discrepancy.
-   **Availability:** You can log into your account whenever you want, and you may even be able to contact customer support at any time of the day or night.

This is just one example of how the triad can be practically applied. There are several, more specific examples for each leg of the CIA stool.

For example, examples of **Confidentiality** can be found in various access control methods, like two-factor authentication, passwordless sign-on, and [other access controls](https://securityscorecard.com/blog/what-is-zero-trust-security), but it's not just about letting authorized users in, it's also about keeping certain files inaccessible. Encryption helps organizations secure information from both accidental disclosure and malicious attacks.

**Integrity** can be maintained with access control and encryption as well, but there are many other ways to protect data integrity, both from attacks and corruption. Sometimes it's as simple as a read-only file. Sometimes, it involves hashing or data checksums, which allow data to be audited to ensure the data hasn't been compromised. In other cases, integrity might be protected physically from outside sources that might corrupt it.

**Availability** is really about making sure your systems are up and running so that business can continue, even in the face of an attack. [DDoS (Distributed Denial of Service) attacks](https://securityscorecard.com/blog/four-common-types-of-cybersecurity-attacks-you-need-to-protect-against) rely on limited availability, for example. For this reason, creating a DDoS response plan and redundancy in your systems is a way of ensuring availability. However, when there's no attack, systems can still fail and become unavailable, so load balancing and fault tolerance are a way to keep systems from failing.
:::

::: details Confidentiality
Confidentiality

Sometimes safeguarding data confidentiality involves special training for those privy to sensitive documents. Training can help familiarize authorized people with risk factors and how to guard against them. Further aspects of training may include strong passwords and password-related best practices and information about social engineering methods to prevent users from bending data-handling rules with good intentions and potentially disastrous results.

A good example of methods used to ensure confidentiality is requiring an account number or routing number when banking online. Data encryption is another common method of ensuring confidentiality. User IDs and passwords constitute a standard procedure; two-factor authentication (2FA) is becoming the norm. Other options include Biometric verification and security tokens, key fobs or soft tokens. In addition, users can take precautions to minimize the number of places where information appears and the number of times it is actually transmitted to complete a required transaction. Extra measures might be taken in the case of extremely sensitive documents, such as storing only on air-gapped computers, disconnected storage devices or, for highly sensitive information, in hard-copy form only.
:::

::: details Integrity
Integrity

These measures include file permissions and user access controls. Version control may be used to prevent erroneous changes or accidental deletion by authorized users from becoming a problem. In addition, organizations must put in some means to detect any changes in data that might occur as a result of non-human-caused events such as an electromagnetic pulse (EMP) or server crash.

Data might include checksums, even cryptographic checksums, for verification of integrity. Backups or redundancies must be available to restore the affected data to its correct state. Furthermore, digital signatures can be used to provide effective nonrepudiation measures, meaning evidence of logins, messages sent, electronic document viewing and sending cannot be denied
:::

::: details Availability
Availability

This is best ensured by rigorously maintaining all hardware, performing hardware repairs immediately when needed and maintaining a properly functioning operating system (OS) environment that is free of software conflicts. It's also important to keep current with all necessary system upgrades. Providing adequate communication bandwidth and preventing the occurrence of bottlenecks are equally important tactics. Redundancy, failover, RAID -- even high-availability clusters -- can mitigate serious consequences when hardware issues do occur.

Fast and adaptive disaster recovery is essential for the worst-case scenarios; that capacity relies on the existence of a comprehensive DR plan. Safeguards against data loss or interruptions in connections must include unpredictable events such as natural disasters and fire. To prevent data loss from such occurrences, a backup copy may be stored in a geographically isolated location, perhaps even in a fireproof, waterproof safe. Extra security equipment or software such as firewalls and proxy servers can guard against downtime and unreachable data blocked by malicious denial-of-service (DoS) attacks and network intrusions.
:::

