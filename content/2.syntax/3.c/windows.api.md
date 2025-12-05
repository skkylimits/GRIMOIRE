Je raakt hier een **heel belangrijk concept in de Windows-API / NT Native API aan**.
En ja — je kunt **eigen structs** gebruiken die **niet bestaan in Win32**,
en tóch perfect werken.

Waarom?

Omdat **SetFileInformationByHandle** en de onderliggende NT-syscall **NIET** kijken naar de C-struct die jij maakt…
maar naar:

* de **binaire lay-out**
* de **grootte van de buffer**
* de **inhoud van de velden in het geheugen**

Dus jij mag **elke struct definiëren die exact hetzelfde binaire geheugenmodel heeft** als Windows verwacht — zelfs als deze NIET bestaat in de officiële headers.

Dat is de kern van:

# ⭐ **User-mode struct overlaying**

---

# 🔥 **Het kernprincipe**

`SetFileInformationByHandle` wordt intern vertaald naar:

```
NtSetInformationFile(Handle, &IoStatus, Buffer, Length, InfoClass)
```

NtSetInformationFile:

* verwacht **een blok memory**
* met een **bepaald formaat**
* maar het maakt zich **niets uit welke struct-naam** jij in C gebruikt

Daarom werkt dit:

```c
typedef struct _FILE_RENAME_INFO2 {
    union {
        BOOLEAN ReplaceIfExists;
        DWORD   Flags;
    };
    HANDLE RootDirectory;
    DWORD  FileNameLength;
    WCHAR  FileName[MAX_PATH];
} FILE_RENAME_INFO2;
```

Of dit:

```c
typedef struct {
    DWORD Flags;
    HANDLE RootDirectory;
    DWORD FileNameLength;
    WCHAR FileName[260];
} MY_RENAME_STRUCT;
```

OF zelfs:

```c
BYTE buffer[1024];
```

Zolang:

* **de velden op dezelfde offsets staan**
* **de totale lengte klopt**
* **FileNameLength klopt**

De NT-kernel weet **niet** hoe jouw C-struct heet.
Hij leest alleen bytes op geheugenposities.

---

# 🎯 **Waarom kan dit?**

Omdat Windows NT-intern werkt met:

* *FILE_RENAME_INFORMATION*
* *FILE_RENAME_INFORMATION_EX*
* *FILE_DISPOSITION_INFORMATION_EX*
* *FILE_BASIC_INFORMATION*
* etc.

Maar Microsoft geeft deze structs **vaak niet volledig vrij** aan Win32.
Sommige zijn undocumented of gedeeltelijk gedocumenteerd.

Toch kun je ze **gebruiken** als je de binary layout kent.

Windows API is gebaseerd op het principe van:

# ⭐ **“Call by raw memory block, not by struct contract”**

---

# 🔬 **Concreet voorbeeld voor jouw code**

### Jij doet:

```c
FILE_RENAME_INFO2 fri = {...};
SetFileInformationByHandle(h, FileRenameInfo, &fri, sizeof(fri));
```

Maar SetFileInformationByHandle verwacht:

| Offset | Type    | Betekenis               |
| ------ | ------- | ----------------------- |
| 0x00   | BOOLEAN | ReplaceIfExists / Flags |
| 0x04   | HANDLE  | RootDirectory           |
| 0x0C   | DWORD   | FileNameLength          |
| 0x10   | WCHAR[] | FileName buffer         |

Jouw struct heeft EXACT die layout.
Dus kernel zegt:

> “Perfect — dat is precies wat ik wilde”

Ook al heet jouw struct **FILE_RENAME_INFO2**, een naam die Microsoft NOOIT gebruikt.

---

# ⭐ Waarom gebruiken devs dit?

Omdat:

* Microsoft headers soms incomplete of oude structs bevatten
* Nieuwe Windows versies nieuwe flags/fields toevoegen
* Reverse engineers volledige struct willen gebruiken
* Malware en forensics tooling custom variants gebruikt
* Je soms extra ruimte wilt (zoals MAX_PATH i.p.v. FileName[1])

