const Command = require('../../core/Command');

class Runner extends Command {
    constructor(rice) {
        super(rice, {
            name: 'runner',
            category: 'Misc',
            botPerms: [],
            memberPerms: [],
            description: 'input your test functions',
            usage: 'none'
        });
    }

    async run(message, args) {

        message.channel.send(message.author.mention+', hi')
        console.log(message.author)
    }
}

module.exports = Runner;