Perfect.
We gaan **hoofdstuk voor hoofdstuk** jouw corporate omgeving testen — **veilig, gecontroleerd en reproduceerbaar**.

We beginnen met **Hoofdstuk 1 – IP Spoofing & Public Network Abuse**.

Doel van dit hoofdstuk:

1. **Testen of jouw corporate netwerk spoofed traffic doorlaat**
2. **Kijken of jouw ISP egress filtering toepast (BCP-38)**
3. **Controleren of jouw interne firewall spoofed outbound blokkeert**
4. **Meten of responses terugkomen naar de aanvaller (reflectie-aanval)**

We houden het **volledig veilig**:
je stuurt alleen **non-destructive test packets** (ICMP/UDP) en je test alleen jouw eigen omgeving.

---

# ✅ **HOOFDSTUK 1 — PRAKTISCHE SECURITY TEST**

Hier zijn de **concrete stappen** die jij kan uitvoeren in je corporate netwerk.

---

# 🔎 **Stap 1 — Mag ik spoofed source IP’s uitsturen?**

Dit test *jouw eigen corporate netwerk*.

### 🧪 Test 1: Spoof een publiek IP dat **NIET van jou is**

Dit doe je vanuit een testmachine **binnen je corporate LAN**.

Gebruik Linux of Windows + Scapy.

### Linux:

```bash
sudo scapy
```

```python
send(IP(src="8.8.8.8", dst="1.1.1.1")/ICMP(), iface="eth0")
```

### Windows (Scapy for Windows):

```powershell
python - <<EOF
from scapy.all import *
send(IP(src="8.8.8.8", dst="1.1.1.1")/ICMP())
EOF
```

### 🔍 Wat moet je observeren?

| resultaat                                                    | betekenis                                             |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ❌ Je krijgt direct een local error (“permission”, “blocked”) | jouw OS blokkeert spoofing (goed)                     |
| ❌ Packet verlaat het netwerk niet (firewall drop)            | firewall doet **anti-spoofing** (goed)                |
| ✔️ Packet verlaat het netwerk (gezien in packet capture)     | ⚠️ **corporate netwerk is spoofable**                 |
| ✔️ Je krijgt ICMP reply op het “valse” IP                    | EXTREEM slecht → betekent dat uplink ook niet filtert |

Test 1 vertelt je **of spoofing vanaf interne clients mogelijk is**.

---

# 🔎 **Stap 2 — Sniff outbound interface (firewall-vlak)**

Voer deze test uit op:

* je firewall
* of je uplink-router
* of een span-poort

### Wat je zoekt:

Zie je ongefilterde spoofed packets uit je infrastructuur vertrekken?

Output wil je *niet* zien:

```
Src=8.8.8.8 → Dst=1.1.1.1   OUTBOUND
```

Als dat zo is → jouw netwerk laat spoofed traffic door.

---

# 🔎 **Stap 3 — Test BCP-38 van jouw ISP**

Dit is de belangrijkste check.

Gebruik jouw echte publieke IP-adres als **spoof target**.

### 🧪 Test:

Vanuit je LAN stuur:

```
SRC = 203.0.113.5   (jouw eigen publieke IP)
DST = 1.1.1.1
```

```python
send(IP(src="203.0.113.5", dst="1.1.1.1")/ICMP())
```

### Dan check je je firewall logs of je packet capture:

| resultaat                        | betekenis                                        |
| -------------------------------- | ------------------------------------------------ |
| ❌ Packet bereikt internet niet   | ISP filtert (goed)                               |
| ✔️ Packet komt *wel* op internet | ISP heeft GEEN BCP-38 filtering → ernstig risico |

---

# 🔎 **Stap 4 — Spoof een private IP naar internet**

Test of jouw firewall de basisregel volgt:
**Private IP’s mogen NOOIT naar internet worden doorgelaten.**

Test:

```python
send(IP(src="192.168.66.66", dst="1.1.1.1")/ICMP())
```

### Slecht resultaat:

```
Src=192.168.66.66 → Internet
```

Dit betekent:

⚠️ **Outbound firewall is misconfigured**
⚠️ Dit maakt GRE/VXLAN hijacking later veel makkelijker
⚠️ Dit maakt jouw netwerk als reflectievector bruikbaar voor DDoS

---

