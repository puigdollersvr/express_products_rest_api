const mongoose = require('mongoose');
const CONFIG = require('../config');

const connection = null;
async function connect() {
    try {
        if (this.connection) return this.connection;
        await mongoose.connect(CONFIG.DB, {useUnifiedTopology: true,useNewUrlParser: true});
        connection => {
            this.connection = connection;
            //console.log('Connected to Database');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connection, connect }