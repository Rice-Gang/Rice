const { Client, Collection } = require('eris');

const Guild = require('../helpers/models/Guild');

class Rice extends Client {
    constructor(token, options) {
        super(token, options);

        this.commands = new Collection();
        this.aliases = new Collection();

        this.snipes = new Collection();
        this.cooldown = new Set()
    }

    setupCommand(cmdPath, cmdName) {
        try {
            const props = new (require(`.${cmdPath}/${cmdName}`))(this);
            console.log(`Command loaded ${props.help.name}`);
            props.config.location = cmdPath;
            if (props.init) {
                props.init();
            }
            this.commands.set(props.help.name, props);
            props.help.aliases.forEach((a) => {
                this.aliases.set(a, props.help.name);
            });
            return false;
        } catch (err) {
            return `Command not loaded: ${cmdName} - ${err}`;
        }
    }

    async guild(guildID) {
        const guild = await Guild.findOne({ id: guildID });
        if (!guild) {
            const newData = new Guild({
                id: guildID
            });
            newData.save();
            return newData;
        } else {
            return guild;
        }
    }

    async warn(target, message, reason) {
        if (!target) throw new Error(`No target id for warn specified.`);
        if (!message) throw new Error(`No Message of warn specified.`);
        if (!reason) throw new Error(`No Reason for the warn provided.`);
        const data = await Guild.findOne({ id: message.guild.id });
        const warnArray = data.warns;
        const warnCase = Math.max.apply(Math, warnArray.map(function (o) { return o.Case; }));
        warnArray.push({ User: target, Mod: message.author.id, Reason: reason, Date: new Date(), Case: warnArray + 1 || 1 });
        data.warns = warnArray;
        await data.save();
        let caseNum = warnCase;
        if (caseNum == -Infinity) caseNum = 1;
        else caseNum = warnCase + 1
        return caseNum;
    }

}

module.exports = Rice;