# 🔎 **Stap 5 — Controleer firewall NAT-behavior**

We willen weten of NAT:

* correcte bron-IP mapping afdwingt
* spoofed sources herschrijft
* of NAT volledig uitstaat (groot risico)

### Test:

Stuur een spoofed packet **naar een publieke server die jij controleert**.

Bijv. jouw VPS.

```
SRC = 4.4.4.4
DST = jouw_vps_public_ip
```

```python
send(IP(src="4.4.4.4", dst="YOUR.VPS.IP")/ICMP())
```

Op de VPS:

```bash
tcpdump -n -i any icmp
```

| resultaat                                       | betekenis                    |
| ----------------------------------------------- | ---------------------------- |
| VPS ziet src=**jouw echte corporate IP**        | NAT herschrijft spoof → goed |
| VPS ziet src=**4.4.4.4 (spoof blijft bestaan)** | NAT uit → ⚠️ gevaarlijk      |

NAT die niet herschrijft = **insecure-by-design**.

---

# 🔎 **Stap 6 — Maak een Spoofing Scorekaart**

Vul onderstaande checklist in:

| Test                                | Resultaat | Veilig?      |
| ----------------------------------- | --------- | ------------ |
| Spoofed public IP verlaat LAN       | yes/no    | nee = veilig |
| Spoofed private IP verlaat LAN      | yes/no    | nee = veilig |
| NAT herschrijft spoofed IP          | yes/no    | ja = veilig  |
| ISP filtert spoofed source (BCP-38) | yes/no    | ja = veilig  |
| Firewall detecteert spoofing        | yes/no    | ja = veilig  |

Wanneer ook maar **één** van deze "no/unsafe" is → jouw netwerk is gevoelig voor de technieken die later in DEF CON talk komen:

* NAT bypass
* invisible lateral movement
* GRE hijacking
* VXLAN hijacking
* routing-manipulatie

---

# ✔️ Klaar met Hoofdstuk 1?

Wil je:

### 👉 (A) Dat ik jou help de testresultaten te analyseren?

### 👉 (B) Nu doorgaan naar **Hoofdstuk 2: NAT Bypass & IR Evasion** (volgende testset)?

Zeg gewoon **A of B**.

---

Perfect, dan gaan we **precies zoals de DEF CON researcher** testen:

**Extern (95.98.210.250) → Intern (92.70.237.19)**
met drie soorten spoofed packets:

1. **Private IP spoof**
2. **Bogon IP spoof**
3. **Random publiek IP spoof**

Doel:

* Check of jouw corporate firewall **inbound spoofing** accepteert
* Check of NAT/states worden aangemaakt
* Check of een interne server reageert op spoofed requests (ernstig)
* Check of dit netwerk vatbaar is voor GRE/VXLAN hijack (hoofdstuk 2+)

Dit is een veilige test (alleen ICMP), maar extreem waardevol.

---

# 🧪 **TEST 1: EXTERN → INTERN SPOOFED PACKETS**

### ✔️ Je draait dit op *95.98.210.250*

### ✔️ Target is *92.70.237.19*

We starten meteen de testset.

---

# 🧪 TEST 1A — Privé IP spoof naar corporate WAN

(private IP mag **nooit** inbound geaccepteerd worden)

Run op aanvaller:

```bash
/home/skkylimits/.pyenv/versions/3.12.6/bin/python3.12 - <<EOF
from scapy.all import *
send(IP(src="192.168.66.66", dst="92.70.237.19")/ICMP())
print("TEST 1A SENT")
EOF
```

**Interpretatie:**

| Wat gebeurt er                 | Betekenis                                             |
| ------------------------------ | ----------------------------------------------------- |
| Geen reply                     | Firewall goed                                         |
| ICMP reply                     | ⚠️ Firewall accepteert private spoof inbound → slecht |
| Rate-limited icmp unreachable  | acceptable                                            |
| Jij krijgt helemaal niks terug | normaal                                               |

---

# 🧪 TEST 1B — Bogon/Carrier-range spoof

(ook **nooit** inbound geaccepteerd)

```bash
/home/skkylimits/.pyenv/versions/3.12.6/bin/python3.12 - <<EOF
from scapy.all import *
send(IP(src="100.64.0.1", dst="92.70.237.19")/ICMP())
print("TEST 1B SENT")
EOF
```

