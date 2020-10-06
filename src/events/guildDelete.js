const GuildConfig = require('../models/guild');

module.exports = class {
    constructor(rice) {
        this.rice = rice;
    }

    async run(guild) {
        GuildConfig.findByIdAndDelete({
            guildID: guild.id
        }, (err, res) => {
            if (err) console.error(err)
            console.log('I have been removed from a server!\n'+res);
        });
    }
}