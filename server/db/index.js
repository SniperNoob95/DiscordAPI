const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 5,
    password: 'december1',
    user: 'sniperbot',
    database: 'SniperBot',
    host: 'localhost'
});

let salesDB = {};

salesDB.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Sales', (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
};

salesDB.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Sales WHERE id = >', [id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
}

module.exports = salesDB;