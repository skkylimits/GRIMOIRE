# Transportlaag

<p>
    Open de
    <a href="./assets/lessen/les-2a-dns-transport-layer-tcp.pdf#page=1&zoom=75" target=”_blank”>les 2a dns transport layer tcp</a>
    in a new tab window fullscreen.
</p>

## Intro

Welkom terug voor het tweede deel van dit college. Zoals gezegd staat in deze les de transportlaag centraal. We hebben al een beetje gekeken naar de transportlaag in het kader van applicaties en applicatieprotocollen die de hulp van de transportlaag inroepen om berichten via het internet te versturen.

## Diensten van de Transportlaag

We hebben gezien dat er twee soorten dienstverlening zijn: TCP (Transmission Control Protocol) en UDP (User Datagram Protocol). TCP zorgt voor betrouwbare datatransmissie, waarbij we zeker weten dat wat we versturen ook daadwerkelijk aankomt. UDP biedt een best-effort service, waarbij de snelheid voorop staat, maar waarbij het kan gebeuren dat er onderweg iets misgaat.

## Betrouwbaarheid vs. Snelheid

Het voordeel van UDP is dat het sneller is, maar het nadeel is dat er data verloren kan gaan of beschadigd kan raken. TCP daarentegen zorgt voor een betrouwbare verbinding, maar kan iets trager zijn door de extra controles die uitgevoerd worden.

## In Detail: TCP en UDP

Vandaag gaan we in meer detail kijken naar deze twee transportlaagprotocollen en zien hoe ze hun werk doen. UDP biedt minimale dienstverlening en is daarom minder complex. TCP daarentegen heeft meer functies, zoals connectiebeheer en congestiecontrole, en biedt een betrouwbare datatransmissie.

## Wat Doet de Transportlaag?

De transportlaag biedt een dienst aan applicaties, waardoor applicaties met elkaar kunnen communiceren via de transportlaag. Deze communicatie lijkt rechtstreeks, hoewel we weten dat er nog een heel internet vol verbindingen, routers en switches tussen zit.

## Transportlaag: Logische Verbindingen

De transportlaag biedt logische verbindingen aan tussen applicaties. Vanuit het perspectief van de transportlaag lijken applicaties rechtstreeks met elkaar te communiceren, ook al gebeurt er meer op de lagere lagen van het netwerk.

## Segmentatie van Berichten

De transportlaag ontvangt een bericht van een applicatie en verpakt dit in een zogenaamd segment. Vervolgens voegt de transportlaag informatie toe aan dit segment om de communicatie mogelijk te maken.

## Introductie tot de Transportlaag

We versturen gegevens over het internet, waarbij de transportlaag gebruikmaakt van de dienstverlening van de netwerklaag. Aan de andere kant komt het bericht weer tevoorschijn. Op het internet kennen we twee belangrijke transportlaagprotocollen: TCP (Transmission Control Protocol) en UDP (User Datagram Protocol). De transportlaag bevindt zich in het model boven de netwerklaag en maakt gebruik van diens diensten om data te versturen.

## Transport Vs. Netwerklaag

De transportlaag biedt communicatie tussen applicaties, terwijl de netwerklaag zorgt voor communicatie tussen hosts (computers). De netwerklaag zorgt ervoor dat een bericht op de juiste computer terechtkomt, terwijl de transportlaag ervoor zorgt dat het bericht bij de juiste applicatie op die computer aankomt. Dit is belangrijk omdat een computer meerdere applicaties tegelijk kan draaien.

## Analogie: De Postdienst

Stel je voor dat je een brief wilt sturen naar een docent aan de Hogeschool van Amsterdam. Je stopt de brief in een envelop en adresseert deze aan de hogeschool. De postbode zorgt ervoor dat de brief bij de hogeschool aankomt, vergelijkbaar met de netwerklaag. Binnen de hogeschool moet de brief vervolgens naar de juiste docent worden gebracht. Dit is vergelijkbaar met de transportlaag, waarbij de interne postdienst de brief in het juiste postvakje stopt. Het postvakje met nummer is vergelijkbaar met het poortnummer van de transportlaag.

## UDP: Best-Effort Service

Op de transportlaag kunnen we kiezen tussen twee protocollen. UDP biedt een eenvoudige best-effort service. Dit betekent dat er fouten kunnen optreden, pakketjes zoek kunnen raken of in de verkeerde volgorde kunnen aankomen. UDP doet geen moeite om dit te corrigeren en probeert de data zo goed mogelijk te versturen zonder garantie op betrouwbaarheid.

## TCP: Betrouwbare Datatransmissie

