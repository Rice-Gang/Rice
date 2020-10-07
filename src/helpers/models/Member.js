const mongoose = require('mongoose');

const Member = new mongoose.Schema({

    id: { type: String },
    
    warns: { type: Array, default: [] },
});

module.exports = mongoose.model('Member', Member);
