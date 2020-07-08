/**
 * A Configured App - is a post configuration Appl
 */
function Application(id, server, startup, conf) {
  this.id = id;
  this.server = server;
  this.startup = startup;
  this.conf = conf;
  this.socketServer = null

  return {
    id: this.id,
    name: this.conf.name || "unknown",
    get: () => this.server,
    start: () => this.startup(this.server),
    registerWss: (wss) => this.socketServer = wss,
    meta: { ...conf },
  };
}

module.exports = Application;