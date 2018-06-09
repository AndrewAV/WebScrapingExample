var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')();
var connectionString = 'postgres://postgres:1234@localhost:5432/webScrapingApartments';
var db = pgp(connectionString);

function getAllAparts(req, res, next) {
    db.any('select * from aparts')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL apartments'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = db;