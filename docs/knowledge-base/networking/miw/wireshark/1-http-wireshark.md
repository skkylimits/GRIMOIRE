# HTTP Wireshark

## 01. The Basic HTTP GET/response interaction

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

## 02. The HTTP CONDITIONAL GET/response interaction

## 8. Inspect the contents of the first HTTP GET request from your browser to the server. Do you see an “IF-MODIFIED-SINCE” line in the HTTP GET?

```txt
Frame 30: 464 bytes on wire (3712 bits), 464 bytes captured (3712 bits) on interface en0, id 0
Ethernet II, Src: Apple_df:a3:03 (b4:fa:48:df:a3:03), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.98, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 59677, Dst Port: 80, Seq: 1, Ack: 1, Len: 410
Hypertext Transfer Protocol
    GET /wireshark-labs/HTTP-wireshark-file2.html HTTP/1.1\r\n
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Connection: keep-alive\r\n
    Upgrade-Insecure-Requests: 1\r\n
    Priority: u=1\r\n
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file2.html]
    [HTTP request 1/1]
    [Response in frame: 34]
```

No.

## 9. Inspect the contents of the server response. Did the server explicitly return the contents of the file? How can you tell?

```txt
Frame 34: 784 bytes on wire (6272 bits), 784 bytes captured (6272 bits) on interface en0, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Apple_df:a3:03 (b4:fa:48:df:a3:03)
Internet Protocol Version 4, Src: 128.119.245.12, Dst: 192.168.178.98
Transmission Control Protocol, Src Port: 80, Dst Port: 59677, Seq: 1, Ack: 411, Len: 730
Hypertext Transfer Protocol
    HTTP/1.1 200 OK\r\n
    Date: Tue, 21 May 2024 21:15:43 GMT\r\n
    Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.4.33 mod_perl/2.0.11 Perl/v5.16.3\r\n
    Last-Modified: Tue, 21 May 2024 05:59:02 GMT\r\n
    ETag: "173-618f083c90bda"\r\n
    Accept-Ranges: bytes\r\n
    Content-Length: 371\r\n
    Keep-Alive: timeout=5, max=100\r\n
    Connection: Keep-Alive\r\n
    Content-Type: text/html; charset=UTF-8\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.109201000 seconds]
    [Request in frame: 30]
    [Request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file2.html]
    File Data: 371 bytes
Line-based text data: text/html (10 lines)
    \n
    <html>\n
    \n
    Congratulations again!  Now you've downloaded the file lab2-2.html. <br>\n
    This file's last modification date will not change.  <p>\n
    Thus  if you download this multiple times on your browser, a complete copy <br>\n
    will only be sent once by the server due to the inclusion of the IN-MODIFIED-SINCE<br>\n
    field in your browser's HTTP GET request to the server.\n
    \n
    </html>\n
```

It does. Under the Line-based text data.

## 10. Now inspect the contents of the second HTTP GET request from your browser to the server. Do you see an “IF-MODIFIED-SINCE:” line in the HTTP GET7? If so, what information follows the “IF-MODIFIED-SINCE:” header?

```txt
Frame 109: 550 bytes on wire (4400 bits), 550 bytes captured (4400 bits) on interface en0, id 0
Ethernet II, Src: Apple_df:a3:03 (b4:fa:48:df:a3:03), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.98, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 59680, Dst Port: 80, Seq: 1, Ack: 1, Len: 496
Hypertext Transfer Protocol
    GET /wireshark-labs/HTTP-wireshark-file2.html HTTP/1.1\r\n
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Connection: keep-alive\r\n
    Upgrade-Insecure-Requests: 1\r\n
    If-Modified-Since: Tue, 21 May 2024 05:59:02 GMT\r\n
    If-None-Match: "173-618f083c90bda"\r\n
    Priority: u=1\r\n
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file2.html]
    [HTTP request 1/1]
    [Response in frame: 117]

```

`If-Modified-Since: Tue, 21 May 2024 05:59:02 GMT\r\n`

Tue, 21 May 2024 05:59:02 GMT\r\n

## 11. What is the HTTP status code and phrase returned from the server in response to this second HTTP GET?  Did the server explicitly return the contents of the file? Explain

```txt
Frame 117: 294 bytes on wire (2352 bits), 294 bytes captured (2352 bits) on interface en0, id 0
Ethernet II, Src: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb), Dst: Apple_df:a3:03 (b4:fa:48:df:a3:03)
Internet Protocol Version 4, Src: 128.119.245.12, Dst: 192.168.178.98
Transmission Control Protocol, Src Port: 80, Dst Port: 59680, Seq: 1, Ack: 497, Len: 240
Hypertext Transfer Protocol
    HTTP/1.1 304 Not Modified\r\n
    Date: Tue, 21 May 2024 21:15:51 GMT\r\n
    Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.4.33 mod_perl/2.0.11 Perl/v5.16.3\r\n
    Connection: Keep-Alive\r\n
    Keep-Alive: timeout=5, max=100\r\n
    ETag: "173-618f083c90bda"\r\n
    \r\n
    [HTTP response 1/1]
    [Time since request: 0.112736000 seconds]
    [Request in frame: 109]
    [Request URI: http://gaia.cs.umass.edu/wireshark-labs/HTTP-wireshark-file2.html]
```

It returned a `HTTP/1.1 304 Not Modified\r\n`

In HTTP, a 304 status code means "Not Modified."

It indicates that the requested resource has not changed since the last time the client accessed it, allowing the client to use its cached version.

