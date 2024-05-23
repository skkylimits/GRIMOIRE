# Intro Beveiliging

## Netwerkbeveiliging

Netwerkbeveiliging is een cruciaal aspect van het ontwerpen en onderhouden van computernetwerken. Het is belangrijk om te begrijpen hoe kwaadwillenden onze netwerken kunnen aanvallen, zodat we effectieve beschermingsmaatregelen kunnen nemen. Hieronder volgt een overzicht van enkele belangrijke punten omtrent netwerkbeveiliging.

## Historische Context van Netwerkbeveiliging

Het internet werd tientallen jaren geleden ontworpen door academici en onderzoekers aan universiteiten. Het oorspronkelijke doel was om computers met elkaar te verbinden zodat onderzoeksgegevens konden worden uitgewisseld. Destijds werd er weinig aandacht besteed aan beveiliging, omdat de omvang en het gebruik van het internet zoals we dat vandaag kennen niet voorzien waren. Tegenwoordig gebruiken we het internet voor allerlei doeleinden, zoals e-commerce, cloud-opslag, en communicatie, wat beveiliging essentieel maakt.

## Belang van Netwerkbeveiliging

Netwerkbeveiliging draait om het beschermen van de integriteit, beschikbaarheid en vertrouwelijkheid van gegevens en netwerkbronnen. Elk ontwerpbesluit moet rekening houden met mogelijke bedreigingen en hoe deze kunnen worden gemitigeerd.

## Malware: Virussen en Wormen

**Virussen:**

- Virussen zijn schadelijke softwareprogramma's die zich kunnen verspreiden door menselijke actie, zoals het klikken op een besmette link of het openen van een geïnfecteerd bestand. Een virus kan zich hechten aan legitieme programma's of bestanden en deze beschadigen of verwijderen.

**Wormen:**

- Wormen zijn zelfstandige malwareprogramma's die zich verspreiden zonder tussenkomst van de gebruiker. Ze maken gebruik van kwetsbaarheden in software om zich automatisch over netwerken te verspreiden. Wormen kunnen systemen verstoren en netwerken overbelasten door hun snelle verspreiding.

## Gevaren van Malware

**Spyware:**

- Spyware is een type malware dat gegevens van de gebruiker verzamelt zonder hun medeweten. Dit kan variëren van het bijhouden van bezochte websites tot het vastleggen van toetsaanslagen, inclusief wachtwoorden en persoonlijke informatie. Deze gegevens worden vervolgens naar een externe partij gestuurd.

**Ransomware:**

- Ransomware versleutelt bestanden op de geïnfecteerde computer en eist losgeld, vaak in cryptocurrency zoals Bitcoin, in ruil voor de decryptiesleutel. Bekende incidenten, zoals de ransomware-aanval op de Universiteit Maastricht, tonen de ernstige gevolgen van dergelijke aanvallen.

**Botnets:**

- Een botnet bestaat uit een groot aantal met malware geïnfecteerde computers die worden bestuurd door een aanvaller. Deze geïnfecteerde computers, of "bots," kunnen worden gebruikt voor verschillende kwaadaardige activiteiten zoals het versturen van spam of het uitvoeren van DDoS-aanvallen.

## Distributed Denial-of-Service (DDoS) Aanvallen

- **DDoS-aanvallen:**
  - Bij een Distributed Denial-of-Service-aanval stuurt een aanvaller een enorme hoeveelheid verkeer naar een doelwit, zoals een website of server, met de bedoeling deze te overbelasten en onbereikbaar te maken. De aanvaller gebruikt hiervoor vaak een botnet om simultaan verzoeken te sturen, waardoor de server wordt overspoeld en crasht.

## Netwerkbeveiligingsmaatregelen

Om netwerken te beschermen tegen deze bedreigingen, zijn verschillende beveiligingsmaatregelen en best practices nodig:

1. **Firewalls:**
   - Firewalls controleren het inkomende en uitgaande verkeer op basis van vooraf ingestelde beveiligingsregels en kunnen ongeoorloofde toegang blokkeren.

2. **Antivirus- en Antimalwaresoftware:**
   - Deze software kan virussen, wormen en andere soorten malware detecteren, blokkeren en verwijderen.

3. **Updates en Patching:**
   - Regelmatige updates en patches voor software en systemen kunnen bekende kwetsbaarheden verhelpen en de kans op exploits verminderen.

