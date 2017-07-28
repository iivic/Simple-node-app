var knex = require('../../knex'),
    bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
    tableName: 'Bear',
    hasTimestamps: true
});
