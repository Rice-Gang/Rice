const Command = require("../../core/Command");
const MessageEmbed = require("../../core/MessageEmbed");
const { MessageCollector } = require("eris-collector");

class customembed extends Command {
    constructor(rice) {
        super(rice, {
            name: "customembed",
            aliases: ["ce", "custom"],
            category: "Misc",
            botPerms: ["sendMessages"],
            memberPerms: ["sendMessages"],
            description: "create your own embed",
            usage: "customembed <args[0]=title(one word only)><args[1]=description>"
        });
    }

    async run(message, args) {
    
            const embed = new MessageEmbed()
                .setTitle(`${args[0]}.`)
                .setColor(0xFFFFFd)
                .setDescription(`${args.slice(1).join(" ")}`)
                .setThumbnail("https://i.imgur.com/wSTFkRM.png")
                .setTimestamp()
            
            message.channel.send({ embed: embed });
    }
}

module.exports = customembed;