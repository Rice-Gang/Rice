require('dotenv').config();

const Rice = require('./core/Rice');

const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

const rice = new Rice(process.env.TOKEN, {
    allowedMentions: []
});

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

    const events = await readdir('./events');
    console.log(`${events.length} events loading.`);
    events.forEach((evt) => {
        const evtName = evt.split('.')[0];
        console.log(`Event loaded ${evtName}`);
        const event = new (require(`./events/${evt}`))(rice);
        rice.on(evtName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${evt}`)];
    });

}

setup();

rice.connect();