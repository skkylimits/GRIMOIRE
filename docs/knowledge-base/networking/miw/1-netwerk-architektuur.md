# Netwerk Architektuur

## Intro

Beste studenten, hallo en van harte welkom bij dit eerste videocollege voor het vak Infrastructuur. We gaan vandaag een eerste blik werpen op computernetwerken en internet om een klein beetje een idee te krijgen van wat er allemaal te vinden is, wat we tegenkomen, en hoe dat werkt.

## Complexiteit van het Internet

Jullie zullen al snel merken dat het internet een ingewikkelde plek is en dat er veel nodig is om onze computers met elkaar te laten communiceren. Zoals gezegd, is dit slechts een eerste introductie op wat we tegenkomen. In volgende filmpjes zal ik een aantal onderwerpen oppakken en ingaan op hardware en meer.

## Structuur van het Netwerk

Laten we eens kijken naar hoe dat netwerk eigenlijk gestructureerd is. We bevinden ons in datgene wat eigenlijk een soort buitenkant van het netwerk is, waar onze computers applicaties draaien. Maar ook een soort binnenkant van het netwerk, waar de techniek zit die het allemaal mogelijk maakt dat die computers met elkaar communiceren en onderling verbonden zijn om andere netwerken te laten samenwerken.

## Noodzaak van Standaarden en Protocollen

Ze zullen afspraken moeten maken over hoe we dat gaan doen en zullen dan ook het belang van standaarden en protocollen bespreken. Er zijn echter twee onderwerpen die ik in dit college niet uitgebreid zal bespreken en daarvoor wil ik naar mijn boek verwijzen.

## Belang van Fysieke Toegang tot het Netwerk

Fysieke toegang tot het netwerk en wat daarmee te doen zijn onderwerpen waar jullie waarschijnlijk al wel een beetje gevoel bij hebben.

## Verschillende Verbindingsmogelijkheden

Wie van ons is er met het internet verbonden? We zijn allemaal verbonden, maar hoe zijn we verbonden? Dat kan variëren afhankelijk van waar we zijn en wat voor soort toegang we hebben.

## Belang van Snelheid en Betrouwbaarheid

Verder is snelheid een belangrijke factor. We willen natuurlijk allemaal zo snel mogelijk internet, zeker voor gaming of het downloaden van bestanden. Maar er zijn op het internet allerlei plekken waar vertraging kan optreden, en de oorzaken daarvan worden beschreven in het boek.

## Vereenvoudigd Netwerkschema

Laten we eens kijken naar een vereenvoudigd netwerkschema. We zien hier een eenvoudig netwerk met computers, laptops, servers, verbindingen, kabels, draadloze verbindingen en zendmasten, allemaal aan elkaar geknoopt via routers.

## Uitbreiding van Apparaattoegang tot het Internet

Tegenwoordig sluiten we steeds meer apparaten aan op het internet, niet alleen pc's en workstations, maar ook laptops, tablets, mobiele telefoons, en zelfs slimme apparaten zoals fotolijstjes, sensoren, slimme thermostaten, en meer.

## Diversiteit van Apparaten en Eindsystemen

Maar al die apparaten willen aansluiten om verbinding te maken. In dit vak noemen we deze apparaten eindsystemen, die heel verschillend kunnen zijn maar hetzelfde doel dienen. Belangrijk aan eindsystemen, of hosts, is dat het niet alleen maar apparaten zijn, maar ook applicaties draaien. Dit kan variëren van webbrowsers tot software voor het instellen van de temperatuur op onze centrale verwarming. Deze applicaties communiceren via het netwerk en draaien op de software waar mensen plezier van hebben.

## Diverse Verbindingsmogelijkheden

Om met elkaar te communiceren, hebben deze eindsystemen allerlei soorten verbindingen nodig, zoals glasvezelkabels, coaxkabels, radiosignalen, en wifi-verbindingen. Hoewel er verschillen zijn in snelheid en betrouwbaarheid, hebben ze één ding gemeen: ze stellen onze apparaten in staat om met elkaar te communiceren.

## Rol van Switches en Routers

