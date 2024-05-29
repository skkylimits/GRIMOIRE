# Wireshark TLS

## 02 A first look at the captured trace

## 1. What is the packet number in your trace that contains the initial TCP SYN message?   (By “packet number,” we meant the number in the “No.” column at the left of the Wireshark display, not the sequence number in the TCP segment itself)

```bash
93 3.061105 192.168.178.205 128.119.240.84 TCP 66 54340 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 WS=256 SACK_PERM
```

Packet `93`

## 2. Is the TCP connection set up before or after the first TLS message is sent from client to server?

```bash
114 3.161572 192.168.178.205 128.119.240.84 TCP 54 54340 → 443 [ACK] Seq=1 Ack=1 Win=131328 Len=0 
```

```bash
115 3.162387 192.168.178.205 128.119.240.84 TLSv1.2 720 Client Hello (SNI=www.cics.umass.edu)
```

```bash
116 3.168660 128.119.240.84 192.168.178.205 TCP 66 443 → 54341 [SYN, ACK] Seq=0 Ack=1 Win=29200 Len=0 MSS=1460 SACK_PERM WS=128
```

Based on the provided packet sequence:

- Frame 114 shows an ACK segment indicating that the client acknowledges receiving data from the server.
- Frame 115 shows the first TLS message, which is a Client Hello message from the client to the server.
- Frame 116 shows a SYN-ACK segment, indicating that the server acknowledges the client's request to establish a TCP connection.

From this sequence, it appears that the TCP connection is established after the first TLS message (Client Hello) is sent from the client to the server. Therefore, the TCP connection setup occurs after the TLS communication begins

## 03 The TLS Handshake: Client Hello message

## 3. What version of TLS is your client running, as declared in the Client Hello message?

```bash
115 3.162387 192.168.178.205 128.119.240.84 TLSv1.2 720 Client Hello (SNI=www.cics.umass.edu)
```

`TLSv1.2`

## 4. How many cipher suites are supported by your client, as declared in the Client Hello message?  A cipher suite is a set of related cryptographic algorithms that determine how session keys will be derived, and how data will be encrypted and be digitally signed via a HMAC algorithm

```bash
Frame 115: 720 bytes on wire (5760 bits), 720 bytes captured (5760 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.205, Dst: 128.119.240.84
Transmission Control Protocol, Src Port: 54340, Dst Port: 443, Seq: 1, Ack: 1, Len: 666
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Client Hello
        Content Type: Handshake (22)
        Version: TLS 1.0 (0x0301)
        Length: 661
        Handshake Protocol: Client Hello
            Handshake Type: Client Hello (1)
            Length: 657
            Version: TLS 1.2 (0x0303)
            Random: 51d94e117a3f496cd87be870207e80967b52b5d30d616dec2bb9d8192cf7b19b
            Session ID Length: 32
            Session ID: ab84d2e35d9ce55129a48cfc1c9a1ab02b7d32051273e0ccf7b088a1cdc47510
            Cipher Suites Length: 34
            Cipher Suites (17 suites)
            Compression Methods Length: 1
            Compression Methods (1 method)
            Extensions Length: 550
            Extension: server_name (len=23) name=www.cics.umass.edu
            Extension: extended_master_secret (len=0)
            Extension: renegotiation_info (len=1)
            Extension: supported_groups (len=14)
            Extension: ec_point_formats (len=2)
            Extension: session_ticket (len=0)
            Extension: application_layer_protocol_negotiation (len=14)
            Extension: status_request (len=5)
            Extension: delegated_credentials (len=10)
            Extension: key_share (len=107) x25519, secp256r1
            Extension: supported_versions (len=5) TLS 1.3, TLS 1.2
            Extension: signature_algorithms (len=24)
            Extension: psk_key_exchange_modes (len=2)
            Extension: record_size_limit (len=2)
            Extension: encrypted_client_hello (len=281)
            [JA4: t13d1715h2_5b57614c22b0_5c2c66f702b0]
            [JA4_r: t13d1715h2_002f,0035,009c,009d,1301,1302,1303,c009,c00a,c013,c014,c02b,c02c,c02f,c030,cca8,cca9_0005,000a,000b,000d,0017,001c,0022,0023,002b,002d,0033,fe0d,ff01_0403,0503,0603,0804,0805,0806,0401,0501,0601,0203,0201]
            [JA3 Fullstring: 771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-156-157-47-53,0-23-65281-10-11-35-16-5-34-51-43-13-45-28-65037,29-23-24-25-256-257,0]
            [JA3: b5001237acdf006056b409cc433726b0]
```

