# Wireshark UDP/TCP

## 01 The Assignment

## 1. Select the first UDP segment in your trace. How many fields there are in the UDP header? (You shouldn’t look in the textbook! Answer these questions directly from what you observe in the packet trace.) What are the names of these fields?

```bash
Frame 337: 133 bytes on wire (1064 bits), 133 bytes captured (1064 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 6, Src: 2001:730:3e42::53, Dst: 2a02:a210:d40:7700:d4f:df39:9296:667b
User Datagram Protocol, Src Port: 53, Dst Port: 49260
    Source Port: 53
    Destination Port: 49260
    Length: 79
    Checksum: 0x0c4d [unverified]
    [Checksum Status: Unverified]
    [Stream index: 7]
    [Timestamps]
    UDP payload (71 bytes)
Domain Name System (response)
    Transaction ID: 0xe494
    Flags: 0x8180 Standard query response, No error
    Questions: 1
    Answer RRs: 3
    Authority RRs: 0
    Additional RRs: 0
    Queries
    Answers
    [Request In: 336]
    [Time: 0.044053000 seconds]
```

`Destination Port`: 49260
`Length`: 79
`Checksum`: 0x0c4d [unverified]

## 2. By consulting the displayed information in Wireshark’s packet content field for this packet (or by consulting the textbook), what is the length (in bytes) of each of the UDP header fields?

`Length`: 79

## 3. The value in the Length field is the length of what? (You can consult the text for this  answer). Verify your claim with your captured UDP packet

The "Length" field in a UDP (User Datagram Protocol) packet header typically refers to the length of the entire UDP datagram, including both the header and the data payload. This length includes the number of bytes from the first byte of the UDP header to the last byte of the UDP data payload.

The length of the UDP packet should match the value indicated in the "Length" field of the UDP header.

## 4. What is the maximum number of bytes that can be included in a UDP payload?  (Hint:  the answer to this question can be determined by your answer to 2. above)

Let's verify the claim using the captured UDP packet:

- The "Length" field in the UDP header is specified as 79 bytes.
- The "UDP payload" section mentions that the payload length is 71 bytes.

To clarify this, we need to consider the UDP header size. The UDP header typically consists of 8 bytes. If we subtract the UDP header size from the total length specified in the "Length" field, we should get the length of the UDP payload.

So, 79 bytes (total length) - 8 bytes (UDP header size) = 71 bytes (UDP payload length).

This confirms that the "Length" field in the UDP header indeed represents the total length of the UDP datagram, including both the UDP header and the UDP payload. The discrepancy in the displayed length in Wireshark is due to including the header length

## 5. What is the largest possible source port number? (Hint: see the hint in 4.)

The largest possible source port number in TCP or UDP is 65535.

Both TCP and UDP use a 16-bit field to represent the source and destination ports in their headers. With 16 bits, the maximum value that can be represented is 216−1=65535216−1=65535. Therefore, the largest possible source port number is `65535`.

## 6. What is the protocol number for UDP? Give your answer in decimal notation. To answer this question, you’ll need to look into the Protocol field of the IP datagram containing this UDP segment (see Figure 4.13 in the text, and the discussion of IP  header fields)

```bash
Frame 328: 77 bytes on wire (616 bits), 77 bytes captured (616 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SamsungElect_35:ac:6c (10:2b:41:35:ac:6c), Dst: Broadcast (ff:ff:ff:ff:ff:ff)
    Destination: Broadcast (ff:ff:ff:ff:ff:ff)
    Source: SamsungElect_35:ac:6c (10:2b:41:35:ac:6c)
    Type: IPv4 (0x0800)
Internet Protocol Version 4, Src: 192.168.178.210, Dst: 192.168.178.255
    0100 .... = Version: 4
    .... 0101 = Header Length: 20 bytes (5)
    Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)
    Total Length: 63
    Identification: 0x2e61 (11873)
    010. .... = Flags: 0x2, Don't fragment
    ...0 0000 0000 0000 = Fragment Offset: 0
    Time to Live: 64
    Protocol: UDP (17)
    Header Checksum: 0x252a [validation disabled]
    [Header checksum status: Unverified]
    Source Address: 192.168.178.210
    Destination Address: 192.168.178.255
User Datagram Protocol, Src Port: 56136, Dst Port: 15600
Data (35 bytes)
    Data: 53454152434820425344502f302e310a4445564943453d300a534552564943453d310a
    [Length: 35]

```

