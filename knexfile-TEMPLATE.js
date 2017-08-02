let path = require('path');

module.exports = {

  development: {
    client: '',
    connection: {
      charset: '',
      database: '',
      host: '',
      password: '',
      user: ''
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },
    port: 8000
  },

  test: {
    client: '',
    connection: {
      charset: '',
      database: '',
      host: '',
      password: '',
      user: ''
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },
    port: 8008
  },

  staging: {
  },

  production: {
  }

};
