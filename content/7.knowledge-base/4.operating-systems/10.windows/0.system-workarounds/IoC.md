---
title: IoC
description: Hier zetten we tijdelijk een alle debug commands
---


## Zie alle functies uit een .dll


```
dumpbin /exports sampleDLL.dll
```

dumpbin.exe /IMPORTS .\HelloUniverse.exe

dumpbin /disasm HelloUniverse.exe | Select-String "Hello" -Context 5,5

umpbin /disasm HelloUniverse.exe | findstr /C:"Hello" /N

## Bekijk alle bestaande functies in een .exe

```
dumpbin.exe /IMPORTS .\HelloUniverse.exe
```

## DOS Header IMAGE_DOS_HEADER
Signature: De eerste twee bytes zijn altijd 0x4D en 0x5A (oftewel MZ).


## Verdacht

Een legitiem Windows systeem proces dat draait vanuit een ongebruikelijke locatie is een sterke indicator van compromise.

## Bekijk alle strings

strings.exe .\HelloUniverse.exe
