# Routing & Forwarding

Welkom terug allemaal! In het vorige filmpje hebben we een introductie gehad op de netwerklaag en we hebben gezien dat de netwerklaag er verantwoordelijk voor is om pakketjes van een bepaalde host af te leveren bij een andere host ergens in het netwerk.

Omdat dit kan doen, moet de netwerklaag dus voor zorgen dat die pakketjes worden doorgestuurd van de ene router naar de andere router, en de volgende router, tot ze uiteindelijk de juiste bestemming bereiken. Om dat te kunnen doen, moet de netwerklaag twee belangrijke functies vervullen. Zoals beloofd, ga ik in dit filmpje daar verder op in. We gaan kijken naar routing en forwarding, ik leg uit wat die twee dingen zijn en hoe ze met elkaar samenwerken.

## Routing en Forwarding

We zullen vervolgens uitleggen hoe eigenlijk ook binnen de router die routing en forwarding plaatsvinden en hoe die pakketjes daadwerkelijk doorgestuurd worden. Als afsluiting vertel ik iets over software-defined networking. Dit is een moderne trend en een moderne manier om te kijken naar routing en forwarding.

Allereerst, wat zijn routing en forwarding eigenlijk? Stel, we kijken maar naar het internet en dit zijn lang niet alle netwerken op het internet. Dit is slechts een fractie ervan. Maar dan kunnen we ons al wel voorstellen dat het internet eigenlijk een jungle of een doolhof is van nauw met elkaar verbonden apparaten. Er zijn heel veel verschillende verbindingen en er zijn apparaten die met elkaar verbonden zijn. Het is een vrij complex gebied.

## Routing

Op een of andere manier moet de netwerklaag door die jungle een route gaan vinden of, beter gezegd, misschien zelfs meerdere routes vinden. Die routes moeten de beste routes zijn om die data van A naar B te kunnen afleveren. Om dat te kunnen doen, doet de netwerklaag aan routing.

Routing houdt in dat de netwerklaag bezig is om goede routes naar bepaalde bestemmingen in kaart te brengen. Dit betekent dat routers voortdurend met elkaar in gesprek zijn. Wij zien dat als gebruikers van het internet niet, maar op de achtergrond is er eigenlijk altijd een soort gesprek gaande. Die routers communiceren met elkaar en delen routes naar bestemmingen die zij weten te bereiken.

## Informatie Delen

Een router kan bijvoorbeeld een route naar een laptop kennen en deelt die route weer met een andere router. Zo zijn routers voortdurend informatie met elkaar aan het delen: "Hé, ik weet een route naar die bestemming" of "Ik weet nog een kortere route". Op die manier brengen zij steeds de beste routes in kaart.

Als dat goed is, kunnen de pakketjes worden doorgestuurd en dat heet forwarding.

## Forwarding

Bij forwarding gaat het erom dat, eigenlijk op de verbinding van die router naar de router, dat pakketje wordt bestudeerd. Aan de hand van de routertabel wordt besloten welke kant het pakketje wordt doorgestuurd. Dat pakketje wordt dan daadwerkelijk doorgestuurd.

Routing en forwarding hebben met elkaar te maken, want het een heeft eigenlijk geen zin zonder het ander. Je kunt pakketjes pas doorsturen naar de juiste verbinding als je van tevoren een kaart hebt gebracht wat dan de goede route is hoe die pakketjes er eigenlijk op hun bestemming aankunnen komen.

## Reizen naar Groningen

Je moet bijvoorbeeld eerst op tram 2 stappen naar het centraal station. Daar stap je in de intercity. De intercity brengt jou naar Zwolle. In Zwolle moet je overstappen op een andere trein. Die trein brengt jou verder naar Groningen. In Groningen stap je uit, loopt het station uit en stapt in de stadsbus die daar op je wacht.

## Routing en Reisplanners

Op het moment dat je de reis plant, ben je bezig met routing. Je kijkt welke routes er zijn en wat de kortste route is. Misschien vind je het fijn om zonder overstappen in één trein te blijven zitten. Je zoekt de route die voor jou het prettigst is.

## De Grote Reisdag

Op de grote dag ga je op reis naar Groningen. Je stapt in de tram, de tram brengt je naar het stationsplein in Amsterdam. Je stapt uit, loopt het station in en stapt in de intercity. De intercity brengt je naar Zwolle. Daar stap je over op de andere trein. Die trein brengt je naar Groningen. In Groningen stap je uit, loopt het station uit en stapt in de stadsbus. Op deze manier zie je hoe routing en forwarding met elkaar verbonden zijn.

## Routing en Routers

