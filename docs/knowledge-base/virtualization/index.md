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

    :::
- **4.2. Docker Success Factors**
    ::: details Antwoord

    :::
- **4.6. What happened?**
    ::: details Antwoord

    :::
- **4.7. Example. Grav: simple CMS**
    ::: details Antwoord

    :::
- **4.8. Docker Hub(s)**
    ::: details Antwoord

    :::
- **4.9. Docker Hub (top 9)**
    ::: details Antwoord

    :::
- **4.10. Docker build**
    ::: details Antwoord

    :::
- **4.11. Dockerfile**
    ::: details Antwoord

    :::
  - **4.11.1. FROM name**
    ::: details Antwoord

    :::
  - **4.11.1.2. RUN command**
    ::: details Antwoord

    :::
  - **4.11.1.3. Label key=value ...**
    ::: details Antwoord

    :::
  - **4.11.1.4. EXPOSE port ...**
    ::: details Antwoord

    :::
  - **4.11.1.5. ENV key=value ...**
    ::: details Antwoord

    :::
  - **4.11.1.6. ADD src ... dest**
    ::: details Antwoord

    :::
  - **4.11.1.7. CMD command**
    ::: details Antwoord

    :::
  - **4.11.1.8. ENTRYPOINT**
    ::: details Antwoord

    :::
  - **4.11.1.9. VOLUME directory**
    ::: details Antwoord

    :::
  - **4.11.1.10. USER**
    ::: details Antwoord

    :::
  - **4.11.1.11. WORKDIR**
    ::: details Antwoord

    :::
- **4.12. Docker-compose**
    ::: details Antwoord

    :::
- **4.13. Getting Started 1**
    ::: details Antwoord

    :::
- **4.18. Networking**
    ::: details Antwoord

    :::

## 5. Intermezzo: REST

- **5.1. Internet, WWW, HTTP, REST**
    ::: details Antwoord

    :::
- **5.2. Presentation, Tiers and MV**
    ::: details Antwoord

    :::
  - **5.2.1. MV**
    ::: details Antwoord

    :::
  - **5.2.2. Tiers**
    ::: details Antwoord

    :::
- **5.3. HTTP**
    ::: details Antwoord

    :::
  - **5.3.1. URL, URI, URN**
    ::: details Antwoord

    :::
  - **5.3.2. Verbs**
    ::: details Antwoord

    :::
  - **5.3.3. Restfull Applications**
    ::: details Antwoord

    :::
- **5.4. Further Reading**
    ::: details Antwoord

    :::

## 6. Practicum

- **6.1. Rest Servers: Prisoner’s Dilemma & Tit-for-Tat**
    ::: details Antwoord

    :::
- **6.2. Inleiding**
    ::: details Antwoord

    :::
- **6.3. Servers die het experiment uitvoeren**
    ::: details Antwoord

    :::
  - **6.3.1. Handelaar**
    ::: details Antwoord

    :::
  - **6.3.2. Postbus**
    ::: details Antwoord

    :::
  - **6.3.3. Game Master**
    ::: details Antwoord

    :::
- **6.4. Functioneel en Technisch Ontwerp GameMaster**
    ::: details Antwoord

    :::
  - **6.4.1. Game Master Services**
    ::: details Antwoord

    :::
  - **6.4.2. Game Master Data**
    ::: details Antwoord

    :::
- **6.5. Intermezzo -- Ontwikkelomgeving**
    ::: details Antwoord

    :::
- **6.6. Adressering**
    ::: details Antwoord

    :::
- **6.7. Game Master V1**
    ::: details Antwoord

    :::
  - **6.7.1. Eerste Test**
    ::: details Antwoord

    :::
- **6.8. FO en TO Handelaar + Post**
    ::: details Antwoord

    :::
