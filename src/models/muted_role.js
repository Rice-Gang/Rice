const mongoose = require('mongoose');

const Muted_role = new mongoose.Schema({
    roleID: {
        type: String
    },
    guildID: String,
})
module.exports = mongoose.model('muted_roles', Muted_role)