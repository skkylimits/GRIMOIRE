# Refer to https://learn.microsoft.com/en-us/windows/terminal/search for more useful settings & tricks

# Save JSON-config as string
$customSettings = @"
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": 
    [   
        // copy
        {
            "command": 
            {
                "action": "copy",
                "singleLine": false
            },
            "id": "User.copy.644BA8F2",
            "keys": "ctrl+c"
        },

        //paste
        {
            "command": "paste",
            "id": "User.paste",
            "keys": "ctrl+v"
        },

        // Open new window command
        {
            "command": "newWindow",
            "keys": "ctrl+shift+n",
            "id": "Terminal.OpenNewWindow"
        },

        // close pane/tab/window
        { "command": "closePane", "keys": "ctrl+shift+w" },

        // duplicate tab
        {
            "command": "duplicateTab",
            "keys": "ctrl+shift+d",
            "id": "Terminal.DuplicateTab"
        },

        // split pane
        {
            "command": 
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "id": "User.splitPane.A6751878",
            "keys": "alt+shift+d"
        },

        // split panes
        // { "command": { "action": "splitPane", "split": "vertical" }, "keys": "alt+shift+plus" },
        // { "command": { "action": "splitPane", "split": "horizontal" }, "keys": "alt+shift+-" },
        { "command": { "action": "splitPane", "split": "auto" }, "keys": "alt+shift+d" },

        // toggle pane orientation
        { "command": "toggleSplitOrientation", "keys": "alt+o" },

        // resize pane
        { "command": { "action": "resizePane", "direction": "down" }, "keys": "alt+shift+down" },
        { "command": { "action": "resizePane", "direction": "up" }, "keys": "alt+shift+up" },
        { "command": { "action": "resizePane", "direction": "left" }, "keys": "alt+shift+left" },
        { "command": { "action": "resizePane", "direction": "right" }, "keys": "alt+shift+right" },

        // zoom pane
        { "command": "togglePaneZoom", "keys": "alt+ctrl+plus" },

        // restart pane
        // { "command": "restartConnection", "id": "Terminal.RestartConnection", "keys": "alt+r" },

        // toffle fullscreen
        {
            "command": "toggleFullscreen",
            "keys": "alt+enter",
            "id": "Terminal.ToggleFullscreen"
        },
    
        // swap pane(still bugged, loses it's focus after swapping) -> double tab to get focus back
        { "command": { "action": "swapPane", "direction": "down" }, "keys": "alt+ctrl+down" },
        { "command": { "action": "swapPane", "direction": "up" }, "keys": "alt+ctrl+up" },
        { "command": { "action": "swapPane", "direction": "left" }, "keys": "alt+ctrl+left" },
        { "command": { "action": "swapPane", "direction": "right" }, "keys": "alt+ctrl+right" },

        // move pane to another tab index
        { "command": { "action": "movePane", "index": 0 }, "keys": "alt+1" },
        { "command": { "action": "movePane", "index": 1 }, "keys": "alt+2" },
        { "command": { "action": "movePane", "index": 2 }, "keys": "alt+3" },
        { "command": { "action": "movePane", "index": 3 }, "keys": "alt+4" },
        { "command": { "action": "movePane", "index": 4 }, "keys": "alt+5" },
        { "command": { "action": "movePane", "index": 5 }, "keys": "alt+6" },
        { "command": { "action": "movePane", "index": 6 }, "keys": "alt+7" },
        { "command": { "action": "movePane", "index": 7 }, "keys": "alt+8" },
        { "command": { "action": "movePane", "index": 8 }, "keys": "alt+9" },

        // tab search
        {
            "keys": "ctrl+alt+t",
            "command": "tabSearch",
            "id": "Terminal.TabSearch"
        },

        // Web search command with queryUrl
        {
            "command": { 
                "action": "searchWeb",
                "queryUrl": "https://www.google.com/search?q=%s"
            },
            "keys": "ctrl+shift+f",
            "id": "Terminal.SearchWeb"
        },
          
        // find
        {
            "command": "find",
            "id": "User.find",
            "keys": "ctrl+f"
        },

        { "command": { "action": "findMatch", "direction": "next" }, "id": "Terminal.FindNextMatch" }, // enter
        { "command": { "action": "findMatch", "direction": "prev" }, "id": "Terminal.FindPrevMatch" },  // shift + enter

        // open new dropdown
        { "command": "openNewTabDropdown", "id": "Terminal.OpenNewTabDropdown", "keys": "ctrl+shift+space"},

        // Open settings commands
        {
            "command": { "action": "openSettings", "target": "settingsUI" },
            "keys": "ctrl+,",
            "id": "Terminal.OpenSettingsUI"
        },
        {
            "command": { "action": "openSettings", "target": "settingsFile" },
            "keys": "ctrl+shift+,",
            "id": "Terminal.OpenSettingsFile"
        },
        {
            "command": { "action": "openSettings", "target": "defaultsFile" },
            "keys": "ctrl+alt+,",
            "id": "Terminal.OpenDefaultSettingsFile"
        }
    ],
    "centerOnLaunch": true,
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{51855cb2-8cce-5362-8f54-464b92b32386}",
    "initialCols": 150,
    "initialPosition": ",",
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
                "colorScheme": "Campbell Powershell",
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
                "adjustIndistinguishableColors": "never",
                "colorScheme": "13",
                "experimental.retroTerminalEffect": false,
                "experimental.rightClickContextMenu": true,
                "font": 
                {
                    "face": "Cascadia Mono"
                },
                "guid": "{51855cb2-8cce-5362-8f54-464b92b32386}",
                "hidden": false,
                "historySize": 9999,
                "intenseTextStyle": "bright",
                "name": "UUB",
                "showMarksOnScrollbar": false,
                "source": "CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc",
                "startingDirectory": "%USERPROFILE%",
                "tabTitle": "UUB",
                "useAcrylic": false
            },
            {
                "guid": "{d8e96812-b789-5068-a5ae-10b2fb53e95f}",
                "hidden": false,
                "name": "Ubuntu 24.04.1 LTS",
                "source": "CanonicalGroupLimited.Ubuntu24.04LTS_79rhkp1fndgsc"
            },
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
        }
    ],
    "themes": [],
    "useAcrylicInTabRow": false
}
"@

# Path to Windows Terminal settings.json
$settingsPath = "$env:USERPROFILE\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"

# JSON saved in settings.json
Set-Content -Path $settingsPath -Value $customSettings -Encoding UTF8

Write-Host "Settings saved in $settingsPath"
