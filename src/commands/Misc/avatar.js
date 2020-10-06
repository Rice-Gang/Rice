const Command = require('../../core/Command');

class Avatar extends Command {
    constructor(rice) {
        super(rice, {
            name: 'avatar',
            category: 'Misc',
            botPerms: ['embedLinks'],
            memberPerms: ['sendMessages'],
            description: 'shows a user\'s avatar'
        });
    }

    async run(message, args) {

        const member = message.member;
        const author = message.author;
      //  console.log(member || author)
               const embed = {
                    color: 0xFFFFFd,
                    title: "Avatar for: ",
                    field: member.mention || author.mention,
                    //image: member.avatar || author.avatar
                }
                message.channel.send({embed})
            
        
    }
}

module.exports = Avatar;