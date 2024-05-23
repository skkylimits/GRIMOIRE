# Beveiligingsmaatregelen

## Intro

Welkom terug allemaal uit twee gedeelten van het college over netwerk security. Als je het voorgaande gedeelte recht hebt begrepen, heb je een goed beeld van alle bedreigingen die op de loer liggen voor ons netwerk. We hebben gezien dat beleid essentieel is om ons netwerk zo goed mogelijk te verdedigen, waarbij we rekening houden met vier belangrijke aspecten van veiligheid: initiatie, message integrity, altijd te crashen, en operationeel.

## Technische maatregelen

Maar wat zijn nu de concrete technische maatregelen die wij kunnen gaan inzetten om die vier eigenschappen daadwerkelijk te realiseren? Gelukkig zijn er een heleboel, en een aantal daarvan zullen in dit tweede deel van het college behandeld worden. We gaan het hebben over cryptografie, digitale handtekeningen, SSL, virtual private networks, firewalls, intrusion detection systems en authenticatie.

## De 4 beveiligingsprincipe

1. **Vertrouwelijkheid**: Zorg ervoor dat alleen geautoriseerde personen toegang hebben tot gevoelige informatie.

2. **Integriteit van berichten**: Garandeer dat gegevens niet onopgemerkt worden gewijzigd tijdens verzending of opslag.

3. **Authenticatie**: Controleer of gebruikers echt zijn wie ze zeggen dat ze zijn.

4. **Operationele veiligheid**: OPSEC. Implementeer maatregelen om bedrijfsgeheimen te beschermen en operationele processen veilig te houden.

## Cryptografie

Om te beginnen met cryptografie, dit is iets wat we kunnen gebruiken om onze berichten vertrouwelijk te versturen. In de meest simpele vorm hebben we het over symmetrische cryptografie. Dit betekent dat als Alice een berichtje stuurt aan Bob, ze dit niet zomaar in platte tekst doet, want een afluisteraar kan meeluisteren. Nee, ze gebruikt een geheime sleutel om het bericht te coderen. Bob heeft dezelfde geheime sleutel om het bericht weer leesbaar te maken. Dit wordt symmetrische sleutel cryptografie genoemd.

## Voorbeeld van symmetrische encryptie

### Voorbeeld 1

Een voorbeeld van symmetrische encryptie is een variant van de zogenaamde Caesar cipher, die Julius Caesar gebruikte om berichten naar zijn legioenen in heel Europa te sturen. Het idee is om een letter uit het alfabet te vervangen door een andere letter volgens een sleutel. Dit maakt de tekst geheim, maar het is tamelijk eenvoudig te kraken door codekrakers.

### Voorbeeld 2

Een voorbeeld van symmetrische encryptie is het gebruik van de Advanced Encryption Standard (AES) om gegevens op een harde schijf te versleutelen. In dit geval wordt dezelfde sleutel gebruikt om de gegevens te versleutelen en te ontsleutelen. Bijvoorbeeld, als een gebruiker een bestand versleutelt met AES met een sleutel "123456", moet dezelfde sleutel "123456" worden gebruikt om het bestand te decoderen en toegang te krijgen tot de oorspronkelijke gegevens.

## Beperkingen van symmetrische encryptie

Een groot probleem bij symmetrische encryptie is dat beide partijen over de geheime sleutel moeten beschikken. Dit werkt alleen als zowel de ontvanger als de afzender de sleutel hebben. Hoe kunnen we dit oplossen als beide partijen op afstand zijn? Het afspreken en uitwisselen van sleutels kan lastig zijn, vooral als de partijen elkaar niet persoonlijk ontmoeten.

## Probleem met delen van geheime sleutels

Hoe kunnen ze een geheim wachtwoord uitwisselen als er iemand meeluistert? Ze kunnen het bericht wel encrypten, maar hoe kan Trudy het dan net zo makkelijk weer ontcijferen?

## Oplossing: Public Key Cryptography

Om dit probleem op te lossen, is er iets nieuws bedacht: Public Key Cryptography. Dit maakt gebruik van complexe wiskunde om het delen van geheime sleutels overbodig te maken. In plaats van een gedeelde sleutel hebben we nu een sleutelpaar: een publieke sleutel en een private key.

## Werking van het sleutelpaar

