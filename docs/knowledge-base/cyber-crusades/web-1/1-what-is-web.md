# What Is Web

## Introduction to Web Components

Welcome and course objectives.

Importance of understanding web components for development and security.

## [HTML](https://web.dev/learn/html/welcome): The Structure

Overview of HTML as the backbone of web content. 

HTML uses tags to denote document headings, paragraphs, links, and other content elements.

It provides the basic structure of sites, which  is enhanced and modified by other technologies like CSS and JavaScript

```html
<!-- Structuring a document with sections, headers, paragraphs and divs. --> 
<div>Hello, Universe!</div>
```

## [CSS](https://web.dev/learn/css): Styling the Web

Understanding how CSS beautifies the web.

If HTML is the skeleton, CSS is the skin and clothes. CSS is used to control the visual 
appearance of web pages

CSS selects HTML elements and defines their presentation through styling properties.

```css
body { background-color: red; } /** Changing the color of a text. **/
```

## [JavaScript](https://fireship.io/courses/js/): Bringing Interactivity

JavaScript acts as the muscles, enabling websites to move and respond to user input.

Simple scripts to enhance user engagement. [Allows for implementing complex features]

```js
// Adding a console message a message between the "".
console.log("Hello, world!");
```

## [Content](https://content.nuxt.com/): The Core of Engagement

Importance of quality content on user experience.

Types of content: text, images, videos, and more.

## [Backend Technologies](https://nuxt.com/): The Server-Side

Introduction to server, databases, and server-side scripting.

How data is processed on the web.

## [HTTP/HTTPS Protocols](https://www.cloudflare.com/learning/ssl/what-is-https/): Web Communication

Understanding the protocols that power the web.

Security implications of HTTP and HTTPS.


### HTTP Requests and Responses

Understanding HTTP requests and responses is essential for web development and cybersecurity. They are fundamental to web communication between browsers and servers.

### HTTP Request

When you request a resource (e.g., by typing a URL or clicking a link), your browser sends an HTTP request to the server.

This request communicates your desire to perform an action or to retrieve data.


**Components:**
1. **Method:** Action to perform (e.g., GET, POST, PUT, DELETE).
2. **URL/URI:** Location of the resource.
3. **HTTP Version:** Version of HTTP used (e.g., HTTP/1.1).
4. **Headers:** Metadata about the request (e.g., `User-Agent`).
5. **Body:** Optional data sent to the server (e.g., form data).

### HTTP Response

The server responds to your request with an HTTP response, indicating the result or delivering the requested resource.

**Components:**
1. **Status Code:** Outcome of the request (e.g., 200 OK, 404 Not Found).
2. **HTTP Version:** Version of HTTP used.
3. **Headers:** Metadata about the response (e.g., `Content-Type`).
4. **Body:** Optional data (e.g., HTML, images, JSON).

### Understanding Headers in Web Communications

Headers are crucial components in HTTP requests and responses. They carry metadata about the interaction between a web browser (client) and a server. For web developers and ethical hackers, understanding headers is essential as they can reveal server configurations, dictate content handling, and highlight potential security vulnerabilities.

### Types of Headers

**1. Request Headers**

Request headers are sent from the client (typically a web browser) to the server, containing information about the client's request and the client's environment.

- **User-Agent**: This header provides information about the client software, including the browser type and version, and the operating system. This information can help the server tailor responses. 

- **Accept**: This header tells the server the types of content the client can process. It helps the server determine the best format for the response. 

- **Cookie**: This header sends cookies stored on the client to the server. Cookies often contain session data or other information that personalizes the user's experience. 
  ```
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8
  Cookie: sessionId=abc123; theme=light; username=johndoe
  ```

**2. Response Headers**

Response headers are sent from the server back to the client, providing information about the server and the content being delivered.

- **Server**: This header reveals information about the server software being used. While useful for debugging, it's often minimized for security reasons to prevent revealing too much about the server's environment.

- **Set-Cookie**: This header instructs the client to store a cookie. It is commonly used to manage session state or store user preferences.
  
