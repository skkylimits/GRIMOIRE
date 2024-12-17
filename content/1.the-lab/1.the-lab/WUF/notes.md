## Notepad Modern: UWP vs .exe

the new Windows 11 Notepad is a UWP (Universal Windows Platform) app rather than a traditional Win32 .exe. UWP apps like the new Notepad are sandboxed, and their settings are generally not modifiable through traditional registry tweaks. Instead, UWP apps use AppxManifest configurations or other modern deployment tools

As of yet not posssible to tweak base settings

## Unattend.xml Phases

1. Understanding the Unattend.xml Phases

The Unattend.xml configuration uses several specialize phases:

    WindowsPE: Initial boot environment for deployment.
    Generalize: Prepares the system for imaging.
    Specialize: Runs once the machine is deployed and initialized.
    AuditSystem: Used for advanced customizations.
    AuditUser: Used for user-specific customizations.
    OOBESystem: Runs before the end-user experience.

## Closing Methods

If Alt + F4 doesn't work (for some reason), you can use:

    Ctrl + Shift + W: This combination closes the currently active tab in Windows Terminal.

## Clear Desktop Icons

Remove-Item C:\Users\*\Desktop\*lnk –Force

## Create Custom Taskbar Icons for Firefox & Discord to adhere to the theme

## Automatically Log In To Apps/Websites

How it's setup now that we log in to firefox then keeper and then autofill manually for every site we want to use. Cookies will ensure we're logged in.

- Use keeper CLI -> retreive firefox acount, log in automatically so we use firefox sync. Then log in to other account on demand