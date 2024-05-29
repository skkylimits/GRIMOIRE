# Wireshark BGP

## 01 BGP Message types

## 1. What BGP message types do you see in the capture? What is the purpose of each of the message types? Refer to the sources listed at the end of the document if you’re looking for more information

`8 8.004042 192.168.0.15 192.168.0.33 BGP 83 OPEN Message`
    - OPEN Message: Establishes a BGP session between two routers.

`12 8.338115 192.168.0.15 192.168.0.33 BGP 73 KEEPALIVE Message`
    - KEEPALIVE Message: Ensures the connection between BGP peers remains active by periodically confirming the session's status.

`17 8.549476 192.168.0.33 192.168.0.15 BGP 118 UPDATE Message`
    - UPDATE Message: Exchange routing information

## 02 BGP Open message

## 2. Have a closer look at the two open messages in the capture. What is the identifier for the AS each router its in? Are they in the same, or in different Autonomous Systems?

```bash
Frame 8: 83 bytes on wire (664 bits), 83 bytes captured (664 bits)
Ethernet II, Src: Dell_23:c5:95 (00:c0:4f:23:c5:95), Dst: Cisco_35:0e:1c (00:00:0c:35:0e:1c)
Internet Protocol Version 4, Src: 192.168.0.15, Dst: 192.168.0.33
Transmission Control Protocol, Src Port: 2124, Dst Port: 179, Seq: 1, Ack: 1, Len: 29
Border Gateway Protocol - OPEN Message
    Marker: ffffffffffffffffffffffffffffffff
    Length: 29
    Type: OPEN Message (1)
    Version: 4
    My AS: 65033
    Hold Time: 180
    BGP Identifier: 192.168.0.15
    Optional Parameters Length: 0
```

`My AS: 65033`

Both of them are in the same AS systems.

## BGP Update message

## 3. The capture contains two update messages?. Containing route updates. For each update message, answer the following

- The update gives information about a route to reach which subnet?
- What is the advertised NEXT_HOP router to reach this subnet?
- What Autonomous Systems are contained in the AS_PATH attribute?

2: `16 8.544149 192.168.0.15 192.168.0.33 BGP 270 KEEPALIVE Message, UPDATE Message, UPDATE Message`

```bash
Frame 16: 270 bytes on wire (2160 bits), 270 bytes captured (2160 bits)
Ethernet II, Src: Dell_23:c5:95 (00:c0:4f:23:c5:95), Dst: Cisco_35:0e:1c (00:00:0c:35:0e:1c)
Internet Protocol Version 4, Src: 192.168.0.15, Dst: 192.168.0.33
Transmission Control Protocol, Src Port: 2124, Dst Port: 179, Seq: 49, Ack: 49, Len: 216
Border Gateway Protocol - KEEPALIVE Message
    Marker: ffffffffffffffffffffffffffffffff
    Length: 19
    Type: KEEPALIVE Message (4)
Border Gateway Protocol - UPDATE Message
    Marker: ffffffffffffffffffffffffffffffff
    Length: 98
    Type: UPDATE Message (2)
    Withdrawn Routes Length: 0
    Total Path Attribute Length: 72
    Path attributes
        Path Attribute - ORIGIN: INCOMPLETE
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: ORIGIN (1)
            Length: 1
            Origin: INCOMPLETE (2)
        Path Attribute - AS_PATH: {500, 500} 65211
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: AS_PATH (2)
            Length: 10
            AS Path segment: {500, 500}
            AS Path segment: 65211
        Path Attribute - NEXT_HOP: 192.168.0.15
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: NEXT_HOP (3)
            Length: 4
            Next hop: 192.168.0.15
        Path Attribute - LOCAL_PREF: 100
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: LOCAL_PREF (5)
            Length: 4
            Local preference: 100
        Path Attribute - ATOMIC_AGGREGATE
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: ATOMIC_AGGREGATE (6)
            Length: 0
        Path Attribute - AGGREGATOR: AS: 65210 origin: 192.168.0.10
            Flags: 0xc0, Optional, Transitive, Complete
            Type Code: AGGREGATOR (7)
            Length: 6
            Aggregator AS: 65210
            Aggregator origin: 192.168.0.10
        Path Attribute - COMMUNITIES: 65215:1 790:4 340:250
            Flags: 0xc0, Optional, Transitive, Complete
            Type Code: COMMUNITIES (8)
            Length: 12
            Communities: 65215:1 790:4 340:250
                Community: 65215:1
                    Community AS: 65215
                    Community value: 1
                Community: 790:4
                    Community AS: 790
                    Community value: 4
                Community: 340:250
                    Community AS: 340
                    Community value: 250
        Path Attribute - ORIGINATOR_ID: 192.168.0.15
            Flags: 0x80, Optional, Non-transitive, Complete
            Type Code: ORIGINATOR_ID (9)
            Length: 4
            Originator identifier: 192.168.0.15
        Path Attribute - CLUSTER_LIST: 192.168.0.250
            Flags: 0x80, Optional, Non-transitive, Complete
            Type Code: CLUSTER_LIST (10)
            Length: 4
            Cluster List: 192.168.0.250
    Network Layer Reachability Information (NLRI)
Border Gateway Protocol - UPDATE Message
    Marker: ffffffffffffffffffffffffffffffff
    Length: 99
    Type: UPDATE Message (2)
    Withdrawn Routes Length: 0
    Total Path Attribute Length: 72
    Path attributes
        Path Attribute - ORIGIN: IGP
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: ORIGIN (1)
            Length: 1
            Origin: IGP (0)
        Path Attribute - AS_PATH: {500, 500} 65211
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: AS_PATH (2)
            Length: 10
            AS Path segment: {500, 500}
            AS Path segment: 65211
        Path Attribute - NEXT_HOP: 192.168.0.15
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: NEXT_HOP (3)
            Length: 4
            Next hop: 192.168.0.15
        Path Attribute - LOCAL_PREF: 100
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: LOCAL_PREF (5)
            Length: 4
            Local preference: 100
        Path Attribute - ATOMIC_AGGREGATE
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: ATOMIC_AGGREGATE (6)
            Length: 0
        Path Attribute - AGGREGATOR: AS: 65210 origin: 192.168.0.10
            Flags: 0xc0, Optional, Transitive, Complete
            Type Code: AGGREGATOR (7)
            Length: 6
            Aggregator AS: 65210
            Aggregator origin: 192.168.0.10
        Path Attribute - COMMUNITIES: 65215:1 790:4 340:250
            Flags: 0xc0, Optional, Transitive, Complete
            Type Code: COMMUNITIES (8)
            Length: 12
            Communities: 65215:1 790:4 340:250
                Community: 65215:1
                    Community AS: 65215
                    Community value: 1
                Community: 790:4
                    Community AS: 790
                    Community value: 4
                Community: 340:250
                    Community AS: 340
                    Community value: 250
        Path Attribute - ORIGINATOR_ID: 192.168.0.15
            Flags: 0x80, Optional, Non-transitive, Complete
            Type Code: ORIGINATOR_ID (9)
            Length: 4
            Originator identifier: 192.168.0.15
        Path Attribute - CLUSTER_LIST: 192.168.0.250
            Flags: 0x80, Optional, Non-transitive, Complete
            Type Code: CLUSTER_LIST (10)
            Length: 4
            Cluster List: 192.168.0.250
    Network Layer Reachability Information (NLRI)
```

