const { Router } = require('express')
const BearApiController = require('../controllers/bear_api')

/*
 *  GET http://localhost:8000/api/bears
 *  POST http://localhost:8000/api/bears
 *  GET http://localhost:8000/api/bears/:bear_id
 *  PATCH http://localhost:8000/api/bears/:bear_id
 *  DELETE http://localhost:8000/api/bears/:bear_id
 */

module.exports = Router()
  .get('/bears', BearApiController.getAllBears)
  .post('/bears', BearApiController.createBear)
  .get('/bears/:id', BearApiController.getOneBear)
  .patch('/bears/:id', BearApiController.updateBear)
  .delete('/bears/:id', BearApiController.deleteBear)
