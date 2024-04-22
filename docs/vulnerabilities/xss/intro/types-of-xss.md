# Types of XSS

## Self XSS

Self XSS is often also used to refer to XSS vulnerabilities that exist in a place where only the attacker themselves is able to trigger them, thus rendering it impossible to affect other users and execute an effective attack.

XSS is present in website but XSS exploit not possible

::: warning
Sometimes it can be elevated
:::

## Reflected XSS

Reflected XSS attacks, also known as non-persistent attacks, occur when a malicious script is reflected off of a web application to the victim's browser.

The script is activated through a link, which sends a request to a website with a vulnerability that enables execution of malicious scripts.

::: details User input gets reflected
- Into an attribute of an html tag
- Into the HTML page
- Into the javascript javascript context
- ..
:::

::: details User input does not get stored into database
- Interactionfull
:::

::: details User input is not properly sanitized
:::

::: details User input can contain javascript code
:::

::: details Can occur with POST calls
- add CSRF to the mix
:::

## Stored XSS

Stored XSS is a type of XSS that stores malicious code on the application server.

::: details User input gets stored in database
:::

::: details Database value gets reflected
- Into the HTML page
- Into HTML tag attribute
- Into the javascript javascript context
- Into javascript context
:::

::: details User input is not properly sanitized
- At input
- And at write to the database
- And at read from the database
:::

::: details User input can contain malicious javascript
- At input
- And at write to the database
- And at read from the database
:::

::: warning Reflected vs Stored
Stored XSS, also known as persistent XSS, is the more damaging of the two. It occurs when a malicious script is injected directly into a vulnerable web application.

Reflected XSS involves the reflecting of a malicious script off of a web application, onto a user's browser.
:::

## DOM based

DOM Based XSS (or as it is called in some texts, “type-0 XSS”) is an XSS attack wherein the attack payload is executed as a result of modifying the DOM “environment” in the victim's browser used by the original client side script, so that the client side code runs in an “unexpected” manner.

```javascript
var search = document.getElementById('search').value;
var result = document.getElementById('results');
results.innerHTML = 'You searched for: ' + search;
```
::: danger Most common sources of XSS
- Arises from window.location
- Usually in query string
- Or fragment position of URL(#)
  - Often reflected xss. Why? If you see that hashtag. That fragment. That basically means that that data never goes onto the server. Data is only read by the browser and never written onto the server. Meaning refelcted xss is now then possible. IF it goes to a dom sink then it now becomes DOM XSS
:::

### Sinks

DOM based cross site scripting occurs when JavaScript code accepts a user’s input (source) and passes that input to another function that displays the results back to the page (sink) in an unsafe manner. Unsafe meaning, there’s no security checks on the input before is displayed back on the screen, more on that later.

The key thing to keep in mind here is that DOM based requests/attacks aren’t persisted or handled by the server but on the user’s browser. Therefore, depending on the functions used in the JavaScript code on the loaded page, a DOM-Based XSS vulnerability could be trivial to discover and exploit.

::: details DOM Sinks
- Don't try to find these manually. Let tools do it for you.
- Where user input enters the DOM
  - Eval()
  - innerHTML
  - ..
:::

## Source based XSS

A source function is any JS property or function that accepts user input from somewhere on the page. An example of a source is the location.search property because it reads input from the query string.

Here are some common sources:

- document.URL
- document.documentURI
- document.URLUnencoded
- document.baseURI
- location.search
- document.cookie
- document.referrer

::: warning DOM vs Source based
**Dom**
    - Everything surrounding your page.
    - Like URL
    - Like History
    - Can only be investigated in the developer console or browser

**Source**
    - Source Code of a website
:::

## Blind XSS

Blind XSS is quite similar to stored Cross-Site Scripting attack where the input provided by the attacker is saved or stored by the web server and this stored input is reflected in various other applications which are linked with each other but you can;t see the result directly.

::: details Blind XSS
- Relies heavily on out of band servers
- Implements the use a payload but no results
- Later we get a call informing payload triggered
- Can be stored and reflected
    - Reflected in case of knowing a page and parameter exist but no acces
:::

## Mutation XSS

Basically we are going to send a broken attack vector and the browser is going to try to repair it. This has been discovered since 2013 and is relatively new.

::: details Relatively new technique
:::

::: details Bypassed DOM
:::

::: details Browser will try to repair out 'broken' payload
:::

::: details Making into a full XSS
:::

::: details  Hence: Mutation, browser mutates payload. Running Directly
:::

## Server Side Template Injection - SSTI XSS

The SSTI can allow you to execute code on the remote server,

## Client Side Template Injection - CSTI XSS

It is like a Server Side Template Injection but in the client. The SSTI can allow you to execute code on the remote server, the CSTI could allow you to execute arbitrary JavaScript code in the victim

::: details Front-end templating engines such as angularJS and vueJS
:::

::: details If used improperly allow for CSTI
:::

::: details Can lead to XSS
:::

::: tip
The way to test for this vulnerability is very similar as in the case of SSTI, the interpreter is going to expect something to execute between doubles keys and will execute it.

For example using something like: {{ 7-7 }} if the server is vulnerable you will see a 0 and if not you will see the original: {{ 7-7 }}
:::