Routers zijn voortdurend bezig om de juiste routes te bepalen. Ze gebruiken daarvoor speciale protocollen, de routing protocollen. We behandelen deze protocollen niet uitgebreid in dit vak, maar denk aan protocollen zoals OSPF, RIP of BGP. Als de routing protocollen ervoor gezorgd hebben dat de routers op de hoogte zijn van de juiste routes, zorgen de routers ervoor dat een pakketje dat binnenkomt ook naar een van de andere aansluitingen van de router wordt doorgestuurd.

## Pakketjes en Routers

In de praktijk zien we vaak netwerken met meerdere routers die met elkaar verbonden zijn. Over het algemeen zul je zien dat een router meerdere interfaces heeft waar kabels aan verbonden zijn. Een router met slechts één interface kan niet veel doen, want die heeft maar één bestemming. Bij deze router komt er een pakketje binnen. Dit pakketje wordt door de netwerklaag verwerkt. Het bevat een IP-adres waar het naartoe moet en een adres waar het vandaan komt. Op dit moment zijn we geïnteresseerd in waar het naartoe moet.

## Pakketjes doorsturen

De router in zijn geheugen en tabel kijkt heel netjes naar het IP-adres van het pakketje. Het zoekt op in zijn tabel welke verbinding het pakketje moet worden doorgestuurd. In dit geval is dat verbinding 2, dus stuurt hij het pakketje door over die verbinding naar de volgende router. Hetzelfde gebeurt in de volgende router: het ontvangt het pakketje, kijkt naar het IP-adres en stuurt het weer door naar de juiste verbinding. Dit proces herhaalt zich totdat het pakketje bij de eindbestemming is aangekomen.

## Routing in grote netwerken

In grote professionele routers, zoals die in datacentra van internet service providers, kunnen tientallen verschillende aansluitingen zitten. Deze routers ontvangen voortdurend informatie over bestemmingen en routes van andere routers. Deze informatie wordt gebruikt om pakketjes efficiënt door te sturen. Er zijn ongeveer 4 miljard verschillende IP-adressen, dus routers moeten snel en efficiënt informatie kunnen verwerken.

## Efficiënt geheugenbeheer

Met zoveel IP-adressen is het inefficiënt om elk adres apart te onthouden. Daarom gebruiken routers slimme algoritmes en protocollen. Bijvoorbeeld, IP-adressen die bijna hetzelfde zijn, beginnen vaak met dezelfde cijfers. Routers kunnen groepen van IP-adressen samen behandelen, waardoor ze minder geheugenruimte en rekenkracht gebruiken. Dit helpt routers om snel te werken, zelfs met een groot aantal adressen.

## Adressering met ranges

In plaats van elk IP-adres apart te verwerken, kunnen routers ook werken met adresreeksen. Bijvoorbeeld, alles wat begint met 145.0.0.0 tot aan 145.255.255.255 kan worden behandeld als één groep. Dit bespaart veel tijd en rekenkracht, omdat routers niet elk individueel adres hoeven te onthouden of te verwerken. Ze kunnen simpelweg alle adressen in een bepaalde range doorsturen via dezelfde verbinding.

## Werking binnen routers

Binnen routers moeten deze twee belangrijke functies - routing en forwarding - naast elkaar plaatsvinden. Het routermanagementplatform zorgt ervoor dat de router de juiste routingprotocollen gebruikt om de beste routes te vinden. Tegelijkertijd zorgt het ervoor dat de router efficiënt omgaat met het doorsturen van pakketjes, door slim gebruik te maken van geheugen en adressering.

## Communicatie tussen auto's

Auto's communiceren met elkaar om informatie over routes te delen. Dit gebeurt meestal binnen een router in software. Hoewel dit belangrijk is, is het niet altijd tijdgevoelig, omdat routes niet constant veranderen. Dus routers kunnen de tijd nemen om deze informatie te verwerken.

## High-Speed Switching

Een router heeft meerdere poorten, die bij professionele routers tientallen kunnen zijn. Deze poorten kunnen razendsnel gegevens verwerken en moeten pakketjes snel naar de juiste uitgaande verbinding sturen. Dit wordt mogelijk gemaakt door high-speed switching, waarbij pakketjes snel en efficiënt worden doorgestuurd van de ene poort naar de andere.

## Werking van inputpoorten

Binnen een router komen fysieke signalen binnen via bijvoorbeeld ethernet- of glasvezelkabels. Deze signalen worden omgezet in digitale signalen en verwerkt door de linklaag. Een inputpoort bevat een wachtrij waarin binnenkomende datagrammen worden geplaatst. Als het druk is, moeten pakketjes even wachten in de wachtrij voordat ze worden doorgestuurd.

