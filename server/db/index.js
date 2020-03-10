const mysql = require('mysql');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config.ini');

const pool = mysql.createPool({
    connectionLimit: 5,
    password: properties.get('database.password'),
    user: properties.get('database.user'),
    database: properties.get('database.database'),
    host: properties.get('database.host')
});

let salesDB = {};
let messagesDB = {};

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
        pool.query('SELECT * FROM Sales WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
}

messagesDB.count = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) as messageCount FROM Messages WHERE userID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
}

module.exports.messagesDB = messagesDB;
module.exports.salesDB = salesDB;