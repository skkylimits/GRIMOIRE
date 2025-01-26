https://janbakker.tech/download-intune-powershell-scripts-with-graph-explorer/

0. Log in with tenant

don't forget to open the permissions panel in graph and add the following permissions:

- APIConnectors.Read.All
- APIConnectors.ReadWrite.All

1. https://graph.microsoft.com/beta/deviceManagement/deviceManagementScripts

get id

2. https://graph.microsoft.com/beta/deviceManagement/deviceManagementScripts/{deviceManagementScriptId}

3. convert base64 to script - https://www.base64decode.org/
