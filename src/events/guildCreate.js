const GuildConfig = require('../models/guild');

module.exports = class {
    constructor(rice, guild) {
        this.rice = rice;
        this.guild = guild;
    }

    async run(rice, guild) {
        guild = new GuildConfig({
            guildID: guild.id,
            guildName: guild.name,
            prefix: 'rice '
        }, (res, err) => {
            guild.save()
            console.log('I have joined a new guild\n' + res)
            if (err) console.error(err)
        });


    }
}