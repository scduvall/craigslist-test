var mysql = require('./mysql_init');


    mysql.query('DROP TABLE IF EXISTS apartments', function (err, result) {
        if (err) throw err;
        console.log("Duplicate table detected, dropping now");
    });

    var sql = "CREATE TABLE apartments (id INT AUTO_INCREMENT PRIMARY KEY, title LONGBLOB, price DECIMAL NOT NULL DEFAULT '0.00', description LONGTEXT, date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"; 
    mysql.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    mysql.query('ALTER TABLE apartments CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci', function (err, result) {
        if (err) throw err;
        console.log("Updated encoding");
    });

    mysql.query('CREATE INDEX xprice ON apartments (price)', function (err, result) {
        if (err) throw err;
        console.log("Indexing column");
    });

    mysql.end();