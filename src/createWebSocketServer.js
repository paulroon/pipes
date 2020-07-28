const express = require("express")
const WebSocket = require("ws")
const uuid = require("uuid");
const { initialiseAppPipeState } = require('./actions')
const {
  incomingClientMessageHandler,
  clientDisconnectHandler
} = require("./handlers");
const { sendToClient, broadcast } = require("./util")

module.exports = function CreateWebSocketServer(stateManager, serverListeners, wsConfig) {
  wss = new WebSocket.Server({
      port: wsConfig.socketPort,
      path: wsConfig.socketPath
  })

  const emitAll = (data, exclude) => broadcast(data, wss, exclude);

  // Relay all clients to each other
  wss.on("connection", (ws) => {

    // add base user / identifier
    // this will either be augmented / used by the client app 
    // or replaced by a pre-existing version from local storage
    //
    // @todo - set a keypair and make the id the pubkey [for encrypted messaging]
    ws.user = {
        id: uuid.v4() 
    }

    // Welcome Message Initialise's PipeState in App
    sendToClient(initialiseAppPipeState(stateManager.getState()), ws);

    // Handle incomming messages
    ws.on(
      "message",
      incomingClientMessageHandler(wss, ws, stateManager, serverListeners)
    );

    ws.on("close", () => {
      clientDisconnectHandler(wss, ws, stateManager);
    });
  });

  return {
    publish: emitAll,
    sendToClient,
  };
};