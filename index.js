/**
 * Pipes
 * Framework Root
 */

const createServer = require("./src/createServer")
const createClientApp = require("./src/createClientApp")
const startAllServers = require('./src/startAllServers')
const emit = require('./src/util/emit')
const StateManager = require("./src/stateManager")

const defaultConfigs = {
    version: "1.0.0",
    socketPort: 1234,
    socketPath: "/happy-pipe",
}

function Pipes(config) {
  
  const conf = { ...defaultConfigs, ...config || {} }

  this.stateManager = null,

  this.servers = []
  this.clients = []
  this.listeners = {}

  const listen = (eventName, handler) => {
    if (!Object.hasOwnProperty.call(this.listeners, eventName)) {
      this.listeners[eventName] = []
    }
    this.listeners = {
      ...this.listeners,
      [eventName]: [...this.listeners[eventName], handler],
    };
  }

  const registerServer = (configuredApp) => {
    this.servers = [...this.servers, configuredApp]
    return _buildObj()
  };

  const registerClient = (configuredApp) => {
    this.clients = [...this.clients, configuredApp]
    return _buildObj()
  };

  const allApps = () => this.servers.concat(this.clients)

  const _buildObj = () => ({
    version: () => `Pipes: (v:${conf.version})`,
    server: (config) =>
      registerServer(createServer({ ...config, pipes: { ...conf } })),
    client: (pathToApp, config) =>
      registerClient(
        createClientApp({
          ...config,
          pipes: { ...conf },
          path: pathToApp,
        })
      ),
    useContext: (state) => (this.stateManager = new StateManager(state)),
    getContext: () => this.stateManager.getState(),
    updateContext: (diff) => this.stateManager.update(diff),
    start: () =>
      startAllServers(allApps(), this.stateManager, this.listeners, conf),
    apps: () => allApps(),
    intercept: listen,
    emit,
  });

  return _buildObj();
}

module.exports = Pipes;
