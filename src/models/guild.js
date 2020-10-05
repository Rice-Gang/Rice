const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,
    guildName: String,
    prefix: String,
})
module.exports = mongoose.model('Guild', guildSchema, 'guilds')