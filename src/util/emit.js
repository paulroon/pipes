const { wrapPeerEvent } = require("../actions")
const { sendToClient } = require("../util")

const emit = (client, eventName, data) => {
    sendToClient(wrapPeerEvent(client.user.id, {
        type: eventName,
        payload: data
    }), client)
}

module.exports = emit