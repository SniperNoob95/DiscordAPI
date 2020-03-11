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
let testDB = {};

testDB.insert = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO test (field1, field2) VALUES ?', [values], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
};

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
        pool.query('SELECT COUNT(*) as count FROM Messages WHERE userID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
}

messagesDB.total = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) as count FROM Messages', (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
};

module.exports.messagesDB = messagesDB;
module.exports.salesDB = salesDB;
module.exports.testDB = testDB;