---

# 💥 En waarom werkt het ook met FILE_DISPOSITION_INFO_EX?

Omdat de officiële struct is:

```c
typedef struct _FILE_DISPOSITION_INFO_EX {
  DWORD Flags;
} FILE_DISPOSITION_INFO_EX;
```

Maar Windows verwacht alleen:

* een DWORD met de flags
* gevolgd door NUL bytes
* en de lengte moet kloppen met de `sizeof` die jij doorgeeft

Dus JOUW struct werkt zolang:

```c
sizeof(FILE_DISPOSITION_INFO_EX) == 4   // of 8 op 64-bit
```

---

# 🚀 TL;DR

**Je mag eigen structs definiëren voor Windows kernel-API’s,
omdat de kernel geen struct-namen kent — alleen memory layouts.**

Zolang:

1. De offsets kloppen
2. De velden overeenkomen
3. De lengte die jij opgeeft correct is

Werkt jouw struct perfect, ook als Microsoft er nooit over gehoord heeft.

---

# 💎 Wil je dat ik jou precies uitleg:

* hoe NT-struct alignment werkt
* hoe je undocumented structs reverse-engineert
* hoe je zelf nieuwe structs maakt voor Zw/Nt calls
* hoe malware dit gebruikt in self-delete techniques?

Zeg:

**“leg NT struct layout uit”**


Dit lijkt **magisch**, maar het is eigenlijk heel logisch als je begrijpt hoe **Windows NT kernel API’s** omgaan met structs.
Laat me het helder en exact uitleggen:

---

# ⭐ 1. **Wat is `FILE_DISPOSITION_INFO_EX` werkelijk?**

De officiële struct is:

```c
typedef struct _FILE_DISPOSITION_INFO_EX {
    DWORD Flags;
} FILE_DISPOSITION_INFO_EX, *PFILE_DISPOSITION_INFO_EX;
```

Dat is **alles**.
Het is letterlijk een struct met maar één veld.

Dus dit:

```c
FileDisposalInfoEx.Flags = FILE_DISPOSITION_FLAG_DELETE | FILE_DISPOSITION_FLAG_POSIX_SEMANTICS;
```

wil gewoon zeggen:

> “Zet het enige veld in deze struct op deze bitmask.”

---

# ⭐ 2. **Waarom werkt dit met `SetFileInformationByHandle`?**

Wanneer je deze call doet:

```c
SetFileInformationByHandle(
    hLocalImgFileHandle,
    FileDispositionInfoEx,
    &FileDisposalInfoEx,
    sizeof(FILE_DISPOSITION_INFO_EX)
);
```

stuurt de Win32 API dit door naar de NT kernel:

```
NtSetInformationFile(
    handle,
    FileDispositionInformationEx,
    buffer,
    length
)
```

De kernel verwacht voor deze `InformationClass` slechts één ding:

* een geheugenblock waarin op offset 0 een **DWORD Flags** staat

Jij levert dat exact aan.

Het maakt NTFS NIET uit:

* hoe jouw struct heet
* of je zelf de struct hebt gemaakt
* of de struct in officiële headers staat
* of de struct 1 veld of 20 velden heeft

Zolang de **binary layout klopt**, werkt het.

---

# ⭐ 3. **Waarom werkt de bitwise OR?**

Want de flags zijn gedefinieerd als:

```c
#define FILE_DISPOSITION_FLAG_DELETE              0x00000001
#define FILE_DISPOSITION_FLAG_POSIX_SEMANTICS     0x00000002
```

Dus:

```c
FileDisposalInfoEx.Flags = 0x01 | 0x02;
```

geeft:

```
Flags = 0x03
```

De kernel checkt:

* staat bit 0 aan → verwijder bestand
* staat bit 1 aan → behandel file als POSIX (verwijder zelfs als handle open is)

**Dat is PRETIG abrekenen voor malware & self-delete.**
Windows laat dit alleen toe vanaf Windows 10+.

