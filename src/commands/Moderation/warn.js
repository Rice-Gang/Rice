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

        const user = message.mentions[0] || message.channel.guild.members.get(args[0]) || message.channel.guild.members.find(x => x.username === args[0]);

        if (!message.mentions[0] || !message.channel.guild.members.get(message.mentions[0].id)) {
            return message.channel.sendError('You need to provide a valid member to warn.')
        }

        if (user.id === message.author.id) {
            return message.channel.sendError('I cannot ban that user.')
        }

        const member = await message.channel.guild.members.get(user.id);

        if (!member) {
            message.channel.sendError('You need to provide a valid user.')
        }

        let reason = args.slice(1).join(' ');

        if (!reason) reason = 'No reason provided';

        data.guild.infractionCount++;
        await data.guild.save();

        data.member.warns.push({
            moderator: message.author.id,
            channel: message.channel.id,
            time: Date.now(),
            case: data.guild.infractionCount,
            reason
        });

        await data.member.save();

        const embed = {
            color: 0xEDD3BB,
            author: {
                name: `Case #${data.guild.infractionCount}`
            },
            fields: [
                { name: 'User', value: member.username + '#' + member.discriminator },
                { name: 'Moderator', value: message.author.username + '#' + member.author.discriminator },
                { name: 'Reason', value: reason }
            ]
        }

        message.channel.createMessage({ embed });
    }
}

module.exports = Warn;