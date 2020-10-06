let config = {};
const GuildConfig = require('../models/guild');

module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(message) {

        const developers = ['699312838455459911', '423687326405885957', '329220047824486400', '521677874055479296', '373293135704621077', '695520751842885672']

        if (message.channel.guild === undefined) return;
        if (message.author.bot) return;

        let prefix = await GuildConfig.findOne({
            guildID: message.guild.id
        });
        if (!prefix) {
            const newGuild = new GuildConfig({
                guildID: message.guild.id,
                guildName: message.guild.name
            });
            await newGuild.save().catch(() => { });
            prefix = await GuildConfig.findOne({
                guildID: message.guild.id,
                guildName: message.guild.name
            });
        }
        const prefix = 'rice ';

        if (!message.content.toLowerCase().startsWith(prefix)) return;

        const msg = message.cleanContent.toLowerCase().split(' ');
        const cmd = msg[1];
        const args = msg.slice(2);

        const command = this.rice.commands.get(cmd) || this.rice.commands.get(this.rice.aliases.get(cmd));

        if (!command) return;

        if (command.help.category === 'Developer' && !developers.includes(message.author.id)) return;

        try {
            command.run(message, args, developers);
        } catch (err) {
            console.log(err);
        }
    }
}