- **Content-Type**: This header specifies the MIME type of the response content, informing the client how to process the incoming data. 
  ```
  Server: Apache/2.4.41 (Ubuntu)
  Set-Cookie: sessionId=xyz456; Expires=Wed, 09 Aug 2023 23:59:59 GMT; Path=/; Secure; HttpOnly
  Content-Type: application/json
  ```

**3. Security and Vulnerability Considerations**

Ethical hackers pay close attention to headers because they can reveal security configurations and potential vulnerabilities:

- **Security Headers**: These response headers are designed to enhance the security of a website. Examples include:
  - **Content-Security-Policy (CSP)**: Helps prevent cross-site scripting (XSS) attacks by specifying which resources can be loaded and executed.
  - **Strict-Transport-Security (HSTS)**: Enforces the use of HTTPS, ensuring secure communications by directing browsers to use secure connections only.

  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```

- **Information Leakage**: Headers like `Server` and `X-Powered-By` can inadvertently disclose information about the server software, including specific versions. This information can be useful to hackers if it reveals known vulnerabilities.
  ```
  Server: Apache/2.4.41 (Ubuntu)
  X-Powered-By: PHP/7.4.3
  ```

- **Misconfigurations**: Improperly configured headers can expose a website to attacks. For instance, missing `Content-Security-Policy` headers can leave a site vulnerable to script injection attacks, while improper use of `Access-Control-Allow-Origin` can lead to cross-origin resource sharing (CORS) vulnerabilities.

These headers facilitate communication between the client and server, ensuring that both sides understand the type of data being exchanged and how it should be handled.

Proper configuration and understanding of these headers are crucial for maintaining web security, as they can significantly reduce the risk of attacks and data breaches.

## [Cookies: Key Concepts](https://knowcookies.com/)

Cookie Domain Scope Flags and Priority in Bug Bounty

|  **Attribute** | **Description**                                                | **Example**                                 |
|----------------|----------------------------------------------------------------|---------------------------------------------|
| **Name**       | The name of the cookie.                                        | `sessionId`                                 |
| **Value**      | The data stored in the cookie.                                 | `abc123`                                    |
| **Domain**     | Specifies the domain for which the cookie is valid.            | `.example.com`                              |
| **Path**       | Specifies the URL path for which the cookie is valid.          | `/account/`                                 |
| **Expires**    | The date and time when the cookie will expire.                 | `Wed, 09 Aug 2024 23:59:59 GMT`             |
| **Max-Age**    | The maximum age of the cookie in seconds.                      | `3600` (1 hour)                             |
| **Secure**     | Indicates that the cookie should only be sent over HTTPS.      | `Secure`                                    |
| **HttpOnly**   | Restricts the cookie to be accessed only by the server.        | `HttpOnly`                                  |
| **SameSite**   | Controls whether the cookie is sent with cross-site requests.  | `SameSite=Strict`                           |
| **Size**       | The size of the cookie.                                        | (Typically around 4 KB)                     |

**Example:**
```html
Set-Cookie: sessionId=abc123; Domain=.example.com; Path=/; Expires=Wed, 09 Aug 2024 23:59:59 GMT; Max-Age=3600; Secure; HttpOnly; SameSite=Strict
```

**Cross-Domain Cookie Validity**

- **Cookie Domain Scope:** Cookies can be set with a domain attribute specifying which domains can access them. For instance, a cookie set for `www.google.co` might also be valid for `accounts.google.com` if the domain attribute is set to `.google.com`.

- **Shared Cookies Across Subdomains:** If an attacker steals a cookie from one subdomain (`www.google.co`), and that cookie is also valid for other subdomains (`accounts.google.com`), it poses a significant security risk. This is because the stolen cookie can potentially be used to gain unauthorized access to those other subdomains.

**Cookie Priority**

- **Top-Level Domain Priority:** Cookies set for the top-level domain (e.g., `.google.com`) typically have a broader scope and can be accessed by all subdomains under that domain. Conversely, cookies set for a specific subdomain (e.g., `www.google.co`) are only accessible to that subdomain and potentially its subdomains if configured that way.

- **Implication for Bug Bounties:** In a bug bounty context, understanding that cookies from the top-level domain (`.google.com`) can override or be accessible across subdomains is crucial. If an attacker steals a cookie from a subdomain with a broader domain scope, they might be able to exploit this to access other subdomains.

**Security Implications**

- **Session Hijacking:** A stolen cookie from a subdomain with broad domain scope can be used to hijack sessions on other subdomains. This can lead to unauthorized access and potential account compromise.

- **Data Theft:** If the cookie grants access to sensitive areas, such as `accounts.google.com`, attackers can exploit this to steal personal data or perform actions on behalf of the user.

- **Privilege Escalation:** Attackers might exploit cookies from the top-level domain to access services or perform actions that require higher privileges, leading to more severe security breaches.

**Mitigation Strategies**

- **Secure Cookies:** Use the `Secure` flag to ensure cookies are only sent over HTTPS, and the `HttpOnly` flag to prevent JavaScript access to cookies.

- **SameSite Attribute:** Implement the `SameSite` attribute to control cookie transmission with cross-site requests, mitigating CSRF attacks.

- **Domain Restrictions:** Carefully configure the domain attribute of cookies to limit their accessibility to specific subdomains where necessary.

Understanding cookie domain scope and priority is essential for identifying and mitigating vulnerabilities in bug bounty programs. Ensuring proper cookie management helps in safeguarding against unauthorized access and cross-domain attacks.

## [URLs and Their Structure](https://medium.com/@hemant.ramphul/the-stucture-of-an-url-c59a6ccf7184)

Dissecting the parts of a URL.

How URLs direct traffic on the web.

### The Components of a URL

A URL (Uniform Resource Locator) consists of several components that work together to locate and access resources on the web. Here’s a breakdown of each component:

1. **Scheme/Protocol**  
   Indicates the protocol the browser must use to request the resource. Common protocols include:
   - **http**: Hypertext Transfer Protocol
   - **https**: Hypertext Transfer Protocol Secure
   - **ftp**: File Transfer Protocol
   - **mailto**: Email

   **Example:**  
   `https://`

