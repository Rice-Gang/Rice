const Command = require("../../core/Command");
const MessageEmbed = require('../../core/MessageEmbed')

class Viewcase extends Command {
    constructor(client) {
        super(client, {
            name: "view-case",
            category: "Moderation",
            aliases: ['vc'],
            memberPerms: ["manageMessages"],
            botPerms: []
        });
    }

    async run(message, args, data) {
        const tag = `${message.author.username}#${message.author.discriminator}`;
        if (!args[0]) return message.channel.send(`**${tag}**, Provide a valid case!`);
        else if (args[0] === '--all') {
            const guildFound = await this.rice.guild(message.guildID);
            if (guildFound.warns.length < 1)
                return message.channel.sendError('This guild has no warns.')
            }
            let page;
            let amount = 5 * parseInt(args[1] || 1);
            if (guildFound.warns.length <= 5) page = 1;
            else if (guildFound.warns.length <= 10) page = 2;
            else if (guildFound.warns.length <= 15) page = 3;
            else if (guildFound.warns.length <= 20) page = 4;
            const array = guildFound.warns.map(warn => `\`${warn.Case}\` - ${this.rice.users.get(warn.User).username}#${this.rice.users.get(warn.User).discriminator}\n\n**Warned By**: ${this.rice.users.get(warn.Mod).username}#${this.rice.users.get(warn.Mod).discriminator}\n**Reason**: ${warn.Reason}`);
            const allWarns = new MessageEmbed()
            .setTitle(`Warns`)
            .setDescription(`${array.join('\n\n')}`)
            .setColor(0xFFFFFd);
            message.channel.send({ embed: allWarns });
        }

        const caseFound = await this.rice.resolveCase(message.guildID, args[0]);

        if (caseFound == null) {
            return message.channel.send(`**${tag}**, That case doesn't exist`);
        } else {
            let warnedBy;
            if (message.channel.guild.members.get(caseFound.Mod) || this.rice.users.get(caseFound.Mod)) warnedBy = `${this.rice.users.get(caseFound.Mod).username}#${this.rice.users.get(caseFound.Mod).discriminator}`;
            else warnedBy = `Moderator left, ID: ${caseFound.Mod}`;
            
            let target;
            if (message.channel.guild.members.get(caseFound.User) || this.rice.users.get(caseFound.User)) target = `${this.rice.users.get(caseFound.User).username}#${this.rice.users.get(caseFound.User).discriminator}`;
            else target = `Target left, ID: ${caseFound.User}`;
            const embed = {
                color: 0xFFFFFd,
                author: {
                    name: warnedBy,
                    icon_url: this.rice.users.get(caseFound.Mod).dynamicAvatarURL('png') || undefined
                },
                description: `**Warned By:** ${warnedBy}\n**Target:** ${target}\n**Reason:** ${caseFound.Reason}`,
                timestamp: caseFound.Date,
                footer: {
                    text: 'Add --all at the end to view all warns in this server.'
                }
            };
            message.channel.send({ embed: embed }); 
        }
    }
}

module.exports = Viewcase;
