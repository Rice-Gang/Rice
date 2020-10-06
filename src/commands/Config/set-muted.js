const Command = require('../../core/Command');
//const MUTED_ROLE = require('../../models/muted_role')
let delete_responses = ['disable', 'delete', 'remove', 'reset']

class Muted_set extends Command {
    constructor(rice) {
        super(rice, {
            name: 'set-muted',
            aliases: ['setmuted', 'muted-role', 'mutedrole'],
            category: 'Config',
            botPerms: ['embedLinks'],
            memberPerms: ['administrator'],
            description: 'Change your server muted role',
            usage: `set-muted < auto | set | remove > < role >`
        });
    }

    async run(msg, args) {

        //Awaiting for remake ....




        return
        let data = await MUTED_ROLE.findOne({guildID: msg.guildID})
        let responce = args[0]
        if(!responce) return msg.channel.send('I need your responce')
        if(!data && responce == 'auto'){
            this.rice.createRole(msg.guildID, {
                name: 'Muted',
                permissions: 0
            }, "Auto mute setup").then(role => {
                msg.channel.guild.channels.forEach(ch => {
                    this.rice.editChannelPermission(ch.id, role.id, 0, 2147482343, "role", "Muted Setup")
                })
                new MUTED_ROLE({
                    roleID: role.id,
                    guildID: msg.guildID
                }).save()
                return msg.channel.send({
                    embed: {
                        title: `Muted role set`,
                        description: `Set to <@&${role.id}>`,
                        color: 0xFFFFFd
                    }
                })
            })
            
            
        }else if(data && responce == 'auto'){
            return msg.channel.send('You already have a muted role')
        }else if(data && delete_responses.includes(responce)){
            try{
                msg.channel.guild.roles.find(x => x.id == data.roleID).delete()
            }catch(e){}
            
            await MUTED_ROLE.findOneAndDelete({guildID: msg.guildID})
            msg.channel.send(`Your muted role has been removed`)
            
        }else if(!data && delete_responses.includes(responce)){
            return msg.channel.send('You do not have a muted role to remove')
        }else if(!data && responce == 'set'){
            let role = msg.roleMentions[0] || msg.channel.guild.roles.find(x => x.id == args[1]) || msg.channel.guild.roles.find(x => x.name == args.join(' ').slice(args[0].length + 1))
            if(!role) return msg.channel.send('Please give me a valid role')
            msg.channel.guild.channels.forEach(ch => {
                this.rice.editChannelPermission(ch.id, role, 0, 2147482343, "role", "Muted Setup")
            })
            new MUTED_ROLE({
                roleID: role,
                guildID: msg.guildID
            }).save()
            return msg.channel.send({
                embed: {
                    title: `Muted role set`,
                    description: `Set to <@&${role}>`,
                    color: 0xFFFFFd
                }
            })
        }else if(data && responce == 'set'){
            return msg.channel.send('You already have a muted role to add a new one you must remove the old one first')
        }
        

        

        
    }
}

module.exports = Muted_set;