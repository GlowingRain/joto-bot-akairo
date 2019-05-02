const { Command } = require('discord-akairo');
const { errorMessage, successMessage } = require('../../utils/embeds');

class BugReportCommand extends Command {
    constructor() {
        super('bugreport', {
            aliases: ['bugreport', 'bug'],
            args: [
                {
                    id: 'content',
                    type: 'string',
                    match: 'content'
                }
            ],
            description: 'Envía un reporte de cualquier bug que hayas encontrado (También puedes subir imágenes).',
            channel: 'guild'
        })
    }

    async exec(message, args) {
        const xem = this.client.users.get(this.client.ownerID);

        let embed = this.client.util.embed()
            .setAuthor(`Reporte de: ${message.author.tag}`, message.author.avatarURL({ format: 'png', size: 2048 }))
            .setDescription(args.content ? args.content : 'No content given.')
            .setThumbnail('https://images.emojiterra.com/google/android-pie/128px/2139.png')
            .addField('DATA', `**USER ID:** \`${message.author.id}\` | \`${message.author.tag}\``
                + `\n**CHANNEL ID:** \`${message.channel.id}\` | <#${message.channel.id}>`
                + `\n**LAST MESSAGE:** [LINK](https://discordapp.com/channels/${message.channel.guild.id}/${this.client.user.lastMessageChannelID}/${this.client.user.lastMessageID})`);

        if (message.attachments.size > 0) {
            let attachments = message.attachments.map(a => a.url).join('\n');
            let image = message.attachments.map(a => a.proxyURL);

            embed.addField('ATTACHMENTS', attachments);
            embed.setImage(`${image}`);
        }
        
        await xem.send(embed).then(successMessage('Se ha enviado el reporte con éxito.', message))
            .catch(m => {
                m.delete();
                errorMessage('No se ha podido enviar el mensaje. Intenta de nuevo más tarde.', message)
            });
    }
}

module.exports = BugReportCommand;