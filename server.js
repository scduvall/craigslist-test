var mysql = require('./mysql_init');
var http = require('http');
var async = require('async');

var html = '';

createTable(function(table) {
    html = table;
});

http.createServer(function (req, res) {
    /*var html = createTable(req);*/
    res.writeHead(200, {  
        'Content-Type': 'text/html',  
        'Content-Length': html.length,  
        'Expires': new Date().toUTCString()  
    });
    res.end(html);
}).listen(8080);

function createTable(callback) {

    var data = [];
    var priceRange = [
        { max: 200, count: 0 }, { max: 400, count: 0 }, { max: 600, count: 0 }, { max: 800, count: 0 },
        { max: 1000, count: 0 }, { max: 1200, count: 0 }, { max: 1400, count: 0 }, { max: 1600, count: 0 },
        { max: 1800, count: 0 }, { max: 2000, count: 0 }
    ];
    var html = '<!DOCTYPE html><html><body>';

    async.forEach(priceRange, function(range, callback) {
        ( function(range) { 
            var sql = 'SELECT price FROM apartments WHERE price BETWEEN ? AND ?';
            mysql.query(sql, [range.max-200, range.max], function(err, result) {
                if (err) {
                    throw err;
                } else {
                    range.count = result.length;
                    callback();
                } 
            })
        }(range));
    }, function (err) {
            if(err) {
                console.log('There was a problem reading the database');
            } else {
                mysql.end();

                console.log(priceRange);
                
                html += '<table><thead><tr><th colspan="2">Raleigh Apartment Price Ranges on Craigslist</th></tr><tr><th>Price Range</th><th>Inventory</th></tr></thead>';

                priceRange.forEach(function(item) {
                    html += '<tr><td>$' + (item.max - 200) + '-$' + item.max + '</td><td>' + item.count + '</td></tr>';  
                });

                html += '</table></body></html>';
                return callback(html);
            }
        }
    );
}