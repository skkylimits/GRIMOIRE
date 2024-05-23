# SSL

## Inleiding tot TLS

Hallo allemaal! In de vorige filmpjes hebben we een aantal belangrijke technieken besproken die we kunnen gebruiken om ons netwerkverkeer te beveiligen met cryptografie, digitale handtekeningen, message digests, en tenslotte authenticatie. In dit filmpje gaan we kijken naar de praktijk. We zullen het hebben over een van de belangrijkste protocollen die we op het internet gebruiken om ons verkeer te beveiligen: TLS (Transport Layer Security), in oudere versies bekend als SSL (Secure Socket Layer). We zullen zien hoe dit protocol gebruikmaakt van een aantal van die technieken die we hebben besproken, maar we zullen ook zien dat het kwetsbaar kan zijn voor een aantal mogelijke aanvallen, zoals de zogenaamde downgrade-attacks.

## Wat is TLS/SSL?

Allereerst, wat is TLS/SSL? TLS is een protocol dat we gebruiken om ons internetverkeer te beveiligen en wordt gebruikt door eigenlijk alle moderne browsers en webservers. Op het ogenblik dat jij een "https" in de adresbalk van je browser ziet staan in plaats van "http", dan is dat een heel goed teken. Dat betekent niet zozeer dat jij een andere versie van HTTP gebruikt, maar dat jouw HTTP-berichten worden verstuurd via TLS en dus versleuteld over het internet gaan. TLS wordt onder andere gebruikt om transacties op webwinkels te beveiligen, zodat creditcardnummers en andere data veilig kunnen worden verstuurd, en om te authenticeren. Het biedt een aantal van de dingen waar we het over gehad hebben, namelijk confidentiality (vertrouwelijkheid), integrity (integriteit), en authenticatie.

## Positie van TLS in het OSI-model

Helaas past het TLS-protocol eigenlijk een beetje lastig in ons gelaagde model tot nu toe. Ja, het zit op de applicatielaag en op de transportlaag gebruiken we meestal TCP als we ervoor willen zorgen dat onze berichtjes correct overkomen. TLS/SSL is eigenlijk een latere toevoeging daarop, dus het zit niet altijd ingebakken in het operating system. Als wij het als applicatie willen gebruiken, dan zullen wij het toch zelf moeten inprogrammeren. Dat is op zich niet zo moeilijk als het lijkt, want in eigenlijk alle programmeertalen is er gewoon wel een bibliotheek standaard beschikbaar met functies die je daarvoor kunt gebruiken. Dus TLS komt eigenlijk een beetje in dit plaatje tussen de applicatielaag en de TCP-transportlaag in. Je moet het inbouwen in je applicatie. Dus in dat opzicht behoort het bijna tot de applicatielaag, maar conceptueel gezien is TLS eigenlijk meer een transportlaag-protocol, een veilige variant van beveiliging voordat het verder wordt verstuurd met TCP. Het valt een beetje daartussen.

## Het Handshake-proces

Hoe gaat het nu in zijn werk als wij onze verbinding met TLS/SSL willen beveiligen? Er zijn een aantal stappen nodig om zo'n veilige verbinding op te zetten. De eerste stap is een zogenaamde handshake, bijvoorbeeld tussen een webbrowser en een webserver. Je kunt dan certificaten uitwisselen waarin de public keys staan. Met public/private key cryptografie kun je veilig een verbinding opzetten. Zodra die eenmaal beschikbaar is, kunnen we die gebruiken om een aantal sleutels met elkaar te delen.

## Symmetrische Encryptie

De volgende stap is de key exchange. We hebben ten minste een geheime sleutel nodig om die vervolgens te kunnen gaan gebruiken voor symmetrische cryptografie. Maar in werkelijkheid zal TLS op dit moment een hele verzameling van sleutels vaststellen die het gaat gebruiken voor verschillende encryptietechnieken. Zodra de sleutels eenmaal bekend zijn, kunnen we verder gebruikmaken van symmetrische cryptografie en kan de data op een veilige manier worden verstuurd.

## Verbinding Sluiten

