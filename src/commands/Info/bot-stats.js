const Command = require('../../core/Command');
const os = require('os')
const core = os.cpus()[0];


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
                description: `Developers: <@699312838455459911>, <@423687326405885957>, <@657191205968543764>, <@329220047824486400>, <@521677874055479296>, <@373293135704621077>, <@695520751842885672>, <@515204641450098704>, <@342314924804014081>`,
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
                    {
                        name: `Platform`,
                        value: process.platform,
                        inline: true,
                    },
                    {
                        name: 'Speed/MHz',
                        value: core.speed,
                        inline: true
                    },
                    {
                        name: `Cores`,
                        value: os.cpus().length,
                        inline: true
                    },
                    {
                        name: `Version`,
                        value: `Node ${process.version}`,
                        inline: true
                    },
                    {
                        name: `Model`,
                        value: core.model,
                        inline: false
                    }
                    
                ],
                color: 0xFFFFFd,
            }
        })
    }
}

module.exports = Bstats;
