const mongoose = require('mongoose');

const connectDB = async (url) => {
    try{
        const conn = await mongoose.connect(url);

        if(!conn){
            console.log('Connection Failed');
        }

        console.log('MongoDB connected');
    }catch(error){
        console.log('Connection error : ', error.message);
    }
};

module.exports = connectDB;