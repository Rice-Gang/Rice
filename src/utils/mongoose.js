const mongoose = require('mongoose');

module.exports.init = () => {
    
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
        }

        mongoose.connect(`mongodb+srv://poweruser:mbrIoa6CEscAV6Cu@ricebot.5ifhs.azure.mongodb.net/Rice?retryWrites=true&w=majority`, dbOptions)
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully connected!');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    
    
}