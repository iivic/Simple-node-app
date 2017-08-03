let Bear = require('../../bear_app/models/bear'),
    expect = require('chai').expect,
    Utils = require('../../bear_app/utils/utils'),
    knex = require('../../knex');

describe('Bear Utils', () => {
    let bearName = 'Utils Test Bear',
        bearName2 = 'Utils Test Bear 2';

    after(done => {
        knex.migrate.rollback()
        .then(function() {
            done();
        });
    });

    beforeEach(done => {
        knex.migrate.rollback()
        .then(() => {
            knex.migrate.latest()
            .then(() => {
                done();
            });
        });
    });

    it('should verify that the bear was not updated', done =>{
        new Bear({name: bearName}).save()
        .then(bear => {
            expect(true).to.equal(Utils.isOriginalBear(bear));
            done();
        });
    });

    it('should verify that the bear was updated', done =>{
        new Bear({name: bearName}).save()
        .then(bear => {
            bear.save({name: bearName2})
            .then(updatedBear => {
                expect(false).to.equal(Utils.isOriginalBear(updatedBear));
                done();
            });
        });
    });
});
