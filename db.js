const mongoose = require("mongoose");

//Define the mongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'     //you can replace /hotels name at the end with your own database name

//Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

//get the default connection 
//Mongoose maintains a default connection object representing the mongoDB connection,
const db = mongoose.connection;

//Define event listener for database connection 
db.on('connected', () => {
    console.log("Connected to MongoDB server");
})

db.on('error', (err) => {
    console.log("MongoDB connection error", err);
})

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
})

//Export the database connection 
module.exports = db;