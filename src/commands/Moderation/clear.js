const Command = require('../../core/Command');

class Clear extends Command {
    constructor(rice) {
        super(rice, {
            name: 'clear',
            category: 'Moderation',
            botPerms: ['manageMessages'],
            memberPerms: ['manageMessages'],
            description: 'Clear messages in a channel'
        });
    }

    async run(msg, args) {
        const authorTag = `${msg.author.username}#${msg.author.discriminator}`;
        let amout = args[0]
        if(!amout) return msg.channel.send('Please give me a number')
        if (isNaN(amout) || parseInt(amout) <= 0) {
            return msg.channel.createMessage(`${amout} is not a number`).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            })
        }

        let delamout;
        if (parseInt(amout) > 300){
            delamout = 3000
        }else if(parseInt(amout) <= 3){
            delamout = 3
        }else{
            delamout = amout + 1
        }
        let no_del = await msg.channel.send('<a:loading:762935750203277322> Deleting messages')
        let filter = x => x.id != no_del.id && !x.pinned;
        await msg.channel.purge(delamout, filter)
        no_del.edit(`Messages cleared, By ${authorTag}`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 3000);
        })

    }
}

module.exports = Clear;