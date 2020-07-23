const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connecting the DB
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database)
});

//On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
});

//Assigning the App variable to express
const app = express();

//Assigning a route to the users variable
const users = require('./routes/users')

//Assigning the port
const port = 3000;

//Cors middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Use /users for all of our users routes
app.use('/users', users)

//Set the static folder
app.use(express.static(path.join(__dirname, '/public')))

//Start Server
app.listen(port, () => {
    console.log("Server started on port " + port)
});

//Index route
app.get('/', (req, res, next) => {
    res.send('Invalid endpoint.')
});
