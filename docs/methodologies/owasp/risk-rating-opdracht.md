# Opdracht Risk Assessment - Casus Hamerslag

<p>
    Open de
    <a href="../../knowledge-base/networking/miw/assets/opdrachten/opdracht-risk-assessment-21-05.pdf#page=1&zoom=75" target=”_blank”>opdracht risk assesment</a>
    in a new tab window fullscreen.
</p>

## Stap 1: Identifying a Risk

1. **Externe aanvaller verkrijgt toegang tot bestelpagina**
   - Een aanvaller van buitenaf kan proberen toegang te krijgen tot de bestelpagina door middel van een onbekend apparaat.

   **Enkele voorbeelden:**

   - 1. **Phishing-aanvallen**
        - De aanvaller kan phishing-e-mails versturen naar medewerkers van Hamerslag. In deze e-mails probeert de aanvaller de medewerkers te verleiden om inloggegevens of andere gevoelige informatie prijs te geven. Dit kan leiden tot toegang tot de interne systemen en uiteindelijk de bestelpagina.
     1. **Brute force aanvallen**
         - Een aanvaller kan proberen toegang te krijgen door brute force aanvallen op de inlogpagina van de bestelpagina uit te voeren. Hierbij probeert de aanvaller verschillende combinaties van gebruikersnamen en wachtwoorden totdat hij toegang verkrijgt.
     2. **Kwetsbaarheden in de webapplicatie**
         - De aanvaller kan gebruik maken van bekende of onbekende kwetsbaarheden (zero-day exploits) in de webapplicatie die de bestelpagina host. Dit kan SQL-injecties, cross-site scripting (XSS), of andere kwetsbaarheden omvatten die ongeautoriseerde toegang mogelijk maken.
     3. **Onbeveiligde netwerken**
         - Als medewerkers van Hamerslag toegang krijgen tot de bestelpagina via onbeveiligde netwerken, zoals openbare Wi-Fi, kan een aanvaller netwerkverkeer onderscheppen (man-in-the-middle-aanval) en inloggegevens stelen.
     4. **Gestolen of gelekte inloggegevens**
         - Een aanvaller kan toegang verkrijgen door gebruik te maken van gestolen of gelekte inloggegevens. Dit kan gebeuren door eerdere datalekken bij Hamerslag of andere bedrijven waar medewerkers mogelijk dezelfde wachtwoorden hebben gebruikt.
     5. **Social engineering**
         - De aanvaller kan medewerkers misleiden via social engineering-technieken, zoals zich voordoen als een systeembeheerder en hen vragen om gevoelige informatie te delen, zoals inloggegevens.
     6. **Onbeveiligde lokale servers**
         - Als de lokale servers waarop de website draait niet goed zijn beveiligd, kan een aanvaller toegang verkrijgen via slecht geconfigureerde firewall-instellingen, ongepatchte systemen of zwakke wachtwoorden.
     7. **Malware-infecties**
         - De aanvaller kan malware installeren op de computers van medewerkers door middel van geïnfecteerde bijlagen of schadelijke downloads. Deze malware kan vervolgens inloggegevens verzamelen en doorsturen naar de aanvaller.

2. **Interne medewerker met kwade bedoelingen**
   - Een medewerker in het magazijn kan proberen ongeautoriseerde wijzigingen aan te brengen in de bestellingen of klantgegevens.

   **Enkele voorbeelden:**

   - 1. **Misbruik van Bevoegdheden**
        - Een medewerker met toegangsrechten tot gevoelige delen van het netwerk of de systemen kan deze rechten misbruiken om ongeautoriseerde toegang te verkrijgen tot de bestelpagina en andere kritieke systemen.
     1. **Kopiëren van Gevoelige Gegevens**
         - De medewerker kan gevoelige gegevens, zoals klantinformatie of bestellingsdetails, kopiëren naar een extern opslagapparaat zoals een USB-stick of een externe harde schijf, en deze vervolgens buiten het bedrijf gebruiken of verkopen.
     2. **Manipulatie van Bestellingen**
         - De medewerker kan bestellingen manipuleren door ze te wijzigen, annuleren of door valse bestellingen te plaatsen, wat kan leiden tot financiële verliezen en logistieke problemen.
     3. **Toegang Delen met Externe Partijen**
         - De medewerker kan zijn toegangsgegevens delen met externe aanvallers, waardoor deze toegang krijgen tot de interne systemen zonder dat dit direct opvalt.
     4. **Installeren van Schadelijke Software**
         - De medewerker kan malware installeren op bedrijfscomputers om toegang te krijgen tot gevoelige informatie of om systemen te saboteren.

