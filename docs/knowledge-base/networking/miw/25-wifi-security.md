# Wifi Security

## Welkom Terug

Hallo allemaal en welkom terug bij het videocollege Netwerken en Chain 1. In het vorige filmpje hebben we gesproken over draadloze netwerken. We hebben gezien wat voor een bandbreedte we nodig hebben om een draadloos netwerk op te bouwen en welke uitdagingen we tegenkomen om die draadloze verbinding goed te laten werken. Gelukkig is het afgelopen jaar gelukt om een aantal bruikbare technieken voor draadloze netwerken te ontwikkelen.

## Wifi en Beveiliging

Een van de meest populaire technieken is wifi en daar wil ik in dit filmpje iets uitgebreider op ingaan. We gaan eerst even kijken naar de eigenschappen van wifi. We zullen vooral aandacht geven aan een aantal beveiligingsaspecten van wifi-netwerken. We zullen kijken naar de encryptie van het wifi-verkeer en hoe die netwerken beveiligd kunnen worden. Ook zullen we kijken naar de verhouding tussen het gebruik van een beveiligd wifi-netwerk en het internet.

## Hoe Werkt Wifi?

Hoe werkt wifi eigenlijk? We zien hier een plaatje waarin we een aantal elementen herkennen die we in een draadloos netwerk altijd nodig hebben, zoals besproken in het vorige filmpje. We zien een aantal wireless hosts, dat kunnen tablets, laptops, telefoons en andere apparaten met een wifi-adapter zijn. Deze communiceren met een base station, dat bij wifi een access point heet. Het access point is tenslotte verbonden met de rest van het internet, meestal via een kabel, wat betekent dat jij via het access point toegang hebt tot de rest van het internet.

## Frequentiebereik en Kanalen

In de wifi-standaard zijn een aantal dingen gedefinieerd, zoals het beschikbare frequentiebereik dat verdeeld is in een aantal kanalen. Als je een access point hebt, kun je zelf instellen op welk van die kanalen binnen dat frequentiebereik het access point gaat uitzenden. Als je in een drukke omgeving woont, zoals een appartementje met veel buren, dan weet je ongeveer wat er gebeurt. Je buren kiezen een bepaald kanaal en jij probeert een kanaal te kiezen dat nog beschikbaar is en waar niet al je buren ook al op zitten, zodat jij een zo goed mogelijk bereik hebt.

## Associëren met een Access Point

Om uiteindelijk te verbinden met een access point, moet een host zich associëren met dat access point. Het eerste wat een host zal doen als je hem aanzet en hij wil verbinding maken met een wifi-netwerk, is luisteren naar al die verschillende kanalen. Op die kanalen is hij op zoek naar zogenaamde beacon frames, speciale berichten die worden uitgezonden door de access points. In die beacon frames staan het naam van een access point en het MAC-adres van het access point. Op die manier weet je host welke access points beschikbaar zijn om mee te verbinden. Hij kiest een access point, bijvoorbeeld een netwerk dat je al eerder gebruikt hebt of dat is opgeslagen.

## Authenticatie en IP-Adressen

Om te verbinden, moet je dan authenticeren. Soms moet je een gebruikersnaam en wachtwoord invoeren of alleen een wachtwoord om te verbinden met het access point. Vervolgens zal dat access point meestal DHCP gebruiken om ervoor te zorgen dat jij een IP-adres en andere bijbehorende gegevens krijgt om te kunnen internetten. Het sterke punt van wifi is natuurlijk dat het een draadloze verbinding is, dus alle wifi-signalen gaan gewoon door de lucht. Dat betekent dat het ook voor anderen heel makkelijk is om ze af te luisteren.

## Wifi-Adapters en Veiligheid

De meeste wifi-adapters zijn niet meteen geschikt om al het verkeer van iedereen in de buurt af te luisteren, want die zijn hardwarematig zo ingericht dat ze alleen de frames die voor zichzelf bedoeld zijn bewaren en doorgeven aan het operatiesysteem. De rest wordt gewoon doorgelaten.

## Speciale Wifi-Adapters

Je kunt ook speciale wifi-adapters kopen die juist bestemd zijn om het verkeer in de omgeving af te luisteren. Een voorbeeld hiervan is de Alfa AWUS036ACH USB wifi-adapter. Deze kun je voor iets minder dan 300 dollar online bestellen en geeft jou de mogelijkheid om al het wifi-verkeer in de omgeving af te luisteren en ook je eigen wifi-frames te manipuleren zoals jij wilt en op het netwerk te versturen.
## Combineren met Wireshark