`Protocol: UDP (17)`

## 7. Examine the pair of UDP packets in which your host sends the first UDP packet and the second UDP packet is a reply to this first UDP packet. (Hint: for a second packet) to be sent in response to a first packet, the sender of the first packet should be the destination of the second packet).  Describe the relationship between the port numbers in the two packets  

To confirm if these packets form a pair, we typically look for a source port and IP address combination in the second packet that matches the destination port and IP address of the first packet.

A general process to find such a pair of UDP packets:

1. Identify the UDP packet sent by your host. Look for packets where the source IP address matches your host's IP address.
2. Note the source port of this UDP packet.
3. Look for UDP packets that have the same source port as the destination port of the first UDP packet.
4. Among these packets, find the one where the source IP address matches the destination IP address of the first UDP packet.

This pair of packets would likely represent a request-response pattern, where your host sends a UDP packet (request) and receives a UDP packet (reply) in response to that request.

```bash
Frame 342: 93 bytes on wire (744 bits), 93 bytes captured (744 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Destination: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Source: Intel_50:86:74 (70:9c:d1:50:86:74)
    Type: IPv6 (0x86dd)
Internet Protocol Version 6, Src: 2a02:a210:d40:7700:d4f:df39:9296:667b, Dst: 2001:730:3e42::53
    0110 .... = Version: 6
    .... 0000 0000 .... .... .... .... .... = Traffic Class: 0x00 (DSCP: CS0, ECN: Not-ECT)
    .... 1100 1101 1011 0101 1011 = Flow Label: 0xcdb5b
    Payload Length: 39
    Next Header: UDP (17)
    Hop Limit: 64
    Source Address: 2a02:a210:d40:7700:d4f:df39:9296:667b
    Destination Address: 2001:730:3e42::53
User Datagram Protocol, Src Port: 63825, Dst Port: 53
    Source Port: 63825
    Destination Port: 53
    Length: 39
    Checksum: 0x9bec [unverified]
    [Checksum Status: Unverified]
    [Stream index: 9]
    [Timestamps]
        [Time since first frame: 0.000000000 seconds]
        [Time since previous frame: 0.000000000 seconds]
    UDP payload (31 bytes)
Domain Name System (query)
```

```bash
Frame 526: 150 bytes on wire (1200 bits), 150 bytes captured (1200 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
    Destination: Intel_50:86:74 (70:9c:d1:50:86:74)
    Source: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Type: IPv6 (0x86dd)
Internet Protocol Version 6, Src: 2001:730:3e42::53, Dst: 2a02:a210:d40:7700:d4f:df39:9296:667b
    0110 .... = Version: 6
    .... 0000 0000 .... .... .... .... .... = Traffic Class: 0x00 (DSCP: CS0, ECN: Not-ECT)
    .... 1100 1111 0010 1010 1101 = Flow Label: 0xcf2ad
    Payload Length: 96
    Next Header: UDP (17)
    Hop Limit: 61
    Source Address: 2001:730:3e42::53
    Destination Address: 2a02:a210:d40:7700:d4f:df39:9296:667b
User Datagram Protocol, Src Port: 53, Dst Port: 63825
    Source Port: 53
    Destination Port: 63825
    Length: 96
    Checksum: 0xf485 [unverified]
    [Checksum Status: Unverified]
    [Stream index: 9]
    [Timestamps]
        [Time since first frame: 0.018010000 seconds]
        [Time since previous frame: 0.018010000 seconds]
    UDP payload (88 bytes)
Domain Name System (response)
```

1. **Frame 342**:
   - Source IP Address: 2a02:a210:d40:7700:d4f:df39:9296:667b
   - Source Port: 63825
   - Destination IP Address: 2001:730:3e42::53
   - Destination Port: 53

