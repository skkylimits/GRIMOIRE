Hier is een **heldere, compacte, technisch correcte uitleg** die je **zo in je C-documentatie kunt zetten**, exact in de stijl die jij bedoelt — inclusief de cruciale regel:

> **"%s" → start → 0x00 → STOP**

Ik herschrijf alles zodat het logisch, elegant en professioneel is.

---

# 📘 **WAAROM `%s` NIET WERKT MET `WCHAR*` (FUNDAMENTEELE UITLEG)**

Windows gebruikt **UTF-16 (WCHAR, 16-bit)** voor alle Unicode-strings in de `W`-API.
De standaard `printf()` daarentegen verwacht **8-bit ASCII/UTF-8 `char*`** wanneer je de format-specifier **`%s`** gebruikt.

Dit veroorzaakt een fundamentele mismatch:

## **1. 16-bit wide characters worden geïnterpreteerd als 8-bit bytes**

`WCHAR` bestaat uit **2 bytes per karakter**, bijvoorbeeld:

```
WCHAR L":"  → 3A 00
```

Maar `printf("%s")` leest die buffer alsof het **8-bit ASCII** is:

```
3A = ':'  (ok)
00 = string terminator  (fout)
```

## ⭐ Daarom stopt `printf("%s")` *bij de eerste nulbyte* binnen een wide-string.

---

# 🚨 **DE ESSENTIËLE REGEL (de kern van het probleem)**

```
"%s" → start → 0x00 → STOP
```

`printf("%s")` werkt alleen op **char*** en stopt bij de eerste **0x00** byte.
Een wide-character string bevat **0x00 in elke tweede byte**, dus de output breekt onmiddellijk af.

---

# 📌 **2. Gevolg: wide strings lijken leeg of worden weergegeven als '?'**

Omdat elke UTF-16 codeunit (bijna altijd) eindigt op een 0x00 byte:

```
[A0 00] [B1 00] [C2 00] ...
      ↑
    printf ziet dit als "string eindigt hier"
```

Daarom krijg je:

* geen output
* of vraagtekens
* of alleen het eerste ASCII-compatibele karakter

Ondertussen is **je buffer intern wél correct gevuld** — alleen het loggen mislukt.

---

# 📌 **3. De correcte manier om een `WCHAR*` te printen**

Gebruik **`wprintf()`** en **`%ls`**:

```c
wprintf(L"%ls\n", wideString);
```

Of met size-bounded print:

```c
wprintf(L"%.*ls\n", length, wideString);
```

---

# 🧠 **Samenvatting voor in je C-documentatie**

* Windows API gebruikt UTF-16 (`WCHAR`, 16-bit).
* `printf("%s")` interpreteert de buffer als **8-bit ASCII**.
* Elke tweede byte in UTF-16 is **0x00**, waardoor `printf` denkt dat de string eindigt.
* Daarom geeft `printf("%s")` **geen output** of **trunctated output** op wide strings.
* Gebruik altijd **`wprintf(L"%ls")`** voor `WCHAR*`.

### Kernregel (voor ontwikkelaars & RE-engineers):

```
UTF-16 string: 16-bit chars
printf("%s"): verwacht 8-bit chars
"%s" → start → 0x00 → STOP
```

---

# 🎯 Wil je dat ik dit omzet in een **sectie voor je GRIMOIRE / MalDev Academy-stijl Markdown**, met headings, callouts, iconen en structuren zoals jij altijd gebruikt?
