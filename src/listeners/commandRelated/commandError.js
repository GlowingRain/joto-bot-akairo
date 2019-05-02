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

        // Send the error then log it
        errorMessage(`**Ha ocurrido un error:**\n\`\`\`js\n${error.message}\`\`\``, message)
        console.log(log);
    }
}

module.exports = CommandErrorListener;