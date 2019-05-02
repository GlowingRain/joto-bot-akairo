const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { warnMessage } = require('../../utils/embeds');

class SuggestCommand extends Command {
    constructor() {
        super('suggest', {
            aliases: ['suggest', 'sugerir'],
            args: [
                {
                    id: 'content',
                    type: Argument.range('string', 15, 1024),
                    match: 'content'
                }
            ],
            cooldown: 120000,
            channel: 'guild'
        })
    }

    async exec(message, args) {
        const SuggestChannel = this.client.channels.get(process.env.SUGGEST_CHANNEL);

        let sUser = message.author;

        if (args.content === null) return warnMessage('Tu sugerencia no alcanza el mínimo de carácteres (15 carácteres) o puede sobrepasar el límite (1024 carácteres).', message).then(m => {
            message.delete();
            return m.delete({ timeout: 10000 });
        });

        let suggestembed = new MessageEmbed()
            .setTitle("NUEVA SUGERENCIA")
            .setColor("BLUE")
            .setThumbnail(sUser.avatarURL({ format: 'png', size: 2048 }))
            .addField(":writing_hand: Por:", `${sUser}`, true)
            .addField(":timer: Cuándo:", moment(new Date()).format("HH:MM:ss | DD-MM-YY"), true)
            .addBlankField(true)
            .addField(":bulb: Sugerencia:", args.content);

        message.delete().catch(() => o_O);
        message.channel.send(`✅ | ${message.author} | **Tu sugerencia se ha enviado con éxito.**`).then(
            SuggestChannel.send(suggestembed)
        ).then(m => m.delete({ timeout: 10000 }));
    }
}

module.exports = SuggestCommand;