TCP zorgt daarentegen voor betrouwbare datatransmissie. Wat verstuurd wordt, komt precies zo aan, zonder fouten of ontbrekende stukjes. Als er iets misgaat, herstelt TCP dit. TCP reguleert ook de snelheid waarmee pakketjes verstuurd worden via flow control en congestiecontrole. Flow control zorgt ervoor dat er niet meer data verstuurd wordt dan de ontvanger kan verwerken, terwijl congestiecontrole de snelheid aanpast afhankelijk van de drukte op het netwerk.

## Verbindingen en Beperkingen

TCP maakt gebruik van verbindingen om data betrouwbaar te versturen. Deze verbindingen zorgen ervoor dat de communicatie betrouwbaar en gestructureerd verloopt. Toch zijn er ook beperkingen: de transportlaag biedt geen garantie dat de data op tijd aankomt of dat er voldoende bandbreedte beschikbaar is. Daarnaast regelt de transportlaag standaard geen beveiliging, wat betekent dat er aanvullende maatregelen nodig zijn om de data te beveiligen.

## UDP: Het Meest Eenvoudige Protocol

UDP is het meest eenvoudige protocol en er is eigenlijk niet veel meer over te vertellen dan wat we al gedaan hebben. Het kan dus zijn dat je iets verstuurt en dat het niet goed overkomt. UDP wordt vooral gebruikt voor toepassingen waar snelheid belangrijker is dan betrouwbaarheid, zoals streaming van multimedia en videoconferenties. Bij een videoconferentie maakt het niet veel uit als een paar pakketjes verloren gaan, zolang de communicatie snel en vloeiend blijft verlopen.

## Gebruik van UDP bij DNS

UDP wordt vaak gebruikt bij DNS-verzoeken omdat snelheid hier van groot belang is. DNS-verzoeken zijn meestal korte vragen en antwoorden, waardoor de eenvoud van UDP voordelig is. Tegenwoordig wordt voor DNS ook wel TCP gebruikt, vooral wanneer veiligheid en betrouwbaarheid belangrijk zijn.

## Wireshark en UDP

Met Wireshark kun je precies zien welke velden er zijn in een UDP-pakket. Je ziet onder andere de gereserveerde ruimte voor applicatiedata, de source port en destination port, de lengte van het segment, en de checksum. De checksum wordt gebruikt om te controleren of de data correct is aangekomen. Als de checksum niet klopt, is er waarschijnlijk een fout opgetreden, maar UDP doet geen moeite om deze fout te herstellen.

## TCP: Transmission Control Protocol

TCP biedt meer diensten dan UDP, zoals betrouwbare data-overdracht via verbindingen. Als twee partijen willen communiceren via TCP, openen ze eerst een TCP-verbinding met behulp van een driehandshake-proces. Dit proces zorgt ervoor dat beide partijen klaar zijn om gegevens te versturen en ontvangen.

## Betrouwbare Data-overdracht met TCP

TCP houdt de volgorde van de pakketjes bij en controleert of ze correct zijn ontvangen. Dit zorgt voor betrouwbare data-overdracht. TCP gebruikt flow control en congestiecontrole om de snelheid van de data-overdracht te reguleren, afhankelijk van de mogelijkheden van de ontvanger en de drukte op het netwerk.

## Structuur van een TCP-segment

Een TCP-segment bevat meer velden dan een UDP-pakket. Naast ruimte voor applicatiedata bevat het velden zoals source port, destination port, sequence number en acknowledgment number. De checksum wordt hier ook gebruikt om de integriteit van de data te controleren. Als de checksum niet klopt, zal TCP het pakket opnieuw versturen.

## Flags en Controle in TCP

TCP-segmenten bevatten flags die gebruikt worden voor het openen en sluiten van verbindingen. Daarnaast zijn er sequence numbers en acknowledgment numbers die TCP gebruikt om de volgorde van de data en de betrouwbaarheid van de overdracht te garanderen. TCP verstuurt een stukje informatie en wacht op een bevestiging van de ontvanger dat de informatie correct is ontvangen.

## Slimme Manieren van TCP

TCP gebruikt slimme technieken om efficiënte en betrouwbare data-overdracht te garanderen. In plaats van te wachten op elke individuele bevestiging, kan TCP meerdere pakketjes tegelijk versturen en parallelle bevestigingen afhandelen. Hierdoor wordt de snelheid en efficiëntie van de data-overdracht verbeterd zonder de betrouwbaarheid in gevaar te brengen.

## Betrouwbare Data-overdracht

