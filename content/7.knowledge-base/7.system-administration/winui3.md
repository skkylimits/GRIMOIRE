---
title: Winui 3 
description: Self-Contained App met Admin-rechten (Unpackaged)
---

::caution
We willen een **minimale, self-contained WinUI 3 app met elevation** — precies de basis voor een PowerToys-achtige tool.
::

Dit document beschrijft hoe je een **nieuwe WinUI 3 applicatie** maakt die:

* **Self-contained** draait (geen aparte runtime nodig).
* **Unpackaged** draait (dus buiten MSIX).
* Altijd met **Administrator-rechten (UAC prompt)** start.

**De solution bestaat uit drie projecten:**

```
SelfContainedUnpackagedApp/   → jouw hoofdapp (WinUI 3, net8.0, unpackaged, self-contained)
Installer.Setup/              → Visual Studio Installer Project (.vdproj) → maakt .msi + setup.exe
Installer.CustomActions/      → .NET Framework Class Library → levert CustomAction DLL
```

## ❤️ SelfContaineredUnpackagedApp

### ⚙️ 1. Nieuw project aanmaken

1. Open **Visual Studio 2022**.
2. Kies **Blank App, Packaged (WinUI 3 in Desktop)**.
3. Geef een naam, bv. `SelfContainedUnpackagedApp`.
4. Maak aan.

> ℹ️ We starten vanuit een *packaged project*, maar schakelen MSIX daarna uit.

### ⚙️ 2. Run-opties aanpassen

1. Zet build config van **Debug** naar **Release**.
2. In de **Run dropdown** (naast groene ▶️ knop): kies **Unpackaged** in plaats van **Packaged**.

### ⚙️ 3. `app.manifest` toevoegen

Als `app.manifest` nog niet bestaat:

* Rechtermuisknop op project → *Add → New Item…* → kies **Application Manifest File**.

Vervang de inhoud door:

```xml
<?xml version="1.0" encoding="utf-8"?>
<assembly manifestVersion="1.0" xmlns="urn:schemas-microsoft-com:asm.v1">
	<assemblyIdentity version="1.0.0.0" name="Test.app"/>

	<compatibility xmlns="urn:schemas-microsoft-com:compatibility.v1">
		<application>
			<!-- Windows 10+ -->
			<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}" />
		</application>
	</compatibility>

	<trustInfo xmlns="urn:schemas-microsoft-com:asm.v2">
		<security>
			<requestedPrivileges>
				<!-- 👇 Zorgt voor UAC prompt -->
				<requestedExecutionLevel level="requireAdministrator" uiAccess="false" />
			</requestedPrivileges>
		</security>
	</trustInfo>

	<application xmlns="urn:schemas-microsoft-com:asm.v3">
		<windowsSettings>
			<dpiAwareness xmlns="http://schemas.microsoft.com/SMI/2016/WindowsSettings">
				PerMonitorV2
			</dpiAwareness>
		</windowsSettings>
	</application>
</assembly>
```

### ⚙️ 4. `.csproj` aanpassen

Open `SelfContainedUnpackagedApp.csproj` en pas aan zoals hieronder.

