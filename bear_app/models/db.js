const dbConfig = require('../../knexfile.js')[process.env.NODE_ENV]
const knex = require('knex')(dbConfig)
const bookshelf = require('bookshelf')(knex)
const securePassword = require('bookshelf-secure-password')

bookshelf.plugin(securePassword)

module.exports = { dbConfig, knex, bookshelf }
