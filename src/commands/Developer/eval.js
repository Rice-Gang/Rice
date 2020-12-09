const { inspect } = require("util");

const fetch = require("node-fetch");

const Command = require("../../core/Command");

class Eval extends Command {
    constructor(rice) {
        super(rice, {
            name: "eval",
            description: "Evaluates some javascript code.",
            botPerms: ["embedLinks"],
            category: "Developer"
        });
    }

    async run(message, args, data, cleanArgs) {

        const client = this.rice,
            rice = this.rice;


        let input = cleanArgs.join(" ");

        if (!args[0]) {
            return message.channel.sendError("You need to provide some code...")
        }

        if (input.includes("token")) return message.channel.sendError("good try buddy");

        const asynchr = input.includes("return") || input.includes("await");

        let result, evalTime;

        try {
            const before = Date.now();
            result = await eval(asynchr ? `(async() => {${input}})();` : input);
            evalTime = Date.now() - before;
            if (typeof result !== "string") {
                result = this.clean(inspect(result, {
                    depth: +!(inspect(result, { depth: 1 }).length > 1000)
                }));
            }
        } catch (err) {
            result = err.message;
        }

        if (input.length + result.length > 994) {
            fetch("https://hasteb.in/documents", {
                method: "POST",
                body: input + "\n\n" + result,
                headers: {
                    "Content-Type": "text/plain"
                }
            }).then(res => res.json())
                .then(json => {
                    return message.channel.createMessage(`Eval exceeds 1k chars. View here: https://hasteb.in/${json.key}.js`)
                });
        } else {

            return message.channel.send({
                embed: {
                    fields: [
                        { name: "Input", value: `\`\`\`${input}\`\`\`` },
                        { name: "Output", value: `\`${result}\`` }
                    ],
                    footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : "" },
                    color: 0xFFFFFd
                }
            });
        }
    }
    clean(text) {
        if (typeof text === 'string'){
            text = text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(this.rice.token || rice.token), '****')
        }
        return text;
    }
}

module.exports = Eval;