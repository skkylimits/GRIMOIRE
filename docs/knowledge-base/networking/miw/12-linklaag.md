# Linklaag

<p>
   Open de
    <a href="./assets/lessen/les-3a-2-link-layer.pdf#page=1&zoom=75" target=”_blank”>les 3b linklaag</a>
    in a new tab window fullscreen.
</p>

## Welkom Terug

Goeiedag allemaal en welkom bij het volgende werkcollege. We zijn inmiddels aangekomen bij de linklaag. Hoewel we vorige week bij de netwerklaag waren en we daar uitgebreid hebben gekeken naar hoe de netwerklaag werkt, komen we nu bij de linklaag, de laag eronder. Hier gaan we uitgebreid op in.

## De fysieke laag

De `fysieke laag` gaat echt over `spanningen`, `stroompjes`, `lichtpulsen` en `radiosignalen`. Het is heel belangrijk dat er goed over wordt nagedacht, maar de personen die dit regelen zijn niet per se wij als informatici. Vandaag zullen we een korte introductie geven tot de linklaag.

## Wat doet de linklaag?

De linklaag biedt diensten zoals foutdetectie en -correctie. Het is verantwoordelijk voor de verbindingen tussen apparaten die rechtstreeks met elkaar kunnen communiceren. In een netwerk zorgen de   rood gemarkeerde verbindingen voor betrouwbare dataoverdracht, een taak die bij de linklaag ligt.

## Verbindingen en verantwoordelijkheden

De `netwerklaag` is verantwoordelijk voor het vinden van de route van het pakketje naar de juiste bestemming. Een netwerk tot netwerk verbindingen.

De `linklaag` daarentegen, is verantwoordelijk voor elke afzonderlijke verbinding tussen twee apparaten die rechtstreeks met elkaar kunnen communiceren. De zogehete host-to-host communication.

## Soorten verbindingen

Er zijn allerlei soorten verbindingen, zoals `ethernetkabels`, `glasvezelkabels` en `draadloze verbindingen` zoals wifi of `4G`. De `linklaag` zorgt voor de manier waarop deze verbindingen werken, hoewel de technologieën hiervoor heel verschillend kunnen zijn.

## Technieken en protocollen

Je kunt je wel voorstellen dat er heel andere technieken nodig zijn voor een draadloos signaal naar jouw access point dan voor een kabelverbinding. De manier waarop de linklaag dit doet kan heel verschillend zijn, en er zijn ook heel veel verschillende linklaagprotocollen voor verschillende technologieën.

## Gemeenschappelijke service

Alle `linklaagprotocollen` bieden dezelfde service aan de lagen erboven: ze zorgen ervoor dat een stukje data over een verbinding wordt doorgestuurd naar de volgende laag. Dit betekent dat de `linklaag`de data doorgeeft, eventueel opnieuw verpakt en klaar maakt voor verzending over de volgende verbinding.

## Verschillende technieken en protocollen

Er zijn veel verschillende technieken voor verbindingen en dus ook veel verschillende linklaagprotocollen. Het is goed mogelijk dat een pakketje onderweg verschillende linklaagprotocollen tegenkomt. Bijvoorbeeld, het kan beginnen met een `ethernetverbinding`, vervolgens via een `glasvezelkabel` gaan en dan voor het laatste stukje via `wifi` verstuurd worden.

## Betrouwbaarheid van verschillende technieken

De betrouwbaarheid van verschillende technieken kan variëren. Ethernetkabels zijn bijvoorbeeld erg betrouwbaar, omdat de kans dat er een fout optreedt heel klein is. Daarom hoeft ethernet geen maatregelen te nemen om dit op te lossen. Bij wifi is dit anders, omdat draadloze signalen door de lucht gaan en er een grotere kans is op storingen.

## TCP als vangnet

Als het belangrijk is dat data goed aankomt, kan de `transportlaag`, met bijvoorbeeld `TCP`, zorgen voor foutcorrectie. Dit is handig, vooral in situaties waar veel apparaten tegelijkertijd draadloos verbinding maken, zoals in een grote collegezaal.

## WiFi en betrouwbaarheid

Wifi zorgt ervoor dat minimaal de eerste stap gecontroleerd wordt of een bericht correct aankomt. Als dit niet zo is, probeert wifi het bericht opnieuw te versturen. Dit is belangrijk omdat het zonde is als de eerste stap al mislukt en de data verloren gaat.

## Switches en MAC-adressen

Op de linklaag vinden we ook `switches`. Switches zijn minder slim dan `routers` en werken met linklaagadressen, de zogenaamde MAC-adressen (Medium Access Control).

## Structuur van MAC-adressen

`MAC-adressen` zijn hexadecimaal genoteerde adressen van 48 bits. Ze zijn veel groter dan IPv4-adressen en kunnen nog een tijdje mee. Deze adressen zijn meestal hard gecodeerd in de netwerkhardware.

## Beheer en toewijzing van MAC-adressen

MAC-adressen worden centraal beheerd en fabrikanten krijgen een deel van de adressenruimte toegewezen. Elk netwerkapparaat heeft een uniek MAC-adres dat niet verandert.

