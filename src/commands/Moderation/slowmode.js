
const ms = require('ms');
const Command = require('../../core/Command');

class Slowmode extends Command {
    constructor(rice) {
        super(rice, {
            name: 'slowmode',
            category: 'Moderation',
            botPerms: ['manageChannels'],
            memberPerms: ['manageChannels'],
            description: 'Add a slowmode to a specific channel',
            usage: `slowmode < seconds >`
        });
    }

    async run(message, args) {
        const authorTag = `${message.author.username}#${message.author.discriminator}`;

        const disableArgs = ['off', 'stop', 'disable', 'false'];

        const channelForSlowmode = message.channel.guild.channels.get(message.channelMentions[0]) || message.channel;

        if (disableArgs.includes(args[0])) {
            if (channelForSlowmode.rateLimitPerUser == 0) {
                return message.channel.send({ embed: { description: `<:no:762884741069275156>  **${authorTag}** Slowmode isn't enabled in that channel!`, color: 0xff4949 } });
            }

            await channelForSlowmode.edit({ rateLimitPerUser: 0 }).then(() => {
                message.channel.send({ embed: { description: `<:yes:762884751832252417> **${authorTag}** Disabled slowmode in ${channelForSlowmode.mention}`, color: 0x3cb474 } });
            }).catch((e) => {
                message.channel.send({ embed: { description: `<:no:762884741069275156> Something went wrong... I couldn't disable slowmode in that channel.`, color: 0xff4949 } });
            })
            return;
        } else {

            if (!args[0]) {
                return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** Specify a valid time!`, color: 0xff4949 } });
            }

            const time = args[0];

            let timeInSeconds = ms(time) / 1000;

            if (isNaN(timeInSeconds)) {
                return message.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** Specify a valid time!`, color: 0xff4949 } });
            }

            if (timeInSeconds > 21600) timeInSeconds = 21600;

            if (timeInSeconds == 0) {
                if (channelForSlowmode.rateLimitPerUser == 0) {
                    return message.channel.send({ embed: { description: `<:no:762884741069275156>  **${authorTag}** Slowmode isn't enabled in that channel!`, color: 0xff4949 } });
                }
                await channelForSlowmode.edit({ rateLimitPerUser: 0 }).then(() => {
                    message.channel.send({ embed: { description: `<:yes:762884751832252417> **${authorTag}** Disabled slowmode in ${channelForSlowmode.mention}`, color: 0x3cb474 } });
                }).catch((e) => {
                    message.channel.send({ embed: { description: `<:no:762884741069275156> Something went wrong... I couldn't disable slowmode in that channel.`, color: 0xff4949 } });
                })
                return;
            }

            let prettyTime = time;
            if (ms(prettyTime) > 21600000) prettyTime = 21600000;
            else prettyTime = ms(time);
            await channelForSlowmode.edit({ rateLimitPerUser: parseInt(timeInSeconds) }).then(() => {
                message.channel.send({ embed: { description: `<:yes:762884751832252417> **${authorTag}** Set slowmode of ${channelForSlowmode.mention} to \`${ms(prettyTime, { long: true })}\``, color: 0x3cb474 } });
            }).catch((e) => {
                message.channel.send({ embed: { description: `<:no:762884741069275156> Something went wrong... I couldn't set slowmode to that channel.`, color: 0xff4949 } });
            })
        }
    }
}

module.exports = Slowmode;