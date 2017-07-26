require('dotenv').config();

var dbConfig = {
        client: process.env.DB_CLIENT,
        connection: {
            charset: process.env.DB_CHARSET,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASS,
            user: process.env.DB_USER
        }
    },
    knex = require('knex')(dbConfig),
    bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
    tableName: 'Bear',
    hasTimestamps: true
});
