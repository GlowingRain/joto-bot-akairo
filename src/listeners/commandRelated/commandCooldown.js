const { Listener } = require('discord-akairo');
const { warnMessage } = require('../../utils/embeds');
const prettyMs = require('pretty-ms');

class CommandCooldownListener extends Listener {
    constructor() {
        super('commandCooldown', {
            emitter: 'commandHandler',
            event: 'commandCooldown'
        })
    }

    exec(message, _, remaining) {
        warnMessage(`Debes esperar \`${prettyMs(remaining)}\` antes de usar ese comando.`, message);
    }
}

module.exports = CommandCooldownListener;