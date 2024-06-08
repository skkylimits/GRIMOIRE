# Virtualization

## 1. Introduction

- **1.1. Operating Systems**
    ::: details Antwoord
    **Operating System Perception vs. Expert Understanding**

    Voor de gemiddelde computergebruiker is het 'besturingssysteem' de visuele verschijning van hun computer, zoals hoe vensters en knoppen eruit zien en waar de taakbalk zich bevindt.

    **Windowing System en OS Relatie**

    Het besturingssysteem omvat echter het raamsysteem, wat deel uitmaakt van het OS. Dit is minder duidelijk voor de gemiddelde gebruiker, omdat in veel voorkomende besturingssystemen het raamsysteem is ingebed.

    **Linux en Flexibele Windowing Systemen**

    Linux maakt vaak gebruik van het X11 raamsysteem op een lager niveau, met verschillende desktopomgevingen erbovenop, zoals KDE, Gnome of IceWM, wat resulteert in verschillende gebruikerservaringen.

    **Belang van OS voor Experts**

    Voor experts is het belangrijkste aspect van het besturingssysteem het efficiënt beheren van hardware- en softwarebronnen.

    **CPU Beheer**

    Het OS beheert onder andere CPU's, die niet permanent aan processen worden toegewezen, maar slechts voor een beperkte tijdsspanne.

    **Virtualisatie en Emulatie**

    Virtualisatie maakt het mogelijk dat meerdere besturingssystemen dezelfde hardware delen, waarbij één OS alle hardware beheert en andere OS'en (gasten) resources krijgen zonder zich bewust te zijn van de volledige hardware.

    **Emulatie als Basisvorm**

    Emulatie is de eenvoudigste vorm van virtualisatie, waarbij de host een interpreter heeft die alle activiteit van het gast-OS stap voor stap interpreteert.

    **Geheugen, Opslag en IO-apparaten**

    Het OS beheert ook geheugen, opslag en IO-apparaten, waarbij geheugen op basis van 'first-come, first-served' wordt toegewezen, opslag wordt geoptimaliseerd en IO-apparaten worden beheerd.
    :::

- **1.2. Virtualization**
    ::: details Antwoord
    **Beperkingen van Gelijktijdige OS-uitvoering**

    Uit deze beschrijving blijkt dat een computer niet eenvoudigweg twee besturingssystemen tegelijk kan uitvoeren.

    **Onpraktisch voor Concurrentieel Gebruik**

    Het is niet realistisch om twee besturingssystemen aan te passen zodat ze gelijktijdig kunnen draaien op gedeelde hardware.

    **Voordelen van Virtualisatie**

    De oplossing voor dit probleem is virtualisatie, die meerdere besturingssystemen toestaat om dezelfde hardware te gebruiken.

    **Asymmetrische Opzet van Virtualisatie**

    In een virtuele omgeving 'bezit' één OS alle hardware (host), en biedt het resources aan een ander OS (gast) zonder dat dit OS zich bewust is van het delen van hardware.
    :::

- **1.2.1. Emulation**
    ::: details Antwoord
     **Emulatie**

    De meest naïeve en eenvoudigste vorm van virtualisatie is emulatie. De host heeft een interpreter die alle activiteiten van het gast-OS stap voor stap interpreteert, vergelijkbaar met een microcode-interpreter in een CPU of een taalinterpreter die je misschien kent.

    **CPU-beheer en Scheduling**

    Het bepalen welk proces hoelang de CPU krijgt, wordt scheduling genoemd.

    **Geheugen**

    Geheugen wordt meestal toegewezen op basis van 'first-come, first-served', waarbij ongebruikt geheugen naar de schijf wordt geschreven en later weer wordt gebruikt wanneer dat nodig is.

    **Schijven**

    Schijven worden in verschillende lagen gebruikt om de mogelijkheden en beperkingen van ruwe gegevensopslag om te zetten in een flexibel intern informatiesysteem. Merk op dat geheugen en schijven onderdeel zijn van een grotere bron: opslag.

    **Beheer van IO-apparaten**

    Het OS beheert alle IO-apparaten en subsystemen, variërend van toetsenbord en muis tot grafische kaarten, die op zichzelf computers zijn.

    **Verbeteringen in Virtualisatie**

    Moderne processors ondersteunen allemaal dezelfde architectuur (X86-64), waardoor host en gast op dezelfde processor kunnen draaien. Met wat hardwareondersteuning kan de gast rechtstreeks op de fysieke CPU draaien.

    **Prestatie en Gebruik van Virtualisatie**

    Een gevirtualiseerde gast draait over het algemeen 5-10% langzamer dan de host en gebruikt 10-20% meer geheugen, maar biedt alle voordelen voor een kleine prijs.
    :::

- **1.3. Advantages of Virtualization**
  - **1.3.1. Utilization of resources; load averaging**
    ::: details Antwoord
    **Voordelen van Server Virtualisatie**

    Een fysieke server die weinig te doen heeft, bezet hardware onnodig.

    **Efficiënt Gebruik van Hardware**

    Virtualisatie van de server betekent dat andere gasten dezelfde (host) hardware kunnen gebruiken.

    **Kostenverlaging door Gedeeld Gebruik**

    Servers die slechts af en toe nodig zijn, zijn een ander voorbeeld.

    **Gedeeld Gebruik voor Kostenefficiëntie**

    Backup servers worden vaak 's nachts gebruikt, terwijl kantoorservers overdag worden gebruikt. Ze kunnen dezelfde hardware delen, waardoor de kosten worden verlaagd.

    **Gebruik van Containers voor Efficiëntie**

    Door containers te gebruiken (waar we later op in zullen gaan), kan een normale server worden gevirtualiseerd om de resources efficiënter te benutten.
    :::

- **1.3.2. Maintenance**
    ::: details Antwoord
    **Flexibiliteit bij Hardwareproblemen**

    Als een fysieke server uitvalt of hardwareondersteuning nodig heeft, is deze niet beschikbaar voor eindgebruikers.

    **Naadloze Migratie bij Problemen**

    Een gevirtualiseerde gast kan eenvoudig worden verplaatst naar een andere host.

    **Geplande en Ongeplande Ondersteuning**

    Geplande ondersteuning terwijl de gast blijft draaien is eenvoudig, en zelfs bij ongeplande uitval (hostcrashes) zijn oplossingen voor hot-swappable gasten ontwikkeld.

    **Software-ondersteuning en Templatebeheer**

    Grote organisaties kunnen een gastsjabloon onderhouden die wordt uitgerold voor alle gebruikers, met up-to-date toepassingen, etc. Verschillende methoden hiervoor worden besproken.
    :::

- **1.3.3. Security**
    ::: details Antwoord
    **Gescheiden Gastomgevingen**

    Als de host veilig is, worden gasten gescheiden alsof ze op afzonderlijke hardware draaien.

    **Streng Beveiligde Gedeelde Hardware**

    Op deze manier kunnen afzonderlijke servers (bijvoorbeeld voor verschillende klanten of afdelingen) dezelfde hardware gebruiken met strikte garanties voor beveiliging.
    :::