## Het verzenden van frames en betrouwbare dataoverdracht

Het frame wordt verstuurd over een bepaalde verbinding. De linklaag zorgt ervoor dat het frame toegang krijgt tot de verbinding en het verstuurt. Sommige protocollen zorgen ook voor betrouwbare dataoverdracht door fouten te detecteren en te corrigeren.

## Diensten van de linklaag

### 1. **Flow Control**

Flow control zorgt ervoor dat de zender en ontvanger gegevens op een efficiënte manier kunnen overdragen zonder overbelasting. Dit mechanisme reguleert de snelheid van dataoverdracht, zodat de ontvanger niet overweldigd wordt door te veel data in korte tijd. Hierdoor wordt dataverlies voorkomen en blijft de communicatie stabiel.

### 2. **Error Detection**

Error detection houdt in dat fouten in de dataoverdracht worden geïdentificeerd. De linklaag voegt controle-informatie, zoals checksums of cyclic redundancy checks (CRC), toe aan de data. Bij ontvangst wordt de data opnieuw gecontroleerd met deze informatie. Als er een fout wordt gedetecteerd, kan de data opnieuw worden verzonden, wat de betrouwbaarheid van de communicatie verhoogt.

### 3. **Error Correction**

Error correction gaat een stap verder dan foutdetectie door niet alleen fouten te identificeren, maar ook te corrigeren. Mechanismen zoals Hamming-codes of andere foutcorrigerende codes worden gebruikt om de fouten direct te herstellen zonder dat de data opnieuw verzonden hoeft te worden. Dit zorgt voor een efficiëntere en betrouwbaardere dataoverdracht.

### 4. **Full/Half Duplex**

Full duplex en half duplex bepalen hoe communicatie tussen twee apparaten plaatsvindt. In een full duplex-systeem kunnen beide apparaten gelijktijdig gegevens verzenden en ontvangen, zoals bij een telefoongesprek. In een half duplex-systeem kan slechts één apparaat tegelijk verzenden of ontvangen, zoals bij een walkietalkie. Full duplex zorgt voor snellere en meer natuurlijke communicatie, terwijl half duplex eenvoudiger en minder kostbaar is om te implementeren.

## Parity Checking

Parity checking is een eenvoudige methode voor foutdetectie die wordt gebruikt om te controleren of data tijdens de overdracht correct is ontvangen.

### Waarom?

Parity checking wordt gebruikt om fouten in dataoverdracht te detecteren. Het is een eenvoudige en kosteneffectieve methode. Bij parity checking wordt aan elke byte data een extra bit toegevoegd, het pariteitsbit. Dit bit zorgt ervoor dat het totale aantal 1's in de byte even of oneven is. Als er tijdens de overdracht een fout optreedt, zoals een bit dat van 0 naar 1 verandert of omgekeerd, zal het aantal 1's niet meer kloppen met de verwachte pariteit. Hierdoor kan de fout snel worden gedetecteerd. Parity checking is vooral nuttig voor het opsporen van enkelvoudige bitfouten.

### Hoe werkt het?

1. **Even Pariteit (Even Parity):**
   - Hier wordt een pariteitsbit toegevoegd zodat het totale aantal '1'-bits in de data, inclusief het pariteitsbit, even is.
   - Voorbeeld: Stel dat we de data bits `1101` hebben. Dit zijn drie '1'-bits (oneven). Om het totaal even te maken, voegen we een pariteitsbit `1` toe, waardoor de reeks `11011` wordt.

2. **Oneven Pariteit (Odd Parity):**
   - Hier wordt een pariteitsbit toegevoegd zodat het totale aantal '1'-bits in de data, inclusief het pariteitsbit, oneven is.
   - Voorbeeld: Stel dat we de data bits `1101` hebben. Dit zijn drie '1'-bits (oneven). Om het totaal oneven te houden, voegen we een pariteitsbit `0` toe, waardoor de reeks `11010` wordt.

### Voorbeeld van Even Pariteit

Stel dat we de data bits `1011` willen verzenden:

- Het aantal '1'-bits in `1011` is drie (oneven).
- Voor even pariteit voegen we een `1` toe: `10111`.

Bij ontvangst controleert de ontvanger of het aantal '1'-bits nog steeds even is:

- Ontvangen bits: `10111`.
- Het aantal '1'-bits is vier (even), dus de data is waarschijnlijk correct ontvangen.

### Voorbeeld van Oneven Pariteit

Stel dat we de data bits `1010` willen verzenden:

- Het aantal '1'-bits in `1010` is twee (even).
- Voor oneven pariteit voegen we een `1` toe: `10101`.

Bij ontvangst controleert de ontvanger of het aantal '1'-bits nog steeds oneven is:

- Ontvangen bits: `10101`.
- Het aantal '1'-bits is drie (oneven), dus de data is waarschijnlijk correct ontvangen.

### Beperkingen

