const Command = require('../../core/Command');
const os = require('os')
const core = os.cpus()[0];


class Ustats extends Command {
    constructor(rice) {
        super(rice, {
            name: 'user-stats',
            aliases: ['ustats', 'whos', 'whois', 'user'],
            category: 'Info',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Shows info on a user',
            usage: `user-stats [ user ]`
        });
    }

    async run(msg, args) {

        let user = msg.mentions[0] || msg.channel.guild.members.find(x => x.username.toLowerCase() == args.join(' ').toLowerCase()) || this.rice.users.find(x => x.id == args[0]) || this.rice.users.find(x => x.username.toLowerCase() + "#" + x.discriminator == args.join(' ').toLowerCase()) || msg.author;
        let join_time = Date.now() - msg.channel.guild.members.find(x => x.id == user.id).joinedAt;
        let create_time = Date.now() - user.createdAt;

        msg.channel.send({
            embed: {
                title: `Info on ${user.username}#${user.discriminator}`,
                description: `<@${user.id}>\nId: ${user.id}, Username: ${user.username}, Tag: ${user.discriminator}`,
                thumbnail:{
                    url: user.avatarURL
                },
                fields:[
                   {
                       name: 'Joined',
                       value: `${Math.floor(join_time / 86400000)} Days ${Math.floor((join_time / (1000*60*60)) % 24)} Hours ${Math.floor((join_time / (1000*60)) % 60)} Minutes ${Math.floor((join_time / (1000) % 60))} Seconds`,
                       inline: true
                   },
                   {
                       name: `Created`,
                       value: `${Math.floor(create_time / 86400000)} Days ${Math.floor((create_time / (1000*60*60)) % 24)} Hours ${Math.floor((create_time / (1000*60)) % 60)} Minutes ${Math.floor((create_time / (1000) % 60))} Seconds`,
                       inline: true
                   },

                ],
                color: 0xFFFFFd,
            }
        })
    }
}
this.rice.guilds.forEach(c => {
    message.channel.send(c.name)
})


module.exports = Ustats;
