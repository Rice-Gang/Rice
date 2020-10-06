const mongoose = require('mongoose');

const Guild = new mongoose.Schema({

    id: { type: String },

    prefix: { type: String, default: 'rice ' },

});

module.exports = mongoose.model('Guild', Guild);