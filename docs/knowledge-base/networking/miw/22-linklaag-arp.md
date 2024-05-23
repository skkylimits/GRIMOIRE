# Linklaag: ARP

## Link laag en MAC-adressen: Een introductie

Op de link laag komen allerlei apparaten samen die met elkaar moeten communiceren: onze laptops, telefoons, webservers, routers, en meer. Deze apparaten zijn met elkaar verbonden via verschillende soorten verbindingen, zoals ethernetkabels, wifi, 4G, glasvezelkabels, en satellietverbindingen.

De linklaag is verantwoordelijk voor het inpakken van datagrammen in frames en het verzenden van deze frames over specifieke verbindingen tussen twee direct verbonden apparaten, of het nu met kabels of draadloze verbindingen is.

## MAC-adressen: De basis

MAC-adressen, ook wel bekend als Media Access Control-adressen, zijn unieke hardwareadressen van netwerkinterfaces van apparaten. Of het nu gaat om een wifi-kaart of een netwerkinterface op een computer, elk apparaat beschikt over een 48-bits MAC-adres, dat hard gebrand is in de hardware.

Een voorbeeld van een MAC-adres is "1A:2F:BB:C6:09:1D". Deze adressen worden vaak weergegeven als hexadecimale getallen.

Vergeleken met de 32-bits IP-adressen, die voornamelijk worden gebruikt op de netwerklaag, zijn MAC-adressen 48-bits. Dit betekent dat er veel meer mogelijke MAC-adressen zijn dan IPv4-adressen.

## ARP: Address Resolution Protocol

Om het MAC-adres van een specifieke computer in het netwerk te achterhalen, wordt het Address Resolution Protocol (ARP) gebruikt. ARP wordt ingezet om het MAC-adres te koppelen aan een bepaald IP-adres binnen hetzelfde lokale netwerksegment.

## Verhouding tussen MAC-adressen en IP-adressen

MAC-adressen worden gebruikt op de linklaag voor adresresolutie, terwijl IP-adressen worden gebruikt voor routering op de netwerklaag. De samenwerking tussen MAC-adressen en IP-adressen is cruciaal voor het correct routeren van pakketjes naar hun bestemmingen.

## Het belang van MAC-adressen

Het MAC-adres is uniek gekoppeld aan de hardware van een apparaat en verandert niet wanneer je van het ene naar het andere netwerk gaat. Het wordt centraal beheerd door de International Engineering Consortium.

## Identificatie van apparaten aan de hand van MAC-adressen

MAC-adressen worden toegewezen door fabrikanten van netwerkapparatuur. Aan de hand van het MAC-adres kun je soms zien welk merk het apparaat heeft, omdat fabrikanten blokken van MAC-adressen aankopen voor hun producten.

## Hoe kom je achter een MAC-adres?

Om het MAC-adres van een apparaat te achterhalen, gebruiken we het Address Resolution Protocol (ARP). Elk apparaat op een netwerk heeft een ARP-tabel waarin IP-adressen worden gekoppeld aan MAC-adressen.

## Werking van het Address Resolution Protocol (ARP)

Wanneer een computer een pakketje wil verzenden naar een ander apparaat, controleert het ARP eerst de ARP-tabel om het bijbehorende MAC-adres te vinden. Als het niet bekend is, wordt een ARP-verzoek uitgezonden naar het broadcastadres, waarop alle apparaten in het netwerk reageren.

## Hoe een ARP-verzoek werkt

Een ARP-verzoek wordt uitgezonden met het IP-adres van de ontvanger en het hoogst mogelijke MAC-adres (FF:FF:FF:FF:FF:FF). Apparaten die het opgegeven IP-adres herkennen, reageren met hun MAC-adres, waardoor het verzendende apparaat het juiste MAC-adres kan koppelen aan het IP-adres.

## Opbouw en onderhoud van de ARP-tabel

De ontvangen ARP-respons wordt opgeslagen in de ARP-tabel van het verzendende apparaat. Deze informatie wordt gedurende een bepaalde tijd bewaard, meestal ongeveer 20 minuten, en wordt vervolgens verwijderd.

## Periodiek bijwerken van de ARP-tabel

Apparaten in het netwerk houden hun ARP-tabellen up-to-date door periodiek ARP-verzoeken te verzenden en te ontvangen. Op deze manier blijven de ARP-tabellen actueel zonder dat handmatige interventie van de netwerkbeheerder nodig is.

