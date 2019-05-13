const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');
const { errorMessage } = require('../../utils/embeds');

class CommandErrorListener extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        })
    }

    exec(error, message, command) {
        // Timestamp
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let log = `${timestamp} | ${chalk.bgRed.bold(`ERROR - ${command}`)} | ${error.message}`;
        let otherLogs = message.guild.channels.find(channel => channel.name === 'other-logs')
            .catch((err) => console.error(err));

        // Send the error then log it
        errorMessage(`**Ha ocurrido un error:**\n\`\`\`js\n${error.message}\`\`\``, message);
        otherLogs.send(`<@${this.client.ownerID}>`, errorMessage(`**Ha ocurrido un error en el canal <#${message.channel.id}>**\n\`\`\`js\n${error.message}\`\`\``, message));
        
        // AppendFile to Error Log
        fs.appendFile('src/listeners/errors/errors.log', `\r\n============`
        + `\r\nERROR`
        + `\r\n------------`
        + `\r\n${error.stack}`
        + `\r\n============`);

        console.log(log);
    }
}

module.exports = CommandErrorListener;