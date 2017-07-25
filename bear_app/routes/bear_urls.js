var Router = require('express').Router,
    BearCRUD = require('../utils/bear_crud');

/*
 *  GET http://localhost:8080/api/bears
 *  POST http://localhost:8000/api/bears
 *  GET http://localhost:8080/api/bears/:bear_id
 *  PATCH http://localhost:8080/api/bears/:bear_id
 *  DELETE http://localhost:8080/api/bears/:bear_id
 */

module.exports = Router()
.get('/bears', BearCRUD.getAllBears)
.post('/bears', BearCRUD.createBear)
.get('/bears/:id', BearCRUD.getOneBear)
.patch('/bears/:id', BearCRUD.updateBear)
.delete('/bears/:id', BearCRUD.deleteBear);
