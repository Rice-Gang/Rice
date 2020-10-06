const Command = require('../../core/Command');

class Pong extends Command {
    constructor(rice) {
        super(rice, {
            name: 'ping',
            category: 'Fun',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Pong!'
        });
    }

    async run(message, args) {

        return message.channel.send('Pong!')
    }
}

module.exports = Pong;