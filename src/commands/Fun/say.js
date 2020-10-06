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
        const sayMessage = args.join(" ");

        message.channel.send({ embed: {description: `sayMessage`} });

    }
}

module.exports = say;