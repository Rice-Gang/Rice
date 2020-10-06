const Command = require('../../core/Command');
const got = require('got');
const { Message } = require('eris');

class Meme extends Command {
    constructor(rice) {
        super(rice, {
            name: 'meme',
            category: 'Fun',
            botPerms: [],
            memberPerms: [],
            description: 'Send a meme from reddit'
        });
    }

    async run(msg, args) {
        let subs = ['meme', 'memes', 'dankmeme', 'dankmemes']
        function getsub(items){
            return items[Math.floor(Math.random()*items.length)];
        }
        let sub = getsub(subs)
        msg.channel.send({
            embed: {
                title: '<a:loading:762935750203277322>',
                color: 0xFFFFFd
            }
        }).then(message => {
            got(`https://www.reddit.com/r/${sub}/random/.json`).then(r => {
                let content = JSON.parse(r.body);
                let memeTotal = content[0].data.children[0].data.ups;
                let memeratio = content[0].data.children[0].data.upvote_ratio
                let downs = Math.round((memeTotal * (1 - memeratio)) / ((2 * memeratio) + 1))
                try{
                    message.edit({
                        embed: {
                            title: content[0].data.children[0].data.title,
                            url: `https://reddit.com${content[0].data.children[0].data.permalink}`,
                            description: `:thumbsup: ${memeTotal}, :thumbsdown: ${downs}\nBy:  [${content[0].data.children[0].data.author}](https://www.reddit.com/user/${content[0].data.children[0].data.author}/)\n Sub:  [${content[0].data.children[0].data.subreddit_name_prefixed}](https://www.reddit.com/${content[0].data.children[0].data.subreddit_name_prefixed}/)`,
            
            
                            image: {
                                url: content[0].data.children[0].data.url
                            },
                            color: 0x2cff00
            
                        }
                    })
                }catch(err){
                    msg.channel.createMessage('Sorry looks like there was an err maybe try again')
                }
            })
            
        })
        

        //return message.channel.send('( ͡° ͜ʖ ͡°)')
    }
}

module.exports = Meme;