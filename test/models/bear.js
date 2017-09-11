const Bear = require('../../bear_app/models/bear')
const expect = require('chai').expect
const { knex } = require('../../bear_app/models/db')

describe('Bear Functionalities', () => {
  const bearName = 'Utils Test Bear'
  const bearName2 = 'Utils Test Bear 2'

  after(() => knex.migrate.rollback())

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => Bear.forge({name: bearName}).save())
  })

  it('should verify create returns bear with correct data', () => {
    Bear.create({name: bearName}).then(bear => expect(bear.get('name')).to.equal(bearName))
  })

  it('should verify getAll returns all existing bears', () => {
    Bear.forge({name: bearName2}).save()
      .then(() => Bear.getAll())
      .then(result => expect(result.models.length).to.equal(2))
  })

  it('should verify getOne returns an existing bear', () => {
    Bear.getOne({name: bearName})
      .then(result => expect(bearName).to.equal(result.get('name')))
  })

  it('should verify update returns a bear with updated data', () => {
    Bear.update({name: bearName}, {name: bearName2})
      .then(result => expect(result.get('name')).to.equal(bearName2))
  })

  it('should verify delete removes bear from database', () => {
    Bear.where({name: bearName}).fetch()
      .then(bear => bear.delete())
      .then(() => Bear.fetchAll())
      .then(result => expect(result.models.length).to.equal(0))
  })

  it('should verify that the bear was not updated', () => {
    Bear.where({name: bearName}).fetch()
      .then(bear => expect(true).to.equal(bear.isOriginalBear()))
  })

  it('should verify that the bear was updated', () => {
    Bear.where({name: bearName}).fetch()
      .then(bear => bear.save({name: bearName2}))
      .then(updatedBear => expect(false).to.equal(updatedBear.isOriginalBear()))
  })
})
