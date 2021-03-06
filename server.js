// BASE SETUP
// ======================================

// CALL THE PACKAGES ==============================
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan') // used to see reuqests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 3000; // set the port for our app
var config = require('./config');
var path = require('path');
var passport = require('passport');
var session = require("express-session");

/// connect to our database
mongoose.connect(config.database);

// APP CONFIGURATION -------------------------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize express session and passport session
app.use(session({
  secret: 'terribly bad secret', // TODO: Change
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// set static files location
//used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
var apiRoutes = require('./app/routes/api')(app, express);
var userRoutes = require('./app/routes/users')(app, express);
var authRoutes = require("./app/routes/auth")(app, express);
// all of our routes will be prefixed with /api
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// =======================================================


// MAIN CATCHALL ROUTE
// SEND USERS TO FROTNEND
// has to be registerd after API ROUTES
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



//REGISTER OUR ROUTES-------------------------------------




// START THE server
// =================================
app.listen(config.port);
console.log("Magic happens on port " + config.port);
