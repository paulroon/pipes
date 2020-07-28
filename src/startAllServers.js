const createWebSocketServer = require("./createWebSocketServer");

module.exports = (apps, stateManager, serverListeners, conf) => {
  const startSocket = !!stateManager

  // Make a Global SocketServer
  if (startSocket) {
    const socketServer = createWebSocketServer(
        stateManager,
        serverListeners,
        conf
    )

    stateManager.setPublisher(socketServer)
    
    apps.forEach((app) => {
      // register the websocket in the app
      if (startSocket) {
        app.registerWss(socketServer.wss)
      }

      // start the server
      app.start();
    });

  } else {
    apps.forEach((app) => app.start());
  }
};