Naast de eindsystemen hebben we ook apparaten met een kruisje erin, zoals switches en routers. Deze vervullen de rol van knooppunten in het netwerk. Als we alle apparaten rechtstreeks met elkaar zouden verbinden, zouden er zoveel kabels zijn dat dit niet haalbaar zou zijn. Daarom hebben we switches en routers nodig om al die verbindingen mogelijk te maken.

## Belang van Applicaties op Eindsystemen

Binnen het internet zijn er hosts die de verscheidenheid aan netwerkapplicaties en techniek ondersteunen. Dit zijn de apparaten die software draaien waar mensen gebruik van maken, zoals webbrowsers, web servers, e-mailclients, en zelfs online games. Deze applicaties willen met elkaar communiceren en berichten over het internet versturen.

## Diensten van de Kern van het Netwerk

De communicatie tussen deze applicaties gebeurt op basis van diensten die worden aangeboden door de kern van het netwerk. Dit concept is belangrijk om te begrijpen: de applicaties maken gebruik van de diensten van het netwerk zonder zich zorgen te hoeven maken over de exacte opbouw van het netwerk.

## Samenhang van Verschillende Netwerken

Als we inzoomen op het netwerk, zien we een lappendeken van netwerken die aan elkaar zijn geknoopt. Dit netwerk van netwerken wordt via lokale internet service providers verbonden met het internet. Er zijn veel verschillende providers die hun eigen gebieden bedienen, maar uiteindelijk is er een wereldwijd netwerk ontstaan door verbindingen tussen deze providers.

## Route van Berichtjes over het Internet

Een berichtje dat bijvoorbeeld vanuit Nederland naar Amerika wordt gestuurd, volgt een route door verschillende netwerken, via switches en routers, voordat het zijn bestemming bereikt. Zo reist het pakketje door een lappendeken van netwerken voordat het aankomt bij het netwerk van de ontvanger.
## Afspraken en Protocollen

Maar ze hebben nog wel wat meer nodig als alle apparaten met elkaar willen communiceren. Dus moeten ze van elkaar diensten kunnen gaan afnemen, en daarvoor zullen ze afspraken moeten maken over hoe ze dat precies gaan doen. Afspraken zijn heel belangrijk voor het internet; ze rollen vast die wat anders zijn vastgelegd in internetstandaarden. Maar wat is een protocol eigenlijk? Het is niets meer of minder dan een afspraak over hoe we met elkaar gaan communiceren: wat voor berichtjes we gaan sturen, hoe ze zijn gecodeerd, waar ze worden verzonden, en wat er gebeurt als er iets fout gaat.

## Populaire Protocollen

Die protocollen beschrijven in detail hoe apparaten op het internet met elkaar kunnen communiceren. Een van die protocollen waar je waarschijnlijk wel eens van hebt gehoord, en verreweg het meest populaire op dit moment, is HTTP: Hypertext Transfer Protocol. Dit is het protocol dat we gebruiken voor het bekijken van webpagina's.

## HTTP-protocol

Het HTTP-protocol en andere protocollen zijn openbaar en zijn vastgelegd in de zogenaamde RFC's (Request for Comments) die beschikbaar zijn op het internet. Ze zijn gepubliceerd en bieden gedetailleerde informatie over hoe ze werken. Het idee hierachter is dat het protocol openbaar is en dat iedereen er mee kan werken en er verbeteringen aan kan voorstellen.

## Implementatie en Standaardisatie

Hierdoor kunnen verschillende softwareontwikkelaars en apparaatfabrikanten software schrijven en apparaten bouwen die zich aan dat protocol houden en dus met elkaar kunnen samenwerken. Gelukkig is HTTP geen verouderd protocol meer, zoals Internet Explorer 6, maar een openbaar protocol dat wordt ondersteund door moderne webbrowsers zoals Firefox, Netscape, Safari, en Google Chrome.

## Internet Engineering Task Force

Er is geen speciale organisatie die deze protocollen beheert. In plaats daarvan is er de Internet Engineering Task Force (IETF) die deze RFC's beheert en bijdraagt aan de ontwikkeling van internetstandaarden. Dit geeft ons een eerste beeld van wat we zoal tegen gaan komen als we naar computer networking en internet gaan kijken.

## Structuur door het Gelaagd Model

In de volgende videocursus gaan we meer structuur aanbrengen door middel van het gelaagd model, het OSI-model. Tot dan!
