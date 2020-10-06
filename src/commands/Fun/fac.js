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

        var randomIndex = Math.floor(Math.random() * flipcoin.length); 

        return message.channel.send(`<@${message.author.id}> `+ flipcoin[randomIndex])
    }
}

module.exports = fac;