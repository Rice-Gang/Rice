const Command = require('../../core/Command');
const MessageEmbed = require('../../core/MessageEmbed');
class Test extends Command {
    constructor(rice) {
        super(rice, {
            name: 'test',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Test Command'
        });
    }

    async run(message, args) {
        
        const Embed = new MessageEmbed()
        Embed.title = 'hello'
        Embed.color = 0xFFFFFd
        console.log(Embed);
        message.channel.send({embed: Embed});
    }
}

module.exports = Test;
