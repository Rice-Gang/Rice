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