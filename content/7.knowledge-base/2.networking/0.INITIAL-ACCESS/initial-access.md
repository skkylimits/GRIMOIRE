Helemaal goed — **ik ga je transcript omzetten naar een professioneel, helder, reproduceerbaar Markdown-document**, opgesplitst in **logische hoofdstukken**, met **ASCII-diagrammen**, **pijltjes**, en **stap-voor-stap uitleg** zodat jij dit echt kunt *leren, herhalen en opnieuw opbouwen in je lab*.

Ik behoud **alle inhoud**, maar ik structureer het als een technische deep-dive zoals jij ze gebruikt in je GRIMOIRE.

---

# 🏴 **Red Team Networking: Spoofing, Tunnels, GRE, VXLAN & Routing Hijack**

**Bron:** DEF CON talk van Su-Hao (Taiwan) — opgeschoond & technisch geformatteerd
**Doel:** Begrijpen hoe aanvallers private netwerken kunnen bereiken via spoofing + misconfiguratie in tunnels & routing
**Focus:**

* IP spoofing
* Breaking NAT & IR evasion
* abusing GRE tunnels
* abusing VXLAN tunnels
* routing protocol hijacking (OSPF/BGP-like cases)
* reproducerbare attacker workflows

---

# 📘 **Hoofdstuk 1 — IP Spoofing & Public-Network Abuse**

## 1.1 Wat is IP spoofing?

Een aanvaller kan een pakket sturen met een **bron-IP die niet van hem is**:

```
Attacker (2.2.2.2)  
   |
   |  DNS Request (SRC=3.3.3.3)
   v
DNS Server (1.1.1.1)
   |
   |  DNS Response → 3.3.3.3
```

➡ De DNS-server **kan niet zien** dat 3.3.3.3 nooit het verzoek stuurde.

Dit is de basis voor *amplification* én *source disguise*.

---

## 1.2 Waarom werkt dit nog steeds?

Omdat **veel ISP’s geen egress filtering toepassen (BCP-38)**.

---

# 📘 **Hoofdstuk 2 — Spoofing in Corporate Networks**

## 2.1 Fout #1 — Firewalls zonder outbound filtering

Wanneer NAT **niet wordt toegepast**, gebeurt dit:

```
[Server] --> packet --> [Firewall]
Firewall: NAT disabled
      |
      v
WAN (public internet)
```

De server denkt: “Ik kan niet naar internet.”
Maar **de pakketten verlaten WÉL het netwerk**, alleen zonder antwoord.

---

## 2.2 Aanval: Spoofing + compromised internal device

Attacker heeft één foothold op **1.3**.

Hij stuurt:

```
SRC = 99.99.99.99   (aanvaller)
DST = 192.168.1.2   (intern target)
```

Flow:

```
Attacker → Tunnel → 1.3 → Router → 1.2
```

Response:

```
1.2 → Internet → 99.99.99.99 (attacker)
```

IR ziet in de logs:

```
Source: 99.99.99.99   →   Target: 192.168.1.2
```

💀 **Geen spoor naar 1.3. De laterale beweging is volledig onzichtbaar.**

---

# 📘 **Hoofdstuk 3 — IR Evasion: Waarom Incident Response faalt**

## 3.1 Normale laterale beweging

```
C1 → C2 → DC
```

IR-team ziet:

* Logins vanaf vorige host
* Traceerbare jump chain

## 3.2 Spoofing-scenario

```
Attack Source (spoofed) = 99.99.99.99
Internal Target = 192.168.1.2
```

IR ziet:

```
99.99.99.99 → 1.2
```

Maar echte keten was:

```
1.3 → (spoof public IP) → 1.2
```

🔥 **Geen enkele log bevat 1.3.**

---

# 📘 **Hoofdstuk 4 — Misbruik NAT: H.323 & SNAT Abuse**

## 4.1 NAT traversal via H.323

Routers openen automatisch **tijdelijke NAT-regels**:

```
Attacker → H.323 packet → Router → opens port forwarding
```

Resultaat:

```
Attacker connects to:
router_public_ip:445  →  192.168.1.3:445
```

Webserver ziet **publiek IP** als bron, nooit de echte interne host.

---

## 4.2 SNAT misbruik

Attacker stuurt:

```
SYN (SRC = 1.3), DST = attacker-server
```

Router denkt dat 1.3 een outbound verbinding maakt
→ creëert SNAT state entry
→ attacker kan intern target bereiken via deze SNAT flow.

---

# 📘 **Hoofdstuk 5 — VPN Abuse voor Source IP Spoofing**

Veel commerciële SSL VPN’s (😬) laten toe:

```
Client → VPN → Spoof ANY internal source IP
```

Open-source oplossingen zoals WireGuard & OpenVPN zijn **safe**, mits juist geconfigureerd.

---

# 📘 **Hoofdstuk 6 — Initial Access via Internet Exchanges (IXP)**

Omdat IXP’s vaak **L2-netwerken zonder filtering** zijn:

```
Attacker VM on IXP  
     |
     |  set next-hop = victim_router_private_subnet
     v
Victim router forwards packet into private LAN
```

Response komt terug naar de *publieke* attacker IP.

---

# 📘 **Hoofdstuk 7 — GRE Tunnel Hijacking**

## 7.1 Hoe werkt GRE (vereenvoudigd)