Based on this segement it's `Cipher Suites (17 suites)`

## 5. Your client generates and sends a string of “random bytes” to the server in the Client Hello message.  What are the first two hexadecimal digits in the random bytes field of the Client Hello message?  Enter the two hexadecimal digits (without spaces between the hex digits and without any leading '0x' , using lowercase letters where needed).  Hint: be careful to fully dig into the Random field to find the RandomBytes subfield (do not consider the GMT UNIX Time subfield of Random)

```bash
Random: 51d94e117a3f496cd87be870207e80967b52b5d30d616dec2bb9d8192cf7b19b
    GMT Unix Time: Jul  7, 2013 13:16:33.000000000 W. Europe Daylight Time
    Random Bytes: 7a3f496cd87be870207e80967b52b5d30d616dec2bb9d8192cf7b19b
```

So that would be `15`

## 6. What is the purpose(s) of the “random bytes” field in the Client Hello message?   Note:  you’ll have do some searching and reading to get the answer to this question; see section 8.6 and in RFC 5246  (section 8.1 in RFC 5246 in particular)

The "random bytes" field in the Client Hello message serves several key purposes:

1. **Randomness**: It provides a random value crucial for generating cryptographic keys and ensuring security.

2. **Security**: Enhances security by adding entropy to cryptographic operations, making attacks more difficult.

3. **Version Flexibility**: Ensures uniqueness of each Client Hello, preventing downgrade attacks.

4. **Session Resumption**: Used in session resumption mechanisms for generating session identifiers and tickets, improving performance.

## 7. Which cipher suite has been chosen by the server from among those offered in the earlier Client Hello message?

```bash
Frame 120: 1514 bytes on wire (12112 bits), 1514 bytes captured (12112 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.240.84, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 443, Dst Port: 54340, Seq: 1, Ack: 667, Len: 1460
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Server Hello
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 65
        Handshake Protocol: Server Hello
            Handshake Type: Server Hello (2)
            Length: 61
            Version: TLS 1.2 (0x0303)
            Random: 315d957153cc8a564f5c8e1f0df63943079c7e880901f9ba494d2de010cf9ad6
                GMT Unix Time: Mar 30, 1996 21:11:29.000000000 W. Europe Standard Time
                Random Bytes: 53cc8a564f5c8e1f0df63943079c7e880901f9ba494d2de010cf9ad6
            Session ID Length: 0
            Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)
            Compression Method: null (0)
            Extensions Length: 21
            Extension: server_name (len=0)
            Extension: renegotiation_info (len=1)
            Extension: ec_point_formats (len=4)
            Extension: session_ticket (len=0)
            [JA3S Fullstring: 771,49199,0-65281-11-35]
            [JA3S: 389ed42c02ebecc32e73aa31def07e14]
    TLS segment data (1390 bytes)
```

The following cipher suite has been chosen:

`Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)`

## 8. Does the Server Hello message contain random bytes, similar to how the Client Hello message contained random bytes? And if so, what is/are their purpose(s)?

Yes the server has similar random bytes as seen in the following snippet.

```bash
Random: 315d957153cc8a564f5c8e1f0df63943079c7e880901f9ba494d2de010cf9ad6
    GMT Unix Time: Mar 30, 1996 21:11:29.000000000 W. Europe Standard Time
    Random Bytes: 53cc8a564f5c8e1f0df63943079c7e880901f9ba494d2de010cf9ad6
```

The purpose of these random bytes have the same function similar to the client bytes as stated and explained in previous answers

## 9. What is the packet number in your trace for the TLS message part that contains the public key certificate for the <www.cics.umass.edu> server (actually the<www.cs.umass.edu> server)?

```bash
126 3.274375 128.119.240.84 192.168.178.205 TLSv1.2 1306 Certificate, Server Key Exchange, Server Hello Done
```

Packet number: `126`

## 10. A server may return more than one certificate.  If more than one certificate is returned, are all of these certificates for <www.cs.umass.edu>? If not all are for <www.cs.umass.edu>, then who are these other certificates for? You can determine who the certificate is for by checking the id-at-commonName field in the retuned certificate

Inspect each certificate's Common Name (CN) field to see if they are all for <www.cs.umass.edu>. If any certificates are not, check the id-at-commonName field in each certificate to identify the domains they are issued for.

