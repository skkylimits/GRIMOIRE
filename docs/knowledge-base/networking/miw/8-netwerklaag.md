# Netwerklaag

<p>
    Open de
    <a href="./assets/lessen/les-2b-netwerklaag.pdf#page=1&zoom=75" target=”_blank”>les 2b netwerklaag</a>
    in a new tab window fullscreen.
</p>

## Intro

Beste studenten, hallo en welkom terug bij het volgende college infrastructuur. Vandaag gaan we het hebben over de netwerklaag. We zullen de netwerklaag onder de loep nemen en een aantal filmpjes bekijken. In deze filmpjes zullen we allereerst kijken naar wat de netwerklaag is en wat deze precies voor ons doet. Ook zullen we de belangrijkste taken van de netwerklaag ontdekken.

## Diensten van de Netwerklaag

Om gebruik te kunnen maken van de diensten van de netwerklaag, hebben we een IP-adres nodig. Een IP-adres is het adres op de netwerklaag van een bepaalde computer, vergelijkbaar met een huisnummer op de transportlaag van de applicatie. Het is dus essentieel om een IP-adres te hebben om te kunnen internetten.

## Rol van de Netwerklaag

De netwerklaag ontvangt een segment van de transportlaag en zorgt ervoor dat dit segment bij de juiste host wordt afgeleverd. Dit betekent dat de netwerklaag een cruciale rol speelt in het routeren van pakketjes over het internet, zowel binnen als buiten een netwerk.

## Werking van de Netwerklaag

De netwerklaag routeert pakketjes over het internet door te kijken naar het IP-adres en deze naar de juiste bestemming te sturen. Dit gebeurt met behulp van routers, die de pakketjes in de juiste richting sturen op basis van het IP-adres.

## Dienstverlening van de Netwerklaag

De netwerklaag biedt een host-to-host communicatieservice, wat betekent dat het zorgt voor communicatie tussen hosts op verschillende locaties. Dit is vergelijkbaar met hoe de transportlaag communicatie tussen applicaties mogelijk maakt, maar dan op een hoger niveau.

## Basisdienstverlening: Best Effort-service

Op internet biedt de netwerklaag een eenvoudige dienstverlening, de zogenaamde Best Effort-service. Deze service zorgt ervoor dat pakketjes zo goed, snel en correct mogelijk worden bezorgd. Echter, er is geen garantie dat alles altijd vlekkeloos verloopt.

## Gebruik van TCP voor betrouwbaarheid

Als betrouwbaarheid cruciaal is, kun je bovenop de netwerklaag het transportprotocol TCP gebruiken. TCP zal ervoor zorgen dat, als er iets misgaat of een pakketje verloren raakt, het opnieuw wordt verstuurd totdat het correct aankomt.

## Beperkingen van de Netwerklaag

Hoewel de netwerklaag pakketjes goed en snel probeert te bezorgen, biedt het geen garanties. Als er iets misgaat of een pakketje zoekraakt, zal de netwerklaag geen moeite doen om dit op te lossen. Voor extra betrouwbaarheid kan bovenop de netwerklaag het transportprotocol TCP worden gebruikt.

## Noodzaak van een IP-adres (IPv4)

Om gebruik te maken van de diensten van de netwerklaag, heb je een IP-adres nodig. Dit adres dient als een unieke identificatie van jouw computer op het netwerk en wordt gebruikt door routers om te bepalen waar berichten naartoe moeten worden gestuurd.

## Wat is een IP-adres?

Het IP-adres (Internet Protocol-adres) is lang geworden als het netwerklaagadres van jouw computer. Dit adres wordt gebruikt door routers om te bepalen waar berichtjes naartoe moeten.

## Hoe komen we aan een IP-adres?

Contact op te nemen met de organisatie die ip adressen in jouw land beheerd en vervolgens echt naar configuratiescherm van jouw machine te gaan. Dan zoek je je netwerk instellingen op ja dan kun je gewoon IP-adres intypen en dat werkt maar je kunt je afvragen of dat heel handig is want het is best ook nog doen. Er staat dat je elke keer als je bijvoorbeeld aan h via gaat je laptop moet opstarten de netwerk instelling in moet gaan en hva heeft adresses die beginnen met 145. daarna even checken met je medestudent of die die niet al heeft of kijken of iemand anders het niet gebruikt heeft want ja je kan het maar 1x gebruiken.

Als je naar huis gaat, moet je het allemaal helemaal  opnieuw om een ip adres in te voeren wat past bij jouw thuisnetwerk dus ideale oplossing is dat niet

## Handmatige IP-configuratie: Niet Altijd Handig

Hoewel het mogelijk is om handmatig een IP-adres in te stellen op jouw computer, kan dit onpraktisch zijn. Het vereist bijvoorbeeld dat je elke keer dat je van netwerk wisselt, jouw instellingen moet aanpassen. Dit kan tijdrovend en onhandig zijn, vooral voor normale gebruikers.

## Automatisering van IP-toewijzing met DHCP

Een oplossing voor dit probleem is het gebruik van het Dynamic Host Configuration Protocol (DHCP). DHCP is een protocol dat het proces van IP-toewijzing kan automatiseren. Het zorgt ervoor dat jouw computer automatisch een IP-adres krijgt toegewezen bij het opstarten, en wanneer dit adres niet meer nodig is, kan het worden vrijgegeven en opnieuw worden gebruikt.

