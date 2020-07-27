const { PIPE_MODIFY, wrapPeerEvent } = require("./actions");
const { ensureKey } = require("./util/objectHelpers");
const { broadcast } = require("./util");

const handle = (wss, action, stateManager, client, customListeners) => {
  const currentState = stateManager.getState()
  const hasCustomListeners = Object.keys(customListeners).includes(action.type);

  // Peer Forwarding
  // by default always forward custom events to peers
  // - and custom handler returning 'false' will prevent this
  let forwardToPeers = true 
  
  // run listeners
  if (hasCustomListeners) {
    customListeners[action.type].forEach((handler) => {
      forwardToPeers = (handler(client, action.payload) !== false) && forwardToPeers
    });
  }
  if (forwardToPeers) {
    broadcast(wrapPeerEvent(client.user.id, action), wss, [client]);
  }

  // Handle Known (Internal Events)
  switch (action.type) {
    case PIPE_MODIFY:
      stateManager.update({
        [action.payload.target]: action.payload.value,
      });
      break;
    default:
  }
};

module.exports = handle;
