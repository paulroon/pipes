const express = require("express")
const WebSocket = require("ws")
const http = require("http");
const { initialiseAppPipeState } = require('./actions')
const { incomingClientMessageHandler } = require("./handlers")
const { sendToClient } = require("./util")

module.exports = function CreateWebSocketServer(sharedState) {
  // Create a WebSocketServer
  const server = http.createServer(express);
  wss = new WebSocket.Server({ server });



  // Relay all clients to each other
  wss.on("connection", function clientConnection(ws) {
    // Welcome Message Initialise's PipeState in App
    sendToClient(initialiseAppPipeState(sharedState), ws);

    // Handle incomming messages
    ws.on("message", incomingClientMessageHandler(wss, ws));

    ws.on("close", function clientDisconnected(data) {
      console.log("Client closed", data);
    });
  });

  return { server };
};