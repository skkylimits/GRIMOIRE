function Set-RecommendedPowerSettings {
    Clear-Host
    # Import and set Ultimate power plan at Control Panel\Hardware and Sound\Power Options\Edit Plan Settings -> Change advanced power settings
    cmd /c "powercfg /duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 99999999-9999-9999-9999-999999999999 >nul 2>&1 & powercfg /SETACTIVE 99999999-9999-9999-9999-999999999999 >nul 2>&1"

    # Get all power plans and delete them
    powercfg /L | ForEach-Object {
        if ($_ -match "^\s*Power Scheme GUID: (\S+)") {
            $guid = $matches[1]
            if ($guid -ne "99999999-9999-9999-9999-999999999999") {
                cmd /c "powercfg /delete $guid" | Out-Null
            }
        }
    }

    # Registry modifications
    $regChanges = @(
        'HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowLockOption /t REG_DWORD /d 0', # Hides the Lock option from the Power menu
        'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings /v ShowSleepOption /t REG_DWORD /d 0', # Hides the Sleep option from the Power menu
        'HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power /v HiberbootEnabled /t REG_DWORD /d 0', # Disables Fast Startup (Hiberboot)
        'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabled /t REG_DWORD /d 0', # Disables hibernate
        'HKLM\SYSTEM\CurrentControlSet\Control\Power /v HibernateEnabledDefault /t REG_DWORD /d 0', # Disables default hibernate settings
        'HKLM\SYSTEM\CCurrentControlSet\Control\Power\PowerSettings\54533251-82be-4824-96c1-47b60b740d00\0cc5b647-c1df-4637-891a-dec35c318583 /v ValueMax /t REG_DWORD /d 0', # Unparks CPU cores by setting the maximum processor state: 100%
        'HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\d4e98f31-5ffe-4ce1-be31-1b38b384c009 /v Attributes /t REG_DWORD /d 2' # Unhides "USB 3 Link Power Management"
        'HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerSettings\2a737441-1930-4402-8d77-b2bebba308a3\0853a681-27c8-4100-a2fd-82013e970683 /v Attributes /t REG_DWORD /d 2' # Unhides "Hub Selective Suspend Timeout"
    )

    foreach ($reg in $regChanges) {
        cmd /c "reg add $reg /f >nul 2>&1"
    }

    # Ensure Hibernate file is deleted
    cmd /c "powercfg /h off >nul 2>&1"


    # Modify Advcaned Power Plan settings
    $settings = @(
        @{
            SubgroupGUID = "0012ee47-9041-4b5d-9b77-535fba8b1442" # Hard Disk
            SettingGUIDs = @("6738e2c4-e8a5-4a42-b16a-e040e769756e") # Turn off hard disk after: Never
        },
        @{
            SubgroupGUID = "0d7dbae2-4294-402a-ba8e-26777e8488cd" # Desktop Background Settings
            SettingGUIDs = @("309dce9b-bef4-4119-9921-a851fb12f0f4") # Slide show: Available
        },
        @{
            SubgroupGUID = "19cbb8fa-5279-450e-9fac-8a3d5fedd0c1" # Wireless Adapter Settings
            SettingGUIDs = @("12bbebe6-58d6-4636-95bb-3217ef867c1a") # Power saving mode: Maximum Performance
        },
        @{
            SubgroupGUID = "238c9fa8-0aad-41ed-83f4-97be242c8f20" # Sleep
            SettingGUIDs = @(
                "29f6c1db-86da-48c5-9fdb-f2b67b1f44da", # Sleep after: Never
                "bd3b718a-0680-4d9d-8ab2-e1d2b4ac806d"  # Allow wake timers: Disable
            )
        },
        @{
            SubgroupGUID = "2a737441-1930-4402-8d77-b2bebba308a3" # USB Settings
            SettingGUIDs = @(
                "0853a681-27c8-4100-a2fd-82013e970683", # USB selective suspend setting: Disabled 
                "d4e98f31-5ffe-4ce1-be31-1b38b384c009",  # USB Hub Selective Suspend Timeout: Disabled (0 milliseconds)
                "48e6b7a6-50f5-4782-a5d4-53bb8f07e226" # USB 3 Link Power Management: Off
            )
        },
        @{
            SubgroupGUID = "501a4d13-42af-4429-9fd1-a8218c268e20" # PCI Express
            SettingGUIDs = @("ee12f906-d277-404b-b6da-e5fa1a576df5") # Link State Power Management: Off
        },
        @{
            SubgroupGUID = "7516b95f-f776-4464-8c53-06167f40cc99" # Display settings
            SettingGUIDs = @("3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e") # Turn off Display After setting: Never
        }
    )

    foreach ($group in $settings) {
        $subgroup = $group.SubgroupGUID
        foreach ($setting in $group.SettingGUIDs) {
            powercfg /setacvalueindex 99999999-9999-9999-9999-999999999999 $subgroup $setting 0x00000000
            powercfg /setdcvalueindex 99999999-9999-9999-9999-999999999999 $subgroup $setting 0x00000000
        }
    }

    if (-not $isSpecializePhase) {
        Show-Header
        Write-Host "Recommended Power Settings Applied." -ForegroundColor Green
        Wait-IfNotSpecialize
        return
    }

############################################
#                  DEBUG                   #
############################################

# Displays the detailed configuration of all power settings for the currently active power plan.
# powercfg /query

# Generates a detailed energy report for your system, highlighting issues and inefficiencies in the power management configuration.
# powercfg /energy

# The command powercfg /a is used to display the sleep states that are currently available on your system. It helps you determine which power-saving states (e.g., Sleep, Hibernate, Hybrid Sleep) are supported or unsupported on your system.
# powercfg /a
}

