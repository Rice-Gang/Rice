const Command = require('../../core/Command');
var flipcoin = ["heads", "tails"];

class fac extends Command {
    constructor(rice) {
        super(rice, {
            name: 'fac',
            category: 'Fun',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Flip A Coin'
        });
    }

    
    async run(message, args) {
        const Member = message.mentions;

        var randomIndex = Math.floor(Math.random() * flipcoin.length); 

        return message.channel.send(`<@${Member.user.id}> `+ flipcoin[randomIndex])
    }
}

module.exports = fac;