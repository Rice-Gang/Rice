const Command = require("../../core/Command");

class Viewcase extends Command {
    constructor(client) {
        super(client, {
            name: "view-case",
            category: "Moderation",
            aliases: ['vc'],
            memberPerms: ["manageMessages"],
        });
    }

    async run(message, args, data) {
        
    }
}

module.exports = Viewcase;