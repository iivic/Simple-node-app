require('dotenv').config();

var Bear = require('../../bear_app/models/bear.js'),
    expect = require('chai').expect,
    request = require('request'),
    port = process.env.PORT;

describe('Bear API', function() {
    var base_url = 'http://localhost:' + port + '/api/bears',
        bearName = 'Test Bear',
        bear,
        URLWithBearId = function(bearId) {return base_url + '/' + bearId};

    after(function() {
        Bear.where('name', bearName).destroy();
    });

    before(function() {
        bear = new Bear({name: bearName});
        bear.save();
    });

    it('creates a new bear', function(done) {
        Bear.count()
        .then(function(numberOfBearsBefore) {
            request.post(
                base_url,
                {json: {name: bearName}},
                function(_, res, body) {
                    expect(res.statusCode).to.equal(200);
                    Bear.count()
                    .then(function(numberOfBearsAfter) {
                        expect(numberOfBearsAfter).to.equal(numberOfBearsBefore + 1);
                        done();
                    });
                }
            );
        });
    });

    it('gets all existing bears', function(done) {
        Bear.count()
        .then(function(bearsCount) {
            request.get(base_url, function(_, res) {
                expect(res.statusCode).to.equal(200);
                expect(bearsCount).to.equal(JSON.parse(res.body).response.length);
                done();
            });
        })
    });

    it('gets one specific bear', function(done) {
        var response;

        request.get(URLWithBearId(bear.get('id')), function(_, res) {
            response = JSON.parse(res.body).response;
            expect(res.statusCode).to.equal(200);
            expect(response.id).to.equal(bear.get('id'));
            expect(response.name).to.equal(bear.get('name'));
            done();
        });
    });

    it('updates one specific bear', function(done) {
        var testCaseBearName = 'Test Bear to update';

        Bear.count()
        .then(function(bearsCount) {
            request.patch(
                URLWithBearId(bear.get('id')),
                {json: {id: bear.get('id'), name: testCaseBearName}},
                function(_, res) {
                    expect(res.statusCode).to.equal(200);
                    Bear.count()
                    .then(function(bearsCountAfterUpdate) {
                        expect(bearsCount).to.equal(bearsCountAfterUpdate);
                        expect(res.body.response.id).to.equal(bear.get('id'));
                        expect(res.body.response.name).to.equal(testCaseBearName);
                        Bear.where('name', testCaseBearName).destroy();
                        done();
                    });
                }
            );
        })
    });

    it('deletes one specific bear', function(done) {
        var testCaseBearName = 'Test Bear to delete';

        Bear.count()
        .then(function(bearsCount) {
            new Bear({name: testCaseBearName})
            .save()
            .then(function(bear) {
                Bear.count()
                .then(function(bearsCountAfterCreating) {
                    expect(bearsCount).to.equal(bearsCountAfterCreating - 1);
                    request.delete(
                        URLWithBearId(bear.get('id')),
                        function(_, res) {
                            expect(res.statusCode).to.equal(200);
                            expect(JSON.parse(res.body).response).to.equal('Successfully deleted bear.');
                            Bear.count()
                            .then(function(bearsCountAfterDeleting) {
                                expect(bearsCount).to.equal(bearsCountAfterDeleting);
                            });
                            done();
                        }
                    )
                });
            })
        });
    });
});