Interpretatie is dezelfde als Test 1A.

---

# 🧪 TEST 1C — Spoof een RANDOM publiek IP

(meest kritieke test → gebruikt door GRE/VXLAN hijack)

```bash
/home/skkylimits/.pyenv/versions/3.12.6/bin/python3.12 - <<EOF
from scapy.all import *
send(IP(src="8.8.4.4", dst="92.70.237.19")/ICMP())
print("TEST 1C SENT")
EOF
```

---

# 🧪 TEST 1D — Spoof **je eigen echte externe IP**

→ testen of NAT een breakpoint creëert
(dit is waar de DEF CON talk gevaarlijk wordt)

```bash
MY_IP="95.98.210.250"

/home/skkylimits/.pyenv/versions/3.12.6/bin/python3.12 - <<EOF
from scapy.all import *
send(IP(src="$MY_IP", dst="92.70.237.19")/ICMP())
print("TEST 1D SENT")
EOF
```

Als je hier een **ICMP echo-reply** ontvangt → heel slecht.
Dan betekent het:

➡️ firewall creëert NAT-state voor spoofed inbound
➡️ GRE/VXLAN hijack wordt mogelijk
➡️ attacker kan breakpoints maken
➡️ IR toont verkeerde bron-IP

---

# 🧪 TEST 1E — TCP SYN NAT-breakpoint test

(poort 445 → wordt misbruikt in laterale beweging & NAT poisoning)

```bash
/home/skkylimits/.pyenv/versions/3.12.6/bin/python3.12 - <<EOF
from scapy.all import *
send(IP(src="8.8.4.4", dst="92.70.237.19")/TCP(dport=445, flags="S"))
print("TEST 1E SENT")
EOF
```

**Als je SYN/ACK terugkrijgt = EXTREEM kwetsbaar**
Dit is waar de DEF CON presentatie over ging → NAT misconfiguratie.

---

# 🔍 **Wat ik van jou wil na het draaien van de tests**

Kopiëer **de outputs** van:

* Test 1A
* Test 1B
* Test 1C
* Test 1D
* Test 1E

En vertel me:

* Kreeg jij een ICMP reply?
* Kreeg jij TCP response?
* Kreeg je **iets** terug?
* Of complete stilte?

Daarna geef ik jou:

### ✔️ Threat assessment

### ✔️ Hoe kwetsbaar is jouw netwerk volgens DEF CON model

### ✔️ Wat dit betekent voor GRE/VXLAN hijack (hoofdstuk 2)

### ✔️ Of OSPF hijack mogelijk is (hoofdstuk 3)

### ✔️ Wat je blue-team moet fixen

---

Zodra je de output plakt, gaan we diep verder.


Goede vraag — en **ja**, dit raakt precies aan *interne netwerk-segmentatie*, maar het is **veel dieper** dan alleen klassieke “VLAN hopping”.

Wat de DEF CON talk laat zien (en wat we in hoofdstuk 2–7 gaan testen) is:

# 🚨 **Niet VLAN-hopping zoals in oude switch-attacks…**

Maar:

### 🧨 **L3–L4 protocol-misconfiguraties die VLAN-grenzen negeren**

zelfs wanneer je:

* router-on-a-stick goed hebt
* inter-VLAN ACL’s hebt
* DHCP snooping hebt
* DAI hebt
* Private VLANs hebt
* IP helper-tables goed staan
* ARP filtering doet

De aanvalsmethode is **anders**:

het gaat **niet over switches**,
maar over **routers, firewalls en tunnels**.

Dus ja, het eindresultaat voelt als VLAN-hopping, maar **de route ernaartoe** is heel modern en totaal anders.

---

# 🧪 **Wat de talk test binnen je interne netwerk (H2–H7)**

Elke stap gaat over *L3+ misconfiguraties*, niet L2-switching.

Hier is de mapping:

---

# 1️⃣ **NAT bypass van binnenuit**

Doel:
Kan een geïnfecteerde client met spoofed IP **andere interne VLANs bereiken** door NAT en firewall in de war te brengen?

➡️ Dit is **niet** VLAN-hopping
➡️ Dit is **firewall-state poisoning**

Veel routers maken **one-way NAT-entries** op basis van spoofed traffic.

---

# 2️⃣ **Interne IP-spoofing**

