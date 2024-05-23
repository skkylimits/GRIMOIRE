# Linklaag: Ethernet & Switching

## Verdergaan bij de Linklaag

We gaan precies verder waar we in het vorige filmpje zijn gebleven, namelijk bij de linklaag. We hebben geleerd hoe hosts en routers op de linklaag frames kunnen versturen. Vandaag gaan we andere aspecten bekijken die een rol spelen, zoals het Ethernet protocol en switches.

## Rol van de Linklaag

De linklaag is verantwoordelijk voor het inpakken van IP-datagrammen in frames en deze naar een andere node te sturen die rechtstreeks bereikbaar is via een bepaalde verbinding. Deze verbinding kan bedraad of draadloos zijn.

## MAC-adressen en ARP

Om een bericht naar een specifieke interface te sturen, moeten MAC-adressen worden gebruikt. Hosts gebruiken Address Resolution Protocol (ARP) om het MAC-adres van een bepaalde host te achterhalen, wat essentieel is voor het adresseren van berichten op de linklaag.

## Ethernet Protocol

Ethernet is een van de oudste en meest gebruikte technologieën om computers met elkaar te verbinden. Het is populair vanwege de lage kosten, betrouwbaarheid en evolutie naar hogere snelheden, zoals 10 gigabit per seconde.

## Ethernet Frames

Ethernet frames bevatten data, bron- en doel-MAC-adressen, foutcontrole en een preambule om de klok tussen zender en ontvanger te synchroniseren. Dit zorgt voor een betrouwbare communicatie tussen apparaten.

## Bus Topologie en Concurrentie

Vroege Ethernet-netwerken gebruikten vaak een bus-topologie, waarbij meerdere computers op dezelfde kabel waren aangesloten. Dit leidde echter tot concurrentie om data te verzenden, wat tot botsingen kon leiden en de communicatie verstoorde.

## Switches en Verbeterde Topologieën

Om de problemen van bus-topologieën op te lossen, werden switches geïntroduceerd. Switches maken het mogelijk om meerdere hosts aan te sluiten en zorgen voor efficiënte communicatie door data alleen naar de juiste poort door te sturen.

## De Overgang van Bus- naar Ster Topologie

In veel netwerken werd vroeger de bus-topologie gebruikt, waarbij meerdere computers op dezelfde kabel waren aangesloten. Dit leidde echter tot het risico van botsingen tussen data. Tegenwoordig wordt de ster-topologie veel populairder, waarbij elke computer een eigen verbinding heeft met een switch.

## Voordelen van de Ster Topologie

Met de ster-topologie is het risico op data-botsingen veel kleiner omdat elke computer een eigen dedicated verbinding heeft met de switch. Hierdoor kan de bandbreedte van de verbinding volledig worden benut zonder dat data op elkaar moeten wachten.

## Hoe Werkt een Switch?

Een switch ontvangt frames van meerdere bronnen en stuurt deze zo snel mogelijk door naar de juiste bestemming. Hij kan zelfs gelijktijdig verkeer tussen verschillende bronnen mogelijk maken zonder dat deze elkaar in de weg zitten.

## Switching Table

Een belangrijk onderdeel van een switch is de switching table, waarin de switch bijhoudt welk MAC-adres gekoppeld is aan welk interface-nummer. Dit zorgt ervoor dat de switch weet naar welk interface hij frames moet doorsturen om de juiste host te bereiken.

## Automatisch Leren

Een switch leert automatisch welke MAC-adressen aan welke interface-nummers zijn gekoppeld door te observeren welke frames van welke bronnen binnenkomen. Zo bouwt hij zijn switching table op.

stuur## Switches versus Routers: Overeenkomsten en Verschillen

Switches en routers zijn beide apparaten die pakketjes ontvangen en doorsturen. Ze fungeren als tussenpersonen en streven ernaar om pakketjes zo snel mogelijk door te sturen, hoewel er soms wachttijden kunnen zijn voordat een pakketje wordt doorgestuurd.

### Overeenkomsten

- Beide zijn store-and-forward apparaten.
- Ze kunnen pakketjes in een wachtrij plaatsen totdat ze gereed zijn om doorgestuurd te worden.
- Ze maken gebruik van interne tabellen om te bepalen waar pakketjes naartoe moeten worden doorgestuurd.

### Verschillen

- Routers opereren op de netwerklaag en kijken naar IP-adressen om te bepalen waar pakketjes naartoe moeten worden gestuurd. Ze kunnen verschillende subnetten met elkaar verbinden.
- Switches opereren op de linklaag en kijken naar MAC-adressen om te bepalen waar pakketjes naartoe moeten worden gestuurd. Ze zijn alleen geschikt voor het verbinden van apparaten binnen hetzelfde segment.
- Routers gebruiken routingalgoritmes en -protocollen om hun routingtabellen te vullen met informatie over netwerkpaden.
- Switches leren automatisch bij door naar het netwerkverkeer te kijken dat voorbij komt. Ze maken geen gebruik van specifieke algoritmes of protocollen om hun switchingtabellen in te vullen.

## Conclusie

Hoewel switches en routers vergelijkbare taken uitvoeren in een netwerk, zijn er belangrijke verschillen in hun functies en werking. Het begrijpen van deze verschillen is essentieel voor het ontwerpen en beheren van efficiënte netwerken. In toekomstige lessen zullen we nog meer aspecten van netwerkverbindingen en bijbehorende protocollen verkennen. Tot dan!
