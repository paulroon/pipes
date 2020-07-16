const { PIPE_MODIFY, PIPE_MODIFY_CLIENT, wrapPeerEvent } = require("./actions");
const { ensureKey } = require("./util/objectHelpers");
const { broadcast } = require("./util");

const handle = (wss, action, stateManager, client, customListeners) => {
  const currentState = stateManager.getState()
  const hasCustomListeners = Object.keys(customListeners).includes(action.type);

  // Peer Forwarding
  // by default always forward custom events to peers
  // - and custom handler returning 'false' will prevent this
  // - @TODO - update default logic to only include silo subscribers
  let forwardToPeers = true 
  
  // run listeners
  if (hasCustomListeners) {
    customListeners[action.type].forEach((handler) => {
      forwardToPeers = (handler(client.id, action.payload) !== false) && forwardToPeers
    });
  }
  if (forwardToPeers) {
    broadcast(wrapPeerEvent(client.id, action), wss, [client]);
  }

  // Handle Known (Internal Events)
  switch (action.type) {
    case PIPE_MODIFY:
      stateManager.update({
        [action.payload.target]: action.payload.value,
      });
      break;
    case PIPE_MODIFY_CLIENT:
      ensureKey(currentState, action.payload.silo)
      ensureKey(currentState[action.payload.silo], client.id);
      ensureKey(
        currentState[action.payload.silo][client.id],
        action.payload.target
      )

      stateManager.update({
        [action.payload.silo]: {
          ...currentState[action.payload.silo],
          [client.id]: {
            ...currentState[action.payload.silo][client.id],
            [action.payload.target]: {
              ...currentState[action.payload.silo][client.id][action.payload.target],
              ...action.payload.value
            }
          },
        },
      });
      break;
    default:
      // 
      // if (!hasCustomListeners) {
      //   console.log(
      //     `Unknown Action [No Handler '${action.type}'] in ${__filename}`,
      //     action
      //   )
      // }
  }
};

module.exports = handle;