De laatste stap is ook niet onbelangrijk. Zodra we klaar zijn met het versturen van de data, moet de verbinding ook expliciet worden gesloten. Stel dat je die open zou laten staan, dan zou een aanvaller op dat moment toch misbruik kunnen maken door te proberen nog extra informatie jouw kant op te sturen. Het is dus belangrijk om de verbinding veilig af te sluiten.

## Inleiding tot TLS/SSL en Encryptie Algoritmes

In dit filmpje zullen we verder ingaan op het gebruik van TLS/SSL en de verschillende encryptie-algoritmes die hierbij betrokken zijn. Zoals we eerder hebben besproken, maakt TLS/SSL gebruik van verschillende encryptie-algoritmes en niet slechts één. We hebben meerdere sleutels nodig voor symmetrische encryptie die we kunnen gebruiken zodra we eenmaal een veilig wachtwoord hebben gedeeld. Daarnaast hebben we ook een algoritme nodig voor het bepalen van onze message digests.

## Handshake en Keuze van Encryptie Algoritmes

Tijdens de handshake-fase geeft elk van de twee partijen aan welke encryptie-algoritmes ze ondersteunen, en vervolgens kiezen ze het veiligste algoritme dat beide partijen ondersteunen. Dit betekent dat als jij een heel veilig encryptie-algoritme kent, maar de andere partij dat niet ondersteunt, je mogelijk moet settelen voor een minder veilig algoritme. Wat we vaak tegenkomen zijn TLS_RSA en AES, omdat deze als zeer veilig worden beschouwd voor symmetrische encryptie.

## Kwetsbaarheden en Downgrade-attacks

Het gebruik van verschillende encryptie-algoritmes betekent ook dat TLS kwetsbaar kan zijn voor aanvallen, zoals downgrade-attacks. Hierbij probeert een hacker kwetsbaarheden in het protocol te vinden waardoor de client en server gedwongen worden een zwakker algoritme te gebruiken. Als de hacker hierin slaagt, kan hij mogelijk het zwakke algoritme kraken en daarmee de geheime communicatie onderscheppen.

## Voorbeeld van een Downgrade-attack

Laten we een voorbeeld bekijken van een downgrade-attack. Stel, er is een verbinding tussen een SSL-client en -server. De eerste stap is de handshake. De client stuurt een bericht naar de server met de mededeling dat hij sterke encryptie-algoritmes, zoals TLS_RSA en AES, wil gebruiken. Echter, deze handshake komt niet aan bij de server omdat een hacker, die zich in een man-in-the-middle-positie bevindt, het bericht onderschept en aanpast. In plaats van het verzoek voor sterke encryptie-algoritmes, stuurt de hacker een bericht naar de server waarin een zwakker algoritme, zoals export-grade DES 40, wordt aangevraagd.

Als de server akkoord gaat met het zwakkere algoritme, stuurt hij een bericht terug dat dit bevestigt. De hacker onderschept dit bericht opnieuw en past het aan zodat het lijkt alsof de server het sterke algoritme heeft geaccepteerd. De client denkt nu dat er sterke encryptie wordt gebruikt, terwijl de server in werkelijkheid een zwakker algoritme gebruikt. Hierdoor kan de hacker het zwakke algoritme kraken en de communicatie afluisteren.

## Belang van Up-to-date TLS Versies

Zelfs als je denkt verstandig te zijn en gebruikmaakt van een met TLS beveiligde verbinding, moet je er altijd voor zorgen dat je de juiste, meest actuele versie van TLS gebruikt. Oudere versies kunnen kwetsbaarheden bevatten die misbruikt kunnen worden voor een downgrade-attack. Het is dus cruciaal om altijd de nieuwste versies en updates te gebruiken om je netwerkverkeer te beveiligen.

## Conclusie

In dit filmpje hebben we gezien hoe TLS/SSL werkt en welke stappen nodig zijn om een veilige verbinding op te zetten. We hebben ook de mogelijke kwetsbaarheden besproken, zoals downgrade-attacks, en het belang van up-to-date blijven met de nieuwste versies van TLS. In het volgende filmpje zullen we ingaan op netwerkforensics en hoe je kunt achterhalen of iemand je netwerk is binnengedrongen en daar bewijs voor kunt verzamelen. Tot dan!
