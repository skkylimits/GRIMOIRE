# Netwerklaag

In voorgaande colleges hebben we al het een en ander geleerd over de netwerklaag. We hebben een idee over wat er precies gebeurt en hoe dat allemaal in zijn werk gaat. In dit laatste filmpje van vandaag wil ik met jullie praten over de netwerklaagprotocollen, dus de protocollen die ervoor zorgen dat de netwerklaag informatie kan doorsturen.

## Belangrijke Protocollen

Als we het over de netwerklaagprotocollen hebben, dan zijn dat een handvol protocollen. In het vorige college hebben we het gehad over protocollen zoals OSPF en BGP, die door routers gebruikt worden om met elkaar te communiceren over routes. Deze protocollen zijn belangrijk voor het uitwisselen van route-informatie.

## Internet Protocol (IP)

Het belangrijkste protocol op de netwerklaag is het Internet Protocol (IP). Dit protocol zorgt ervoor dat data pakketjes kunnen worden verstuurd over het internet. We hebben voornamelijk te maken met IPv4, de versie die lange tijd het meest gebruikt is. Inmiddels is er ook een opvolger, IPv6, die steeds meer in gebruik wordt genomen.

## ICMP

Een ander belangrijk protocol is ICMP, wat staat voor Internet Control Message Protocol. Dit protocol wordt gebruikt om statusinformatie uit te wisselen over verbindingen. Een bekend voorbeeld is de 'ping'-functie, waarmee je kunt testen of een bepaalde host bereikbaar is.

## NAT en PAT

Tot slot hebben we nog NAT (Network Address Translation) en PAT (Port Address Translation). Deze protocollen worden gebruikt om meerdere apparaten binnen een netwerk via één openbaar IP-adres te laten communiceren met de buitenwereld. Dit is vooral belangrijk bij thuisnetwerken en kleine bedrijfsnetwerken.

## IPv4 Header

Als we kijken naar de IPv4-header, zien we dat deze uit verschillende velden bestaat. Het bevat onder andere de bron- en bestemmingsadressen, die respectievelijk de IP-adressen van de verzender en de ontvanger zijn. Verder zien we velden zoals het versienummer, de totale lengte van het pakketje, en een checksum om fouten te detecteren.

## Time to Live (TTL): Voorkomen van Oneindige Routing

Een interessant veld in de IPv4-header is de Time to Live (TTL). Dit veld zorgt ervoor dat pakketjes niet eindeloos rondgestuurd worden op het internet. Bij elke router die het pakketje passeert, wordt de TTL met één verminderd. Als de TTL op nul komt, wordt het pakketje weggegooid. Dit voorkomt oneindige loops op het netwerk.

## Eindeloze Cirkel van Pakketjes: Foutieve Routering

Een router kan zich een keer vergissen. Als een router een verkeerd idee heeft over een route, kan een pakketje in een soort eindeloze cirkel terechtkomen. Stel dat een router denkt dat de beste route via een buurman loopt, maar die buurman denkt hetzelfde. Dan kunnen zij eindeloos dat pakketje heen en weer sturen. Dit kan gebeuren met drie of vier routers die het pakketje steeds in een cirkel rondsturen omdat ze niet de juiste informatie hebben.

## TTime to Live (TTL): Beheersen van Netwerkverkeer

Om te voorkomen dat het internet vol raakt met rondzwervende pakketjes, is de Time to Live (TTL) geïntroduceerd. Elk pakketje krijgt een TTL-waarde die bij elke doorgifte door een router met één wordt verminderd. Als de TTL nul bereikt, wordt het pakketje weggegooid. Dit voorkomt eindeloze loops en zorgt ervoor dat het internet efficiënt blijft werken.

## IPv4-adressen

IPv4-adressen bestaan uit 32 bits, wat betekent dat er in totaal iets meer dan 4 miljard unieke adressen mogelijk zijn. Dit aantal lijkt veel, maar met de groeiende wereldbevolking en de toename van apparaten die met het internet verbonden zijn, blijkt dit aantal niet voldoende. Elk apparaat, van computers tot slimme koelkasten, heeft een uniek IP-adres nodig.

## Tekort aan IPv4-adressen

