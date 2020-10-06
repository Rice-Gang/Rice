module.exports = class Command {
    constructor(rice, {
        name = null,
        aliases = new Array(),
        botPerms = new Array(),
        memberPerms = new Array(),
        cooldown = 3000,
        category = 'Misc',
        description = 'No description',
    }) {
        this.rice = rice;
        this.config = { memberPerms, botPerms, cooldown };
        this.help = { name, category, aliases, description };
    }
};