Doel:
Laat jouw router/firewall spoofed *interne* IP’s toe tussen VLANs?

Voorbeeld:

```
VLAN10 → doet alsof het VLAN20 is → VLAN20 beantwoorden
```

➡️ Dit is *L3-lateral movement*, maar *onzichtbaar* voor IR.

---

# 3️⃣ **GRE misconfiguratie binnen je netwerk**

Als je ergens GRE, IPIP, GRETAP, SIT of Tunnel Interfaces hebt:

➡️ Een PC uit VLAN10 kan doen alsof hij de GRE-peer is
➡️ Router denkt: “dit is mijn tunnelpartner”
➡️ Alles uit tunnel → ongefilterd naar ander VLAN

Dit is EXACT waar de DEF CON talk famous om is.

---

# 4️⃣ **VXLAN hijack binnen je netwerk**

VXLAN is VLAN over UDP.

➡️ Als jouw firewall of router VXLAN accepteert
➡️ En “learning mode” staat aan (default Linux behaviour)
→ Dan kan een host uit VLAN10:

```
VXLAN VNI 42 faken
MAC-learning triggeren
broadcasts / ARP / DHCP / NDP opzuigen
```

En daarmee:

* VLAN-isolatie breken
* verkeer uit andere zones zien
* ARP/NDP spoofing doen buiten eigen VLAN
* L2 inside L3 bypassen

Dit is echt **modern VLAN-hopping**.

---

# 5️⃣ **OSPF hijack (routing hijack tussen VLANs)**

Als OSPF aanstaat op interne interfaces:

➡️ een machine in VLAN X kan zich voordoen als router
➡️ “more specific routes" adverteren → zoals `/32`

Dit veroorzaakt:

```
Alle traffic voor DomainController → naar aanvaller
```

Dit is **fucking gevaarlijk** omdat:

* DC login verkeer komt bij jou
* SMB signing soms niet enforced
* Kerberos tickets kunnen gelekt worden
* volledige domeinovername mogelijk wordt

---

# 6️⃣ **Inter-VLAN tunnel breakpoints**

Veel routers maken per ongeluk *terugroutes* als ze rare combinaties van:

* spoofed packets
* VXLAN
* GRE
* IPIP
* NAT
* helper addresses

zien.

Dit creëert een:

✔️ **pseudo-tunnel**
✔️ **van VLAN A naar B**
✔️ die helemaal niet bestaat in de config
✔️ maar wel door NAT/state tables ontstaat

Dit is wat de DEF CON researcher bedoelde met:

> “breakpoints in the attack chain”

---

# 7️⃣ **IR evasion binnen het LAN**

Dit is waar de aanval eng wordt:

Als jij van VLAN10 → VLAN20 gaat, dan ziet IR:

```
Source IP: 8.8.4.4
Target IP: 10.10.20.5
```

NIET:

```
10.10.10.5 → 10.10.20.5
```

IR ziet GEEN internal pivot.
Intrusion path blijft onzichtbaar.

➡️ Geen correlation
➡️ Geen chain-of-events
➡️ Geen mapping naar eerste infectie
➡️ Geen forensics

---

# 🎯 **TL;DR — is dit VLAN hopping?**

### Ja, maar op een **heel ander niveau**:

| Old school VLAN hopping | DEF CON VLAN bypassing       |
| ----------------------- | ---------------------------- |
| switch-based            | router/firewall-based        |
| L2                      | L3–L4                        |
| ARP poisoning           | IP spoofing + NAT poisoning  |
| DTP trunking abuse      | GRE/VXLAN hijack             |
| ARP flood               | routing hijack               |
| beperkt scala           | works in enterprise networks |
| zichtbaar in logs       | volledig onzichtbaar voor IR |

---

# 💡 **Wil je NU Hoofdstuk 2 starten?**

(Interne spoofing test)

Daar testen we:

* Kan VLAN A spoofed verkeer sturen naar VLAN B?
* Doet jouw interne firewall L3 anti-spoofing?
* Kunnen interne machines NAT-breakpoints creëren?
* Hoe reageert jouw router op spoofed traffic tussen zones?

Zeg:

### **"Start Hoofdstuk 2"**

of

### **"Leg Hoofdstuk 2 eerst uit"**

We kunnen stap-voor-stap verder.
