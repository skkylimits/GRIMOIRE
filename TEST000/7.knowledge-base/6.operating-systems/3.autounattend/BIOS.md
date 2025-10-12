---
Title: BIOS
Description: 🛠️ BIOS Update + Systeemconfiguratie (ASUS Dark Hero)
---

## 🔁 **Stap 1 – BIOS updaten via EZ Flash 3**

1. Ga naar de ASUS supportsite en download de nieuwste [BIOS versie](https://rog.asus.com/motherboards/rog-crosshair/rog-crosshair-viii-dark-hero-model/helpdesk_bios/) voor je moederbord. 
    
2. Gebruik **BIOSRenamer.exe** om het .CAP-bestand correct te hernoemen.
    
3. Zet het .CAP-bestand op een FAT32-geformatteerde USB-stick (root).
    
4. Start je pc → ga naar het BIOS (DEL-toets).
    
5. Open **Tool** > **EZ Flash 3 Utility**.
    
6. Selecteer de USB-stick (Fs0, Fs1, etc.) met het BIOS-bestand.
    
7. Start de update en laat het volledig voltooien.


## 🌬️ **Stap 2 – CPU Fan Monitor uitschakelen (fan error voorkomen)**

1. In BIOS: Ga naar **Monitor** tab.
    
2. Zoek naar **CPU Fan Speed / Monitoring**.
    
3. Zet op **Ignore** als je een custom fan setup of AIO gebruikt.


## 📶 **Stap 3 – Onboard Wi-Fi (en andere controllers) inschakelen**

1. In BIOS: Ga naar **Advanced** > **Onboard Devices Configuration**.
    
2. Zet **Wi-Fi Controller** op **Enabled** (als je Wi-Fi nodig hebt).
    
3. Hier kun je ook Bluetooth, LAN, Audio, etc. aan-/uitzetten.


## 🧠 **Stap 4 – Virtualization inschakelen (voor Hyper-V, etc.)**

1. Ga naar **Advanced** > **CPU Configuration**.
    
2. Zoek naar **SVM Mode** (Secure Virtual Machine) — dit is de AMD-virtualisatietechnologie
3. Zet **SVM Mode** op Enabled.

4. Optioneel: Zet **IOMMU** (Input-Output Memory Management Unit) ook op Enabled als je gebruik maakt van geavanceerde virtualisatie of **PCI-passthrough**


    


## ⚡ **Stap 5 – RAM instellen op 3600MHz via DOCP**

1. In BIOS: Ga naar **Ai Tweaker**.
    
2. Zet **Ai Overclock Tuner** op **DOCP Standard**.
    
3. Je ziet dan automatisch je RAM-profiel (bijv. DDR4-3600 CL16).


## 🌐 **Stap 6 – ASUS XG-C100C 10Gb NIC laten werken**

1. In BIOS: Ga naar **Advanced** > **PCI Subsystem Settings**.
    
2. Zet de volgende instellingen:
    
	* **Above 4G Decoding** → **Enabled**
	
	* **Re-Size BAR Support** → **Enabled** *(optioneel, vooral voor GPU, maar kan helpen)*
	
	* **SR-IOV Support** → **Enabled** *(nodig voor Hyper-V gebruik)*
	
	* Zet **PCIe slot configuration** van Auto naar **Gen3** (indien van toepassing)

3. Sla op en reboot. De NIC zou nu moeten oplichten én zichtbaar zijn in Apparaatbeheer.
    
4. Installeer eventueel de laatste [drivers](https://www.asus.com/networking-iot-servers/wired-networking/all-series/xg-c100c/helpdesk_download?model2Name=XG-C100C) via ASUS


## 💾 Sla op met F10 en reboot.

