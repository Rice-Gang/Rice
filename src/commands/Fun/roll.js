const Command = require('../../core/Command');

class Roll extends Command {
    constructor(rice) {
        super(rice, {
            name: 'roll',
            category: 'fun',
            botPerms: [],
            memberPerms: [],
            description: 'roll some dice'
        });
    }

    async run(message, args) {

        return message.channel.send('rolled a ' + Math.floor(Math.random() * 12) +5)
    }
}

module.exports = Roll;