## Verbindingen en adressen in de netwerktopologie

In dit netwerkschema zien we een router met twee interfaces, één aan de linkerkant en één aan de rechterkant. Elke interface heeft zowel een IP-adres als een MAC-adres. IP-adressen helpen bij het identificeren van de locatie van een interface in het netwerk, terwijl MAC-adressen unieke hardwareadressen zijn.

## Subnetten en identificatie

Aan de linkerkant zien we een subnet met verschillende computers, elk met een uniek IP-adres en een MAC-adres. De IP-adressen vertonen een patroon, wat aangeeft dat ze tot hetzelfde subnet behoren. Aan de rechterkant zien we een vergelijkbare configuratie met een ander subnet.

## Directe communicatie binnen een subnet

Computers binnen hetzelfde subnet kunnen elkaar rechtstreeks bereiken zonder tussenkomst van een router. Dit betekent dat hosts binnen hetzelfde subnet rechtstreeks berichten naar elkaar kunnen sturen zonder dat een router nodig is.

## Routing tussen subnetten

Om communicatie mogelijk te maken tussen verschillende subnets, zoals in dit scenario waarin Host A een pakket naar Host B wil sturen, moet de router worden gebruikt. Host A heeft het IP-adres van Host B, maar om het bericht daadwerkelijk te verzenden, heeft het ook het MAC-adres van de router nodig.

## TCP/IP en datagrammen

Het bericht van Host A wordt ingepakt in een TCP-segment en vervolgens in een IP-datagram. Dit datagram heeft het IP-adres van Host B als bestemming. Echter, om het bericht door te sturen naar Host B, heeft Host A ook het MAC-adres van de router nodig.

## Rol van de router

De router gebruikt het IP-adres van Host B om het bericht naar het juiste subnet te routeren, maar het gebruikt zijn eigen MAC-adres om het datagram door te sturen. Dit proces van routeren tussen verschillende subnets maakt het mogelijk voor Host A om te communiceren met Host B, zelfs als ze zich op verschillende subnetten bevinden.

## DHCP en Address Resolution Protocol (ARP)

Een belangrijke vraag is hoe hosts het MAC-adres van routers achterhalen. Dit wordt vaak gedaan via het Address Resolution Protocol (ARP). Dit protocol zorgt ervoor dat hosts niet alleen het IP-adres, maar ook het MAC-adres van een router kunnen achterhalen, wat essentieel is voor het correct adresseren van gegevens op de linklaag.

## Routering van data tussen subnetten

Wanneer een host data wil verzenden naar een andere host op een ander subnet, moet de router worden gebruikt om de data door te sturen. Dit proces omvat het routeren van het IP-datagram naar het juiste subnet, waarbij het MAC-adres van de router wordt gebruikt om het datagram correct te adresseren op de linklaag.

## Role van de router

De router ontvangt het IP-datagram, opent het en gebruikt het IP-bestemmingsadres om te bepalen via welke interface het datagram moet worden doorgestuurd. Vervolgens wordt het datagram opnieuw ingepakt in een nieuw Ethernet-frame met het MAC-adres van de bestemmingshost en wordt het via de juiste interface doorgestuurd.

## ARP-verzoeken en frames

Wanneer een host het MAC-adres van een router nodig heeft, stuurt hij een ARP-verzoek uit. Dit verzoek wordt verspreid naar alle hosts in het lokale netwerk, inclusief de router. De router reageert met zijn MAC-adres, waardoor de host het kan gebruiken om de gegevens correct te adresseren.

## Interactie tussen netwerk- en linklaag

Dit proces illustreert de interactie tussen de netwerk- en linklaag. Het is essentieel voor het succesvol routeren van gegevens tussen verschillende subnetten en het correct adresseren van frames op de linklaag.

## Toekomstige lessen over de linklaag

In toekomstige lessen zullen we dieper ingaan op de rol van switches op de linklaag en op mobiele protocollen die worden gebruikt voor draadloze netwerken. Deze concepten zijn cruciaal voor een volledig begrip van netwerkcommunicatie op de linklaag.

## Terugblik en vooruitzicht

Met dit begrip van de interactie tussen de netwerk- en linklaag zijn we beter uitgerust om te begrijpen hoe netwerkapparaten met elkaar communiceren en hoe gegevens correct worden doorgestuurd. In volgende lessen zullen we meer leren over de details van de linklaag en de rol van verschillende apparaten en protocollen. Tot dan!
