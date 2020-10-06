module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {

        const snipes = this.rice.snipes.get(message.channel.id) || [];

        snipes.unshift({
            tag: message.author.username + message.author.discriminator,
            avatar: message.author.avatarURL,
            content: message.content
        });

        snipes.splice(10);
        this.rice.snipes.set(message.channel.id, snipes);
    }
}