- Parity checking kan alleen enkelvoudige bitfouten detecteren (als slechts één bit is gewijzigd).
- Het kan geen dubbele bitfouten detecteren (als twee bits zijn gewijzigd, blijft de pariteit hetzelfde).
- Parity checking biedt geen foutcorrectie, alleen foutdetectie.

#### Gebruik

Parity checking wordt vaak gebruikt in situaties waar eenvoudige foutdetectie voldoende is, zoals in bepaalde communicatieprotocollen en geheugenopslag, om een basisniveau van gegevensintegriteit te waarborgen.

## Two-Dimensional Parity

Two-dimensional parity, ook wel bekend als matrixpariteit, is een methode voor foutdetectie en -correctie die gebruik maakt van zowel rij- als kolompariteit om de kans op het detecteren en corrigeren van fouten in verzonden gegevens te vergroten. Hier is een stapsgewijze uitleg van hoe het werkt:

### Waarom?

We kunnen meer controle-informatie toevoegen, zoals tweedimensionale pariteitscontrole. Dit verhoogt de kans dat we fouten kunnen detecteren en corrigeren.

### Stapsgewijze Uitleg van Two-Dimensional Parity

1. **Gegevensopdeling**:
   - Gegevens worden georganiseerd in een matrix (tabel) van bits. Bijvoorbeeld, als je 16 bits aan gegevens hebt, kun je deze in een 4x4 matrix plaatsen.

2. **Berekenen van Rijpariteit**:
   - Voor elke rij in de matrix wordt de pariteit berekend en een extra pariteitsbit aan het einde van de rij toegevoegd. De pariteit kan even (even aantal 1's) of oneven (oneven aantal 1's) zijn, afhankelijk van de gebruikte pariteitsmethode.

   - **Even pariteit** betekent dat het aantal 1's in de rij, inclusief de pariteitsbit, even moet zijn.
   - **Oneven pariteit** betekent dat het aantal 1's in de rij, inclusief de pariteitsbit, oneven moet zijn.

3. **Berekenen van Kolompariteit**:
   - Voor elke kolom, inclusief de toegevoegde pariteitsbits van de rijen, wordt ook een pariteitsbit berekend en toegevoegd aan het einde van de kolom.

   - Dit zorgt voor een extra rij aan de onderkant van de matrix waarin de kolompariteitsbits worden geplaatst.

4. **Verzenden van Gegevens**:
   - De volledige matrix, inclusief de rij- en kolompariteitsbits, wordt verzonden naar de ontvanger.

5. **Foutdetectie bij de Ontvanger**:
   - De ontvanger ontvangt de matrix en berekent opnieuw de pariteit voor elke rij en kolom.
   - De berekende pariteitsbits worden vergeleken met de ontvangen pariteitsbits.
   - Als de pariteitsbits niet overeenkomen, is er een fout gedetecteerd.

6. **Foutcorrectie**:
   - Als er een fout wordt gedetecteerd in zowel een specifieke rij als een specifieke kolom, kan de fout worden gecorrigeerd. De fout bevindt zich op het kruispunt van die rij en kolom.
   - Door de bitwaarde op dat kruispunt om te draaien (van 0 naar 1 of van 1 naar 0), kan de fout worden gecorrigeerd.

### Voorbeeld

Stel dat je de volgende 4x4 matrix van gegevens hebt:

```bash
1 0 1 1
0 1 0 0
1 1 1 0
0 0 1 1
```

**Stap 1: Berekenen van rijpariteit en toevoegen aan het einde van elke rij**:

```bash
1 0 1 1 1
0 1 0 0 1
1 1 1 0 1
0 0 1 1 0
```

**Stap 2: Berekenen van kolompariteit en toevoegen aan het einde van elke kolom**:

```bash
1 0 1 1 1
0 1 0 0 1
1 1 1 0 1
0 0 1 1 0
--------
0 0 1 0 1
```

De volledige matrix inclusief rij- en kolompariteitsbits is nu:

```bash
1 0 1 1 1
0 1 0 0 1
1 1 1 0 1
0 0 1 1 0
0 0 1 0 1
```

**Stap 3: Verzenden en ontvangen van de matrix**.

**Stap 4: Foutdetectie en -correctie**:

- Bij de ontvanger worden de pariteitsbits opnieuw berekend en vergeleken met de ontvangen pariteitsbits.
- Als er een fout wordt gedetecteerd in bijvoorbeeld de derde rij en de tweede kolom (door afwijkende pariteitsbits), kan de fout worden gecorrigeerd door de bitwaarde op de kruising van die rij en kolom om te draaien.

Met deze methode kunnen zowel enkele bits als sommige meervoudige bits fouten worden gedetecteerd en gecorrigeerd, afhankelijk van de foutpatronen.

## Foutdetectie en correctie

Met meer controle-informatie kunnen we niet alleen fouten detecteren, maar ook corrigeren. Dit betekent dat we de fout kunnen herstellen zonder dat we de data opnieuw hoeven te versturen.

Tot zover de linklaag. In het volgende college gaan we alle lagen opnieuw bekijken met een specifieke focus op beveiliging. We zullen zien dat er nog veel te doen is om ons netwerk daadwerkelijk veilig te maken. Tot dan!
