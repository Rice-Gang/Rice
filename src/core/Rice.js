const { Client, Collection } = require('eris');

class Rice extends Client {
    constructor(token, options) {
        super(token, options);

        this.commands = new Collection();
        this.aliases = new Collection();

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
    
}

module.exports = Rice;