const Command = require("../../core/Command");

class ServerMute extends Command {
    constructor(rice) {
        super(rice, {
            name: "servermute",
            aliases: ["smute", "server-mute", "voice-mute"],
            category: "Moderation",
            botPerms: ["manageGuild"],
            memberPerms: ["manageMessages"],
            description: "server mute or unmute a user (Voice)",
            usage: "server-mute <user>"
        });
    }

    async run(message, args) {

        const user = message.channel.guild.members.find(x => x.username.toLowerCase() == args.join(" ").toLowerCase() || x.id.toLowerCase() == args.join(" ").toLowerCase()) || message.mentions[0]
        const su = message.channel.guild.members.get(user.id);
        if (!su) return message.channel.sendError(`You didn't specify a user.`)
        else {
            if (su.voiceState.channelID === null) {
                return message.channel.sendError(`I"m sorry, ${su.username} isn't connected to a voice channel.`)
            } else {
                if (su.voiceState.mute === false) {
                    su.edit({ mute: true })
                    message.channel.send(`<:yes:762884751832252417> I have successfully muted \`${su.username}\` for you!`)
                }
                if (su.voiceState.mute === true) {
                    su.edit({ mute: false })
                    message.channel.send(`<:yes:762884751832252417> I have successfully unmuted \`${su.username}\` for you!`)
                }
            }
        }
    }
}

module.exports = ServerMute;