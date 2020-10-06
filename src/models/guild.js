const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,    
    prefix: { type: String, required: false, default: 'rice '},
    muteRole: { type: String, required: false, default: ''}
})
module.exports = mongoose.model('Guild', guildSchema, 'guilds')