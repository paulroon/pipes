# Pipes 

## Whats this then?

Pipes is an express wrapper for nodejs that enables multiple web-servers and multiple client side apps to share a common state with automated real-time updates 

Client applications that wish to utilise pipes will need to either follow the [TBD pipes-fe-socket-protocol] or implement [@happycoder/react-pipes the front end Library] library

## Installation

```$> bash npm install @happycode/pipes ```

## Usage


### [minimal example]

The following will 
```javascript
const Pipes = require("pipes");
const pipe = Pipes();

pipe.client("/path/to/public", {
  port: 4000,
});

pipe.useContext({ counter: 0 });
pipe.start();
```