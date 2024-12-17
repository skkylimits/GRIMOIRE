# Refer to https://learn.microsoft.com/en-us/windows/terminal/search for more useful settings & tricks

# Save JSON-config as string
$customSettings = @"
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": 
    [
        {
            "command": 
            {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        }
    ],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{51855cb2-8cce-5362-8f54-464b92b32386}",
    "initialCols": 150,
    "newTabMenu": 
    [
        {
            "type": "remainingProfiles"
        }
    ],
    "profiles": 
    {
        "defaults": {},
        "list": 
        [
            {
                "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
            },
            {
                "commandline": "%SystemRoot%\\System32\\cmd.exe",
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "Command Prompt"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": false,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            },
            {
                "colorScheme": "13",
                "guid": "{51855cb2-8cce-5362-8f54-464b92b32386}",
                "hidden": false,
                "name": "Ubuntu",
                "source": "CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc"
            },
            {
                "colorScheme": "13",
                "guid": "{4ff56d04-d9cf-57ea-bae2-ad396374e7e3}",
                "hidden": false,
                "name": "Ubuntu 22.04.5 LTS",
                "source": "CanonicalGroupLimited.Ubuntu22.04LTS_79rhkp1fndgsc"
            }
        ]
    },
    "schemes": 
    [
        {
            "background": "#212225",
            "black": "#202124",
            "blue": "#CC342B",
            "brightBlack": "#969896",
            "brightBlue": "#CC342B",
            "brightCyan": "#CC342B",
            "brightGreen": "#2AE673",
            "brightPurple": "#A36AC7",
            "brightRed": "#CC342B",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#FFF508",
            "cursorColor": "#FFFFFF",
            "cyan": "#CC342B",
            "foreground": "#FFFFFF",
            "green": "#2AE673",
            "name": "13",
            "purple": "#A36AC7",
            "red": "#CC342B",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#FFF508"
        },
        {
            "background": "#300A24",
            "black": "#171421",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#08458F",
            "brightCyan": "#2C9FB3",
            "brightGreen": "#26A269",
            "brightPurple": "#A347BA",
            "brightRed": "#C01C28",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#A2734C",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#FFFFFF",
            "green": "#26A269",
            "name": "Ubuntu-ColorScheme",
            "purple": "#881798",
            "red": "#C21A23",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#A2734C"
        }
    ],
    "themes": []
}
"@

# Path to Windows Terminal settings.json
$settingsPath = "$env:USERPROFILE\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"

# JSON saved in settings.json
Set-Content -Path $settingsPath -Value $customSettings -Encoding UTF8

Write-Host "Settings saved in $settingsPath"
