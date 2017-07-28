module.exports = {

  development: {
    client: 'mysql',
    connection: {
      charset: 'utf8',
      database: 'bears_database',
      host: 'localhost',
      password: '123456',
      user: 'nodeuser'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    port: 8000
  },

  test: {
    client: 'mysql',
    connection: {
      charset: 'utf8',
      database: 'test_bears_database',
      host: 'localhost',
      password: '123456',
      user: 'nodeuser'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    port: 8008
  },

  staging: {
  },

  production: {
  }

};
