const express = require("express")
const Application = require("./application")

const createServer = (config) => {
  const conf = {
    port: 9000,
    name: 'Server',
    configure: (server) => {},
    ...config,
  };
  
  const appId = "_" + Math.random().toString(36).substr(2, 9)
  const server = express();

  conf.configure(server);

  const startup = (s) => s.listen(conf.port, () => {
      console.log(`${conf.name} is listening on port:${conf.port}`);
      console.log(`- http://localhost:${conf.port}`);
    });


  return new Application(appId, server, startup, conf);
};

module.exports = createServer;