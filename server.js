const express = require("express")
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
require('dotenv').config();
const passport = require('./auth.js');


//import the router files 
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');
const Person = require("./models/Persons");

const port = process.env.PORT || 4000;

//Middleware function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();    //Move on to the next phase 
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false});

app.get('/', function(req, res){
    res.send("Welcome to our Hotel")
})

app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuItemsRoutes);

app.listen(port, () => {
    console.log("Server is listening on port 3000")
});