In augustus 2009 toonde een grafiek van RIPE NCC, de organisatie die IP-adressen uitgeeft in Europa, het Midden-Oosten en delen van Azië, dat de beschikbare IPv4-adressen bijna op waren. Bedrijven die nieuwe IP-adressen nodig hebben, kunnen nu op een wachtlijst worden gezet in de hoop dat er adressen vrijkomen. IPv4-adressen zijn dus schaars geworden, wat de noodzaak voor een nieuwe versie benadrukt.

## IPv6: De Nieuwe Standaard

IPv6, de opvolger van IPv4, is al sinds de jaren 90 beschikbaar. Het biedt een veel groter aantal IP-adressen. IPv6-adressen bestaan uit 128 bits, wat een vrijwel onuitputtelijke bron van unieke adressen biedt. Hoewel IPv6 al decennia beschikbaar is, verloopt de overgang naar deze nieuwe standaard traag. Dit komt deels door de omvangrijke aanpassing die nodig is in software en hardware.

## Uitdagingen bij de Overgang naar IPv6

De overgang naar IPv6 vereist dat alle software en hardware geüpdatet worden om de nieuwe standaard te begrijpen. Dit betekent niet alleen updates voor besturingssystemen zoals Windows, maar ook voor oudere hardware en geïntegreerde circuits die gebruikt worden in allerlei apparaten. Deze grootschalige migratie is een uitdaging die tijd en middelen vergt.

## Huidige Status van IPv6

Ondanks de noodzaak en de lange beschikbaarheid van IPv6, is de adoptie ervan nog steeds laag. In 2019 was slechts ongeveer 18% van de internetverbindingen in Europa klaar voor IPv6. In sommige West-Europese landen is dit percentage hoger, rond de 59-60%, maar in Centraal- en Oost-Europese landen blijft de adoptie achter. IPv6 staat klaar om ingezet te worden, maar het internet is nog niet volledig voorbereid op deze overgang.

## Voordelen van IPv6

De overgang naar IPv6 biedt veel meer IP-adressen dan IPv4. Dit is noodzakelijk om de groei van het internet en het aantal verbonden apparaten bij te houden. IPv6 zorgt ervoor dat er voldoende adressen zijn om aan de toekomstige vraag te voldoen, waardoor het internet kan blijven groeien en innoveren.
## IPv6: Ongekende Schaal

IPv6 heeft 128 bits gereserveerd, wat resulteert in een enorm groot aantal adressen. Het is geschat dat we zelfs elke zandkorrel op aarde van een uniek adres zouden kunnen voorzien. Dit biedt een schier eindeloze mogelijkheid voor toekomstige netwerkgroei.

## IPv6 Verbeteringen: Efficiëntie en Functionaliteit

IPv6 optimaliseert en introduceert nieuwe functies ten opzichte van IPv4. Overbodige velden, zoals sommige opties in IPv4, zijn verwijderd. Ook biedt IPv6 de mogelijkheid voor Quality of Service (QoS), waarmee prioriteit gegeven kan worden aan specifieke datatypen, zoals videoconferenties.

## Adresnotatie: Uitdagingen en Oplossingen

IPv6-adressen zijn veel langer dan IPv4-adressen en worden meestal als hexadecimale codes weergegeven. Hoewel dit de beschikbare adressen enorm vergroot, kan het noteren ervan uitdagend zijn. Maar met de migratie naar IPv6 kunnen we de beperkingen van IPv4 overwinnen.

## NAT als Overgangsoplossing

Network Address Translation (NAT) fungeert als een overgangsoplossing tijdens de migratie naar IPv6. Het stelt meer apparaten in staat om verbinding te maken met het internet, waardoor de overgang naar IPv6 soepeler verloopt.

## Aanbevolen Filmpje: Heldere Uitleg van NAT

Het aanbevolen filmpje van [Nat by PieterExplainsTech](https://www.youtube.com/watch?v=QBqPzHEDzvo) behandelt NAT op een visuele en begrijpelijke manier. Het voegt waarde toe aan de besproken onderwerpen en is een aanvulling op de eerdere uitleg in de colleges.

## Volgende College: Dieper In op Subnetten

In het volgende college zullen we dieper ingaan op subnetten en leren hoe we grote netwerken kunnen verdelen in beheersbare delen. Dit is essentiële kennis voor een goed begrip van netwerken. Succes met het bestuderen en tot de volgende keer!