De publieke sleutel kan openbaar gemaakt worden, terwijl de private key geheim blijft. Een bericht dat met de ene sleutel versleuteld is, kan alleen met de andere sleutel weer leesbaar worden gemaakt.

## Voorbeeld van Public Key Cryptography

Als Alice een bericht naar Bob wil sturen, gebruikt ze de publieke sleutel van Bob om het bericht te versleutelen. Alleen Bob kan het bericht ontcijferen met zijn private key.

## Beperkingen van Public Key Cryptography

Hoewel Public Key Cryptography een effectieve oplossing is, heeft het ook beperkingen. Het garandeert geen vertrouwelijkheid, omdat zowel Alice als Trudy de publieke sleutel van Bob kunnen hebben.

## Gebruik van digitale handtekeningen

Een andere toepassing van het sleutelpaar is het gebruik van digitale handtekeningen. Als Bob een bericht naar Alice stuurt, kan hij het bericht encrypten met zijn private key. Alice kan dan met de publieke sleutel van Bob controleren of het bericht echt van Bob afkomstig is.

## Identiteitscontrole en Certificaten

Om de authenticiteit van een bericht te controleren, kan een digitale handtekening worden gebruikt om de identiteit van de afzender te verifiëren. Dit is belangrijk voor zowel vertrouwelijkheid als authenticatie van het bericht.

## Probleem met Vertrouwen in Certificaten

Een probleem bij Public Key Cryptography is hoe we kunnen vertrouwen dat een publieke sleutel echt van de beweerde eigenaar is. Dit is waar certificatie autoriteiten (CA) in het spel komen.

## Rol van Certificatie Autoriteiten

Een CA controleert de identiteit van de eigenaar van een sleutelpaar en verstrekt een certificaat dat de authenticiteit ervan garandeert. Dit certificaat wordt gebruikt om te bevestigen dat een bepaalde publieke sleutel daadwerkelijk toebehoort aan de beweerde eigenaar.

## Voorbeeld van Diginotar Incident

Een bekend voorbeeld van het falen van vertrouwen in certificaten is het incident met Diginotar, waarbij valse certificaten werden uitgegeven door een gehackte CA.

## Betrouwbaarheid van Certificaten

Hoewel certificaten worden gebruikt om vertrouwen te creëren, kunnen ze ook falen, zoals aangetoond door het Diginotar incident. Dit benadrukt de noodzaak van voortdurende controles en veiligheidsmaatregelen.

## Gebruik van Hash-functies voor Data-integriteit

Om te controleren of de inhoud van een bericht nog steeds juist is, kan een hash-functie worden gebruikt. Deze functie genereert een unieke waarde op basis van de inhoud van het bericht, die vervolgens wordt vergeleken aan de ontvangen waarde om de integriteit van het bericht te verifiëren.

## Werking van Hash-functies

Een hash-functie genereert een unieke waarde voor een bepaalde hoeveelheid data, die bekend staat als een hashwaarde of digest. Deze waarde wordt gebruikt als een soort "vingerafdruk" van de data.

## Controle van Data-integriteit

De ontvanger kan de ontvangen hashwaarde berekenen met dezelfde hash-functie en deze vergelijken met de waarde die met het bericht is verzonden. Als de waarden overeenkomen, kan worden geconcludeerd dat het bericht ongewijzigd is ontvangen.

## Belang van Data-integriteit

Het controleren van de data-integriteit is essentieel om ervoor te zorgen dat de ontvangen informatie niet is gewijzigd tijdens de verzending. Dit draagt bij aan de betrouwbaarheid en nauwkeurigheid van de communicatie.

## Data-integriteit en Hash-functies

Om te voorkomen dat berichten onderweg worden gewijzigd, worden stevige hash-functies gebruikt. Deze functies zorgen ervoor dat de integriteit van de data behouden blijft, zelfs als het bericht wordt verstuurd of opgeslagen.

## Toepassing van Hash-functies

Hash-functies worden gebruikt om controlegetallen te berekenen voor berichten. Deze controlegetallen worden gebruikt om te controleren of het ontvangen bericht nog steeds overeenkomt met het oorspronkelijke bericht.

## Bescherming tegen Doelbewuste Aanvallen

Hash-functies helpen ook bij het voorkomen van doelbewuste aanvallen die berichten proberen te verminken. Door het gebruik van hash-functies wordt het voor hackers bijna onmogelijk om een ander bericht te produceren dat overeenkomt met het originele controlegetal.

