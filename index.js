/*
        _.---._    /\\
      ./'       "--`\//
    ./     Ethan    o \
   /./\  )______   \__ \
  ./  / /\ \   | \ \  \ \
     / /  \ \  | |\ \  \7
      "     "    "  "       
*/



//Setup
var express = require('express');
var app = express(); //get express going
var mongoose = require('mongoose'); //get mongoose going
var cfg = require('./config'); //load in our config.js
var bodyParser = require('body-parser'); //JSON body parser

//Connect to MongoDB
mongoose.connect(cfg.dbUrl);

//I think this will make it serve shit in the pages dir? no clue.
app.use(express.static('./')); 

//use the json body parser
app.use(bodyParser.json());

//Calls everything in routes.js
require('./routes.js')(app);

app.listen(cfg.listenPort);
console.log("Listening on port " + cfg.listenPort);