require('dotenv').config();

var Bear = require('../../bear_app/models/bear.js'),
    expect = require('chai').expect,
    request = require('request'),
    port = process.env.PORT;

describe('Bear API', function() {
    var base_url = 'http://localhost:' + port + '/api/bears',
        bearName = 'Test Bear';

    after(function() {
        Bear.where('name', bearName).destroy();
    });

    it('creates a new bear', function(done) {
        Bear.count()
        .then(function(numberOfBearsBefore) {
            request.post(
                base_url,
                {json: {name: bearName}},
                function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    Bear.count()
                    .then(function(numberOfBearsAfter) {
                        expect(numberOfBearsAfter).to.equal(numberOfBearsBefore + 1);
                    });
                    done();
                }
            );
        });
    });

    it('gets all existing bears', function(done) {
        Bear.count()
        .then(function(bearsCount) {
            request.get(base_url, function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(bearsCount).to.equal(JSON.parse(res.body).response.length);
                done();
            });
        })
    });
});
