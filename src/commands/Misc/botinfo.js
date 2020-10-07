const Command = require('../../core/Command');

class Botinfo extends Command {
    constructor(rice) {
        super(rice, {
            name: 'botinfo',
            category: 'Misc',
            botPerms: ['sendMessages'],
            memberPerms: ['sendMessages'],
            description: 'gives info for current bot',
            usage:'botinfo'
        });
    }

    async run(message, args) {

        let inline = true;
        let b_icon = this.rice.user.avatarURL;
        let userAmount = this.rice.users.size;
        let serverAmount = this.rice.guilds.size;

        console.log(this.rice.guild())
    }
}

module.exports = Botinfo;