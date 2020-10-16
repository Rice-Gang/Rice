const Command = require('../../core/Command');

const Embed = require('../../core/MessageEmbed');
const Guild = require('../../helpers/models/Guild');

class Removecase extends Command {
    constructor(rice) {
        super(rice, {
            name: 'remove-case',
            category: 'Moderation',
            aliases: ['rc'],
            memberPerms: ['manageMessages'],
        });
    }

    async run(message, args, data) {
        if (!args[0]) {
            return message.channel.sendError('Provide a valid case number.');
        }
        if (!parseInt(args[0])) {
            return message.channel.sendError('The case must be a number.');
        }

        let found = await this.rice.resolveCase(message.channel.guild.id, args[0]);
        if (!found) {
            return  message.channel.sendError(`That case wasn't found in my database.`);
        }
        else {
            await this.rice.removeCase(message.channel.guild.id, args[0]);
        }
        // const embed = {
        //     color: 0xFFFFFd,
        //     author: {
        //         name: mod,
        //         icon_url: this.rice.users.get(caseFound.Mod).dynamicAvatarURL('png')
        //     },
        //     description: `**Warned By**: ${mod}\n**Target**: ${target}\n**Reason**: ${caseFound.Reason}`,
        //     timestamp: caseFound.Date,
        //     footer: {
        //         text: 'Add --all at the end to view all warns in this server.'
        //     }
        // };

        //message.channel.sendSuccess(` `);

    }
}
module.exports = Removecase;