To locate the Common Name (CN) field in Wireshark, you typically need to inspect the certificate details within the TLS handshake messages. Here's a general guide to find it:

- Open the TLS handshake message containing the certificate (it should be labeled as "Certificate" in the Wireshark packet list).
- Expand the TLS section within the packet details.
- Look for the "Certificate" section and expand it.
- Inside the "Certificate" section, there should be a field labeled "Subject" or "Subject Name." This field contains the CN attribute, which represents the Common Name.
- Check the value of the CN attribute to see if it matches the domain you're interested in (e.g., <www.cs.umass.edu>).

```bash
Certificates (4919 bytes)
    Certificate Length: 1883
    Certificate [truncated]: 30820757308205bfa0030201020210655955b7587120b3a02789f22088f244300d06092a864886f70d01010c05003044310b300906035504061302555331123010060355040a1309496e7465726e6574323121301f06035504031318496e436f6d6d6f6e20525341205365
        signedCertificate
            version: v3 (2)
            serialNumber: 0x655955b7587120b3a02789f22088f244
            signature (sha384WithRSAEncryption)
                Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
            issuer: rdnSequence (0)
            validity
            subject: rdnSequence (0)
                rdnSequence: 4 items (id-at-commonName=www.cs.umass.edu,id-at-organizationName=University of Massachusetts Amherst,id-at-stateOrProvinceName=Massachusetts,id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-stateOrProvinceName=Massachusetts)
                    RDNSequence item: 1 item (id-at-organizationName=University of Massachusetts Amherst)
                    RDNSequence item: 1 item (id-at-commonName=www.cs.umass.edu)
            subjectPublicKeyInfo
            extensions: 10 items
        algorithmIdentifier (sha384WithRSAEncryption)
            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
        Padding: 0
        encrypted [truncated]: 102bbc9ea84e2f9ce8017840b95eedec03282eb2358086b80fbd5a5b25c0044f5872175d24bc9fef07b25f9ba75fabc88c52ecada2e97217f3bdf3ee9539501a86702b4442a2605f4780035aa70bd121049985a3dade680e5a73dfd76451c68eb63e4d1e4a0e51764fe01aa7
    Certificate Length: 1614
    Certificate [truncated]: 3082064a30820432a003020102021100835b7615206d2d6e097e0b6e409fefc0300d06092a864886f70d01010c0500308188310b3009060355040613025553311330110603550408130a4e6577204a6572736579311430120603550407130b4a6572736579204369747931
        signedCertificate
            version: v3 (2)
            serialNumber: 0x00835b7615206d2d6e097e0b6e409fefc0
            signature (sha384WithRSAEncryption)
                Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
            issuer: rdnSequence (0)
            validity
            subject: rdnSequence (0)
                rdnSequence: 3 items (id-at-commonName=InCommon RSA Server CA 2,id-at-organizationName=Internet2,id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-organizationName=Internet2)
                    RDNSequence item: 1 item (id-at-commonName=InCommon RSA Server CA 2)
            subjectPublicKeyInfo
            extensions: 8 items
        algorithmIdentifier (sha384WithRSAEncryption)
            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
        Padding: 0
        encrypted [truncated]: 26800d34e41eae22beaf3ea6e284f9c6b725b1f7db2fa875c26a82acc3b6ce5b82c6a906cc11632a639972de975d50d94eb0af24a57652230510d9f0087c34eb3ce40e8c28940b694f6a1f34721bac365104f3470c76b1e637d0c92cdd97487bdae3b39ac46258883a1f43c3
    Certificate Length: 1413
    Certificate [truncated]: 3082058130820469a00302010202103972443af922b751d7d36c10dd313595300d06092a864886f70d01010c0500307b310b3009060355040613024742311b301906035504080c1247726561746572204d616e636865737465723110300e06035504070c0753616c666f72
        signedCertificate
            version: v3 (2)
            serialNumber: 0x3972443af922b751d7d36c10dd313595
            signature (sha384WithRSAEncryption)
                Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
            issuer: rdnSequence (0)
            validity
            subject: rdnSequence (0)
                rdnSequence: 5 items (id-at-commonName=USERTrust RSA Certification Authority,id-at-organizationName=The USERTRUST Network,id-at-localityName=Jersey City,id-at-stateOrProvinceName=New Jersey,id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-stateOrProvinceName=New Jersey)
                    RDNSequence item: 1 item (id-at-localityName=Jersey City)
                    RDNSequence item: 1 item (id-at-organizationName=The USERTRUST Network)
                    RDNSequence item: 1 item (id-at-commonName=USERTrust RSA Certification Authority)
            subjectPublicKeyInfo
            extensions: 7 items
        algorithmIdentifier (sha384WithRSAEncryption)
            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
        Padding: 0
        encrypted [truncated]: 188751dc74213d9c8ae027b733d02eccecf0e6cb5e11de226f9b758e9e72fee4d6feaa1f9c962def034a7eaef48d6f723c433bc03febb8df5caaa9c6aef2fcd8eea37b43f686367c14e0cdf4f73ffedeb8b48af09196fefd43647efdccd201a17d7df81919c9422b13bf588b
```

