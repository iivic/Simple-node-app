const Bear = require('../models/bear')

module.exports = { createBear, getAllBears, getOneBear, updateBear, deleteBear }

function createBear (req, res) {
  Bear.create(req.body)
    .then(result => res.json(result))
}

function getAllBears (_, res) {
  Bear.getAll()
    .then(result => res.json(result))
}

function getOneBear (req, res) {
  Bear.getOne(req.params)
    .then(result => res.json(result))
}

function updateBear (req, res) {
  Bear.update(req.params, req.body)
    .then(result => res.json(result))
}

function deleteBear (req, res) {
  Bear.where(req.params).fetch()
    .then(bear => bear.delete())
    .then(() => res.json('Deleted bear!'))
}
