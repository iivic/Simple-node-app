const knex = require('../../knex')
const bookshelf = require('bookshelf')(knex)
const securePassword = require('bookshelf-secure-password')

bookshelf.plugin(securePassword)

const User = bookshelf.Model.extend({
  tableName: 'User',
  hasTimestamps: true,
  hasSecurePassword: true
})

module.exports = User

module.exports.register = (username, password) => {
  return new User({username, password}).save()
}
