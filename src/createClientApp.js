const express = require("express")
const Application = require('./application')

const createClientApp = (config) => {
  const conf = {
    port: 3000,
    name: "Client App",
    isSPA: true, // Single Page Apps only require a root route
    ...config
  };

  const appId = "_" + Math.random().toString(36).substr(2, 9);
  const server = express()
  
  server.use(express.static(conf.path))

  server.use(function(req, res, next){
    console.log(`New client [${appId}] request received at ${Date.now()}`);
    next();
  });

  if (conf.isSPA) {
      server.get("/*", (req, res) => {
          res.redirect("/")
      })
  }

  const startup = (s) => s.listen(conf.port, () => {
      console.log(`[${conf.name}] is listening on port:${conf.port}`);
      console.log(`- http://localhost:${conf.port}`)
    })


  return new Application(appId, server, startup, conf);
};

module.exports = createClientApp
