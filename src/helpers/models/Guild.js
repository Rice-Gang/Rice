const mongoose = require('mongoose');

const Guild = new mongoose.Schema({

    id: { type: String },

    prefix: { type: String, default: 'rice ' },

    muteRole: { type: String, default: ''},

    logID: { type: String, default: ''},

    autorole: { type: String, default: 'none' },
});

module.exports = mongoose.model('Guild', Guild);