Wanneer je met TCP werkt, stuur je eerst een pakketje informatie en wacht je op een bevestiging voordat je verder gaat met het volgende pakketje. Dit zorgt ervoor dat TCP een heel betrouwbaar protocol is. Alles wordt verstuurd, bevestigd en pas dan ga je verder met het versturen van nieuwe data. Dit zou echter niet effectief zijn met snelle breedbandverbindingen, waar je veel informatie tegelijkertijd kunt versturen.

## Pipeline Protocol

TCP gebruikt een pipeline-protocol, wat betekent dat meerdere pakketjes tegelijkertijd kunnen worden verstuurd. Deze worden dan ergens onderweg bevestigd. Hierdoor maak je beter gebruik van de beschikbare bandbreedte. Het nadeel is dat je meer moet bijhouden, zoals hoeveel data je hebt verstuurd en hoeveel data correct is aangekomen en bevestigd.

## Gebruik van Sequence en Acknowledgment Numbers

TCP gebruikt sequence en acknowledgment numbers om de betrouwbaarheid van de data-overdracht te waarborgen. Elk verstuurd pakketje bevat een sequence number dat aangeeft hoeveel bytes data tot nu toe verstuurd zijn. De ontvanger stuurt een acknowledgment number terug dat aangeeft welke byte hij als volgende verwacht te ontvangen.

## Voorbeeld: Telnet Applicatie

Bijvoorbeeld, een gebruiker drukt op de letter 'C' in een Telnet-applicatie. Dit verstuurt de byte 'C' met een sequence number van 42. De ontvanger bevestigt dit met een acknowledgment number van 43, wat betekent dat hij klaar is voor de volgende byte.

## Tweeweg Communicatie

TCP is tweerichtingsverkeer, wat betekent dat beide partijen tegelijkertijd data kunnen versturen en ontvangen. Ze houden allebei bij hoeveel data ze hebben verstuurd en hoeveel correct is ontvangen.

## Wat Gebeurt Er Als Er Iets Misgaat?

Als er iets misgaat en een pakketje niet aankomt, zal de verzender na een bepaalde tijd een timer starten. Als de bevestiging niet binnenkomt, verstuurt de verzender het pakketje opnieuw. De ontvanger herkent dat het een herhaling is en bevestigt het opnieuw.

## Reservering voor Applicatiedata

TCP-segmenten bevatten ook gereserveerde ruimte voor applicatiedata. Dit is de data die door de applicaties zelf verstuurd wordt. TCP voegt daar sequence en acknowledgment numbers aan toe, evenals checksums om de integriteit van de data te waarborgen.

## Flags en Specifieke Velden

TCP-segmenten bevatten flags die gebruikt worden voor het openen en sluiten van verbindingen, zoals SYN en ACK. Daarnaast zijn er nog andere velden zoals de source port en destination port, die aangeven welke applicatie de data verstuurt en ontvangt.

## Samenvatting van Communicatie

In het algemeen verstuurt TCP een pakketje, wacht op een bevestiging, en verstuurt dan het volgende pakketje. Dit gebeurt efficiënt door meerdere pakketjes tegelijkertijd te versturen en te bevestigen. Als een pakketje verloren gaat, wordt het opnieuw verstuurd totdat het correct wordt ontvangen en bevestigd. Op deze manier zorgt TCP voor een betrouwbare data-overdracht over het internet.

## Communicatie en Herstel

Dit keer komt de bevestiging gelukkig wel aan, en de ontvanger weet nu dat de data correct is aangekomen. Ook over deze processen heeft Peter een leuk filmpje gemaakt. Je kunt de link naar dit filmpje vinden op de deelpagina. Als je nog een keer een frisse uitleg wilt of een ander perspectief over TCP en de transportlaagprotocollen, is dit filmpje van [TCP vs UDP van PieterExplainsTech](https://www.youtube.com/watch?v=Vdc8TCESIg8&t=333s) harte aanbevolen.

## Vooruitblik naar de Netwerklaag

Daarmee zijn we echt aan het einde gekomen van de onderwerpen van vandaag. Volgende keer zie ik je graag terug. Dan gaan we nog een laag dieper in onze TCP-protocolstapel, en dat betekent dat we gaan praten over de netwerklaag. De netwerklaag is een hele complexe laag waarin veel gebeurt om ervoor te zorgen dat pakketjes hun route over de wereld vinden.

## Onderwerpen van de Volgende Les

Volgende week, en ook een stukje van de les daarna, gaan we dieper in op de netwerklaag. Ik zie je dan graag terug. Tot die tijd, heel veel succes met je studie!