3. **Gegevensverlies door interne fout**
   - Een medewerker kan per ongeluk klantgegevens of bestelgegevens verwijderen of veranderen.

   **Enkele voorbeelden:**

   - 1. **Onopzettelijke Gegevenswissing**
        - Fouten bij het configureren van systeeminstellingen, zoals toegangsrechten, firewallregels, of back-upschema's, kunnen leiden tot onbedoelde toegang, blokkering van legitiem verkeer, of ontoereikende bescherming van gegevens.
     1. **Onjuiste Configuratie van Systeeminstellingen**
         - De medewerker kan gevoelige gegevens, zoals klantinformatie of bestellingsdetails, kopiëren naar een extern opslagapparaat zoals een USB-stick of een externe harde schijf, en deze vervolgens buiten het bedrijf gebruiken of verkopen.
     2. **Menselijke Fouten bij Gegevensinvoer**
         - Fouten bij het invoeren van gegevens door medewerkers kunnen leiden tot het verlies van nauwkeurigheid en integriteit van de gegevens, waardoor onjuiste besluitvorming en operationele problemen kunnen ontstaan.
     3. **Onvoldoende Training en Bewustzijn**
         - Een gebrek aan training en bewustzijn over gegevensbeveiliging onder medewerkers kan leiden tot het onbedoeld delen van vertrouwelijke informatie, het openen van kwaadaardige bijlagen in e-mails, of het negeren van beveiligingswaarschuwingen.
     4. **Slechte Gegevensback-up Procedures**
         - Onvoldoende of onjuiste gegevensback-upprocedures kunnen leiden tot het verlies van belangrijke gegevens in geval van systeemstoringen, ransomware-aanvallen, of andere noodsituaties.

## Stap 2: Factors for Estimating Likelihood

### 1. **Externe aanvaller verkrijgt toegang tot bestelpagina**

#### Threat Agent Factors

- **Skill Level**: 9 (security penetration skills)
  - Aanvallers hebben geavanceerde technische vaardigheden nodig om in te breken in beveiligde systemen.
- **Motive**: 7 (high reward - access to sensitive data)
  - De toegang tot gevoelige klantgegevens biedt een hoge beloning.
- **Opportunity**: 9 (no access or resources required - can attempt from anywhere)
  - Aanvallers kunnen overal vandaan proberen toegang te krijgen zonder fysieke beperkingen.
- **Size**: 9 (anonymous Internet users)
  - Het potentiële aantal aanvallers is zeer groot vanwege de anonimiteit van internetgebruikers.

#### Vulnerability Factors

- **Ease of Discovery**: 7 (easy)
  - Aanvallers met geavanceerde vaardigheden kunnen relatief gemakkelijk kwetsbaarheden ontdekken via geautomatiseerde tools en scripts.
- **Ease of Exploit**: 9 (automated tools available)
  - Exploits voor veelvoorkomende kwetsbaarheden kunnen met behulp van geautomatiseerde tools uitgevoerd worden.
- **Awareness**: 9 (public knowledge)
  - Veelvoorkomende kwetsbaarheden in webapplicaties zijn algemeen bekend binnen de hacker community.
- **Intrusion Detection**: 8 (logged without review)
  - Exploitaties worden mogelijk gelogd maar niet actief gecontroleerd, waardoor detectie vertraagd wordt.

### 2. **Interne medewerker met kwade bedoelingen**

#### Threat Agent Factors

- **Skill Level**: 3 (some technical skills)
  - Medewerkers hebben enige technische vaardigheden nodig om kwaadwillende acties uit te voeren.
- **Motive**: 5 (possible reward)
  - Medewerkers kunnen gemotiveerd zijn door persoonlijke of financiële voordelen.
- **Opportunity**: 0 (full access)
  - Medewerkers hebben volledige toegang tot systemen, waardoor kansen overvloedig zijn.
