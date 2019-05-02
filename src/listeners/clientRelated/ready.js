const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');


class ReadyListener extends Listener {
    constructor() {
        super('readyListener', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        // Log
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;
        let log = `${timestamp} | ${chalk.green('READY')} | ${chalk.blue(this.client.user.tag)} está online junto a ${chalk.red(this.client.users.size)} usuarios.`;
        
        // Status - Activity
        this.client.user.setActivity('INESTABLE (ACTUALIZANDO) | v3.0.0', { type: 'PLAYING' });

        console.log(log);
    }
};

module.exports = ReadyListener;