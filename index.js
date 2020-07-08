/**
 * Pipes
 * Framework Root
 */

const createServer = require("./src/createServer")
const createClientApp = require("./src/createClientApp")
const startAllServers = require('./src/startAllServers')
const StateManager = require("./src/stateManager")

const defaultConfigs = {
  version: "1.0.0",
  socketPort: 1234
}

function Pipes(config) {
  
  const conf = { ...defaultConfigs, ...config }

  this.stateManager = {},
  this.events = {},

  this.servers = [];
  this.clients = [];

  const registerServer = (configuredApp) => {
    this.servers = [...this.servers, configuredApp ]
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
    client: (config) =>
      registerClient(createClientApp({ ...config, pipes: { ...conf } })),
    useContext: (state) => (this.stateManager = new StateManager(state)),
    getContext: () => this.stateManager.getState(),
    start: () => startAllServers(allApps(), this.stateManager, conf),
    apps: () => allApps(),
    registerEvents: (eventMap) => {
      this.events = eventMap;
    },
    events: () => this.events,
  });

  return _buildObj();
}

module.exports = Pipes;
