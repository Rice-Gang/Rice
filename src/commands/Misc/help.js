const { color } = require('jimp');
const Command = require('../../core/Command');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: 'help',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'View the help commands.'
        });
    }

    async run(message, args, developers) {

        

        const emojis = {
            'developer': '<:developer:762772547464724480>',
            'moderation': '🛠️',
            'misc': 'ℹ️',
            'fun': '🤣',
            'image': `<:JOY:762839719779500088>`,
            'config': '⚙️'
        };

        const categories = [];
        const allcmds = [];

        this.rice.commands.forEach((cmd) => {
            allcmds.push(cmd.help.name)
            if (!categories.includes(cmd.help.category)) {
                categories.push(cmd.help.category);
            }
        });
        if(args[0]){
            let cmd = args[0]
            if(allcmds.includes(cmd)){
                let command = this.rice.commands.get(cmd)
                let alli = command.help.aliases.join(', ')
                message.channel.send({
                    embed:{
                        title: command.help.name,
                        description: `aliases: ${alli || 'None'}\
                        \nCategory: ${command.help.category}\
                        \nDescription ${command.help.description}`,
                        color: 0xFFFFFd
                    }
                })
                return;
            }
        }
        
        


        

        const embed = {
            fields: [],
            color: 0xFFFFFd
        };

        categories.sort().forEach((ct) => {
            const cmds = this.rice.commands.filter((cmd) => cmd.help.category === ct);
            embed.fields.push({ name: emojis[ct.toLowerCase()] + ' ' + ct, value: cmds.map((cmd) => `\`${cmd.help.name}\``).join(' ') })
        });

        message.channel.send({ embed });
    }
}

module.exports = Help;