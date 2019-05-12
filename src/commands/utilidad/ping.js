const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: 'Mira la latencia del bot.'
        })
    }

    async exec(message) {
        let msgping1 = new Date();
        let botping = new Date() - message.createdAt;
        let msgping2 = new Date() - msgping1;
        const pingembed = new MessageEmbed()
            .addField('API', Math.round(this.client.ws.ping) + 'ms', true)
            .addField('Bot', Math.floor(botping) + 'ms', true)
            .addField('Mensajes', '~' + Math.round(msgping2) + 'ms', true);

        message.channel.send(`Calculando...`).then(msg => {
            const pingValue = (botping > 100 ? pingembed.setColor("RED") : pingembed.setColor("BLUE"))
            pingValue;
            msg.edit(pingembed)
        });
    }
}

module.exports = PingCommand;