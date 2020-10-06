require('dotenv').config();

const mongoose = require('mongoose');

const info = require('../config.json')

module.exports.init = (rice) => {
    
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
        }

        mongoose.connect(process.env.mongo || info.mongo, dbOptions)
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully connected!');
        });

        mongoose.connection.on('err', (err) => {
            console.error(`Mongoose connection error: \n${err.stack}`);
            rice.executeWebhook(info.logid, info.logtoken, {
                username: 'Mongoose Error',
                embeds: {
                    title: 'Mongoose Error',
                    description: `Mongoose Connection (${mongoose.connection.host}) has disconnected.`
                }
            });
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    
    
}