2. **Frame 526**:
   - Source IP Address: 2001:730:3e42::53
   - Source Port: 53
   - Destination IP Address: 2a02:a210:d40:7700:d4f:df39:9296:667b
   - Destination Port: 63825

Looking at these packets, we see that the destination IP address of Frame 342 matches the source IP address of Frame 526, and vice versa. Additionally, the destination port of Frame 342 matches the source port of Frame 526, and vice versa.

This indicates that Frame 342 is a DNS query packet sent from the source IP address `2a02:a210:d40:7700:d4f:df39:9296:667b` to the destination IP address `2001:730:3e42::53` on port 53. Frame 526, on the other hand, is a DNS response packet sent from the source IP address `2001:730:3e42::53` to the destination IP address `2a02:a210:d40:7700:d4f:df39:9296:667b` on port 63825.

Therefore, these two packets form a request-reply pair, where Frame 342 is the request (DNS query) and Frame 526 is the reply (DNS response).

## 02 A first look at the captured trace

## 1. What is the IP address and TCP port number used by the client computer (source) that  is transferring the alice.txt file to gaia.cs.umass.edu?  To answer this question, it’s  probably easiest to select an HTTP message and explore the details of the TCP packet  used to carry this HTTP message, using the “details of the selected packet header  window” (refer to Figure 2 in the “Getting Started with Wireshark” Lab if you’re  uncertain about the Wireshark windows)

```bash
Frame 317: 27498 bytes on wire (219984 bits), 27498 bytes captured (219984 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Destination: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Source: Intel_50:86:74 (70:9c:d1:50:86:74)
    Type: IPv4 (0x0800)
Internet Protocol Version 4, Src: 192.168.178.205, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 53515, Dst Port: 80, Seq: 125561, Ack: 1, Len: 27444
    Source Port: 53515
    Destination Port: 80
    [Stream index: 12]
    [Conversation completeness: Incomplete, DATA (15)]
    [TCP Segment Len: 27444]
    Sequence Number: 125561    (relative sequence number)
    Sequence Number (raw): 2926005729
    [Next Sequence Number: 153005    (relative sequence number)]
    Acknowledgment Number: 1    (relative ack number)
    Acknowledgment number (raw): 1866043553
    0101 .... = Header Length: 20 bytes (5)
    Flags: 0x018 (PSH, ACK)
    Window: 1026
    [Calculated window size: 262656]
    [Window size scaling factor: 256]
    Checksum: 0xe900 [unverified]
    [Checksum Status: Unverified]
    Urgent Pointer: 0
    [Timestamps]
    [SEQ/ACK analysis]
    TCP payload (27444 bytes)
    TCP segment data (27444 bytes)
[11 Reassembled TCP Segments (153004 bytes): #276(14600), #287(14600), #289(14600), #294(2920), #296(5840), #298(5840), #303(43800), #305(5840), #307(2920), #309(14600), #317(27444)]
Hypertext Transfer Protocol
MIME Multipart Media Encapsulation, Type: multipart/form-data, Boundary: "---------------------------23659788578099757652463156118"
```

To find the IP address and TCP port number used by the client computer (source) transferring the alice.txt file to gaia.cs.umass.edu, we need to look at the details of the TCP packet carrying this HTTP message.

In the provided packet details (Frame 317), we see the following relevant information:

- Source IP Address (Client): 192.168.178.205
- Destination IP Address (Server): 128.119.245.12
- Source Port: 53515
- Destination Port: 80 (HTTP)

So, the IP address of the client computer (source) is `192.168.178.205`, and the TCP port number used by the client is `53515`.

## 2. What is the IP address of gaia.cs.umass.edu? On what port number is it sending and  receiving TCP segments for this connection?

Based on previous capture.

- Destination IP Address: `128.119.245.12`
- Destination Port: `80` (HTTP)

## 03  TCP Basics