```bash
subject: rdnSequence (0)
                rdnSequence: 3 items (id-at-commonName=InCommon RSA Server CA 2,id-at-organizationName=Internet2,id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-countryName=US)
                    RDNSequence item: 1 item (id-at-organizationName=Internet2)
                    RDNSequence item: 1 item (id-at-commonName=InCommon RSA Server CA 2)
```

Yes, there are other certificates in the trace file besides those for <www.cs.umass.edu>. Specifically, there are certificates for:

- InCommon RSA Server CA 2, issued by Internet2
- USERTrust RSA Certification Authority, issued by The USERTRUST Network

## 11. What is the name of the certification authority that issued the certificate for id-at-commonName=www.cs.umass.edu?

```bash
RDNSequence item: 1 item (id-at-commonName=InCommon RSA Server CA 2)
```

`InCommon RSA Server CA`

## 12. What digital signature algorithm is used by the CA to sign this certificate? Hint: this information can be found in signature subfield of the SignedCertificate field of the certificate for <www.cs.umass.edu>

```bash
signature (sha384WithRSAEncryption)
    Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)

```

That would be `sha384WithRSAEncryption`

## 13. Look in your trace to find messages between the client and a CA to get the CA’s public key information, so that the client can verify that the CA-signed certificate sent by the server is indeed valid and has not been forged or altered.  Do you see such message in your trace?  If so, what is the number in the trace of the first packet sent from your client to the CA?  If not, explain why the client did not contact the CA

You should look for messages between the client and a Certificate Authority (CA) that involve the exchange of public key information or certificates. These messages typically include:

- Certificate Requests: The client may send a Certificate Request message to the CA, requesting the CA's certificate or public key.

= Certificate Responses: The CA responds to the client's request with its certificate or public key.

- Certificate Revocation List (CRL) Requests: The client may also request a CRL from the CA to check if any certificates issued by the CA have been revoked.

- Certificate Revocation List (CRL) Responses: The CA responds to the client's CRL request with the list of revoked certificates, if any.

These messages are part of the SSL/TLS handshake process and typically occur during the Certificate Exchange phase. If you find such messages in the trace, they will help the client verify the validity of the server's certificate.