Belangrijk: `<WindowsPackageType>None</WindowsPackageType>`, `<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>` en `<ApplicationManifest>app.manifest</ApplicationManifest>` toevoegen.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
    <RootNamespace>SelfContainedUnpackagedApp</RootNamespace>
    <Platforms>x86;x64;ARM64</Platforms>
    <RuntimeIdentifiers>win-x86;win-x64;win-arm64</RuntimeIdentifiers>
    <PublishProfile>win-$(Platform).pubxml</PublishProfile>
    <UseWinUI>true</UseWinUI>
    <EnableMsixTooling>true</EnableMsixTooling>
    <Nullable>enable</Nullable>

    <!-- 🚀 Unpackaged & Self-contained -->
    <WindowsPackageType>None</WindowsPackageType>
    <WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>
    <ApplicationManifest>app.manifest</ApplicationManifest>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="Assets\SplashScreen.scale-200.png" />
    <Content Include="Assets\LockScreenLogo.scale-200.png" />
    <Content Include="Assets\Square150x150Logo.scale-200.png" />
    <Content Include="Assets\Square44x44Logo.scale-200.png" />
    <Content Include="Assets\Square44x44Logo.targetsize-24_altform-unplated.png" />
    <Content Include="Assets\StoreLogo.png" />
    <Content Include="Assets\Wide310x150Logo.scale-200.png" />
  </ItemGroup>

  <ItemGroup>
    <Manifest Include="$(ApplicationManifest)" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Windows.SDK.BuildTools" Version="10.0.26100.4948" />
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.8.250907003" />
  </ItemGroup>

  <PropertyGroup>
    <PublishReadyToRun Condition="'$(Configuration)' == 'Debug'">False</PublishReadyToRun>
    <PublishReadyToRun Condition="'$(Configuration)' != 'Debug'">True</PublishReadyToRun>
    <PublishTrimmed Condition="'$(Configuration)' == 'Debug'">False</PublishTrimmed>
    <PublishTrimmed Condition="'$(Configuration)' != 'Debug'">True</PublishTrimmed>
  </PropertyGroup>
</Project>
```


### ⚙️ 5. Verwijder `Package.appxmanifest`

Omdat we de app **unpackaged** draaien (`<WindowsPackageType>None</WindowsPackageType>`), gebruiken we alleen **`app.manifest`** voor adminrechten.
Het bestand **`Package.appxmanifest`** hoort bij MSIX-packaged apps en geeft foutmeldingen.

👉 Verwijder `Package.appxmanifest` uit je project (rechtsklik → *Remove*) om build errors te voorkomen.


### 🛡️ 6. Fact-check: draait de app echt met Admin-rechten?

Om te controleren of de app daadwerkelijk met **administrator-rechten** draait, pas je `MainWindow.xaml` en `MainWindow.xaml.cs` aan.

👉 Hiermee verschijnt een knop *“Check Admin”* die live laat zien of je proces met adminrechten runt.

#### `MainWindow.xaml`

```xml
<Window
    x:Class="SelfContainedUnpackagedApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:SelfContainedUnpackagedApp">

    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="12">
        <TextBlock x:Name="txtStatus" FontSize="18" Text="Klik op de knop om te checken…" />
        <Button Content="Check Admin" Click="OnCheckAdminClick"/>
    </StackPanel>
</Window>
```

#### `MainWindow.xaml.cs`

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Security.Principal;

namespace SelfContainedUnpackagedApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }

        private void OnCheckAdminClick(object sender, RoutedEventArgs e)
        {
            using WindowsIdentity identity = WindowsIdentity.GetCurrent();
            WindowsPrincipal principal = new WindowsPrincipal(identity);
            bool isAdmin = principal.IsInRole(WindowsBuiltInRole.Administrator);

            txtStatus.Text = isAdmin
                ? "✅ Running as Administrator"
                : "❌ Not running as Administrator";
        }
    }
}
```

#### 🔎 Verwacht resultaat

* Start je app normaal → zie je ❌ *Not running as Administrator*.
* Start je app via UAC (of met de `app.manifest` zoals eerder toegevoegd) → zie je ✅ *Running as Administrator*.


### ⚙️ 7. Build & Run

1. **Rebuild Solution**
2. Start via Visual Studio → je krijgt een **UAC prompt**
3. Of dubbelklik op `bin\x64\Release\net8.0-windows10.0.19041.0\SelfContainedUnpackagedApp.exe`



## 📦 Installers

### ⚙️ 1. Installer Project maken

1. **Solution Explorer** → Rechtermuisknop Solution → *Add → New Project*.
2. Kies **Setup Project** (*Installer Projects extension*).

   * Naam: `Installer.Setup`
   * Opslaan in een **aparte map**, niet in je app-map.

### ⚙️ 2. Custom Actions Project maken

⚠️ Belangrijk: **Custom Actions moeten .NET Framework zijn**, niet .NET 8.
Waarom? Omdat `System.Configuration.Install.Installer` alleen in .NET Framework zit.

