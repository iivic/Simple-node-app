let knex = require('../../knex'),
    bookshelf = require('bookshelf')(knex),
    securePassword = require('bookshelf-secure-password');

bookshelf.plugin(securePassword);

User = bookshelf.Model.extend({
    tableName: 'User',
    hasTimestamps: true,
    hasSecurePassword: true
});

module.exports = User;

module.exports.register = (username, password) => {
    return new User({username, password}).save();
};
