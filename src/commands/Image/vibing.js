const Command = require('../../core/Command');
const find = require('../../core/Image/find');
const imgedit = require('../../core/Image/imgedit')


class Vibing extends Command {
    constructor(rice) {
        super(rice, {
            name: 'vibing',
            category: 'Image',
            botPerms: ['attachFiles'],
            memberPerms: [],
            description: 'Sometimes you just need to vibe',
            usage: 'vibing [ user ]'
        });
    }

   
    async run(msg, args) {
        let lastimg = await find.find(msg, args, this.rice)
        if(lastimg == false) return msg.channel.sendError('I could not find a image in this channel')
        msg.channel.sendTyping()
        
        let file = await imgedit.vibeng(lastimg)
        msg.channel.send('', {file: file, name: 'vibing.png'})
    }
}

module.exports = Vibing;