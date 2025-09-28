const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/sheetserver').then(()=>{
        console.log("connected to Mongo, sheetserver collectaion");
    });
};

module.exports = connectDB;