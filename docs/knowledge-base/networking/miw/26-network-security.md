# Network Security

## Inleiding

Hallo allemaal en welkom terug voor een belangrijk onderwerp. In de afgelopen filmpjes hebben we natuurlijk al verschillende technieken besproken die op het internet gebruikt worden en hebben daar steeds ook aandacht gegeven aan de beveiligingsaspecten die daarbij een rol spelen. Beveiliging is natuurlijk super belangrijk op het internet en vandaar dat we daar in deze les verder op in zullen gaan.

## Netwerk Security en Risico's

Eerst zullen we nog even nadenken over wat netwerk security dan eigenlijk precies is en met wat voor risico's wij bij ons netwerk te maken hebben. Vervolgens zullen we gaan kijken naar een aantal technieken die we kunnen inzetten om een aantal aspecten van onze netwerk security op orde te krijgen. We zullen daarbij gaan kijken naar cryptografie, digitale handtekeningen en message digests.

## Inleiding tot Authenticatie en TLS

In het volgende filmpje zullen we apart kijken naar authenticatie en tenslotte zullen we ook nog zien hoe een combinatie van al deze technieken in de werkelijkheid wordt ingezet in een van de belangrijkste protocollen die ons internet beveiligt, namelijk TLS, vroeger ook wel bekend als SSL.

## Het Belang van Beveiliging

Maar first things first: hoe zit het eigenlijk met die security? We weten het allemaal, alleen als we een herinnering nodig hebben, hoeven we maar even in het nieuws te kijken. Het internet zit helaas niet vol met alleen maar hele lieve en aardige mensen, maar daar zitten ook slechteriken en die slechteriken kunnen proberen ons netwerk binnen te dringen en daar kwaad aan te richten.

## Dreigingen van Hackers en Cybercriminelen

Vroeger waren dat misschien hackers die dat ook een beetje als hobby deden. Ze vonden het gewoon leuk om de techniek in te duiken en te kijken wat ze voor elkaar konden krijgen. Ja, dat was al vervelend genoeg. Maar tegenwoordig moeten we er rekening mee houden dat wij strijden tegen hele grote en professionele partijen. Partijen die ook heel veel geld hebben om gewoon aan de slag te gaan.

We moeten denken aan overheden van verschillende landen die proberen andere landen binnen te dringen. Maar we kunnen ook denken aan georganiseerde misdaad, want cybercriminaliteit heeft tegenwoordig al een businesscase. Een denial-of-service attack kun je gewoon een half uur huren op het internet en dat betekent gewoon dat er iemand geld aan verdient, net alsof je een auto gehuurd hebt of misschien iets anders.

Als je hebt op een malware, iets wat tegenwoordig ook een bekend probleem is, dan is de bedoeling dat het slachtoffer een aantal bitcoins betaalt om weer bij zijn bestanden te komen. Ook daar hoort natuurlijk gewoon geld bij. Die cybercriminelen worden professioneler en professioneler en zijn goed georganiseerd. Ze worden steeds gevaarlijker.

## Mogelijke Aanvallen en Hun Effecten

Wat kunnen we dan verwachten dat ze doen op ons netwerk? Dat zijn een aantal dingen. Ten eerste zouden ze ons berichten kunnen onderscheppen en ze zouden dus kunnen meeluisteren naar wat wij aan inhoud communiceren over het netwerk. Als ze toch toegang hebben tot onze verbinding, bijvoorbeeld bij een bepaalde kabel of een bepaalde router, dan zouden ze ook in staat kunnen zijn om eigen berichtjes op die verbinding te plaatsen en daarbij kunnen ze natuurlijk ook valse gegevens toevoegen. Als zij zelf een berichtje maken, dan kunnen ze bijvoorbeeld een vals IP-adres inzetten zodat het net lijkt alsof het van iemand anders afkomstig is.

Als we daar nog een klein stapje verder mee gaan, dan kunnen ze zelfs een hele verbinding overnemen, bijvoorbeeld in een zogenaamde man-in-the-middle aanval. Jij denkt dan dat je met iemand aan het communiceren bent, maar in werkelijkheid zit er een hacker midden tussen en die handelt de hele communicatie af. Jij hebt niks door.

Een heel andere aanval die ook tegenwoordig veel voorkomt is een zogenaamde denial-of-service attack. Daarbij wordt een bepaalde dienst uit de lucht gehaald of overspoeld met zoveel aanvragen dat gebruikers er niet meer bij kunnen. Ook dat is natuurlijk onwenselijk.

