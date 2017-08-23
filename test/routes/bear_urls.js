let Bear = require('../../bear_app/models/bear')
let expect = require('chai').expect
let request = require('request')
let dbConfig = require('../../knexfile')[process.env.NODE_ENV]
let port = dbConfig.port
let knex = require('../../knex')

describe('Bear API', () => {
  let baseURL = 'http://localhost:' + port + '/api/bears'
  let bearName = 'Test Bear'
  let URLWithBearId = bearId => baseURL + '/' + bearId

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

  it('creates a new bear', done => {
    Bear.count()
      .then(numberOfBearsBefore => {
        request.post(
          baseURL,
          {json: {name: bearName}},
          (_, res, body) => {
            expect(res.statusCode).to.equal(200)
            Bear.count()
              .then(numberOfBearsAfter => {
                expect(numberOfBearsAfter).to.equal(numberOfBearsBefore + 1)
                done()
              })
          }
        )
      })
  })

  it('gets all existing bears', done => {
    new Bear({name: bearName}).save()
      .then(() => {
        Bear.count()
          .then(bearsCount => {
            request.get(baseURL, (_, res) => {
              expect(res.statusCode).to.equal(200)
              expect(bearsCount).to.equal(1)
              expect(bearsCount).to.equal(JSON.parse(res.body).length)
              done()
            })
          })
      })
  })

  it('gets one specific bear', done => {
    let response

    new Bear({name: bearName}).save()
      .then(bear => {
        request.get(URLWithBearId(bear.get('id')), (_, res) => {
          response = JSON.parse(res.body)
          expect(res.statusCode).to.equal(200)
          expect(response.id).to.equal(bear.get('id'))
          expect(response.name).to.equal(bear.get('name'))
          done()
        })
      })
  })

  it('updates one specific bear', done => {
    new Bear({name: bearName}).save()
      .then(bear => {
        Bear.count()
          .then(bearsCount => {
            request.patch(
              URLWithBearId(bear.get('id')),
              {json: {id: bear.get('id'), name: bearName}},
              (_, res) => {
                expect(res.statusCode).to.equal(200)
                Bear.count()
                  .then(bearsCountAfterUpdate => {
                    expect(bearsCount).to.equal(bearsCountAfterUpdate)
                    expect(res.body.id).to.equal(bear.get('id'))
                    expect(res.body.name).to.equal(bearName)
                    Bear.where('name', bearName).destroy()
                    done()
                  })
              }
            )
          })
      })
  })

  it('deletes one specific bear', done => {
    Bear.count()
      .then(bearsCount => {
        new Bear({name: bearName})
          .save()
          .then(bear => {
            Bear.count()
              .then(bearsCountAfterCreating => {
                expect(bearsCount).to.equal(bearsCountAfterCreating - 1)
                request.delete(
                  URLWithBearId(bear.get('id')),
                  (_, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(JSON.parse(res.body)).to.equal('Successfully deleted bear.')
                    Bear.count()
                      .then(bearsCountAfterDeleting => {
                        expect(bearsCount).to.equal(bearsCountAfterDeleting)
                      })
                    done()
                  }
                )
              })
          })
      })
  })
})
