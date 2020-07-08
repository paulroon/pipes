const createWebSocketServer = require("./createWebSocketServer");

module.exports = (apps, stateManager, conf) => {
  // Make a Global SocketServer
  const socketServer = createWebSocketServer(
    stateManager
  );
  const { wss: pipesSocketServer, server } = socketServer;

  stateManager.setSocketServer(socketServer);

  apps.forEach((app) => {
    // register the websocket in the app
    app.registerWss(pipesSocketServer);

    // start the server
    app.start();
  });

  server.listen(conf.socketPort, () => {
    console.log(`pipesSocketServer: Listening on ${conf.socketPort}`);
  });
};