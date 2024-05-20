# Applicatieprotocollen

## Intro

Hallo allemaal, zoals gezegd zullen we in het vervolg van dit college kijken naar hoe een aantal van de principes die we juist hebben behandeld over applicatieprotocollen worden toegepast in een aantal populaire protocollen die we bijna elke dag gebruiken. We gaan kijken naar HTTP om websites te bladeren, naar protocollen voor het versturen van e-mail en zullen ook kijken naar BitTorrent, wat natuurlijk heel populair is voor het downloaden en verspreiden van bestanden.

## Overzicht van HTTP

Laten we beginnen met HTTP, het programma en protocol dat waarschijnlijk veruit het meest populair is op het internet en dat we gebruiken voor het bekijken van webpagina's. Een webpagina bestaat meestal uit een aantal verschillende objecten. Zo'n object kan HTML zijn, maar ook plaatjes, JavaScript-instanties, stukjes audio of video, noem maar op. Normaal gesproken is er een hoofd-HTML-bestand, bijvoorbeeld de index.html. Dit bestand bevat vaak verwijzingen naar de andere benodigde objecten, zoals plaatjes en CSS-scripts.

## URL's en Objectidentificatie

Uiteindelijk bestaat een webpagina dus uit meerdere objecten en elk van die objecten is te vinden via een zogenaamde URL (Uniform Resource Locator). Een URL is een unieke identifier van de locatie waar een object te vinden is. Deze bestaat uit de naam van een server, een pad en de bestandsnaam. Dit geheel vertelt je precies welk object het is en waar het te vinden is.

## De HTTP Verzoek- en Responscyclus

Heel concreet worden deze objecten door jouw browser opgevraagd bij de server. Je kunt dit visualiseren met een PC met Firefox en een oudere iPhone met Safari, en een webserver die de website host met bijvoorbeeld Apache-serversoftware. De client, wij dus met onze browser, stuurt een verzoek aan de webserver. De server ontvangt dit verzoek en stuurt een HTTP-response terug naar de client.

## HTTP Verzoeken en Reacties

Als meerdere mensen dezelfde website willen bezoeken, stuurt elke persoon zijn eigen HTTP-request en ontvangt zijn eigen response van de server. Voor elk object dat nodig is voor een webpagina moet een apart verzoek worden gedaan. Eerst vraag je bijvoorbeeld index.html aan. Vervolgens zie je dat dit HTML-bestand verwijzingen bevat naar andere objecten zoals plaatjes of CSS-scripts. Voor elk van deze objecten doe je een nieuwe HTTP-request totdat je de hele webpagina hebt opgebouwd.

## HTTP-methoden: GET en POST

Er zijn verschillende methoden om deze verzoeken te doen, maar er zijn er twee die voor het normale gebruik van HTTP het belangrijkst zijn: GET en POST. De GET-methode wordt gebruikt om een object op te vragen van de webserver. Als je een GET-request doet, vraagt je browser de server om een specifiek object naar jou toe te sturen. Met een POST-request kun je ook data naar de webserver sturen. Stel dat je een inlogformulier invult met je gebruikersnaam en wachtwoord, dan verstuurt een POST-request deze informatie naar de server.

## Beantwoording van HTTP-verzoeken

Na het verzenden van een POST-request krijg je altijd een response van de server terug. Dit kan een succesbericht zijn, zoals "login succesvol", of een foutmelding, zoals "gebruikersnaam of wachtwoord incorrect". Ook bij een POST-request krijg je dus altijd een reactie van de server.

## Betrouwbare Data-overdracht met TCP

Het transportprotocol dat HTTP gebruikt is TCP, omdat bij het versturen van webpagina's de informatie betrouwbaar moet worden overgedragen. TCP zorgt voor een betrouwbare dataoverdracht tussen de client en de server.

## Stateless Nature van HTTP

Het belangrijkste kenmerk van HTTP is dat het een zogenaamd 'stateless' protocol is. Dit betekent dat een HTTP-server geen informatie onthoudt van vorige interacties. Elk nieuw HTTP-verzoek wordt behandeld als een volledig nieuw verzoek, zonder rekening te houden met eerdere verzoeken of acties van de gebruiker. Dit betekent dat de server geen geheugen heeft van eerdere sessies, inlogstatussen of andere interacties.

## Cookies en Sessies

