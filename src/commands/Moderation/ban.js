const Command = require('../../core/Command');

class Ban extends Command {
    constructor(rice) {
        super(rice, {
            name: 'ban',
            category: 'Moderation',
            botPerms: [''],
            memberPerms: [],
            description: ''
        });
    }

    async run(message, args) {

        return message.channel.send('sup')
    }
}

module.exports = Ban