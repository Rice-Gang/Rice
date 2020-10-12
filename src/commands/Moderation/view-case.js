const Command = require("../../core/Command");

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
            };
            message.channel.send({ embed: embed }); 
        }
    }
}

module.exports = Viewcase;