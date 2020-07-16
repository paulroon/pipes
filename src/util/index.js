const WebSocket = require("ws");
const { hasKey, ensureKey } = require('./objectHelpers')

// Utility
//
// - Needed because:
// - some objs are iterable via .forEach but not an array for .map/filter etc. (wss.clients cough!)
const filter = (arr, matcher) => {
  const coll = [];
  arr.forEach((item) => {
    if (matcher(item)) {
      coll.push(item);
    }
  });
  return coll;
};

// Currently connected Clients
const getOpenClients = (wss) => filter(wss.clients, (client) => client.readyState === WebSocket.OPEN)

// Send Data (string or action Object) 
// to a specific client 
const sendToClient = (data, ws) => 
  ws.send(
    (typeof data === 'string') ? data : JSON.stringify(data, null, 2)
  )

// Broadcast a message to all connected clients (observing excluded clients) 
const broadcast = (data, wss, exclude) => {
  if (!exclude) {
    exclude = []
  }
  return filter(
    getOpenClients(wss),
    (client) => !exclude || !exclude.includes(client)
  ).forEach((client) => sendToClient(data, client));
}

module.exports = {
  filter,
  getOpenClients,
  sendToClient,
  broadcast
};