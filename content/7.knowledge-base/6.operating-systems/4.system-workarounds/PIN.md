---
title: PIN Reset (Windows)
description: Resetting your Windows PIN using admin privileges.
---

## Resetting Windows PIN (Admin Privileges)

If you find yourself locked out of your Windows account due to failed sign-in attempts or an inaccessible PIN, here's how you can reset it using admin privileges. This method requires **Administrator** access and should be performed carefully.

### Prerequisites:
- You need administrative privileges on the system.
- The method requires access to PowerShell or Command Prompt with admin rights.

### Steps:

1. **Open PowerShell as Administrator:**
   - Press `Win + X`, then select **Windows Terminal (Admin)** or **PowerShell (Admin)**.
   - Alternatively, you can search for `PowerShell`, right-click, and select **Run as Administrator**.

2. **Take Ownership of the 'Ngc' Folder:**
   - In PowerShell, type the following command to take ownership of the folder that holds the PIN-related information.
   ```bash
   takeown /f C:\Windows\ServiceProfiles\LocalService\AppData\Local\Microsoft\Ngc /r /d y
   ```
   This command changes the ownership of the **Ngc** folder, which is where the PIN data is stored.

3. **Navigate to the Ngc Folder:**
   - Once you have ownership, use the following command to navigate to the folder:
   ```bash
   cd C:\Windows\ServiceProfiles\LocalService\AppData\Local\Microsoft\
   ```

4. **Delete the 'Ngc' Folder:**
   - Now that you're in the correct directory, delete the **Ngc** folder using this command:
   ```bash
   rmdir /s /q Ngc
   ```
   The **/s** flag removes all subdirectories and files, and the **/q** flag runs the command quietly (without prompting for confirmation).

### What this does:
- This process deletes the folder where the PIN-related files are stored, essentially clearing the PIN data.
- After performing this, Windows will prompt you to set up a new PIN the next time you log in or attempt to set one up.

::note
- This method is intended for **legitimate recovery** or management of your own machine, and using it for unauthorized access could violate privacy laws and agreements.
- **Make sure to have a backup** of any critical data before performing these actions.
::

### Resetting Your PIN:
- After deleting the **Ngc** folder, you will need to **reboot** the machine.
- Upon reboot, you can go to **Settings > Accounts > Sign-in options** and set up a new PIN.

---

## Additional References:
- [Microsoft Answer: How to Reset PIN](https://answers.microsoft.com/en-us/windows/forum/all/how-do-i-reset-my-windows-pin/39f7c660-7464-4b07-a58b-0cb9f098d26b)
- [Superuser: Unable to Sign in to Windows 11](https://superuser.com/questions/1757603/unable-to-sign-in-to-windows-11-due-to-failed-sign-in-attempts)

This procedure should help you resolve issues related to a locked-out PIN or failed sign-in attempts.
