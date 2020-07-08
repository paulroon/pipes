const express = require("express")
const WebSocket = require("ws")
const http = require("http");
const { initialiseAppPipeState } = require('./actions')
const { incomingClientMessageHandler } = require("./handlers")
const { sendToClient, broadcast } = require("./util")

module.exports = function CreateWebSocketServer(stateManager) {
  // Create a WebSocketServer
  const server = http.createServer(express);
  wss = new WebSocket.Server({ server });

  const emitAll = (data, exclude) => broadcast(data, wss, exclude);

  // Relay all clients to each other
  wss.on("connection", function clientConnection(ws) {
    // Welcome Message Initialise's PipeState in App
    sendToClient(initialiseAppPipeState(stateManager.getState()), ws);

    // Handle incomming messages
    ws.on("message", incomingClientMessageHandler(wss, ws, stateManager));

    ws.on("close", function clientDisconnected(data) {
      console.log("Client closed", data);
    });
  });

  return {
    server,
    broadcast: emitAll,
    sendToClient,
  };
};