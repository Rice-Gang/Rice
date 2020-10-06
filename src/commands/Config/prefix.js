const Command = require('../../core/Command');
const { findOneAndDelete } = require('../../models/prefix');
const PREFIX = require('../../models/prefix')


class Prefix extends Command {
    constructor(rice) {
        super(rice, {
            name: 'set-prefix',
            category: 'Config',
            botPerms: ['embedLinks'],
            memberPerms: ['manageGuild'],
            description: 'Change your servers prefix',
            usage: `set-prefix < new-prefix >`
        });
    }

    async run(msg, args) {
        const data = await PREFIX.findOne({guildID: msg.channel.guild.id})
        let newprefix = args[0].toLowerCase()
        if(!newprefix) return msg.channel.send('Please give me a new prefix')
        if(newprefix.length > 15)return msg.channel.send('That prefix is to long, It needs to be under 15 characters')
        if(!data){
            if(newprefix == 'rice') return msg.channel.send('This is already your prefix')
            new PREFIX({
                prefix: newprefix,
                guildID: msg.channel.guild.id
            }).save()
            return msg.channel.send({
                embed:{
                    title: 'New prefix',
                    description: `New prefix:  ${newprefix}`,
                    color: 0xFFFFFd
                }
            })
        }else{
            if(newprefix == data.prefix) return msg.channel.send('This is already your prefix')
            await PREFIX.findOneAndDelete({
                guildID: msg.channel.guild.id
            })

            msg.channel.send({
                embed:{
                    title: 'New prefix',
                    description: `New prefix:  ${newprefix}`,
                    color: 0xFFFFFd
                }
            })

            if(newprefix == 'rice') return;
            new PREFIX({
                prefix: newprefix,
                guildID: msg.channel.guild.id
            }).save()
            
        }

        
    }
}

module.exports = Prefix;