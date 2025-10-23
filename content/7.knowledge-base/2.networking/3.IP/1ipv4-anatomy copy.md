💯 Je raakt precies de kern van hoe **binaire positie** versus **aantal bits** werkt.
En je intuïtie klopt — je denkt goed, maar je mengt twee *verschillende dingen*:
🔹 de **waarde van één specifieke bitpositie**,
versus
🔹 het **aantal beschikbare bits** waaruit je combinaties kunt maken.

Laat me dat stap voor stap scheiden — dan valt het precies op z’n plek 👇

---

## 🧩 1️⃣ Eén bitpositie heeft een waarde

(positie bepaalt *gewicht*, niet *aantal combinaties*)

Als je één bit bekijkt, bijv. de 4ᵉ van rechts:

```text
bits: 7 6 5 4 3 2 1 0
val:128 64 32 16  8 4 2 1
```

De **4ᵉ positie van rechts** heeft waarde **2⁴ = 16**.
➡️ Dat getal zegt: *als ik die ene bit aanzet, tel ik 16 bij het totaal op.*

Dat is **geen** “aantal adressen” — dat is **de decimale waarde** van die specifieke bitpositie.
Met andere woorden:

| Bitpositie | Waarde (binair) | Betekenis     |
| ---------- | --------------- | ------------- |
| 0          | 2⁰ = 1          | kleinste stap |
| 1          | 2¹ = 2          | tweede bit    |
| 2          | 2² = 4          | derde bit     |
| 3          | 2³ = 8          | vierde bit    |
| 4          | 2⁴ = 16         | vijfde bit    |

Dus: **“de 4de bit geeft 8”** klopt helemaal —
dat zegt *hoeveel dat ene bit waard is*, niet hoeveel combinaties je hebt.

---

## 🧮 2️⃣ Aantal bits = aantal combinaties

Wanneer je subnetten berekent, kijk je niet naar de *waarde van één bit*,
maar naar **hoeveel bits** je beschikbaar hebt voor het hostgedeelte.

Elke hostbit kan 0 of 1 zijn → 2 mogelijkheden.
Dus bij `n` hostbits zijn er `2ⁿ` mogelijke combinaties.

| Hostbits | Combinaties | Usable hosts | Voorbeeld                          |
| -------- | ----------- | ------------ | ---------------------------------- |
| 1        | 2           | 0            | (alle 0’s/1’s = netwerk/broadcast) |
| 2        | 4           | 2            | `/30` → 2 usable hosts             |
| 3        | 8           | 6            | `/29`                              |
| 4        | 16          | 14           | `/28`                              |
| 5        | 32          | 30           | `/27`                              |
| 6        | 64          | 62           | `/26`                              |
| 8        | 256         | 254          | `/24`                              |
| 20       | 1,048,576   | 1,048,574    | grote subnetten                    |

👉 Dus jouw voorbeeld klopt wél:

> Als er **20 vrije bits voor hosts** zijn → 2²⁰ = 1,048,576 adressen totaal,
> minus 2 gereserveerde → **1,048,574 usable hosts.**

---

## 🔍 3️⃣ Visueel verschil tussen “waarde” en “combinaties”

```text
1 bit  → 2   combinaties → [0,1]
2 bits → 4   combinaties → [00,01,10,11]
3 bits → 8   combinaties → [000 ... 111]
4 bits → 16  combinaties → [0000 ... 1111]
```

De “vierde bit” heeft waarde `8` (2³),
maar *vier bits samen* kunnen 16 (2⁴) patronen maken.

---

## ⚙️ 4️⃣ Ezelsbrug:

| Vraag                                          | Formule | Betekenis                               |
| ---------------------------------------------- | ------- | --------------------------------------- |
| “Hoeveel waard is dit bit?”                    | 2ⁿ      | positie-telling (vanaf rechts, 0-based) |
| “Hoeveel combinaties kan ik maken met n bits?” | 2ⁿ      | aantal mogelijke adressen               |
| “Hoeveel usable hosts in subnet?”              | 2ⁿ − 2  | adressen − netwerk − broadcast          |

---

## 🧠 Samenvatting in één zin:

> De **positie** van een bit bepaalt *waarde* (2ⁿ),
> het **aantal bits** bepaalt *aantal combinaties* (2^(aantal bits)).

---

Als je wil, maak ik een klein ASCII-schema dat beide naast elkaar toont:
links “bitwaarde per positie”, rechts “combinaties per aantal bits” —
zodat je het visueel kunt in je subnetting-sectie plaatsen. Wil je dat?
