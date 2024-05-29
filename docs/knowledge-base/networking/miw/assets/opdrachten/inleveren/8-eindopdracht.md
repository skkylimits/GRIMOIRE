# Eindopdracht

## 1 Wat is het IP adres van <www.umass.edu>?

```bash
1016 32.825992 192.168.1.109 128.119.240.19 HTTP 512 GET / HTTP/1.1 
```

Waarbij `128.119.240.19` het destination adres is oftewel het ip adres van <www.cs.umass.edu>

## 2 welk transport protocol wordt gebruikt voor DNS?

```bash
472 24.809325 68.87.71.226 192.168.1.109 DNS 141 Standard query response 0x7892 A gaia.cs.umass.edu A 128.119.245.12
```

Geeft:

```bash
Frame 472: 141 bytes on wire (1128 bits), 141 bytes captured (1128 bits)
Radiotap Header v0, Length 24
802.11 radio information
IEEE 802.11 QoS Data, Flags: ......F.C
Logical-Link Control
Internet Protocol Version 4, Src: 68.87.71.226, Dst: 192.168.1.109
User Datagram Protocol, Src Port: 53, Dst Port: 1051
Domain Name System (response)
```

Daaruit is op te maken dat het DNS protocol gebruik maakt van:

`User Datagram Protocol, Src Port: 53, Dst Port: 1051`

## 3 Bij het uitgeven van IP adressen is er het DORA proces. Geef de nummers van de entries in Wireshark van deze 4 stappen

Zet het filter `bootp` aan.

```bash
2168 63.194842 0.0.0.0 255.255.255.255 DHCP 390 DHCP Discover - Transaction ID 0x101b218a
```

```bash
2207 66.208575 192.168.1.1 192.168.1.109 DHCP 638 DHCP Offer    - Transaction ID 0x2733a47c
```

```bash
2209 66.209575 0.0.0.0 255.255.255.255 DHCP 396 DHCP Request  - Transaction ID 0x2733a47c
```

```bash
2211 66.217462 192.168.1.1 192.168.1.109 DHCP 638 DHCP ACK      - Transaction ID 0x2733a47c
```

Dus de nummers in volgorde zijn

- `2168` Discover
- `2207` Offer
- `2029` Request
- `2211` Ack

## 4 De WiFi router met SSID “30 Munroe St” een signaal op 5Ghz of 2.4 GHz?

```bash
IEEE 802.11 Wireless Management
    Fixed parameters (12 bytes)
    Tagged parameters (119 bytes)
        Tag: SSID parameter set: "30 Munroe St"
        Tag: Supported Rates 1(B), 2(B), 5.5(B), 11(B), [Mbit/sec]
        Tag: DS Parameter set: Current Channel: 6
        Tag: Traffic Indication Map (TIM): DTIM 0 of 1 bitmap
        Tag: Country Information: Country Code US, Environment Indoor
        Tag: EDCA Parameter Set
        Tag: ERP Information
        Tag: Extended Supported Rates 6(B), 9, 12(B), 18, 24(B), 36, 48, 54, [Mbit/sec]
        Tag: Vendor Specific: Airgo Networks, Inc.
        Tag: Vendor Specific: Microsoft Corp.: WMM/WME: Parameter Element

```

Hieruit valt op te maken dat het SSID 30 Munrtoe St is.

`Tag: SSID parameter set: "30 Munroe St"`

Deze SSID communiceert via 2.4GHz-signalen.

```bash
Channel flags: 0x00a0, Complementary Code Keying (CCK), 2 GHz spectrum
    .... .... .... ...0 = 700 MHz spectrum: False
    .... .... .... ..0. = 800 MHz spectrum: False
    .... .... .... .0.. = 900 MHz spectrum: False
    .... .... ...0 .... = Turbo: False
    .... .... ..1. .... = Complementary Code Keying (CCK): True
    .... .... .0.. .... = Orthogonal Frequency-Division Multiplexing (OFDM): False
    .... .... 1... .... = 2 GHz spectrum: True
    .... ...0 .... .... = 5 GHz spectrum: False
    .... ..0. .... .... = Passive: False
    .... .0.. .... .... = Dynamic CCK-OFDM: False
    .... 0... .... .... = Gaussian Frequency Shift Keying (GFSK): False
    ...0 .... .... .... = GSM (900MHz): False
    ..0. .... .... .... = Static Turbo: False
    .0.. .... .... .... = Half Rate Channel (10MHz Channel Width): False
    0... .... .... .... = Quarter Rate Channel (5MHz Channel Width): False
```

Dat weten we omdat 2 GHz true is.

`.... .... 1... .... = 2 GHz spectrum: True`
`.... ...0 .... .... = 5 GHz spectrum: False`

## 5 Er wordt in de pcap ook het bestand alice.txt verstuurd met het HTTP protocol.  Dat is niet encrypt.  Dit bestand is de tekst van het verhaal Alice’s adventures in wonderland van Lewis Caroll

Dat gebeurd in het volgende pakket:

```bash
480 24.828253 192.168.1.109 128.119.245.12 HTTP 537 GET /wireshark-labs/alice.txt HTTP/1.1 
```

`the happy summer days.`

Dit vinden we door de volgende stappen te ondernemen:

1. **Selecteer het pakket:**

2. **Klik met de rechtermuisknop op het pakket:**

3. **Selecteer "Follow" en vervolgens "TCP Stream":**

4. **Analyseer de TCP-stream:**

## 6 Om een connectie op te zetten met TCP wordt de ‘three-way-handshake’ gebruikt. Geef een voorbeeld van deze three-way-handshake in het pcap bestand