`192.168.0.33`
`Path Attribute - AS_PATH: {500, 500} 65211`
`Path Attribute - NEXT_HOP: 192.168.0.15`

2: `17 8.549476 192.168.0.33 192.168.0.15 BGP 118 UPDATE Message`

```bash
Frame 17: 118 bytes on wire (944 bits), 118 bytes captured (944 bits)
Ethernet II, Src: Cisco_35:0e:1c (00:00:0c:35:0e:1c), Dst: Dell_23:c5:95 (00:c0:4f:23:c5:95)
Internet Protocol Version 4, Src: 192.168.0.33, Dst: 192.168.0.15
Transmission Control Protocol, Src Port: 179, Dst Port: 2124, Seq: 49, Ack: 265, Len: 64
Border Gateway Protocol - UPDATE Message
    Marker: ffffffffffffffffffffffffffffffff
    Length: 64
    Type: UPDATE Message (2)
    Withdrawn Routes Length: 0
    Total Path Attribute Length: 39
    Path attributes
        Path Attribute - ORIGIN: EGP
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: ORIGIN (1)
            Length: 1
            Origin: EGP (1)
        Path Attribute - AS_PATH: empty
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: AS_PATH (2)
            Length: 0
        Path Attribute - NEXT_HOP: 192.168.0.33
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: NEXT_HOP (3)
            Length: 4
            Next hop: 192.168.0.33
        Path Attribute - MULTI_EXIT_DISC: 0
            Flags: 0x80, Optional, Non-transitive, Complete
            Type Code: MULTI_EXIT_DISC (4)
            Length: 4
            Multiple exit discriminator: 0
        Path Attribute - LOCAL_PREF: 100
            Flags: 0x40, Transitive, Well-known, Complete
            Type Code: LOCAL_PREF (5)
            Length: 4
            Local preference: 100
        Path Attribute - COMMUNITIES: 65033:500 65033:600
            Flags: 0xc0, Optional, Transitive, Complete
            Type Code: COMMUNITIES (8)
            Length: 8
            Communities: 65033:500 65033:600
                Community: 65033:500
                    Community AS: 65033
                    Community value: 500
                Community: 65033:600
                    Community AS: 65033
                    Community value: 600
    Network Layer Reachability Information (NLRI)
```

`192.168.0.15`
`Path Attribute - AS_PATH: empty`
`Path Attribute - NEXT_HOP: 192.168.0.33`

## 4. Explain how BGP uses the AS_PATH attribute to detect and prevent routing loops

BGP uses the AS_PATH attribute to prevent loops by rejecting routes that contain the router's own AS number.

So if it sees it own AS number it will reject the advertised route.

## 6 Will a BGP router always choose the route with the shortest AS_PATH length? Explain your answer

No, policy considerations can be more important. A router might prefer a longer route for financial or strategic reasons.