---

# ⭐ 4. Waarom werkt dit zelfs met een custom struct?

Omdat de kernel:

* GEEN C-struct kent
* GEEN structnaam ontvangt
* GEEN metadata krijgt van jouw compiler

De kernel ziet alleen:

```
[ 03 00 00 00 ]   ← jouw Flags DWORD
```

En denkt:

> “Perfect, dit is FILE_DISPOSITION_INFORMATION_EX.
> Ik ga deze file verwijderen zodra de laatste handle sluit.”

Dus een custom struct als:

```c
typedef struct {
    DWORD Flags;
} MY_WEIRD_STRUCT;
```

zou **net zo goed werken.**

---

# ⭐ 5. Het werkt opeens → want de kernel verwacht EXACT deze layout

Voor deze InfoClass:

```
FileDispositionInfoEx
```

is de verwachte layout:

| Offset | Type  | Description |
| ------ | ----- | ----------- |
| 0x00   | DWORD | Flags field |

Jij levert:

* een pointer
* naar een block memory
* waarin op index 0 een DWORD staat
* met bit 0 en bit 1 gezet

Dus Windows zegt:

**“Complete. File wordt deleted-on-close met POSIX force.”**

---

# 🎯 TL;DR

`FileDisposalInfoEx.Flags = ...` werkt omdat:

* `FILE_DISPOSITION_INFO_EX` is een struct van **maar één DWORD**
* de kernel kent geen C-structs, alleen memory blocks
* `SetFileInformationByHandle` stuurt jouw bitmask 1-op-1 naar NTFS
* `DELETE | POSIX_SEMANTICS` is een geldige combinatie:

  * FORCE delete
  * Zelfs als de file open is
  * Zelfs als het locked is
  * Verwijder na proces-exit

---

# 🔥 Wil je dat ik in dezelfde stijl uitleg:

* hoe `FILE_RENAME_INFO` werkt?
* waarom jouw custom rename-struct *ook werkt*?
* hoe kernel-alignments en struct overlays in NT werken?

Zeg:

**“leg FILE_RENAME_INFO memory layout uit”**


Je stelt hier eigenlijk **de kernvraag van hoe Windows NT kernel “file disposition” begrijpt**:

> **Waarom betekent het zetten van dit ene DWORD-veld op een bepaalde waarde: “verwijder dit bestand”?**
>
> Waarom is `0x01` = DELETE,
> waarom is `0x02` = POSIX,
> waarom niet iets anders zoals “run program” of “encrypt file”?

Dat lijkt arbitrair, maar het is **exact hoe Windows NT’s kernel-architectuur is gebouwd**.

Ik ga het haarfijn uitleggen.

---

# ⭐ 1. Windows heeft een intern “Information Class” systeem

Elke call zoals:

```c
SetFileInformationByHandle(...)
```

wordt vertaald naar de kernel:

```c
NtSetInformationFile(
    Handle,
    FileInformationClass,
    Buffer,
    BufferLength
);
```

Elke `FileInformationClass` heeft een **specifieke betekenis** die hardcoded is in de NT kernel.

Voorbeelden:

| FileInformationClass  | Betekenis                             |
| --------------------- | ------------------------------------- |
| FileBasicInformation  | Timestamps, attributes, readonly, etc |
| FileRenameInformation | Rename operaties                      |
| FileDispositionInfoEx | Request DELETE                        |
| FileEndOfFileInfo     | Verander de file size                 |
| FileAllocationInfo    | Reserveer disk space                  |

Dus **ELKE class heeft zijn eigen struct-layout**.
Jij stuurt een struct,
maar de kernel bepaalt de interpretatie 100%.

---

# ⭐ 2. Voor DELETE gebruikt Windows een speciale informatieklasse

De kernel-dispatch tabel zegt:

```
case FileDispositionInfoEx:
    interpret buffer as FILE_DISPOSITION_INFORMATION_EX
    check Flags bitmask
    if Flags & DELETE → mark file for deletion
    if Flags & POSIX → allow delete while open
```

