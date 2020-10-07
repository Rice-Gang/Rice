const Command = require('../../core/Command');
const MessageEmbed = require('../../core/MessageEmbed');

class Bstats extends Command {
    constructor(rice) {
        super(rice, {
            name: 'bot-stats',
            aliases: ['bstats'],
            category: 'Info',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Shows info on the bot',
            usage: `botstats`
        });
    }

    async run(msg, args) {
        
        
        let totalchannls = 0
        this.rice.guilds.forEach(g => {g.channels.forEach(c => {totalchannls += 1})})
        const uptime = this.rice.uptime
        msg.channel.send({
            embed: {
                title: `Bot stats`,
                thumbnail:{
                    url: this.rice.user.avatarURL
                },
                fields:[
                    {
                        name: 'Total servers',
                        value: this.rice.guilds.size,
                        inline: true,
                    },
                    {
                        name: 'Servers available',
                        value: this.rice.guilds.size - this.rice.unavailableGuilds.size,
                        inline: true
                    },
                    {
                        name: 'Servers unavailable',
                        value: this.rice.unavailableGuilds.size,
                        inline: true
                    },
                    {
                        name: 'Users',
                        value: this.rice.users.size,
                        inline: true
                    },
                    {
                        name: 'Channels',
                        value: totalchannls,
                        inline: true
                    },
                    {
                        name: 'Ping',
                        value: msg.channel.guild.shard.latency,
                        inline: true
                    },
                    {
                        name: 'Uptime',
                        value: `${Math.floor(uptime / 86400000)} Days ${Math.floor((uptime / (1000*60*60)) % 24)} Hours ${Math.floor((uptime / (1000*60)) % 60)} Minutes ${Math.floor((uptime / (1000) % 60))} Seconds`,
                        inline: false
                    },
                    
                ],
                color: 0xFFFFFd,
            }
        })
    }
}

module.exports = Bstats;