Hoewel HTTP zelf stateless is, zijn er methoden ontwikkeld om persistentie te bieden. Een van de belangrijkste methoden is het gebruik van cookies. Cookies zijn kleine stukjes informatie die bij een HTTP-verzoek worden meegestuurd en door de browser op de computer van de gebruiker worden opgeslagen. Bij elk volgend HTTP-verzoek worden de cookies opnieuw meegestuurd, waardoor de server informatie kan gebruiken om sessies te beheren. Hierdoor kan een website bijvoorbeeld onthouden wie je bent en wat je in je winkelmandje hebt geplaatst, zelfs als HTTP zelf geen staat onthoudt.

## Gebruik van Cookies

Cookies worden op de computer van de gebruiker opgeslagen en bevatten vaak sessie-ID's of andere informatie die de server helpt om de gebruiker te identificeren en eerdere interacties te herinneren. Als je bijvoorbeeld naar bol.com gaat, inlogt en iets in je winkelmandje plaatst, worden deze acties via cookies onthouden. Wanneer je vervolgens afrekent, weet de website nog steeds wie je bent en wat je hebt gekocht. Als je de cookies in je browser verwijdert, moet je opnieuw inloggen en gaan eerdere sessie-informatie verloren.

## HTTP-verdieping en Praktische Oefeningen

Er is nog veel meer te vertellen over HTTP. Voor verdere details verwijs ik graag naar het boek en ook naar het practicum waarin jullie verder aan de slag gaan met HTTP. Dit zal jullie een dieper inzicht geven in de werking van dit protocol.

## E-mail als Populaire Applicatie

De volgende applicatie die ik wil bespreken is e-mail. E-mail is een van de meest populaire applicaties op het internet. Bij het versturen van e-mail worden verschillende protocollen gebruikt en e-mail werkt volgens een typisch client-servermodel. We hebben mailservers en e-mailclients. De servers beheren onze e-mails en mailboxen, terwijl de clients de interface bieden voor het verzenden en ontvangen van e-mails.

## E-mail Clients en Servers

Vroeger moesten gebruikers vaak specifieke software installeren om e-mails te kunnen versturen en ontvangen. In bedrijfsomgevingen wordt nog steeds vaak gebruik gemaakt van software zoals Outlook of Lotus Notes. Tegenwoordig gebruiken veel mensen webmaildiensten zoals Gmail, Yahoo Mail of Outlook.com, waarmee ze via een webinterface toegang hebben tot hun e-mails. De communicatie tussen de e-mailclient en de mailserver gebeurt via specifieke e-mailprotocollen.

## Mailbox Opslag en Beheer

E-mailservers slaan de e-mails op in de mailboxen van de gebruikers. Deze servers beheren alle inkomende en uitgaande e-mails en zorgen ervoor dat e-mails correct worden afgeleverd. Het is belangrijk om te begrijpen hoe deze servers werken en welke protocollen worden gebruikt om e-mails te versturen en te ontvangen.

## Voordelen van Mailservers

We zien ook dat mailservers instaan voor het verzenden van e-mails. Waarom is dit handig? Als we terugkijken naar de eigenschappen van servers in het client-servermodel, herinneren we ons dat servers altijd beschikbaar zijn. Dit is heel nuttig bij het versturen van e-mails. Stel dat ik bijvoorbeeld een belangrijke e-mail met updates over infrastructuur wil versturen. Het zou heel vervelend zijn als ik zou moeten wachten totdat iedereen zijn computer heeft opgestart en het e-mailprogramma heeft geopend om de e-mail te versturen. Gelukkig hoef ik niet te wachten omdat mailservers altijd beschikbaar zijn. Ik zorg er gewoon voor dat mijn e-mail de mailserver bereikt, waar het wordt opgeslagen in de mailbox van de ontvanger. De ontvanger kan dan, wanneer hij zijn client start, controleren of er nieuwe e-mails zijn.

## SMTP: Simple Mail Transfer Protocol

