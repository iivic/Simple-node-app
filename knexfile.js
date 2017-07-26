require('dotenv').config();

module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: process.env.DB_CHARSET,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASS,
      user: process.env.DB_USER
    }
  },

  staging: {
  },

  production: {
  }

};
