const Command = require("../../core/Command");

class Test extends Command {
    constructor(rice) {
        super(rice, {
            name: "test",
            category: "Misc",
            botPerms: ["sendMessages"],
            memberPerms: ["sendMessages"],
            description: "simple test command for bot activity",
            usage: "No usage"
        });
    }

    async run(message, args) {
        return message.author.getDMChannel().then(x => x.createMessage("Test Command Works!"));
    }
}

module.exports = Test;