1. Voeg nieuw project toe → **Class Library (.NET Framework)**.

   * Naam: `Installer.CustomActions`
   * Target Framework: **.NET Framework 4.7.2**.
2. Voeg referentie toe aan:

   * **System.Configuration.Install**
   * **System.Windows.Forms** (als je UI wilt tonen tijdens installatie).

#### 📄 Voorbeeldcode (Installer.CustomActions/Class1.cs)

```csharp
﻿using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration.Install;
using System.Diagnostics;

namespace InstallerActions
{
    [RunInstaller(true)]
    public class CustomInstaller : Installer
    {
        public override void Install(IDictionary stateSaver)
        {
            base.Install(stateSaver);

            string script = @"
                if ((Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All).State -ne 'Enabled') {
                    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All -NoRestart
                }
                if ((Get-WindowsOptionalFeature -Online -FeatureName Containers-DisposableClientVM).State -ne 'Enabled') {
                    Enable-WindowsOptionalFeature -Online -FeatureName Containers-DisposableClientVM -All -NoRestart
                }
            ";

            RunPowerShell(script);
        }

        private void RunPowerShell(string script)
        {
            var psi = new ProcessStartInfo("powershell.exe",
                "-ExecutionPolicy Bypass -Command \"" + script + "\"")
            {
                Verb = "runas",
                CreateNoWindow = true,
                UseShellExecute = true
            };

            using (var process = Process.Start(psi))
            {
                process?.WaitForExit();
            }
        }
    }
}
```

3. **Build** → je krijgt `Installer.CustomActions.dll` in:

   ```
   Installer.CustomActions/bin/Release/Installer.CustomActions.dll
   ```

### ⚙️ 3. Custom Action koppelen aan Installer

1. Open `Installer.Setup`.
2. Ga naar *View → Custom Actions*.
3. Rechtermuisknop op **Install** → *Add Custom Action…*.
4. Blader naar:

   ```
   Installer.CustomActions/bin/Release/Installer.CustomActions.dll
   ```
5. Selecteer deze → klaar.

👉 Waarom niet via *Primary Output*?
Omdat .NET 8 projecten geen `Installer` class meer hebben, krijg je anders deze fouten:

```
CS0234 The type or namespace name 'Install' does not exist...
CS0246 The type or namespace name 'Installer' could not be found...
```

De workaround = een apart **.NET Framework project** bouwen en de DLL **handmatig toevoegen**.

### 📑 4. `Installer.Setup.vdproj`

Open het bestand `Installer.Setup.vdproj` in een teksteditor.
Dit zijn de belangrijkste velden die je moet controleren/aanpassen:

#### 1. Platform (64-bit)

```txt
"TargetPlatform" = "3:1"
```

Betekenis:

* `3:0 = x86`
* `3:1 = x64`
* `3:2 = Itanium` (vrijwel nooit meer gebruikt)

➡️ Zorgt dat de installer naar **Program Files (64-bit)** gaat.

#### 2. Installatiepad

```txt
"DefaultLocation" = "8:[ProgramFiles64Folder][ProductName]"
```

