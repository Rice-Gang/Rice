const Rice = require('./core/Rice');
const config = require('./config');

const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

const rice = new Rice(config.token);

const setup = async () => {

    const dirs = await readdir(`./commands/`);
    console.log(`${dirs.length} categories loaded.`);
    dirs.forEach(async (dir) => {
        const commands = await readdir(`./commands/${dir}/`);
        commands.filter((cmd) => cmd.split('.').pop() === 'js').forEach((cmd) => {
            const response = rice.setupCommand(`./commands/${dir}`, cmd);
            if (response) {
                console.log(response);
            }
        });
    });
}

setup();

rice.connect();