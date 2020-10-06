const mongoose = require('mongoose');

const prexies = new mongoose.Schema({
    prefix: {
        type: String
    },
    guildID: String,
})
module.exports = mongoose.model('prexies', prexies)