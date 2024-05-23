# Applicatielaag

<p>
    Open de
    <a href="./assets/lessen/les-1b-application-layer.pdf#page=1&zoom=75" target=”_blank”>les 1b application layer</a>
    in a new tab window fullscreen.
</p>

## Intro

Hallo en welkom terug bij deze tweede les over infrastructuur. In de vorige les hebben we al gekeken naar computernetwerken en zijn we Rotterdam tegengekomen. We hebben daar een beetje structuur gebracht aan de hand van een gelaagd model. Deze keer gaan we verder met de bovenste laag van dit model en kijken we naar de applicatielaag en wat we daar zoal tegenkomen. Hier zitten we opnieuw bij de TCP/IP-protocolstack, dus laten we als eerste nog even kort herhalen wat dat inhoudt en ook kijken waar we deze twee termen precies tegenkomen op jouw computer en hoe dat verband houdt met het operatingsysteem op dat apparaat.

## Noodzaak van Applicaties op de Applicatielaag

We zullen vervolgens dieper ingaan op wat er allemaal nodig is voor applicaties op de applicatielaag om effectief te kunnen communiceren. We zullen zien dat ze bijvoorbeeld een bepaalde netwerkcommunicatiearchitectuur kunnen kiezen, zoals client-server of peer-to-peer. Ook zullen we zien dat ze gebruikmaken van applicatieprotocollen en -diensten.

## Transportlaag en Diensten van Onderliggende Lagen

We zullen ook een klein beetje vooruitkijken naar de transportlaag, want zoals we weten, de applicatielaag regelt niet al het internetverkeer maar maakt gebruik van de diensten van de lagen eronder. Dat betekent dat onze applicaties niet in detail hoeven te weten hoe de transportlaag precies werkt, maar je moet op zijn minst wel weten wat voor dienstverlening je precies kunt verwachten. Je kunt een voetreis naar Rome boeken of je kunt een superhoge kielzog boeken in een merrie zwart aan de Turkse Riviera.

## Noodzaak van Inzicht in Besturingssystemen

Het kan een hele grote hulp zijn als je net een totaal andere dienst bent begonnen, dus het is wel fijn om te weten waar je rekening mee moet houden als je nieuw bent in het tweede gedeelte van dit college. We kijken naar een aantal concrete applicatieprotocollen die jullie waarschijnlijk elke dag gebruiken en zullen vervolgens zien hoe die principes worden toegepast in dit soort protocollen.

## Verband tussen Apparaten en Besturingssystemen

Als we beginnen te kijken naar computernetwerken en onze TCP/IP-goals in verhouding tot besturingssystemen, wat kunnen we dan ontdekken? Nou, als we kijken naar het internet, dan zijn er miljarden apparaten die verbonden zijn. Ze ondersteunen allerlei verschillende soorten apparaten, zoals computers, laptops, smartphones, tablets, playstations, smart tv's, internetkoelkasten, enzovoort. Al deze apparaten kunnen verschillend zijn, maar ze hebben allemaal een besturingssysteem nodig om te kunnen werken. Wat is dan een besturingssysteem? Een besturingssysteem kun je zien als een speciaal stuk software dat de hardware van het systeem beheert. Het communiceert met hardware zoals het geheugen, de CPU, het display, het toetsenbord, de muis, en eventuele aangesloten camera's. Alle hardware wordt aangestuurd door het besturingssysteem. En dan heb je tenslotte de applicaties die door eindgebruikers worden gebruikt, en die applicaties zullen natuurlijk gebruik maken van de diensten van de hardware, maar ze hoeven dat gelukkig niet allemaal zelf te regelen.

## Voordelen van een Besturingssysteem

Met een bestaand besturingssysteem is het een stuk makkelijker om software te schrijven, en wat ook helpt is dat het makkelijker is om zo'n systeem optimaal te laten werken. Je kunt ervoor zorgen dat de beste routines voor hardware aansturen voortdurend worden geüpdatet in dat besturingssysteem, en applicaties kunnen er ook gebruik van maken.

## Diversiteit in Besturingssystemen

