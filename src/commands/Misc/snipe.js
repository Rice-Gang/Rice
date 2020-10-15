const Command = require("../../core/Command");

class Snipe extends Command {
    constructor(rice) {
        super(rice, {
            name: "snipe",
            description: "View the last 10 deleted messages in a channel.",
            category: "Misc",
            aliases: ["sniper"],
            usage: "snipe <1 - 10>"
        });
    }

    async run(message, args) {

        const snipes = this.rice.snipes.get(message.channel.id) || [];

        const msg = snipes[args[0] - 1 || 0];

        if (!msg) {
            return message.channel.sendError(`There are no recently deleted messages in <#${message.channel.id}>`)
        }

        if (message.content.includes("--mass")) {
            const embed = {
                color: (Math.random() * (1 << 24)) | 0,
                fields: []
            };

            const msgs = snipes.slice(0, 10);

            msgs.forEach((snipe) => {
                embed.fields.push({ name: snipe.tag, value: snipe.content, inline: false });
            });

            message.channel.createMessage({ embed });

        } else {

            const embed = {
                color: (Math.random() * (1 << 24)) | 0,
                author: {
                    name: `${msg.tag} | ${message.channel.name}`,
                    icon_url: msg.avatar
                },
                description: msg.content.length > 1950 ? `${msg.content.substr(0, 1950)}...` : msg.content || "",
                image: {
                    url: null
                },
                footer: {
                    text: "Tip: Add --mass at the end of the command to see bulk snipes!"
                }
            }

            return message.channel.createMessage({ embed });
        }
    }
}

module.exports = Snipe;