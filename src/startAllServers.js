const createWebSocketServer = require("./createWebSocketServer");

module.exports = (apps, stateManager, serverListeners, conf) => {
  const startSocket = !!stateManager

  // Make a Global SocketServer
  if (startSocket) {
    const socketServer = createWebSocketServer(stateManager, serverListeners);
    const { wss: pipesSocketServer, server } = socketServer

    stateManager.setPublisher(socketServer)
    
    apps.forEach((app) => {
      // register the websocket in the app
      if (startSocket) {
        app.registerWss(pipesSocketServer);
      }

      // start the server
      app.start();
    });

    server.listen(conf.socketPort, () => {
      console.log(`pipesSocketServer: Listening on ${conf.socketPort}`);
    });

  } else {
    apps.forEach((app) => app.start());
  }
};