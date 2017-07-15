var request = require('request');
var parse = require('cheerio');
var mysql = require('./mysql_init');
var http = require('http');
var async = require('async');

function getdata() {

    var url = 'https://raleigh.craigslist.org/search/apa';
    var count = 0;
    var data = [];

    request(url, function(err, resp, body) {
        if(err)
            throw err;
        $ = parse.load(body);

        $('.result-meta').each(function() {
            data.push({
                title: $(this).siblings('a.result-title').text(),
                price: +($(this).children('.result-price').text()).substr(1),
                date: $(this).siblings('time.result-date').attr('datetime')
            });
        });

        async.forEach(data, function(entry, callback) {
                var sql = 'INSERT INTO apartments (title, price, date) VALUES (?)';
                var values = [entry.title, entry.price, entry.date];
                mysql.query(sql, [values], function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('One row inserted');
                        callback();
                    }
                });
            }, function(err) {
                if(err) {
                    console.log('Some data failed to parse');
                } else {
                    console.log('All the data has been inserted!');
                    mysql.end();
                }
            }
        );

        /*$('.result-meta').each(function() {
            var sql = 'INSERT INTO apartments (title, price, date) VALUES (?)';
            var price = $(this).children('.result-price').text();
            var date = $(this).siblings('time.result-date').attr('datetime');
            var values = [$(this).siblings('a.result-title').text(),+price.substr(1), date];
            mysql.query(sql, [values], function (err, result) {
                    if (err) throw err;
            })
        });*/
    });
}

getdata();