## Toepassing in Internetprotocollen

Veel internetprotocollen maken gebruik van hash-functies en andere beveiligingsmaatregelen om ervoor te zorgen dat berichten vertrouwelijk en correct blijven. Een bekend voorbeeld hiervan is SSL (Secure Sockets Layer) en zijn opvolger TLS (Transport Layer Security).

## SSL en TLS

SSL en TLS zijn veilige varianten van het transportprotocol HTTP, die worden gebruikt om internetverkeer te versleutelen en te beveiligen. Deze protocollen maken gebruik van cryptografische technieken zoals hashing en encryptie om de vertrouwelijkheid en integriteit van berichten te waarborgen.

## Implementatie in Applicaties

Hoewel SSL en TLS algemeen worden gebruikt, moeten applicatieontwikkelaars deze beveiligingsmaatregelen nog steeds implementeren in hun software. Gelukkig zijn er standaardbibliotheken beschikbaar om dit proces te vereenvoudigen.

## Voorbeelden van Gebruik

Een bekend voorbeeld van het gebruik van SSL/TLS is wanneer een website 'https://' in de adresbalk heeft. Dit geeft aan dat de website gebruikmaakt van een beveiligde verbinding.

## Beveiliging van Internetverkeer

SSL en TLS beschermen niet alleen webverkeer, maar kunnen ook worden toegepast op andere vormen van internetverkeer, zoals berichtenverkeer tussen verschillende locaties van een bedrijf.

## Implementatievereisten

Hoewel SSL/TLS nuttig is, moeten applicatieontwikkelaars ervoor zorgen dat deze beveiligingsprotocollen correct worden geïmplementeerd in hun software, vooral als het gaat om het uitwisselen van gevoelige informatie.

## Beveiliging van Netwerkverkeer met VPN

Niet alle applicaties ondersteunen SSL/TLS, maar een alternatieve oplossing is om het verkeer op de netwerklaag te beveiligen door middel van een Virtual Private Network (VPN).

## Werking van een VPN

Een VPN zorgt voor een veilige communicatie tussen verschillende locaties van een bedrijf, zelfs via het openbare internet. Dit wordt mogelijk gemaakt door het versleutelen van het verkeer tussen routers en het gebruik van speciale VPN-clients op laptops.

## Implementatie van VPN

Medewerkers die buiten kantoor werken, kunnen verbinding maken met het bedrijfsnetwerk door een VPN-client te gebruiken. Deze client zorgt ervoor dat hun internetverkeer versleuteld wordt en veilig via het VPN-netwerk wordt verzonden.

## Veiligheid van VPN

Het is essentieel om ervoor te zorgen dat de routers en VPN-clients correct geconfigureerd zijn en dat medewerkers de juiste inloggegevens hebben om toegang te krijgen tot het VPN. Hierdoor wordt de vertrouwelijkheid van het verkeer gewaarborgd.

## Toepassingen van VPN voor Consumenten

Naast bedrijven maken ook consumenten steeds vaker gebruik van VPN's, vooral voor privacyredenen. Door een VPN te gebruiken, kunnen ze hun internetverkeer versleutelen en anoniem blijven tijdens het surfen op het web.

## Werking van VPN voor Consumenten

Consumenten kunnen een VPN-provider gebruiken om hun internetverkeer via een beveiligde verbinding te routeren. Dit zorgt ervoor dat niemand hun online activiteiten kan volgen, aangezien al het verkeer via de servers van de VPN-provider verloopt.

## Beperkingen van VPN en Toepassing van Firewall

VPN's worden niet alleen gebruikt voor legitieme doeleinden, maar ook voor illegale activiteiten zoals piraterij. Bedrijven gebruiken VPN's echter steeds meer om hun netwerkverkeer te beveiligen, samen met andere maatregelen zoals firewalls.

## Installatie van Firewalls

Een belangrijke beveiligingsmaatregel is het installeren van firewalls, zowel op hardware- als op softwareniveau. Deze firewalls creëren een barrière tussen het interne netwerk van een bedrijf en het openbare internet, waardoor de interne systemen worden beschermd tegen bedreigingen van buitenaf.

## Werking van Firewalls

Firewalls fungeren als een soort filter tussen het interne netwerk en het internet, waarbij ze verkeer controleren op basis van vooraf ingestelde regels. Ze kunnen bepaalde soorten verkeer blokkeren of toestaan, afhankelijk van de configuratie.

