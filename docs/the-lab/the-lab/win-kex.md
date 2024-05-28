# Win-Kex

Visit [Official Kali Win-Kex Docs](https://www.kali.org/docs/wsl/win-kex/) for more information

## Prerequisites

Installed WSL2 on machine.

## Install a Linux Distribution

### List installed distro's

`wsl --list`

### List Available Distributions

`wsl --list --online`

### ⚠ Install A Distribution Via Powershell

For some reason this version we're pulling wron wsl --list --online is not the current version of kali linux.

> Do not do this ⚠

`wsl --install -d kali-linux`

### Work Around

1. **Open Microsoft Store**:
   - Search for "Linux" to see available distributions like Ubuntu, Debian, Kali Linux, openSUSE, etc.

2. **Select the distribution you want to install** and click "Get" to install it.

### Open Distribution & Choose Username/Password

<br />
<img src="./assets/skkylimits@lucifer.png">

### Update Dependencies

`sudo apt update &&`  
`sudo apt upgrade`

## Installing Kali-Win-Kex

```bash
sudo apt install kali-win-kex -y
```

::: details Troubleshooting

### Troubleshooting APT Not Working

1. **Upgrade Packages**

    ```bash
    sudo apt upgrade
    ```

2. **Identify the Process Holding the Lock**

    ```bash
    ps aux | grep -E 'apt|dpkg'
    ```

3. **Kill the Process Holding the Lock**

    ```bash
    sudo kill -9 <pid>  # Replace <pid> with the actual PID found in the previous step
    ```

4. **Remove Lock Files**

    ```bash
    sudo rm /var/lib/dpkg/lock-frontend
    sudo rm /var/lib/dpkg/lock
    ```

5. **Reconfigure dpkg**

    ```bash
    sudo dpkg --configure -a
    ```

6. **Update and Upgrade Packages Again**

    ```bash
    sudo apt update
    sudo apt upgrade
    ```

7. **Fix Broken Packages**

    ```bash
    sudo apt --fix-broken install
    ```

8. **Identify Processes Holding Configuration Locks**

    ```bash
    ps aux | grep -E 'apt|dpkg'
    ```

9. **Manually Find and Kill Processes**

    ```bash
    sudo kill -9 <pid1> <pid2> <pid3>  # Replace <pidX> with actual PIDs
    ```

10. **Remove Lock Files Again**

    ```bash
    sudo rm /var/cache/debconf/config.dat
    sudo rm /var/lib/dpkg/lock
    sudo rm /var/lib/dpkg/lock-frontend
    ```

11. **Reconfigure dpkg Again**

    ```bash
    sudo dpkg --configure -a
    ```

12. **Attempt to Fix Broken Packages Again**

    ```bash
    sudo apt --fix-broken install
    ```

13. **Reinstall `libc-bin`**

    ```bash
    sudo apt install --reinstall libc-bin
    ```

14. **Clean Up**

    ```bash
    sudo apt clean
    ```

15. **Final Update and Upgrade**

    ```bash
    sudo apt update
    sudo apt upgrade
    ```

After following these steps, you should have successfully resolved the dpkg lock issues and unmet dependencies, allowing `apt upgrade` to complete without errors.

### Why This Error Happened

The error occurred due to an interrupted apt upgrade process which left the package management system in an inconsistent state. When apt upgrade was aborted, it likely left lock files (/var/lib/dpkg/lock and /var/lib/dpkg/lock-frontend) and partially configured packages. These lock files prevent other package management commands from running to avoid conflicting operations. Additionally, the partial configuration of essential packages like libc6 led to unmet dependencies and further complications.

### Additional Notes

- If you frequently encounter issues with locked processes, consider reviewing what might be causing interruptions (e.g., system updates, other package managers running in the background, etc.).
- Always avoid forcefully removing lock files, as this can lead to system instability. Follow the steps above to safely manage the processes.

By following these steps, you should be able to resolve the lock issue and proceed with installing Win-KeX.
:::

## Launching Win-KeX

- Once installed, you can launch Win-KeX in different modes. Here are the common modes:

  - **Window Mode**:

       ```bash
       kex --win -s
       ```

       This mode launches a new window running the Kali Linux desktop environment.

  - **Seamless Mode**:

       ```bash
       kex --sl -s
       ```

       This mode integrates Kali applications with the Windows desktop.

  - **Enhanced Session Mode**:

       ```bash
       kex --esm -s
       ```

       This mode provides a full desktop experience with additional features like sound support and clipboard sharing.

::: details Troubleshooting

- If you encounter issues with launching Win-KeX, make sure that your WSL 2 installation is working correctly by running:

  ```bash
  wsl --list --verbose
  ```

- Ensure that you have the latest updates for both Windows and WSL.

By following these steps, you should be able to install and run Win-KeX on Kali Linux within WSL 2, providing a seamless desktop experience on Windows.
:::

::: details What is the best mode to use Win-Kex with?

For hacking purposes and security considerations, the best option to launch Win-KeX would typically be the "Seamless Mode" (`--sl`).

Here's why:

1. **Integration with Windows Desktop:** Seamless Mode integrates Kali Linux applications with the Windows desktop environment. This allows you to work with Kali tools alongside your Windows applications seamlessly, enhancing productivity and workflow.

2. **Minimizes Distractions:** By integrating Kali applications with the Windows desktop, Seamless Mode reduces distractions caused by switching between different environments. You can focus on your hacking tasks without interruptions.

3. **Ease of Use:** Seamless Mode provides a user-friendly experience, making it easier to access and use Kali Linux tools within the familiar Windows interface. This can be particularly beneficial for users who are more comfortable with the Windows environment.

4. **Security Considerations:** While all modes aim to provide a secure environment, Seamless Mode ensures that Kali Linux applications are contained within the Windows desktop environment. This can help mitigate potential security risks associated with running a separate desktop environment.

However, it's essential to keep in mind that security considerations extend beyond the choice of launch mode. Proper security practices, such as keeping software up-to-date, using strong passwords, and implementing network security measures, are crucial for maintaining a secure hacking environment. Additionally, always use Win-KeX in conjunction with other security tools and techniques to ensure a robust defense against potential threats.
:::

## Cloning Win-KeX

Given that your Kali Linux with Win-KeX is running in Windows Subsystem for Linux (WSL). Here’s how you can create a clonable backup of your Kali Linux WSL2 environment:

1. **Export the WSL2 Distribution**:
   - Open PowerShell with administrative privileges.
   - List your WSL distributions to find the correct name:

     ```powershell
     wsl --list --verbose
     ```

   - Export the Kali Linux distribution to a tar file:

     ```powershell
     wsl --export kali-linux C:\path\to\kali-linux.tar
     ```

2. **Install Kali Linux on Another Machine**:
   - On the target machine, ensure that WSL2 is installed and set as the default version:

     ```powershell
     wsl --install
     wsl --set-default-version 2
     ```

   - Import the previously exported Kali Linux tar file:

     ```powershell
     wsl --import kali-linux C:\path\to\install\directory C:\path\to\kali-linux.tar --version 2
     ```

3. **Configure Win-KeX on the Target Machine**:
   - Open the imported Kali Linux distribution in WSL:

     ```powershell
     wsl -d kali-linux
     ```

   - Update the package list and install `kali-win-kex` if not already installed:

     ```bash
     sudo apt update
     sudo apt upgrade -y
     sudo apt install -y kali-win-kex
     ```

4. **Start Win-KeX**:
   - You can start Win-KeX in window mode with:

     ```bash
     kex --win -s
     ```

### Notes

- **Paths**: Adjust the paths (`C:\path\to\...`) to match your actual directory structure.
- **Permissions**: Ensure that you have the necessary permissions to read/write to the specified directories.
- **Data Integrity**: Make sure that any sensitive data is securely handled during the export/import process.

This process effectively clones your Kali Linux WSL2 setup, including all your configurations and installed packages, making it ready for deployment on other machines.
