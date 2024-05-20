# Protocol Stack

## Intro

Van harte welkom en welkom terug bij het tweede videocollege over netwerkinfrastructuur. Als jullie de eerste les hebben gevolgd, hebben jullie al een eerste indruk gekregen van wat er allemaal komt kijken bij computernetwerken. We hebben gekeken naar verschillende soorten netwerken, van PC's tot aan slimme koelkasten die ons een e-mail sturen als we melk moeten kopen. Ook hebben we gezien hoe internet service providers routers en switches gebruiken om netwerken met elkaar te verbinden.

## Overzicht van Netwerken

In het vorige college hebben we protocollen besproken, die fungeren als standaardregels voor hoe apparaten in een netwerk met elkaar communiceren. Er zijn veel van zulke protocollen en het kan een uitdaging zijn om het overzicht te bewaren. Daarom gaan we in dit college structuur aanbrengen met behulp van een gelaagd model.

## Het Gelaagde Model

Dit gelaagde model, ook wel bekend als het TCP/IP-model, is essentieel voor het begrijpen van netwerkinfrastructuur. Het model bestaat uit vijf lagen:

1. **Fysieke laag**
2. **Linklaag**
3. **Netwerklaag**
4. **Transportlaag**
5. **Applicatielaag**

Dit model is de ruggengraat van het vak infrastructuur en het is cruciaal om te begrijpen wat er in elke laag gebeurt.

## Waarom een Gelaagd Model?

Netwerken zijn complex en bestaan uit veel verschillende componenten, zoals routers, links, applicaties, protocollen, hardware, en software. Dit gelaagde model helpt ons om deze complexiteit te structureren en maakt discussies overzichtelijker.

In plaats van te proberen het hele netwerk in één keer te begrijpen, kunnen we inzoomen op afzonderlijke lagen. Dit maakt het eenvoudiger om te begrijpen wat er op elke laag gebeurt en om specifieke problemen aan te pakken zonder dat we het hele netwerk hoeven te herzien.

## Voordelen van het Gelaagde Model

- **Overzichtelijkheid**: Door het netwerk op te splitsen in lagen kunnen we ons richten op een specifieke laag zonder afgeleid te worden door de complexiteit van het geheel.
- **Eenvoudige Upgrades**: Wanneer er een nieuwe versie van een protocol of technologie uitkomt, hoeft niet het hele netwerk aangepast te worden. Als er bijvoorbeeld een nieuwe versie van Wi-Fi komt, hoef je alleen de apparaten die gebruik maken van deze laag te updaten. De rest van de netwerksoftware kan blijven werken zoals voorheen.

## Toepassing in de Praktijk

Een gelaagd model maakt het ook gemakkelijker om nieuwe technologieën en protocollen te implementeren. Stel je voor dat er een nieuwe, snellere Wi-Fi-standaard wordt geïntroduceerd. Alleen de hardware en de software die direct met de Wi-Fi-verbinding te maken hebben, moeten worden geüpdatet. De applicaties en andere softwarelagen kunnen blijven werken zoals ze zijn.
## Uitdagingen in Software Ontwikkeling

Wanneer je bijvoorbeeld een stukje software wilt ontwikkelen, is het een geweldig idee om een nieuwe netwerkapplicatie te creëren. Dat is echter een uitdaging om goede code voor te schrijven. Het is belangrijk dat de software goed en stabiel werkt en gebruiksvriendelijk is. Je wilt je geen zorgen hoeven maken over hoe de rest zal werken.

## Zorgeloos Programmeren

Bijvoorbeeld, als je een online game programmeert, hoef je niet na te denken over of de pakketjes via wifi worden verstuurd of via glasvezelkabels. Je hoeft je ook geen zorgen te maken over hoe de berichtjes worden doorgestuurd naar de andere kant van de wereld. Dat wordt allemaal afgehandeld door de onderliggende lagen, en je kunt je daar gelukkig gewoon op jouw applicatie concentreren.

## Voordelen van een Gelaagd Model

Een van de voordelen van een model met meerdere lagen, en misschien wel de belangrijkste reden dat het internet zo'n groot succes is geworden, is dat het verschillende technieken mogelijk maakt om samen te werken. Zolang ze maar duidelijke afspraken hebben over de diensten die ze leveren.

## Diverse Technologieën in Samenwerking

Bijvoorbeeld, als we kijken naar internet, zien we een hoop verschillende technologieën. Denk aan wifi, 4G, optische fibers (glasvezelkabels), koperkabels, satellietverbindingen, enzovoort. Deze technologieën hebben allemaal verschillende eigenschappen, maar ze kunnen samenwerken door gemeenschappelijke afspraken te maken.

## Gelaagde Structuur van het Internet

