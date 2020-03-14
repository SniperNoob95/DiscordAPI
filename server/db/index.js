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
let commandsDB = {};

salesDB.insert = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Sales (date, enteredID, enteredName, sellerID, sellerName, item, itemQuality, spell1, spell1, price) VALUES (?)', [values], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
}

salesDB.total = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) as count FROM Sales', (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results[0]);
            }
        })
    });
};

salesDB.item = (itemName) => {
    let wildCardName = '%' + itemName + '%';
    return new Promise((resolve, reject) => {
        pool.query('SELECT date, item, itemQuality, spell1, spell2, price FROM Sales WHERE item LIKE ? ORDER BY price', [wildCardName], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
}

messagesDB.insert = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Messages (date, userName, userID, userDiscriminator, content) VALUES (?)', [values], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
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
                return resolve(results[0]);
            }
        })
    });
};

commandsDB.insert = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Commands (date, userName, userID, userDiscriminator, command) VALUES (?)', [values], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    });
}

module.exports.messagesDB = messagesDB;
module.exports.salesDB = salesDB;
module.exports.commandsDB = commandsDB;