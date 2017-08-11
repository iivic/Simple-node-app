let db = require('../bear_app/models/db'),
    testUser = {
        username: 'testuser',
        password: 'testuserpasswd'
    },
    knex = require('../knex');;

module.exports = {
    bootstrap: function(done) {
        console.log('Starting setup...');
        knex.migrate.rollback()
        .then(() => {
            knex.migrate.latest()
            .then(() => {
                db.User.register(testUser.username, testUser.password)
                .then(() => {
                    console.log('End setup.');
                    done();
                })
                .catch(err => console.log(err));
            });
        });
    },
    teardown: function(done) {
        console.log('Starting teardown...');
        knex.migrate.rollback()
        .then(function() {
            console.log('End teardown.');
            done();
            console.log('Exit with: "ctrl+c"');
        });
    }
};

module.exports.testUser = testUser;
