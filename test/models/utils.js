let db = require('../../bear_app/models/db')
let expect = require('chai').expect
let knex = require('../../knex')

describe('Bear Functionalities', () => {
  let bearName = 'Utils Test Bear'
  let bearName2 = 'Utils Test Bear 2'

  after(done => {
    knex.migrate.rollback()
      .then(function () {
        done()
      })
  })

  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            done()
          })
      })
  })

  it('should verify create returns bear with correct data', done => {
    db.Bear.create({name: bearName})
      .then(bear => {
        expect(bear.get('name')).to.equal(bearName)
        done()
      })
  })

  it('should verify getAll returns all existing bears', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        new db.Bear({name: bearName2}).save()
          .then(bear2 => {
            db.Bear.getAll()
              .then(result => {
                expect(result.models.length).to.equal(2)
                done()
              })
          })
      })
  })

  it('should verify getOne returns an existing bear', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        db.Bear.getOne({id: bear.get('id')})
          .then(result => {
            expect(bear.get('name')).to.equal(result.get('name'))
            done()
          })
      })
  })

  it('should verify update returns a bear with updated data', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        db.Bear.update({id: bear.get('id')}, {name: bearName2})
          .then(result => {
            expect(result.get('name')).to.equal(bearName2)
            done()
          })
      })
  })

  it('should verify delete returns correct message', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        db.Bear.delete({id: bear.get('id')})
          .then(result => {
            expect(result).to.equal('Successfully deleted bear.')
            done()
          })
      })
  })

  it('should verify that the bear was not updated', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        expect(true).to.equal(db.Bear.isOriginalBear(bear))
        done()
      })
  })

  it('should verify that the bear was updated', done => {
    new db.Bear({name: bearName}).save()
      .then(bear => {
        bear.save({name: bearName2})
          .then(updatedBear => {
            expect(false).to.equal(db.Bear.isOriginalBear(updatedBear))
            done()
          })
      })
  })
})
