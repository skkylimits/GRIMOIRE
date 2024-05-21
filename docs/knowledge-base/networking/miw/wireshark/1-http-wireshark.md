# HTTP Wireshark

## 1. Is your browser running HTTP version 1.0, 1.1, or 2?  What version of HTTP is the server running?

```txt
Frame 230: 417 bytes on wire (3336 bits), 417 bytes captured (3336 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.205, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 60171, Dst Port: 80, Seq: 1, Ack: 1, Len: 363
Hypertext Transfer Protocol
    GET /favicon.ico HTTP/1.1\r\n
        [Expert Info (Chat/Sequence): GET /favicon.ico HTTP/1.1\r\n]
            [GET /favicon.ico HTTP/1.1\r\n]
            [Severity level: Chat]
            [Group: Sequence]
        Request Method: GET
        Request URI: /favicon.ico
        Request Version: HTTP/1.1
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: image/avif,image/webp,*/*\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Connection: keep-alive\r\n
    Referer: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file1.html\r\n
    Priority: u=6\r\n
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/favicon.ico]
    [HTTP request 1/1]
    [Response in frame: 304]
```

`GET /favicon.ico HTTP/1.1\r\n`

According to what wireshark is showing me. My browser is running the HTTP 1.1 Version

```txt
Frame 220: 540 bytes on wire (4320 bits), 540 bytes captured (4320 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Intel_50:86:74 (70:9c:d1:50:86:74)
Internet Protocol Version 4, Src: 128.119.245.12, Dst: 192.168.178.205
Transmission Control Protocol, Src Port: 80, Dst Port: 60170, Seq: 1, Ack: 492, Len: 486
Hypertext Transfer Protocol
    HTTP/1.1 200 OK\r\n
        [Expert Info (Chat/Sequence): HTTP/1.1 200 OK\r\n]
            [HTTP/1.1 200 OK\r\n]
            [Severity level: Chat]
            [Group: Sequence]
        Response Version: HTTP/1.1
        Status Code: 200
        [Status Code Description: OK]
        Response Phrase: OK
    Date: Tue, 21 May 2024 20:08:20 GMT\r\n
    Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.4.33 mod_perl/2.0.11 Perl/v5.16.3\r\n
    Last-Modified: Tue, 21 May 2024 05:59:02 GMT\r\n
    ETag: "80-618f083c913aa"\r\n
    Accept-Ranges: bytes\r\n
    Content-Length: 128\r\n
    Keep-Alive: timeout=5, max=100\r\n
    Connection: Keep-Alive\r\n
    Content-Type: text/html; charset=UTF-8\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.112058000 seconds]
    [Request in frame: 215]
    [Request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file1.html]
    File Data: 128 bytes
Line-based text data: text/html (4 lines)

```

`HTTP/1.1 200 OK\r\n`

From what I can see here the server is running HTTP 1.1 aswell.

## 2. What languages (if any) does your browser indicate that it can accept to the server?

`Accept-Language: en-US,en;q=0.5\r\n`

USA English

## 3. What is the IP address of your computer?  What is the IP address of the gaia.cs.umass.edu server?

`Src: 192.168.178.205, Dst: 128.119.245.12`

My IP: 192.168.178.205

Server IP: 128.119.245.12

## 4. What is the status code returned from the server to your browser?

`Status Code: 200`

## 5. When was the HTML file that you are retrieving last modified at the server?

```txt
Frame 215, 545 bytes captured (4360 bits) on interface \Device\NPF_{624B1EB7-6319-43E2-84EA-2051707936CC}, id 0
Ethernet II, Src: Intel_50:86:74 (70:9c:d1:50:86:74), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.205, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 60170, Dst Port: 80, Seq: 1, Ack: 1, Len: 491
Hypertext Transfer Protocol
    GET /wireshark-labs/HTTP-wireshark-file1.html HTTP/1.1\r\n
        [Expert Info (Chat/Sequence): GET /wireshark-labs/HTTP-wireshark-file1.html HTTP/1.1\r\n]
            [GET /wireshark-labs/HTTP-wireshark-file1.html HTTP/1.1\r\n]
            [Severity level: Chat]
            [Group: Sequence]
        Request Method: GET
        Request URI: /wireshark-labs/HTTP-wireshark-file1.html
        Request Version: HTTP/1.1
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Connection: keep-alive\r\n
    Upgrade-Insecure-Requests: 1\r\n
    If-Modified-Since: Mon, 20 May 2024 05:59:01 GMT\r\n
    If-None-Match: "80-618dc65e621e9"\r\n
    Priority: u=1\r\n
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file1.html]
    [HTTP request 1/1]
    [Response in frame: 220]
```

`If-Modified-Since: Mon, 20 May 2024 05:59:01 GMT\r\n`

20.05.2025

## 6. How many bytes of content are being returned to your browser?

`545 bytes on wire (4360 bits)`

545 bytes

## 7. By inspecting the raw data in the packet content window, do you see any headers within the data that are not displayed in the packet-listing window?  If so, name one

I see html data which is not listed in the header but as line-based text:

`
    <html>
    Congratulations.  You've downloaded the file
    http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file1.html!
    </html>
`

## 8. Inspect the contents of the first HTTP GET request from your browser to the server  

Do you see an “IF-MODIFIED-SINCE” line in the HTTP GET?

## 9. Inspect the contents of the server response. Did the server explicitly return the

contents of the file?   How can you tell?

## 10. Now inspect the contents of the second HTTP GET request from your browser to the

server.  Do you see an “IF-MODIFIED-SINCE:” line in the HTTP GET7? If so, what
information follows the “IF-MODIFIED-SINCE:” header?

## 11. What is the HTTP status code and phrase returned from the server in response to this

second HTTP GET?  Did the server explicitly return the contents of the file?
Explain.
