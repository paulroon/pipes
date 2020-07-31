const handle = require("../handle");
const { TYPE_CLIENT_ACTION, HELLO, WELCOME } = require("../constants");
const { createWelcomeMessage } = require("../actions");
const { sendToClient } = require("../util");

const isIncomingMessageValid = (mssg) => mssg.type === TYPE_CLIENT_ACTION;
const isClientHandshake = (mssg) => mssg.type === HELLO;

const incomingClientMessageHandler = (
  wss,
  client,
  stateManager,
  serverListeners
) => (messsage) => {
  // dispatch to main handle
  const mssg = JSON.parse(messsage);

  if (isClientHandshake(mssg)) {

    if (mssg.payload.user) {
      client.user = mssg.payload.user
    }
    console.log(`Hello Recieved from [${client.user.id}]`)

    stateManager.addClient(client.user.id)
    
    // let the client know its Id
    sendToClient(createWelcomeMessage(client.user), client)

    return;
  }

  if (!isIncomingMessageValid(mssg)) {
    return;
  }

  // run event handlers (registered as part of pipe setup)
  // perform any state changes
  handle(wss, mssg.event, stateManager, client, serverListeners);
};

module.exports = incomingClientMessageHandler