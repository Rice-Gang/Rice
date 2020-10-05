module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {

        if (message.channel.guild.id === undefined) return;

        const prefix = 'rice ';

        if (!message.content.startsWith(prefix)) return;

        const msg = message.cleanContent.split(' ');
        const cmd = msg[1];
        const args = msg.slice(2);

        const command = this.rice.commands.get(cmd) || this.rice.commands.get(this.rice.aliases.get(cmd));

        try {
            command.run(message, args);
        } catch (err) {
            console.log(err);
        }
    }
}