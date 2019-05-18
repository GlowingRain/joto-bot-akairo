const { Command } = require('discord-akairo');
const CommonUtil = require('../../utils/CommonUtil');
const { MessageEmbed } = require('discord.js');
const { errorMessage } = require('../../utils/embeds');
const colors = require('../../utils/colors');
const prettyMs = require('pretty-ms');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'key',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ],
            description: 'Mira todos los comandos del bot.',
        })
    }

    exec(message, args) {
        const embed = new MessageEmbed()
            .setColor(colors['blue'])
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`Usa j!help [Comando] para ver información más detallada.`)
            .setTimestamp(new Date());

        if (args.key) {
            const key = args.key.toLowerCase();

            if (!this.handler.modules.has(key)) {
                return errorMessage('Ese comando no es válido.', message);
            }

            if (this.handler.modules.has(key)) {
                const channels = {
                    "dm": "MD",
                    "guild": "Servidor"
                };

                // const prefix = this.handler.prefix(message);
                const cmd = this.handler.modules.get(key);

                embed.setTitle(`${cmd.id.toTitleCaseAll()}`);
                embed.setDescription(`${cmd.description}`);

                if (cmd.aliases) {
                    embed.addField('Aliases', `\`${cmd.aliases.join(', ')}\``, true);
                }

                if (cmd.channel) {
                    embed.addField('Restricción', `\`${channels[cmd.channel]}\``, true);
                }

                if (cmd.cooldown) {
                    embed.addField('Cooldown', `\`${prettyMs(cmd.cooldown)}\``, true);
                }
                
                if (cmd.ratelimit) {
                    embed.addField('Limitación', `\`${cmd.ratelimit} uso(s)\``, true);
                }

                return message.author.send({ embed }).catch(() => {
                    return errorMessage('No puedo enviar los comandos a tus mensajes privados, revisa tus opciones de privacidad.')
                });
            }
        };

        for (const category of this.handler.categories.values()) {
            const title = {
                general: '📝\u2000General',
                utilidad: 'ℹ️\u2000Utilidad'
            }[category.id];

            if (title) embed.addField(title, `\`${category.map(cmd => cmd.aliases[0]).join('` `')}\``);
        };

        return message.author.send({ embed }).catch(() => {
            return errorMessage('No puedo enviar los comandos a tus mensajes privados, revisa tus opciones de privacidad.', message);
        });
    }
}

module.exports = HelpCommand;