Het internet is opgebouwd uit vijf lagen, met de applicatielaag helemaal bovenaan. Hier bevinden zich de netwerkapplicaties en de software die mensen gebruiken, zoals webbrowsers, webservers, e-mailservers, enzovoort.

## Applicatielaag

De applicaties sturen berichtjes over het internet, maar wat werkelijk wordt verstuurd, wordt bepaald door de onderliggende lagen. Daaronder vinden we de transportlaag, die verantwoordelijk is voor het verzenden van berichtjes tussen applicaties.

## Transportlaag

De transportlaag biedt een dienst aan applicaties om berichtjes te kunnen versturen. Hier komen we protocollen tegen zoals TCP en UDP.

## Netwerklaag

Onder de transportlaag vinden we de netwerklaag. De belangrijkste rol van deze laag is om te zorgen dat berichten een route kunnen vinden over het wereldwijde internet, van bijvoorbeeld Groningen naar New York naar Tokio.

## Linklaag

Onder de netwerklaag vinden we de linklaag. Deze laag zorgt ervoor dat pakketjes kunnen worden gestuurd over een specifieke verbinding tussen twee apparaten die rechtstreeks met elkaar zijn verbonden.

## Fysieke Laag

Helemaal onderin vinden we de fysieke laag. Hier gaat het echt over bits of bytes op de kale verbinding, inclusief elektromagnetische eigenschappen van de verbinding, zoals stroompjes, spanningen, of lichtflitsen.

## Belang van Fysieke Infrastructuur

Dat is een heel belangrijk punt waar goed over nagedacht wordt. In eerdere rijtjes zei ik er wel wat over, maar in dit vak gaan we eigenlijk dieper in op de fysieke laag. Dat is het domein van werktuigkundigen, technici, en natuurkundigen, en het is heel belangrijk dat er nagedacht wordt over het ontwerp en de voorzieningen, want zij bepalen precies hoe we de regelbare frequenties gaan gebruiken en welk deel van het frequentiespectrum.

## Informatieoverdracht op de Fysieke Laag

Voor ons als informatici is dat wel wat verder van ons bed. Ons aandeel begint weer verschijnen er iets hoger in deze internetprotocollenstructuur. Ja, lijkt veel meer te gebeuren, zoals we net zagen, maar eigenlijk zien we hier dezelfde elementen terug om nog een keer te illustreren hoe dat dan allemaal samenwerkt.

## Illustratie van Samenwerking

We zien een laptop, dan zien we een andere laptop, en op die laptop draait een applicatie. Dat kan een klein berichtje of een grote afbeelding naar Japan sturen, een bericht versturen of zelfs een filmpje downloaden. Het maakt eigenlijk niet uit wat het precies is. Ja, eigenlijk, kortweg, de applicatie stuurt het berichtje en de netwerklaag zorgt ervoor dat het berichtje wordt verstuurd.

## Dienstafname van Onderliggende Lagen

De applicatielaag op jouw computer geeft het bericht door aan de transportlaag, die gewoon is ingebouwd in het besturingssysteem van jouw machine. De applicatielaag vraagt dus eigenlijk aan de transportlaag: "Wil jij mij alsjeblieft dit bericht versturen?".

## Segmentatie op de Transportlaag

Wanneer de applicatielaag vraagt om een bericht te versturen, pakt de transportlaag dat bericht in, in zogenaamde 'segmenten'. Een segment is gewoon de naam voor een stukje data. Maar wat zit er dan precies in zo'n segment? Allereerst natuurlijk het bericht van de applicatie dat verzonden moet worden, en dan voegt de transportlaag informatie toe die nodig is voor zijn werk.

## Informatie Toevoegen aan Segmenten

Die informatie kan verschillende dingen zijn, zoals de codering van de applicatie die het bericht verstuurt, waar het bericht naartoe moet, of misschien zelfs controle-informatie om te kijken of het goed is aangekomen. Wat voor informatie dat ook is, de applicatielaag voegt wat van die dingen toe aan het oorspronkelijke bericht, en dat noemen we dan het 'segment'.

## Dienstafname op de Netwerklaag

De transportlaag geeft het segment door aan de netwerklaag, die het omvormt tot een 'datagram'. Een datagram is gewoon de term voor de informatie op de netwerklaag. Wat zit er allemaal in zo'n datagram? Eigenlijk het segment waarin uiteindelijk het bericht van de applicatie is te vinden, en ook de netwerklaag zal weer eigen informatie toevoegen.

## Toevoegen van Informatie op de Netwerklaag

Op de netwerklaag kan deze informatie bijvoorbeeld de welbekende IP-adressen zijn die gebruikt worden om data over te versturen. Maar we zijn er bijna, maar nog niet helemaal.