➡️ App wordt geplaatst in:
`C:\Program Files\SelfContainedUnpackagedApp\`

#### 3. Product info

Pas in sectie **Product** aan:

```txt
"ProductName" = "8:SelfContainedUnpackagedApp"
"Title" = "8:SelfContainedUnpackagedApp"
"Subject" = "8:A WinUI 3 self-contained unpackaged app"
"Manufacturer" = "8:skkylimits"
"ARPCONTACT" = "8:skkylimits"
```

➡️ Zorgt voor juiste naam in **Program Files**, **Control Panel**, en **Uninstall entry**.

#### 4. Registry

Controleer sectie **Registry**:

```txt
"Name" = "8:[Manufacturer]"
```

➡️ Keys komen terecht in:
`HKLM\Software\skkylimits\SelfContainedUnpackagedApp`

👉 Met alleen deze 4 checks/aanpassingen is je MSI setup project netjes ingesteld.

### ⚙️ 5. Publish de applicatie

Om alle bestanden van de app (incl. runtime) te verzamelen:

```sh
dotnet publish -c Release -r win-x64 --self-contained true
```

De output staat in:

```
bin\Release\net8.0-windows10.0.19041.0\win-x64\publish\
```

👉 Deze map bevat:

* De **.exe** (entrypoint van je app)
* Alle **.dll’s** van je project en dependencies
* .NET runtime assemblies (self-contained)
* Config, JSON, assets

### ⚙️ 6. Visual Studio Setup Project aanpassen

1. Ga in Solution Explorer naar **Installer.Setup**.
2. Open → *View → File System*.
3. Selecteer **Application Folder**.
4. **Verwijder** de bestaande *Primary Output*.
5. Klik **Add → Files…** en voeg **alle bestanden** toe uit de `publish\` map.

Resultaat: je MSI bevat exact de inhoud van `publish\`.

## 🎯 7. Resultaat

* App draait **zonder MSIX**.
* App start altijd **met adminrechten** dankzij manifest.
* Werkt zowel vanuit Visual Studio als los uit de build-map.
* Installer installeert app netjes in **Program Files** met juiste registry keys via een MSI

## 🔄 Workflow (Belangrijk!)

👉 Volg altijd deze volgorde om een **verse MSI** te bouwen:

1. **SelfContainedUnpackagedApp → Publish**

   ```sh
   dotnet publish -c Release -r win-x64 --self-contained true
   ```

   → Genereert de distributiebestanden.

2. **Installer.CustomActions → Build**
   → Bouwt je custom actions DLL (indien aanwezig).

3. **Installer.Setup → Build (of Rebuild)**
   → Pakt bestanden uit `publish\` + evt. CustomActions DLL → maakt `.msi` en `setup.exe`.

**Resultaat:** een complete MSI met de juiste `.exe` erin.

## ℹ️ 99. Debug vs Release in Visual Studio

* **Debug build** → gebruik dit tijdens ontwikkeling.

  * Breakpoints werken.
  * Makkelijk debuggen.

* **Release build** → gebruik dit om te distribueren.

  * Code is geoptimaliseerd.
  * Debuggen werkt minder goed (breakpoints soms niet).
  * Meldingen als *“degraded debugging experience”* zijn normaal.

👉 Dus: **Debug om te testen**, **Release om te leveren**.

## TODO

**Don't run as elevated program all the time**:

> Leg me opnieuw uit hoe PowerToys omgaat met adminrechten.
>
> * Standaard niet als admin starten
> * Optioneel “Run as administrator” toggle in de instellingen
> * Hoe ik mijn WinUI3 app van altijd-admin (`requireAdministrator`) kan ombouwen naar optioneel-admin (`asInvoker` + herstarten met `runas`).
>   Voeg een code-snippet toe voor het herstarten van de app als admin.

**Unistall**:

> Geef me opnieuw de uitleg over hoe je een **uninstall shortcut** toevoegt aan mijn Visual Studio Installer project (vdproj). Ik wil weten:
>
> 1. Hoe Windows Installer standaard al een uninstall entry maakt via `msiexec /x {ProductCode}`.
> 2. Hoe ik een **Startmenu Uninstall Shortcut** kan toevoegen die `msiexec /x {ProductCode}` uitvoert.
> 3. Hoe ik optioneel een **Uninstall.exe** in de installatiemap kan toevoegen.
> 4. Wat de **best practice** is (minimaal standaard uninstall, optioneel shortcut).

**Microsoft Store**

“We hebben een werkende self-contained unpackaged app en een MSI installer. Nu wil ik, net zoals PowerToys, een versie maken die geschikt is voor de Microsoft Store maar tóch adminfunctionaliteit kan uitvoeren. Kun je een flow uitschrijven waarbij de app wordt opgesplitst in een normale GUI (MSIX) en een aparte elevated helper/service (self-contained exe) waarmee de GUI kan communiceren voor admin-taken?”
