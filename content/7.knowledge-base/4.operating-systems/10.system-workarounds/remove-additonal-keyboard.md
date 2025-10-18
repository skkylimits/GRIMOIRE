---
title:  Remove Additional Keyboard
description: Shortcut for the lazy.
---

# 🇳🇱 US-internationaal toetsenbord behouden en Nederlands toetsenbord verwijderen

## 🎯 Doel

Windows voegt soms automatisch een extra **Nederlands toetsenbordindeling** toe (0413:00000413), zelfs als je alleen de **US-internationale layout** wilt gebruiken.
Met onderstaande stappen verwijder je de Nederlandse indeling en behoud je alleen **US International**.


## 🧩 Stap 1 — Maak het XML-bestand

1. Open **Kladblok (Notepad)**
2. Plak de onderstaande code
3. Sla het bestand op als

   ```
   Remove_nl-NL.xml
   ```

   op je **bureaublad**.

```xml
<gs:GlobalizationServices xmlns:gs="urn:longhornGlobalizationUnattend">

    <!--User List-->
    <gs:UserList>
        <gs:User UserID="Current"/>
    </gs:UserList>

    <!--Input Preferences-->
    <gs:InputPreferences>
        <!--Voeg de Nederlandse layout toe (voor het geval hij nog niet bestaat)-->
        <gs:InputLanguageID Action="add" ID="0413:00000413"/>
        <!--Verwijder de Nederlandse toetsenbordlayout-->
        <gs:InputLanguageID Action="remove" ID="0413:00000413"/>
    </gs:InputPreferences>

</gs:GlobalizationServices>
```

### 🔍 Toelichting

| Code            | Betekenis                                                |
| --------------- | -------------------------------------------------------- |
| `0413`          | Nederlands (Nederland) taalcode                          |
| `00000413`      | Standaard Nederlands toetsenbordlayout                   |
| `00000409`      | US toetsenbordlayout                                     |
| `0409:00020409` | US International layout (de layout die je wilt behouden) |

Dit XML-bestand zorgt ervoor dat de Nederlandse layout (`0413:00000413`) wordt verwijderd, terwijl de **US International** gewoon blijft staan.

## ⚙️ Stap 2 — Voer het commando uit

> ⚠️ Voer dit uit in **PowerShell als Administrator**

Open PowerShell en typ (of plak) het volgende:

```powershell
cmd /c 'control intl.cpl,, /f:"C:\Users\<jouw-gebruikersnaam>\Desktop\Remove_nl-NL.xml"'
```

💡 Tip: je kunt het XML-bestand ook **in PowerShell slepen** achter `/f:` zodat het pad automatisch wordt ingevuld.


## 🧪 Stap 3 — Controleer het resultaat

Na het uitvoeren van het commando kun je je actieve toetsenbordindelingen controleren met:

```powershell
Get-WinUserLanguageList
```

✅ Verwachte output:

```
LanguageTag     : nl-NL
InputMethodTips : {0413:00000409}
```

Dat betekent:

* De **systeemtaal** is nog steeds Nederlands (`nl-NL`)
* De **toetsenbordindeling** is nu **US (00000409)**
* De Nederlandse toetsenbordlayout (`00000413`) is succesvol verwijderd ✅

## 🧰 Stap 4 — (Optioneel) Maak een batchbestand voor later gebruik

Je kunt dit proces automatiseren zodat je het snel opnieuw kunt uitvoeren, bijvoorbeeld na een Windows-update.

Maak een nieuw bestand op je bureaublad met de naam:
📄 **Remove_nl-NL.bat**

Plaats deze inhoud erin:

```bat
@echo off
control intl.cpl,, /f:"%~dp0Remove_nl-NL.xml"
pause
```

Sla het op, klik met de **rechtermuisknop → Als administrator uitvoeren**.
