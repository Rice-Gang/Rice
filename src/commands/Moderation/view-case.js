const Command = require('../../core/Command');

const Embed = require('../../core/MessageEmbed');

class Viewcase extends Command {
    constructor(client) {
        super(client, {
            name: 'view-case',
            category: 'Moderation',
            aliases: ['vc'],
            memberPerms: ['manageMessages'],
            botPerms: []
        });
    }

    async run(message, args, data) {

        if (!args[0]) {
            return message.channel.sendError('Provide a valid case number.');
        }

        if (message.content.includes('--all')) {
            if (data.guild.warns.length < 1) {
                return message.channel.sendError('This guild has no warns.')
            }

            let page;
            let amount = 5 * parseInt(args[1] || 1);

            if (data.guild.warns.length <= 5) page = 1;
            if (data.guild.warns.length <= 10) page = 2;
            if (data.guild.warns.length <= 15) page = 3;
            if (data.guild.warns.length <= 20) page = 4;
            if (data.guild.warns.length <= 25) page = 5;
            if (data.guild.warns.length <= 30) page = 6;

            let array = data.guild.warns.map(x => `\`${x.Case}\` - ${this.rice.users.get(x.User).username}#${this.rice.users.get(x.User).discriminator}\n\n**Warned by**: ${this.rice.users.get(x.Mod).username}#${this.rice.users.get(x.Mod).discriminator}\n**Reason**: ${x.Reason}`);
            array = array.slice(amount - 5, amount);

            if (!array.length) {
                return message.channel.sendError('There are no warns for that page')
            }

            const embed = {
                title: `${message.channel.guild.name} Warns`,
                description: array.join('\n\n'),
                color: 0xFFFFFd,
                footer: {
                    text: `Page ${args[1] || 1} / ${page}`
                }
            };

            message.channel.send({ embed });
        }

        if (!message.content.includes('--all')) {
            const caseFound = await this.rice.resolveCase(message.channel.guild.id, args[0]);

        if (!caseFound) {
            return message.channel.sendError('That case doesn\'t exist.')
        } else {
            let mod;
            if (message.channel.guild.members.get(caseFound.Mod) || this.rice.users.get(caseFound.Mod)) {
                mod = `${this.rice.users.get(caseFound.Mod).username}#${this.rice.users.get(caseFound.Mod).discriminator}`;
            } else mod = `Moderator left, ID: ${caseFound.User}`;

            let target;
            if (message.channel.guild.members.get(caseFound.User) || this.rice.users.get(caseFound.User)) {
                target = `${this.rice.users.get(caseFound.User).username}#${this.rice.users.get(caseFound.User).discriminator}`;
            }

            const embed = {
                color: 0xFFFFFd,
                author: {
                    name: mod,
                    icon_url: this.rice.users.get(caseFound.Mod).dynamicAvatarURL('png')
                },
                description: `**Warned By**: ${mod}\n**Target**: ${target}\n**Reason**: ${caseFound.Reason}`,
                timestamp: caseFound.Date,
                footer: {
                    text: 'Add --all at the end to view all warns in this server.'
                }
            };

            message.channel.send({ embed });
        }
        }
    }
}

module.exports = Viewcase;
