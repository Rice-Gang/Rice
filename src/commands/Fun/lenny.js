const Command = require('../../core/Command');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: 'lenny',
            category: 'Fun',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Send a simple lenny face.'
        });
    }

    async run(message, args) {

        return message.channel.send('( ͡° ͜ʖ ͡°)')
    }
}

module.exports = lenny;