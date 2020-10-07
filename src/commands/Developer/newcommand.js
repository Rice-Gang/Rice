const Command = require('../../core/Command');

class Newcommmand extends Command {
    constructor(rice) {
        super(rice, {
            name: 'newcommand',
            category: 'Developer',
            botPerms: ['manageGuild'],
            memberPerms: ['manageGuild'],
            description: 'create new command'
        });
    }

    async run(message, args) {

        
        
    }
}

module.exports = Newcommmand;