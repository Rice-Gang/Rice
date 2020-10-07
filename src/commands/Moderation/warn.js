const Command = require('../../core/Command');

class Warn extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            category: 'Moderation',
            aliases: [],
            memberPerms: ['manageMessages'],
            botPerms: []
        });
    }

    async run(message, args, data) {

        if (!message.mentions[0] || !message.channel.guild.members.get(message.mentions[0].id)) {
            return message.channel.sendError('You need to provide a valid member to warn.')
        }

        if (message.mentions[0].id === message.author.id) {
            return message.channel.sendError('Youi')
        }

        // const userMentions = message.mentions;
        // if (!userMentions[0] || !message.channel.guild.members.get(userMentions[0].id)) {
        //     return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** Provide a valid member to ban.`, color: 0xff4949 } });
        // }

        // if (userMentions[0].id == message.author.id) {
        //     return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** You can't ban yourself.`, color: 0xff4949 } });
        // }
        // const memberToBan = message.channel.guild.members.get(userMentions[0].id);
    }
}

module.exports = Warn;