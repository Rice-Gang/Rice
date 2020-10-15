module.exports = class Command {
    constructor(rice, {
        name = "",
        aliases = new Array(),
        botPerms = new Array(),
        memberPerms = new Array(),
        cooldown = 3000,
        category = "",
        description = "",
        usage = "",
    }) {
        this.rice = rice;
        this.config = { memberPerms, botPerms, cooldown };
        this.help = { name, category, aliases, description, usage };
    }
};
