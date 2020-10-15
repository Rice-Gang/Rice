const Command = require("../../core/Command");

class Lenny extends Command {
    constructor(rice) {
        super(rice, {
            name: "lenny",
            category: "Fun",
            botPerms: ["sendMessages"],
            description: "Send a simple lenny face."
        });
    }

    async run(message, args) {

        return message.channel.send("( ͡° ͜ʖ ͡°)")
    }
}

module.exports = Lenny;