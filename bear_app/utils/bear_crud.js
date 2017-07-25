var Bear = require('../models/bear');

module.exports.createBear = function(req, res) {
    new Bear(req.body)
    .save()
    .then(function(bear) {
        res.json({response: bear});
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports.getAllBears = function(_, res) {
    Bear.fetchAll()
    .then(function(bears) {
        res.json({response: bears});
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports.getOneBear = function(req, res) {
    Bear.where(req.params)
    .fetch()
    .then(function(bear) {
        res.json({response: bear});
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports.updateBear = function(req, res) {
    new Bear(req.params)
    .save(req.body)
    .then(function(bear) {
        res.json({response: bear});
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports.deleteBear = function(req, res) {
    new Bear(req.params)
    .destroy({require: true})
    .then(function() {
        res.json({response: 'Successfully deleted bear.'});
    })
    .catch(function(err) {
        res.json(err);
    });
};
