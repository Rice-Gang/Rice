const Command = require('../../core/Command');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: 'help',
            category: 'Misc',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'View the help commands.'
        });
    }

    async run(message, args) {

        return message.channel.send('hello')
    }
}

module.exports = Help;