En hoewel dit niet hetzelfde laagmodel is als het TCP/IP-model, zien we wel een vergelijkbaar idee. Een applicatie kan gebruik maken van de diensten van de laag daaronder en hoeft dan niet alles zelf te regelen. Dat wordt in het geval van hardware goed geregeld door het besturingssysteem. Er zijn in de loop der jaren veel verschillende besturingssystemen ontwikkeld. Hier zien we logischerwijs een paar populaire: Windows, macOS, Linux, enzovoort.

## Keuze van Besturingssystemen

Dit is ook nog steeds aan de orde voor de workstation op je telefoon, en je misschien, en er zijn er nog veel meer. De gebruikersgemeenschap van besturingssystemen vindt het leuk om te discussiëren over welk besturingssysteem het beste is. Ik heb daar zelf geen mening over, want ik denk dat het afhangt van wat je met je apparaat wil gaan doen. Als je een grote, complexe computer hebt die veel verschillende taken moet uitvoeren, dan zouden Windows of macOS een goede keuze kunnen zijn. Wil je een kleine sensor ophangen aan de zijkant van een straat in Amsterdam die eens in de zoveel tijd de luchtkwaliteit meet en doorstuurt, zodat we een schone straat hebben, dan ga je daar geen Windows op zetten, want dat is veel te groot en zwaar voor dat kleine apparaatje met beperkte hardware. Daarvoor gebruik je een veel kleiner en lichter besturingssysteem.

## Functionaliteiten van Besturingssystemen

Sommige besturingssystemen zijn heel gebruiksvriendelijk, bij andere moet je echt commando's typen. Sommige zijn grafisch, andere zijn tekstgebaseerd. Dus het hangt eigenlijk af van wat je wil gaan doen met je machine en wat je prettig vindt om mee te werken.

## Toepassing van Operating Systems in de Applicatielaag

Een geschikt besturingssysteem kiezen is van belang als je iets specifieks nodig hebt. Als je bijvoorbeeld de stabiliteit en goede performance van Linux waardeert, kan dat een reden zijn om ervoor te kiezen. Maar hoe heeft dit allemaal te maken met netwerken? Laten we nog eens kijken naar het besturingssysteem, maar deze keer in relatie tot de PIB-kosten en bogen van de applicatielaag. In de applicatielaag draaien de applicaties, die ook op een besturingssysteem kunnen werken. Dit zijn softwarestukken die ontwikkeld zijn door programmeurs en kunnen van alles zijn, van online games tot andere toepassingen die informatie over het netwerk verzenden. Dit geldt voor dezelfde applicaties die we bij de transportlaag vinden. In feite hoeft je de transportlaag niet opnieuw te programmeren voor elke toepassing, omdat een versie van deze, de transportlaag, al beschikbaar is voor de netwerklaag. Sommige functies van de netwerklaag zijn echter ook te vinden in het besturingssysteem. Een deel van de netwerklagen zien we vaak ook in de hardware, zoals netwerkkaarten in computers. Denk aan Wi-Fi en ethernetadapters. De linklaag is zeker in de hardware te vinden. Denk aan de netwerkkaart, Wi-Fi, ethernetadapter, enzovoort. De linkkracht is te vinden op het fysieke niveau. Denk aan de kabels die onze computers verbinden of aan de radiosignalen die door de lucht gaan. Hiermee krijgen we een idee waar we onze applicaties kunnen vinden op onze computer en hoe ze de diensten van de transportlaag gebruiken. Maar wat is er nodig om een netwerkapplicatie te maken? Het begint allemaal met een besturingssysteem dat communiceert met de hardware. Dan hebben we applicaties die draaien op dat besturingssysteem, die vervolgens communiceren over het netwerk.

## Directe Communicatie tussen Hardware en Infrastructuur

Tussen hardware en infrastructuur zit van alles, maar applicaties hebben het idee dat ze rechtstreeks met elkaar communiceren. Er zijn verschillende voorbeelden van wat er tussen zit. Een goed voorbeeld is een webservice. Dit zijn twee applicaties die met elkaar communiceren. De browser vraagt bijvoorbeeld een pagina aan een webserver, en de webserver stuurt mogelijk iets terug. Applicaties hebben geen code om allerlei netwerkapparaten aan te sturen of verbindingen op te zetten. Dat wordt allemaal geregeld op een lager niveau, zoals de hardware.