2. **Subdomain**  
   Optional component that serves as a specific or separate part of a larger domain, helping to organize or navigate different sections of a website.

   **Example:**  
   `www.`

3. **Domain Name**  
   The human-readable address of the website, which maps to the IP address of the server hosting the website.

   **Example:**  
   `example.com`

4. **Port**  
   Optional component that specifies the gateway through which the server can be accessed. If not included, the browser uses the default port for the specified protocol.

   **Example:**  
   `443` (for HTTPS)  
   `8080` (commonly used for HTTP)

5. **Path**  
   Specifies the exact location of a resource, document, or page within a website.

   **Example:**  
   `/labs/xss/index.html`

6. **Query**  
   Optional component that starts with a `?`. It includes parameters that might be required to fetch or interact with the resource.

   Sometimes you see `/labs/xss/1/`. The /1/ is the output of the query! Some think that /1/ is an actual folder while in fact it is not.

   **Example:**  
   `?search=query`

7. **Fragment**  
   Optional component that starts with a `#`. It refers to a specific part of a resource, like an anchor point within an HTML page.

   **Example:**  
   `#section`

### Full URL Example

Here’s how all these components come together in a complete URL:

```
https://www.example.com:8080/directory/page.html?search=query#section
```

- **Scheme/Protocol:** `https://`
- **Subdomain:** `www.`
- **Domain Name:** `example.com`
- **Port:** `8080`
- **Path:** `/directory/page.html`
- **Query:** `?search=query`
- **Fragment:** `#section`

### URL Parameters

URL parameters are key-value pairs added to a URL to pass additional data. They start after a question mark (`?`) and are separated by ampersands (`&`).

**Structure & Usage**

- **Start:** Parameters begin after the URL path with a `?`.
- **Key-Value Pairs:** Each parameter is a key-value pair, separated by `=` (e.g., `key=value`).
- **Multiple Parameters:** Separated by `&` (e.g., `key1=value1&key2=value2`).
- **Encoding:** Special characters must be encoded (e.g., spaces as `+` or `%20`).