## Beveiligingsmaatregelen

Wat moeten wij doen om ons netwerk te beveiligen? Dat betekent dat we bij vier aspecten stil moeten staan. Het eerste is confidentialiteit oftewel vertrouwelijkheid. Met vertrouwelijkheid bedoelen we dat alleen de verzender en de ontvanger in staat moeten zijn de inhoud van het bericht te begrijpen. Mocht er iemand anders proberen mee te luisteren, dan kan hij het niet ontcijferen. Dan ziet hij misschien tekens voorbijkomen, maar weet in elk geval niet wat er precies gezegd wordt. Meestal doen we dat op het internet door een bericht te versleutelen met een sleutel. De verzender versleutelt het bericht en de ontvanger ontsleutelt het en maakt het weer leesbaar.

## Inleiding tot Encryptie

Leesbaarheid is essentieel. Een techniek die we kunnen inzetten om vertrouwelijkheid te bereiken is encryptie. We zouden ook handelingen kunnen verrichten zoals het fluisteren van een geheim in iemands oor, als we bij elkaar in de buurt zijn. Andere mensen die in de buurt zijn kunnen niet meeluisteren als ik dat maar zachtjes genoeg doe.

## Het Bereiken van Vertrouwelijkheid

We zien dat we een eigenschap willen bereiken, namelijk vertrouwelijkheid. Vervolgens kunnen we een techniek daarbij zoeken om dat te bereiken. Dan gaat het over de tweede eigenschap: authenticatie. Wat daar staat is dat we zeker willen weten met wie we aan het communiceren zijn. We willen de identiteit van de ander vast kunnen stellen.

## Authenticatie en Identiteitsvaststelling

Er zijn verschillende manieren voor authenticatie. In het echte leven doe je dat bijvoorbeeld met een paspoort, identiteitsbewijs of door je handtekening eronder te zetten. Ook op het internet zijn er manieren om de identiteit van iemand vast te stellen.

## Message Integrity

We willen zeker weten dat als wij een bericht versturen, dat het ook correct aankomt, precies zoals wij het bedoeld hebben. Er moeten geen stukjes veranderd, verdwenen of toegevoegd zijn. Het bericht moet precies kloppen. Als er toch iets mis mee is gegaan, willen we dat kunnen signaleren zodat we maatregelen kunnen nemen.

## Betrouwbare Dataoverdracht

Dit lijkt op wat we besproken hebben over betrouwbare dataoverdracht. De technieken hiervoor zijn ook vergelijkbaar. Bij TCP proberen we rekening te houden met pakketjes die per ongeluk verkeerd kunnen raken. Bij message integrity hebben we stevigere technieken nodig omdat we ons moeten verdedigen tegen personen die doelbewust proberen ons om de tuin te leiden.

## Beschikbaarheid van Diensten

Een ander belangrijk aspect is beschikbaarheid. Dit betekent dat als wij een dienst aanbieden online, we willen dat die dienst beschikbaar en toegankelijk is voor de juiste gebruikers. Dit zijn allemaal goede dingen, en je zou denken dat je ze allemaal zou willen.

## Afwegingen bij Netwerkbeveiliging

Vaak is dat ook zo, maar het hangt af van wat je precies probeert te doen. Er zijn voorbeelden waarin niet al deze aspecten belangrijk zijn. Stel dat je bijvoorbeeld terugdenkt aan de routers die we eerder hebben besproken, die met BGP met elkaar communiceren om informatie uit te wisselen. Als die informatie vertrouwelijk zou blijven, zou het internet niet kunnen werken. Vertrouwelijkheid is daar niet het belangrijkst. In principe is het publieke informatie welke routers welke bestemmingen kunnen bereiken. Maar message integrity is wel heel belangrijk.

## Belang van Message Integrity

De route-informatie moet kloppen, anders kan iemand misbruik maken door onjuiste routes te adverteren en al het verkeer om te leiden naar zijn eigen netwerk waar dit kan worden gemanipuleerd of afgeluisterd. Message integrity is in dat geval cruciaal.

## Symmetrische Encryptie

Wat zijn dan technieken die we kunnen inzetten om veilige communicatie te bereiken? Een techniek die we gezien hebben is symmetrische encryptie, ofwel symmetric key cryptografie. Dit betekent dat ik dezelfde sleutel gebruik om een bericht te versleutelen en te ontsleutelen.

## Voorbeeld van Symmetrische Encryptie