## Werking van DHCP

DHCP werkt met behulp van een client-servermodel. Jouw computer, of een ander apparaat dat verbinding maakt met het netwerk, fungeert als de client. Ergens in het netwerk bevindt zich een DHCP-server, die verantwoordelijk is voor het toewijzen van IP-adressen aan de clients.

## Stappen van DHCP

Het DHCP-proces omvat vier hoofdstappen: Discover, Offer, Request en Acknowledge (DORA).

1. Discover: De client stuurt een Discover-bericht om contact te maken met een DHCP-server.
2. Offer: De server reageert met een Offer-bericht, waarin het een IP-adres aanbiedt aan de client.
3. Request: De client stuurt een Request-bericht om het aangeboden IP-adres te accepteren.
4. Acknowledge: De server bevestigt de toewijzing van het IP-adres aan de client met een Acknowledge-bericht.

## Voordelen van DHCP

DHCP maakt het beheren van IP-adressen in een netwerk veel eenvoudiger. Het zorgt ervoor dat apparaten automatisch en efficiënt worden geconfigureerd, wat vooral handig is in grote organisaties. DHCP zorgt voor een flexibele en dynamische toewijzing van IP-adressen, waardoor het netwerk effectiever kan worden beheerd.

## Ontdekking van de DHCP-server

In dit geval kunnen we in iets meer detail zien hoe het proces eruitziet wanneer een client op zoek is naar een DHCP-server. We zien hier een laptop, die fungeert als client, die een app opstart in het netwerk. In dat netwerk is een DHCP-server beschikbaar.

## De Discover-fase

De eerste stap die de client neemt, is het verzenden van een Discover-bericht. Dit bericht is bedoeld voor de DHCP-server, maar aangezien de client nog geen informatie heeft over waar de DHCP-server zich bevindt, worden bijzondere IP-adressen gebruikt.

## Bijzondere IP-adressen in het Discover-bericht

In het Discover-bericht heeft het bronadres het IP-adres 0.0.0.0 en het doeladres is 255.255.255.255. Dit zijn bijzondere adressen die worden gebruikt om berichten over het netwerk te broadcasten.

## De Response van de DHCP-server

De DHCP-server reageert op het Discover-bericht door een Offer-bericht te sturen met een IP-adres dat beschikbaar is voor de client. Dit IP-adres heeft een lease-time, wat aangeeft hoe lang de client het adres kan gebruiken.

## Acceptatie van het aangeboden IP-adres

Als de client besluit het aangeboden IP-adres te accepteren, stuurt hij een Request-bericht naar de DHCP-server. Dit bericht bevestigt dat de client het aangeboden IP-adres wil gebruiken.

## Bevestiging van de DHCP-server

De DHCP-server bevestigt de toewijzing van het IP-adres aan de client door een Acknowledge-bericht te sturen. Dit bericht bevat het definitieve IP-adres dat de client kan gebruiken voor een bepaalde lease-time.

## Verlenging van het lease-time

Na afloop van de lease-time kan de client nog steeds gebruikmaken van het IP-adres door opnieuw contact op te nemen met de DHCP-server. Dit proces kan zich herhalen, waardoor de client continu gebruik kan blijven maken van het toegewezen IP-adres.

## Automatisering van IP-adres toewijzing

Wanneer je je computer afsluit, heb je geen IP-adres meer nodig. Op dat moment zal de DHCP-server het IP-adres vrijgeven, zodat iemand anders het kan gebruiken. Dit maakt DHCP een nuttig en essentieel protocol om eenvoudig te kunnen internetten zonder telkens ingewikkelde configuraties te hoeven doorlopen.

## Informatie verstrekt door DHCP

Naast het IP-adres geeft DHCP ook het subnetmasker, dat de sifon gateway wordt genoemd. Dit is het IP-adres van de router die jouw machine verbindt met het internet. Verder krijg je de DNS-servers, die cruciaal zijn voor het opzoeken van adressen op het internet. Tot slot ontvang je het network mask, wat aangeeft hoe groot jouw lokale netwerk is.

## Het instellen van jouw router

Om jouw computer op het netwerk aan te sluiten, moet je weten waar jouw eigen router zich bevindt. Dit kan het IP-adres van je router zijn, dat je kunt vinden in de instellingen.

## Rol van DNS-servers

DNS-servers helpen bij het vertalen van domeinnamen naar IP-adressen, waardoor je gemakkelijk websites kunt bezoeken. Je lokale DNS-server legt contact met andere servers om de vertalingen te maken.

## Betekenis van het Network Mask

Het network mask geeft aan hoeveel IP-adressen beschikbaar zijn op hetzelfde netwerk waarop jij bent aangesloten. Dit is essentiële informatie voor het correct instellen van jouw netwerkapparaten.

## Verwijzing naar verdere informatie

Voor meer informatie en een diepere duik in de netwerklaag, kun je kijken naar het filmpje van [DHCP PieterExplainsTech](https://www.youtube.com/watch?v=RUZohsAxPxQ), waarvan je de link ook in de demo kunt vinden. Dit zal je helpen beter te begrijpen hoe routers ervoor zorgen dat onze pakketjes de juiste bestemming bereiken.
