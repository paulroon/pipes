const {
  HELLO,
  INIT_APP_PIPESTATE,
  UPDATE_APP_PIPESTATE,
  PIPE_MODIFY,
  PIPE_MODIFY_CLIENT,
  PEER_ACTION,
  WELCOME
} = require("./constants");

const wrapPeerEvent = (clientId, action) => ({
  type: PEER_ACTION,
  clientId: clientId,
  event: action,
});

// Action Creators
const initialiseAppPipeState = (state) => ({
  type: INIT_APP_PIPESTATE,
  payload: state,
});

const updateAppPipeState = (state) => ({
  type: UPDATE_APP_PIPESTATE,
  payload: state,
})

const createWelcomeMessage = clientId => ({
  type: WELCOME, 
  payload: {
    clientId
  }
})

module.exports = {
  HELLO,
  INIT_APP_PIPESTATE,
  UPDATE_APP_PIPESTATE,
  PIPE_MODIFY,
  PIPE_MODIFY_CLIENT,
  initialiseAppPipeState,
  updateAppPipeState,
  createWelcomeMessage,
  wrapPeerEvent,
};
