const Command = require('../../core/Command');
const os = require('os')
const core = os.cpus()[0];


class channelinfo extends Command {
    constructor(rice) {
        super(rice, {
            name: 'channel-info',
            aliases: ['channel'],
            category: 'Info',
            botPerms: ['embedLinks'],
            memberPerms: [],
            description: 'Shows the information of a channel',
        });
    }

    async run(msg, args) {
        const channel = msg.mentions[0] || msg.mentions.channel;
        const guild = msg.channel.guild 

        msg.channel.send({
            embed: {
            title: `${channel.name} | ${channel.id}`,
            description: `Mention: <#${channel.id}>`,
            fields: [
                {
                    name: 'Type:',
                    value: `${channel.type}`,
                    inline: true
                }
            ],
            color: 0xFFFFFd,
            
            }
        })
    }
}

module.exports = channelinfo;