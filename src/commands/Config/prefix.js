const { color } = require('jimp');
const Command = require('../../core/Command');

class Help extends Command {
    constructor(rice) {
        super(rice, {
            name: 'set-prefix',
            category: 'Config',
            botPerms: ['embedLinks'],
            memberPerms: ['manageGuild'],
            description: 'View the help commands.'
        });
    }

    async run(message, args, developers) {

        

        
    }
}

module.exports = Help;