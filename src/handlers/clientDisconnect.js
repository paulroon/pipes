
const clientDisconnectHandler = (wss, client, stateManager) => {
  console.log(`User Disconnected [${client.user.id}]`)
};

module.exports = clientDisconnectHandler;
