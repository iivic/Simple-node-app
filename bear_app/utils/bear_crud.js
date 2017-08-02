let Bear = require('../models/bear');

module.exports.createBear = (req, res) => {
    new Bear(req.body)
    .save()
    .then(bear => res.json({response: bear}))
    .catch(err => res.send(err));
};

module.exports.getAllBears = (_, res) => {
    Bear.fetchAll()
    .then(bears => res.json({response: bears}))
    .catch(err => res.send(err));
};

module.exports.getOneBear = (req, res) => {
    Bear.where(req.params)
    .fetch()
    .then(bear => res.json({response: bear}))
    .catch(err => res.send(err));
};

module.exports.updateBear = (req, res) => {
    new Bear(req.params)
    .save(req.body)
    .then(bear => res.json({response: bear}))
    .catch(err => res.send(err));
};

module.exports.deleteBear = (req, res) => {
    new Bear(req.params)
    .destroy({require: true})
    .then(() => res.json({response: 'Successfully deleted bear.'}))
    .catch(err => res.json(err));
};
