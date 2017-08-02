let dbConfig = require('./knexfile.js')[process.env.NODE_ENV];
module.exports = require('knex')(dbConfig);
