const { HELLO } = require("./actions");

const handle = (action) => {
  switch (action.type) {
    case HELLO:
      console.log(`Hello Recieved from [${action.payload.client_id}]`);
      console.log(`LocalHandler for HELLO event please!!!`);
      break;
    default:
      console.log(`Unknown Action [No Handler '${action.type}']`);
      console.log(action)
  }
};

module.exports = handle;
