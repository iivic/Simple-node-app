var app,
    bodyParser = require('body-parser'),
    dbConfig = require('./knexfile.js')[process.env.NODE_ENV]
    port = dbConfig.port,
    Router = require('./bear_app/routes/bear_urls');

app = require('express')()
.use(bodyParser.urlencoded({extended: true}))
.use(bodyParser.json())
.use('/api', Router)
.listen(port, function(err) {
    if (err) console.error('Error: Starting server failed,', err.message);
    console.log('Listening on port ' + port);
});
