const mongoose = require('mongoose');

const Guild = new mongoose.Schema({

    id: { type: String },
    
    warns: { type: Array, default: [] },
});

module.exports = mongoose.model('Guild', Guild);
