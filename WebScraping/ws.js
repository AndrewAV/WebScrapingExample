var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var db = require('./queries');

let apartments = [];

app.get('/apartments', function (req, res, next) {

    //URL a visitar para hacer web scraping
    url = 'https://www.encuentra24.com/costa-rica-es/bienes-raices-alquiler-apartamentos#search=f_currency.USD&page=1';

    //Request al url
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            $('.ann-box-teaser').each(function (i, element) {

                //Obtencion de datos.
                let title1 = $(this).find('.ann-box-title div strong').text();
                let ubication1 = $(this).find('.ann-info-item').text();
                let description1 = $(this).find('.ann-box-desc').text();
                let price1 = $(this).find('.ann-price-2nd div').text();
                let time1 = $(this).find('.ann-box-hilight-time .value').text();
                let rooms1 = $(this).find('.icon-category-home').next().text();


                let apartment = {
                    title: title1,
                    ubication: ubication1,
                    description: description1,
                    price: price1,
                    time: time1,
                    rooms: rooms1
                }

                //Agregarlo a la lista de apartamentos.
                apartments.push(apartment);


                //Agregarlos a la base de datos.
                db.none("insert into aparts ( title, ubication, descrip, price, timee, rooms) values('" + title1 + "', '" + ubication1 + "', '" + description1 + "', '" + price1 +
                        "', '" + time1 + "','" + rooms1 + "')")
                    .then(function () {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: 'Inserted one apartment'
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            });
        } else {
            console.log(error);
        }
    })
    console.log(apartments);
    res.send(apartments);
})



app.listen('8000')

exports = module.exports = app;