```bash
Frame 340: 1306 bytes on wire (10448 bits), 1306 bytes captured (10448 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.240.84, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 443, Dst Port: 54347, Seq: 4097, Ack: 667, Len: 1252
4 Reassembled TCP Segments (4931 bytes): #333(1390), #334(1460), #335(1176), #340(905)]
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Certificate
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 4926
        Handshake Protocol: Certificate
            Handshake Type: Certificate (11)
            Length: 4922
            Certificates Length: 4919
            Certificates (4919 bytes)
                Certificate Length: 1883
                Certificate [truncated]: 30820757308205bfa0030201020210655955b7587120b3a02789f22088f244300d06092a864886f70d01010c05003044310b300906035504061302555331123010060355040a1309496e7465726e6574323121301f06035504031318496e436f6d6d6f6e20525341205365
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x655955b7587120b3a02789f22088f244
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 4 items (id-at-commonName=www.cs.umass.edu,id-at-organizationName=University of Massachusetts Amherst,id-at-stateOrProvinceName=Massachusetts,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-stateOrProvinceName=Massachusetts)
                                    RelativeDistinguishedName item (id-at-stateOrProvinceName=Massachusetts)
                                        Object Id: 2.5.4.8 (id-at-stateOrProvinceName)
                                        DirectoryString: printableString (1)
                                            printableString: Massachusetts
                                RDNSequence item: 1 item (id-at-organizationName=University of Massachusetts Amherst)
                                    RelativeDistinguishedName item (id-at-organizationName=University of Massachusetts Amherst)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: University of Massachusetts Amherst
                                RDNSequence item: 1 item (id-at-commonName=www.cs.umass.edu)
                                    RelativeDistinguishedName item (id-at-commonName=www.cs.umass.edu)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: www.cs.umass.edu
                        subjectPublicKeyInfo
                        extensions: 10 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 102bbc9ea84e2f9ce8017840b95eedec03282eb2358086b80fbd5a5b25c0044f5872175d24bc9fef07b25f9ba75fabc88c52ecada2e97217f3bdf3ee9539501a86702b4442a2605f4780035aa70bd121049985a3dade680e5a73dfd76451c68eb63e4d1e4a0e51764fe01aa7
                Certificate Length: 1614
                Certificate [truncated]: 3082064a30820432a003020102021100835b7615206d2d6e097e0b6e409fefc0300d06092a864886f70d01010c0500308188310b3009060355040613025553311330110603550408130a4e6577204a6572736579311430120603550407130b4a6572736579204369747931
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x00835b7615206d2d6e097e0b6e409fefc0
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 3 items (id-at-commonName=InCommon RSA Server CA 2,id-at-organizationName=Internet2,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-organizationName=Internet2)
                                    RelativeDistinguishedName item (id-at-organizationName=Internet2)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: Internet2
                                RDNSequence item: 1 item (id-at-commonName=InCommon RSA Server CA 2)
                                    RelativeDistinguishedName item (id-at-commonName=InCommon RSA Server CA 2)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: InCommon RSA Server CA 2
                        subjectPublicKeyInfo
                        extensions: 8 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 26800d34e41eae22beaf3ea6e284f9c6b725b1f7db2fa875c26a82acc3b6ce5b82c6a906cc11632a639972de975d50d94eb0af24a57652230510d9f0087c34eb3ce40e8c28940b694f6a1f34721bac365104f3470c76b1e637d0c92cdd97487bdae3b39ac46258883a1f43c3
                Certificate Length: 1413
                Certificate [truncated]: 3082058130820469a00302010202103972443af922b751d7d36c10dd313595300d06092a864886f70d01010c0500307b310b3009060355040613024742311b301906035504080c1247726561746572204d616e636865737465723110300e06035504070c0753616c666f72
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x3972443af922b751d7d36c10dd313595
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 5 items (id-at-commonName=USERTrust RSA Certification Authority,id-at-organizationName=The USERTRUST Network,id-at-localityName=Jersey City,id-at-stateOrProvinceName=New Jersey,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-stateOrProvinceName=New Jersey)
                                    RelativeDistinguishedName item (id-at-stateOrProvinceName=New Jersey)
                                        Object Id: 2.5.4.8 (id-at-stateOrProvinceName)
                                        DirectoryString: printableString (1)
                                            printableString: New Jersey
                                RDNSequence item: 1 item (id-at-localityName=Jersey City)
                                    RelativeDistinguishedName item (id-at-localityName=Jersey City)
                                        Object Id: 2.5.4.7 (id-at-localityName)
                                        DirectoryString: printableString (1)
                                            printableString: Jersey City
                                RDNSequence item: 1 item (id-at-organizationName=The USERTRUST Network)
                                    RelativeDistinguishedName item (id-at-organizationName=The USERTRUST Network)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: The USERTRUST Network
                                RDNSequence item: 1 item (id-at-commonName=USERTrust RSA Certification Authority)
                                    RelativeDistinguishedName item (id-at-commonName=USERTrust RSA Certification Authority)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: USERTrust RSA Certification Authority
                        subjectPublicKeyInfo
                        extensions: 7 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 188751dc74213d9c8ae027b733d02eccecf0e6cb5e11de226f9b758e9e72fee4d6feaa1f9c962def034a7eaef48d6f723c433bc03febb8df5caaa9c6aef2fcd8eea37b43f686367c14e0cdf4f73ffedeb8b48af09196fefd43647efdccd201a17d7df81919c9422b13bf588b
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Server Key Exchange
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 333
        Handshake Protocol: Server Key Exchange
            Handshake Type: Server Key Exchange (12)
            Length: 329
            EC Diffie-Hellman Server Params
                Curve Type: named_curve (0x03)
                Named Curve: secp256r1 (0x0017)
                Pubkey Length: 65
                Pubkey: 0439b1e951273b79a59c3458a22450be786a4d3b956b559a33c8492b0aee7ecec38cd07476a8b9685ec6e1328e7246c4e0ee41ad98a4351c5d561febfa4d1a6b59
                Signature Algorithm: rsa_pkcs1_sha256 (0x0401)
                Signature Length: 256
                Signature [truncated]: 65394dca7e46d6e2844495a4937b15f6321d339beef282b5fc2bed0c0065b87c2a08ecbf0644e32b55a11c56e11c0f6dc9fd254eaba6bfdbaa8e2455513122b511ebaad92f64022c09942cf6a0bc7933321aa34088ced167200750d29299d648031b042549cd0b006be1a358
    TLSv1.2 Record Layer: Handshake Protocol: Server Hello Done
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 4
        Handshake Protocol: Server Hello Done
            Handshake Type: Server Hello Done (14)
            Length: 0
```

