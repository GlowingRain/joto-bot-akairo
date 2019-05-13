const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'e'],
            args: [{ id: 'code', match: 'text' }],
            ownerOnly: true,
            prefix: '>>'
        });
    }

    exec(message, args) {
        try {
            let codein = args.code;
            let code = eval(codein);

            if (typeof code !== 'string') { 
                code = require('util').inspect(code, { depth: 0 }); 
            };

            let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('📥 Salida')
                .setDescription(`\`\`\`js\n${code}\`\`\``);
            
            if (code.length > 2000) {
                hastebin(code, "js").then(r => {
                    return message.channel.send(`Número de carácteres permitidos excedido, link de Hastebin: ${r}`)
                });
            };

            message.channel.send(embed);

        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }

    }
}

module.exports = EvalCommand;