Stel, Alice stuurt een berichtje aan Bob. Ze heeft een bericht in gewone tekst (plain text) en gebruikt een geheime sleutel en een encryptie-algoritme om er een gecodeerde versie (cipher text) van te maken. Dit komt aan bij Bob, die dezelfde sleutel en het bijbehorende decryptie-algoritme gebruikt om de cipher text weer terug te zetten in plain text. Dit is een oplossing om vertrouwelijkheid te bereiken, zolang niemand anders de geheime sleutel weet.

## Vertrouwelijkheid en Encryptie

Als je niet weet wat de inhoud van het bericht is, kunnen Alice en Bob hun wachtwoord geheim houden en zo vertrouwelijkheid bereiken. Toch zit hier een natuurlijke achilleshiel in, want om dit te laten werken moeten Alice en Bob eerst een geheim wachtwoord afspreken. Als ze bij elkaar in de buurt wonen, kunnen ze dat misschien doen en elkaar het wachtwoord geven. Maar stel dat Alice en Bob geen mensen zijn, maar machines op het internet die over een grote afstand met elkaar communiceren. Hoe wisselen ze dan op een veilige manier een geheim wachtwoord uit?

## Uitdagingen van Symmetrische Encryptie

Als je het wachtwoord verstuurt over een onversleutelde verbinding en iemand luistert mee, heeft die persoon het wachtwoord ook. Dan kan die persoon daarna al jouw versleutelde communicatie ontcijferen. Dit is een lastig probleem bij symmetrische encryptie. Stel dat ik een wachtwoord gebruik en het geheim houd, ben ik dan veilig? Niet helemaal, want het hangt ook af van het encryptie-algoritme dat wordt gebruikt en of dat stevig genoeg is. Sommige encryptie-algoritmes zijn heel makkelijk te kraken.

## Veiligheid van Encryptie-algoritmes

Natuurlijk zijn de encryptie-algoritmes die we op het internet gebruiken wiskundig veel ingewikkelder en moeilijker te achterhalen. Maar er zijn nog steeds een aantal aanvallen mogelijk. Stel dat Trudy de aanvaller is en ze heeft alleen de cijfertekst tot haar beschikking. Dan kan ze toch proberen die versleutelde tekst leesbaar te maken. Ze kan bijvoorbeeld een brute-force aanval doen en alle mogelijke wachtwoorden een voor een proberen. Als jouw encryptie-algoritme goed genoeg is, zal ze daar millennia mee bezig zijn en is het zinloos. Maar ze kan ook proberen een statistische analyse te doen. Als ze bepaalde patronen heel vaak ziet terugkomen, kan dat haar helpen de encryptie te breken.

## Gevaren van Bekende Teksten

Het wordt nog makkelijker voor de aanvaller als ze in staat is om bij een bepaald gecodeerd tekst ook de plaintext te hebben. Als ze de combinatie heeft van plaintext en bijbehorende gecodeerde tekst, wordt het makkelijker om patronen te ontdekken. Helemaal makkelijk wordt het voor een aanvaller als ze zelf plaintext kan maken en die kan coderen. Dan kan ze allerlei mogelijke combinaties proberen in de hoop patronen te ontdekken. Ons encryptieschema moet stevig genoeg en wiskundig complex genoeg zijn om dit soort aanvallen te weerstaan.

## Populaire Encryptie-algoritmes

Hoe zit dat nu met een aantal populaire encryptie-algoritmes voor asymmetrische encryptie? Als eerste wil ik stilstaan bij de Data Encryption Standard (DES) die lange tijd veel werd gebruikt. Deze kwam oorspronkelijk uit de Verenigde Staten, bekend om hun strenge beveiliging. Buiten de VS kreeg je een zwakkere versie, die makkelijk te kraken was. De originele DES kan niet meer als veilig worden beschouwd, omdat moderne apparatuur een brute-force aanval kan uitvoeren en binnen een dag het wachtwoord kan achterhalen.

## Triple DES

Als tegenmaatregel werd DES een stuk veiliger gemaakt, wat we Triple DES noemen. Hierbij wordt DES drie keer achter elkaar gebruikt met drie verschillende sleutels, waardoor het een stuk complexer is. Toch wordt ook Triple DES niet meer als de veiligste optie beschouwd. Tegenwoordig kijken we naar AES (Advanced Encryption Standard), de opvolger van DES. AES heeft sleutels van 128, 192 of 256 bits. Hoe groter de sleutel, hoe moeilijker het wordt om een brute-force aanval uit te voeren. Waar we bij DES een sleutel snel konden achterhalen, zou dat bij AES miljarden triljoenen jaren duren. AES kan dus nog steeds als veilig worden beschouwd.

