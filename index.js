// .env File
require('dotenv').config();

const Discord = require('discord.js');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

// Variables
const colors = require('./src/utils/colors');
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

class JotoBot extends AkairoClient {
    constructor() {
        super({
            ownerID: '543106179774021654'
        }, {
            disableEveryone: true
        });

        this.commandHandler = new CommandHandler(this, {
            // Main
            directory: './src/commands/',
            prefix: prefix,
            automateCategories: true,

            // Default prompts
            argumentDefaults: {
                prompt: {
                    modifyStart: (text, message) => {
                        const embed = new Discord.MessageEmbed()
                            .setColor(colors['blue'])
                            .setAuthor(message.author.tag, `${message.author.avatarURL || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'}`)
                            .setDescription(text)
                            .setFooter("Escribe 'cancelar' para cancelar este comando.");

                        return { embed };
                    },
                    modifyRetry: (text, message) => {
                        const embed = new Discord.MessageEmbed()
                            .setColor(colors['yellow'])
                            .setAuthor(message.author.tag, `${message.author.avatarURL || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'}`)
                            .setDescription(text)
                            .setFooter("Escribe 'cancelar' para cancelar este comando.");

                        return { embed };
                    },
                    timeout: 'El tiempo se agotó, el comando ha sido cancelado.',
                    ended: 'Muchos intentos, el comando ha sido cancelado.',
                    cancel: 'El comando ha sido cancelado.',
                    cancelWord: 'cancelar',
                    retries: 2,
                    time: 30000
                }
            },
            
            // cmdUtil
            commandUtil: true
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners',
            automateCategories: true
        });

        // Listeners
        this.listenerHandler.setEmitters({
            process: process,
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        // Load commandHandler and make it use the ListenerHandler
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);

        // Load listenerHanlder aka everything
        this.listenerHandler.loadAll();
    }
};

const client = new JotoBot();
client.login(token);