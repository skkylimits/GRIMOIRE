---
title: Alternate Data Streams
description: ADS snappen in 2 minuten.
toc:
  depth: 1
---

NTFS file system ondersteunt ook **[alternate data streams](https://owasp.org/www-community/attacks/Windows_alternate_data_stream)**. Bestanden in NTFS file systems kunnen **meerdere streams van data** hebben naast de default stream: **`:$DATA`**.

::caution
`:$DATA` bestaat voor elk bestand en biedt een alternatieve manier om ze te benaderen.
::

* ADS = verborgen data in NTFS
* Maken: `echo data > TEST.txt:geheim`
* Lezen: `more < TEST.txt:geheim`
* GUI openen: `notepad TEST.txt:geheim`
* Tools: Streams.exe / AlternateStreamView

## **1. Wat is een ADS (Alternate Data Stream)?**

Een ADS is een **verborgen stukje data** dat aan een NTFS-bestand hangt.

* Je ziet het **niet** in Explorer
* Het verandert de **bestands­grootte** niet
* Het ziet eruit als:

```
BESTAND:STREAM
```

Voorbeeld:

```
TEST.txt:geheim
```

---

## **2. ADS maken (CMD)**

Maak een verborgen stream in *TEST.txt*:

```cmd
echo Dit is geheim > TEST.txt:geheim
```

Hoofdbestand blijft leeg, stream bevat de tekst.

---

## **43 ADS openen in Notepad (GUI-path)**

Start → Uitvoeren → typ:

```
notepad.exe C:\pad\naar\TEST.txt:geheim
```

Notepad opent **alleen de stream**, niet het hoofd­bestand.

---

## **4. ADS openen / lezen (CMD)**

Lees verborgen inhoud:

```cmd
more < TEST.txt:geheim
```

---

## **5. ADS bekijken (PowerShell)**

Alle streams zien:

```powershell
Get-Item TEST.txt -Stream *
```

Specifieke stream lezen:

```powershell
Get-Content TEST.txt -Stream geheim
```

---

## **6. ADS verwijderen**

```powershell
Remove-Item TEST.txt -Stream geheim
```

---

## **7. ADS met executables (voorbeeld)**

Het is nog steeds mogelijk om een EXE in een Alternate Data Stream (ADS) te plaatsen:

```cmd
type C:\Windows\System32\notepad.exe > TEST.txt:notepad.exe
```

De ADS is zichtbaar via:

```powershell
Get-Item TEST.txt -Stream *
```

Je kunt de stream openen in Notepad om te bevestigen dat de EXE erin zit:

```cmd
notepad TEST.txt:notepad.exe
```

### ⚠️ Uitvoeren vanuit ADS werkt niet meer (Windows 10/11+)

Historische malware-technieken gebruikten:

```cmd
start TEST.txt:notepad.exe
```

Maar moderne Windows-versies blokkeren dit actief.
Dit wordt tegengehouden door het OS, SmartScreen en EDR/ASR-regels.

➡️ **ADS kan nog wel executables opslaan, maar ze niet meer uitvoeren.**


## **8. ADS open `$DATA`**

Elk NTFS-bestand heeft minimaal één stream: `:$DATA`.
Dit is simpelweg de *normale inhoud* van het bestand.

Omdat `$DATA` gewoon de normale inhoud van TEST.txt is, gebruik je:

```cmd
notepad TEST.txt
```

of:

```powershell
Get-Content TEST.txt
```

Als je toch expliciet wilt verwijzen naar de stream:

```powershell
Get-Content TEST.txt -Stream $DATA
```

Dit werkt **100% altijd**, ADS kan niet uitgezet worden.

::warning
`$DATA`

* Is gewoon de standaard inhoud van het bestand → er is geen speciale weergave nodig
* De oude methode `start file::$DATA` is geblokkeerd en unsupported in Windows 10/11+
::


## **9. ADS zichtbaar maken met tools (GUI)**

### 📌 **NirSoft — AlternateStreamView**

Laat alle ADS zien in een mooie lijst.
Je kunt ze openen, verwijderen, exporteren.

### 📌 **Sysinternals [Streams.exe](https://learn.microsoft.com/en-us/sysinternals/downloads/streams)**

```cmd
streams.exe TEST.txt
```

---

## **10. Historisch voorbeeld — ASP::$DATA bug**

Normaal:

```
http://site.com/default.asp
```

Kwetsbare IIS-versies lieten broncode zien bij:

```
http://site.com/default.asp::$DATA
```

Omdat IIS de extensie fout interpreteerde.
