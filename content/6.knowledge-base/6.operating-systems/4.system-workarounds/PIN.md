https://answers.microsoft.com/en-us/windows/forum/all/how-do-i-reset-my-windows-pin/39f7c660-7464-4b07-a58b-0cb9f098d26b

https://superuser.com/questions/1757603/unable-to-sign-in-to-windows-11-due-to-failed-sign-in-attempts

1 admin powershell

2 takeown /f C:\Windows\ServiceProfiles\LocalService\AppData\Local\Microsoft\Ngc /r /d y

3 cd C:\Windows\ServiceProfiles\LocalService\AppData\Local\Microsoft\

4 delete `Ngc` folder
