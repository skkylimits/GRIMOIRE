function Get-WindowsProductKey {
    $regPath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion"
    $digitalProductId = (Get-ItemProperty -Path $regPath).DigitalProductId

    $key = ""
    $chars = "BCDFGHJKMPQRTVWXY2346789"
    $isWin8 = ($digitalProductId[66] / 6) -band 1
    $keyOffset = 52
    $last = 0

    for ($i = 24; $i -ge 0; $i--) {
        $current = 0
        for ($j = 14; $j -ge 0; $j--) {
            $current = $current * 256 -bxor $digitalProductId[$j + $keyOffset]
            $digitalProductId[$j + $keyOffset] = [math]::Floor($current / 24)
            $current = $current % 24
        }
        $key = $chars[$current] + $key
        if (($i % 5) -eq 0 -and $i -ne 0) {
            $key = "-" + $key
        }
    }
    return $key
}

Get-WindowsProductKey
