const createWebSocketServer = require("./createWebSocketServer");

module.exports = (apps, sharedState, conf) => {
  // Make a Global SocketServer
  const { wss: pipesSocketServer, server } = createWebSocketServer(sharedState);

  apps.forEach((app) => {
    // register the websocket in the app
    app.registerWss(pipesSocketServer)

    // start the server
    app.start();
  });

  server.listen(conf.socketPort, () => {
    console.log(`pipesSocketServer: Listening on ${conf.socketPort}`);
  });
};