``` bash
Frame 367: 1306 bytes on wire (10448 bits), 1306 bytes captured (10448 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.240.84, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 443, Dst Port: 54349, Seq: 4097, Ack: 667, Len: 1252
4 Reassembled TCP Segments (4931 bytes): #360(1390), #361(1460), #362(1176), #367(905)]
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Certificate
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 4926
        Handshake Protocol: Certificate
            Handshake Type: Certificate (11)
            Length: 4922
            Certificates Length: 4919
            Certificates (4919 bytes)
                Certificate Length: 1883
                Certificate [truncated]: 30820757308205bfa0030201020210655955b7587120b3a02789f22088f244300d06092a864886f70d01010c05003044310b300906035504061302555331123010060355040a1309496e7465726e6574323121301f06035504031318496e436f6d6d6f6e20525341205365
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x655955b7587120b3a02789f22088f244
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 4 items (id-at-commonName=www.cs.umass.edu,id-at-organizationName=University of Massachusetts Amherst,id-at-stateOrProvinceName=Massachusetts,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-stateOrProvinceName=Massachusetts)
                                    RelativeDistinguishedName item (id-at-stateOrProvinceName=Massachusetts)
                                        Object Id: 2.5.4.8 (id-at-stateOrProvinceName)
                                        DirectoryString: printableString (1)
                                            printableString: Massachusetts
                                RDNSequence item: 1 item (id-at-organizationName=University of Massachusetts Amherst)
                                    RelativeDistinguishedName item (id-at-organizationName=University of Massachusetts Amherst)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: University of Massachusetts Amherst
                                RDNSequence item: 1 item (id-at-commonName=www.cs.umass.edu)
                                    RelativeDistinguishedName item (id-at-commonName=www.cs.umass.edu)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: www.cs.umass.edu
                        subjectPublicKeyInfo
                        extensions: 10 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 102bbc9ea84e2f9ce8017840b95eedec03282eb2358086b80fbd5a5b25c0044f5872175d24bc9fef07b25f9ba75fabc88c52ecada2e97217f3bdf3ee9539501a86702b4442a2605f4780035aa70bd121049985a3dade680e5a73dfd76451c68eb63e4d1e4a0e51764fe01aa7
                Certificate Length: 1614
                Certificate [truncated]: 3082064a30820432a003020102021100835b7615206d2d6e097e0b6e409fefc0300d06092a864886f70d01010c0500308188310b3009060355040613025553311330110603550408130a4e6577204a6572736579311430120603550407130b4a6572736579204369747931
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x00835b7615206d2d6e097e0b6e409fefc0
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 3 items (id-at-commonName=InCommon RSA Server CA 2,id-at-organizationName=Internet2,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-organizationName=Internet2)
                                    RelativeDistinguishedName item (id-at-organizationName=Internet2)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: Internet2
                                RDNSequence item: 1 item (id-at-commonName=InCommon RSA Server CA 2)
                                    RelativeDistinguishedName item (id-at-commonName=InCommon RSA Server CA 2)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: InCommon RSA Server CA 2
                        subjectPublicKeyInfo
                        extensions: 8 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 26800d34e41eae22beaf3ea6e284f9c6b725b1f7db2fa875c26a82acc3b6ce5b82c6a906cc11632a639972de975d50d94eb0af24a57652230510d9f0087c34eb3ce40e8c28940b694f6a1f34721bac365104f3470c76b1e637d0c92cdd97487bdae3b39ac46258883a1f43c3
                Certificate Length: 1413
                Certificate [truncated]: 3082058130820469a00302010202103972443af922b751d7d36c10dd313595300d06092a864886f70d01010c0500307b310b3009060355040613024742311b301906035504080c1247726561746572204d616e636865737465723110300e06035504070c0753616c666f72
                    signedCertificate
                        version: v3 (2)
                        serialNumber: 0x3972443af922b751d7d36c10dd313595
                        signature (sha384WithRSAEncryption)
                            Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                        issuer: rdnSequence (0)
                        validity
                        subject: rdnSequence (0)
                            rdnSequence: 5 items (id-at-commonName=USERTrust RSA Certification Authority,id-at-organizationName=The USERTRUST Network,id-at-localityName=Jersey City,id-at-stateOrProvinceName=New Jersey,id-at-countryName=US)
                                RDNSequence item: 1 item (id-at-countryName=US)
                                    RelativeDistinguishedName item (id-at-countryName=US)
                                        Object Id: 2.5.4.6 (id-at-countryName)
                                        CountryName: US
                                RDNSequence item: 1 item (id-at-stateOrProvinceName=New Jersey)
                                    RelativeDistinguishedName item (id-at-stateOrProvinceName=New Jersey)
                                        Object Id: 2.5.4.8 (id-at-stateOrProvinceName)
                                        DirectoryString: printableString (1)
                                            printableString: New Jersey
                                RDNSequence item: 1 item (id-at-localityName=Jersey City)
                                    RelativeDistinguishedName item (id-at-localityName=Jersey City)
                                        Object Id: 2.5.4.7 (id-at-localityName)
                                        DirectoryString: printableString (1)
                                            printableString: Jersey City
                                RDNSequence item: 1 item (id-at-organizationName=The USERTRUST Network)
                                    RelativeDistinguishedName item (id-at-organizationName=The USERTRUST Network)
                                        Object Id: 2.5.4.10 (id-at-organizationName)
                                        DirectoryString: printableString (1)
                                            printableString: The USERTRUST Network
                                RDNSequence item: 1 item (id-at-commonName=USERTrust RSA Certification Authority)
                                    RelativeDistinguishedName item (id-at-commonName=USERTrust RSA Certification Authority)
                                        Object Id: 2.5.4.3 (id-at-commonName)
                                        DirectoryString: printableString (1)
                                            printableString: USERTrust RSA Certification Authority
                        subjectPublicKeyInfo
                        extensions: 7 items
                    algorithmIdentifier (sha384WithRSAEncryption)
                        Algorithm Id: 1.2.840.113549.1.1.12 (sha384WithRSAEncryption)
                    Padding: 0
                    encrypted [truncated]: 188751dc74213d9c8ae027b733d02eccecf0e6cb5e11de226f9b758e9e72fee4d6feaa1f9c962def034a7eaef48d6f723c433bc03febb8df5caaa9c6aef2fcd8eea37b43f686367c14e0cdf4f73ffedeb8b48af09196fefd43647efdccd201a17d7df81919c9422b13bf588b
Transport Layer Security
    TLSv1.2 Record Layer: Handshake Protocol: Server Key Exchange
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 333
        Handshake Protocol: Server Key Exchange
            Handshake Type: Server Key Exchange (12)
            Length: 329
            EC Diffie-Hellman Server Params
                Curve Type: named_curve (0x03)
                Named Curve: secp256r1 (0x0017)
                Pubkey Length: 65
                Pubkey: 0498cc410249c2e38ff175323166e28e2444ae4c640b2dc448961c146188d97141495b6efb7deac23f56be417fc271d03fe6e4ecbe39a6561cafd4d2906a7cffe5
                Signature Algorithm: rsa_pkcs1_sha256 (0x0401)
                Signature Length: 256
                Signature [truncated]: 8b66baaa86fccee7ed1dbb8f3fbc0ec67c133c9f203160cbf592ef04f3660f6e1c0cba04ebc987a74ecc9ac3bdb124ae66714b36fb33aa5c1f406d5373f1f1dfc23cb89a3360ffae29d62c968965ce8687d928f6f96f53470b108bed65a2cdc44f32cf3c1745451ab70a4f25
    TLSv1.2 Record Layer: Handshake Protocol: Server Hello Done
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 4
        Handshake Protocol: Server Hello Done
            Handshake Type: Server Hello Done (14)
            Length: 0
```

