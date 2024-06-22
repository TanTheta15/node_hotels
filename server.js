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

app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes);

app.get('/', function(req, res){
    res.send("Welcome to our Hotel")
})

app.listen(port, () => {
    console.log("Server is listening on port 3000")
});
