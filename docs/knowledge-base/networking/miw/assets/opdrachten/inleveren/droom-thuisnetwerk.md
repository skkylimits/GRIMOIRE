# Droom Thuisnetwerk

Laten we de initiële opzet van ons droomthuisnetwerk verder verbeteren door een firewall en multilayer switches toe te voegen.

## Initiële Opzet

**Schema:**

**Access Layer:**
- Draadloze routers (2, voor dekkingsgebied)
- Draadloze access points (meerdere, voor volledige dekking)
- Smart TV's, smartphones, tablets, laptops, slimme speakers (draadloos verbonden)
- Draadloze printers (verbonden via wifi)

**Distribution Layer:**
- Router/firewall (centraal punt voor internetverbinding en netwerkbeveiliging)
- DHCP-server (voor het toewijzen van IP-adressen)
- DNS-server (voor het vertalen van domeinnamen naar IP-adressen)
- Multilayer switches: Deze switches bieden zowel layer 2- als layer 3-functionaliteit, waardoor ze routingmogelijkheden hebben en efficiënter kunnen werken in complexe netwerkomgevingen.

**Technische details:**

- Wireless: 802.11ac wifi-standaard voor hoge snelheden en betrouwbaarheid.
- Router/firewall: Gigabit-router met geïntegreerde firewall voor beveiliging en verkeerscontrole.
- Multilayer switches: Switches met ondersteuning voor layer 2- en layer 3-functionaliteit, waardoor efficiënte routing mogelijk is binnen het netwerk.
- DHCP-server: DHCP-toewijzing van IP-adressen op basis van MAC-adressen.
- DNS-server: Resolver voor het vertalen van domeinnamen naar IP-adressen.

Met de toevoeging van een firewall en multilayer switches versterken we de beveiliging en efficiëntie van ons droomthuisnetwerk. In de volgende deelopdrachten kunnen we ons ontwerp verder optimaliseren en aanpassen aan specifieke behoeften en vereisten.

## 2 Tier Netwerk

Een tweelaags (two-tier) netwerkarchitectuur is een ontwerpaanpak die vaak wordt gebruikt in grotere netwerkomgevingen, zoals bedrijfsnetwerken of datacenters. Het bestaat uit twee hoofdniveaus of lagen van netwerkapparaten en -componenten, elk met specifieke functies en verantwoordelijkheden:

1. **Access Layer (Toegangslaag):**
   - Dit is het laagste niveau van de architectuur en staat het dichtst bij de eindgebruikersapparaten, zoals computers, smartphones, printers, enz.
   - Het doel van de toegangslaag is om gebruikers toegang te geven tot het netwerk en om connectiviteit te bieden tussen eindgebruikersapparaten en het netwerk.
   - Typische apparaten in de toegangslaag zijn switches, draadloze access points en gebruikersapparaten zelf.
   - Deze laag is verantwoordelijk voor het verzamelen van verkeer van eindgebruikersapparaten en het doorsturen naar het distributieniveau voor verdere verwerking.

2. **Distribution Layer (Distributie-laag):**
   - Dit is het tweede niveau van de architectuur en fungeert als de "backbone" van het netwerk.
   - Het doel van de distributie-laag is om het verkeer van de toegangslaag te verzamelen, te verwerken en te routeren naar de juiste bestemming.
   - Typische apparaten in de distributie-laag zijn routers, firewalls, en krachtigere switches.
   - Deze laag voert taken uit zoals het implementeren van beveiliging, het scheiden van verkeer in verschillende netwerkdomeinen, en het optimaliseren van netwerkprestaties.

3. **Schema**
   - Access points (bekabeld of draadloos) verbonden met een centrale switch op elke verdieping.
   - De centrale switch op elke verdieping verbonden met een hoofd-switch of router in de distributielaag.
   - Router/firewall fungeert als centraal punt voor internetverbinding en netwerkbeheer.

De centrale switch op elke verdieping verbonden met een hoofd-switch of router in de distributielaag.

In een tweelaags netwerkarchitectuur is er een duidelijke scheiding van taken en verantwoordelijkheden tussen de access en distribution layers. Dit maakt het netwerk schaalbaar, eenvoudiger te beheren en biedt de mogelijkheid om de prestaties en beveiliging te optimaliseren op elk niveau van het netwerk.

## WiFi Oplossing

AlBij het ontwerpen van een thuisnetwerk voor een groot huis met meerdere verdiepingen en kamers, is het belangrijk om goed na te denken over de plaatsing en configuratie van wireless access points (WAPs) om een naadloze en betrouwbare wifi-dekking te garanderen. Hier zijn enkele belangrijke overwegingen en stappen om dit te realiseren:

### 1. **Planning en Plaatsing van Access Points**

#### **Site Survey**
- Voer een site survey uit om de optimale locaties voor de access points te bepalen. Dit kan gedaan worden met behulp van speciale softwaretools die de signaalsterkte en mogelijke storingsbronnen meten.

#### **Strategische Plaatsing**
- Plaats de access points op centrale locaties binnen elke verdieping en zorg ervoor dat ze voldoende overlap hebben voor naadloze roaming.
- Houd rekening met fysieke obstakels zoals muren, vloeren en meubels die het signaal kunnen verzwakken. Plaats WAPs op hogere posities, zoals aan het plafond, voor een betere signaalverspreiding.
- Zorg ervoor dat er voldoende dekking is in de belangrijkste gebruiksruimten, zoals woonkamers, slaapkamers, kantoren en keukens.

### 2. **Gebruik van Mesh-netwerken**

#### **Mesh Access Points**
- Overweeg het gebruik van een mesh-netwerksysteem. Mesh access points werken samen om één groot netwerk te vormen, waardoor de dekking in een groot huis eenvoudiger en effectiever kan worden uitgebreid.
- Mesh-netwerken maken gebruik van meerdere nodes die draadloos met elkaar communiceren, wat zorgt voor betere dekking zonder dat er bekabeling tussen de nodes nodig is.

### 3. **Bekabelde Backbone voor Access Points**

#### **Ethernet Backhaul**
- Als het mogelijk is, verbind de access points via ethernetkabels met een centrale switch of router. Dit wordt ethernet backhaul genoemd en zorgt voor een stabiele en snelle verbinding tussen de WAPs en het kernnetwerk.
- Plaats ethernetkabels naar strategische locaties op elke verdieping waar de access points geplaatst zullen worden.

### 4. **Configuratie en Beheer**

#### **Netwerk Segmentatie**
- Segmenteer het netwerk in verschillende SSIDs voor verschillende gebruiksscenario's, zoals een apart gastnetwerk en een netwerk voor IoT-apparaten.
- Gebruik VLANs (Virtual LANs) om verkeer te scheiden en de beveiliging te verbeteren.

#### **Roaming en Band Steering**
- Zorg ervoor dat de access points zijn geconfigureerd voor naadloze roaming, zodat gebruikers zich vrij kunnen verplaatsen tussen de verdiepingen zonder hun verbinding te verliezen.
- Gebruik band steering om apparaten automatisch te verplaatsen naar de 5 GHz-band voor hogere snelheden en minder congestie, terwijl de 2.4 GHz-band gebruikt wordt voor apparaten die verder weg zijn.

### 5. **Beveiliging**

#### **Sterke Encryptie**
- Gebruik WPA3-encryptie voor het draadloze netwerk om de best mogelijke beveiliging te bieden.
- Zorg voor regelmatige firmware-updates en beveiligingspatches voor alle netwerkapparaten.
