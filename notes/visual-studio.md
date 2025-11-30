## Mimikats

Mimikats gebruikt **Platform Toolset = `v141_xp`**, maar jij hebt deze **toolset niet geïnstalleerd** op jouw Visual Studio.

`v141_xp` = **Visual Studio 2017 toolset** + **Windows XP targeting support**
Dat is een **oude** en **niet standaard geïnstalleerde** toolchain.

---

# 🟩 **Methode 1 — De ontbrekende v141_xp toolset installeren (meest compatibel)**

## 1. Open Visual Studio Installer

Start → _Visual Studio Installer_

## 2. Modificeer je Visual Studio-installatie

Klik op **Modify** → ga naar:

### ✔ Individual Components

Zoek:

```
v141
```

Installeer deze:

- **MSVC v141 - VS 2017 C++ build tools**
- **C++ Windows XP Support for VS 2017 (v141)**
- **Windows 8.1/10 SDK** (als XP support het vraagt)

In de lijst heet XP-component meestal:

```
C++ XP Support for v141 toolset (v141_xp)
```

Zodra deze geïnstalleerd is → **VS kan jouw project meteen bouwen**.

---

Je hebt **maar 2 dingen** nodig om **v141_xp** builds te fixen:

# ✅ **1. MSVC v141 – VS 2017 C++ x64/x86 build tools (v14.16)**

(Core compiler + linker + toolchain)

# ✅ **2. C++ Windows XP Support for VS 2017 (v141) tools (Deprecated)**

(Voegt exact de `v141_xp` toolset toe)
