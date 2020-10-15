const Command = require("../../core/Command");
var penis = ["8D", "8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D", "8==========D"];

class pp extends Command {
    constructor(rice) {
        super(rice, {
            name: "pp",
            category: "Fun",
            botPerms: ["sendMessages"],
            aliases: ["penis"],
            description: "Shows a user pp size"
        });
    }

    
    async run(message, args) {
        var randomIndex = Math.floor(Math.random() * penis.length); 

        const member = message.mentions[0];
        const author = message.author;

        if (!args[0]) {
            message.channel.send(`<@${message.author.id}>"s pp size is: ` + penis[randomIndex])
        }
        else {
            message.channel.send(`<@${message.member.id}>"s pp size is: ` + penis[randomIndex])
        }
    }
}

module.exports = pp;