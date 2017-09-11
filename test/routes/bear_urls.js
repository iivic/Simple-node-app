const Bear = require('../../bear_app/models/bear')
const expect = require('chai').expect
const rp = require('request-promise')
const { knex, dbConfig } = require('../../bear_app/models/db')

describe('Bear API', () => {
  const baseURL = 'http://localhost:' + dbConfig.port + '/api/bears'
  const bearName = 'API Test Bear'
  const URLWithBearId = bearId => baseURL + '/' + bearId
  let options
  let bear

  after(() => knex.migrate.rollback())

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => Bear.forge({name: bearName}).save())
      .then(response => {
        bear = response
        return bear
      })
  })

  it('creates a new bear', () => {
    const bearName2 = 'API Test Bear 2'
    options = {
      method: 'POST',
      uri: baseURL,
      body: {
        name: bearName2
      },
      json: true
    }

    rp(options).then(parsedBody => expect(parsedBody.name).to.equal(bearName2))
  })

  it('gets all existing bears', () => {
    options = {
      uri: baseURL,
      json: true
    }

    rp(options).then(parsedBody => expect(parsedBody.length).to.equal(1))
  })

  it('gets one specific bear', () => {
    options = {
      uri: URLWithBearId(bear.get('id')),
      json: true
    }

    rp(options)
      .then(parsedBody => {
        expect(parsedBody.id).to.equal(bear.get('id'))
        expect(parsedBody.name).to.equal(bear.get('name'))
      })
  })

  it('updates one specific bear', () => {
    const bearName2 = 'API Test Bear 2'
    options = {
      method: 'PATCH',
      body: {
        name: bearName2
      },
      uri: URLWithBearId(bear.get('id')),
      json: true
    }

    rp(options).then(parsedBody => expect(parsedBody.name).to.equal(bearName2))
  })

  it('deletes one specific bear', () => {
    options = {
      method: 'DELETE',
      uri: URLWithBearId(bear.get('id')),
      json: true
    }

    rp(options)
      .then(parsedBody => {
        expect(parsedBody).to.equal('Deleted bear!')
        return Bear.count()
      })
      .then(bearsCount => expect(bearsCount).to.equal(0))
  })
})
