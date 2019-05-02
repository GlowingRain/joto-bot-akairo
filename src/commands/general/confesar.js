const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { warnMessage } = require('../../utils/embeds');

class ConfessCommand extends Command {
    constructor() {
        super('confess', {
            aliases: ['confess', 'confesar'],
            args: [
                {
                    id: 'content',
                    type: Argument.range('string', 20, 2048),
                    match: 'content'
                }
            ],
            description: 'Confiesa tus más temidos pecados, ¡o solo cuenta una anécdota!',
            channel: 'dm',
            cooldown: 86400000
        })
    }

    exec(message, args) {
        const ConfessChannel = this.client.channels.get(process.env.CONFESSION_CHANNEL);
        const ConfessLog = this.client.channels.get(process.env.CONFESS_LOG);

        const guild = this.client.guilds.get(process.env.GUILD);

        let User = message.author;
        let UserTag = message.author.tag;
        let UserID = message.author.id;

        if (args.content === null) return warnMessage('Tu confesión no alcanza el mínimo de carácteres (20 carácteres) o puede sobrepasar el límite (2048 carácteres).', message);

        let confembed = new MessageEmbed()
            .setTitle("Confesión")
            .setFooter("Todas las confesiones son anónimas.")
            .setColor("BLUE")
            .setThumbnail(guild.iconURL({ format: 'png', size: 2048 }))
            .setDescription(args.content);

        let log = new MessageEmbed()
            .setTitle("Confesión")
            .setColor("RANDOM")
            .addField("Mandada por", `${User} | ${UserTag} | ${UserID}`)
            .addField("Confesión", args.content)
            .setTimestamp();

        message.channel.send("**✅ | Tu confesión ha sido enviada anónimamente.**");
        ConfessChannel.send(confembed);
        ConfessLog.send(log);
    }
}

module.exports = ConfessCommand;