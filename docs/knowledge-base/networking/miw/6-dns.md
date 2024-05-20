# Het Domain Name System (DNS)

<p>Open de
    <a href="./assets/lessen/les-2a-dns-transport-layer-tcp.pdf#page=1&zoom=75" target=”_blank”>les 2b dns transport layer</a>
    in a new tab window fullscreen.
</p>

Het Domain Name System (DNS) is een essentieel protocol op het internet dat het mogelijk maakt om mensvriendelijke hostnamen te vertalen naar IP-adressen van apparaten zoals computers en servers. Dit voorkomt dat gebruikers IP-adressen moeten onthouden en kunnen ze in plaats daarvan gebruiksvriendelijke namen gebruiken, zoals www.nu.nl of facebook.com.

## Uitdagingen met IP-adressen

IP-adressen zijn effectief om apparaten op het internet te identificeren, maar ze zijn niet gemakkelijk te onthouden voor mensen. Dit kan problematisch zijn bij het proberen te bereiken van specifieke servers of websites, vooral als het gaat om complexe IP-adressen.

## Hostnamen en IP-adressen

Hostnamen zijn gebruikersvriendelijke namen die aan apparaten worden toegewezen, zoals servers of websites. Deze hostnamen zijn gemakkelijker te onthouden dan IP-adressen. Het DNS vertaalt deze hostnamen naar de bijbehorende IP-adressen, waardoor het mogelijk is om verbinding te maken met de gewenste apparaten op het internet.

## Het Belang van DNS

DNS is van cruciaal belang voor het functioneren van het internet omdat het fungeert als een gedistribueerde database waarin hostnamen worden gekoppeld aan IP-adressen. Dit maakt het mogelijk om snel en efficiënt verbinding te maken met verschillende apparaten en diensten op het internet.

## Gedistribueerde Aard van DNS

In tegenstelling tot een centrale DNS-server, wordt het DNS-systeem gedistribueerd over meerdere servers over de hele wereld. Dit vermindert de kwetsbaarheid voor storingen of aanvallen, aangezien er geen enkel punt van falen is. Het maakt ook een snelle en betrouwbare vertaling van hostnamen naar IP-adressen mogelijk, zelfs bij een groot aantal verzoeken.

## Diversiteit in DNS-servers

DNS-servers kunnen verschillende rollen vervullen, zoals autoritatieve DNS-servers, recursieve DNS-servers en caching-DNS-servers. Deze diversiteit zorgt voor efficiënte en betrouwbare dienstverlening aan gebruikers over de hele wereld.

## Functies van DNS-servers

DNS-servers hebben verschillende belangrijke functies naast het vertalen van hostnamen naar IP-adressen. Deze functies omvatten:

## Hostnaam Aliasing

DNS kan zorgen voor hostnaam aliasing, wat betekent dat één server meerdere alternatieve namen kan hebben. Dit stelt gebruikers in staat om toegang te krijgen tot dezelfde server via verschillende hostnamen.

## Mailserver Aliasing

DNS kan ook mailserver aliasing verzorgen, waardoor het systeem kan vertellen waar de mailserver voor een bepaald domein zich bevindt. Dit is handig bij het verzenden van e-mails tussen domeinen.

## Load Distribution

DNS kan load distribution uitvoeren door verkeer over meerdere servers te verspreiden. Dit helpt bij het verdelen van de belasting en zorgt voor een efficiënte dienstverlening, vooral bij druk verkeer.

## Hiërarchische Structuur van DNS-servers

DNS-servers zijn georganiseerd in een hiërarchische structuur, bestaande uit drie niveaus: de root DNS-servers, de top-level domain (TLD) servers en de authoritative DNS-servers.

## Root DNS-servers

De root DNS-servers vormen de ingang van het DNS-systeem en zijn verspreid over de hele wereld. Deze servers fungeren als de eerste stap bij het vertalen van hostnamen naar IP-adressen.

## Top-Level Domain (TLD) servers

De TLD-servers zijn verantwoordelijk voor het beheren van domeinen zoals .com, .org, .net, enzovoort. Ze vertegenwoordigen landcodes zoals .nl voor Nederland, .be voor België, enzovoort. Er komen steeds meer TLD's bij, zoals .museum en .info.

## Authoritative DNS-servers

De authoritative DNS-servers zijn servers van specifieke organisaties of bedrijven. Ze bevatten informatie over de hostnamen en IP-adressen binnen die organisatie of dat bedrijf. Bijvoorbeeld, als je het IP-adres van rooster.haag.nl wilt vinden, zal de authoritative DNS-server van Haag.nl deze informatie hebben.

## Werking van DNS-servers

DNS-servers werken samen om gebruikers te voorzien van de juiste IP-adressen voor opgevraagde hostnamen. Ze zijn gedistribueerd over de hele wereld om veerkracht en betrouwbaarheid te garanderen, zelfs bij grote hoeveelheden verkeer en potentieel kwaadaardige activiteiten.

## Hiërarchie van DNS-servers

