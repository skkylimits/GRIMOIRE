# WSL 2

Read more about WSl https://learn.microsoft.com/en-us/windows/wsl/install

## Pre-requisites

### Enable Virtualization

Enable svm mode in BIOS

### Windows Terminal

https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=nl-nl&gl=nl

## Install

```powershell
wsl --install
```

```powershell
wsl --install -d Ubuntu
```

### VS Code

Install VS Code on host machine

Install Remote Extension

https://code.visualstudio.com/docs/remote/wsl

```
 sudo apt-get install wget ca-certificates
```

https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode

Run update to use code .

```
sudo apt update -y
```

## setup.sh

Run the setup.sh to install packages.

### ~./.bashrc

Paste .bashrc from github into directory