- **1.3.4. Other Considerations**
    ::: details Antwoord
    **Consolidatie van Servers**

    Vervang veel kleine servers door een paar krachtige servers:

  - Lagere totale hardwarekosten
  - Verminderde energievoetafdruk
  - Lager risicoprofiel (rampenherstel, downtime)

    **Scheiden van Hardware- en Softwarebeheer**

    Scheid hardwarebeheer van softwarebeheer (VM's kunnen eenvoudig worden verplaatst):

  - Behendigheid, flexibiliteit, schaalbaarheid

    **Gebruik in Softwareontwikkeling en Onderwijs**

    Ook te gebruiken in softwareontwikkeling, onderwijs, enzovoort, om verschillende platforms te gebruiken zonder de kosten.

    **Zorgen over Softwarelicenties**
    :::

## 2. Virtualization

- **2.1. Area of Attack**
    ::: details Antwoord
    **Virtualisatie in Verschillende Gebieden**

    Virtualisatie kan plaatsvinden in verschillende gebieden, met behulp van verschillende technieken.

    **Type 1 en Type 2 Virtualisatie**

  - Bare metal
    - Als de host en gast vergelijkbaar zijn, wordt de integratie beter.
      - Scheid hardwarebeheer van softwarebeheer (VM's kunnen eenvoudig worden verplaatst)
      - Behendigheid, flexibiliteit, schaalbaarheid
      - Serverniveau - hypervisors.

    **Hypervisors**

    Een hypervisor is een emulatielaag die gericht is op het ondersteunen van gevirtualiseerde gasten.

  - Type 1
    - De hypervisor is een volledig besturingssysteem dat rechtstreeks op de hardware draait (meestal zonder windowingsysteem en andere op de eindgebruiker gerichte functionaliteit).
  - Type 2
    - In deze benadering draait de hypervisor als een toepassing bovenop het hostbesturingssysteem. Er wordt meer hardware geëmuleerd, waardoor gasten enig prestatieverlies ondervinden.

    **Besturingssysteemniveau - Containers**

    In een container zijn de host- en gastbesturingssystemen identiek, en gebruikt de gast de code, bibliotheken en systeemaanroepen van de host. Alleen configuraties en gebruikersgegevens moeten worden gescheiden.

    **Paravirtualisatie**

    Bij paravirtualisatie wordt het gastbesturingssysteem aangepast om zich ervan bewust te zijn dat het wordt gevirtualiseerd, wat leidt tot een aanzienlijke vermindering van de virtualisatiepenalty.

    **Desktopvirtualisatie**

    Desktopvirtualisatie scheidt het bureaublad en de beschikbare applicaties van het fysieke apparaat dat we gebruiken. Elke thin client zonder schijfopslag kan worden gebruikt om toegang te krijgen tot de bestanden en instellingen van een gebruiker.

    **Applicatievirtualisatie**

    Software wordt gevirtualiseerd en verschijnt op het apparaat van de gebruiker als een daadwerkelijke applicatie, maar wordt elders op een server opgeslagen, wat het softwarebeheer vereenvoudigt en de kosten voor schijf en onderhoud verlaagt.
    :::

- **2.1.1. Type 1, Type 2**
    ::: details Antwoord
    **Type 1 (Bare-Metal) Hypervisor**

    Een Type 1 of bare-metal hypervisor is een besturingssysteem dat rechtstreeks fungeert als een hypervisor.

  - Voorbeelden zijn KVM, Red Hat RHEV, XenServer, Hyper-V, ESXi (vSphere).

    **Type 2 Hypervisor**

    Een Type 2-hypervisor is een hypervisor die als een gebruikersprogramma wordt uitgevoerd op

    :::

- **2.1.2. Bare metal**
    ::: details Antwoord
    **Bare metal**

    Bijvoorbeeld, in Windows kan de Hyper-V-service worden in- of uitgeschakeld alsof het een type-2 hypervisor is, maar in werkelijkheid is het een type-1 hypervisor die vervolgens het native Windows-besturingssysteem als een VM uitvoert.

    Bijvoorbeeld, RancherOS is een Linux-besturingssysteem dat alleen de kernel als Type-1 hypervisor uitvoert (80 MB in beslag neemt) en vervolgens alles in VM's daarbovenop uitvoert.
    :::

- **2.2. (Some) Kinds of Virtualization**
    ::: details Antwoord
    **Soorten Virtualisatie**

  - Applicatie-Servervirtualisatie
  - Desktopvirtualisatie
  - Presentatievirtualisatie
  - Gebruikersvirtualisatie
  - Netwerkvirtualisatie
  - Opslagvirtualisatie
  - Administratieve virtualisatie
  - Gegevensvirtualisatie
  - OS-virtualisatie (hoofdzakelijk geïnteresseerd in deze)
  - Hardwarevirtualisatie
  - Virtualisatie van geschillenbeslechting
    :::

  - **2.2.1. Application Virtualization**
    ::: details Antwoord
    **Applicatievirtualisatie (/Portable Applicaties)**

    - Applicaties worden opgeslagen op een server maar gebruiken het RAM en de CPU van de client om te draaien.
    - Voordeel: centrale upgrades, enzovoort.

    **Desktopvirtualisatie**

    - Het volledige bureaublad wordt uitgevoerd op een server, waarbij de client alleen toetsenbord, muis en beeldscherm gebruikt.
    - Voordeel: centraal beheer en domme clients.

    **Presentatievirtualisatie**

    - Op dezelfde manier: de client doet alleen de presentatie.
    - Voordeel: efficiënt gebruik van middelen.

    **Gebruikersvirtualisatie**

    - Gebruikmakend van een gecentraliseerd gebruikersprofiel.
    - Voordeel: consistentie en eenvoudig beheer.
    :::

  - **2.2.2. Infrastructure Virtualization**
    ::: details Antwoord
    **Applicatie-Server Virtualisatie**

    - 'Geavanceerde load balancing' verdeelt applicaties over servers, bijvoorbeeld een webserver met een hoog volume.

    **Netwerkvirtualisatie**

    - Creëren van logische netwerken (of componenten) met een structuur die onafhankelijk is van de onderliggende.

    **Opslagvirtualisatie**

    - Creëren van logische opslag (bijv. RAID, SAN).

    **Administratieve Virtualisatie**

    - Rolgebaseerde toegangscontrole: gebruikers hebben rollen, rollen hebben minimale voldoende rechten. De hele beheerfunctie is software.

    **Data Virtualisatie / Database Virtualisatie**
    :::

- **2.2.3. Other Virtualization**
    ::: details Antwoord
     **Virtualisatie van Geschillenbeslechting**

  - 'Het opbouwen van vertrouwen door hergebruik van reputatie' (bijv. Stack Exchange)

      **Softwarevirtualisatie**

  - Emulator
  - Interpreter
    :::

- **2.3. Virtual Machines (Emulation)**
    ::: details Antwoord
    **De Definitie van een Virtuele Machine**

    Een virtuele machine is een set gegevens die de volledige toestand van een daadwerkelijke machine vertegenwoordigt: zijn geheugen, registers, alle buffers, zijn schijven en mogelijk andere media, zijn videogeheugen. Alles.

    **Manipulatie van de Virtuele Machine**

    Een programma manipuleert de VM: gebruik de opgeslagen waarde voor de PC om de instructie te vinden die daar in de VM staat. Die instructie kan registers gebruiken, waarvan de waarde in de VM is opgeslagen.

    **Uitvoering van de Instructie**

    Het effect van het uitvoeren van de instructie wordt berekend door een interpreter. De bijgewerkte PC en de resultaten van de uitvoering (register en/of geheugen) worden bijgewerkt in de VM.

    **Wijziging van de Virtuele Machine**

    De hele VM wordt gewijzigd van de toestand vóór het uitvoeren van de instructie naar de toestand na het uitvoeren van de instructie.

    **Opschorting van een Procesbeeld**

    Merk op dat in een besturingssysteem een procesbeeld naar schijf kan worden gepauzeerd en kan worden ingewisseld.
    :::
  - **2.3.1. Hypervisor**
    ::: details Antwoord
    **Hypervisor**

    Het programma dat op deze manier een VM manipuleert, wordt een hypervisor genoemd. De hypervisor draait op een systeem dat de host wordt genoemd. Let op dat de VM mogelijk niet 'weet' dat deze op gesimuleerde hardware draait. Het voert uit alsof het op echt
    :::

- **2.4. Virtual Machines (In Practice)**
    ::: details Antwoord
    **Virtuele Machines (In de Praktijk)**

    De naïeve aanpak zoals hierboven beschreven is niet praktisch: het interpreteren van instructies op deze manier vertraagt de gast enorm en maakt deze bijna nutteloos.

    Veel verbeteringen op dit idee bestaan echter.
    :::
  - **2.4.1. Direct Execution**
    ::: details Antwoord
    Directe Uitvoering

    **Directe Uitvoering: Een Radicale Verbetering**

    De eerste radicale verbetering van de naïeve aanpak is als volgt: Als de gast en de host dezelfde CPU hebben, waarom voeren we dan de gastinstructies niet rechtstreeks uit op de CPU van de host.

    **Procesverplaatsing: Vergelijking met Gast en Host**

    Het toestaan van de gast om te draaien is als het verplaatsen van een proces van de gereed- naar de actieve staat.

    **Hardwaretoegang: Fouten bij de Gast**

    Maar wacht. Directe uitvoering faalt zodra de gast probeert toegang te krijgen tot zijn hardware (die er niet is).

    **Beschermde Modus: Beperkingen van Toegang**

    Gelukkig is toegang tot hardware alleen toegestaan in Ring 0 (Beschermde modus).

    **Emulatie van Vallen: Vroege Virtualisatiebenadering**

    Vroege virtualisatie ving eenvoudigweg vallen op en emuleerde ze, waarbij elke ring 0-instructie resulteerde in een val waarin de hypervisor de gast-OS-oproep emuleerde.

    **Snelheid van I/O: Beperkingen van Vroege Aanpak**

    Maar dit is nog steeds te langzaam voor I/O.
    :::

- **2.4.2. Paravirtualization**
    ::: details Antwoord
    **Paravirtualisatie: Aanpassing van de Gast**

    Paravirtualisatie houdt in dat het gast-OS wordt aangepast (bijv. opnieuw gecompileerd) om effectief gebruik te maken van de gevirtualiseerde omgeving, wat vooral gunstig is als de host en gast overeenkomsten hebben of akkoord gaan met een interface.

    **Vervangen door Extensies**

    Hoewel het ooit een prominente techniek was, is paravirtualisatie grotendeels vervangen door virtualisatie-extensies.

    **Gasthulpmiddelen**

    Een mildere aanpak omvat zogenaamde gasthulpmiddelen, die enkele stuurprogramma's bevatten voor toetsenbord, muis en vensterinvoer/uitvoer om de interactie met de gebruikersinterface te vergemakkelijken.
    :::

- **2.4.3. Intel VT/AMD-V, Intel VTd/AMD IOMMU**
    ::: details Antwoord
    **Intel VT/AMD-V: Virtualisatie-uitbreidingen**

    Rond 2005/2006 werden processors uitgerust met uitbreidingen zoals Intel VT-x/AMD-V om gastvallen direct in de hardware af te handelen.

    **Intel VT-x/AMD-V: Verbeterde Functionaliteit**

    Deze uitbreidingen introduceren nieuwe instructies/registraties, waardoor gasten in hun ring 0 kunnen werken terwijl de host nog steeds beschermd wordt.

    **Intel VTd/AMD IOMMU: Verbeterde Toegang tot Randapparatuur**

    Intel VTd/AMD IOMMU stelt gasten in staat om randapparaten (bijvoorbeeld Ethernet, grafische en schijfcontrollers) direct te gebruiken via DMA en onderbrekingsomleiding.

    **Prestaties op Gelijksheidsbasis**

    Virtuele servers met niet-gemodificeerde gasten en CPU's die vergelijkbaar zijn met die van de host, draaien nu bijna net zo snel als fysieke servers.

    **Gebruikersinteractie-uitdagingen**

    Ondanks de prestatieverbeteringen blijft de gebruikersinteractie met niet-gemodificeerde gasten enigszins omslachtig.
    :::

## 3. Containerization

- **3.1. CPU**
    ::: details Antwoord
    **Bijna Echte Snelheid met Hardwareondersteuning**

    Dankzij hardwareondersteuning draaien moderne virtuele machines bijna net zo snel als fysieke hardware.

    **Optimalisatie van de CPU**

    Virtualisatie maakt effectief gebruik van CPU-bronnen en lost zo het snelheidsprobleem op.

    **Geheugenbeheer**

    Laten we nu eens kijken naar geheugen, de tweede cruciale bron.

    **Paravirtualized Device Drivers**

    Xen introduceerde paravirtualized device drivers, waardoor Windows-gasten op Xen-servers efficiënt kunnen werken.

    **VMI en pv-ops**

    VMware ontwikkelde VMI, terwijl Linux pv-ops heeft geïntegreerd om het geheugengebruik te optimaliseren.

    **Gedeeld Geheugenbeheer**

    Een uniform geheugenbeheer- en paginasetup bedient zowel gast- als hostsystemen.

    **Hardwareondersteuning voor Beveiliging**

    Hardwareondersteuning maakt het mogelijk dat gasten veilig ring 0-instructies uitvoeren zonder de host in gevaar te brengen.

    **Apparaatdeling**

    Extra hardwareondersteuning vergemakkelijkt het delen van apparaten, zoals USB, muis en toetsenbord, waardoor de algehele functionaliteit wordt verbeterd.
    :::

- **3.2. Memory**
    ::: details Antwoord
    **Paravirtualization: Speed Improvement Attempt**

    Paravirtualization probeerde de snelheid van virtualisatie te verbeteren door het gast-OS aan te passen, maar denk aan de implicaties: elke verandering in het gast-OS, bibliotheken of gebruikersapplicaties betekent dat de paravirtualiseerde gast moet worden teruggedraaid, bijgewerkt en opnieuw geparavirtualiseerd.

    **Dagelijkse Beveiligingspatches: Onpraktisch voor Paravirtualisatie**

    In een tijd waarin dagelijkse beveiligingspatches gebruikelijk (en cruciaal) zijn, is paravirtualisatie simpelweg niet geschikt.

    **Ongewijzigde VM's: Belangrijke Voorwaarde**

    Het is belangrijk dat een VM een ongewijzigde versie van een echte machine is, die zichzelf kan bijwerken waar nodig.

    **VM-kopieën: Opslagruimte en RAM**

    Maar elke VM heeft zijn eigen kopie van een OS, applicaties en alle benodigde data. Een kleine gast gebruikt doorgaans 5-20 GB aan schijfruimte en 0,5-2 GB aan RAM.

    **Capaciteit van een Server**

    Dit betekent dat een fatsoenlijke server ongeveer tien VM's kan hosten. Als ze allemaal draaien, is dat waarschijnlijk meer dan genoeg, omdat ze elk minder dan tien procent van de CPU-capaciteit krijgen.

    **Servers in Ruststand**

    Veel servers slapen het grootste deel van de tijd (wachten op verzoeken).

    **Redundantie: Niet Optimaal**

    Redundantie is nooit optimaal: 10 kopieën van een OS is misschien 100 GB aan verspilde schijfruimte.
    :::

- **3.3. Containers, LXC**
    ::: details Antwoord
    **Host Resources Gebruik**

    OS, applicaties, beheersoftware, bibliotheken, documentatie, etc. worden gebruikt vanaf de host. Alleen configuraties, gast-specifieke applicaties en gebruikersdata worden bewaard bij elke CT.

    **Herbruik van Kernel**

    De draaiende kernel wordt hergebruikt. Linux heeft mechanismen die beperking en prioritering van resources mogelijk maken (CPU, geheugen, block I/O, netwerk, etc.).

    **Resource Beperkingen**

    **Geheugen**

    **CPU**

    **Block I/O**

    **Netwerk**
    :::

- **3.3.1. Mount**
    ::: details Antwoord
    **Directory Mounting in Linux**

    In Linux, een directory kan worden gemount op een andere directory. Er worden geen bestanden gekopieerd voor dit proces; de kernel onderhoudt een lijst van alle mount-punten en leidt bestandsaccess on-the-fly om.

    **Obscuring Original Directory**

    De originele directory waarop de nieuwe boom is gemount wordt verduisterd en is ontoegankelijk, maar blijft wel aanwezig. Zodra de nieuwe directory wordt unmounted, is de originele directory weer toegankelijk.

    **Example of Mounting**

    Bijvoorbeeld, directory /c/d kan worden gemount op directory /a/b, waarna een bestand /c/d/e ook kan worden gevonden als /a/b/e. Directory /a/b (en alle sub-bestanden en subdirectories) zijn ontoegankelijk totdat de directory weer wordt unmounted.
    :::

- **3.3.2. Namespaces**
    ::: details Antwoord

    **Mount Points**

  - **Mount Points:** Mount points kunnen worden gebruikt om directories op andere directories te monteren zonder bestanden te kopiëren, waardoor dynamische omleiding van bestandsaccess mogelijk is.

    **Resource Management met Cgroups**

  - **Cgroups:** Biedt mogelijkheden voor het meten, isoleren en beperken van middelen zoals CPU, geheugen, netwerk en schijf-I/O.

    **Inter-Process Communication (IPC)**

  - **IPC:** Beheert berichtenwachtrijen voor communicatie tussen processen.

    **Netwerkbronnen**

  - **Netwerk:** Beheert netwerkapparaten, stacks, poorten en andere netwerkbronnen.

    **Proces-ID's**

  - **PID:** Beheert proces-ID's voor procesbeheer.

    **Gebruikers-ID's**

  - **User:** Beheert gebruikers- en groeps-ID's.

    **Host- en Domeinnamen**

  - **UTS:** Beheert de hostname en NIS domeinnaam.

    **Namespaces voor Resource Isolation**

  - **Namespaces:** Een abstractielaag die globale bronnen omhult, waardoor processen specifieke mount points kunnen gebruiken en delen van het bestandssysteem voor andere processen kunnen verbergen.

    **Namespace-Isolatie**

  - **Isolatie:** Namespaces ondersteunen isolatie door de toegang van processen te beperken tot specifieke delen van het bestandssysteem en toegewezen middelen, waardoor processen alleen hun toegewezen omgeving kunnen gebruiken.

    **LXC-Isolatie en Efficiëntie**

  - **LXC-Isolatie:** Met namespaces zijn Linux Containers (LXC) beperkt tot hun toegewezen omgeving, beveiligd door de kernel om ongeoorloofde toegang te voorkomen.

  - **Geheugenefficiëntie:** Vergeleken met een VM gebruikt een LXC minder geheugen.
    :::
- **3.4. CT ≠ VM**
    ::: details Antwoord
    **VM Definition**

  - **VM Definitie:** Een VM is data die wordt gemanipuleerd door een gespecialiseerd programma (de hypervisor) dat bovenop of ingebed in een besturingssysteem draait.

    **CT Structuur**

  - **CT Structuur:** Een CT is een manier om het bestandssysteem en andere OS-functies te structureren zodat processen kunnen co-existeren met hun eigen gebruikers, rechten, data, etc. Vanuit hun eigen perspectief zijn CT's geïsoleerd.

    **Isolatie van Containers**

  - **Volledige Isolatie?** Nee: containers zijn (op dit moment) minder veilig dan VM's.
    :::

- **3.5. LXC Success Factors**
    ::: details Antwoord
    **LXC Success Factors**

  - **Voordelen van Linux Containers:** Linux containers hebben bijna alle voordelen van VM's zonder het grote nadeel: grootte.
  - **Gemakkelijke Verplaatsing van Containers:** Containers kunnen eenvoudig worden verplaatst => scheiding van hardware en software, leidend tot:
    - **Verbeterd Beheer en Operaties:** Verbeterd beheer en operaties.
    - **Schaalbaarheid:** Betere schaalbaarheid.
    - **Verbeterde Versiecontrole:** Verbeterde versiecontrole.
  - **Verbeterde Beveiliging:** In combinatie met infrastructuurvirtualisatie krijgen we betere beveiliging.
    :::

- **3.6. Libvirt**
    ::: details Antwoord
    **Ondersteuning van Veel VM- en LXC-oplossingen**

  - **Breed Ondersteuningsaanbod:** Ondersteunt vele VM- en LXC-oplossingen: KVM, Quemu, VMWare, Xen, ...
  - **Ondersteuning van Meerdere Hypervisors:** Ondersteunt vele hypervisors: LXC, Xen, VirtualBox, VMware, Hyper-V, OpenVZ (voorloper van LXC).
  - **Ondersteuning van Meerdere Gast-OS'en:** Ondersteunt vele gast-OS'en: Linux, Windows, Mac OSX, FreeBSD.
  - **Aanbieding van API's:** Biedt API's in Python, Perl, Ruby, Java, JavaScript (Node), PHP.
    :::

  - **3.6.1. Type 1 Hypervisors**
    - **3.6.1.1. KVM**
        ::: details Antwoord
        **Kernel-based Virtual Machine (KVM)**

        Kernel-based Virtual Machine (KVM) is een virtualisatie-infrastructuur voor de Linux-kernel die het omzet in een hypervisor. Een breed scala aan gastbesturingssystemen werkt met KVM, waaronder veel verschillende versies van Linux, BSD, Solaris, Windows, ReactOS, OS X en recentelijk ook Android.
        :::

    - **3.6.1.2. VMware**
        ::: details Antwoord
        **VMware**

        VMware biedt cloud computing- en platformvirtualisatiesoftware en -diensten aan. Het was het eerste commercieel succesvolle bedrijf dat de x86-architectuur virtualiseerde en biedt momenteel veel desktop- en OS-virtualisatieproducten aan.
        :::

    - **3.6.1.3. Xen**
        ::: details Antwoord
        **Xen Project**

        Xen Project is een hypervisor die een microkernel-ontwerp gebruikt. Xen Project is momenteel beschikbaar voor de IA-32, x86-64 en ARM instructiesets.

        **Microkernel**

        Een microkernel is een kleine OS die alleen de meest elementaire functionaliteit biedt om als hypervisor te draaien. Deze functionaliteit omvat het beheer van geheugenadressen op laag niveau, draadbeheer en interprocescommunicatie (IPC).
        :::

- **3.6.2. Type 2 Hypervisors**
  - **3.6.2.1. VirtualBox**
    ::: details Antwoord
    **VirtualBox**

    VirtualBox is een type 2 hypervisor voor x86-computers die momenteel wordt ontwikkeld door Oracle Corporation.

    **Ondersteunde Besturingssystemen**

    VirtualBox is geporteerd naar verschillende host-besturingssystemen, waaronder: Linux, MacOS, Windows en andere.
    :::

  - **3.6.2.2. VMware**
    ::: details Antwoord
    **VMware Workstation**

    VMware Workstation is een type 2 hypervisor die draait op x64-versies van Windows, MacOS en Linux-besturingssystemen en stelt ons in staat om virtuele machines (VM's) op een enkele fysieke machine in te stellen.
    :::

  - **3.6.2.3. Hyper-V**
    ::: details Antwoord
    **Microsoft Hyper-V**

    Microsoft Hyper-V is een inheemse type 1 / type 2 hypervisor.
    :::

- **3.7. LXC Alternatives**
    ::: details Antwoord

    **Andere Vormen van Virtuele Isolatie**

  - **FreeBSD Jails**
  - **Recentelijk, Windows Containers**
  - **MacOS / iOS Bieden Sandboxes**
  - **Docker**
  - **Sandstorm**
    :::

- **3.8. Sandstorm**
    ::: details Antwoord
    **Sandstorm**

    Het Sandstorm-ecosysteem is veel kleiner dan dat van Docker, maar het is nuttig om te begrijpen dat hoewel Docker zeer succesvol is, het slechts één technische benadering vertegenwoordigt.

    Sandstorm containeriseert gegevensobjecten. Elke Sandstorm-container beheert één enkel document.
    :::

- **3.9. Docker**
    ::: details Antwoord
    **Docker**

    Docker heeft LXC en andere ideeën zo succesvol gecombineerd dat 'Docker' nu synoniem wordt gebruikt met 'virtualisatie'!
    In de volgende workshop zullen we ons verdiepen in Docker.
    :::

## 4 Docker

- **4.1. Docker**
    ::: details Antwoord
    **Docker**

    Docker heeft LXC en andere ideeën zo succesvol gecombineerd dat 'Docker' nu synoniem wordt gebruikt met 'virtualisatie'! In de volgende workshop zullen we ons verdiepen in Docker.
    :::

- **4.2. Docker Success Factors**
    ::: details Antwoord
    **Docker Success Factors**

    **Immutable and Portable:** Eenmaal gemaakt verandert het niet. Je kunt het verplaatsen of schalen; elke instantie is identiek. Het is platformonafhankelijk; de 'development' versie en de 'production' versie zijn identiek.

    **Deployment Efficiency:** Implementatie duurt seconden. Hoge kwaliteit versiebeheer.

    **Consistency:** Een Docker-image die is gebouwd, getest en gepubliceerd, verandert niet meer. Als het werkt in de ontwikkelomgeving, werkt het ook in de productieomgeving.

    **Bug Fixing:** Fouten worden opgelost in nieuwe versies zonder impact op bestaande systemen. Oplossingen moeten de nieuwe component gebruiken.

    **Modularity:** Onafhankelijk van lokale bestanden of andere applicaties/containers (behalve via REST API's). Afhankelijkheden zijn expliciet, wat leidt tot lichte, modulaire, herbruikbare, schaalbare en veilige oplossingen.
    :::

- **4.3. Docker Development Process**
    ::: details Antwoord
    **The Docker Process**

    Het Docker-proces beschrijft de creatie en het gebruik van Docker-gebaseerde software gedurende de hele levenscyclus.

    **Ontwikkeling en testen**

    Binnen een Docker-container draait gewone software die ontworpen, ontwikkeld en getest wordt zoals gebruikelijk.

    **Container configuratie en integratietesten**

    Vervolgens wordt een container geconfigureerd, gebouwd en getest samen met andere containers in de volledige stack.

    **Publicatie en installatie**

    Na voltooiing van de integratietesten wordt de container gepubliceerd en kan deze in een operationele omgeving worden geïnstalleerd.

    **Data persistentie**

    Docker biedt verschillende manieren om data te bewaren, zoals Docker Volumes, omdat containers draagbaar en onveranderlijk zijn.
    :::

- **4.4. Docker Engine**
    ::: details Antwoord
    **Docker Engine**

    Om een Docker-container te draaien, hebben we een host nodig met de Docker Engine, die eenvoudig te installeren is op de meeste Linux-distro's.

    **Specifieke Linux-distro's**

    Er bestaan distro's speciaal voor het hosten van Docker-containers, zoals RancherOS.

    **Native implementaties**

    Native implementaties voor Windows en MacOS zijn beschikbaar via docker.com.

    **Hoofdfunctionaliteiten**

    Docker Engine vervult drie hoofdfuncties:

    **Run Docker containers**

    Het draaien van Docker-containers.

    **Build Docker containers**

    Het bouwen van Docker-containers.

    **Manage All running Docker containers**

    Het beheren van alle draaiende Docker-containers op de host, inclusief netwerken en lokale persistentie (Volumes).
    :::

- **4.5. Docker Images?**
    ::: details Antwoord
    Voor veel doeleinden zijn er al images beschikbaar. Bijvoorbeeld, het commando

    ```yaml
    Unable to find image 'ubuntu:latest' locally

    latest: Pulling from library/ubuntu
    d5c6f90da05d: Pull complete
    1300883d87d5: Pull complete
    ...
    dc27a084064f: Pull complete
    Digest: sha256:34471448724419596ca4e890496d375801de21b0e67b81a77fd6155ce001edad
    Status: Downloaded newer image for ubuntu:latest
    hello world
    ```

    :::

- **4.6. What happened?**
    ::: details Antwoord
    Het `docker run`-commando probeert een container te starten. Als er geen image voor de Ubuntu-container aanwezig is, wordt deze gedownload van de online bibliotheek.

    Wanneer het image wordt gestart, wordt de opdrachtregel naar de container gestuurd.

    `/bin/echo` is een standaard Linux-opdracht die zijn invoer naar de uitvoer echoot.

    De rest van de opdrachtregel wordt als invoer aangeboden.

    De uitvoer wordt teruggestuurd naar de Docker Engine (die het echo't).

    Nadat de opdracht is voltooid, wordt de Docker-container verwijderd.
    :::

- **4.7. Example. Grav: simple CMS**
    ::: details Antwoord
    **Voorbeeld: Grav - eenvoudig CMS**

    **Starten van een Grav Docker-container**

    Een Grav Docker-container kan worden gestart met:

    ```bash
    docker run -d -p 80:80 --name grav oleglab/grav:latest
    ```

    **Gebruik van de -d optie**

    De `-d` optie draait de container als een daemon: het wacht op verzoeken op poort 80 en zal normaal gesproken nooit stoppen.

    **Port forwarding**

    De `-p 80:80` optie vertelt Docker Engine om de hostpoort 80 te verbinden met poort 80 van deze container.

    **Content toevoegen**

    Hoe voeg je inhoud toe aan deze site? Een manier is om `docker exec` te gebruiken, wat de engine vertelt om een (shell) commando in de container uit te voeren.

    **Alternatieve manieren**

    Er zijn minder ad-hoc manieren om content toe te voegen aan de site.

    **Interactieve shell**

    Met `docker exec -it CTnaam bash` probeer je een bash-shell te openen in de container met de naam CTnaam. Let op dat de meeste containers `sh` hebben, dus `docker exec -it CTnaam sh` is een veilige gok.
    :::

- **4.8. Docker Hub(s)**
    ::: details Antwoord
    **Verschillende repositories voor Docker-images**

    **Docker Hub**

    Docker Hub is het originele repository onderhouden door Docker Inc voor de gemeenschap.

    **github.com/docker-library**

    github.com/docker-library is ook een repository waar verschillende 'officiële images' worden onderhouden (zoals Python, PHP, Nginx).

    **Individuele en organisatorische aanbieders**

    Individuen en organisaties bieden ook Docker-images aan voor hun producten via GitHub.

    **Image maken met Docker Engine**

    Als een image (nog) niet beschikbaar is, kan Docker Engine er een voor je maken.
    :::

- **4.9. Docker Hub (top 9)**
    ::: details Antwoord
    **Docker Hub (top 9)**

    Hier zijn de top 9 Docker Hub-images op dit moment:

    1. **nginx**: Een populaire webserver voor het hosten van webapplicaties.
    2. **mysql**: Een relationele databasebeheersysteem.
    3. **redis**: Een in-memory datastructuurwinkel, vaak gebruikt als cache of berichtenwachtrij.
    4. **mongo**: Een documentgeoriënteerde database, bekend om zijn flexibiliteit en schaalbaarheid.
    5. **python**: Een veelgebruikte programmeertaal, vaak gebruikt voor het ontwikkelen van webapplicaties en scripts.
    6. **alpine**: Een lichte Linux-distributie die veel wordt gebruikt als basisimage voor Docker-containers.
    7. **node**: Een JavaScript-runtime die wordt gebruikt voor het bouwen van server-side applicaties.
    8. **ubuntu**: Een populaire Linux-distributie, vaak gebruikt als basisimage voor Docker-containers.
    9. **postgres**: Een relationele databasebeheersysteem, bekend om zijn betrouwbaarheid en krachtige functies.
    :::

- **4.10. Docker build**
    ::: details Antwoord
    **Docker Hub (top 9)**

    Hier zijn de top 9 Docker Hub-images op dit moment:

    1. **nginx**: Een populaire webserver voor het hosten van webapplicaties.
    2. **mysql**: Een relationele databasebeheersysteem.
    3. **redis**: Een in-memory datastructuurwinkel, vaak gebruikt als cache of berichtenwachtrij.
    4. **mongo**: Een documentgeoriënteerde database, bekend om zijn flexibiliteit en schaalbaarheid.
    5. **python**: Een veelgebruikte programmeertaal, vaak gebruikt voor het ontwikkelen van webapplicaties en scripts.
    6. **alpine**: Een lichte Linux-distributie die veel wordt gebruikt als basisimage voor Docker-containers.
    7. **node**: Een JavaScript-runtime die wordt gebruikt voor het bouwen van server-side applicaties.
    8. **ubuntu**: Een populaire Linux-distributie, vaak gebruikt als basisimage voor Docker-containers.
    9. **postgres**: Een relationele databasebeheersysteem, bekend om zijn betrouwbaarheid en krachtige functies.
    :::

- **4.11. Dockerfile**
    ::: details Antwoord
    **Dockerfile voor het bouwen van een MongoDB-server**

    Hier is een Dockerfile die beschrijft hoe een MongoDB-server wordt gebouwd vanuit een schone Ubuntu-server:

    ```bash
    FROM ubuntu:latest

    RUN apt-get update && apt-get install -y mongodb

    CMD ["mongod"]
    ```

    **Gebruik van `docker build`**

    Je kunt het `docker build`-commando gebruiken om een image te bouwen met behulp van deze Dockerfile. Tijdens het bouwproces volgt Docker een eenvoudig patroon: het onderhoudt een container waarin het één commando uitvoert vanuit de Dockerfile. Dit resulteert in de volgende container, waarin de volgende regel wordt toegepast, en zo verder.

    **Overzicht van Dockerfile-opdrachten**

    Hier is een kort overzicht van enkele veelvoorkomende Dockerfile-opdrachten:

  - `FROM`: Geeft het basisimage aan waarop gebouwd moet worden.
  - `RUN`: Voert een commando uit tijdens het buildproces.
  - `CMD`: Specificeert het standaard commando dat moet worden uitgevoerd wanneer de container wordt gestart.
  - `COPY` / `ADD`: Kopieert bestanden van de host naar de container.
  - `EXPOSE`: Geeft aan welke poorten de container moet openen en beschikbaar moet stellen.
  - `WORKDIR`: Stelt de werkdirectory in voor daaropvolgende instructies.
  - `ENV`: Stelt omgevingsvariabelen in binnen de container.

    Merk op dat dit geen vervanging is voor de officiële documentatie van Docker; er bestaan meer opdrachten en varianten van opdrachten.
    :::

  - **4.11.1. FROM name**
    ::: details Antwoord
    **FROM-opdracht**

    De `FROM`-opdracht in een Dockerfile begint met het bouwen van een nieuw image. Het opgegeven `name` identificeert het image in het repository waarvan de Docker-engine moet starten met bouwen.
    :::

- **4.11.1.2. RUN command**
    ::: details Antwoord
    **RUN-opdracht**

    De `RUN`-opdracht in een Dockerfile voert het gespecificeerde commando uit in de container die wordt gebouwd.
    :::

- **4.11.1.3. Label key=value ...**
    ::: details Antwoord
    **Label-opdracht**

    Met de `LABEL`-opdracht in een Dockerfile kun je metadata toevoegen aan de container die wordt gebouwd. Deze metadata bestaat uit sleutel-waardeparen en biedt contextuele informatie over de container.
    :::

- **4.11.1.4. EXPOSE port ...**
    ::: details Antwoord
    **EXPOSE-opdracht**

    Met de `EXPOSE`-opdracht in een Dockerfile kun je poorten blootstellen op de container. Processen binnen de container moeten communicatie op deze poorten afhandelen. Alle andere poorten zijn gesloten en ontoegankelijk van buitenaf.
    :::

- **4.11.1.5. ENV key=value ...**
    ::: details Antwoord
    **ENV-opdracht**

    Met de `ENV`-opdracht in een Dockerfile kun je omgevingsvariabelen instellen in de gebouwde container. Deze variabelen worden tijdens de uitvoering van de container gebruikt om specifieke configuratie-instellingen of gedragingen aan te passen.
    :::

- **4.11.1.6. ADD src ... dest**
    ::: details Antwoord
    **ADD-opdracht**

    Met de `ADD`-opdracht in een Dockerfile kun je bestanden kopiëren van de machine die wordt gebruikt om het image te bouwen naar de container die wordt gebouwd. Dit is de manier om statische inhoud in een image te krijgen. Merk op dat `src` een archief kan zijn (dat dan wordt uitgepakt), of een URL (waarvan de inhoud wordt opgehaald).

    Er bestaat ook een commando `COPY` met een vergelijkbare betekenis, maar dit is minder veelzijdig en wordt daarom minder gebruikt.
    :::

- **4.11.1.7. CMD command**
    ::: details Antwoord
    **CMD-opdracht**

    Met de `CMD`-opdracht in een Dockerfile geef je aan welk commando moet worden uitgevoerd wanneer een instantie van het image wordt gestart. Dit commando wordt uitgevoerd nadat het image is voltooid en een container wordt gestart.

    Merk op dat dit hoogstens één commando is, meestal om de hoofdservice te starten. Als er meer dan één commando nodig is, kunnen deze worden opgenomen in een uitvoerbaar shellscript.
    :::

- **4.11.1.8. ENTRYPOINT**
    ::: details Antwoord
    **ENTRYPOINT-opdracht**

    Met de `ENTRYPOINT`-opdracht in een Dockerfile geef je aan welk commando moet worden uitgevoerd wanneer een instantie van het image wordt gestart. Dit commando wordt uitgevoerd nadat het image is voltooid en een container wordt gestart.

    Merk op dat dit hoogstens één commando is, meestal om de hoofdservice te starten. Als er meer dan één commando nodig is, kunnen deze worden opgenomen in een uitvoerbaar shellscript.

    Wanneer je `docker run image` uitvoert zonder argumenten, moeten zowel CMD als ENTRYPOINT gedefinieerd zijn, en zal er een van beide worden gebruikt.
    :::

- **4.11.1.9. VOLUME directory**
    ::: details Antwoord
    **VOLUME-opdracht**

    Met `VOLUME directory` in een Dockerfile creëer je een aankoppelpunt in de container. Dit zorgt voor het maken van een persistent volume door Docker Engine bij instantiatie van het image. Dit volume overleeft het einde en/of herstart van de container.
    :::

- **4.11.1.10. USER**
    ::: details Antwoord
    **USER**

    Met de `USER`-opdracht in een Dockerfile stel je de gebruiker en groep in die worden gebruikt bij het uitvoeren van het image.
    :::
- **4.11.1.11. WORKDIR**
    ::: details Antwoord
    **WORKDIR-opdracht**

    Met de `WORKDIR`-opdracht in een Dockerfile kun je de werkdirectory instellen waarin daaropvolgende `RUN`-opdrachten worden uitgevoerd.
    :::

- **4.12. Docker-compose**
    ::: details Antwoord
    **Docker-compose**

    De `docker run ...` opdracht werkt goed voor individuele containers, maar sommige toepassingen bestaan uit meerdere samenwerkende containers.

    **Gebruik van docker-compose**

    Wanneer `docker run` te complex wordt, kan docker-compose worden gebruikt. Het maakt gebruik van een gestructureerd configuratiebestand (gebruikmakend van Yaml) om te beschrijven welke containers, volumes en netwerken moeten worden gemaakt, en hoe.
    :::

- **4.13. Getting Started 1**
    ::: details Antwoord
    **Eerst: Docker Engine installeren**

    Eerst: zorg ervoor dat je een Docker Engine hebt draaien in een omgeving waar je comfortabel mee bent.

    Sinds een jaar bestaat Docker Engine natively op Windows en Mac.

  - Als alternatief kun je je favoriete Linux-distributie onder VirtualBox (of een ander VM-platform) creëren en daar Docker installeren.
  - Of je kunt een uitdaging aangaan en RancherOS of CoreOS op VirtualBox installeren en dat als productiesysteem gebruiken.
    :::

    - **4.13. Getting Started 2**
    ::: details Antwoord
    **Ontwikkelomgeving opzetten**

    **Gebruik Docker-containers**

    Interessant genoeg zijn Docker-containers beschikbaar voor dit doel.

    **Kies je vertrouwde omgeving**

    Gebruik de omgeving waar je comfortabel mee bent; verkrijg een ontwikkelingscontainer; of creëer een omgeving hiervoor.

    <https://blog.codeship.com/cross-platform-docker-development-environment/>
    :::

    - **4.13. Getting Started 3**
    ::: details Antwoord
    **Instructies voor het maken van je eerste Docker-container**

  Volg deze instructies om je eerste Docker-container te maken: [link naar de Docker-documentatie](https://docs.docker.com/get-started/02_our_app/#dockerfile)
    :::

- **4.16. Isolation**
    ::: details Antwoord
    **UnionFS in Docker Containers**

    **UnionFS in Docker Containers**

    UnionFS is een Linux/Unix-bestandssysteem dat het mogelijk maakt om bestanden en mappen van afzonderlijke bestandssystemen (takken) transparant te overlappen. Verschillende takken kunnen RO (read-only) of RW (read-write) zijn.

    **Werking van Docker UnionFS**

    Elke Docker-container begint met de RO-tak in het image die wordt overlapt met een RW-tak voor alle draaiende gegevens. Deze tak gaat verloren wanneer de container eindigt.

    **Voorbeeld van UnionFS-functionaliteit**

    Als voorbeeld, stel dat de bestanden /a/b en /a/c bestaan en dat de eerste map a RO is en RW wordt overlapt met de tweede map a. In de verenigde map zijn b en c aanwezig. Als b wordt bewerkt, wordt er een kopie van b gemaakt en gewijzigd; het origineel blijft ongewijzigd. Als het bestand c wordt gewijzigd, zijn die wijzigingen ook zichtbaar in de originele map /a/. Wanneer een nieuw bestand d wordt gemaakt in a, verschijnt dat bestand in de verenigde map maar ook in de map waarin c verscheen.
    :::

- **4.17. Persistance**
    ::: details Antwoord
    **Persistentie**

    **Geen standaard persistentie in Docker-containers**

    Een Docker-container kan privégegevens bevatten, maar wanneer deze crasht, gaat alles verloren. Docker-containers bieden geen standaard persistentie.

    **Gebruik van Docker-volumes**

    Een Docker-volume is een bestand of map die onafhankelijk bestaat van andere containers, die in elke container kan worden gemonteerd (wanneer deze wordt gestart) en die niet wordt verwijderd of gewijzigd wanneer de container wordt verwijderd of opnieuw wordt geïnstalleerd.

    **Gebruik van `docker run -v`**

    Met `docker run -v [src:]dst[opt] ...` wordt dst verklaard als een volume in de container (dwz persistent). Als src een directory is, wordt die directory op de host gebruikt; anders wordt er een directory aangemaakt. Als src een naam is, kan een andere container hetzelfde volume delen (effectief gebruikmakend van een gedeelde directory). Opties kunnen ervoor zorgen dat een volume alleen-lezen wordt gemonteerd.

    **Beperkingen van volumes**

    Volumes maken het mogelijk dat gegevens de container overleven, maar:

  - Wanneer de container naar een andere host in een cluster wordt verplaatst, worden de gegevens niet automatisch verplaatst.
  - Volumes vereisen extra aandacht om draagbaarheid mogelijk te maken.

    **Mogelijkheid tot gegevensverlies**

  - Bij een crash van de host kunnen gegevens nog steeds verloren gaan. Er zijn echter back-upoplossingen die volumes en hostdirectories naar externe opslagplaatsen kunnen back-uppen.
    :::

- **4.19. Networking**
    ::: details Antwoord
    **Netwerkmodi in Docker**

    **host-modus**

    In de host-modus gebruikt de container de NIC van de host rechtstreeks.

    **bridge-modus**

    In de bridge-modus gebruikt de container een intern netwerk dat naar de host kan worden gebrugd (met behulp van NAT). Dit is de standaardmodus.

    **none-modus**

    In de none-modus gebruikt de container zijn eigen netwerk zonder een brug.

    **overlay-modus**

    Voor oplossingen met meerdere hosts communiceren hosts met een key-value store om een overlay-netwerk te configureren (gebaseerd op VXLAN).
    :::

## 5. Intermezzo: REST

- **5.1. Internet, WWW, HTTP, REST**
    ::: details Antwoord
    **Internet, WWW, HTTP, REST**

    **Ontstaan van het Internet**
    Rond 1960 begon het onderzoek naar pakketomschakeling, en rond 1970 ontstond 'het internet' uit een groeiend aantal onderling verbonden lokale netwerken.

    **De geboorte van het World Wide Web**
    In 1989 werd het World Wide Web bedacht als een (wereldwijd) gedistribueerd informatiesysteem met leesbare tekstdocumenten die hyperlinks bevatten.

    **Ontwikkeling van HTTP en REST**
    Vanaf 1990 werd HTTP ontwikkeld, om in 1996 te worden geformaliseerd in v1.0. Rond 2000 werkte een van de ontwikkelaars, Roy Fielding, aan v1.1 en creëerde het architecturale model REST (Representational State Transfer).

    **Principe van Representational State Transfer**
    De naam 'Representational State Transfer' suggereert dat een applicatie door de gebruiker wordt gezien als een verzameling webpagina's, waarbij een actie op de ene pagina de gebruiker naar een andere pagina overbrengt.

    **Implementatie van HTTP en REST**
    Merk op dat REST aan de basis staat van HTTP, maar een server die HTTP gebruikt, implementeert niet noodzakelijk REST.
    :::

- **5.2. Presentation, Tiers and MV**
    ::: details Antwoord
    **Presentation, Tiers and MV***

    **De rol van 'presentation'**
    Tot nu toe is het woord 'presentatie' niet gebruikt. HTTP zegt niet wat er met de gegevens moet gebeuren. Maar het bekendste voorbeeld is webbrowsen, waarbij de gegevens HTML en multimedia betreffen.

    **Gebruik van HTTP**
    Wanneer je een http:// -URL invoert in je browser, zal de browser een HTTP GET-bericht verzenden, en wanneer je een HTML-formulier uploadt, zal de browser een HTTP POST-bericht verzenden.

    **Gebruik in back-end systemen**
    Maar HTTP wordt ook gebruikt door back-endsystemen die informatie uitwisselen.
    :::

  - **5.2.1. MV**
    ::: details Antwoord
    **MV***

    Met uitzondering van eenvoudige websites zijn veel moderne websites gestructureerd met het MV* patroon (wat MVC, MVP en andere patronen omvat).

    **View en Model**
    In dit patroon staat M voor Model en V voor View. 'View' is verantwoordelijk voor het presenteren van informatie, terwijl 'Model' verantwoordelijk is voor het opslaan en manipuleren van informatie.

    **Overlay voor multi-host oplossingen**
    Voor multi-host oplossingen wordt het overlaypatroon gebruikt, waarbij hosts communiceren met een key-value store om een overlay netwerk te configureren.

    In zeer grote installaties kunnen de verschillende delen op verschillende servers worden geïmplementeerd. De 'view' server is een webserver die HTTP met de eindgebruiker communiceert, terwijl de 'model' server een dataserver kan zijn die helemaal niet met de eindgebruiker communiceert.

    **Communicatie tussen view-server en model server**
    Voor de communicatie tussen de view-server en de model server is HTTP goed geschikt, en veel van de 'restful' kenmerken zijn nuttig.
    :::

- **5.2.2. Tiers**
    ::: details Antwoord
    **Tiers**

    **Multi-tier design patronen**
    Grote applicaties worden vaak ontworpen met behulp van multi-tier design patronen (die voor het internet bestonden). Een 3-tier systeem kan lagen hebben voor Presentatie, Data en Bedrijfslogica.

    **Verantwoordelijkheden van elke laag**
    Presentatie is verantwoordelijk voor wat de eindgebruiker (werknemer, klant, ...) ziet, terwijl Data verantwoordelijk is voor het opslaan van informatie, bijvoorbeeld in databases. De tussenliggende laag wordt 'Bedrijfslogica' genoemd omdat hierin de regels en procedures van de organisatie zijn gecodeerd.

    **Vergelijking met MV***
    Hoewel dit lijkt op MV*, richt MV*zich vooral op presentatie, en 'controls' of 'presenters' zijn erg klein en hebben alleen betrekking op het bijwerken van het view-model op basis van UI-actie, niet op bedrijfslogica in het algemeen. Vaak is de presentatielaag zelf gestructureerd met het MV* patroon.

    **Waarom deze lagen belangrijk zijn**
    De wijsheid in deze lagen is duidelijk:

  - Marketeers willen vaak de uitstraling van een applicatie regelmatig veranderen.
  - Databases groeien en hebben continu updates en onderhoud nodig.
  - Bedrijfslogica verandert alleen bij procedurele veranderingen.

    In grote organisaties worden de verschillende lagen vaak geïmplementeerd op verschillende systemen, en HTTP is een geschikt communicatiemiddel tussen de lagen.
    :::

- **5.3. HTTP**
    ::: details Antwoord
    **HTTP**

    **Resource management**
    HTTP gaat over resourcebeheer (aanmaken, ophalen, wijzigen, vernietigen).

    **Algemene HTTP-patroon**
    In de geest van REST gaat de naam van het Hypertext Transfer Protocol (HTTP) niet zozeer over het overbrengen van hypertext als wel over het overbrengen van de gebruiker naar een andere applicatiestatus.

    **Gebruikersinteractie**
    Van hieruit kunnen we het algemene HTTP-patroon afleiden: de gebruiker initieert een actie, wat resulteert in een HTTP-bericht dat naar de server wordt gestuurd, waar de server reageert met de nieuwe applicatiestatus.

    **Statelessness**
    Restful-systemen zijn stateless, dus de server 'onthoudt' deze applicatiestatus niet.

    **Gegevensopslag**
    Als er iets moet worden onthouden, moet het worden opgeslagen in de client, vandaar cookies.
    :::

- **5.3.1. URL, URI, URN**
    ::: details Antwoord
    **URL, URI, URN**

    **Locating Resources**
    HTTP beschrijft niet wat voor soort resources worden beheerd, maar wel waar ze zich bevinden.

    **URL en URI**
    Een URL (Uniform Resource Locator) is een belangrijk concept voor het web. Een URI (Uniform Resource Identifier) is een tekenreeks die een naam of een bron op internet identificeert. Een URL is een speciale URI, die niet alleen de naam definieert, maar ook de manier om toegang te krijgen tot de bron.

    **Voorbeeld**
    Bijvoorbeeld: <http://rooster.hva.nl> is een URL, terwijl rooster.hva.nl dat niet is.

    **URN**
    Een URI die geen URL is maar alleen een naam, wordt een URN (Uniform Resource Name) genoemd.
    :::

- **5.3.2. Verbs**
    ::: details Antwoord
    **Verbs**

    **GET**
    GET: haal de bron op die wordt geïdentificeerd door de URI. De reactie bevat de bron (zoals de inhoud van een HTML-bestand), of, als het een actie is, het resultaat dat door die actie wordt geproduceerd (zoals de uitvoer van een uitgevoerd PHP-bestand).

    **PUT**
    PUT: wijzig een bestaande bron of maak een nieuwe (als de client de nieuwe URI mag kiezen (als de server nieuwe URI's moet kiezen, gebruik dan POST)).

    **POST**
    POST: maak een nieuwe bron aan. De reactie bevat de URI voor de nieuwe bron.

    **DELETE**
    DELETE: vernietig de bron.
    :::

- **5.3.3. Restfull Applications**
    ::: details Antwoord
    **REST (Representational State Transfer)**
    Hoewel REST vaak wordt gebruikt voor het implementeren van CRUD-operaties (Create, Read, Update, Delete) op resources, is het meer dan alleen dat. Het biedt een gestandaardiseerde manier om resources te benaderen en te manipuleren via een uniforme interface, waardoor interoperabiliteit, schaalbaarheid en flexibiliteit worden bevorderd.

    **RESTful Applications**

    Het maken van applicaties RESTful heeft veel voordelen. Een van de vereisten is bijvoorbeeld dat een GET-bericht geen neveneffecten heeft. Als dat het geval is, is het mogelijk om schaling te bereiken door veel servers toe te staan GET-berichten te verwerken. Neveneffecten zouden die aanpak aanzienlijk compliceren.

    **REST-beperkingen**

    *Uniforme Interface*
    HTTP biedt een interface voor het maken, ophalen, wijzigen en vernietigen van willekeurige bronnen over een TCP/IP-netwerk. Het gebruik van de uniforme interface maakt onafhankelijke ontwikkeling en onderhoud van componenten en subsystemen mogelijk.

    **Stateless**
    REST-servers zijn stateless: er is geen noodzaak om na te denken over sessies of andere transacties. Schaling kan worden bereikt door parallelisme (van threads tot servers).

    **Cachebaar**
    REST moet cachebaar zijn. Omdat GET geen neveneffecten heeft, kan het resultaat worden gecachet totdat de bron zelf verandert, wat het nettoverkeer aanzienlijk vermindert. Dit is een belangrijk voordeel van REST ten opzichte van RPC (Remote Procedure Calls).
    :::

- **5.4. Further Reading**
    ::: details Antwoord
    **Further Reading**

    Voor meer informatie over HTTP en multi-tier systemen, bekijk de 'WorkshopREST'.

    Een interessante gids is te vinden op <http://www.restapitutorial.com/media/RESTful_Best_Practicesv1_1.pdf>.
    :::

## 6. Practicum

- **6.1. Rest Servers: Prisoner’s Dilemma & Tit-for-Tat**
    ::: details Antwoord
    In dit practocum zullen we een aantal eenvoudige REST-servers ontwikkelen en testen en we zullen ze bouwen en in gebruik nemen als docker containers.
    :::
- **6.2. Inleiding**
    ::: details Antwoord
    **Het Prisoner’s Dilemma**

    **Het concept**
    Het Prisoner’s Dilemma is een bekend filosofisch vraagstuk waarbij twee verdachten onafhankelijk ondervraagd worden.

    **Het Iteratieve Prisoner's Dilemma**
    Het Iteratieve Prisoner's Dilemma is een idee uit de speltheorie waarbij twee handelaren herhaald goederen uitwisselen.

    **Tit-for-tat strategie**
    Tit-for-tat is een winnende strategie bij het Iteratieve Prisoner's Dilemma, waarbij een handelaar het gedrag van zijn tegenstander in de vorige ronde kopieert.

    **Het experiment**
    Rond 1980 is er een groot experiment uitgevoerd rond het iteratieve prisoner's dilemma, waarbij deelnemers programma's konden inzenden met strategieën voor handelaren.

  - it-for-tat is constructief en zal in eerste instantie goederen sturen:

  - Maar als een opponent geen goederen stuurt zal tit-for-tat dat in de volgende ronde ook niet doen.
  - Zolang de opponent geen goederen stuurt zal tit-for-tat dat ook niet doen.
  - Zodra de opponent goederen stuurt zal tit-for-tat dat (in de volgende ronde) ook weer doen.
  - Dit komt er op neer dat tit-for-tat het gedrag van de opponent uit de vorige ronde kopieert.

    **Practicum**
    In dit practicum gaan we dit experiment bouwen door een aantal servers te ontwikkelen die zich als handelaren gedragen en we meten gedurende enige tijd hoe succesvol elke handelaar is ten opzichte van de andere handelaren.
    :::

- **6.3. Servers die het experiment uitvoeren**
    ::: details Antwoord
    We kunnen het experiment bouwen met drie soorten servers:

  - de Game Master (die handelaren in contact brengt en die statistieken bijhoudt)
  - de Handelaren
  - Postbussen (die steeds de handel tussen twee handelaren reguleren)
    :::
  - **6.3.1. Handelaar**
    ::: details Antwoord
    Een Handelaar vertoont het volgende gedrag:

    - meld je aan bij de Game Master
    - (*) een Postbus brengt je in contact met een andere handelaar
    - start een handels-sessie. In elke sessie
      - besluit of je wel of niet handelswaar stuurt aan de Postbus
      - van de postbus krijg je te horen of de andere handelaar handelswaar heeft gestuurd
      - van de postbus krijgt de handelaar te horen of de sessie doorgaat of wordt beëindigd
      - als ie doorgaat: herhaal de stappen in de sessie
    - de sessie is beëindigd; wacht op een bericht van een postbus (*)
    :::
  - **6.3.2. Postbus**
    ::: details Antwoord
    Een postbus vertoont het volgende cyclische gedrag:

    - meldt zich aan bij de Game Master

    - krijgt stuur-informatie zoals adressen van twee handelaren en de lengte van een sessie
    - start een handelssessie
      - krijgt van twee handelaren wel of niet handelswaar
      - geeft het resultaat door aan de handelaren
      - stelt de sessie-statistiek bij
      - als de sessie doorgaat: herhaal de stappen
    - De sessie is beëindigd; stuur statistieken aan de Game Master
    - herhaal

    Een postbus vertoont het volgende cyclische gedrag:
    pretify
    :::

- **6.3.3. Game Master**
    ::: details Antwoord
  - meldt zich aan bij de Game Master
    - accepteer verzoeken van Postbussen
    - als de postbus statistieken rapporteert, verwerkt deze in de globale telling
    - plaats inactieve postbussen in een queue
  - accepteer verzoeken van Handelaren en plaatst ze in een queue
  - Als de queue met handelaren minstens 2 lang is en de queue met postbussen minstens 1:
    - maak ze in contact en start de sessie
    - accepteer een verzoek van ons om de statistieken tot nu toe te geven
  - accepteer een verzoek van ons om de hele sessie te herstarten
    :::

- **6.4. Functioneel en Technisch Ontwerp GameMaster**
    ::: details Antwoord
    Als eerste component zullen we de Game Master bouwen, omdat de andere componenten pas getest kunnen worden als de Game Master reeds bestaat.
    :::

  - **6.4.1. Game Master Services**
    Uit de beschrijving van de Game Master halen we de volgende services:

    ::: details Antwoord
    - /handelaar
    Een Handelaar meldt zich aan
    - /postbus
    Een Postbus meldt zich voor dienst
    - /statistics
    Een postbus geeft statistieken van de laatste sessie
    - /report
    Rapporteer alle statistieken tot nu toe
    - /reset
    Zet alle statistieken op nul en stuur alle Handelaren en Postbussen een reset opdracht

    Het moet je opvallen dat van deze services, de report service zinvol gebruikt kan worden nog voordat
    de andere servers draaien. We kiezen dus die service als eerste om de server te testen
    :::

  - **6.4.2. Game Master Data**
    ::: details Antwoord
    Uit de beschrijving van de Game Master halen we dat deze de volgende data moet bijhouden:

    Handelaren
    Een lijst van alle handelaren (moeten we bijhouden om de reset boodschap te kunnen sturen)
    - Postbussen
    Een lijst van alle postbussen (moeten we bijhouden om de reset boodschap te kunnen sturen)
    - InactieveHandelaren
    Een lijst van alle inactieve handelaren (moeten we bijhouden om een sessie te kunnen starten)
    - InactievePostbussen
    Een lijst van alle inactieve postbussen (moeten we bijhouden om een sessie te kunnen starten)
      - Statistieken
      - Aantal ronden totaal
      - Per Handelaar:
        - Aantal ronden
        - Winst/verlies
    - Constanten
    In het experiment worden enkele waarden gebruikt door alle componenten: het aantal ronden per
    handels-sessie, winst/verlies waarden. Een goede oplossing is, om deze waarden via de Game
    Master aan de componenten te geven.
    :::
- **6.5. Intermezzo -- Ontwikkelomgeving**
    ::: details Antwoord
    **Wat is een Docker container?**

    Een Docker-container is een applicatie die als container is verpakt.

    **Ontwikkelomgeving opzetten**

    Voordat je de container bouwt, moet je ervoor zorgen dat de applicatie werkt. Dit vereist het opzetten van een ontwikkelomgeving voor de applicatie, zoals een REST-server.

    **JavaScript Ontwikkeling**

    Als je in JavaScript ontwikkelt, zijn er verschillende opties:

  - **Express:** Oud en vertrouwd.
  - **Restify:** Snel, maar kan versieproblemen hebben.
  - **Koa:** Mooi, maar vereiste voorheen nieuwe JavaScript-technieken die niet overal werden ondersteund.
  - **Hapi:** Langzamer, maar leidt tot inzichtelijke code.

    **Python Ontwikkeling**

    Als je in Python ontwikkelt, zijn de mogelijke opties:

  - **Bottle:** Minimale oplossing geschikt voor kleine servers.
  - **Flask:** Meer uitgebreid en uitbreidbaar, geschikt voor veel situaties.
  - **Django:** Groot raamwerk gebruikt in enterprise-oplossingen.

    **Voorbeeldimplementatie**

    We zullen eerst een voorbeeldserver bouwen in JavaScript met Hapi, en vervolgens een server in Python met Bottle. Maar je kunt elke keuze maken die voor jou werkt!
    :::

- **6.6. Adressering**
    ::: details Antwoord
    **Adressering in Docker voor REST API's**

    Bij het testen en uitrollen van REST API's via Docker moeten we rekening houden met adressering (IP-nummers en poorten).

  - **Ontwikkelplatform:**
    Op het ontwikkelplatform hebben alle servers hetzelfde IP-nummer (dat van de server) en moeten ze dus verschillende poorten gebruiken om te communiceren.

  - **Docker-omgeving:**
    In de Docker-omgeving hebben alle servers verschillende IP-nummers om te communiceren, mogelijk met verschillende poorten.

    De IP-nummers van de Docker-containers zijn niet van tevoren bekend. In onze opzet moet echter één IP-nummer bekend zijn: dat van de GameMaster. De andere servers melden zich eerst bij de GameMaster en geven hun actuele IP-nummer door.

    Hoe het adres van de GameMaster wordt doorgegeven aan de andere servers gebeurt via een 'Environment Variable'. In Linux en macOS zijn alle zogenaamde Shell Variables toegankelijk als environment variable. Een shell variable krijgt als volgt een waarde die in een server 'gelezen' kan worden.

    ```bash
    export naam=waarde
    ```

    We gebruiken dit mechanisme op twee manieren:

  - **Platformkeuze en Python-ontwikkeling:**
    - Kies een platform waar je je thuis voelt.
    - Bij Python-ontwikkeling:
      - Download Python van <https://www.python.org/downloads/>.
      - Let op: veel systemen zoals macOS hebben al een Python-versie die in het OS zelf gebruikt wordt, maar dit is vaak een oude versie. Installeer daarnaast de nieuwe Python 3.6 (?).
      - Gebruik een raamwerk als basis:
        - **Bottle:** Een minimale oplossing geschikt voor kleine servers.
        - **Flask:** Meer uitgebreid en uitbreidbaar, geschikt voor veel situaties.
        - **Django:** Een groot raamwerk dat in enterprise-oplossingen wordt gebruikt.

  - **Adressering in ontwikkel- en Docker-omgeving:**
    - Op het ontwikkelplatform hebben alle servers hetzelfde IP-nummer (namelijk dat van de server) en moeten ze dus verschillende poorten gebruiken om te communiceren.
    - In de Docker-omgeving hebben alle servers verschillende IP-nummers om te communiceren, al dan niet met verschillende poorten.

    ```bash
    export naam=waarde
    ```

  - **GameMaster Poortnummer:**
    - Het poortnummer van de GameMaster wordt van tevoren bepaald door het in de shell in te geven, bijvoorbeeld: `export GameMasterPort=10000`. Op deze manier kennen alle servers het poortnummer van de GameMaster.

  - **GameMaster IP-nummer:**
    - Het IP-nummer van de GameMaster wordt gerapporteerd zodra deze draait door het af te drukken. Dit wordt doorgegeven aan andere servers door de output op te vangen en in een shellvariabele te stoppen. Het is niet mogelijk om hier shellvariabelen voor te gebruiken die alleen doorgegeven worden aan sub-shells, maar de output van een proces wordt wel doorgegeven aan de parent.
    :::
- **6.7. Game Master V1**
    ::: details Antwoord
    Dit is versie 1 van de GameMaster server:
    <<(GameMasterV1.js)
    :::

  - **6.7.1. Eerste Test**
    ::: details Antwoord
    Om de server te testen, moet je deze starten en vervolgens een bericht posten met een POST-tool. Bij de eerste keer starten van de server, krijg je mogelijk een foutmelding omdat bepaalde modules ontbreken. Je kunt deze modules installeren met het commando `npm install <module>`. Zorg ervoor dat je dit doet voor elke vereiste module die wordt genoemd in de code.

    Als alles goed gaat, zou de server moeten reageren met:

    ```json
    {
      "sessions": 0,
      "profits": {}
    }
    ```

    Je kunt een POST-tool zoals <https://www.getpostman.com/> gebruiken om een bericht te sturen naar `http://<ip-van-je-laptop>:10000/report`. De body van het bericht kan leeg blijven, omdat dit voor deze service niet uitmaakt.
    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord
    Als 2e component maken we de Handelaar.
    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::

- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::
