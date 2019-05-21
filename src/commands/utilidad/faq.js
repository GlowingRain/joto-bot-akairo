const { Command } = require('discord-akairo');
const Values = require('../../storage/questions.js');
const { MessageEmbed } = require('discord.js');

class FAQCommand extends Command {
    constructor() {
        super('faq', {
            aliases: ['faq', 'frequently', 'frecuente', 'preguntas'],
            args: [
                {
                    id: 'questions',
                    prompt: {
                        start: message => {
                            let embed = new MessageEmbed()
                                .setTitle('⚜ FAQ & Acceso Rápido')
                                .setColor('RANDOM')
                                .setDescription('- **XP**'
                                    + '\n- **Respeto**'
                                    + '\n- **Bardo**'
                                    + '\n- **Spam**'
                                    + '\n- **Flood**'
                                    + '\n- **Exploit**'
                                    + '\n- **Pacman**'
                                    + '\n- **N-WORD**')
                                .setFooter('Selecciona una opción escribiendo lo que quieras leer.');

                            return { embed };
                        },
                        retry: 'No se ha encontrado algo parecido a eso.'
                    }
                }
            ],
            channel: 'guild'
        })
    }

    exec(message, args) {
        if (args.questions) {
            let result = Values.questions.responses[args.questions.toLowerCase()];
            if (result === undefined) return null;
            let nEmbed = this.client.util.embed()
                .setTitle('⚜ ' + args.questions.toUpperCase())
                .setColor('RANDOM')
                .setDescription(result);

            return message.channel.send(nEmbed);
        }
    }
}

module.exports = FAQCommand;