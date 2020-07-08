const { updateAppPipeState } = require('./actions')

function StateManager(state) {
    this.state = state
    this.socketServer = null

    const updateState = (newState) =>
        (this.state = { ...this.state, ...newState })

    const broadcast = () => {
        if (this.socketServer) {
          this.socketServer.broadcast(updateAppPipeState(this.state));
        }
      }
    
    return {
      getState: () => ({ ...this.state }),
      setSocketServer: (socketServer) => (this.socketServer = socketServer),
      update: (stateDiff) => {
          updateState(stateDiff)
          broadcast()
      },
    };
}

module.exports = StateManager;