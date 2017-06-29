require('dotenv').config();

var Bear = require('../models/bear'),
    express = require('express'),
    router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8000/api)
router.get('/', function(req, res) {
    res.json({message: 'Hooray! Welcome to our api!'});
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8000/api/bears)
    .post(function(req, res) {
        new Bear({name: req.body.name})      // create a new instance of the Bear model
        .save()
        .then(function(bear) {
            res.json({message: 'Bear ' + bear.get('name') + ' saved!'});
        })
        .catch(function(err) {
            res.json(err);
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.fetchAll()
        .then(function(bears) {
            res.json(bears);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.where('id', req.params.bear_id)
        .fetch()
        .then(function(bear) {
            res.json(bear);
        })
        .catch(function(err) {
            res.json(err);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Bear.where('id', req.params.bear_id)
        .fetch()
        .then(function(bear) {
            bear.save({name: req.body.name})
            .then(function(bear) {
                res.json({message: 'Bear ' + bear.get('name') + ' updated!'});
            });
        })
        .catch(function(err) {
            res.json(err);
        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        new Bear({id: req.params.bear_id})
        .destroy({require: true})
        .then(function() {
            res.json({ message: 'Successfully deleted bear with id: ' + req.params.bear_id});
        })
        .catch(function(err) {
            res.json(err);
        });
    });

module.exports = router;
