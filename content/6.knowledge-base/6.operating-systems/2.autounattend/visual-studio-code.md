---
Title: Visual Studio Code
---

## 1. Installeer VS Code op Windows

- Download en installeer VS Code via [https://code.visualstudio.com/](https://code.visualstudio.com/)
    
- Tijdens installatie: vink “Add to PATH” aan
    

## 2. Installeer de Remote - WSL extensie

- Open VS Code op Windows
    
- Ga naar Extensies (`Ctrl+Shift+X`)
    
- Zoek en installeer **WSL** & **Remote - WSL** 
    
- **Deze extensies zorgt ervoor dat VS Code vanuit Windows naadloos verbinding kan maken met je WSL2 omgeving en maakt het gebruik van `code` in WSL terminals mogelijk**
    

## 3. Open je WSL2 terminal (bijv. Ubuntu)

- Test commando:
    
    ```bash
    code .
    ```
    
    Dit opent VS Code met de huidige map in WSL2. Test dit in Windows terminal en VS Code temrinal
    

## 4. Als `code` in Windows Terminal niet werkt:

- Herstart VS Code en Windows Terminal (soms nodig voor PATH update)
    
- Check met PowerShell:
    
    ```powershell
    where code
    ```
    
    VS Code moet in PATH staan (`C:\Program Files\Microsoft VS Code\bin`)
    