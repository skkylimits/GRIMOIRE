Hier is de **duidelijke, praktische manier** om een _virtueel adres_ zoals:

```
0x000001C662AF6260
```

op te zoeken in **x64dbg (64-bit)**.

En ja — dit werkt zowel voor:

- heap pointers
- struct pointers
- object addresses
- return addresses
- vtable pointers

---

# 🟦 0. Voorbeeld-UI (zodat je weet waar alles zit)

---

# 🟩 1. Open x64dbg (64-bit!)

Als je een 64-bit programma debugt:

✔ gebruik **x64dbg.exe**
❌ niet x32dbg.exe

---

# 🟩 2. Druk op **Ctrl+G** (Go to expression)

Dit opent de mini input:

```
Goto Expression:
```

Type daar gewoon het adres:

```
0x000001C662AF6260
```

Klik **OK**.

Als het adres geldig is → je springt direct naar de dump.

---

# 🟩 3. Als x64dbg zegt “Invalid address” → komt dit door je _Memory Map_

Veel mensen lopen hier vast!

In x64dbg kun je alleen naar een adres springen dat door een module of heap-alloc in het **Memory Map** zichtbaar is.

Open:

```
Debug → Memory Map
```

Zoek naar de regio die jouw adres bevat:

- sorteer op **Address**
- check wat tussen `Start` en `End` valt

Voorbeeld:

```
Start: 000001C662AF0000
End:   000001C662B00000
```

Dan ligt jouw adres:

```
0x000001C662AF6260
```

**binnen deze memory range** → dus geldig.

Dubbelklik op de regel → x64dbg opent automatisch de dump precies waar je moet zijn.

---

# 🟩 4. Direct via Dump View

Open een dump:

```
View → CPU → Dump
```

Rechtsklik → **"Goto → Expression"**

Voer in:

```
000001C662AF6260
```

---

# 🟩 5. Wat als het adres een pointer is, en niet een “real address”?

Veel moderne Windows apps gebruiken:

- ASLR
- heap randomization
- guarded regions
- kernel pointer obfuscation

Dus als x64dbg het adres niet kent:

### Test:

```
? 000001C662AF6260
```

in de commandbar → x64dbg evalueert of het numeriek klopt.

---

# 🟩 6. Als de pointer afkomstig is uit een register / stack

Je kunt er direct naartoe springen:

Rechtsklik op het register:

```
Follow in Dump → (address)
```

Bijvoorbeeld:

```
RAX = 000001C662AF6260
```

Rechtsklik:

✔ Follow in Dump

---

# 🟩 7. Shortcut cheatsheet

| Actie                        | Toets             |
| ---------------------------- | ----------------- |
| Ga naar adres                | **Ctrl+G**        |
| Jump naar geselecteerd adres | **Enter**         |
| Follow pointer in dump       | **Space**         |
| Open Memory Map              | **Ctrl+M**        |
| Goto Expression in Dump      | Rechtsklik → Goto |

---

# 🟦 8. Als je wil dat IK het voor je opzoek

Geef me:

✔ Het adres
✔ Een screenshot van Memory Map
✔ Eventueel de registers (RAX, RCX, etc.)

Dan zeg ik exact:

- of het een heap region is
- of het een module address is
- of het guarded memory is
- of het een pointer naar een struct / object is

---

# Wil je dat ik jouw adres **0x000001C662AF6260** analyseer zoals een malware analyst (heap segment, protection flags, allocation owner)?

Zeg: **analyseer dit adres**.