This helps reduce bandwidth and speed up page loading by avoiding unnecessary data transfer.

## 03 Retrieving Long Documents

## 12. How many HTTP GET request messages did your browser send?  Which packet number in the trace contains the GET message for the Bill or Rights?

My browser send 2 HTTP GET request:

`173 14.724806 192.168.178.98 128.119.245.12 HTTP 464 GET /wireshark-labs/HTTP-wireshark-file3.html HTTP/1.1`

`183 14.861617 192.168.178.98 128.119.245.12 HTTP 421 GET /favicon.ico HTTP/1.1`

Packet number 180 contained the message for the Bill or Rights:

`180 14.830551 128.119.245.12 192.168.178.98 HTTP 535 HTTP/1.1 200 OK  (text/html)`

## 13. Which packet number in the trace contains the status code and phrase associated with the response to the HTTP GET request?

Packet number 180

`180 14.830551 128.119.245.12 192.168.178.98 HTTP 535 HTTP/1.1 200 OK  (text/html)`

## 14. What is the status code and phrase in the response?

With the 200 OK repsonse.

`180 14.830551 128.119.245.12 192.168.178.98 HTTP 535 HTTP/1.1 200 OK  (text/html)`

## 15. How many data-containing TCP segments were needed to carry the single HTTP response and the text of the Bill of Rights?

4 reassambled TCP segments where needed to carry the singly HTTP response and the text of the Bill of Rights.

```txt
[4 Reassembled TCP Segments (4861 bytes): #177(1460), #178(1460), #179(1460), #180(481)]
    [Frame: 177, payload: 0-1459 (1460 bytes)]
    [Frame: 178, payload: 1460-2919 (1460 bytes)]
    [Frame: 179, payload: 2920-4379 (1460 bytes)]
    [Frame: 180, payload: 4380-4860 (481 bytes)]
    [Segment count: 4]
    [Reassembled TCP length: 4861]
    [Reassembled TCP Data [truncated]: 485454502f312e3120323030204f4b0d0a446174653a205475652c203231204d617920323032342032313a35323a323520474d540d0a5365727665723a204170616368652f322e342e36202843656e744f5329204f70656e53534c2f312e302e326b2d6669707]
Hypertext Transfer Protocol
```

## 04 HTTP Authentication

## 16. How many HTTP GET request messages did your browser send? To which Internet addresses were these GET requests sent?

4 request got send in total.

The first one was send to the webserver itself to get the html file `128.119.245.12`

`24 4.810564 192.168.178.98 128.119.245.12 HTTP 464 GET /wireshark-labs/HTTP-wireshark-file4.html HTTP/1.1`

The second one to `128.119.245.12` to retrieve the peason.png logo

`30 4.956728 192.168.178.98 128.119.245.12 HTTP 421 GET /pearson.png HTTP/1.1`

The third one to `178.79.137.164` to retrieve 8E_cover_small.jpg

`47 5.072184 192.168.178.98 178.79.137.164 HTTP 400 GET /8E_cover_small.jpg HTTP/1.1`

And lastly one for the favicon to  the webserver itself located at `128.119.245.12`

`64 5.213073 192.168.178.98 128.119.245.12 HTTP 421 GET /favicon.ico HTTP/1.1`

## 17. Can you tell whether your browser downloaded the two images serially, or whether they were downloaded from the two web sites in parallel?  Explain

The two images and even the favicon where downloaded in parallel. This is because all the images have the exact same date:

`Date: Tue, 21 May 2024 22:05:09 GMT\r\n`

In the header

## 05 HTTP Authentication

## 18. What is the server’s response (status code and phrase) in response to the initial HTTP GET message from your browser?

It's giving 401 Unauthorized.

`51 3.925513 128.119.245.12 192.168.178.98 HTTP 771 HTTP/1.1 401 Unauthorized  (text/html)`

## 19. When your browser’s sends the HTTP GET message for the second time, what new field is included in the HTTP GET message?

The new field is Authorization.

```txt
Frame 214: 539 bytes on wire (4312 bits), 539 bytes captured (4312 bits) on interface en0, id 0
Ethernet II, Src: Apple_df:a3:03 (b4:fa:48:df:a3:03), Dst: SagemcomBroa_f4:b9:eb (b0:5b:99:f4:b9:eb)
Internet Protocol Version 4, Src: 192.168.178.98, Dst: 128.119.245.12
Transmission Control Protocol, Src Port: 59820, Dst Port: 80, Seq: 1, Ack: 1, Len: 485
Hypertext Transfer Protocol
    GET /wireshark-labs/protected_pages/HTTP-wireshark-file5.html HTTP/1.1\r\n
    Host: gaia.cs.umass.edu\r\n
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\r\n
    Accept-Language: en-US,en;q=0.5\r\n
    Accept-Encoding: gzip, deflate\r\n
    Connection: keep-alive\r\n
    Upgrade-Insecure-Requests: 1\r\n
    Priority: u=1\r\n
    Authorization: Basic d2lyZXNoYXJrLXN0dWRlbnRzOm5ldHdvcms=\r\n
        Credentials: wireshark-students:network
    \r\n
    [Full request URI: http://gaia.cs.umass.edu/wireshark-labs/protected_pages/HTTP-wireshark-file5.html]
    [HTTP request 1/2]
    [Response in frame: 217]
    [Next request in frame: 219]

```

`Authorization: Basic d2lyZXNoYXJrLXN0dWRlbnRzOm5ldHdvcms=\r\n`
        `Credentials: wireshark-students:network`

We now have the username:password. Yoohoooeew.
