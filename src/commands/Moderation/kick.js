const Command = require('../../core/Command');

class Kick extends Command {
    constructor(rice) {
        super(rice, {
            name: 'kick',
            category: 'Moderation',
            botPerms: ['kickMembers'],
            memberPerms: ['kickMembers'],
            description: 'Kick a specific member'
        });
    }

    async run(message, args) {
        const authorTag = `${message.author.username}#${message.author.discriminator}`;
        const userMentions = message.mentions;
        if (!userMentions[0] || !message.channel.guild.members.get(userMentions[0].id)) {
            return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** Specify a valid member to kick!`, color: 0xff4949 } });
        }

        if (userMentions[0].id == message.author.id) {
            return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** You can't kick yourself.`, color: 0xff4949 } });
        }
        const memberToBan = message.channel.guild.members.get(userMentions[0].id);

        const highestAuthorRole = Math.max.apply(Math, message.member.roles.map((x) => {
            return x.position;
        }));
        const highestTargetRole = Math.max.apply(Math, memberToBan.roles.map((x) => {
            return x.position;
        }));
        if (highestAuthorRole <= highestTargetRole && message.author.id != message.channel.guild.ownerID) {
            return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** You can't kick that member!`, color: 0xff4949 } });
        }
        //<:yes:762884751832252417>
        const reason = args.slice(1).join(' ');
        const targetTag = `${memberToBan.user.username}#${memberToBan.user.discriminator}`;
        await memberToBan.ban().then(() => {
            return message.channel.send({ embed: { description: `<:yes:762884751832252417> **${targetTag}** Has been kicked by ${authorTag}\nReason: ${reason || 'No Reason Provided'}`, color: 0x3cb474 } });
        }).catch((e) => {
            return message.channel.send({ embed: { description: `<:no:762884741069275156> Something went wrong... I couldn't kick **${targetTag}**`, color: 0xff4949 } });
        })

    }
}

module.exports = Kick;