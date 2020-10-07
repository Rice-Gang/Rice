const Command = require('../../core/Command');

class say extends Command {
    constructor(rice) {
        super(rice, {
            name: 'say',
            category: 'Fun',
            botPerms: ['sendMessages'],
            memberPerms: [],
            description: 'Say a message'
        });
    }

    
    async run(message, args) {

        const embed = {
            title: `${message.author.username}#${message.author.discriminator} says`,
            description:`${args.join(' ')}`,
            color: 0xFFFFFd,
            timestamp: new Date(),
            footer: {
                text: this.rice.user.username,
                icon_url: this.rice.user.avatarURL
            }
        }
        message.channel.send({embed: embed})
    }
}

module.exports = say;