Het protocol dat we gebruiken om e-mails te versturen is SMTP (Simple Mail Transfer Protocol). Hoe werkt SMTP in combinatie met e-mailservers? Stel dat we twee personen hebben, Alice en Bob, en Alice wil een e-mail sturen naar Bob. Alice start haar mailclient, bijvoorbeeld Gmail, en begint te typen. Wanneer ze klaar is en op 'verzenden' klikt, wordt de e-mail in eerste instantie naar haar eigen mailserver gestuurd. Als Alice een student is bij de HVA, wordt de e-mail naar de mailserver van de HVA gestuurd. Vanaf deze mailserver wordt de e-mail doorgestuurd naar de mailserver van Bob. Als Bob bijvoorbeeld een Gmail-account heeft, wordt de e-mail naar een mailserver van Google gestuurd. Uiteindelijk zal Bob zijn computer opstarten, zijn mailclient openen en de e-mail lezen.

## Protocollen bij het Versturen en Ontvangen van E-mails

Bij het verzenden en ontvangen van e-mails komen verschillende protocollen kijken. Allereerst is er SMTP voor het versturen van de e-mail van de computer van Alice naar haar mailserver en van de mailserver van Alice naar de mailserver van Bob. SMTP (Simple Mail Transfer Protocol) zorgt voor het versturen van e-mails tussen mailservers. Wanneer Bob zijn e-mail wil lezen, komt een ander protocol in beeld, namelijk POP3 of IMAP. Deze protocollen worden gebruikt om e-mails op te halen van de mailserver.

## POP3: Post Office Protocol

POP3 (Post Office Protocol) is een basaal protocol waarmee je kunt inloggen op de mailserver, je e-mails kunt downloaden en vervolgens op je eigen computer kunt bekijken. Dit was vroeger handig, maar tegenwoordig minder praktisch omdat we onze e-mails vaak op meerdere apparaten willen bekijken, zoals laptops, tablets en smartphones. Bij POP3 worden e-mails gedownload en vervolgens van de server verwijderd, wat betekent dat ze niet meer beschikbaar zijn op andere apparaten.

## IMAP: Internet Mail Access Protocol

Een modernere en meer flexibele optie is IMAP (Internet Mail Access Protocol). IMAP biedt de mogelijkheid om e-mails op de server te bewaren en te sorteren in mapjes. Hierdoor kun je vanaf meerdere apparaten toegang krijgen tot je e-mails, zonder dat ze van de server worden verwijderd. Dit maakt IMAP veel handiger in de huidige tijd waarin we vaak meerdere apparaten gebruiken om onze e-mails te beheren. E-mails blijven op de server en kunnen vanaf elk apparaat worden gelezen en georganiseerd.

## Webmail en Onderliggende Infrastructuur

Tegenwoordig gebruiken veel mensen webmail, zoals Gmail, waarbij ze hun e-mails via een webbrowser bekijken. Onderliggend blijft de infrastructuur met mailservers en SMTP-berichten echter hetzelfde. Ook als je webmail gebruikt, communiceren de mailservers nog steeds via SMTP om e-mails te versturen en ontvangen. POP3 en IMAP blijven beschikbaar als protocollen voor het lezen van e-mails via traditionele mailclients.

## Spam: Een Groot Probleem bij E-mail

Wanneer je e-mail gebruikt, ontvang je soms leuke berichten, maar ook een groot probleem: spam. Spam, ook wel ongewenste e-mail, wordt geschat op meer dan 50% van alle wereldwijd verzonden e-mails. Dit betekent miljoenen e-mails per dag. Internet service providers en bedrijven geven veel geld uit om spam tegen te houden. Dit kan op verschillende manieren worden aangepakt.

### Blokkeren van Spam-Servers

Als een server veel spam verstuurt, kan deze worden geblokkeerd. Echter, spammers worden steeds slimmer. Ze nemen met malware computers over, vormen botnets van onschuldige gebruikers, en gebruiken deze om namens hen spam te versturen zonder dat de gebruikers het zelf doorhebben.

### Filteren op Trefwoorden

Spam kan ook worden gefilterd op bepaalde trefwoorden. Veel spam gaat bijvoorbeeld over Viagra. Spammers vinden echter steeds nieuwe manieren om dit te omzeilen, zoals het vervangen van letters door cijfers. Dit resulteert in een voortdurend kat-en-muisspel tussen spammers en filters.

## Bittorrent: Peer-to-Peer Protocol

