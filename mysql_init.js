const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Masashinoranwil64!',
  database: 'craigslist'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log('Connected to craigslist!');
});

module.exports = connection;