---
title: IPv4 Anatomy
description: Het DNA van het Internet — hoe een IP-adres is opgebouwd.
---

> Van bits naar adressen

## Wat is een IP-adres?

`IPv4` (Internet Protocol versie 4) gebruikt **32 bits** om een adres voor elk netwerkapparaat te definiëren.  
Die 32 bits worden in **vier groepen van 8 bits** verdeeld — ook wel **octetten** genoemd.

```text
Binary:  11000000.10101000.00000101.10011010
Decimal:   192      .168      .5        .154
```

> 1 octet = 8 bits
> 4 octetten × 8 bits = 32 bits = IPv4-adres

## Structuur van een IPv4-adres

Een IP-adres bestaat uit twee delen:

| Deel            | Beschrijving                         | Wordt bepaald door           |
| --------------- | ------------------------------------ | ---------------------------- |
| **Netwerkdeel** | Identificeert het subnet of netwerk  | Subnetmask                   |
| **Hostdeel**    | Identificeert een specifiek apparaat | Vrije bits binnen het subnet |

ASCII-visualisatie:

```text
IPv4:  11000000.10101000.00000101.10011010
Mask:  11111111.11111111.11111111.11000000
        |<----- Netwerk ----->|<- Host ->|

Resultaat:
Network bits → 192.168.5.
Host bits    → 128–191
```

---

## Van decimaal naar binair

| Bit index | 7   | 6  | 5  | 4  | 3 | 2 | 1 | 0 |
| --------- | --- | -- | -- | -- | - | - | - | - |
| Waarde    | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Een IPv4-adres is gewoon een **binaire reeks van 32 bits**.
Elk octet is een getal tussen 0 en 255.

| Macht van 2 | Waarde | Binaire placeholder |
| :---------- | :----- | :------------------ |
| 2⁷          | 128    | `10000000`          |
| 2⁶          | 64     | `01000000`          |
| 2⁵          | 32     | `00100000`          |
| 2⁴          | 16     | `00010000`          |
| 2³          | 8      | `00001000`          |
| 2²          | 4      | `00000100`          |
| 2¹          | 2      | `00000010`          |
| 2⁰          | 1      | `00000001`          |

Voorbeeld:
`192` = 128 + 64 → `11000000`
`168` = 128 + 32 + 8 → `10101000`

```text
192.168.5.154
↓
11000000.10101000.00000101.10011010
```

---

## 💡 IP-adres in geheugen

In werkelijkheid is een IPv4-adres een **32-bit integer** die in binaire vorm wordt opgeslagen:

```text
32 bits: [11000000 10101000 00000101 10011010]
           ↑       ↑        ↑        ↑
         octet1  octet2   octet3   octet4
```

En in hexadecimale vorm:

```text
0xC0A8059A
```

---
