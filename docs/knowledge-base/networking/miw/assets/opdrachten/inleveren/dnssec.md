# DNSSec

`dig www.hva.nl`

```bash
; <<>> DiG 9.10.6 <<>> www.hva.nl
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31193
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;www.hva.nl.   IN A

;; ANSWER SECTION:
www.hva.nl.  1728 IN CNAME www.cms.hva.nl.
www.cms.hva.nl.  1694 IN CNAME hvacms-prd-fe.lb.hva.nl.
hvacms-prd-fe.lb.hva.nl. 3010 IN A 145.18.11.151

;; Query time: 19 msec
;; SERVER: 2001:730:3e42::53#53(2001:730:3e42::53)
;; WHEN: Wed May 22 11:39:08 CEST 2024
;; MSG SIZE  rcvd: 108
```

## 1. What are aliases for <www.hva.nl>?

`www.hva.nl.  1728 IN CNAME www.cms.hva.nl.`
`www.cms.hva.nl.  1694 IN CNAME hvacms-prd-fe.lb.hva.nl.`

- <www.cms.hva.nl>
- hvacms-prd-f1.lb.hva.nl

## 2. What is the IP address for <www.hva.nl>?

145.18.11.151

## 3. What is the IP address of the DNS server that performed the query?

62.179.104.196/53

### Google's DNSsec server

If you want to, you can also specify the DNS server you want to use for your queries.

For this lab, you need to make sure that you’re using a DNS server that supports DNSSec.

One such server is Google’s DNS server at 8.8.8.8

Repeat your query, using Google’s DNS server and verify that the server address has indeed
changed:

`dig @8.8.8.8 www.hva.nl`

```bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 www.hva.nl
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 43514
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;www.hva.nl.   IN A

;; ANSWER SECTION:
www.hva.nl.  823 IN CNAME www.cms.hva.nl.
www.cms.hva.nl.  3176 IN CNAME hvacms-prd-fe.lb.hva.nl.
hvacms-prd-fe.lb.hva.nl. 3176 IN A 145.18.11.151

;; Query time: 27 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 11:37:16 CEST 2024
;; MSG SIZE  rcvd: 108
```

`;; SERVER: 8.8.8.8#53(8.8.8.8)`

Server has indeed changed.

## MX records

We can also use dig to find other types of DNS resource records.

For example, to find the mail servers for the HvA domain, we need to query the MX record:

`dig @8.8.8.8 hva.nl MX`

## 4. What are the mail servers for hva.nl?

```bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 hva.nl MX
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 10882
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;hva.nl.    IN MX

;; ANSWER SECTION:
hva.nl.   17 IN MX 100 hva-nl.mail.protection.outlook.com.

;; Query time: 16 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 11:36:34 CEST 2024
;; MSG SIZE  rcvd: 85
```

hva.nl.mail.protection.outlook.com

## NS records

One more thing we’ll use later, is to use dig to query the DNS root domain.

The root domain is indicated by a . (period).

Let’s find the root name servers by asking for the NS records:

`dig @8.8.8.8 . NS`

## 5 How many root name servers are there?

```bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 . NS
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18959
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 13, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;.    IN NS

;; ANSWER SECTION:
.   87203 IN NS a.root-servers.net.
.   87203 IN NS b.root-servers.net.
.   87203 IN NS c.root-servers.net.
.   87203 IN NS d.root-servers.net.
.   87203 IN NS e.root-servers.net.
.   87203 IN NS f.root-servers.net.
.   87203 IN NS g.root-servers.net.
.   87203 IN NS h.root-servers.net.
.   87203 IN NS i.root-servers.net.
.   87203 IN NS j.root-servers.net.
.   87203 IN NS k.root-servers.net.
.   87203 IN NS l.root-servers.net.
.   87203 IN NS m.root-servers.net.

;; Query time: 20 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 11:35:53 CEST 2024
;; MSG SIZE  rcvd: 239
```

13

## With DNSSec

`dig +dnssec iana.org`

```bash
; <<>> DiG 9.10.6 <<>> +dnssec iana.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14458
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: do; udp: 512
;; QUESTION SECTION:
;iana.org.   IN A

;; ANSWER SECTION:
iana.org.  2785 IN A 192.0.43.8
iana.org.  2785 IN RRSIG A 13 2 3600 20240608225733 20240519023508 53388 iana.org. 9ZRoWeMLLyEnidbwYwxipWRL2DIDe7L2JV2+imeeyaZSlHQF5eY+xto1 auDKH3ET6BbhbSVr+VQGqRJ7mCxXXA==

;; Query time: 28 msec
;; SERVER: 2001:730:3e42::53#53(2001:730:3e42::53)
;; WHEN: Wed May 22 11:42:22 CEST 2024
;; MSG SIZE  rcvd: 157
```

We can see this server has DNSSec by:

- `EDNS` Flags: The OPT PSEUDOSECTION indicates that the `do` flag `; EDNS: version: 0, flags: do; udp: 512` (DNSSEC OK) is set, meaning that DNSSEC-related records were requested and received.

## Without DNSSec

`dig dnssec www.nos.nl`