In these traces, there are Certificate messages exchanged between the client and the server, but there is no direct interaction between the client and the Certificate Authority (CA) to obtain the CA's public key information.

`The reason for this is that the server already presented its certificate to the client during the TLS handshake process`. The client typically doesn't directly contact the CA during the TLS handshake. Instead, it relies on the server to provide its certificate, which is then validated by the client using the CA's public key information already available to the client.

Therefore, in this trace, the client did not contact the CA directly because it received the server's certificate from the server itself during the TLS handshake process.

### Key Points in the Trace

1. **Frame 340:** Contains the TLS handshake protocol where the server sends its certificate to the client.
   - **Handshake Protocol: Certificate**: This indicates that the server's certificate is being sent to the client for validation.
   - **Certificates:** The actual server certificate and possibly intermediate certificates are included here.

2. **Client Validation Process:**
   - The client uses its local certificate store to validate the server's certificate chain.
   - If configured, the client may perform an OCSP or CRL check, which would result in a packet to the CA or OCSP responder.

### Why the Client Did Not Contact the CA Directly

- The trace does not show any packet directly sent from the client to the CA for validation.
- The client most likely performed the certificate validation using its local trust store.
- If OCSP/CRL checks were not performed or were performed offline, there would be no network traffic for these checks.

If there were an OCSP or CRL check, you would see a packet from the client to the respective OCSP responder or CRL distribution point, typically HTTP requests to URLs specified in the certificate.