## Sleuteluitwisseling en Asymmetrische Encryptie

Symmetrische encryptie is een mooie techniek, maar er is een groot probleem: hoe delen we de sleutel op een veilige manier?
## Oplossing met Asymmetrische Encryptie

Een probleem is opgelost door een andere benadering van cryptografie, bedacht door Diffie en Hellman. In plaats van één sleutel te hebben, werken we hier met een sleutelpaar: een publieke sleutel (public key) en een private sleutel (private key). Deze twee worden tegelijkertijd aangemaakt. De publieke sleutel mag met iedereen gedeeld worden, maar de private sleutel moet zorgvuldig geheim gehouden worden.

## Werking van Asymmetrische Encryptie

Het bijzondere van asymmetrische encryptie is dat als een bericht versleuteld wordt met een van de twee sleutels uit het sleutelpaar, het alleen ontsleuteld kan worden met de andere sleutel uit hetzelfde sleutelpaar. We zien hier een bericht dat Alice naar Bob stuurt. Alice wil niet dat anderen kunnen meeluisteren, dus gebruikt ze de publieke sleutel van Bob.

## Publieke Sleutels en Certificaten

Bob kan zijn publieke sleutel met iedereen delen. In de praktijk wordt deze vaak in een certificaat geplaatst. Alice gebruikt de publieke sleutel van Bob om haar bericht te coderen. Dit gecodeerde bericht wordt naar Bob gestuurd en kan alleen ontsleuteld worden met de private sleutel van Bob. Als Bob de enige is die de private sleutel heeft, is hij de enige die het bericht leesbaar kan maken. Zo bereiken we vertrouwelijkheid zonder een geheim wachtwoord uit te wisselen.

## Encryptie-algoritmes

Ook voor asymmetrische encryptie gebruiken we een algoritme. Het algoritme dat hier normaal gesproken wordt gebruikt, is RSA (Rivest-Shamir-Adleman). RSA is een goede manier om berichten te versleutelen zonder de noodzaak om een geheim wachtwoord uit te wisselen. Het heeft echter ook nadelen.

## Nadelen van RSA

RSA is wiskundig gezien erg intensief. Dit betekent dat jouw computer veel moet werken om een bericht met RSA te coderen. Als je dit vergelijkt met DES, een oudere standaard voor symmetrische encryptie, dan is DES minstens 100 keer zo snel als RSA. Dit merk je natuurlijk wel.

## Combinatie van Encryptie-technieken

In de praktijk gebruiken we meestal een combinatie van asymmetrische en symmetrische encryptie. Bij het opzetten van een verbinding gebruiken we eerst asymmetrische encryptie met de publieke en private sleutels om veilig te communiceren. Deze veilige verbinding gebruiken we vervolgens om een wachtwoord met elkaar te delen. Zodra we dat wachtwoord hebben gedeeld, schakelen we over op symmetrische encryptie. Dit zorgt ervoor dat onze computer niet zo hard hoeft te werken, en we kunnen de rest van de verbinding veilig gebruiken met behulp van symmetrische encryptie en het gedeelde wachtwoord.

## Verdere Toepassingen van Public Key Cryptografie

Public key cryptografie biedt nog meer mogelijkheden. De combinatie van asymmetrische en symmetrische encryptie is een krachtige methode voor veilige communicatie. Hiermee hebben we de basisprincipes besproken, maar er zijn nog meer toepassingen en technieken die we kunnen gebruiken voor verdere beveiliging.

## Digitale Handtekeningen

We kunnen het proces ook omdraaien. Stel dat Bob een bericht naar Alice wil sturen. In dit geval versleutelt Bob het bericht met zijn eigen private key en stuurt het naar Alice. Denk even na: met welke sleutel kan dit bericht weer leesbaar worden gemaakt? Dat kan met de bijbehorende public key. Aangezien iedereen de public key kan hebben, biedt dit geen vertrouwelijkheid, want iedereen kan meeluisteren.

Wat we echter wel bereiken, is authenticiteit. Als het bericht ontsleuteld kan worden met de public key, weten we dat het moet zijn versleuteld met de private key van Bob. De enige persoon die deze sleutel heeft, is Bob zelf. Met andere woorden, als we het bericht kunnen ontsleutelen met de public key van Bob en het resultaat is geen wartaal, dan weten we zeker dat het bericht door Bob is geschreven. Dit is een soort digitale handtekening waarmee we kunnen verifiëren van wie het bericht afkomstig is.

