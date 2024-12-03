<#
Program Workflow Visualization:

1. Initialize Folder & Paths
2. Check URL
   → Valid URL? 
       → Yes 
           → Download & Convert to Base64
           → Save File
       → No
           → Fallback to Base64 File or Image File
3. Decode Base64 or Use Existing File
4. Save File
5. Set Wallpaper
6. Log Success
#>

# Ensure the folder exists
if (-not (Test-Path -Path "C:\Temp")) {
    New-Item -ItemType Directory -Path "C:\Temp"
}

# URL of the image
$imageUrl = 'https://i.imgur.com/HyevkUi.png'
$downloadPath = "C:\Temp\windows-red.png"
$base64FilePath = "C:\Temp\windows-red-base64.txt"

# Function to check if the URL points to a valid image
function Test-ImageUrl {
    param ([string]$Url)

    try {
        $response = Invoke-WebRequest -Uri $Url -Method Head -ErrorAction Stop
        if ($response.Headers["Content-Type"] -like "image/*") {
            return $true
        } else {
            return $false
        }
    } catch {
        return $false
    }
}

# Validate the URL and download the image if it is valid
if (Test-ImageUrl -Url $imageUrl) {
    try {
        # Download the image
        Invoke-WebRequest -Uri $imageUrl -OutFile $downloadPath -ErrorAction Stop
        Write-Output "Image downloaded successfully from $imageUrl"

        # Convert the image to a Base64 string
        $base64String = [convert]::ToBase64String([System.IO.File]::ReadAllBytes($downloadPath))

        # Save the Base64 string to a file
        Set-Content -Path $base64FilePath -Value $base64String
        Write-Output "Base64 string saved to $base64FilePath"

        Write-Host ""  # Adds a blank line
    } catch {
        Write-Output "Error: Failed to download the image."

        Write-Host ""  # Adds a blank line
        return
    }
} else {
    Write-Output "Error: URL $imageUrl does not point to a valid image. Attempting to load Base64 string from a local file..."

    Write-Host ""  # Adds a blank line
    # Fallback to loading Base64 string from a local file
    if (Test-Path $base64FilePath) {
        Write-Output "Base64 string file found at $base64FilePath. Importing..."
        $base64String = Get-Content -Path $base64FilePath -Raw
    } elseif (Test-Path $downloadPath) {
        Write-Output "Base64 string file not found. Using existing image file at $downloadPath."
    } else {
        Write-Output "Error: No valid image source found (URL, Base64 file, or existing image). Exiting."
        return
    }
}

# Decode the Base64 string into a byte array if available
if ($base64String) {
    # Output the Base64 string length
    Write-Output "The Base64 string length (characters): $($base64String.Length)"

    # Decode the Base64 string to a byte array
    Write-Output "Decoding Base64 string to original binary data..."
    $byteArray = [convert]::FromBase64String($base64String)
    Write-Output "Byte Array Length (bytes): $($byteArray.Length)"

    # Save the Byte Array as a File
    [System.IO.File]::WriteAllBytes($downloadPath, $byteArray)

    Write-Host ""  # Adds a blank line

    # Confirm the file creation
    if (Test-Path $downloadPath) {
        Write-Output "File saved successfully to $downloadPath"
    } else {
        Write-Output "Error: File could not be saved."
        return
    }
} else {
    Write-Output "Using pre-existing image file at $downloadPath."
}

# Path to the image
$imagePath = $downloadPath

# Add a .NET type to change system wallpaper
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class Wallpaper {
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);

    public const int SPI_SETDESKWALLPAPER = 20;
    public const int SPIF_UPDATEINIFILE = 0x01;
    public const int SPIF_SENDCHANGE = 0x02;
}
"@

# Set the image as wallpaper
[Wallpaper]::SystemParametersInfo(20, 0, $imagePath, 0x01 -bor 0x02)

# Notify success
Write-Output "Wallpaper set successfully to $imagePath"
