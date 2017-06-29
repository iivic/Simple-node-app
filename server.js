// server.js
require('dotenv').config();

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT,
    router = require('./bear_app/routes/bear_urls')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
