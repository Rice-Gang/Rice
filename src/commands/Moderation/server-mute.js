const Command = require('../../core/Command');

class ServerMute extends Command {
    constructor(rice) {
        super(rice, {
            name: 'servermute',
            aliases: ['smute', 'server-mute'],
            category: 'Moderation',
            botPerms: ['manageGuild'],
            memberPerms: ['manageMessages'],
            description: 'server mute or unmute a user',
            usage: 'server-mute <user>'
        });
    }

    async run(message, args) {

        const user = message.mentions[0] || message.channel.guild.members.find(x => x.username.toLowerCase() == args.join(' ').toLowerCase()) || message.channel.guild.members.find(x => x.id.toLowerCase() == args.join(' ').toLowerCase())
        if (!user) return message.channel.sendError(`You didn't specify a user.`)
        else {
            if (user.voiceState.channelID === null) {
                return message.channel.sendError(`I'm sorry, ${user.username} isn't connected to a voice channel.`)
            } else {
                if (user.voiceState.mute === false) {
                    user.edit({ mute: true })
                    message.channel.send(`<:yes:762884751832252417> I have successfully muted \`${user.username}\` for you!`)
                }
                if (user.voiceState.mute === true) {
                    user.edit({ mute: false })
                    message.channel.send(`<:yes:762884751832252417> I have successfully unmuted \`${user.username}\` for you!`)
                }
            }
        }
    }
}

module.exports = ServerMute;