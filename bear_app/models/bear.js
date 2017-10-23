const { bookshelf } = require('./db')

const Bear = bookshelf.Model.extend({
  tableName: 'Bear',
  hasTimestamps: true,
  delete: function () {
    return this.destroy({require: true})
  },
  isOriginalBear: function () {
    return this.get('created_at').getTime() === this.get('updated_at').getTime()
  }
},
{
  create (params) {
    return this.forge(params).save()
  },
  getAll () {
    return this.fetchAll()
  },
  getOne (params) {
    return this.where(params).fetch()
  },
  update (params, updatedParams) {
    return this.where(params).save(updatedParams, {patch: true})
  }
})

module.exports = Bear
