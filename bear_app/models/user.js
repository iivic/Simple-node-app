const { bookshelf } = require('./db')

const User = bookshelf.Model.extend({
  tableName: 'User',
  hasTimestamps: true,
  hasSecurePassword: true
},
{
  register (username, password) {
    return User.forge({username, password}).save()
  }
})

module.exports = User
