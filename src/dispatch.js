const { HELLO } = require("./actions");

const dispatch = async (action) => {
  switch (action.type) {
    case HELLO:
      console.log(`Hello Recieved from [${action.payload.client_id}]`);
      console.log(`LocalHandler for HELLO event please!!!`);
      break;
    default:
      console.log("Unknown Action [No Handler Available]");
  }
};

module.exports = dispatch;