## Combinatie van Vertrouwelijkheid en Authenticiteit

In de praktijk willen we vaak zowel een digitale handtekening als vertrouwelijkheid. We willen niet dat derden kunnen meeluisteren naar de communicatie. In protocollen zoals TLS wordt een combinatie van technieken gebruikt om beide doelen te bereiken.

## Message Integrity

We hebben gezien hoe cryptografie kan worden gebruikt voor vertrouwelijkheid en digitale handtekeningen. Wat we nog niet hebben besproken, is message integrity. Hoe kunnen we controleren of een bericht correct is aangekomen? Het idee is als volgt: we versturen een bericht en berekenen een controlegetal (hash) over dat bericht. We versturen het bericht samen met het controlegetal. De ontvanger ontvangt het bericht en berekent voor zichzelf het controlegetal opnieuw. Als het overeenkomt met het controlegetal dat is meegestuurd, dan is alles goed overgekomen. Als het controlegetal afwijkt, is er iets misgegaan met de inhoud van het bericht.

## Hash-Functies

Voor het berekenen van controlegetallen gebruiken we een hash-functie. Het doel is om een wiskundige functie te vinden die een kleine controlegetal (hash) kan berekenen over een bericht, maar op zo'n manier dat het heel moeilijk is om een ander bericht te vinden dat hetzelfde controlegetal oplevert. Als een hacker gemakkelijk een ander bericht kan vinden met hetzelfde controlegetal, kan hij jouw bericht vervangen door een ander bericht en het controlegetal zou nog steeds kloppen. Daarom moet een hash-functie complex genoeg zijn om dit te voorkomen.

## Voorbeeld van een Slechte Hash-Functie

Een slechte hash-functie kan gemakkelijk worden gemanipuleerd. Bijvoorbeeld, in sommige oudere internetprotocollen was het mogelijk om gemakkelijk een ander bericht te bedenken dat hetzelfde controlegetal opleverde. Dit is niet veilig en kan eenvoudig door hackers worden misbruikt.

Daarom zijn goede hash-functies essentieel voor message integrity, om ervoor te zorgen dat de integriteit van de berichten behouden blijft en dat het bijna onmogelijk is om een ander bericht te vinden dat hetzelfde controlegetal oplevert.

## Beveiliging van Berichtenverkeer

We willen ervoor zorgen dat we niet om de tuin worden geleid door aanvallers. Welke hash-functies kunnen we dan veilig gebruiken?

## MD5 Hash-Functie

Een populaire hash-functie is de MD5-hash. Deze berekent in een aantal stappen een controlegetal (message digest) over jouw bericht. Echter, MD5 wordt niet meer als veilig beschouwd, want er zijn collision attacks bekend. Dit betekent dat hackers in staat zijn geweest om verschillende berichten te vinden die dezelfde hashcode opleveren. Hierdoor kunnen ze berichten manipuleren zonder dat het opgemerkt wordt.

Een ander probleem met MD5 zijn de zogenaamde rainbow tables. Dit zijn tabellen waarin combinaties van wachtwoorden en hun vooraf berekende hashes staan. Als een hacker toegang heeft tot de hash van een wachtwoord, kan hij in de rainbow table opzoeken welk wachtwoord bij die hash hoort. Dit maakt MD5 ongeschikt voor veilige toepassingen.

## SHA-Familie van Hash-Functies

Een betere keuze is de SHA-familie van hash-functies. SHA-1 was de oudste versie met een 160-bits hash. Deze wordt echter niet meer als veilig beschouwd vanwege de relatief kleine hash-grootte en kwetsbaarheden.

De opvolger, SHA-2, omvat onder andere SHA-256 en SHA-512. Deze worden momenteel als veilig beschouwd voor het beveiligen van berichten. SHA-256 heeft een hash-grootte van 256 bits, terwijl SHA-512 een hash-grootte van 512 bits heeft, waardoor ze veel moeilijker te kraken zijn dan MD5 of SHA-1.

## Conclusie

We hebben een goede eerste indruk gekregen van een aantal technieken die we kunnen inzetten om ons berichtenverkeer op het internet te beveiligen. Meestal gebruiken we een combinatie van al deze technieken om ervoor te zorgen dat we goed beschermd zijn. In volgende video's zullen we dieper ingaan op authenticatie en hoe deze technieken in de praktijk worden toegepast, bijvoorbeeld in TLS (Transport Layer Security). Hopelijk zie ik jullie dan weer. Tot dan!
