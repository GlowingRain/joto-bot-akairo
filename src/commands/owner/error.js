const { Command } = require('discord-akairo');

class errorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            ownerOnly: true,
            prefix: '>>'
        })
    }

    exec() {
        throw new Error('Si ves esto, es porque se ha producido un error solicitado.');
    }
}

module.exports = errorCommand