Dus **de betekenis van jouw struct wordt bepaald door de InfoClass, niet door de inhoud zelf**.

Daarom:

```c
FileDisposalInfoEx.Flags = 0;       // DOET HELEMAAL NIETS
FileDisposalInfoEx.Flags = 1;       // = DELETE
FileDisposalInfoEx.Flags = 2;       // = POSIX delete
FileDisposalInfoEx.Flags = 3;       // = DELETE | POSIX
```

Maar als je exact dezelfde struct zou sturen naar **FileRenameInfo**,
dan betekent het **iets totaal anders**.

Het is dus de **InfoClass** die bepaalt:

> “Deze flags betekenen DELETE.”

---

# ⭐ 3. Windows API kiest nummering — NIET jij, niet C, niet de struct

Waarom is DELETE = `0x01`?

Omdat Microsoft in de NT-kernel:

* een bitmask heeft gedefinieerd
* met bit 0 = “mark for deletion”
* met bit 1 = “POSIX delete semantics”

Dit staat hardcoded in de kernel source (gesloten maar bekend via symbols).
De betekenis staat dus **vast in Windows zelf**, niet in jouw code.

---

# ⭐ 4. Waarom is het niet “run command” of “encrypt”?

Omdat **FileDispositionInformation** alleen gaat over VERWIJDEREN.
Dit subsystem is *uitsluitend* voor delete-operaties.

Als Microsoft encryptie of run-command zou willen toevoegen (onzin, maar hypothetisch), dan zou dat een **andere FileInformationClass zijn**, zoals:

```
FileEncryptionSettings
FileExecutionPolicyInfo
FileMetadataInfo
```

Windows kernel API werkt strikt per subsystem.

---

# ⭐ 5. De kernel checkt BITMASKS, niet een enum

De kernel doet letterlijk:

```c
if (Flags & 0x01)
    FileObject->DeletePending = TRUE;

if (Flags & 0x02)
    FileObject->PosixSemantics = TRUE;
```

Dus:

* 0x01 = verwijder wanneer laatste handle sluit
* 0x02 = forceer POSIX gedrag
* 0x03 = beide

Alles is **bitmask-logica**, extreem simpel.

---

# ⭐ 6. Waarom wordt 0 genegeerd?

Omdat het betekenisloos is.

`0` betekent in bitmask-termen:

```
00000000b
```

→ Geen enkele optie actief
→ Geen delete
→ Geen POSIX
→ Doe niets

Er is **geen fallbackfunctie**.
De kernel denkt:

> “Je hebt me een FileDispositionInfoEx gegeven, maar alle bits zijn uit → dus geen acties.”

---

# ⭐ 7. Waarom is het zo simpel?

Omdat het een **low-level kernel API** is.
Structs worden niet op naam herkend,
alleen op:

* lengte
* memory layout
* informatieklasse
* flags

De kernel doet alleen:

> "Welke InformationClass heb ik ontvangen?
> En wat betekenen de bits in dit buffer voor deze class?"

---

# 🎯 TL;DR

### Het is geen magie.

`FILE_DISPOSITION_INFO_EX` is een geheugenblok
dat door **FileDispositionInfoEx** wordt geïnterpreteerd als:

* Bit 0 = DELETE
* Bit 1 = POSIX_FORCE_DELETE
* Bit 2+ = gereserveerd

De **InfoClass bepaalt de betekenis**, niet jij.

Daarom betekent:

```c
Flags = 0x01
```

**Verwijder dit bestand zodra de laatste handle sluit.**

Het is simpelweg:

* een binary contract
* tussen usermode en kernel
* waarin de kernel bepaalt wat elk bit betekent

---

# 🔥 Wil je nu ook weten:

* waarom `RootDirectory + FileName[]` in rename werkt,
* en waarom rename via ADS "onverwijderbaar tijdens runtime" mogelijk maakt?

Zeg:

**“leg FILE_RENAME_INFO layout uit”**
