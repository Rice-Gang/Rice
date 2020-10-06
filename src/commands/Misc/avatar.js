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

        const member = message.mentions[0];
        const author = message.author;

        // console.log(author.username)




        if (!args[0]) {
            const authorembed = {
                color: 0xFFFFFd,
                title: "Your Avatar!",
                image: {
                    url: author.avatarURL
                }
            }
            message.channel.send({ embed: authorembed })
        }
        else {
            const mentionembed = {
                color: 0xFFFFFd,
                title: "Avatar for: \n" + member.username,
                image: {
                    url: member.avatarURL
                }
            }

            message.channel.send({ embed: mentionembed })
        }


    }
}

module.exports = Avatar;