## Beheer van de wachtrij

Als de wachtrij vol raakt, moet de router beslissen wat te doen. Als er geen plek meer is, kan de router ervoor kiezen om pakketjes te laten vallen, wat betekent dat ze niet worden doorgestuurd. Dit kan gebeuren als de router overbelast is. In dat geval moeten pakketjes wachten tot er ruimte vrijkomt in de wachtrij.

## Slimme besluitvorming

Om efficiënt om te gaan met de wachtrij, kan de router slimme beslissingen nemen. Bijvoorbeeld, de router kan alvast kijken naar de bestemming van een pakketje en een pad bepalen voordat het daadwerkelijk wordt doorgestuurd. Dit bespaart tijd en zorgt ervoor dat pakketjes sneller worden verwerkt. Zo wordt de router minder belast en kunnen pakketjes efficiënt worden doorgestuurd naar hun bestemming.

## Outputpoorten en switching

Aan de andere kant van de router bevinden zich de outputpoorten, waar pakketjes worden doorgestuurd naar hun volgende bestemming. Dit gebeurt op een vergelijkbare manier als bij de inputpoorten, maar dan in omgekeerde volgorde. Een router heeft aparte input- en outputpoorten, hoewel in de autosport dit soort zaken zelfs naar hetzelfde aansluitpunt kan gaan via bijvoorbeeld een ethernet-kabel.

## Wachtrijen en vertragingen

Wanneer pakketjes door de outputpoorten moeten worden doorgestuurd, kunnen ze in een wachtrij terechtkomen. Dit kan gebeuren als de verbinding bezet is of als er veel data binnenkomt die dezelfde kant op moet. In dat geval moeten pakketjes wachten op hun beurt voordat ze worden doorgestuurd.

## Het doorsturen van pakketjes

Pakketjes worden vervolgens ingepakt onder een frame en fysiek doorgestuurd via een verbinding, zoals we eerder hebben gezien. Dit is de traditionele manier waarop routers werken en hoe het internet op dit moment nog functioneert.

## Opkomst van software defined networking

Een nieuwe benadering genaamd Software Defined Networking (SDN) wint aan populariteit. Dit is een meer centrale manier van netwerkbeheer, waarbij alle routers onder een centrale aansturing werken. Deze aanpak biedt verschillende voordelen ten opzichte van de traditionele decentrale aanpak.

## Voordelen van SDN

Met SDN kan het netwerk dynamisch worden aangepast aan de behoeften. Bijvoorbeeld, als er een belangrijke vergadering plaatsvindt, kan het netwerk automatisch bandbreedte reserveren voor de videoconferentie, zelfs als andere verkeer wordt vertraagd. Dit zorgt voor een efficiënter gebruik van netwerkresources.

## Toepassingen van SDN

Organisaties zoals de NAVO onderzoeken het gebruik van SDN om pakketjes over verschillende routes te sturen, afhankelijk van de vertrouwelijkheid van de informatie. Als een bericht bijvoorbeeld zeer vertrouwelijk is, kan het worden doorgestuurd via een route met minder risico op afluisteren. Dit maakt het netwerk flexibeler en veiliger.
## Flexibiliteit en veiligheid

Met SDN kunnen gevoelige pakketjes mogelijk liever via een omweg worden gestuurd, maar wel op een veilige route. Als het pakketje geen belangrijke informatie bevat, maakt het minder uit hoe het wordt gerouteerd. Dit soort aanpassingen kunnen gemakkelijker worden gemaakt met een centrale aansturing van het netwerk.

## Centrale controle

Met Software Defined Networking worden de routers niet langer autonoom beheerd, maar worden ze centraal aangestuurd. Een centrale controller bepaalt welke pakketjes worden doorgestuurd en via welke routes. Bedrijven zoals Google zijn al actief bezig met deze technologie en kunnen hiermee hun datacentra efficiënter inrichten.

## Toekomstige ontwikkelingen

Door SDN te gebruiken, kunnen grote spelers zoals Google hun netwerken en datacentra optimaliseren, zelfs met een besparing van slechts enkele procenten. Deze technologie zal naar verwachting de komende jaren steeds prominenter worden in de wereld van netwerkbeheer.

## Conclusie

In dit stuk hebben we geleerd over de rol van de netwerklaag en hoe deze wordt gebruikt om pakketjes naar hun bestemming te routeren. We hebben gezien dat deze taak momenteel grotendeels wordt uitgevoerd door routers, maar in de toekomst mogelijk meer wordt gecentraliseerd met SDN. In het volgende deel zullen we dieper ingaan op de protocollen die op de netwerklaag worden gebruikt.
