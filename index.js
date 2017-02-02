//Setup
var express = require('express');
var app = express(); //get express going
var mongoose = require('mongoose'); //get mongoose going
var cfg = require('./config'); //load in our config.js

//Connect to MongoDB
mongoose.connect(cfg.dbUrl);

//Calls everything in routes.js
require('./routes.js')(app);

app.listen(cfg.listenPort);