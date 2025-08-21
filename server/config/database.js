const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log('Error while connecting to MongoDB', err);
        process.exit(1);
    });
};
    