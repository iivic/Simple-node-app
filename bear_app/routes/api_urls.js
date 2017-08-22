let Router = require('express').Router,
    db = require('../models/db');

/*
 *  GET http://localhost:8000/api/bears
 *  POST http://localhost:8000/api/bears
 *  GET http://localhost:8000/api/bears/:bear_id
 *  PATCH http://localhost:8000/api/bears/:bear_id
 *  DELETE http://localhost:8000/api/bears/:bear_id
 */

createBear = (req, res) => {
    db.Bear.create(req.body)
    .then(result => res.json(result));
};

getAllBears = (_, res) => {
    db.Bear.getAll()
    .then(result => res.json(result));
};

getOneBear = (req, res) => {
    db.Bear.getOne(req.params)
    .then(result => res.json(result));
};

updateBear = (req, res) => {
    db.Bear.update(req.params, req.body)
    .then(result => res.json(result));
};

deleteBear = (req, res) => {
    db.Bear.delete(req.params)
    .then(result => res.json(result));
};

module.exports = Router()
.get('/bears', getAllBears)
.post('/bears', createBear)
.get('/bears/:id', getOneBear)
.patch('/bears/:id', updateBear)
.delete('/bears/:id', deleteBear);
