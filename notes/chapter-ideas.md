# Chapter Ideas & Content Organization Notes

## CRT Removal Placement Discussion

### Vraag

Is CRT removal IAT-gerelateerd en waar hoort het in de documentatie?

### Antwoord

**Ja — het is IAT-gerelateerd**, maar:

- **Indirect**, want het **verkleint** je IAT
- Niet omdat het IAT verbergt/vervangt
- Maar omdat het libraries _verwijdert_ die normaal in de IAT zouden staan

### Classificatie

#### CRT removal = **IAT-reduction techniek**

#### CRT removal ≠ "IAT-hiding techniek"

---

## Voorgestelde Chapter Structuur

### 1️⃣ **IAT Techniques (Hiding / Manipulation)**

Technieken die **direct de IAT zelf aanpassen**:

- IAT-hiding
- IAT erasing / patching
- Runtime API resolving
- Hash-based resolving
- Syscall resolving
- Forwarded export resolving
- Indirect calls / trampolines

➡️ **CRT removal hoort hier NIET**, want het verandert de IAT niet actief.

---

### 2️⃣ **Optimization & Stealth Techniques**

Technieken die **de zichtbaarheid van je binary verminderen**:

- **CRT removal** ✅
- Binary entropy manipulation
- Code signing abuse
- String encryption
- Deadcode injection
- Import minimization
- Custom malloc/free i.p.v. CRT
- PE header cleanup
- Section alignment tuning

➡️ **CRT removal hoort hier WÉL**: reduceert imports = minder detecteerbaarheid

---

### 3️⃣ **Binary Hardening / Obfuscation Checklist**

Technieken gericht op:

- EDR evasion
- Anti-analysis
- Anti-debugging
- Anti-disassembly
- Control-flow obfuscation
- Encryption & polymorphism

➡️ CRT removal _kan hier genoemd worden_, maar is primair een "stealth optimization"

---

## Beste Plek voor CRT Removal

**Plaats CRT removal in "Optimization / Stealth Checklist" hoofdstuk**, samen met:

- Binary entropy tuning
- Signing tricks
- Import pruning
- Minimal WinAPI footprint
- Static linking vs dynamic linking
- Crushing debug metadata
- Avoiding obvious strings

📌 Cross-reference naar IAT hoofdstuk:

> CRT removal verkleint de IAT door CRT-gerelateerde imports te elimineren, maar is geen IAT-hiding techniek op zichzelf.

---

## Logica Achter Deze Structuur

### ✔ IAT-hoofdstuk = _"Hoe manipuleer ik de IAT?"_

CRT removal doet dat niet direct.

### ✔ Optimization-hoofdstuk = _"Hoe maak ik mijn binary stealthier en kleiner?"_

CRT removal doet precies dat.

---

## TL;DR

- **CRT removal → Stealth Optimization**
- **Niet direct IAT-hiding, maar wel IAT-reduction**
- **Plaatsen in optimization chapter, niet onder pure IAT techniques**

---

## Volledige Grimoire Structuur Voorstel

### Chapter: IAT Techniques

- Runtime API resolution
- Hash-based function lookup
- Syscall-based API bypass

### Chapter: API Obfuscation

- String encryption
- Control flow obfuscation
- Dead code injection

### Chapter: Binary Optimization & Stealth

- **CRT removal** (primary location)
- Binary entropy manipulation
- Import minimization
- PE header cleanup
- Code signing strategies