4. **Intrusion Detection Systems (IDS) en Intrusion Prevention Systems (IPS):**
   - IDS en IPS kunnen verdachte activiteiten in het netwerk detecteren en preventieve maatregelen nemen om aanvallen te stoppen.

5. **Versleuteling:**
   - Het versleutelen van gegevens beschermt deze tegen ongeoorloofde toegang, zelfs als de gegevens worden onderschept.

6. **Netwerksegmentatie:**
   - Het opdelen van een netwerk in kleinere subnetwerken kan de verspreiding van malware beperken en de impact van een beveiligingsinbreuk minimaliseren.

7. **Gebruikerseducatie:**
   - Het opleiden van gebruikers over veilige praktijken, zoals het vermijden van verdachte links en bijlagen, kan de kans op malware-infecties verkleinen.

## Distributed Denial-of-Service (DDoS) Aanvallen

Een Distributed Denial-of-Service (DDoS) aanval is een krachtige en effectieve aanvalsmethode waarbij een aanvaller een groot aantal computers, vaak verspreid over verschillende locaties, gebruikt om een server of netwerk te overspoelen met verkeer. Dit kan leiden tot overbelasting en uiteindelijk tot het onbeschikbaar maken van de service. Hier is een nadere blik op DDoS-aanvallen en enkele belangrijke aspecten van netwerkbeveiliging:

### Wat Maakt een DDoS-aanval Effectief?

1. **Massale Verkeersstroom**:
   - Een DDoS-aanval genereert een enorme hoeveelheid verkeer die moeilijk te onderscheiden is van legitieme gebruikersverzoeken. Dit maakt het lastig om kwaadwillende verzoeken te filteren zonder ook legitiem verkeer te blokkeren.

2. **Gebruik van Verspreide Bronnen**:
   - De aanval maakt gebruik van een botnet, een netwerk van geïnfecteerde computers die onder controle van de aanvaller staan. Deze computers kunnen zich overal ter wereld bevinden, wat het moeilijk maakt om de aanvallende bronnen te identificeren en te blokkeren.

3. **Verstorende Effecten**:
   - Door de enorme hoeveelheid inkomend verkeer raakt de doelwitserver overbelast, wat leidt tot vertragingen of volledige uitval van de dienst. Dit kan aanzienlijke schade veroorzaken, vooral voor bedrijven die afhankelijk zijn van hun online aanwezigheid.

### Risico's van Toegang tot Jouw Internetverbinding

Als iemand ongeoorloofde toegang krijgt tot jouw internetverbinding, kan dit ernstige beveiligingsrisico's met zich meebrengen, zoals:

1. **Af luisteren van Communicatie**:
   - Onbeveiligde WiFi-netwerken maken het eenvoudig voor kwaadwillenden om jouw gegevensverkeer te onderscheppen en te analyseren. Dit geldt ook voor bekabelde verbindingen, hoewel dit iets lastiger is.

2. **Versturen van Valse Berichten**:
   - Aanvallers kunnen valse berichten naar jouw systeem sturen, wat kan leiden tot phishing-aanvallen of het verspreiden van malware.

3. **Man-in-the-Middle (MitM) Aanvallen**:
   - Bij een MitM-aanval onderschept de aanvaller communicatie tussen twee partijen, vaak zonder dat deze partijen zich daarvan bewust zijn. De aanvaller kan de communicatie manipuleren of vertrouwelijke informatie stelen.

## Netwerkbeveiligingstechnieken

Om je netwerk te beschermen tegen deze bedreigingen, kun je verschillende beveiligingstechnieken toepassen:

1. **Encryptie**:
   - Het versleutelen van gegevens maakt het moeilijker voor aanvallers om waardevolle informatie te onderscheppen. Gebruik SSL/TLS voor webverkeer en VPN's voor veilige netwerkverbindingen.

2. **Firewalls en Intrusion Detection Systems (IDS)**:
   - Firewalls kunnen ongeautoriseerd verkeer blokkeren en IDS-systemen kunnen verdachte activiteiten detecteren.

3. **Veilige WiFi-instellingen**:
   - Gebruik WPA3 voor WiFi-beveiliging en stel sterke, unieke wachtwoorden in voor je netwerk.

4. **Regelmatige Software-updates**:
   - Zorg ervoor dat alle systemen en software up-to-date zijn met de laatste beveiligingspatches om kwetsbaarheden te minimaliseren.

5. **Bewustwording en Training**:
   - Zorg ervoor dat gebruikers zich bewust zijn van beveiligingsrisico's en weten hoe ze verdachte activiteiten kunnen herkennen en rapporteren.