- **Size**: 6 (authenticated users)
  - Het aantal potentiële kwaadwillende medewerkers is beperkt tot geautoriseerde gebruikers.

#### Vulnerability Factors

- **Ease of Discovery**: 9 (automated tools available)
  - Medewerkers met toegang tot interne systemen kunnen gemakkelijk kwetsbaarheden ontdekken met behulp van geautomatiseerde tools.
- **Ease of Exploit**: 5 (easy)
  - Met enige technische kennis en interne toegang kunnen medewerkers gemakkelijk kwetsbaarheden exploiteren.
- **Awareness**: 6 (obvious)
  - Medewerkers met toegang tot systemen hebben vaak voldoende kennis van potentiële kwetsbaarheden.
- **Intrusion Detection**: 3 (logged and reviewed)
  - Binnenkomende activiteiten worden gelogd en regelmatig gecontroleerd, waardoor detectie waarschijnlijk is.

### 3. **Gegevensverlies door interne fout**

#### Threat Agent Factors

- **Skill Level**: 3 (some technical skills)
  - Medewerkers hebben enige technische vaardigheden nodig om per ongeluk gegevens te verliezen.
- **Motive**: 1 (low or no reward)
  - Er is geen motivatie voor gegevensverlies omdat het per ongeluk gebeurt.
- **Opportunity**: 9 (full access)
  - Medewerkers hebben volledige toegang tot systemen, wat de kans op fouten vergroot.
- **Size**: 6 (authenticated users)
  - Het aantal potentiële bronnen van fouten is beperkt tot geautoriseerde gebruikers.

#### Vulnerability Factors

- **Ease of Discovery**: 7 (easy)
  - Medewerkers kunnen kwetsbaarheden of fouten gemakkelijk ontdekken door hun dagelijkse werkzaamheden en toegang tot systemen.
- **Ease of Exploit**: 3 (difficult)
  - Hoewel fouten vaak onbedoeld zijn, vereist exploitatie van een fout enige technische kennis en mogelijkheid.
- **Awareness**: 4 (hidden)
  - De meeste medewerkers zijn zich niet volledig bewust van de kwetsbaarheden die kunnen leiden tot gegevensverlies.
- **Intrusion Detection**: 8 (logged without review)
  - Fouten worden vaak gelogd maar niet actief gecontroleerd, waardoor problemen onopgemerkt kunnen blijven.

## Stap 3: Factors for Estimating Impact

### 1. **Externe aanvaller verkrijgt toegang tot bestelpagina**

#### Technical Impact Factors
- **Loss of Confidentiality**: 7 (extensive critical data disclosed)
  - Een aanvaller kan toegang krijgen tot gevoelige klantgegevens en bedrijfsinformatie.
- **Loss of Integrity**: 5 (extensive slightly corrupt data)
  - De aanvaller kan gegevens licht beschadigen zonder de totale werking te verstoren.
- **Loss of Availability**: 5 (uitgebreide primaire diensten onderbroken)
  - De aanval kan belangrijke diensten onderbreken, wat leidt tot operationele vertragingen.
- **Loss of Accountability**: 9 (completely anonymous)
  - De aanvaller kan volledig anoniem blijven, waardoor opsporing moeilijk is.

#### Business Impact Factors
- **Financial damage**: 7 (significant effect on annual profit)
  - Het bedrijf kan aanzienlijke financiële verliezen lijden door de aanval.
- **Reputation damage**: 9 (brand damage)
  - De aanval kan ernstige schade toebrengen aan de reputatie van het merk.
- **Non-compliance**: 7 (high profile violation)
  - De aanval kan resulteren in hoge boetes en juridische gevolgen door niet-naleving van regelgeving.
- **Privacy violation**: 7 (thousands of people)
  - Gevoelige gegevens van duizenden klanten kunnen worden blootgesteld.

### 2. **Interne medewerker met kwade bedoelingen**

#### Technical Impact Factors
- **Loss of Confidentiality**: 7 (extensive critical data disclosed)
  - Een kwaadwillende medewerker kan toegang krijgen tot en het lekken van grote hoeveelheden interne gevoelige gegevens.
- **Loss of Integrity**: 7 (extensive seriously corrupt data)
  - De medewerker kan opzettelijk kritieke data ernstig beschadigen.