## Toepassing van Content Filtering

Een vorm van firewallbeveiliging is content filtering, waarbij verkeer wordt gecontroleerd op specifieke inhoud of protocollen. Dit kan worden gebruikt om de toegang tot bepaalde websites of diensten te blokkeren, zoals streamingplatforms tijdens werkuren.

## Intrusion Detection Systems (IDS)

Naast firewalls kunnen bedrijven ook Intrusion Detection Systems (IDS) implementeren. Een IDS is een systeem dat het interne netwerk bewaakt op verdachte activiteiten en inbreuken op de beveiliging detecteert.

## Werking van Intrusion Detection Systems

Een IDS analyseert het netwerkverkeer op zoek naar patronen die kunnen wijzen op een aanval of inbreuk. Wanneer verdachte activiteiten worden gedetecteerd, kan het systeem alarm slaan en de beheerders waarschuwen.

## Implementatie van Network Access Control (NAC)

Network Access Control (NAC) is een aanvullende beveiligingslaag die kan worden gebruikt om te controleren welke apparaten toegang krijgen tot het netwerk. Dit kan worden gedaan op basis van verschillende criteria, zoals de status van het apparaat en de gebruikersreferenties.

## Voorbeelden van Regelgebaseerde Firewall-configuraties

Firewalls kunnen worden geconfigureerd met regels om bepaalde soorten verkeer te blokkeren of toe te staan. Bijvoorbeeld, het blokkeren van uitgaand verkeer op poort 80 kan voorkomen dat medewerkers webpagina's bezoeken tijdens werkuren.

## Toepassing van Bandwidth Management

Bandwidth management kan worden gebruikt om de beschikbare bandbreedte op het netwerk te beheren en prioriteit te geven aan bepaalde soorten verkeer. Bijvoorbeeld, het beperken van de bandbreedte voor streamingdiensten kan zorgen voor een betere netwerkprestatie voor essentiële bedrijfsapplicaties.

## Intrusion Detection Systems (IDS)

Een IDS kan verdachte activiteiten detecteren en een waarschuwing sturen naar netwerkbeheerders, waardoor mogelijke bedreigingen snel kunnen worden aangepakt.

## Detectie van Malware Verspreiding

Een IDS kan ook patronen in het netwerkverkeer identificeren die wijzen op malwareverspreiding, zoals een computer die plotseling veel berichten verstuurt naar andere systemen.

## Patrouilles in het Netwerk

Naast firewallbeveiliging is het verstandig om regelmatig het netwerkverkeer te monitoren en verdachte activiteiten op te sporen, zelfs binnen de eigen netwerkomgeving.

## Network Access Control (NAC)

NAC kan worden gebruikt om de toegang tot het netwerk te controleren en ervoor te zorgen dat alleen geautoriseerde apparaten verbinding kunnen maken.

## Demilitarized Zone (DMZ)

Een Demilitarized Zone (DMZ) in netwerken is een geïsoleerd gedeelte van een netwerk dat zich bevindt tussen de interne (private) en externe (public) netwerken. Het wordt gebruikt om een extra beveiligingslaag te bieden voor servers en services die toegankelijk moeten zijn vanaf het internet, zoals web-, e-mail- of FTP-servers. De servers in de DMZ zijn meestal meer blootgesteld aan het internet dan interne servers, maar minder dan externe servers. Dit helpt de interne netwerkbronnen te beschermen tegen directe aanvallen vanaf het internet.

## Implementatie van DMZ

Bastion hosts zijn servers die worden geïsoleerd van de rest van het netwerk en specifiek worden geconfigureerd om externe toegang te verlenen tot bepaalde services, terwijl de rest van het netwerk wordt beschermd.

## Veilige Bufferzone

Bastion hosts fungeren als veilige bufferzones en voorkomen dat hackers toegang krijgen tot de rest van het interne netwerk als ze erin slagen een van deze hosts over te nemen.

## Afsluitende Opmerkingen

Dit college heeft verschillende nuttige veiligheidsmaatregelen behandeld om de netwerkbeveiliging te verbeteren. Het vak infrastructuur komt hiermee tot een einde, en ik hoop dat jullie het zowel leuk als leerzaam hebben gevonden. Veel succes, en tot ziens!
