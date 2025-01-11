# exercise 0.5 This sequence diagram illustrates the process that occurs when the browser loads the Single Page Application.

```mermaid

sequenceDiagram
  participant Browser
  participant Server

  activate Browser

  Browser->>Server: GET /exampleapp/spa
  activate Server
  Server-->>Browser: 200 OK + HTML
  deactivate Server

  Browser->>Server: GET /exampleapp/main.css
  activate Server
  Server-->>Browser: 200 OK + CSS file
  deactivate Server

  Browser->>Server: GET /exampleapp/spa.js
  activate Server
  Server-->>Browser: 200 OK + JS file
  deactivate Server

  Note right of Browser: Browser runs the spa.js script

  Browser->>Server: GET /exampleapp/data.json
  activate Server
  Server-->>Browser: 200 OK + JSON data
  deactivate Server

  Note right of Browser: Notes are rendered on the page
  deactivate Browser
