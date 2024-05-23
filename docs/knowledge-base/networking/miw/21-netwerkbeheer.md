# Netwerkbeheer

## Overzicht van Netwerkbeheer

Het beheer van onze netwerken is essentieel nadat we deze hebben aangelegd. We moeten ervoor zorgen dat het netwerk goed loopt en optimaal presteert. Hierbij speelt netwerkmanagement een belangrijke rol.

## Taken van Netwerkbeheer

Het beheren van het netwerk omvat het verzamelen van informatie over hoe het draait, de status van de apparaten, en wat ze doen. Soms moeten we ook de configuratie van de apparaten op afstand kunnen aanpassen.

## SNMP: Simpel Network Management Protocol

SNMP is een protocol dat al geruime tijd wordt gebruikt voor het beheer van netwerken. Het stelt ons in staat om informatie te verzamelen over de status van verschillende apparaten in het netwerk.

## Componenten van SNMP

Bij SNMP zijn er twee belangrijke componenten: de 'managed devices' en de 'management stations'. De managed devices zijn de apparaten die worden beheerd, terwijl de management stations de computers zijn die deze apparaten beheren.

## Communicatie bij SNMP

Er zijn twee manieren waarop communicatie tussen de management stations en de managed devices kan plaatsvinden: de 'request-response mode' en de 'trap mode'. De eerste is een methode waarbij de management station een verzoek stuurt naar een apparaat, terwijl de laatste een methode is waarbij het apparaat ongevraagd berichten naar de management station stuurt bij belangrijke gebeurtenissen.

## Software-defined Networking (SDN)

Een nieuwere benadering van netwerkbeheer is Software-defined Networking (SDN). Dit is een bredere visie op netwerkbeheer, waarbij de controle van het netwerk wordt losgekoppeld van de fysieke infrastructuur.

## Voordelen van SDN

SDN biedt meer flexibiliteit en controle over het netwerk. Het maakt gebruik van een andere architectuur waarbij de controle en het beheer van het netwerk worden gecentraliseerd en geautomatiseerd.

## Evolutie van Netwerkapparaten

Netwerkapparaten, zoals routers, switches, firewalls, load balancers, en network address translation (NAT) boxes, beginnen steeds meer op elkaar te lijken. Ze worden steeds geavanceerder en zijn in staat om elkaars functies over te nemen.

## Ontwikkeling sinds 2005

Sinds ongeveer 2005 begonnen netwerkapparaten zich af te vragen of ze slimmer konden worden. Dit leidde tot het concept van software-defined networking (SDN).

## Software-defined Networking (SDN)

Bij SDN wordt het netwerk nog steeds fysiek aan elkaar gekoppeld, maar de hardware hoeft niet meer specifiek te zijn voor bepaalde taken. In plaats daarvan worden algemene, eenvoudige apparaten gebruikt die geen eigen logica bevatten. De besluitvorming over het doorsturen of blokkeren van pakketjes wordt centraal geregeld door een rekencentrum.

## Rol van Centrale Controle

De centrale controle is niet noodzakelijkerwijs gebonden aan één fysieke locatie, maar kan zich over meerdere computers verspreiden. Toch bestaat er een centrale plek in het netwerk waar alle informatie wordt verzameld en waar beslissingen worden genomen over hoe pakketjes moeten worden verwerkt.

## Functionaliteit van de Flow Table

De informatie die centraal wordt berekend, wordt verspreid in de vorm van een flow table naar de netwerkapparaten. Wanneer een pakketje aankomt bij een apparaat, kijkt het naar de informatie in de header en raadpleegt het zijn kopie van de flow table om te beslissen hoe het pakketje moet worden behandeld.

## Voordelen van SDN

Met SDN kunnen netwerkapparaten meer dan alleen naar IP-adressen kijken. Ze kunnen verschillende soorten controle uitvoeren op basis van informatie in de flow table, waardoor het netwerk flexibeler en intelligenter wordt.

## Uitbreiding van Beslissingsvariabelen

