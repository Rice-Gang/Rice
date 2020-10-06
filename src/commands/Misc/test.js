const Command = require('../../core/Command');
const MessageEmbed = require('../../core/MessageEmbed');
class Test extends Command {
    constructor(rice) {
        super(rice, {
            name: 'test',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'Rest Command'
        });
    }

    async run(message, args) {
        const Embed = new MessageEmbed()
        .setDescription
        message.channel.send(Embed);
    }
}

module.exports = Test;