## Keuze van Applicatie Architectuur

Eerst moet je kiezen tussen twee verschillende applicatiearchitecturen: het client-servermodel of het peer-to-peermodel. Bij het client-servermodel vraagt de client een dienst aan bij de server, die vervolgens de dienst verleent. Voorbeelden hiervan zijn webservers en mailservers. Het client-servermodel is populair maar heeft ook beperkingen, zoals het feit dat de server een bottleneck kan worden bij veel gebruik. Het peer-to-peermodel, daarentegen, heeft geen centrale server. In plaats daarvan werken alle peers samen om een dienst te verlenen. Dit model is schaalbaar, maar het beheren van een peer-to-peer-netwerk kan complex zijn.

## Keuze van Applicatieprotocol

Na het kiezen van de architectuur moet je een applicatieprotocol kiezen. Dit protocol bepaalt hoe apparaten en software in het netwerk communiceren. De meeste protocollen zijn openbaar en beschreven in RFC's (Request for Comments), zoals HTTP voor het bekijken van websites. Open protocollen hebben als voordeel dat iedereen software kan maken die aan de standaard voldoet. Gesloten protocollen, zoals Skype, zijn moeilijker te begrijpen, waardoor het lastiger is om alternatieve clients te maken.

## Betrouwbaarheid van Dataoverdracht

Deze vrees zorgt voor een betrouwbare dataoverdracht, omdat we verwachten dat alles wat ik verstuur aankomt zonder falen, zonder dat er stukjes missen of dat de volgorde niet meer klopt. Met deze twee protocollen, kan ik erop vertrouwen dat het goed gaat. Natuurlijk zijn er nog een paar andere zaken die worden behandeld, zoals de snelheid waarmee data over het internet wordt verzonden. Hiervoor zijn twee mechanismen: flow control en congestion control. Flow control houdt rekening met de snelheid waarmee de ontvanger data kan verwerken en zal het tempo verlagen als dit te snel gaat. Congestion control daarentegen, houdt rekening met de snelheid van het netwerk en zal de snelheid verlagen als het netwerk overbelast is. Zodra de bandbreedte weer beschikbaar is, zal het weer versnellen.

## Flow Control en Congestion Control

Flow control lijkt op traction control, het past zich snel aan, maar om een andere reden. Congestion control houdt rekening met het feit dat routers pakketten kunnen verliezen als hun buffers vol raken. Als het netwerk al overbelast is en er pakketten verloren gaan, is het niet logisch om meer pakketten te verzenden. In plaats daarvan zal het protocol rekening houden met de overbelasting en de snelheid verlagen om te voorkomen dat er nog meer pakketten verloren gaan.

## Snelheid en Bandbreedte Garanties

Deze protocollen garanderen echter niet de snelheid waarmee gegevens worden verzonden. Voor online gamers of voor toepassingen die een lage latentie vereisen, kan dit een probleem zijn. Bovendien bieden ze geen garantie voor de beschikbare bandbreedte. Als het netwerk op een bepaald moment drukker is, kan de snelheid van de gegevensoverdracht afnemen. Als je bijvoorbeeld een ultra-HD-video wilt streamen, heb je voldoende bandbreedte nodig. Als het netwerk op dat moment te druk is, kan de kwaliteit van de video worden verminderd.

## Best Effort Dienstverlening

Dit zijn dus de beperkingen van deze protocollen. Ze doen hun best om gegevens te bezorgen, maar bieden geen garantie. Als er fouten optreden, zoals verloren pakketten of beschadigde gegevens, zullen deze protocollen die problemen niet oplossen. Het biedt geen garanties over de timing van de levering of over de beschikbare bandbreedte. Dit kan leiden tot een minder betrouwbare dienstverlening, maar het biedt ook meer flexibiliteit. In sommige gevallen kan het nuttig zijn om een protocol te gebruiken dat deze beperkingen niet heeft, bijvoorbeeld voor toepassingen waarbij snelheid en betrouwbaarheid van cruciaal belang zijn.