Bij SDN kunnen we niet alleen naar IP-adressen kijken, maar ook naar MAC-adressen, protocollen en zelfs naar specifieke patronen in het verkeer. Op basis van deze variabelen kunnen we beslissen wat we met een pakketje gaan doen.

## Flexibiliteit van Besluitvorming

De besluitvorming kan variëren, van het doorsturen van pakketjes tot het aanpassen ervan of zelfs het blokkeren ervan. Bijvoorbeeld, als we verdacht verkeer detecteren, kunnen we ervoor kiezen om het te blokkeren of door te sturen naar een centrale controle voor verder onderzoek.

## Rol van de Flow Table

De flow table, gecombineerd met een centrale controle, stelt netwerkapparaten in staat om veel meer mogelijkheden te benutten dan in het traditionele model. In plaats van dat elke apparaat individueel beslissingen moet nemen, kan de centrale controle allerlei logica implementeren voor geavanceerde besluitvorming.

## Toepassingen van SDN

Bedrijven zoals Google gebruiken SDN om hun netwerkverkeer te optimaliseren, terwijl organisaties zoals de NAVO SDN onderzoeken om gevoelige gegevens te beheren en te beschermen. SDN biedt de mogelijkheid om netwerkverkeer fijnmazig aan te sturen, afhankelijk van verschillende criteria zoals gevoeligheid van informatie en gewenste prestaties.

## Voorbeelden van Flow Table Regels

In de flow table kunnen verschillende velden worden gematcht, zoals bron- en bestemmingsadressen, poortnummers, en protocollen. Op basis van deze matchcriteria kunnen acties worden uitgevoerd, zoals het doorsturen, aanpassen of blokkeren van pakketjes.

## Praktijkvoorbeelden van Flow Table Regels

Een voorbeeld van een regel in de flow table kan zijn om verkeer naar een bepaald IP-adres naar een specifieke uitgaande poort te sturen. Een andere regel kan zijn om SSH-verkeer (poort 22) te blokkeren door het pakketje te droppen.

Door deze regels kunnen we effectief een firewall implementeren die het netwerkverkeer beheert en beveiligt.

## Uitbreiding van Functionaliteit

Netwerkapparaten kunnen zich gedragen als verschillende soorten apparaten, zoals switches, routers of firewalls, afhankelijk van de regels die worden toegepast in de flow table. Dit stelt ons in staat om diverse functionaliteiten te combineren en aan te passen aan de behoeften van het netwerk.

## Voorbeelden van Regeltoepassingen

Een voorbeeld van een regel in de flow table kan zijn om pakketjes door te sturen op basis van het bronadres, of om pakketjes te verwerpen als het MAC-adres niet bekend is. Ook kunnen regels worden toegepast op basis van specifieke IP-adressen, poortnummers of andere criteria.

## Flexibiliteit van Besluitvorming

Met SDN kunnen we verschillende acties uitvoeren, zoals het doorsturen, blokkeren of aanpassen van pakketjes, afhankelijk van de regels in de flow table. Zo kunnen we zelfs pakketjes aanpassen voordat ze het internet op gaan, bijvoorbeeld door IP-adressen te wijzigen.

## Voordelen van Centrale Controle

Een van de grote voordelen van SDN is dat het netwerkbeheer eenvoudiger wordt door de centrale aansturing. Dit vermindert het risico op fouten en biedt meer flexibiliteit bij het aansturen van het netwerk.

## Structuur van een SDN

In een SDN-architectuur zien we geen aparte apparaten meer voor routers, firewalls en switches. In plaats daarvan zijn er generieke netwerkapparaten die worden aangestuurd door een centrale controle. Deze apparaten kunnen acties uitvoeren op basis van de informatie in de flow table, die wordt berekend door de centrale controle.

## Rol van de SDN Controller

Een cruciaal onderdeel van het SDN-ecosysteem is de SDN-controller. Deze controller staat in directe communicatie met de switches in het netwerk en fungeert als het brein van het netwerk, waarbij het de routing, load balancing en toegangscontrole beheert.

