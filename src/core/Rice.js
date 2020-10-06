const { Client, Collection } = require('eris');

const Guild = require('../helpers/models/Guild');

class Rice extends Client {
    constructor(token, options) {
        super(token, options);

        this.commands = new Collection();
        this.aliases = new Collection();

        this.snipes = new Collection();
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
    
}

module.exports = Rice;