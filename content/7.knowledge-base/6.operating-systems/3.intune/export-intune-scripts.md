---
Title: Downloaden van Intune PowerShell Scripts met Microsoft Graph API
Description: Dit document beschrijft hoe je Intune PowerShell-scripts kunt downloaden met behulp van Microsoft Graph API Explorer.
---

## **Voorwaarden**
- Een werkende Microsoft Graph API Explorer-omgeving.
- Toegang tot de juiste Microsoft 365-tenant.
- De benodigde Graph API-permissies (zie stap 2).

## **Stappenplan**

### **1. Inloggen bij Microsoft Graph API Explorer**
1. Open [Microsoft Graph API Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).
2. Log in met de juiste **tenant**-gegevens.

### **2. Vereiste API-permissies toevoegen**
Voordat je scripts kunt downloaden, moet je de volgende permissies toevoegen via het permissiepaneel in Microsoft Graph Explorer:
- **APIConnectors.Read.All**
- **APIConnectors.ReadWrite.All**

> **Let op**: Nadat de permissies zijn toegevoegd, moet je mogelijk expliciet toestemming geven namens de organisatie.

### **3. Ophalen van de Script-ID**
Gebruik de onderstaande endpoint om een lijst van alle beschikbare Intune-scripts op te halen:

**Request:**
```http
GET https://graph.microsoft.com/beta/deviceManagement/deviceManagementScripts
```

- Dit retourneert een JSON-respons met de beschikbare scripts.
- Noteer de `id` van het script dat je wilt downloaden.

### **4. Scriptdetails ophalen**
Gebruik de eerder verkregen script-ID om de details van het gewenste script op te halen:

**Request:**
```http
GET https://graph.microsoft.com/beta/deviceManagement/deviceManagementScripts/{deviceManagementScriptId}
```

> **Opmerking**: Vervang `{deviceManagementScriptId}` door de daadwerkelijke script-ID die je hebt opgehaald.

### **5. Base64-encoded script decoderen**
Het script wordt geleverd in een **Base64-gecodeerd formaat**. Decodeer het script met behulp van een decoder, zoals [Base64 Decode](https://www.base64decode.org/):
1. Plak de Base64-gecodeerde uitvoer in de decoder.
2. Klik op "Decode" om het script in leesbaar formaat te verkrijgen.

## **Belangrijke Opmerkingen**
- Zorg ervoor dat je scripts alleen downloadt en bewerkt als je gemachtigd bent.
- Wijzigingen aan scripts kunnen impact hebben op de apparaten binnen je organisatie. Test wijzigingen daarom altijd in een gecontroleerde omgeving.

Laat me weten of je aanvullende vragen hebt of verdere uitleg nodig is!
