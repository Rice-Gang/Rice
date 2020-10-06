const Command = require('../../core/Command');

class say extends Command {
    constructor(rice) {
        super(rice, {
            name: 'say',
            category: 'Fun',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Say a message'
        });
    }

    
    async run(message, args) {

        message.channel.send(`${args.join(' ')} \n\n - ${message.author.username}#${message.author.discriminator}`)
    }
}

module.exports = say;