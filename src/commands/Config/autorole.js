const Command = require('../../core/Command');

class Autorole extends Command {
    constructor(client) {
        super(client, {
            name: 'autorole',
            aliases: ['ar'],
            description: 'Set the role that when a member joins, gets applied to them',
            category: 'Config',
        });
    }

    async run(message, args, data) {

        if (!['true', 'false', 'on', 'off', 'disable', 'enable'].includes(args[0])) {
            return message.channel.sendError(`You need to choose an option between \`true\`, \`false\` or \`view\``)
        }

        if (['true', 'on', 'enable'].includes(args[0])) {
            const role = message.channel.guild.roles.find(x => x.name === args.slice(1).join(' ')) || message.channel.guild.roles.get(args[0]);

            if (!role || !args[1]) {
                return message.channel.sendError('Provide a role name (cAsE sEnSeTiVe) or role ID.')
            }

            data.guild.autorole = role.id;
            await data.guild.save();

            return message.channel.sendSuccess(`Set the autorole in this guild to <@&${role.id}>`)

        } else if (['false', 'off', 'disable'].includes(args[0])) {

            data.guild.autorole = 'none';
            await data.guild.save();

            return message.channel.sendSuccess(`Disabled autorole in this guild.`)

        } else if (args[0] === 'view') {

            if (data.guild.autorole === 'none') {
                return message.channel.sendError('This guild has no autorole set.')
            }

            message.channel.createMessage({
                embed: {
                    color: (Math.random() * (1 << 24)) | 0,
                    description: `This guilds current autorole is <@&${data.guild.autorole}>`
                }
            });
        }
    }
}

module.exports = Autorole;