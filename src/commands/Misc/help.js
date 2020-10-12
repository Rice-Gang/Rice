const Command = require("../../core/Command");
const Guild = require("../../helpers/models/Guild");

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: "help",
            category: "Misc",
            botPerms: ["sendMessages"],
            memberPerms: [],
            description: "View all commands."
        });
    }

    async run(message, args, developers) {

        if (args[0]) {
            let prefix = await Guild.findOne({ id: message.channel.guild.id });
            const cmd = this.rice.commands.get(args[0]) || this.rice.commands.get(this.rice.aliases.get(args[0]));

            if (!cmd) {
                return message.channel.sendError(`I couldn't find that command.`)
            }
            let inline = true;
            //console.log(cmd)
            const embed = {
                title: `Command \`${prefix.prefix}\`${cmd.help.name}`,
                fields: [],
                color: 0xFFFFFd
            }
            if (cmd.help.category)
                embed.fields.push(
                    {
                        name: "Category",
                        value: cmd.help.category || "None",
                        inline
                    })
            if (cmd.help.description)
                embed.fields.push(
                    {
                        name: "Description",
                        value: cmd.help.description || "None",
                        inline
                    })
            if (cmd.config.cooldown)
                embed.fields.push(
                    {
                        name: "Cooldown",
                        value: cmd.config.cooldown / 1000 + " seconds" || "None",
                        inline
                    })
            if (cmd.help.aliases)
                embed.fields.push(
                    {
                        name: "Aliases",
                        value: cmd.help.aliases.map(x => `\`${x}\``).join(", ") || "None"
                    })
            if (cmd.help.usage)
                embed.fields.push(
                    {
                        name: "Usage",
                        value: `\`${prefix.prefix}\`` + cmd.help.usage || "None",
                        inline
                    })
            if (cmd.config.botPerms)
                embed.fields.push(
                    {
                        name: "Bot Permissions",
                        value: cmd.config.botPerms.map(x => `\`${x}\``).join(", ") || "None",
                        inline
                    })
            if (cmd.config.memberPerms)
                embed.fields.push(
                    {
                        name: "Member Permissions",
                        value: cmd.config.memberPerms.map(x => `\`${x}\``).join(", ") || "None",
                        inline
                    })
            console.log(embed.fields)
            message.channel.send({ embed: embed });

        } else if (!args[0]) {

            const emojis = {
                "developer": "<:developer:762772547464724480>",
                "moderation": "🛠️",
                "misc": "ℹ️",
                "image": "📸",
                "config": "⚙️",
                "fun": "🤣",
                "info": "<:PeepoThink:763311088217096232>"
            };

            const categories = [];

            this.rice.commands.forEach((cmd) => {
                if (!categories.includes(cmd.help.category)) {
                    categories.push(cmd.help.category);
                }
            });

            const embed = {
                title: `My Commands [${this.rice.commands.size}]`,
                fields: [],
                color: 0xFFFFFd,
            };

            categories.sort().forEach((ct) => {
                const cmds = this.rice.commands.filter((cmd) => cmd.help.category === ct);
                embed.fields.push({ name: emojis[ct.toLowerCase()] + " " + ct, value: cmds.map((cmd) => `\`${cmd.help.name}\``).join(", ") })
            });

            message.channel.send({ embed });
        }
    }
}

module.exports = Help;
