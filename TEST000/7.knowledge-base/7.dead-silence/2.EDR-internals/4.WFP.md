---
title: WFP
description: Every packet tells a story — and the hooks are listening.
---

> WFP is the core underlying technology that powers Windows Firewall.

## Windows Filtering Platform (WFP)

**The Windows Filtering Platform (WFP)** is a powerful system in Windows used to **filter**, **inspect**, and **control network traffic**. It is an essential component for many **security tools**, including **EDR solutions**, to monitor and analyze network behavior.

### WFP Architecture: Layered Design

* WFP is **layer-based**, meaning it breaks down the network stack into **logical points** (layers) where traffic can be inspected or modified.
* Each **layer** has a **pair**: one for **IPv4** and one for **IPv6**.
* Layers contain various **properties** that describe the **network data** at that point (e.g., IP addresses, ports, protocols).

### Filters and Conditions

* A **filter** can be applied to a specific **layer**.
* Filters evaluate **conditions** based on the **properties** of the traffic (e.g., destination IP, port, application).
* Based on those conditions, a **filter action** is triggered to either:

  * **Allow**
  * **Block**
  * **Modify** the traffic.

### Application Interaction

* Applications and security tools can interact with WFP through **WFP APIs**.
* This allows them to **dynamically apply filters**, monitor network data, or even modify how packets are processed.

### WFP and EDR (Endpoint Detection & Response)

* Many **EDR solutions** leverage WFP to **monitor network activity** and collect **network telemetry**.
* They use filters to:

  * **Inspect packets**
  * **Track connections**
  * **Detect suspicious behavior** like:

    * **Command and Control (C2)** communication
    * **Data exfiltration**
    * **Malware traffic**

### Callouts: Custom Kernel Logic

* **Callouts** are optional **kernel-mode callbacks** that extend the behavior of a filter.
* When a filter matches certain traffic, it can **invoke a callout** to run **custom logic** on that packet or connection.
* This adds **fine-grained control** for advanced analysis or response (e.g., delaying, modifying, or rerouting packets).

### Visual Flow

1. **Network traffic** enters the system and passes through various **WFP layers**.
2. **Filters** at each layer inspect the traffic and evaluate **conditions**.
3. If matched, a **filter action** is triggered (allow, block, modify).
4. If a **callout** is defined, it is invoked for deeper inspection or custom handling.
5. **EDR tools** can hook into this system to **collect telemetry**, **enforce policy**, and **detect threats** in real time.

![wfp](/content/7.knowledge-base/7.dead-silence/2.EDR-internals/4.WFP/wfp.png)
