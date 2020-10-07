const Command = require('../../core/Command');

class Infractions extends Command {
    constructor(client) {
        super(client, {
            name: 'infractions',
            aliases: ['warns', 'warnings'],
            category: 'Moderation',
            botPerms: [],
            memberPerms: ['manageMessages']
        });
    }

    async run(message, args) {

        const user = message.mentions[0] || message.channel.guild.members.get(args[0]) || message.channel.guild.members.find(x => x.username === args[0]);

        if (!message.mentions[0] || !message.channel.guild.members.get(message.mentions[0].id)) {
            return message.channel.sendError('You need to provide a valid member to view their infractions.')
        }

        const member = await message.channel.guild.members.get(user.id);

        /**
         * TODO: ADD DYNAMIC PAGINATE
         */
        let number = 5 * parseInt(args[1]);
        let page;

        const data = await this.rice.member(user.id);

        if (data.warns.length <= 5) page = 1;
        else if (data.warns.length <= 10) page = 2;
        else if (data.warns.length <= 15) page = 3;
        else if (data.warns.length <= 20) page = 4;
        else if (data.warns.length <= 25) page = 5;
        else if (data.warns.length <= 30) page = 6;
        else if (data.warns.length <= 35) page = 7;
        else if (data.warns.length <= 40) page = 8;
        else if (data.warns.length <= 45) page = 9;
        else if (data.warns.length <= 50) page = 10;
        else if (data.warns.length <= 55) page = 11;
        else if (data.warns.length <= 60) page = 12;

        if (!args[1]) {
            number = 5;
        }

        const warns = data.warns.slice(number - 5, number);

        const embed = {
            author: {
                name: member.user.username + '#' + member.user.discriminator,
                icon_url: member.user.avatarURL
            },
            color: null,
            description: null,
            fields: [],
            footer: {
                text: null
            }
        };

        if (warns.length < 1) {
            embed.color = 0xff0000;
            embed.description = 'This user has no infractions.';
            embed.footer.text = ' ';
        } else {
            warns.forEach((s) => {
                embed.color = 0xd6d3c1;
                embed.fields.push({ name: this.firstLUC(s.typeOf) + ' | #' + s.case, value: 'Moderator', value: `<@!${s.moderator}> - ${s.reason}`, inline: false });
                embed.footer.text = `Page ${args[1] || 1} / ${page}`
            });
        }

        return message.channel.createMessage({ embed });
    }

    firstLUC(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = Infractions;