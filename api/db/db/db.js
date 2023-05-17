const mongoose = require('mongoose');
const {DBHOST, DBPORT, DBNAME} = require('../../config/config');

module.exports = function (resolve, reject) {
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    mongoose.set('strictQuery', true);
    mongoose.connection.once('open', () => {
        resolve();
    })
    
    mongoose.connection.on('error', (err) => {
        if (typeof reject === 'function') reject();
        else {
            console.log('failed to connect the localhost to MongoDB server application');
        }
    })
    
    mongoose.connection.once('close', () => {
        
    })
}

