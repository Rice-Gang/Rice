const Command = require('../../core/Command');
const fetch = require('node-fetch')
const got = require('got')

class Ball extends Command {
    constructor(rice) {
        super(rice, {
            name: '8ball',
            category: 'Fun',
            botPerms: ['attachFiles'],
            memberPerms: [],
            description: '8ball'
        });
    }

    async run(msg, args) {
        msg.channel.sendTyping()
        got('https://nekos.life/api/v2/8ball').then(r => {
            (async () => {
                let content = JSON.parse(r.body);
                let res = await fetch(content.url)
                let img = await res.buffer()
                msg.channel.send('', {file: img, name: '8ball.png'})
            })()
            
        })
        
    }
}

module.exports = Ball;