```bash
; <<>> DiG 9.10.6 <<>> dnssec www.nos.nl
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 10922
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;dnssec.    IN A

;; AUTHORITY SECTION:
.   600 IN SOA a.root-servers.net. nstld.verisign-grs.com. 2024052200 1800 900 604800 86400

;; Query time: 29 msec
;; SERVER: 2001:730:3e42::53#53(2001:730:3e42::53)
;; WHEN: Wed May 22 11:51:35 CEST 2024
;; MSG SIZE  rcvd: 110

;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 8810
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;www.nos.nl.   IN A

;; ANSWER SECTION:
www.nos.nl.  60 IN CNAME d2smx6wmggkqjx.cloudfront.net.
d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.74
d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.102
d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.12
d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.80

;; Query time: 34 msec
;; SERVER: 2001:730:3e42::53#53(2001:730:3e42::53)
;; WHEN: Wed May 22 11:51:35 CEST 2024
;; MSG SIZE  rcvd: 146
```

We can see this server has no DNSSec by:

- `NXDOMAIN Status`: In the first response, the status is NXDOMAIN, indicating that the domain dnssec does not exist. This is because the query was for the A record of dnssec, not for <www.nos.nl>.
  - `;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 10922`

- `OPT PSEUDOSECTION`: The OPT PSEUDOSECTION shows that no DNSSEC-related flags (do) are set. This indicates that DNSSEC-related records were not requested or received.
  - `; EDNS: version: 0, flags:; udp: 512`

- No `DNSSEC Records`: There are `no RRSIG record`s present in the ANSWER section of the second response for the domain <www.nos.nl>. The absence of RRSIG records indicates that DNSSEC is not configured for this domain.

    ```txt
    ;; ANSWER SECTION:
    <www.nos.nl>.  60 IN CNAME d2smx6wmggkqjx.cloudfront.net.
    d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.74
    d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.102
    d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.12
    d2smx6wmggkqjx.cloudfront.net. 60 IN A 18.239.18.80
      ```

## Inccorrect DNSSec

`dig +dnssec dnssec-failed.org`

```bash
; <<>> DiG 9.10.6 <<>> +dnssec dnssec-failed.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 63191
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags: do; udp: 512
;; QUESTION SECTION:
;dnssec-failed.org.  IN A

;; ANSWER SECTION:
dnssec-failed.org. 300 IN A 96.99.227.255
dnssec-failed.org. 300 IN RRSIG A 5 2 300 20240604145115 20240518144615 44973 dnssec-failed.org. DvJmtF9DEKi6hJ1ZjoExUv49txFhNFLE58CPusHe6MxSuljykcNRdrmj xlpitpuWry2bIXK/h+M/BnOK4ZSMyAS6vjaqJuUapPctNk9yefG17C5a /csUo2hBb4HT5TLih1UPqUBoaKumKXauWsrAP4JeLVVFkn46zgzRpD5L Tcc=

;; Query time: 147 msec
;; SERVER: 2001:730:3e42::53#53(2001:730:3e42::53)
;; WHEN: Wed May 22 11:30:07 CEST 2024
;; MSG SIZE  rcvd: 239
```

We can see this server has misconfigured DNSSec settings by:

- Missing `ad` Flag: The absence of the ad flag means the DNSSEC validation did not succeed.
  - `;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1`
- `RRSIG Records`: The presence of RRSIG records means that the domain has DNSSEC records configured.
  - `dnssec-failed.org. 300 IN RRSIG A 5 2 300 20240604145115 20240518144615 44973 dnssec-failed.org.`

## 6 What’s the IP address for dnssec-failed.org?

> If we insist on getting the DNS record for a site, even if DNSSec indicates the information cannot be trusted, we can run our query with the CD flag (checking disabled.):

```bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 dnssec-failed.org +cd
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 51857
;; flags: qr rd ra cd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;dnssec-failed.org.  IN A

;; ANSWER SECTION:
dnssec-failed.org. 300 IN A 96.99.227.255

;; Query time: 136 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 11:58:42 CEST 2024
;; MSG SIZE  rcvd: 62
```

96.99.227.255

## DNSSec Resource Records

To validate the authenticity of a set of DNS Resource Records, DNSSec defines four new
record types:
• DNSKEY: keeps the public key to verify RRSIGs
• DS: keeps the digest of a DNSKEY RR
• RRSIG: keeps the digital signature of an RRset (set of Resource Records)
• NSEC: used for authenticated denial existence, meaning to show an RRset is not part
of a signed zone

## DNSSec verifcation

`dig @8.8.8.8 . DNSKEY`

```bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 . . DNSKEY
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 58440
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;.    IN A

;; AUTHORITY SECTION:
.   86399 IN SOA a.root-servers.net. nstld.verisign-grs.com. 2024052200 1800 900 604800 86400

;; Query time: 25 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 12:03:44 CEST 2024
;; MSG SIZE  rcvd: 103

;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31144
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;.    IN DNSKEY

;; ANSWER SECTION:
.   rootkey**
.   rootkey**

;; Query time: 12 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed May 22 12:03:44 CEST 2024
;; MSG SIZE  rcvd: 578
```

To be able to manually verify DNS records, we need to download the root keys to our own machine. Enter:

`dig @8.8.8.8 . DNSKEY | grep -Ev '^($|;)' > root.keys`

Then check if your download was successful:

`cat root.keys`

We can now use dig to verify the validity of a DNS record as follows. There’ll be a lot of
output, so we’ll send it to more to view it page by page.

`dig @8.8.8.8 +sigchase +trusted-key=root.keys hva.nl | more`

## 7 Try this check for one of the sites supporting DNSSec

## 8  Also try to validate a site that does not have DNSSec