Als je dit combineert met een tool zoals Wireshark, betekent dit dat eigenlijk al het internetverkeer dat door de lucht wordt verstuurd in jouw omgeving zichtbaar wordt, inclusief info over de protocollen die gebruikt worden, IP-adressen, MAC-adressen, eigenlijk alles.

## Gebruik Versleutelde Wifi-Verbinding

Om dit te voorkomen, is er eigenlijk een eenvoudige oplossing: gebruik in elk geval een versleutelde wifi-verbinding. Wat voor mogelijkheden hebben we dan als wij ons wifi-verkeer willen versleutelen? Nou, aan het begin, laten we beginnen in 1999 toen WEP kwam. Dat was een encryptiestandaard met eerst 64-bits, 128-bits en uiteindelijk tot 256-bits encryptie. Maar WEP had een aantal beveiligingsproblemen.

## Problemen met WEP

Een van de problemen was dat in het coderen steeds dezelfde initialisatiecodes werden gebruikt. Een hacker kon dat verkeer een tijdje afluisteren, zag steeds dezelfde codes voorbij komen en was daarmee, met een wiskundige formule, in staat om het geheime wifi-wachtwoord te ontsleutelen. Dit is iets wat jullie trouwens ook in het practicum zullen proberen. Sinds ongeveer 2004 is WEP eigenlijk helemaal gekraakt en kunnen we er niet meer vanuit gaan dat het ons nog enige beveiliging biedt.

## Opvolger WPA

Gelukkig is er een opvolger gekomen: WPA. Dat was een betere vorm van encryptie met een betere versleuteling, in eerste instantie TKIP, en later ook AES, wat eigenlijk een veel betere variant is. Maar omdat WPA vaak gebruikt werd op bestaande hardware met backwards compatibility, was het nog steeds kwetsbaar voor aanvallen.

## WPA2 en Beveiliging

Tegenwoordig maken we meestal gebruik van WPA2. Sinds 2006 beschikbaar, biedt WPA2 geavanceerde encryptie met AES. Hoewel er een paar kwetsbaarheden bekend zijn, mag je er nog steeds vanuit gaan dat WPA2 als veilig beschouwd kan worden. Er zijn wel een paar aandachtspunten, vooral als je gebruik maakt van WPS. Dit is een gebruiksvriendelijk systeem waarmee je al je wifi-apparaten kunt verbinden met je access point door gewoon op een knopje te drukken. De beste optie is om dit niet te gebruiken en zelfs helemaal uit te schakelen, want daar zou ergens nog misbruik van kunnen worden gemaakt. Maar verder is WPA2 nog steeds redelijk veilig.

## WPA2 Varianten

WPA2 komt in twee varianten: een variant voor persoonlijk gebruik, die je herkent omdat je moet inloggen op het wifi-access point met een wachtwoord, en er is ook een versie die geschikt is voor bedrijven en grote organisaties. Deze gebruikt een centrale authenticatieserver, bijvoorbeeld een RADIUS-server, waarmee sleutels worden uitgedeeld aan de gebruikers. In dat geval hoef je dus niet in te loggen, maar identificeer je jezelf met zo'n sleutelcertificaat.

## Onveiligheid van WEP

Zoals ik al zei, is de oude variant van wifi-encryptie, WEP, helemaal niet meer veilig. Als hacker hoef je maar een paar minuten verkeer af te luisteren en je haalt dat door een standaardprogramma dat je gewoon kunt downloaden van het internet. Dat programma ziet dan dat bepaalde cryptografische codes, de zogenaamde initialisatievectoren, steeds opnieuw gebruikt worden. Op basis daarvan laat je een stukje wiskunde los en kan die de encryptie dus heel makkelijk breken. Dan weet je dus jouw wifi-wachtwoord. Niet alleen kan de hacker dan gebruik maken van jouw wifi, maar met dat wifi-wachtwoord kan hij ook het wifi-verkeer dat hij opvangt ontsleutelen.
## Ontsleutelen met Wireshark

Ontsleutelen is iets wat je kunt bekijken in het filmpje dat gelinkt is. Dit kun je op je gemak proberen, en we zullen dit ook zelf doen in het practicum.

## WPA2 Veiligheid en Wachtwoorden

Bij WPA2 is het moeilijker om het wifi-netwerk te kraken en het wachtwoord te achterhalen, maar niet onmogelijk. Veel mensen kiezen eenvoudige wachtwoorden. Op het internet zijn lijsten van veelgebruikte wachtwoorden te vinden. Het meest populaire wachtwoord is "123456". Als je zo'n eenvoudig wachtwoord gebruikt, kan een hacker met een brute-force aanval alsnog je wifi-wachtwoord achterhalen.