```
Inner Packet (victim LAN)
   ↓
+------------------+
| GRE Header       |
+------------------+
   ↓
Outer UDP/IP packet
```

Geen authenticatie
Geen encryptie
Geen anti-spoofing

---

## 7.2 GRE Hijack Attack Flow

```
Attacker craft GRE packet:
SRC = remote tunnel peer (spoofed)
DST = victim GRE endpoint
Inner packet = DNS / TCP request
```

Victim doet:

```
Unpack GRE → sees internal destination → forwards into LAN
```

Target antwoordt naar de **public attacker IP**.

---

## 7.3 GRE Scanner (concept)

1. Maak lokale GRE interface
2. Spoof GRE source IP’s
3. Stuur ICMP echo request als inner packet
4. Als victim de inner ICMP reply naar jou stuurt → YOU FOUND THE PEER

---

# 📘 **Hoofdstuk 8 — VXLAN Hijacking (het echte DEF CON nightmare stuk)**

## 8.1 VXLAN Basics

```
L2 Ethernet frame
   ↓
VXLAN Header (VNI)
   ↓
UDP packet (default port 4789 / 8472)
```

## 8.2 Critical Issue: L2 Learning is **ON by default**

Linux kernel accepteert VXLAN packets *van elke source IP*
zolang VNI en port correct zijn.

Attacker stuurt:

```
SRC IP = 99.99.99.99 (any)
VXLAN packet with:
  - VNI = victim VNI
  - Inner MAC = ff:ff:ff:ff:ff:ff (broadcast)
```

Victim kernel doet:

```
FDB learning:
MAC ff:ff:ff:ff:ff:ff → next-hop = 99.99.99.99
```

Vanaf nu stuurt de router **alle broadcasts** naar de aanvaller.

---

## 8.3 NDP/ARP Leak → Inner subnet discovery

Attacker stuurt inner-L2 broadcast → victim genereert:

```
ARP / NDP reply
(with its internal IP + MAC)
```

→ volledig interne IP-range revealed.

---

## 8.4 Volledige VXLAN takeover (ASCII)

```
Attacker
  |
  |  forge VXLAN packet  (VNI = victim)
  v
Victim Router
  |
  | updates FDB → broadcast → attacker
  |
Intranet exposed
```

---

# 📘 **Hoofdstuk 9 — Routing Protocol Hijacking (OSPF/BGP-like)**

Zodra je GRE/VXLAN hebt gekaapt, kun je meedoen met **routing protocols**.

## 9.1 Scenario

Victim gebruikt:

* VXLAN to connect sites
* OSPF/BGP to share routes

Attacker kan:

1. VXLAN hijacken
2. OSPF Hello zien
3. Zelf OSPF adjacency vormen
4. Nieuwe route adverteren:

```
10.0.0.4/32 = Domain Controller IP
```

Omdat /32 meer specifiek is dan /24, wordt **alle DC-traffic naar attacker gestuurd**.

---

## 9.2 Impact per service

| Service IP            | Impact                                                                |
| --------------------- | --------------------------------------------------------------------- |
| Domain Controller     | Full domain compromise (NTLM relay, SMB signing disabled, ADCS abuse) |
| Proxmox / Hypervisors | VM takeover                                                           |
| HTTPS servers         | MITM + session hijack                                                 |
| DNS                   | Redirection + phishing                                                |
| Mailservers           | credential harvesting                                                 |
| Any TCP service       | Hijack or DoS                                                         |

---

# 📘 **Hoofdstuk 10 — Detection & Blue-team Defenses**

### 1. Ban unencrypted tunnels:

```
GRE
IP-in-IP (SIT)
GRETAP
VXLAN (default config)
```

### 2. Firewall MUST filter:

* outbound private → internet
* spoofed packets
* GRE / VXLAN unless strictly required

### 3. Routing security:

* OSPF only between authenticated neighbors
* Minimum prefix length (e.g., /24)
* Monitor for unexpected announcements

---

# 📘 **Hoofdstuk 11 — Red Team Workflow Cheat Sheet**

## **Step 1 — Scan for Tunnels**

* GRE scan
* VXLAN scan (VNI brute-force 1–100)
* Look for ARP/NDP leaks

## **Step 2 — Spoof source IP**

* Use public IP as claimed origin
* Send into private LAN via tunnel

## **Step 3 — Create breakpoints**

* Abuse NAT (H.323 / SNAT)
* Create temporary inbound ports

## **Step 4 — Hijack routing**

* Join OSPF
* Advertise more-specific routes

## **Step 5 — Pivot, escalate, or exfiltrate**

* Reach DC or hypervisors
* MITM or impersonate

---

# 📘 **Hoofdstuk 12 — ASCII Overzicht van de Complete Attack Chain**

```
                ┌────────────────────────────┐
                │ 1. Public-IP Spoofing      │
                └──────────────┬─────────────┘
                               │
                               ▼
            ┌──────────────────────────────┐
            │ 2. Abuse GRE / VXLAN tunnel  │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 3. Packet forwarded into LAN │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 4. Response goes to attacker │
            │    (public IP)               │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 5. IR sees only public IP    │
            │    → internal pivot invisible│
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 6. Hijack routing (OSPF)     │
            └──────────────┬───────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │ 7. Domain controller / infra │
            │    hijack                    │
            └──────────────────────────────┘
```

---
