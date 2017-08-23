let knex = require('../../knex')
let bookshelf = require('bookshelf')(knex)
let securePassword = require('bookshelf-secure-password')

bookshelf.plugin(securePassword)

let User = bookshelf.Model.extend({
  tableName: 'User',
  hasTimestamps: true,
  hasSecurePassword: true
})

module.exports = User

module.exports.register = (username, password) => {
  return new User({username, password}).save()
}
