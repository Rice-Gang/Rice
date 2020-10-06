const Command = require('../../core/Command');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: 'help',
            category: 'Misc',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'View all commands.'
        });
    }

    async run(message, args, developers) {

        if (args[0]) {

            const cmd = this.rice.commands.get(args[0]) || this.rice.commands.get(this.rice.aliases.get(args[0]));

            if (!cmd) {
                return message.channel.sendError(`I couldn't find that command.`)
            }

           const embed = {
               author: {
                   name: cmd.name
               },
               fields: [
                   { name: 'Category', value: cmd.help.category },
                   { name: 'Description', value: cmd.help.description },
                   { name: 'Cooldown', value: cmd.config.cooldown / 1000 + 'seconds' },
                   { name: 'Aliases', value: cmd.config.aliases.map(x => `\`${x}\``).join(', ') },
                   { name: 'Usage', value: cmd.config.usage },
                   { name: 'Member Permissions', value: cmd.config.memberPerms.map(x => `\`${x}\``).join(', ') },
                   { name: 'Bot Permissions', value: cmd.config.botPerms.map(x => `\`${x}\``).join(', ') },
               ]
           }

           message.channel.send({ embed });

        } else if (!args[0]) {

            const emojis = {
                'developer': '<:developer:762772547464724480>',
                'moderation': '🛠️',
                'misc': 'ℹ️',
                'image': '📸',
                'config': '⚙️',
                'fun': '🤣'
            };
    
            const categories = [];
    
            this.rice.commands.forEach((cmd) => {
                if (!categories.includes(cmd.help.category)) {
                    categories.push(cmd.help.category);
                }
            });
    
            const embed = {
                fields: []
            };
    
            categories.sort().forEach((ct) => {
                const cmds = this.rice.commands.filter((cmd) => cmd.help.category === ct);
                embed.fields.push({ name: emojis[ct.toLowerCase()] + ' ' + ct, value: cmds.map((cmd) => `\`${cmd.help.name}\``).join(' ') })
            });
    
            message.channel.send({ embed });
        }
    }
}

module.exports = Help;