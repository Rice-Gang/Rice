const Command = require('../../core/Command');
const os = require('os');
const { PassThrough } = require('stream');
const core = os.cpus()[0];


class Ustats extends Command {
    constructor(rice) {
        super(rice, {
            name: 'user-info',
            aliases: ['ustats', 'whos', 'whois', 'user'],
            category: 'Info',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Shows info on a user',
            usage: `user-stats [ user ]`
        });
    }

    async run(msg, args) {

//const status = message.channel.guild.members.get(message.author.id).clientStatus;
        let user = msg.mentions[0] || msg.channel.guild.members.find(x => x.username.toLowerCase() == args.join(' ').toLowerCase()) || this.rice.users.find(x => x.id == args[0]) || this.rice.users.find(x => x.username.toLowerCase() + "#" + x.discriminator == args.join(' ').toLowerCase()) || msg.author;
        let join_time = Date.now() - msg.channel.guild.members.find(x => x.id == user.id).joinedAt;
        let create_time = Date.now() - user.createdAt;

        let basestatus = msg.channel.guild.members.get(user.id);
        let status = basestatus.clientStatus;
        let game = basestatus.game;

        const embed = {
            title: `Info on ${user.username}#${user.discriminator}`,
            description: `<@${user.id}>\nId: ${user.id}\nUsername: ${user.username}\nTag: #${user.discriminator}`,
            thumbnail:{ url: user.avatarURL },
            fields: [],
            color: 0xFFFFFd,
        }
        embed.fields.push({name: 'Joined', value: `${Math.floor(join_time / 86400000)} Days ${Math.floor((join_time / (1000*60*60)) % 24)} Hours ${Math.floor((join_time / (1000*60)) % 60)} Minutes ${Math.floor((join_time / (1000) % 60))} Seconds`, inline: true})
        embed.fields.push({name: 'Created', value: `${Math.floor(create_time / 86400000)} Days ${Math.floor((create_time / (1000*60*60)) % 24)} Hours ${Math.floor((create_time / (1000*60)) % 60)} Minutes ${Math.floor((create_time / (1000) % 60))} Seconds`, inline: true})
        embed.fields.push({name: `Bot`, value: user.bot, inline: true})
        
        if(status){
            try{
                embed.fields.push({name: `Web status`, value: status.web, inline: true})
                embed.fields.push({name: `Desktop status`, value: status.desktop, inline: true})
                embed.fields.push({name: `Mobile status`, value: status.mobile, inline: true})
            }catch (e){}
        }
        if(game){
            try{
                let game_create = Date.now() - game.created_at;
                if (game.name) embed.fields.push({name: `Status name`, value: game.name, inline: true})
                if (game.state) embed.fields.push({name: `Status state`, value: game.state, inline: true})
                if (game.game_create) embed.fields.push({name: `Status create`, value: `${Math.floor(game_create / 86400000)} Days ${Math.floor((game_create / (1000*60*60)) % 24)} Hours ${Math.floor((game_create / (1000*60)) % 60)} Minutes ${Math.floor((game_create / (1000) % 60))} Seconds`, inline: false})
            }catch (e){}
           
        }

        msg.channel.send({embed: embed})
        
    }
}


module.exports = Ustats;