```txt
To change Wireshark's "listing of captured packets" window to show information about the TCP segments containing the HTTP messages, you can follow these steps:

- Open the Wireshark capture file containing the HTTP messages.
- In the packet list pane, locate any HTTP packet.
- Right-click on the HTTP packet.
- Select "Follow" from the context menu.
- From the submenu, choose "TCP Stream".

This will open a new window showing all the TCP segments related to the selected HTTP message. You'll see the sequence of TCP segments exchanged between your computer and gaia.cs.umass.edu. This view allows you to analyze the TCP communication specifically related to the HTTP messages exchanged in the capture.
```

## 3. What is the sequence number of the TCP SYN segment that is used to initiate the TCP connection between the client computer and gaia.cs.umass.edu? What is it in this TCP segment that identifies the segment as a SYN segment?

To find the sequence number of the TCP SYN segment used to initiate the TCP connection between the client computer and gaia.cs.umass.edu, we need to locate the TCP segment with the SYN flag set in the captured packets.

In Wireshark:

- Open the captured packets.
- Apply a display filter to show only TCP packets: tcp.
- Look for the first TCP packet in the list that has the SYN flag set in the TCP header.
- The sequence number of this TCP segment is the sequence number of the TCP SYN segment used to initiate the connection.

Typically, SYN segments are used to initiate a TCP connection, and they are identified by having the SYN flag set in the TCP header. The presence of the SYN flag indicates the beginning of a new TCP connection establishment process.

```bash
269 15.437122 192.168.178.205 128.119.245.12 TCP 66 53515 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 WS=256 SACK_PERM
```

In the provided TCP segment:

- Sequence Number: Seq=0
- Flag: [SYN]

So, the sequence number of the TCP SYN segment used to initiate the TCP connection between the client computer (192.168.178.205) and gaia.cs.umass.edu (128.119.245.12) is `0`. The presence of the [SYN] flag indicates that this segment is a SYN segment, which is used to initiate the TCP connection

## 4. What is the sequence number of the SYNACK segment sent by gaia.cs.umass.edu tothe client computer in reply to the SYN? What is it in the segment that identifies the segment as a SYNACK segment? What is the value of the Acknowledgement field in the SYNACK segment? How did gaia.cs.umass.edu determine that value?  

```bash
274 15.539831 128.119.245.12 192.168.178.205 TCP 66 80 → 53515 [SYN, ACK] Seq=0 Ack=1 Win=29200 Len=0 MSS=1460 SACK_PERM WS=128
```

In the provided TCP segment:

- **Sequence Number**: Seq=0
- **Acknowledgement Number**: Ack=1
- **Flags**: [SYN, ACK]

So, the sequence number of the SYNACK segment sent by gaia.cs.umass.edu to the client computer in reply to the SYN is 0. The presence of the [SYN, ACK] flags indicates that this segment is a SYNACK segment, which acknowledges the receipt of the SYN and also initiates the TCP connection from the server side.

The value of the Acknowledgement field in the SYNACK segment is 1. This value indicates that gaia.cs.umass.edu has received the initial SYN segment from the client and is acknowledging it. The Acknowledgement field is set to 1 because it acknowledges the receipt of the SYN segment from the client.

## 5. What is the sequence number of the TCP segment containing the header of the HTTP POST command?  Note that in order to find the POST message header, you’ll need to dig into the packet content field at the bottom of the Wireshark window, looking for a segment with the ASCII text “POST” within its DATA field15,16

`POST /wireshark-labs/lab3-1-reply.htm HTTP/1.1\r\n`

We've identified the packet containing the HTTP POST COMMAND

