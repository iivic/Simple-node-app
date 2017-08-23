let knex = require('../../knex')
let bookshelf = require('bookshelf')(knex)

let Bear = bookshelf.Model.extend({
  tableName: 'Bear',
  hasTimestamps: true
})

module.exports = Bear

module.exports.create = params => {
  return new Bear(params).save()
    .then(bear => bear)
    .catch(err => err)
}

module.exports.getAll = () => {
  return Bear.fetchAll()
    .then(bears => bears)
    .catch(err => err)
}

module.exports.getOne = params => {
  return Bear.where(params)
    .fetch()
    .then(bear => bear)
    .catch(err => err)
}

module.exports.update = (params, updatedParams) => {
  return new Bear(params)
    .save(updatedParams)
    .then(bear => bear)
    .catch(err => err)
}

module.exports.delete = params => {
  return new Bear(params)
    .destroy({require: true})
    .then(() => 'Successfully deleted bear.')
    .catch(err => err)
}

module.exports.isOriginalBear = bear => {
  return bear.get('created_at').getTime() === bear.get('updated_at').getTime()
}
