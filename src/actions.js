// Actions
const HELLO = "HELLO";
const INIT_APP_PIPESTATE = "INIT_APP_PIPESTATE";
const UPDATE_APP_PIPESTATE = "UPDATE_APP_PIPESTATE";
const PIPE_MODIFY = "PIPE_MODIFY";

// Action Creators
const initialiseAppPipeState = (state) => ({
  type: INIT_APP_PIPESTATE,
  payload: state,
});

const updateAppPipeState = (state) => ({
  type: UPDATE_APP_PIPESTATE,
  payload: state,
});

module.exports = {
  HELLO,
  INIT_APP_PIPESTATE,
  UPDATE_APP_PIPESTATE,
  PIPE_MODIFY,
  initialiseAppPipeState,
  updateAppPipeState
};
