const express = require("express")
const WebSocket = require("ws")
const http = require("http");
const uuid = require("uuid");
const { initialiseAppPipeState } = require('./actions')
const {
  incomingClientMessageHandler,
  clientDisconnectHandler
} = require("./handlers");
const { sendToClient, broadcast } = require("./util")

module.exports = function CreateWebSocketServer(stateManager, serverListeners) {
  // Create a WebSocketServer
  const server = http.createServer(express);
  wss = new WebSocket.Server({ server });

  const emitAll = (data, exclude) => broadcast(data, wss, exclude);

  // Relay all clients to each other
  wss.on("connection", (ws) => {
    // add identifier
    ws.id = uuid.v4();

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
    server,
    publish: emitAll,
    sendToClient,
  };
};