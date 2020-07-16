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
    console.log(`Hello Recieved from [${client.id}]`);

    // let the client know its Id
    sendToClient(createWelcomeMessage(client.id), client);

    // register _generic namespace
    // TODO - just store this in the stateManager as 'this.clients'
    const currentState = stateManager.getState();
    stateManager.update({
      _generic: {
        ...currentState._generic,
        [client.id]: {
          connectedAt: new Date(),
        },
      },
    });
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