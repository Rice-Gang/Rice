const Command = require("../../core/Command");

class Prefix extends Command {
    constructor(rice) {
        super(rice, {
            name: "prefix",
            category: "Config",
            botPerms: ["embedLinks"],
            memberPerms: ["manageGuild"],
            description: "Change your servers prefix",
            usage: `prefix <new prefix>`
        });
    }

    async run(message, args, data) {

        let prefix = args[0];
        
        if (!prefix) {
            return message.channel.sendError("You need to provide a new prefix.")
        }

        if (prefix.length > 15) {
            return message.channel.sendError("That prefix is too long, it has to be under 15 characters.")
        }
        
        data.guild.prefix = args[0];
        await data.guild.save();
        message.channel.sendSuccess(`The new prefix in ${message.channel.guild.name} has been set to \`${prefix + " "}\`, try \`${prefix + " "}help\`!`)

    }
}

module.exports = Prefix;