const Command = require('../../core/Command');

class Mute extends Command {
    constructor(rice) {
        super(rice, {
            name: 'mute',
            category: 'Moderation',
            botPerms: [''],
            memberPerms: [],
            description: ''
        });
    }

    async run(message, args) {
        
    }
}

module.exports = Mute;