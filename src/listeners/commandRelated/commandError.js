const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');
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
        let otherLogs = this.client.channels.get('501955426724741121');

        // Send the error then log it
        errorMessage(`**Ha ocurrido un error:**\n\`\`\`js\n${error.message}\`\`\``, message);
        otherLogs.send(`**<@${this.client.ownerID}>, ha ocurrido un error en el canal <#${message.channel.id}>**\n\`\`\`js\n${error.message}\`\`\``
        + '\n**================================**');

        console.log(log);
    }
}

module.exports = CommandErrorListener;