```bash
474 24.811093 192.168.1.109 128.119.245.12 TCP 110 2538 → 80 [SYN] Seq=0 Win=16384 Len=0 MSS=1460 SACK_PERM

476 24.827751 128.119.245.12 192.168.1.109 TCP 110 80 → 2538 [SYN, ACK] Seq=0 Ack=1 Win=5840 Len=0 SACK_PERM

478 24.828024 192.168.1.109 128.119.245.12 TCP 102 2538 → 80 [ACK] Seq=1 Ack=1 Win=17520 Len=0
```

Hier geef ik een voorbeeld uit de tracerp die  een three-way-handshake laat zien.

Dit is wat er gebeurd:

1. **Client SYN:**
   - De client (IP: 192.168.1.109) verzoekt om een verbinding door een SYN-pakket naar de server (IP: 128.119.245.12) te sturen vanaf poort 2538 naar poort 80.

2. **Server SYN, ACK:**
   - De server antwoordt met een SYN, ACK-pakket, waarbij het zowel het verzoek accepteert als zijn eigen verzoek om verbinding initieert.

3. **Client ACK:**
   - De client bevestigt de ontvangst van het SYN, ACK-pakket, waarmee de TCP-verbinding tot stand wordt gebracht.

Deze drie stappen vormen de kern van het opzetten van een TCP-verbinding tussen de client en de server.

## 7 Een connectie wordt niet alleen opgezet maar ook afgesloten. Geef een voorbeeld hoe het afgesloten wordt

## 8 Welk MAC adres hoort bij IP adres 192.168.1.109?

```bash
1104 32.942024 192.168.1.109 128.119.240.19 TCP 102 2542 → 80 [FIN, ACK] Seq=383 Ack=4864 Win=17289 Len=0
```

```bash
Frame 1104: 102 bytes on wire (816 bits), 102 bytes captured (816 bits)
    Encapsulation type: IEEE 802.11 plus radiotap radio header (23)
    Arrival Time: Jun 29, 2007 04:05:40.014481000 W. Europe Daylight Time
    UTC Arrival Time: Jun 29, 2007 02:05:40.014481000 UTC
    Epoch Arrival Time: 1183082740.014481000
    [Time shift for this packet: 0.000000000 seconds]
    [Time delta from previous captured frame: 0.000098000 seconds]
    [Time delta from previous displayed frame: 0.002263000 seconds]
    [Time since reference or first frame: 32.942024000 seconds]
    Frame Number: 1104
    Frame Length: 102 bytes (816 bits)
    Capture Length: 102 bytes (816 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: radiotap:wlan_radio:wlan:llc:ip:tcp]
    [Coloring Rule Name: HTTP]
    [Coloring Rule String: http || tcp.port == 80 || http2]
Radiotap Header v0, Length 24
    Header revision: 0
    Header pad: 0
    Header length: 24
    Present flags
        Present flags word: 0x000058ee
    Flags: 0x10
    Data Rate: 54.0 Mb/s
    Channel frequency: 2437 [BG 6]
    Channel flags: 0x00c0, Orthogonal Frequency-Division Multiplexing (OFDM), 2 GHz spectrum
    Antenna signal: -24 dBm
    Antenna noise: -100 dBm
    Signal Quality: 100
    Antenna: 0
    dB antenna signal: 76 dB
    RX flags: 0xcb78
802.11 radio information
    PHY type: 802.11g (ERP) (6)
    Proprietary mode: None (0)
    Data rate: 54.0 Mb/s
    Channel: 6
    Frequency: 2437MHz
    Signal strength (dB): 76 dB
    Signal strength (dBm): -24 dBm
    Noise level (dBm): -100 dBm
    Signal/noise ratio (dB): 76 dB
    [Duration: 32µs]
IEEE 802.11 QoS Data, Flags: .......TC
    Type/Subtype: QoS Data (0x0028)
    Frame Control Field: 0x8801
    .000 0000 0010 1100 = Duration: 44 microseconds
    Receiver address: CiscoLinksys_f7:1d:51 (00:16:b6:f7:1d:51)
    Transmitter address: Intel_d1:b6:4f (00:13:02:d1:b6:4f)
    Destination address: CiscoLinksys_f4:eb:a8 (00:16:b6:f4:eb:a8)
    Source address: Intel_d1:b6:4f (00:13:02:d1:b6:4f)
    BSS Id: CiscoLinksys_f7:1d:51 (00:16:b6:f7:1d:51)
    STA address: Intel_d1:b6:4f (00:13:02:d1:b6:4f)
    .... .... .... 0000 = Fragment number: 0
    0000 1000 0000 .... = Sequence number: 128
    Frame check sequence: 0x9f84cb78 [unverified]
    [FCS Status: Unverified]
    [WLAN Flags: .......TC]
    Qos Control: 0x0000
Logical-Link Control
Internet Protocol Version 4, Src: 192.168.1.109, Dst: 128.119.240.19
Transmission Control Protocol, Src Port: 2542, Dst Port: 80, Seq: 383, Ack: 4864, Len: 0
```

`Transmitter address: Intel_d1:b6:4f (00:13:02:d1:b6:4f)`

Het MAC-adres is dus: `00:13:02:d1:b6:4f`.

## 9  Als het goed is weet je hoe een device weet welk IP adres hoort bij welk MAC adres. Zo niet, kijk dan in hoofdstuk 6 van het boek.  Geef de regel waar het device met IP adres 192.168.1.109 probeert te achterhalen wat het MAC adres is van device 192.168.1.1

## Het TCP pakketje o regel 1079 heeft sequence nummer 252 en ACK nummer 383 Het volgende TCP pakketje in deze uitwisseling is 1081.  Hier is sequence nummer 383 en ACK = 1712. Leg uit waarom hier ACK 1712 is
