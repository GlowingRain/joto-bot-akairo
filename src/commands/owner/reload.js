const { Command } = require('discord-akairo');
const { embedMessage } = require('../../utils/embeds');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'r'],
            args: [
                {
                    id: 'commandID'
                }
            ],
            ownerOnly: true,
            prefix: '>>'
        })
    }

    exec(message, args) {
        let cmd = args.commandID;

        if (args.commandID === 'reloadAll') {
            this.handler.reloadAll();
            return embedMessage(message, '**Se ha recargado todo.**');
        }

        if (args.commandID === 'loadAll') {
            return embedMessage(message, '**Todos los módulos van a ser cargados de vuelta en breves momentos...**')
                .then(this.handler.removeAll()).then(this.handler.loadAll());
        }

        this.handler.reload(cmd);
        return embedMessage(message, `\`${cmd}\` se ha recargado con éxito.`);
    }
}

module.exports = ReloadCommand;