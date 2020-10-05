require('dotenv').config();

const Rice = require('./core/Rice');

const mongoose = require('mongoose');

const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

const info = require(__dirname + '/config.json')
const rice = new Rice(info.token, {
    allowedMentions: []
});

const setup = async () => {

    const dirs = await readdir(__dirname + `/commands/`);
    console.log(`${dirs.length} categories loaded.`);
    dirs.forEach(async (dir) => {
        const commands = await readdir(__dirname + `/commands/${dir}/`);
        commands.filter((cmd) => cmd.split('.').pop() === 'js').forEach((cmd) => {
            const response = rice.setupCommand(`./commands/${dir}`, cmd);
            if (response) {
                console.log(response);
            }
        });
    });

    const events = await readdir(__dirname + '/events');
    console.log(`${events.length} events loading.`);
    events.forEach((evt) => {
        const evtName = evt.split('.')[0];
        console.log(`Event loaded ${evtName}`);
        const event = new (require(`./events/${evt}`))(rice);
        rice.on(evtName, (...args) => event.run(...args));
        delete require.cache[require.resolve(__dirname + `/events/${evt}`)];
    });

    rice.mongoose = require('./utils/mongoose');
    await rice.mongoose.init();
}

setup();

rice.connect();