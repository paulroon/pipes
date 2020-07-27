const {
  HELLO,
  INIT_APP_PIPESTATE,
  UPDATE_APP_PIPESTATE,
  PIPE_MODIFY,
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

const createWelcomeMessage = (user) => ({
    type: WELCOME,
    payload: {
        user,
    },
})

module.exports = {
  HELLO,
  INIT_APP_PIPESTATE,
  UPDATE_APP_PIPESTATE,
  PIPE_MODIFY,
  initialiseAppPipeState,
  updateAppPipeState,
  createWelcomeMessage,
  wrapPeerEvent,
};
