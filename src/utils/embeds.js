const { MessageEmbed } = require('discord.js');
const hexColorRegex = require('hex-color-regex');
const colors = require('../utils/colors');

// Custom Embed
module.exports.embedMessage = (message, content, hex) => {
    let regex = hexColorRegex().test(hex);
    let embed = new MessageEmbed()
        .setDescription(`${content}`);

    if (regex === true) {
        embed.setColor(hex)
    } else {
        embed.setColor(0x36393E);
    }

    return message.channel.send({ embed });
};

// Messages
module.exports.errorMessage = (error, message) => {
    const errorMsg = new MessageEmbed()
        .setColor(colors['red'])
        .setDescription(`**\`❌\`** - ${error}`);

    return message.channel.send(errorMsg);
};

module.exports.warnMessage = (warning, message) => {
    const warnMsg = new MessageEmbed()
        .setColor(colors['orange'])
        .setDescription(`**\`⚠\`** - ${warning}`);

    return message.channel.send(warnMsg);
};

module.exports.successMessage = (content, message) => {
    const successMsg = new MessageEmbed()
        .setColor(colors['green'])
        .setDescription(`**\`✅\`** - ${content}`);

    return message.channel.send(successMsg);
};