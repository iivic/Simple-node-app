require('dotenv').config();

var dbConfig = {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: process.env.DB_CHARSET
        }
    },
    knex = require('knex')(dbConfig),
    bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
    tableName: 'Bear'
});
