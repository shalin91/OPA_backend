const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://barodaweb:Barodaweb-mongo2022@cluster0.jruibih.mongodb.net/OPA_database?retryWrites=true&w=majority").then(()=>{
        console.log("connection successful"); 
    })
}

module.exports = connectToMongo;