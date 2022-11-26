# How to test - Attack vectors

##  Active Method

### JS

```javascript
"'`
```

Single quote, double quote, backtick... to break out of JS function

### HTML

```html
<img src=x>
```

First test for HTML injection, then expand to XSS

### HTML attribute

```html
'>">'>
```

Single quote, double quote, backtick... to break out of html tag attribute

::: tip
All are simple, if they break the page or insert image, look deeper

Replace the `<img src>` tag with your own tag like `<script>`
:::


## Passive Method

- As soon as you register, enter attack vector into
    - every input field you see
    - Hope XSS pops somewhere down the line
    - Not really the best way to test
    - Can be a little mind-numbing

## Reflected XSS

- Test every entry point
- Submit a random value (ex. Sdfs8f453168)
 -Determine the reflection context
   - JS/HTML/Attribute/...
- Test a payload based on the location the value
 - is reflected in
- Test alternative payloads


## Stored XSS

- Test every location that stores user input
- Investigate the context in which it is rendered
- onto the page
   - JS/HTML/Attribute/...
- Craft an exploit based on context
- Craft an alternative exploit if the first one doesn't work

## DOM XSS
- Testing HTML sinks
    - Place random value into source
        - I.e. random value into location.search
        - https://www.google.com/submit.htmemail=dsf
        - dfssdfsdfsdfsdfsdfsdfds
        - Location.search would
        - return ?email=dsfdfssdfsdfsdfsdfsdfsdfds
    - Inspect the HTML using DEVELOPER TOOLS only
    - View source doesn't take DOM into account
- Look for your random value in the DOM
- If you string appears in the DOM you need to
    - Identify context
    - Craft exploit based on context
      - I.e. if string enters in double qoute, we might break out by using double quote
    - If your data gets URL-encoded before being processed 
      - an XSS attack is unlikely to work.


## Getting around Filters

Many different filters out there
 Blacklist based
   Try fuzzing all possible HTML tags and javascript
   handlers
   Try URL encoding XSS attack vector
   Try double or triple encoding it
   Try putting blacklisted word into other blacklisted
   word as filtering might only happen one time
   leaving our original blacklisted word intact


## Raising our impact

- Steal cookies
    - Very hard recently
    - Http only flag is gaining traction
- Execute a keylogger
    - Getting harder to smuggle out
    -  data
- Steal data from the page
    - Same as keylogger
    - Run a crypto miner
      Execute JS functions on page [anything with js you can do here]
