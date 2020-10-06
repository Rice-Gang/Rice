const { inspect } = require('util');

const fetch = require('node-fetch');

const Command = require('../../core/Command');

class Eval extends Command {
    constructor(rice) {
        super(rice, {
            name: 'sendconfig',
            description: 'Will send you the config file for the bot',
            botPerms: ['sendMessages'],
            memberPerms: [],
            category: 'Developer'
        });
    }

    async run(msg, args) {
        let file = require('../../config.json')
        msg.channel.send('', {file: file, name: 'config.json'})
    }
}

module.exports = Eval;