```bash
Frame 317: 27498 bytes on wire (219984 bits), 27498 bytes captured (219984 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Destination: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
    Source: Intel_50:86:74 (70:9c:d1:50:86:74)
    Type: IPv4 (0x0800)
Internet Protocol Version 4, Src: 192.168.178.205, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 53515, Dst Port: 80, Seq: 125561, Ack: 1, Len: 27444
    Source Port: 53515
    Destination Port: 80
    [Stream index: 12]
    [Conversation completeness: Incomplete, DATA (15)]
    [TCP Segment Len: 27444]
    Sequence Number: 125561    (relative sequence number)
    Sequence Number (raw): 2926005729
    [Next Sequence Number: 153005    (relative sequence number)]
    Acknowledgment Number: 1    (relative ack number)
    Acknowledgment number (raw): 1866043553
    0101 .... = Header Length: 20 bytes (5)
    Flags: 0x018 (PSH, ACK)
    Window: 1026
    [Calculated window size: 262656]
    [Window size scaling factor: 256]
    Checksum: 0xe900 [unverified]
    [Checksum Status: Unverified]
    Urgent Pointer: 0
    [Timestamps]
    [SEQ/ACK analysis]
    TCP payload (27444 bytes)
    TCP segment data (27444 bytes)
[11 Reassembled TCP Segments (153004 bytes): #276(14600), #287(14600), #289(14600), #294(2920), #296(5840), #298(5840), #303(43800), #305(5840), #307(2920), #309(14600), #317(27444)]
Hypertext Transfer Protocol
    POST /wireshark-labs/lab3-1-reply.htm HTTP/1.1\r\n
        [Expert Info (Chat/Sequence): POST /wireshark-labs/lab3-1-reply.htm HTTP/1.1\r\n]
        Request Method: POST
        Request URI: /wireshark-labs/lab3-1-reply.htm
        Request Version: HTTP/1.1
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Content-Type: multipart/form-data; boundary=---------------------------23659788578099757652463156118\r\n
    Content-Length: 152371\r\n
    Origin: http://gaia.cs.umass.edu\r\n
    Connection: keep-alive\r\n
    Referer: http://gaia.cs.umass.edu/wireshark-labs/TCP-wireshark-file1.html\r\n
    Upgrade-Insecure-Requests: 1\r\n
    Priority: u=1\r\n
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/wireshark-labs/lab3-1-reply.htm]
    [HTTP request 1/1]
    [Response in frame: 327]
    File Data: 152371 bytes
MIME Multipart Media Encapsulation, Type: multipart/form-data, Boundary: "---------------------------23659788578099757652463156118"
```

To find the sequence number of the TCP segment containing the header of the HTTP POST command, we need to locate the TCP segment that contains the ASCII text "POST" within its DATA field.

From the provided packet capture, we can see that the HTTP POST command is contained within Frame 317. To find the sequence number, we need to examine the details of Frame 317:

- Frame 317
  - `Sequence Number: 125561`
  - `TCP payload (27444 bytes`
  - `Flags: 0x018 (PSH, ACK)`

So, the sequence number of the TCP segment containing the header of the HTTP POST command is 125561. This segment has the [PSH, ACK] flags set, indicating that it is a TCP segment containing data that should be pushed to the application layer and acknowledging the receipt of previously transmitted data.

## 6. Consider the TCP segment containing the HTTP “POST” as the first segment in the data transfer part of the TCP connection

- At what time was the first segment (the one containing the HTTP POST) in the data-transfer part of the TCP connection sent?

```bash
Frame 316: 60 bytes on wire (480 bits), 60 bytes captured (480 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.245.12, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 80, Dst Port: 53515, Seq: 1, Ack: 102201, Len: 0
    Source Port: 80
    Destination Port: 53515
    [Stream index: 12]
    [Conversation completeness: Incomplete, DATA (15)]
    [TCP Segment Len: 0]
    Sequence Number: 1    (relative sequence number)
    Sequence Number (raw): 1866043553
    [Next Sequence Number: 1    (relative sequence number)]
    Acknowledgment Number: 102201    (relative ack number)
    Acknowledgment number (raw): 2925982369
    0101 .... = Header Length: 20 bytes (5)
    Flags: 0x010 (ACK)
    Window: 1426
    [Calculated window size: 182528]
    [Window size scaling factor: 128]
    Checksum: 0x4f09 [unverified]
    [Checksum Status: Unverified]
    Urgent Pointer: 0
    [Timestamps]
        [Time since first frame in this TCP stream: 0.434038000 seconds]
        [Time since previous frame in this TCP stream: 0.000000000 seconds]
    [SEQ/ACK analysis]
```

The first segment containing the HTTP POST in the data-transfer part of the TCP connection was sent at approximately  `0.434038000 seconds` after the start of the capture.