## Functies van de SDN Controller

De SDN-controller houdt de toestand van het netwerk bij, inclusief beschikbare verbindingen en de kosten ervan. Het communiceert met de switches via het OpenFlow-protocol en met netwerkbeheerapplicaties via een noordwaartse API.

## Architectuur van de SDN Controller

De SDN-controller wordt vaak geïmplementeerd als een gedistribueerd systeem, verspreid over meerdere machines, om schaalbaarheid en veerkracht te garanderen tegen uitval van apparaten of fouten.

## Netwerkbeheerapplicaties

Bovenop de SDN-controller draaien netwerkbeheerapplicaties, die de routing, load balancing, toegangscontrole en andere netwerkfunctionaliteiten beheren. Deze applicaties kunnen losstaand zijn van de hardwarefabrikant of de SDN-controller en communiceren met de controller via de noordwaartse API.

## Communicatielaag via OpenFlow

Onderliggend aan de SDN-controller bevindt zich een communicatielaag die de communicatie via het OpenFlow-protocol tussen de controller en de netwerkapparaten faciliteert. Dit protocol maakt het mogelijk voor de controller om de status van het netwerk te beheren en statistieken over het verkeer te verzamelen.

## Integratie met Legacy Apparaten

Voor oudere apparaten die geen ondersteuning bieden voor SDN, kan de SDN-controller gebruikmaken van protocollen zoals SNMP om toch informatie uit deze apparaten te verkrijgen en ze aan te sturen.

## Overzicht van de SDN Controller Architectuur

De architectuur van de SDN-controller bestaat uit verschillende lagen, waarbij de controller fungeert als het centrale brein van het netwerk en communiceert met zowel de switches als de netwerkbeheerapplicaties via specifieke protocollen en API's.

## Behandeling van Netwerkstoringen in een SDN-omgeving

In een Software Defined Networking (SDN)-omgeving worden netwerkstoringen anders afgehandeld dan in traditionele netwerken. Bij een defecte verbinding informeert een traditionele router de naburige routers over de wijziging, waarna elk apparaat individueel nieuwe routes berekent om het defect te omzeilen.

In een SDN-context wordt de router niet gebruikt om de omringende apparaten te informeren. In plaats daarvan maakt de router gebruik van het OpenFlow-protocol om de centrale SDN-controller op de hoogte te stellen van de wijziging. Deze controller onderhoudt een database van de netwerkstatus en past deze aan wanneer er wijzigingen optreden.

## Update van de Netwerkstatus en Herberekening van Routes

Na ontvangst van de wijziging past de SDN-controller de netwerkstatus aan en berekent hij nieuwe routes door het netwerk. Dit gebeurt vaak met behulp van algoritmen zoals Dijkstra's algoritme, dat de meest efficiënte routes door het netwerk bepaalt, rekening houdend met de gewijzigde omstandigheden.

## Distributie van Nieuwe Route-informatie

Vervolgens stuurt de SDN-controller de bijgewerkte routinginformatie naar de netwerkapparaten via een noordwaartse API. Deze apparaten worden vervolgens geïnstrueerd om de nieuwe routes te gebruiken voor het doorsturen van verkeer, waardoor het netwerk efficiënt blijft werken ondanks de veranderingen in de netwerkstatus.

## Beveiligingsoverwegingen in een SDN-context

Hoewel we hier niet specifiek op ingaan, is het belangrijk op te merken dat SDN ook mogelijkheden biedt voor verbeterde netwerkbeveiliging. Door het verzamelen en analyseren van informatie over netwerkverkeer, zoals inlogpogingen en verkeerspatronen, kunnen bedreigingen worden geïdentificeerd en aangepakt om de netwerkbeveiliging te verbeteren.

## Conclusie en Vooruitzicht

Met deze introductie hebben we een overzicht gegeven van hoe netwerkstoringen worden afgehandeld in een SDN-omgeving. In toekomstige sessies zullen we dieper ingaan op verschillende aspecten van netwerkbeheer, waaronder de linklaag.
