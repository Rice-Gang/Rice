const Command = require('../../core/Command');


class KnockKnockJoke extends Command {
    constructor(rice) {
        super(rice, {
            name: 'randomjoke',
            aliases: ['rj', 'random', 'rjoke','knock-knock','knock'],
            category: 'Fun',
            botPerms: [],
            memberPerms: [],
            description: 'gives a random knock-knock joke',
            usage: 'rice knockknock'
        });
    }

    async run(message, args) {

        var jokes = [
            { name: 'Dozen', answer: 'anybody want to let me in?' },
            { name: 'Avenue', answer: 'knocked on this door before?' },
            { name: 'Ice Cream', answer: 'if you don\'t let me in!' },
            { name: 'Adore', answer: 'is between us. Open up!' },
            { name: 'Lettuce', answer: 'in. It\'s cold out here!' },
            { name: 'Bed', answer: 'you can not guess who I am.' },
            { name: 'Al', answer: 'give you a kiss if you open the door.' },
            { name: 'Olive', answer: 'you!' },
            { name: 'Abby', answer: 'birthday to you!' },
            { name: 'Rufus', answer: 'the most important part of your house.' },
            { name: 'Cheese', answer: 'a cute girl.' }
        ]
            var joke = jokes[Math.floor(Math.random() * jokes.length)]
            return message.channel.send(formatJoke(joke))
        
        function formatJoke(joke) {
            return [
                'Knock, knock.',
                'Who’s there?',
                joke.name + '.',
                joke.name + ' who?',
                joke.name + ' ' + joke.answer
            ].join('\n')
        }
        
    }
}

module.exports = KnockKnockJoke;