Naast client-server protocollen is Bittorrent een voorbeeld van een peer-to-peer protocol. Een kenmerk van peer-to-peer architecturen is dat er geen centrale server is. In plaats daarvan werken alle aangesloten computers samen om bestanden te delen. Dit is vooral populair voor het downloaden van bestanden, hoewel het soms voor illegale doeleinden wordt gebruikt. Er zijn echter ook legale toepassingen, zoals het downloaden van open-source software.

### Werking van Bittorrent

Bittorrent werkt door bestanden op te splitsen in kleine stukjes van ongeveer 256 kilobytes. Peers, de gebruikers van het netwerk, wisselen deze stukjes met elkaar uit. Deze peers vormen samen een 'swarm', waarbij elke computer stukjes downloadt en uploadt. Een centrale 'tracker' houdt bij welke peers welke stukjes hebben en helpt bij het coördineren van de uitwisseling.

## Downloadproces via Bittorrent

Het downloadproces begint met contact opnemen met de tracker. De tracker geeft een lijst met peers die het gewenste bestand delen. Vervolgens maakt de downloader contact met deze peers om de stukjes van het bestand te downloaden. Dit proces gaat door totdat het volledige bestand is gedownload.

### Voordelen van Peer-to-Peer

Een groot voordeel van peer-to-peer netwerken zoals Bittorrent is de efficiëntie. Omdat elk stukje van het bestand zowel gedownload als geüpload wordt door verschillende gebruikers, kan het downloaden sneller gaan dan via traditionele methoden. Bovendien verdeelt dit de belasting over veel computers, in plaats van dat één centrale server al het werk moet doen.

### Nadelen en Legale Aspecten

Het gebruik van Bittorrent is niet zonder nadelen. Vaak worden illegale kopieën van software, films en muziek verspreid via deze netwerken. Dit brengt juridische risico's met zich mee voor de gebruikers. Echter, voor legale downloads biedt Bittorrent een krachtige en efficiënte manier om grote bestanden te delen.

## Peer-to-Peer Netwerken en Centrale Servers

Bij het peer-to-peer model, waarbij er geen centrale server is, zien we toch vaak een centrale server opduiken, zoals een tracker server. Trackers zijn kwetsbaar omdat ze op een vast adres staan en daardoor gemakkelijk te vinden en aan te vallen zijn. Dit maakt hen een doelwit voor partijen die niet blij zijn met het succes van het Bittorrent-protocol.

## Kwetsbaarheid van Trackers

Trackers kunnen overbelast raken en zijn vatbaar voor aanvallen zoals denial-of-service. De aanwezigheid van een vaste locatie maakt het mogelijk voor tegenstanders van Bittorrent om de tracker uit te schakelen en zo de werking van het netwerk te verstoren. Deze kwetsbaarheid heeft geleid tot de ontwikkeling van alternatieve methoden om de noodzaak van een centrale tracker te elimineren.

## Oplossingen voor Tracker Kwetsbaarheid

De Bittorrent-gemeenschap heeft oplossingen bedacht om de afhankelijkheid van trackers te verminderen. Tegenwoordig is het vaak niet meer nodig om een tracker te gebruiken om een torrent te downloaden. In plaats daarvan kan een magnet link worden gebruikt, die alleen een identifier van de torrent bevat. Deze links bevatten geen verwijzingen naar trackers, waardoor ze minder kwetsbaar zijn.

## Werking van Magnet Links

Wanneer je een magnet link gebruikt, neem je contact op met andere peers om te ontdekken wie het bestand deelt dat je wilt downloaden. Dit proces kan wat langer duren omdat het netwerk eerst peers moet vinden die de torrent delen. Echter, het elimineert de noodzaak van een centrale tracker, wat de betrouwbaarheid en veerkracht van het netwerk verhoogt.

## Praktisch Gebruik van Bittorrent en Magnet Links

Als je ooit een magnet link hebt gebruikt, merk je misschien dat het even duurt voordat de download op gang komt. Dit komt doordat het tijd kost om andere peers te vinden die de gewenste bestanden delen. Toch blijft Bittorrent een populair en efficiënt middel voor het delen van grote bestanden, zowel legaal als illegaal.

## Vooruitblik: DNS en Netwerkdiensten

In de volgende sessie zullen we een andere belangrijke applicatieprotocol bespreken: DNS (Domain Name System). We zullen verder praten over de diensten die het mogelijk maken om internetadressen te vertalen en de onderliggende netwerklagen analyseren. Tot dan!