**Example:**  
`https://www.example.com/search?query=ethical+hacking&results=10`  
- **query:** `ethical hacking`
- **results:** `10`

**Applications**

- **Data Filtering:** Refine search results or listings.
- **Tracking & Analytics:** Monitor traffic sources or user behavior.
- **Configuration:** Adjust settings like language preferences.
- **Session Management:** Manage user sessions (less common due to security risks).

### Security Considerations for URL Components

- **Fragments**: Handled only by the browser and not sent to the server. They can be exploited in client-side attacks, such as DOM-based XSS, if the browser's JavaScript processes them unsafely.

  **Example:**  
  `https://example.com/page#<script>alert('xss')</script>`

- **Query Parameters**: Processed by the server, which can be vulnerable to attacks like SQL injection or XSS if input is not properly sanitized.

  **Example:**  
  `https://example.com/search?query=<script>alert('xss')</script>`


::: details Exercises
1. URL Dissection: Find a complex URL (including a query and a fragment). Break it down into its 
components and explain the purpose of each component.

2. URL Construction: Given a set of components (protocol, domain, path, query parameters, 
fragment), construct a full URL. For example, create a URL that searches for "ethical hacking" on 
a search engine of your choice.

3. Identifying URL Parts: Provide a list of URLs to the students. Ask them to identify and label each 
part of the URL, emphasizing the significance of the protocol, domain, path, query, and fragment.

4. URL Modification: Using a web browser, visit a website that includes query parameters in the 
URL. Modify the query parameters to see how the content or displayed information changes. 
This helps in understanding how web applications use URLs to fetch and display data.
:::

## [APIs](https://www.ibm.com/topics/api): Connecting Services

Role of APIs in modern web services.

Examples of common APIs used in web development.

## [Browser Tools](https://developer.chrome.com/docs/devtools/overview)


| **Tool**         | **Purpose**                               | **Features**                                                      |
|------------------|-------------------------------------------|-------------------------------------------------------------------|
| **Sources**      | View and debug source code                | - File Navigator: Browse HTML, CSS, JavaScript files<br>- Debugger: Set breakpoints, step through code, inspect variables<br>- Local Overrides: Modify and test code directly |
| **Network**      | Monitor and analyze network requests      | - Request Logs: Details of HTTP/HTTPS requests and responses<br>- Performance: Analyze request timings<br>- Content: Inspect and modify request and response payloads |
| **Applications** | Manage and inspect web application data   | - Cookies: View, edit, and delete cookies<br>- Local Storage: Inspect data in local storage<br>- IndexedDB: Manage and explore IndexedDB data<br>- Service Workers: Monitor and debug service workers and cache storage |
| **Performance**  | Analyze and optimize page performance     | - Timeline: Record and review page load times, scripting, rendering<br>- Memory: Profile and manage memory usage, detect leaks |
| **Security**     | Inspect and manage security aspects       | - Certificates: View and inspect SSL/TLS certificates<br>- Security Issues: Identify potential security issues like mixed content warnings<br>- Replay: Record and replay security bugs to analyze behavior and verify fixes |
| **Console**      | Interact with and debug JavaScript        | - Log Messages: View console logs, warnings, errors<br>- Interactive Command Line: Execute JavaScript commands directly |

## Web Security Basics

Introduction to securing web applications.

Common vulnerabilities and preventive strategies.

## Exercise and Case Study

Practical exercises on identifying components on real websites.

Case study discussion on web architecture.

::: details Exercise 1
1. Language Identification: Create a simple web page that includes HTML tags, styles it with 
CSS, and includes a small JavaScript function (e.g., to show today’s date). Then, ask 
students to identify and separate the HTML, CSS, and JavaScript parts into different files.
:::

::: details Exercise 2
2. Functionality Identification: Provide students with a complex web page that includes 
interactive elements, styled components, and structured content. Ask them to identify 
specific functionalities, such as which parts are likely controlled by JavaScript, which 
styles are applied with CSS, and how the content is structured using HTML.
:::

## Q&A and Wrap-Up

Open session for questions.

Summary and closing remarks.

## Exercises



