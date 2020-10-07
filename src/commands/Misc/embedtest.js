const Command = require('../../core/Command');
const MessageEmbed = require('../../core/MessageEmbed');
class EmbedTest extends Command {
    constructor(rice) {
        super(rice, {
            name: 'embedtest',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Test Command for the MessageEmbed class'
        });
    }

    async run(message, args) {
        //message.channel.send(message.member.user.avatarURL)
        const Embed = new MessageEmbed()
        Embed.setTitle('test')
        Embed.setColor(0xFFFFFd)
        //Embed.url = ''
        Embed.author={text: message.member.user.username} 
        Embed.setDescription('hello')
        Embed.thumbnail = {
            url: message.member.user.avatarURL
        }
        // //Embed.fields = [{ }]
        // Embed.image = {
        //    url: 
        // }
        //Embed.setFooter({name: })
        
        Embed.setTimestamp()
        
        console.log(Embed)
        message.channel.send({embed: Embed});
    }
}

module.exports = EmbedTest;
//,