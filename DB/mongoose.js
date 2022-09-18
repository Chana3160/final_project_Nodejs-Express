const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

class MongooseClass {

    constructor(){
    }

    async connect() {
        const url = process.env.CONNECTION_STRING ;
        await mongoose.connect(url);
        console.log(`we connected with mongoose`);
    };
}


module.exports = new MongooseClass();