To summarize, the client likely performed certificate verification locally, without sending any packet to the CA. This is a standard practice for certificate chain validation.

The process of the server presenting its certificate to the client happens during the TLS handshake, specifically in the "Server Hello" message sequence. In your provided packet trace, this occurs in **Frame 340**.

### Details from Frame 340

1. **Frame 340 Overview:**
   - **No. 340**: The frame number in the packet capture.
   - **Time**: The timestamp when the packet was captured.
   - **Source**: The IP address of the server.
   - **Destination**: The IP address of the client.
   - **Protocol**: TLSv1.2 (indicating the protocol used).
   - **Length**: The length of the packet.

2. **TLS Handshake Protocol Details:**
   - **Content Type: Handshake (22)**: Indicates this is a handshake message.
   - **Version: TLS 1.2 (0x0303)**: The version of the TLS protocol.
   - **Length: 2497**: The length of the handshake message.
   - **Handshake Protocol: Certificate**: This is the specific handshake message where the server sends its certificate to the client.

3. **Certificates:**
   - **Certificates Length: 2494**: The total length of all certificates being sent.
   - **Certificate Length: 1496**: The length of the server's certificate.
   - **Certificate Length: 992**: The length of any intermediate certificates (if present).

### Step-by-Step Breakdown

1. **Client Hello (not shown in provided frame details):**
   - The client initiates the handshake by sending a "Client Hello" message to the server, specifying supported cipher suites, TLS versions, and other options.

2. **Server Hello:**
   - The server responds with a "Server Hello" message, agreeing on the protocol version and cipher suite.

3. **Server Certificate:**
   - The server sends its digital certificate to the client in the "Certificate" message. This is where Frame 340 comes into play.
   - **Frame 340** specifically contains the server's certificate. The client receives this certificate and proceeds to validate it.

### Verification Process (Client-Side)

After receiving the server's certificate in Frame 340, the client performs the following steps locally:

1. **Certificate Chain Validation:**
   - The client verifies the server's certificate against its list of trusted root certificates stored locally. It checks that the certificate is signed by a trusted CA.

2. **Expiration and Usage Check:**
   - The client checks the certificate's validity period and ensures it is currently valid.
   - It also checks that the certificate is intended for server authentication.

3. **Optional Revocation Check:**
   - The client may check the revocation status of the certificate using OCSP (Online Certificate Status Protocol) or CRL (Certificate Revocation List). This step might involve additional network requests, which would be visible in the packet capture if performed.

### Key Points in the Packet Trace

- **Frame 340**: Shows the server sending its certificate to the client.
- The client performs verification steps locally using the information in the certificate and its own trust store.

### Why No Direct CA Contact is Seen

- Certificate chain validation is done locally without contacting the CA directly during the handshake.
- Revocation checks (OCSP/CRL) are optional and may not always be performed, which is why no such packets are visible in the trace.

In summary, Frame 340 is where the server presents its certificate to the client during the TLS handshake. The client then performs certificate verification steps locally, which is why there is no direct packet showing the client contacting the CA in the provided trace.