- **Loss of Availability**: 5 (minimal primary services interrupted)
  - De medewerker kan belangrijke diensten verstoren, wat leidt tot operationele problemen.
- **Loss of Accountability**: 7 (possibly traceable)
  - De acties van de medewerker kunnen met enige moeite worden getraceerd.

#### Business Impact Factors
- **Financial damage**: 3 (minor effect on annual profit)
  - De kwaadwillige acties kunnen leiden tot beperkte financiële verliezen.
- **Reputation damage**: 5 ( loss of goodwill)
  - Het incident kan resulteren in een matig verlies van klantvertrouwen en goodwill.
- **Non-compliance**: 5 (clear violation)
  - De acties van de medewerker kunnen resulteren in duidelijke overtredingen van interne regels en regelgeving.
- **Privacy violation**: 7 (thousands of people)
  - De privacyschending kan duizenden klanten treffen.

### 3. **Gegevensverlies door interne fout**

#### Technical Impact Factors
- **Loss of Confidentiality**: 6 (extensive non-sensitive data disclosed)
  - Een interne fout kan leiden tot het onbedoeld onthullen van grote hoeveelheden niet-gevoelige gegevens.
- **Loss of Integrity**: 7 (extensive seriously corrupt data)
  - Een fout kan resulteren in ernstige schade aan kritieke data.
- **Loss of Availability**: 5 (minimal primary services interrupted)
  - De fout kan belangrijke diensten verstoren, wat leidt tot aanzienlijke operationele onderbrekingen.
- **Loss of Accountability**: 5 ( possibly traceable)
  - De oorzaak van de fout kan met enige moeite worden geïdentificeerd en getraceerd.

#### Business Impact Factors
- **Financial damage**: 5 (minor effect on annual profit)
  - De fout kan leiden tot beperkte financiële verliezen voor het bedrijf.
- **Reputation damage**: 5 (loss of goodwill )
  - Het incident kan resulteren in een matig verlies van klantvertrouwen en goodwill.
- **Non-compliance**: 5 (clear violation)
  - De gegevensverliesincident kan resulteren in duidelijke overtredingen van regelgeving.
- **Privacy violation**: 5 (honderden mensen)
  - Het gegevensverlies kan de privacy van honderden klanten aantasten.

## Stap 4: Determining Severity of the Risk

1. **Externe aanvaller verkrijgt toegang tot bestelpagina**
   - **Likelihood**: 8.5 (High)
   - **Impact**: 6.5 (High)
   - **Severity**: 7.5 (Critical)

2. **Interne medewerker met kwade bedoelingen**
   - **Likelihood**: 6 (Medium)
   - **Impact**: 5.75 (Medium)
   - **Severity**: Medium

3. **Gegevensverlies door interne fout**
   - **Likelihood**: 6 (Medium)
   - **Impact**: 5.75 (Medium)
   - **Severity**: Medium

## Stap 5: Deciding What to Fix

1. **Critical Severity Risks**
   - **Externe aanvaller verkrijgt toegang tot bestelpagina**
   - **Gegevensverlies door externe aanval**

2. **Medium Severity Risks**
   - **Interne medewerker met kwade bedoelingen**
   - **Gegevensverlies door interne fout**

### Stap 6: Customizing Your Risk Rating Model

1. **Adding Factors**
   - Overweeg factoren zoals de impact van gegevensverlies op wettelijke naleving en klantvertrouwen.

2. **Customizing Options**
   - Pas opties aan die specifiek zijn voor het bedrijf, zoals specifieke bedreigingen die uniek zijn voor de e-commerce sector.

3. **Weighting Factors**
   - Geef meer gewicht aan factoren die kritischer zijn voor het bedrijf, zoals reputatieschade en financiële schade.

## Conclusie

De firma Hamerslag moet zich richten op het verminderen van risico's die de grootste impact kunnen hebben op hun bedrijfsvoering en reputatie. Het is van cruciaal belang om maatregelen te nemen tegen externe aanvallen en ervoor te zorgen dat het systeem effectief ongeautoriseerde toegang detecteert en rapporteert. Tegelijkertijd moeten interne risico's en menselijke fouten ook worden beheerd door middel van training en bewustwording onder de medewerkers.
