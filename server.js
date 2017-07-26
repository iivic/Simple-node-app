require('dotenv').config();

var app,
    bodyParser = require('body-parser'),
    port = process.env.PORT,
    Router = require('./bear_app/routes/bear_urls');

app = require('express')()
.use(bodyParser.urlencoded({extended: true}))
.use(bodyParser.json())
.use('/api', Router)
.listen(port, function(err) {
    if (err) console.error('Error: Starting server failed,', err.message);
    console.log('Listening on port ' + port);
});