## Toepassingen van Transportprotocollen

Iets genuanceerder wordt het. Voor dit soort toepassingen, zoals het streamen van media zoals filmpjes, internet telefonie of videoconferenties, waren traditioneel gezien andere protocollen zoals UDP de logische keuze. Tegenwoordig zie je echter dat deze toepassingen steeds populairder worden en een van de redenen hiervoor is natuurlijk dat onze internetverbindingen steeds sneller zijn geworden sinds het internet is uitgevonden. Dus waar vroeger het snelheidsverschil tussen UDP en TCP relevant was, is de gemiddelde internetsnelheid nu zo hoog dat TCP ook goed kan werken. Waarom zouden we dan niet profiteren van de voordelen van TCP voor dit soort toepassingen?

In de praktijk zie je dat zowel TCP als UDP worden gebruikt voor multimedia streaming en videoconferenties. Een andere belangrijke reden hiervoor is dat we dit soort activiteiten steeds vaker gewoon in de browser doen. Als je bijvoorbeeld een video op YouTube bekijkt, maak je eigenlijk al gebruik van TCP als onderliggend transportprotocol. Dit betekent dat onze applicaties niet hoeven te weten hoe het onderliggende transport werkt, ze weten alleen dat ze gegevens moeten verzenden en ontvangen via een bepaalde poort op een bepaald adres.

Nu, hoe zorgen we ervoor dat we ook echt gebruik kunnen maken van de diensten van de transportlaag? Nou, dat is eigenlijk vrij eenvoudig. Op dit plaatje zie je twee machines die met elkaar moeten communiceren. Elk van deze machines heeft een applicatieproces, een stukje software ontwikkeld door een softwareontwikkelaar. Dit proces maakt geen rechtstreekse verbinding met het netwerk, maar maakt gebruik van de transportlaag, die te vinden is in het besturingssysteem. Dus wat het applicatieproces eigenlijk doet, is een beroep doen op het besturingssysteem om een verbinding tot stand te brengen met de transportlaag. Dit proces opent een zogenaamde socket, wat in feite een verbinding is met bijvoorbeeld het TCP/IP-stack in het besturingssysteem. Via deze socket kan het proces vervolgens informatie verzenden en ontvangen. Deze informatie wordt afgehandeld door TCP/IP en de onderliggende lagen, maar het proces zelf hoeft zich hier niet mee bezig te houden. De informatie wordt verzonden over het internet en komt uiteindelijk aan bij de bestemmingsmachine, waar deze wordt gecontroleerd en verwerkt door de transportlaag. Daarna wordt de informatie doorgegeven aan het applicatieproces aan de andere kant van de verbinding.

Er is echter nog één ding om te vermelden. Op een bepaald moment draait er waarschijnlijk niet slechts één applicatie op jouw computer. Misschien ben je aan het downloaden met BitTorrent, heb je een paar chatvensters open en ben je ook aan het surfen op het web. Daarom moeten de verschillende berichten die naar jouw computer worden gestuurd, worden gericht aan de juiste applicatie. Hiervoor hebben ze soms een adres nodig om ze uit elkaar te houden. Dit wordt gedaan met behulp van een poortnummer. Het poortnummer wordt toegewezen aan een applicatie en geeft aan welke applicatie het bericht moet ontvangen. Veel applicaties hebben bekende poortnummers, zoals poort 80 voor webdiensten en poort 25 voor e-mailservices. Op deze manier weet het besturingssysteem naar welke applicatie het bericht moet worden doorgestuurd.

## Eerst indruk

Met deze eerste indruk van de transportlagen hebben we nu een beter begrip van wat er allemaal nodig is en wat er op ons afkomt wanneer we een netwerkapplicatie ontwikkelen. In het volgende deel zullen we kijken naar een aantal populaire netwerkapplicaties en zien hoe deze principes in de praktijk worden toegepast. Tot dan!
