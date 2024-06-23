const express = require("express")
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
require('dotenv').config();

//import the router files 
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');

const port = process.env.PORT || 4000;

//Middleware function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();    //Move on to the next phase 
}

app.use(logRequest);

app.get('/',function(req, res){
    res.send("Welcome to our Hotel")
})

app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes);

app.listen(port, () => {
    console.log("Server is listening on port 3000")
});
