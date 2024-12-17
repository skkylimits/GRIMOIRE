

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


## PORTS

#### What the hell are a TCP and a UDP ports

```
cat /etc/services 
grep -w '80/tcp' /etc/services 
grep -w '443/tcp' /etc/services 
grep -E -w '22/(tcp|udp)' /etc/services
```

My frequently used command is:

```
netstat -tulpn 
```

#### Using netstat to list open ports

```
sudo netstat -tulpn | grep LISTEN
```

#### Open and kill ports

## How to force kill process in Linux

1. Use the pidof command to find the process ID of a running program or app
   ```
   pidof appname
   ```

2. To kill process in Linux with PID:

   ```
   kill -9 pid
   ```

3. Want to kill process in Linux with application name? Try:
   ```
   killall -9 appname
   ```

   

https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/

	### npx npkill

remove & delete all node_modules files
