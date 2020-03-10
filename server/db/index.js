const mysql = require('mysql');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('../resources/config.properties');

const pool = mysql.createPool({
    connectionLimit: 5,
    password: properties.get('password'),
    user: properties.get('user'),
    database: properties.get('database'),
    host: properties.get('host')
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
        pool.query('SELECT COUNT(*) FROM Messages WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
}

module.exports = messagesDB, salesDB;