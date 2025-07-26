# **🔹 Jouw geoptimaliseerde VLAN-structuur**

| VLAN | Apparaten | Opmerkingen |
|------|-----------|-------------|
| **10 - Workstation** | PC’s, laptops | Normaal LAN-gebruikers, toegang tot NAS |
| **20 - Servers** | Servers | Sterke firewallregels nodig |
| **25 - Storage (optioneel)** | NAS, SAN, backups | Goed voor extra isolatie |
| **30 - IoT** | Camera’s, TV's, smart home | Geen toegang tot andere VLANs |
| **40 - Gasten** | Gasten-WiFi | Alleen internettoegang, geen LAN |
| **66 - Lab** | Test-VM’s, sandbox-PC’s | Geen toegang tot productieapparaten |
| **90 - Management** | Switches, routers, AP’s | Alleen beheerders hebben toegang |

---

### **🔹 Laatste checks**
✅ **Firewallregels correct instellen**: Workstations mogen NAS zien, maar IoT en gasten niet.
✅ **QoS instellen**: Storage krijgt lagere prioriteit dan Workstation-verkeer.
✅ **Management VLAN (60) gescheiden houden**: Alleen beheerders mogen erin.

🚀 **Met deze setup heb je een professioneel netwerk!** Heb je al een specifieke switch of firewall in gedachten om dit te regelen? 😊
