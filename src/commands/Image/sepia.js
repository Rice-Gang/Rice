const Command = require('../../core/Command');
const find = require('../../core/Image/find');
const { sepia } = require('../../core/Image/imgedit');
const imgedit = require('../../core/Image/imgedit')


class Sepia extends Command {
    constructor(rice) {
        super(rice, {
            name: 'sepia',
            category: 'Image',
            botPerms: ['attachFiles'],
            memberPerms: [],
            description: 'Place a sepia filter over a image',
            usage: 'sepia [ user ]'
        });
    }

   
    async run(msg, args) {
        let lastimg = await find.find(msg, args, this.rice)
        if(lastimg == false) return msg.channel.sendError('I could not find a image in this channel')
        msg.channel.sendTyping()
        
        let file = await imgedit.sepia(lastimg)
        msg.channel.send('', {file: file, name: 'sepia.png'})
    }
}

module.exports = Sepia;