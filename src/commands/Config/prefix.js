const Command = require('../../core/Command');
const serverConfig = require('../../models/guild');


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
        const data = await serverConfig.findOne({ guildID: msg.channel.guild.id });
        if (!args[0]) args[0] = '';
        let newprefix = args[0].toLowerCase();
        const authorTag = `${msg.author.username}#${msg.author.discriminator}`;
        if (!newprefix) {
            return msg.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** Please provide a prefix.`, color: 0xff4949  } });
        }
        if (newprefix.length > 15) {
            return msg.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** That prefix is to long, It needs to be under 15 characters.`, color: 0xff4949  } });
        }

        if (data.prefix == newprefix) {
            return msg.channel.send({ embed: { description: `<:no:762884741069275156> **${authorTag}** This Prefix is already set!`, color: 0xff4949  } });
        }

        data.prefix = newprefix;
        await data.save();
        msg.channel.send({ embed: { description: `<:yes:762884751832252417> Prefix set to \`${newprefix}\``, color: 0x3cb474}})

        /*if(!data){
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
            
        }*/


    }
}

module.exports = Prefix;