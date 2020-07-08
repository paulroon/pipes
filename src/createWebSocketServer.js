const express = require("express")
const WebSocket = require("ws");
const http = require("http");
const dispatch = require("./dispatch");
const { initialiseAppPipeState } = require('./actions')
const { filter } = require('./util')

// Currently connected Clients
const getOpenClients = (wss) => filter(wss.clients, (client) => client.readyState === WebSocket.OPEN)

// Send Data (string or action Object) 
// to a specific client 
const sendToClient = (data, ws) => 
  ws.send(
    (typeof data === 'string') ? data : JSON.stringify(data, null, 2)
  )

// Broadcast a message to all connected clients (observing excluded clients) 
const broadcast = (data, wss, exclude) =>
  filter(
    getOpenClients(wss),
    (client) => !exclude || !exclude.includes(client)
  ).forEach((client) => sendToClient(data, client));

module.exports = function CreateWebSocketServer(sharedState) {
  // Create a WebSocketServer
  const server = http.createServer(express);
  this.wss = new WebSocket.Server({ server });

  const incomingClientMessageHandler = (ws) => (messsage) => {
    // dispatch to main hendlers
    const action = JSON.parse(messsage);
    if (Object.hasOwnProperty.call(action, "type")) {
      dispatch(action);
    }

    // Broadcast original to every open client except sender
    broadcast(messsage, wss, [ws]);
  };

  // Relay all clients to each other
  this.wss.on("connection", function clientConnection(ws) {
    console.log("Client Connected");

    // Welcome Message Initialise's PipeState in App
    sendToClient(initialiseAppPipeState(sharedState), ws);

    ws.on("message", incomingClientMessageHandler(ws));

    ws.on("close", function clientDisconnected(data) {
      console.log("Client closed", data);
    });
  });

  return {
    server,
  };
};