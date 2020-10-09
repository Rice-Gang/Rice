const mongoose = require('mongoose');

const Level = new mongoose.Schema({

    userID: {type: String},

    guildID: {type: String},

    currXP: {type: Number, default: 0},

    toLevelUp: {type: Number},
    
    currLevel: {type: Number, default: 0}

});

module.exports = mongoose.model('Level', Level);
