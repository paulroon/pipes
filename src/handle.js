const { HELLO, PIPE_MODIFY } = require("./actions");

const handle = (action, stateManager) => {
  switch (action.type) {
    case HELLO:
      console.log(`Hello Recieved from [${action.payload.client_id}]`);
      break;
    case PIPE_MODIFY:
      stateManager.update({
        [action.payload.target]: action.payload.value,
      });
      break
    default:
      console.log(`Unknown Action [No Handler '${action.type}']`, action);
  }
};

module.exports = handle;
