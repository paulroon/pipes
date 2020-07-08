const handle = require("../handle");
const { broadcast } = require("../util");

const incomingClientMessageHandler = (wss, client, stateManager) => messsage => {
  // dispatch to main handle
  const action = JSON.parse(messsage);
  if (Object.hasOwnProperty.call(action, "type")) {
    // pipes is now in change of this event

    // run middleware on event (registered as part of pipe setup)

    // run event handlers (registered as part of pipe setup)
    // perform any state changes

    handle(action, stateManager);
  }

  // Broadcast original to every open client
  // broadcast(messsage, wss, []);
};

module.exports = incomingClientMessageHandler