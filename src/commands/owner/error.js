const { Command } = require('discord-akairo');

class errorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            ownerOnly: true,
            prefix: '>>'
        })
    }

    exec(message) {
        throw new Error('An error has occured.');
    }
}

module.exports = errorCommand