## Brute-Force Aanval

Een hacker luistert het wifi-netwerk af totdat hij een aanmeldbericht onderschept. Dit bericht bevat een versleuteld wachtwoord. De hacker kan dan op zijn eigen computer berichten genereren met verschillende wachtwoorden uit de lijst. Als een bericht overeenkomt met het afgeluisterde bericht, heeft de hacker het wachtwoord gevonden en kan hij zich aanmelden op het wifi-netwerk.

## WPA3: De Toekomst

Gelukkig is er goed nieuws: er is een opvolger van WPA2, namelijk WPA3. Deze standaard is beschikbaar sinds 2018 en biedt betere beveiliging. Een van de voordelen is basisencryptie voor open wifi-hotspots, wat een grote vooruitgang is.
## Welkom bij het Videocollege

Hallo allemaal en welkom terug bij het videocollege met werk en chain 1. In het vorige filmpje hebben we gesproken over draadloze netwerken. We hebben gezien welke apparatuur we nodig hebben om een draadloos netwerk op te bouwen en welke uitdagingen we tegenkomen om die draadloze verbinding goed te laten werken. Gelukkig is het afgelopen jaar gelukt om een aantal bruikbare technieken voor draadloze netwerken te ontwikkelen. Een van de meest populaire daarvan is wifi en daar wil ik in dit filmpje iets uitgebreider op ingaan.

## Wifi en Beveiliging

We gaan eerst even kijken naar de eigenschappen van wifi. We zullen vooral ingaan op een aantal beveiligingsaspecten van wifi-netwerken. We zullen kijken naar de encryptie van wifi-verkeer, hoe deze wifi-netwerken versleuteld kunnen worden en de verhouding tussen het gebruik van een beveiligd wifi-netwerk en HTTPS.

## Hoe Werkt Wifi?

Wifi werkt met een access point dat verbonden is met de rest van het internet, meestal via een kabel. Dit access point zendt signalen uit binnen een bepaald frequentiebereik, dat verdeeld is in kanalen. In een drukke omgeving kun je een kanaal kiezen dat nog beschikbaar is om een goede verbinding te krijgen.

## Wifi Verkeer Afluisteren

Wifi-signalen gaan door de lucht, wat betekent dat ze makkelijk af te luisteren zijn. De meeste wifi-adapters zijn niet geschikt om al het verkeer in de buurt af te luisteren, maar er zijn speciale wifi-adapters die dit wel kunnen. Een voorbeeld hiervan is de AirPcap USB wifi-adapter, die je online kunt bestellen. Hiermee kun je al het wifi-verkeer in de omgeving afluisteren en aanpassen.

## Encryptie en Beveiliging

Om te voorkomen dat je wifi-verkeer wordt afgeluisterd, moet je een versleutelde wifi-verbinding gebruiken. De eerste encryptiestandaard, WEP, had veel beveiligingsproblemen en is sinds 2004 niet meer veilig. De opvolger, WPA, had ook kwetsbaarheden, maar WPA2, beschikbaar sinds 2006, biedt geavanceerde encryptie met AES en wordt nog steeds als veilig beschouwd. WPA3, beschikbaar sinds 2018, biedt nog betere beveiliging en encryptie, zelfs voor open wifi-netwerken.

## Aanvallen en WPA3

WPA2 kan nog steeds kwetsbaar zijn als gebruikers eenvoudige wachtwoorden kiezen. Hackers kunnen brute-force aanvallen gebruiken om wachtwoorden te achterhalen. WPA3 biedt verbeterde beveiliging, inclusief encryptie voor open wifi-hotspots en een eenvoudigere manier om Internet of Things (IoT) apparaten met wifi-netwerken te verbinden.

## Afluisteren met een Evil Twin

Een andere techniek die hackers gebruiken is het opzetten van een eigen wifi-access point, een zogenaamde "evil twin". Dit access point lijkt op een legitiem netwerk, waardoor apparaten automatisch verbinding maken. Hierdoor kunnen hackers al het verkeer afluisteren en manipuleren.

## Wifi Encryptie en HTTPS

Wifi-encryptie is belangrijk, maar het gebruik van HTTPS is ook essentieel. HTTPS beveiligt het verkeer tussen de gebruiker en de webserver, terwijl wifi-encryptie de verbinding tussen de gebruiker en het access point beveiligt. Beide methoden samen bieden optimale bescherming.

## Tot Slot

In een ideale wereld gebruiken we zowel wifi-encryptie als HTTPS om onze verbindingen optimaal te beschermen. In de volgende filmpjes zal ik meer vertellen over de beveiligingsaspecten van het internet. Graag tot dan!
