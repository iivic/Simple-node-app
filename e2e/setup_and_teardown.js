const User = require('../bear_app/models/user')
const testUser = {
  username: 'testuser',
  password: 'testuserpasswd'
}
const { knex } = require('../bear_app/models/db')

module.exports = {
  bootstrap: done => {
    console.log('Starting setup...')
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => User.register(testUser.username, testUser.password))
      .then(() => {
        console.log('End setup.')
        done()
      })
      .catch(err => console.log(err))
  },
  teardown: done => {
    console.log('Starting teardown...')
    knex.migrate.rollback()
      .then(() => {
        console.log('End teardown.')
        done()
        console.log('Exit with: "ctrl+c"')
      })
  }
}

module.exports.testUser = testUser
