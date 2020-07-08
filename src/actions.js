// Actions
const HELLO = "HELLO";
const INIT_APP_PIPESTATE = 'INIT_APP_PIPESTATE'

// Action Creators
const initialiseAppPipeState = state => ({
    type: INIT_APP_PIPESTATE,
    payload: state
})

module.exports = {
  HELLO,
  INIT_APP_PIPESTATE,
  initialiseAppPipeState,
};