In werkelijkheid zijn de punten op de kaart clusters van meerdere datacentra, verspreid over verschillende locaties. Deze clusters werken samen als één en dezelfde server. Deze 13 root DNS-servers bevinden zich op bekende locaties en zijn altijd bereikbaar voor DNS-verzoeken.

## Local DNS-server

De lokale DNS-server staat bij jouw internet service provider (ISP). Wanneer je een hostnaam wilt opzoeken, zoals rooster.haag.nl, zal je computer eerst contact maken met de DNS-server van je ISP om het IP-adres te vinden. Deze server kan ook contact maken met de root DNS-servers of de TLD-servers als het nodig is om informatie te vinden.

## Werking van DNS-servers

Wanneer je bijvoorbeeld rooster.haag.nl in je browser typt, stuurt je computer een DNS-verzoek naar de lokale DNS-server van je ISP. Als die server het IP-adres niet kent, zal het contact maken met de juiste TLD-server, bijvoorbeeld die van .nl. Vervolgens zal het contact maken met de authoritative DNS-server van haag.nl om het IP-adres te vinden. Dit proces zorgt ervoor dat je uiteindelijk de juiste website kunt bereiken.

## Samenwerking tussen DNS-servers

DNS-servers werken samen om gebruikers te voorzien van de juiste IP-adressen voor opgevraagde hostnamen. Deze samenwerking zorgt ervoor dat gebruikers snel en betrouwbaar toegang hebben tot websites en andere internetdiensten.

## Opzoeken van DNS-informatie

Wanneer je een website zoals rooster.mijnavia.nl in je browser typt, stuurt je lokale DNS-server een verzoek naar de DNS-server van je internet service provider (ISP). Als die server het IP-adres niet kent, zal het de vraag doorspelen naar de root DNS-servers, die vervolgens naar de TLD-servers verwijzen.

## Samenwerking tussen DNS-servers

De lokale DNS-server kan informatie voor een bepaalde tijd bewaren, meestal 1 of 2 dagen. Dit betekent dat als het al eerder informatie heeft opgevraagd voor een bepaald domein, het deze informatie al in zijn cache kan hebben. Als de informatie verouderd is, zal de DNS-server de vraag opnieuw doorsturen naar de hogere DNS-servers.

## Records in DNS

DNS-servers houden informatie bij in zogenaamde records. Er zijn verschillende soorten records die belangrijk zijn, waaronder:

1. **A-records (Address records)**: Deze records bevatten de IP-adressen die horen bij bepaalde hostnamen.

2. **CNAME-records (Canonical Name records)**: Deze records verwijzen naar een andere hostnaam. Bijvoorbeeld, als je "www" naar "example.com" wilt laten verwijzen, zou je een CNAME-record maken voor "www" die naar "example.com" wijst.

3. **MX-records (Mail Exchange records)**: Deze records geven aan waar de mailserver voor een bepaald domein zich bevindt.

4. **NS-records (Name Server records)**: Deze records bevatten de adressen van DNS-servers voor een bepaald domein.

## Doorverwijzen naar andere DNS-servers

Als een DNS-server geen direct antwoord heeft op een vraag, kan het worden doorverwezen naar andere DNS-servers die mogelijk meer informatie hebben. Dit proces gaat door totdat de juiste informatie is gevonden, waarna het antwoord terug wordt gestuurd naar de oorspronkelijke aanvrager.

## Records in DNS

Een DNS-server stuurt vaak R&S-records naar de aanvrager, met daarin de naam en het adres van de naamserver waarnaar de vraag opnieuw wordt gestuurd.

## MX-records voor Mail

In de MX-records worden de namen en adressen van mailservers opgeslagen. Deze records zijn essentieel voor het routeren van e-mails op het internet.

## Veiligheidsuitdagingen van DNS

DNS is kwetsbaar voor aanvallen, zoals DNS spoofing, waarbij een hacker valse informatie doorgeeft aan de aanvrager. Dit kan leiden tot het omleiden van gebruikers naar kwaadaardige websites.

## Oplossing: DNSSEC

DNSSEC, een beveiligingsprotocol op basis van certificaten, wordt gebruikt om de authenticiteit van DNS-antwoorden te controleren en DNS te beveiligen tegen spoofing-aanvallen.

## Beperkingen van DNSSEC

Hoewel DNSSEC een effectieve beveiligingsmaatregel is, wordt het nog niet breed ondersteund door alle websites en clients, waardoor sommige DNS-records nog steeds kwetsbaar zijn voor aanvallen.

## Aanbevolen filmpje voor verdere uitleg

Voor een uitgebreidere uitleg over DNS en DNSSEC wordt aangeraden om het volgende filmpje over het [Domain Name System van PeterExplainsTech](https://www.youtube.com/watch?v=GlZC4Jwf3xQ) te bekijken, waarin de concepten met animaties worden uitgelegd.

[DNS Explained in 100 seconds](https://www.youtube.com/watch?v=UVR9lhUGAyU)
