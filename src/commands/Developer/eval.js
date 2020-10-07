const { inspect } = require('util');

const fetch = require('node-fetch');

const Command = require('../../core/Command');

class Eval extends Command {
    constructor(rice) {
        super(rice, {
            name: 'eval',
            description: 'Evaluates some javascript code.',
            botPerms: ['embedLinks'],
            memberPerms: [],
            category: 'Developer'
        });
    }

    async run(message, args) {

        const client = this.rice,
            rice = this.rice;

        let input = args.join(' ');

        if (!args[0]) {
            return message.channel.sendError('You need to provide some code...')
        }

        const asynchr = input.includes('return') || input.includes('await');

        let result, evalTime;

        try {
            const before = Date.now();
            result = await eval(asynchr ? `(async() => {${input}})();` : input);
            evalTime = Date.now() - before;
            if (typeof result !== 'string') {
                result = inspect(result, {
                    depth: +!(inspect(result, { depth: 1 }).length > 1000)
                });
            }
        } catch (err) {
            result = err.message;
        }

        if (input.length + result.length > 994) {
            fetch('https://hasteb.in/documents', {
                method: 'POST',
                body: input + '\n\n' + result,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(res => res.json())
                .then(json => {
                    return message.channel.createMessage(`Eval exceeds 1k chars. View here: https://hasteb.in/${json.key}.js`)
                });
        } else {

            return message.channel.send({
                embed: {
                    fields: [
                        { name: 'Input', value: `\`\`\`${input}\`\`\`` },
                        { name: 'Output', value: `\`${result}\`` }
                    ],
                    footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '' },
                    color: 0xFFFFFd
                }
            });
        }
    }
}

module.exports = Eval;