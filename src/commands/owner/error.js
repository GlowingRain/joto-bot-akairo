const { Command } = require('discord-akairo');

class errorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            ownerOnly: true
        })
    }

    exec(message) {
        message.chanel.send('Wow.');
    }
}

module.exports = errorCommand
