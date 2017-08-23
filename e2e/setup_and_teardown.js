let db = require('../bear_app/models/db')
let testUser = {
  username: 'testuser',
  password: 'testuserpasswd'
}
let knex = require('../knex')

module.exports = {
  bootstrap: done => {
    console.log('Starting setup...')
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            db.User.register(testUser.username, testUser.password)
              .then(() => {
                console.log('End setup.')
                done()
              })
              .catch(err => console.log(err))
          })
      })
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
