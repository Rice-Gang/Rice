const Command = require('../../core/Command');

class Test extends Command {
    constructor(rice) {
        super(rice, {
            name: 'test',
            category: 'Misc',
            botPerms: ['sendMessages'],
            memberPerms: ['sendMessages'],
            description: 'simple test command for bot activity',
            usage: 'No usage'
        });
    }

    async run(message, args) {

        const testEmbed = {
            title: 'Test',
            description: "command works",
            color: 0xFFFFFd,
            timestamp: new Date,
            footer: {
                text: this.rice.user.username,
                icon_url: this.rice.user.avatarURL
            }
        }
        return message.channel.send({embed: testEmbed})
    }
}

module.exports = Test;