const { updateAppPipeState } = require('./actions')


/**
 * StateManager stores state and will publish to 
 * Objects that share an interface for publishing Actions
 * eg: SocketServer
 */
function StateManager(state) {
    this.state = state
    this.publishers = []
    this.clients = []

    const updateState = (newState) =>
        (this.state = { ...this.state, ...newState })

    const publish = () => {
        const deltaAction = updateAppPipeState(this.state)
        this.publishers.forEach((pub) => pub.publish(deltaAction))
      }

    const addClient = (clientId) => (this.clients = [...this.clients, clientId])
    const getClients = () => this.clients
    
    return {
      getState: () => ({ ...this.state }),
      setPublisher: (publisher) => this.publishers = [...this.publishers, publisher],
      update: (stateDiff) => {
        updateState(stateDiff);
        publish();
      },
      addClient,
      getClients
    };
}

module.exports = StateManager;