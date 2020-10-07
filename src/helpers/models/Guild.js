const mongoose = require('mongoose');

const Guild = new mongoose.Schema({

    id: { type: String },

    prefix: { type: String, default: 'rice ' },

    muteRole: { type: String, default: ''},

    logID: { type: String, default: ''},

    autorole: { type: String, default: 'none' },

    warns: { type: Array, default: [] },
    infractionCount: { type: Number, default: 0 },

});

module.exports = mongoose.model('Guild', Guild);