- At what time was the ACK for this first data-containing segment received?

```bash
Frame 318: 60 bytes on wire (480 bits), 60 bytes captured (480 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.245.12, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 80, Dst Port: 53515, Seq: 1, Ack: 103661, Len: 0
    Source Port: 80
    Destination Port: 53515
    [Stream index: 12]
    [Conversation completeness: Incomplete, DATA (15)]
    [TCP Segment Len: 0]
    Sequence Number: 1    (relative sequence number)
    Sequence Number (raw): 1866043553
    [Next Sequence Number: 1    (relative sequence number)]
    Acknowledgment Number: 103661    (relative ack number)
    Acknowledgment number (raw): 2925983829
    0101 .... = Header Length: 20 bytes (5)
    Flags: 0x010 (ACK)
    Window: 1432
    [Calculated window size: 183296]
    [Window size scaling factor: 128]
    Checksum: 0x494f [unverified]
    [Checksum Status: Unverified]
    Urgent Pointer: 0
    [Timestamps]
        [Time since first frame in this TCP stream: 0.512272000 seconds]
        [Time since previous frame in this TCP stream: 0.078213000 seconds]

```

```bash
[Timestamps]
        [Time since first frame in this TCP stream: 0.512272000 seconds]
        [Time since previous frame in this TCP stream: 0.078213000 seconds]
```

- What is the RTT for this first data-containing segment?

To calculate the Round-Trip Time (RTT) for the first data-containing segment, you need to find the time the segment was sent and the time the corresponding acknowledgment (ACK) for that segment was received. Then, subtract the time the segment was sent from the time the ACK was received.

- The segment containing the HTTP POST command was sent at 0.434038 seconds since the beginning of the TCP stream.
- The corresponding acknowledgment (ACK) for that segment was received at 0.512272 seconds since the beginning of the TCP stream.

To calculate the RTT:
RTT = Time of ACK reception - Time of segment transmission

RTT = 0.512272 seconds - 0.434038 seconds
RTT ≈ 0.078234 seconds

So, the Round-Trip Time (RTT) for this first data-containing segment is approximately 0.078234 seconds.

- What is the RTT value the second data-carrying TCP segment and its ACK?  

> Note: Wireshark has a nice feature that allows you to plot the RTT for each of the TCP segments sent.  Select a TCP segment in the “listing of captured packets” window that is being sent from the client to the gaia.cs.umass.eduserver.  Then select: Statistics->TCP Stream Graph->Round Trip TimeGraph.

To plot the Round-Trip Time (RTT) for each TCP segment in Wireshark, follow these steps:

- First, select a TCP segment in the "listing of captured packets" window. This segment should belong to the TCP stream you're interested in analyzing.

- Once the TCP segment is selected, go to the menu bar at the top of the Wireshark window.

- Click on "Statistics" in the menu bar.

- In the dropdown menu that appears, navigate to "TCP Stream Graph".
- Finally, in the submenu that appears next to "TCP Stream Graph", select "Round Trip Time Graph".

I couldn't quite get the data to show up here, unfortunately.

## 7. Are there any retransmitted segments in the trace file? What did you check for (in the trace) in order to answer this question?

To identify retransmitted segments in the trace file, you can look for TCP segments with duplicate sequence numbers. Retransmitted segments occur when a sender does not receive an acknowledgment (ACK) for a segment within a certain timeout period, so it resends the segment. Here's how you can find them:

- Filter TCP traffic: Apply a display filter to show only TCP traffic. You can use the filter tcp in the display filter toolbar.

- Identify duplicate sequence numbers: Look for TCP segments where the sequence number matches that of a previously sent segment. These segments are likely retransmissions.

- Check for TCP retransmission flags: TCP retransmitted segments often have specific flags set, such as the "Retransmission" flag in Wireshark. You can add this as a column to your packet list or apply a display filter like tcp.analysis.retransmission.

- Analyze TCP stream graphs: Wireshark provides TCP stream graphs that visualize sequence numbers over time. Sudden drops or duplicate sequence numbers indicate potential retransmissions.

Based on these criteria, there were `no retransmissions` sent.
