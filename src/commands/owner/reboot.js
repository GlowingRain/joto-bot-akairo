const { Command } = require('discord-akairo');
const prettyMs = require('pretty-ms');

class RebootCommand extends Command {
    constructor() {
        super('reboot', {
            aliases: ['reboot'],
            args: [
                {
                    id: 'time',
                    type: 'integer'
                }
            ],
            ownerOnly: true,
            prefix: '>>'
        })
    }

    exec(message, args) {
        if (args.time) {
            let timedEmbed = this.client.util.embed()
                .setColor('RED')
                .setDescription(`Reinicio programado para dentro de **${prettyMs(args.time)}**`);

            message.channel.send(timedEmbed)
            setTimeout(() => { process.exit(1); }, args.time);
        }

        let normalEmbed = this.client.util.embed()
            .setColor('RED')
            .setDescription('Se va a realizar un reinicio dentro de **3 segundos**...');

        message.channel.send(normalEmbed);
        setTimeout(() => { process.exit(1); }, 3000);
    }
}

module.exports = RebootCommand;