## Verzending over de Linklaag

Uiteindelijk moet het datagram dat klaar is, naar een bepaalde verbinding worden gestuurd, bijvoorbeeld naar de eerstvolgende router. Dat is de verantwoordelijkheid van de linklaag, die ervoor zorgt dat het datagram over de verbinding wordt gestuurd.

## Framing op de Linklaag

De linklaag ontvangt het datagram en pakt het in in een zogenaamd 'frame'. Een frame is dus de hoeveelheid informatie die we op de linklaag doorsturen. Wat zit er dan in zo'n frame? Eigenlijk nog steeds het oorspronkelijke bericht van de applicatie, en ook de linklaag zal er eigen informatie aan toevoegen.
## Vergelijking met Russische Matroesjka Poppen

Het is alsof ik me een reeks Russische matroesjka-poppen voorstel, waarbij elk kleinere popje in een grotere past, en die grotere in een nog grotere. En dat geheel gaan we versturen. Dit is de verscheidenheid die terugkomt wanneer we terugkomen bij het frame.

Het komt oorspronkelijk niet aan als een frame, want daaronder zit nog de fysieke laag. Het komt in eerste instantie aan als een sprankje radiosignalen, maar dat wordt uiteindelijk omgezet in enen en nullen.

## Transformatie naar Digitale Signalen

Door het harde werk dat we gebruiken, wordt het uiteindelijk omgezet in enen en nullen. De linklaag pakt het patroon uit dat precies klopt, en je wordt nu weer helemaal uitgeput. En dan gaat het door naar de netwerklaag.

## Controle door Netwerklaag

De netwerklaag doet op basis van haar informatie een pluimcontrole, en als ons goed is, wordt het segment eruit gehaald en doorgegeven naar boven aan de transportlaag.

## Terug naar de Applicatielaag

De transportlaag doet een controle en, als alles goed is gegaan, wordt er wat rond en de applicatieberichten uit gehaald en afgegeven aan de applicatie.

## Aanwezigheid van Alle Lagen

Wat u misschien opvalt, is dat al die lagen aanwezig zijn en compleet zijn tegen de tijd dat het protocol klaar is hier beschikbaar voor dat berichtje van de ene locatie naar de andere applicatie kan worden verstuurd. Dit gebeurt dus eigenlijk onderwijs op jouw machine, omdat jij een heleboel al die lagen actief houdt en iets doet om te zorgen dat het berichtje uiteindelijk goed aankomt.

## Functie van Schakelaars en Routers

Laten we eens kijken naar die twee andere apparaten: de switch en de router. Wat zijn de verschillen op de linklaag? De switch heeft geen netwerklaag en geen transportlaag, laat staan applicaties. Dat betekent eigenlijk heel simpel dat een switch een ontvangen berichtje niet begrijpt en dat dus ook niet doorstuurt.

## Beperkte Functionaliteit van Switches

Hij weet niet wat erin zit, daar heeft hij geen beeld van, en is ook niet in staat op basis van IP-adressen een berichtje de juiste kant op te sturen naar een ander netwerk.

## Functie van Routers

Een router is dus heel goed in staat om verschillende netwerken met elkaar te verbinden en op basis van IP-adressen te routeren waar het berichtje naartoe moet worden doorgestuurd.

## Functionaliteit van Hubs

Een apparaat dat we nog niet hebben beschreven is de hub. Die zien we tegenwoordig ook niet zo heel veel meer in ons huis- en bedrijfsnetwerken. En het werkt op de fysieke laag, wat eigenlijk betekent dat het alleen maar een elektrisch signaal ontvangt en doorstuurt. Er zitten geen enkele intelligentie in, dus het doet niet zo heel veel meer voor de gelegenheid.

## Complexiteit van Netwerkapparaten

Toch wil ik nog even teruggaan naar dit plaatje en een opmerking maken. We werken op de netwerklaag en schakelen de linklaag. Dat is de theorie, dat is ook cool om te beschrijven, maar in de praktijk wordt het steeds meer door elkaar gebruikt.

## Evolutie van Netwerkapparaten

Het boek heet niet voor niets 'Computer Networking', en dat betekent eigenlijk gewoon dat we volgende week gaan beginnen waar de applicatielaag begint, en langzaam maar zeker naar beneden gaan. We hebben dan natuurlijk een heel mooi totaaloverzicht van hoe netwerken precies functioneren.

## Afsluitende Opmerking

Dus voordat je gaat slapen, gaan we deze week nog een filmpje bekijken, en ik ga iets vertellen over de beveiliging van computernetwerken en de risico's die we natuurlijk ook online lopen. Dus beste mensen, stations en graag tot de volgende keer.
