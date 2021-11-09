require('dotenv').config()
const mongoose = require('mongoose');

const initDatabase = (url = process.env.DB_URL) => {
    const appName = 'saf';
    const connect = mongoose.connect(url, {
        appName,
        autoCreate: true,
        dbName: appName,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        bufferCommands: false,
    }, (err, res) =>
        err
            ? console.error(err)
            : console.log(`DB is connected on url: ${url}`)
    );
    return connect;
}

module.exports = {
    initDatabase
}