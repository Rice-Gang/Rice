const { color } = require('jimp')
const Command = require('../../core/Command')

class Lock extends Command {
    constructor(rice) {
        super(rice, {
            name: 'lock',
            category: 'Moderation',
            botPerms: ['manageChannels'],
            memberPerms: ['manageChannels'],
            description: 'Locks the whole server',
            usage: 'lock <on/off>'
        })
    }

    async run (message, args) {
        const channels = message.channels.guild.filter(ch => ch.type == 'text')

        if(args[0] == 'on') {
            channels.forEach(channel => {
                channel.permissionOverwrites(message.channels.guild.roles.everyone, {
                    SEND_MESSAGE: false,
                }).then(() => {
                    channel.setName(channel.name += '🔒')
                })
            })
            return message.channel.send({ embed: {
                description: 'All channels locked!',
                color: 0xf3f3f3
            }})
        } else if(args[0] == 'off') {
            channel.permissionOverwrites(message.channels.guild.roles.everyone, {
                SEND_MESSAGE: true,
            }).then(() => {
                channel.setName(channel.name.replace('🔒', ''))
            })
            return message.channel.send({ embed: {
                description: 'Locked',
                color: 0xf3f3f3
            }})
        }
        if(!args[0]){
            message.channel.updateOverwrites(message.channels.guild.roles.everyone, {
                SEND_MESSAGE: false,
            }).then(() => {
                message.channel.setName(message.channel.nme += '🔒')
            })
            return message.channel.send({ embed: {
                description: 'Channel Locked',
                color: 0xf3f3f3
            }})
        }
    }
}

module.exports = Lock;